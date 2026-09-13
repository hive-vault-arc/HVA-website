import {readConsentCookie} from './privacy/consent';

export type AnalyticsEventName =
  | 'generate_lead'
  | 'book_call_click'
  | 'case_study_open';

type AnalyticsEventParameters = Record<
  string,
  string | number | boolean | undefined
>;

function compactParameters(
  parameters: AnalyticsEventParameters,
): Record<string, string | number | boolean> {
  return Object.fromEntries(
    Object.entries(parameters).filter(
      (entry): entry is [string, string | number | boolean] =>
        entry[1] !== undefined,
    ),
  );
}

export function trackAnalyticsEvent(
  name: AnalyticsEventName,
  parameters: AnalyticsEventParameters = {},
): boolean {
  if (
    typeof window === 'undefined' ||
    readConsentCookie()?.analytics !== true ||
    typeof window.gtag !== 'function'
  ) {
    return false;
  }

  window.gtag('event', name, compactParameters(parameters));
  return true;
}

export function trackGenerateLead({
  locale,
  formId,
}: {
  locale: string;
  formId: string;
}): boolean {
  return trackAnalyticsEvent('generate_lead', {
    locale,
    form_id: formId,
    method: 'contact_form',
  });
}

export function trackBookCallClick({
  locale,
  placement,
}: {
  locale: string;
  placement: string;
}): boolean {
  return trackAnalyticsEvent('book_call_click', {locale, placement});
}

export function trackCaseStudyOpen({
  locale,
  slug,
  placement,
}: {
  locale: string;
  slug: string;
  placement: string;
}): boolean {
  return trackAnalyticsEvent('case_study_open', {
    locale,
    case_study_slug: slug,
    placement,
  });
}
