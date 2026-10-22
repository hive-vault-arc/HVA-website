import {describe, expect, it} from 'vitest';
import type {InsightListingItem} from './insight-pagination';
import {selectHomeInsights} from './home-insights';

const item = (id: string, type: InsightListingItem['type'], sourceLocale: InsightListingItem['sourceLocale'] = 'en', extra: Partial<InsightListingItem> = {}): InsightListingItem => ({
  id, type, sourceLocale, title: id, tag: type, excerpt: id, image: '', href: `/blog/${id}`, date: '2026-01-01', ...extra,
});

describe('homepage insight selection', () => {
  it('keeps the selection stable and excludes unpublished promotion candidates', () => {
    const items = [
      item('blog', 'blog'), item('news', 'news-article'), item('perspective', 'perspective'),
      item('research', 'research-report'), item('another-blog', 'blog'),
      item('private', 'blog', 'en', {noIndex: true}),
      item('project', 'case-study'), item('external', 'blog', 'en', {href: 'https://example.com'}),
    ];
    const first = selectHomeInsights(items, 'en', '2026-10-20');
    expect(first.map((entry) => entry.id)).toEqual(selectHomeInsights(items, 'en', '2026-10-20').map((entry) => entry.id));
    expect(first).toHaveLength(5);
    expect(first.map((entry) => entry.id)).not.toContain('private');
    expect(first.map((entry) => entry.id)).not.toContain('project');
    expect(first.map((entry) => entry.id)).not.toContain('external');
    expect(new Set(first.map((entry) => entry.type)).size).toBe(4);
  });

  it('prefers available local-language entries and then uses labelled fallback sources', () => {
    const selection = selectHomeInsights([
      item('fr-blog', 'blog', 'fr'), item('fr-news', 'news-article', 'fr'),
      item('en-perspective', 'perspective'), item('en-research', 'research-report'),
    ], 'fr', '2026-10-20');
    expect(selection.map((entry) => entry.id).slice(0, 2)).toEqual(expect.arrayContaining(['fr-blog', 'fr-news']));
    expect(selection.map((entry) => entry.sourceLocale)).toEqual(['fr', 'fr', 'en', 'en']);
  });

  it('uses distinct published covers when several articles share the same image', () => {
    const selection = selectHomeInsights([
      item('news', 'news-article', 'en', {image: 'ai.webp'}),
      item('perspective-ai', 'perspective', 'en', {image: 'ai.webp'}),
      item('perspective-workflow', 'perspective', 'en', {image: 'workflow.webp'}),
      item('blog-ai', 'blog', 'en', {image: 'ai.webp'}),
      item('blog-business', 'blog', 'en', {image: 'business.webp'}),
      item('research-ai', 'research-report', 'en', {image: 'ai.webp'}),
      item('research-cloud', 'research-report', 'en', {image: 'cloud.webp'}),
      item('fifth', 'blog', 'en', {image: 'ai.webp'}),
    ], 'en', '2026-10-20');
    expect(selection).toHaveLength(5);
    expect(new Set(selection.map((entry) => entry.type)).size).toBe(4);
    expect(new Set(selection.map((entry) => entry.image)).size).toBe(4);
  });

  it('opens with practical operating guidance before product news when both exist', () => {
    const selection = selectHomeInsights([
      item('hardware-news', 'news-article', 'en', {image: 'hardware.webp', topics: ['ai-operational-systems']}),
      item('workflow', 'perspective', 'en', {image: 'workflow.webp', topics: ['custom-software-automation'], editorialFormat: 'operating-note'}),
      item('industry-news', 'news-article', 'en', {image: 'industry.webp'}),
      item('research', 'research-report', 'en', {image: 'research.webp'}),
    ], 'en', '2026-10-21');
    expect(selection[0].id).toBe('workflow');
    expect(selection.map(entry => entry.id)).toContain('hardware-news');
  });

  it('keeps a local-language lead ahead of an untranslated operating note', () => {
    const selection = selectHomeInsights([
      item('fr-blog', 'blog', 'fr', {image: 'fr.webp'}),
      item('en-workflow', 'perspective', 'en', {image: 'workflow.webp', topics: ['custom-software-automation'], editorialFormat: 'operating-note'}),
    ], 'fr', '2026-10-21');
    expect(selection[0].id).toBe('fr-blog');
  });

  it('fills the rail with distinct covers before repeating art for content-type variety', () => {
    const selection = selectHomeInsights([
      item('operating', 'perspective', 'en', {image: 'shared.webp', topics: ['custom-software-automation'], editorialFormat: 'operating-note'}),
      item('hardware', 'news-article', 'en', {image: 'shared.webp'}),
      item('research', 'research-report', 'en', {image: 'research.webp'}),
      item('blog', 'blog', 'en', {image: 'blog.webp'}),
      item('another-perspective', 'perspective', 'en', {image: 'perspective.webp'}),
      item('another-blog', 'blog', 'en', {image: 'another.webp'}),
    ], 'en', '2026-10-21');
    expect(selection.map(entry => entry.image)).toHaveLength(5);
    expect(new Set(selection.map(entry => entry.image)).size).toBe(5);
  });
});
