import type { Metadata } from 'next';

export const NOT_FOUND_DESCRIPTION = 'The requested Hive Vault Arc page could not be found.';

export const NOT_FOUND_METADATA: Metadata = {
  title: 'Page Not Found',
  description: NOT_FOUND_DESCRIPTION,
  alternates: {
    canonical: null,
  },
  robots: {
    index: false,
    follow: true,
  },
};

