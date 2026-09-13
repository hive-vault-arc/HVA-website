import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import Layout from "@/components/Layout";
import { TranslationAvailabilityProvider } from "@/components/localization/TranslationAvailability";
import CookieBanner from "@/components/privacy/CookieBanner";
import { CookieConsentProvider } from "@/components/privacy/CookieConsentProvider";
import CookiePreferencesDialog from "@/components/privacy/CookiePreferencesDialog";
import MicrosoftClarity from "@/components/privacy/MicrosoftClarity";
import { withoutCrawlerOnlyMessages } from "@/i18n/client-messages";
import { manrope, newsreader } from "@/lib/fonts";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1A2535",
};

export default async function AiResourceLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  setRequestLocale("en");
  const messages = await getMessages({ locale: "en" });
  const analyticsMeasurementId =
    process.env.VERCEL_ENV === "production"
      ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim()
      : undefined;

  return (
    <html
      lang="en"
      dir="ltr"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${newsreader.variable}`}
    >
      <body>
        <NextIntlClientProvider
          locale="en"
          messages={withoutCrawlerOnlyMessages(messages)}
        >
          <CookieConsentProvider
            analyticsMeasurementId={analyticsMeasurementId}
          >
            <TranslationAvailabilityProvider>
              <Layout>{children}</Layout>
            </TranslationAvailabilityProvider>
            <MicrosoftClarity />
            <CookieBanner />
            <CookiePreferencesDialog />
            {process.env.VERCEL === "1" ? <Analytics /> : null}
          </CookieConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
