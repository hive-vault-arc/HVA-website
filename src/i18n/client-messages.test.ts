import {describe, expect, it} from 'vitest';

import enMessages from '../../messages/en.json';
import {withoutCrawlerOnlyMessages} from './client-messages';

describe('client message payload', () => {
  it('does not serialize global error or branded loading copy into normal pages', () => {
    const payload = JSON.stringify(withoutCrawlerOnlyMessages(enMessages));

    expect(payload).not.toContain('Something went wrong');
    expect(payload).not.toContain('Loading Hive Vault Arc');
    expect(payload).toContain('Insights');
  });
});
