import type {AppLocale} from '@/i18n/config';
import type {ClientEvidenceSummary} from './proof';

export function selectHomeClientQuote(
  evidence: readonly ClientEvidenceSummary[],
  selectedCaseSlugs: ReadonlySet<string>,
  locale: AppLocale,
): ClientEvidenceSummary | undefined {
  const eligible = evidence.filter(item => selectedCaseSlugs.has(item.slug) && item.quoteExcerpt?.trim());
  const sourceLanguage = (item: ClientEvidenceSummary) => item.documentLanguage.trim().toLowerCase().split(/[-_]/)[0];
  return eligible.find(item => sourceLanguage(item) === locale)
    ?? eligible.find(item => sourceLanguage(item) === 'en')
    ?? eligible[0];
}
