import {describe, expect, it} from 'vitest';
import {validatePublicSlug} from '../../studio/lib/publicSlug';

describe('public multilingual slug contract', () => {
  it.each([
    'ai-agents-tangier',
    'agentes-ia-tanger',
    'transformation-numérique',
    'وكلاء-الذكاء-الاصطناعي-طنجة',
    'دراسات-الحالة-2026',
  ])('accepts %s', (slug) => {
    expect(validatePublicSlug({current: slug})).toBe(true);
  });

  it.each([
    'two--hyphens',
    '-leading',
    'trailing-',
    'has space',
    'path/segment',
    'query?value',
    'fragment#value',
    'underscore_value',
  ])('rejects %s', (slug) => {
    expect(validatePublicSlug({current: slug})).not.toBe(true);
  });
});
