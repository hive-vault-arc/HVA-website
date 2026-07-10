import {describe, expect, it} from 'vitest';
import {compactMetaDescription} from './seo';

describe('compactMetaDescription', () => {
  it('normalizes whitespace without changing a concise description', () => {
    expect(compactMetaDescription('A concise\n  description for a consulting page.')).toBe(
      'A concise description for a consulting page.'
    );
  });

  it('shortens long descriptions at a word boundary', () => {
    const description =
      'Hive Vault Arc combines strategy, engineering, AI systems, cloud infrastructure, and managed operations in one accountable transformation engagement for growing organizations.';
    const compacted = compactMetaDescription(description, 120);

    expect(compacted.length).toBeLessThanOrEqual(120);
    expect(compacted.endsWith('...')).toBe(true);
    expect(compacted).not.toMatch(/\s\.\.\.$/);
  });
});
