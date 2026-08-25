import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';

import {
  TranslationAvailabilityProvider,
  TranslationTargets,
  useTranslationRoutes,
} from './TranslationAvailability';

function RouteOutput() {
  return <output>{JSON.stringify(useTranslationRoutes())}</output>;
}

describe('TranslationTargets', () => {
  it('publishes every approved locale route to the locale selector', async () => {
    render(
      <TranslationAvailabilityProvider>
        <TranslationTargets
          routes={{
            en: '/case-studies/immoworld',
            fr: '/case-studies/immoworld',
            es: '/case-studies/immoworld-es',
            ar: '/case-studies/immoworld-ar',
          }}
        />
        <RouteOutput />
      </TranslationAvailabilityProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/immoworld-es/)).toHaveTextContent(
        '"es":"/case-studies/immoworld-es"',
      );
      expect(screen.getByText(/immoworld-ar/)).toHaveTextContent(
        '"ar":"/case-studies/immoworld-ar"',
      );
    });
  });
});
