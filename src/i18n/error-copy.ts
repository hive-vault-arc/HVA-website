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
  es: {
    retry: 'Intentar de nuevo',
    returnHome: 'Volver al inicio',
    temporaryTitle: 'La página no está disponible temporalmente',
    temporaryDescription:
      'La página no se pudo cargar correctamente. Inténtelo de nuevo o vuelva a la página de inicio.',
    navigationError: 'Error de navegación / 404',
    movedTitle: 'Esta página ya no está en esta dirección.',
    movedDescription:
      'El enlace puede estar desactualizado o la página puede haberse movido. Vuelva al sitio principal o continúe desde una de las secciones siguientes.',
    contactTeam: 'Contactar al equipo',
    suggestedPages: 'Páginas sugeridas',
  },
  ar: {
    retry: 'حاول مرة أخرى',
    returnHome: 'العودة إلى الرئيسية',
    temporaryTitle: 'الصفحة غير متاحة مؤقتًا',
    temporaryDescription:
      'تعذر تحميل الصفحة بشكل كامل. حاول مرة أخرى أو ارجع إلى الصفحة الرئيسية.',
    navigationError: 'خطأ في التنقل / 404',
    movedTitle: 'لم تعد هذه الصفحة متاحة على هذا العنوان.',
    movedDescription:
      'قد يكون الرابط قديمًا أو نُقلت الصفحة. ارجع إلى الموقع الرئيسي أو تابع عبر أحد الأقسام أدناه.',
    contactTeam: 'تواصل مع الفريق',
    suggestedPages: 'صفحات مقترحة',
  },
} as const;

export function getErrorCopy(locale: string) {
  return ERROR_COPY[locale as keyof typeof ERROR_COPY] ?? ERROR_COPY.en;
}
