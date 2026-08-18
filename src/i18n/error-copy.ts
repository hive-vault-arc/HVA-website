const ERROR_COPY = {
  en: {
    retry: 'Try again',
    returnHome: 'Return home',
    temporaryTitle: 'Page temporarily unavailable',
    temporaryDescription:
      'The page could not load cleanly. Retry the request or return to the homepage.',
    navigationError: 'Navigation error / 404',
    movedTitle: 'This page is no longer at this address.',
    movedDescription:
      'The link may be outdated, or the page may have moved. Return to the main site or continue through one of the sections below.',
    contactTeam: 'Contact the team',
    suggestedPages: 'Suggested pages',
  },
  fr: {
    retry: 'Reessayer',
    returnHome: "Retour a l'accueil",
    temporaryTitle: 'Page temporairement indisponible',
    temporaryDescription:
      "La page n'a pas pu etre chargee correctement. Reessayez ou revenez a l'accueil.",
    navigationError: 'Erreur de navigation / 404',
    movedTitle: "Cette page n'est plus disponible a cette adresse.",
    movedDescription:
      "Le lien est peut-etre obsolete ou la page a ete deplacee. Revenez au site principal ou poursuivez vers l'une des rubriques ci-dessous.",
    contactTeam: "Contacter l'equipe",
    suggestedPages: 'Pages suggerees',
  },
} as const;

export function getErrorCopy(locale: string) {
  return locale === 'fr' ? ERROR_COPY.fr : ERROR_COPY.en;
}
