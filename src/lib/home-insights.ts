import type {AppLocale} from '@/i18n/config';
import type {InsightListingItem} from './insight-pagination';

export function selectHomeInsights(items: InsightListingItem[], locale: AppLocale, day = new Date().toISOString().slice(0, 10)): InsightListingItem[] {
  const score = (id: string) => {
    let value = 2166136261;
    for (const character of `${day}:${locale}:${id}`) value = Math.imul(value ^ character.charCodeAt(0), 16777619);
    return value >>> 0;
  };
  const eligible = Array.from(new Map(items.filter(item => item.type !== 'case-study' && !item.noIndex && item.href.startsWith('/') && item.title.trim()).map(item => [item.href, item])).values());
  const selected: InsightListingItem[] = [];
  const usedTypes = new Set<InsightListingItem['type']>();
  const usedImages = new Set<string>();
  const pools = [eligible.filter(item => item.sourceLocale === locale), eligible.filter(item => item.sourceLocale !== locale)]
    .map(pool => pool.sort((first, second) => score(first.id) - score(second.id)));
  const add = (item: InsightListingItem) => {
    selected.push(item);
    usedTypes.add(item.type);
    if (item.image) usedImages.add(item.image);
  };

  // The wider opening card should answer an operating problem for prospective
  // clients before the rail branches into research and industry news.
  const leadRank = (item: InsightListingItem) => {
    const practical = item.topics?.includes('custom-software-automation');
    if (practical && item.editorialFormat === 'operating-note') return 0;
    if (practical && (item.type === 'perspective' || item.type === 'blog')) return 1;
    if (item.type === 'perspective') return 2;
    if (item.type === 'blog') return 3;
    if (item.type === 'research-report') return 4;
    return 5;
  };
  const leadPool = pools.find(pool => pool.length);
  const lead = leadPool?.slice().sort((first, second) =>
    leadRank(first) - leadRank(second) || Number(Boolean(second.image)) - Number(Boolean(first.image)) || score(first.id) - score(second.id)
  )[0];
  if (lead) add(lead);

  for (const pool of pools) {
    const types = [...new Set(pool.map(item => item.type))].sort((first, second) => {
      const imageCount = (type: InsightListingItem['type']) => new Set(pool.filter(item => item.type === type).map(item => item.image).filter(Boolean)).size;
      return imageCount(first) - imageCount(second) || score(first) - score(second);
    });
    for (const type of types) {
      if (selected.length === 5) break;
      if (usedTypes.has(type)) continue;
      const candidates = pool.filter(item => item.type === type);
      const distinctCover = candidates.find(item => item.image && !usedImages.has(item.image));
      if (distinctCover) add(distinctCover);
    }
  }

  for (const pool of pools) {
    for (const item of pool) {
      if (selected.length === 5) break;
      if (!selected.includes(item) && item.image && !usedImages.has(item.image)) add(item);
    }
  }
  for (const pool of pools) {
    for (const item of pool) {
      if (selected.length === 5) break;
      if (!selected.includes(item) && !usedTypes.has(item.type)) add(item);
    }
  }
  for (const pool of pools) {
    for (const item of pool) {
      if (selected.length === 5) break;
      if (!selected.includes(item)) add(item);
    }
  }
  return selected;
}
