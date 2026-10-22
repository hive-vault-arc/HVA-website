import type {AppLocale} from '@/i18n/config';

export type StudioCopy = {
  nav: {services: string; work: string; about: string; insights: string; approach: string; contact: string; action: string; menu: string; close: string};
  hero: {title: string; accentLead: string; accentFocus: string; benefit: string; description: string; primary: string; secondary: string; factsLabel: string; servicePillars: string; coFounders: string; clients: string; pauseMotion: string; resumeMotion: string};
  challenges: {title: string; intro: string; items: {title: string; description: string; action: string}[]};
  services: {eyebrow: string; title: string; intro: string; visualNote: string; visualGroupNote: string; groups: {label: string; title: string; description: string; links: string[]}[]};
  work: {title: string; intro: string; open: string; empty: string; previous: string; next: string; challenge: string; scope: string; delivery: string; english: string; bridge: string; bridgeAction: string; testimonial: string};
  approach: {eyebrow: string; title: string; intro: string; visualNote: string; phases: {name: string; title: string; description: string; focus: string[]}[]};
  together: {eyebrow: string; title: string; description: string; items: {title: string; description: string}[]};
  team: {title: string; intro: string; action: string};
  aboutPage: {title: string; intro: string; location: string; founders: string};
  insights: {title: string; intro: string; action: string; previous: string; next: string; fallback: string};
  faq: {eyebrow: string; title: string; intro: string; items: {question: string; answer: string}[]};
  contact: {eyebrow: string; title: string; description: string; note: string; topics: string[]; name: string; email: string; message: string; placeholder: string; submit: string; sending: string; success: string; emailOpened: string; error: string; emailHint: string; retry: string};
  footer: {tagline: string; privacy: string; cookies: string; legal: string; copyright: string};
};

export const STUDIO_COPY: Record<AppLocale, StudioCopy> = {
  en: {
    nav: {services: 'Services', work: 'Case studies', about: 'About', insights: 'Insights', approach: 'Our approach', contact: 'Contact', action: 'Book a free call', menu: 'Open menu', close: 'Close menu'},
    hero: {title: 'We plan, build and run', accentLead: 'the systems behind', accentFocus: 'your business.', benefit: 'Built to save you time. Planned around your budget.', description: 'Business strategy, AI, software and cloud. One team from the first plan to daily operations.', primary: 'Book your free 30-minute discovery call', secondary: 'See our work', factsLabel: 'Our expertise and leadership', servicePillars: 'service pillars', coFounders: 'co-founders', clients: 'Selected clients', pauseMotion: 'Pause background animation', resumeMotion: 'Resume background animation'},
    challenges: {title: 'Where is work getting stuck?', intro: 'A clearer plan, connected tools or reliable operations. Start with the challenge that sounds like yours.', items: [
      {title: 'The next step is unclear.', description: 'You know what needs to improve. Deciding what to change first is harder.', action: 'Clarify your priorities'},
      {title: 'Your tools work apart.', description: 'Enquiries, updates and reports move by hand. Your team has to fill the gaps.', action: 'Connect your workflows'},
      {title: 'Operations keep interrupting.', description: 'Maintenance and everyday system issues compete with the work your team needs to do.', action: 'Keep your systems running'},
    ]},
    services: {eyebrow: 'Our services', title: 'Choose where to start.', intro: 'Bring in strategy, engineering or ongoing support where you need it. We connect the work around your goals.', visualNote: 'Illustrative service concept', visualGroupNote: 'Illustrative service concepts', groups: [
      {label: 'Plan', title: 'Make the next decision clearer.', description: 'Business priorities, process reviews and a practical technology roadmap.', links: ['Strategy & business consulting', 'Technology consulting']},
      {label: 'Build', title: 'Turn your plans into working tools.', description: 'AI assistants, connected workflows, custom apps and business dashboards.', links: ['AI, data & analytics', 'Software engineering']},
      {label: 'Run', title: 'Keep your systems working.', description: 'Cloud setup, monitoring, maintenance and ongoing operational support.', links: ['Cloud & infrastructure', 'Operations & managed services']},
    ]},
    work: {title: 'Real projects. Connected systems.', intro: 'See how strategy, software and operations come together in our client projects.', open: 'View project', empty: 'See the projects in our portfolio', previous: 'Previous case studies', next: 'Next case studies', challenge: 'The challenge', scope: 'Project scope', delivery: 'What we built', english: 'Available in English', bridge: 'The work you see. The method behind it.', bridgeAction: 'Explore our ARC process', testimonial: 'Client testimonial'},
    approach: {eyebrow: 'Our approach', title: 'How your project moves forward.', intro: 'Our ARC process connects assessment, delivery and ongoing operations.', visualNote: 'Illustrative process view', phases: [
      {name: 'Assess', title: 'Get clear on the problem.', description: 'We review your goals and current setup, then define what needs to happen first.', focus: ['Goals and current systems', 'Priorities and scope', 'Roadmap and milestones']},
      {name: 'Re-engineer', title: 'Put the plan into practice.', description: 'We improve the process, connect the tools and build the solution around your team.', focus: ['Process improvements', 'Software and integrations', 'Testing and rollout']},
      {name: 'Command', title: 'Keep the system working.', description: 'We monitor, maintain and improve your systems within an agreed support scope.', focus: ['Monitoring and maintenance', 'Operational support', 'Ongoing improvements']},
    ]},
    together: {eyebrow: 'Working together', title: 'One team across the whole journey.', description: 'Strategy, engineering and operations come together around the problem you need to solve.', items: [
      {title: 'Business goals first', description: 'We start with what you want to achieve.'},
      {title: 'A defined scope and milestones', description: 'Clear deliverables, realistic timelines and regular updates.'},
      {title: 'Support shaped around you', description: 'Ongoing support tailored to your team and operations.'},
    ]},
    faq: {eyebrow: 'FAQ', title: 'Before we get started.', intro: 'A few practical answers about working with us.', items: [
      {question: 'What if we don’t know which service we need?', answer: 'Start with the business challenge. We can review your current setup together and identify the right next step.'},
      {question: 'Can we start with one specific problem?', answer: 'Yes. Discovery helps define a focused scope around your priority. We can discuss wider changes as your needs evolve.'},
      {question: 'Can you work with our existing systems?', answer: 'Yes. We review the tools you already use and look for ways to connect or improve them before recommending a replacement.'},
      {question: 'How are pricing and timelines decided?', answer: 'We discuss pricing after discovery. Scope, integrations, delivery effort and support needs shape the proposal and timeline.'},
      {question: 'Is support available after launch?', answer: 'Yes. Monitoring, maintenance and ongoing improvements can be included in an agreed support scope.'},
    ]},
    contact: {eyebrow: 'Get started', title: 'Your next step starts here.', description: 'Talk through your goals and current systems on a free 30-minute discovery call. Send us a little context to get started.', note: 'What we’ll cover', topics: ['The challenge you want to solve', 'What is already in place', 'A practical next step'], name: 'Your name', email: 'Work email', message: 'What would you like to improve?', placeholder: 'Tell us about your goals, current setup or questions.', submit: 'Request my free discovery call', sending: 'Sending your enquiry…', success: 'Your enquiry has been sent. We will be in touch.', emailOpened: 'An email draft has been prepared. Send it in your email app to contact us.', error: 'We could not send your enquiry. Please try again or email us directly.', emailHint: 'This prepares a draft in your email app for you to send.', retry: 'Please wait a moment before sending another enquiry.'},
    team: {title: 'The people behind the work.', intro: 'Meet the founders who connect business direction, engineering and operations.', action: 'Meet the team'},
    aboutPage: {title: 'We connect strategy, software and operations.', intro: 'Hive Vault Arc is a technology transformation partner based in Tangier, Morocco. We help teams clarify the problem, build practical systems and keep them running.', location: 'Based in Tangier, Morocco', founders: 'Meet the founders'},
    insights: {title: 'Ideas for the work ahead.', intro: 'Practical thinking from our team on building and running better systems.', action: 'Explore all insights', previous: 'Previous insights', next: 'Next insights', fallback: 'Content in English'},
    footer: {tagline: 'Strategy. Technology. Operations.', privacy: 'Privacy', cookies: 'Cookies', legal: 'Legal', copyright: 'Hive Vault Arc. All rights reserved.'},
  },
  fr: {
    nav: {services: 'Services', work: 'Études de cas', about: 'À propos', insights: 'Publications', approach: 'Notre approche', contact: 'Contact', action: 'Réserver un appel gratuit', menu: 'Ouvrir le menu', close: 'Fermer le menu'},
    hero: {title: 'Des systèmes solides', accentLead: 'pour votre', accentFocus: 'entreprise.', benefit: 'Conçus pour gagner du temps. Planifiés selon votre budget.', description: 'Stratégie, IA, logiciels et cloud. Une même équipe du premier plan aux opérations quotidiennes.', primary: 'Réservez votre appel découverte gratuit de 30 min', secondary: 'Voir nos projets', factsLabel: 'Nos expertises et notre direction', servicePillars: 'piliers de services', coFounders: 'cofondateurs', clients: 'Parmi nos clients', pauseMotion: 'Mettre en pause l’animation de fond', resumeMotion: 'Reprendre l’animation de fond'},
    challenges: {title: 'Qu’est-ce qui freine votre activité ?', intro: 'Un plan plus clair, des outils connectés ou des opérations fiables. Partons de votre difficulté.', items: [
      {title: 'La prochaine étape reste floue.', description: 'Vous savez ce qui doit évoluer. Décider par quoi commencer est plus difficile.', action: 'Clarifier vos priorités'},
      {title: 'Vos outils restent séparés.', description: 'Demandes, mises à jour et rapports circulent à la main. Votre équipe fait le lien.', action: 'Connecter vos processus'},
      {title: 'Les opérations vous interrompent.', description: 'La maintenance et les incidents quotidiens prennent du temps sur le travail de votre équipe.', action: 'Assurer le bon fonctionnement'},
    ]},
    services: {eyebrow: 'Nos services', title: 'Choisissez votre point de départ.', intro: 'Stratégie, ingénierie ou support continu : intervenons là où vous en avez besoin, autour de vos objectifs.', visualNote: 'Concept de service illustratif', visualGroupNote: 'Concepts de services illustratifs', groups: [
      {label: 'Planifier', title: 'Clarifier votre prochaine décision.', description: 'Priorités business, revue des processus et feuille de route technologique concrète.', links: ['Stratégie & conseil business', 'Conseil technologique']},
      {label: 'Construire', title: 'Transformer vos plans en outils utiles.', description: 'Assistants IA, workflows connectés, applications et tableaux de bord métier.', links: ['IA, données & analytique', 'Ingénierie logicielle']},
      {label: 'Piloter', title: 'Assurer le fonctionnement de vos systèmes.', description: 'Cloud, supervision, maintenance et accompagnement opérationnel continu.', links: ['Cloud & infrastructure', 'Opérations & services managés']},
    ]},
    work: {title: 'Des projets réels. Des systèmes connectés.', intro: 'Découvrez comment stratégie, logiciels et opérations se rejoignent dans nos projets clients.', open: 'Voir le projet', empty: 'Découvrir notre portfolio', previous: 'Projets précédents', next: 'Projets suivants', challenge: 'Le défi', scope: 'Portée du projet', delivery: 'Ce que nous avons réalisé', english: 'Disponible en anglais', bridge: 'Les projets que vous voyez. La méthode qui les rend possibles.', bridgeAction: 'Découvrir notre méthode ARC', testimonial: 'Témoignage client'},
    approach: {eyebrow: 'Notre approche', title: 'Comment votre projet avance.', intro: 'Notre processus ARC relie l’analyse, la réalisation et les opérations quotidiennes.', visualNote: 'Illustration du processus', phases: [
      {name: 'Assess', title: 'Clarifier le problème.', description: 'Nous examinons vos objectifs et votre situation, puis définissons les premières étapes.', focus: ['Objectifs et systèmes actuels', 'Priorités et périmètre', 'Feuille de route et étapes']},
      {name: 'Re-engineer', title: 'Concrétiser le plan.', description: 'Nous améliorons les processus, connectons les outils et construisons la solution autour de votre équipe.', focus: ['Amélioration des processus', 'Logiciels et intégrations', 'Tests et déploiement']},
      {name: 'Command', title: 'Assurer le bon fonctionnement.', description: 'Nous supervisons, maintenons et améliorons vos systèmes dans un périmètre de support convenu.', focus: ['Supervision et maintenance', 'Support opérationnel', 'Améliorations continues']},
    ]},
    together: {eyebrow: 'Travailler ensemble', title: 'Une équipe pour tout le parcours.', description: 'Stratégie, ingénierie et opérations se rejoignent autour du problème à résoudre.', items: [
      {title: 'Vos objectifs d’abord', description: 'Nous partons de ce que vous souhaitez accomplir.'},
      {title: 'Un périmètre et des étapes définis', description: 'Des livrables clairs, des délais réalistes et un suivi régulier.'},
      {title: 'Un support adapté à vos besoins', description: 'Un accompagnement continu adapté à votre équipe et à vos opérations.'},
    ]},
    faq: {eyebrow: 'FAQ', title: 'Avant de commencer.', intro: 'Quelques réponses pratiques pour travailler ensemble.', items: [
      {question: 'Et si nous ne savons pas quel service choisir ?', answer: 'Commencez par votre enjeu business. Nous pouvons examiner votre situation et définir la prochaine étape ensemble.'},
      {question: 'Pouvons-nous commencer par un problème précis ?', answer: 'Oui. Le premier échange permet de définir un périmètre ciblé sur votre priorité. Nous pouvons envisager d’autres évolutions selon vos besoins.'},
      {question: 'Pouvez-vous travailler avec nos systèmes existants ?', answer: 'Oui. Nous étudions vos outils et les possibilités d’intégration ou d’amélioration avant de proposer un remplacement.'},
      {question: 'Comment définissez-vous les tarifs et les délais ?', answer: 'Nous discutons des tarifs après le premier échange. Le périmètre, les intégrations, le travail de réalisation et le support déterminent la proposition et le calendrier.'},
      {question: 'Le support est-il disponible après le lancement ?', answer: 'Oui. La supervision, la maintenance et les améliorations peuvent faire partie d’un périmètre de support convenu.'},
    ]},
    contact: {eyebrow: 'Commençons', title: 'La prochaine étape commence ici.', description: 'Parlons de vos objectifs et de vos systèmes lors d’un appel découverte gratuit de 30 minutes. Donnez-nous un peu de contexte pour commencer.', note: 'Les sujets de notre échange', topics: ['Le problème à résoudre', 'Ce qui est déjà en place', 'Une prochaine étape concrète'], name: 'Votre nom', email: 'Email professionnel', message: 'Que souhaitez-vous améliorer ?', placeholder: 'Décrivez vos objectifs, votre situation ou vos questions.', submit: 'Demander mon appel découverte gratuit', sending: 'Envoi en cours…', success: 'Votre demande a été envoyée. Nous vous recontacterons.', emailOpened: 'Un brouillon d’email a été préparé. Envoyez-le depuis votre messagerie pour nous contacter.', error: 'L’envoi a échoué. Réessayez ou contactez-nous par email.', emailHint: 'Un brouillon sera préparé dans votre messagerie pour que vous l’envoyiez.', retry: 'Patientez un instant avant d’envoyer une autre demande.'},
    team: {title: 'L’équipe derrière les projets.', intro: 'Rencontrez les fondateurs qui réunissent stratégie, ingénierie et opérations.', action: 'Rencontrer l’équipe'},
    aboutPage: {title: 'Nous réunissons stratégie, logiciels et opérations.', intro: 'Hive Vault Arc est un partenaire de transformation technologique basé à Tanger, au Maroc. Nous aidons les équipes à clarifier le problème, construire des systèmes utiles et les faire fonctionner dans la durée.', location: 'Basés à Tanger, Maroc', founders: 'Rencontrez les fondateurs'},
    insights: {title: 'Des idées pour avancer.', intro: 'Des réflexions pratiques sur la création et la gestion de meilleurs systèmes.', action: 'Voir toutes les publications', previous: 'Publications précédentes', next: 'Publications suivantes', fallback: 'Contenu en anglais'},
    footer: {tagline: 'Stratégie. Technologie. Opérations.', privacy: 'Confidentialité', cookies: 'Cookies', legal: 'Mentions légales', copyright: 'Hive Vault Arc. Tous droits réservés.'},
  },
  es: {
    nav: {services: 'Servicios', work: 'Casos de estudio', about: 'Nosotros', insights: 'Publicaciones', approach: 'Nuestro enfoque', contact: 'Contacto', action: 'Reserva una llamada gratis', menu: 'Abrir menú', close: 'Cerrar menú'},
    hero: {title: 'Sistemas que impulsan', accentLead: 'tu', accentFocus: 'empresa.', benefit: 'Diseñados para ahorrar tiempo. Planificados según tu presupuesto.', description: 'Estrategia, IA, software y cloud. Un mismo equipo desde el primer plan hasta las operaciones diarias.', primary: 'Reserva tu llamada gratuita de 30 minutos', secondary: 'Ver proyectos', factsLabel: 'Nuestras capacidades y dirección', servicePillars: 'pilares de servicios', coFounders: 'cofundadores', clients: 'Algunos de nuestros clientes', pauseMotion: 'Pausar la animación de fondo', resumeMotion: 'Reanudar la animación de fondo'},
    challenges: {title: '¿Qué está frenando el trabajo?', intro: 'Un plan más claro, herramientas conectadas u operaciones fiables. Empecemos por tu reto.', items: [
      {title: 'El siguiente paso no está claro.', description: 'Sabes qué necesita mejorar. Decidir qué cambiar primero es más difícil.', action: 'Aclarar tus prioridades'},
      {title: 'Tus herramientas trabajan por separado.', description: 'Consultas, actualizaciones e informes pasan de mano en mano. Tu equipo cubre los huecos.', action: 'Conectar tus procesos'},
      {title: 'Las operaciones interrumpen el trabajo.', description: 'El mantenimiento y los problemas diarios de los sistemas restan tiempo al trabajo de tu equipo.', action: 'Mantener tus sistemas funcionando'},
    ]},
    services: {eyebrow: 'Nuestros servicios', title: 'Elige por dónde empezar.', intro: 'Estrategia, ingeniería o soporte continuo donde lo necesites. Conectamos el trabajo alrededor de tus objetivos.', visualNote: 'Concepto ilustrativo del servicio', visualGroupNote: 'Conceptos ilustrativos de servicios', groups: [
      {label: 'Planificar', title: 'Aclarar la próxima decisión.', description: 'Prioridades de negocio, revisión de procesos y una hoja de ruta tecnológica práctica.', links: ['Estrategia y consultoría de negocio', 'Consultoría tecnológica']},
      {label: 'Construir', title: 'Convertir tus planes en herramientas útiles.', description: 'Asistentes de IA, flujos conectados, aplicaciones y paneles de negocio.', links: ['IA, datos y analítica', 'Ingeniería de software']},
      {label: 'Gestionar', title: 'Mantener tus sistemas funcionando.', description: 'Cloud, supervisión, mantenimiento y soporte operativo continuo.', links: ['Cloud e infraestructura', 'Operaciones y servicios gestionados']},
    ]},
    work: {title: 'Proyectos reales. Sistemas conectados.', intro: 'Descubre cómo se unen estrategia, software y operaciones en nuestros proyectos de clientes.', open: 'Ver proyecto', empty: 'Descubrir nuestro portfolio', previous: 'Proyectos anteriores', next: 'Proyectos siguientes', challenge: 'El desafío', scope: 'Alcance del proyecto', delivery: 'Lo que construimos', english: 'Disponible en inglés', bridge: 'El trabajo que ves. El método que lo hace posible.', bridgeAction: 'Conoce nuestro proceso ARC', testimonial: 'Testimonio del cliente'},
    approach: {eyebrow: 'Nuestro enfoque', title: 'Así avanza tu proyecto.', intro: 'Nuestro proceso ARC conecta la evaluación, la ejecución y las operaciones diarias.', visualNote: 'Ilustración del proceso', phases: [
      {name: 'Assess', title: 'Aclarar el problema.', description: 'Revisamos tus objetivos y tu situación actual, y definimos qué debe hacerse primero.', focus: ['Objetivos y sistemas actuales', 'Prioridades y alcance', 'Hoja de ruta e hitos']},
      {name: 'Re-engineer', title: 'Poner el plan en práctica.', description: 'Mejoramos procesos, conectamos herramientas y construimos la solución alrededor de tu equipo.', focus: ['Mejoras de procesos', 'Software e integraciones', 'Pruebas y despliegue']},
      {name: 'Command', title: 'Mantener el sistema funcionando.', description: 'Supervisamos, mantenemos y mejoramos tus sistemas dentro de un alcance de soporte acordado.', focus: ['Supervisión y mantenimiento', 'Soporte operativo', 'Mejoras continuas']},
    ]},
    together: {eyebrow: 'Trabajar juntos', title: 'Un equipo para todo el recorrido.', description: 'Estrategia, ingeniería y operaciones se unen alrededor del problema que necesitas resolver.', items: [
      {title: 'Tus objetivos primero', description: 'Partimos de lo que quieres conseguir.'},
      {title: 'Un alcance y unos hitos definidos', description: 'Entregables claros, plazos realistas y seguimiento regular.'},
      {title: 'Soporte adaptado a ti', description: 'Soporte continuo adaptado a tu equipo y tus operaciones.'},
    ]},
    faq: {eyebrow: 'Preguntas frecuentes', title: 'Antes de empezar.', intro: 'Algunas respuestas prácticas sobre cómo trabajar juntos.', items: [
      {question: '¿Y si no sabemos qué servicio necesitamos?', answer: 'Empieza por el reto de negocio. Podemos revisar tu situación y definir juntos el siguiente paso.'},
      {question: '¿Podemos empezar por un problema concreto?', answer: 'Sí. La primera conversación ayuda a definir un alcance centrado en tu prioridad. Podemos hablar de otros cambios según evolucionen tus necesidades.'},
      {question: '¿Podéis trabajar con nuestros sistemas actuales?', answer: 'Sí. Revisamos tus herramientas y las posibilidades de conectarlas o mejorarlas antes de proponer un cambio.'},
      {question: '¿Cómo se deciden el precio y los plazos?', answer: 'Hablamos del precio después de la primera conversación. El alcance, las integraciones, el trabajo de ejecución y el soporte determinan la propuesta y los plazos.'},
      {question: '¿Hay soporte después del lanzamiento?', answer: 'Sí. La supervisión, el mantenimiento y las mejoras pueden incluirse en un alcance de soporte acordado.'},
    ]},
    contact: {eyebrow: 'Empecemos', title: 'Tu siguiente paso empieza aquí.', description: 'Hablemos de tus objetivos y sistemas en una llamada gratuita de 30 minutos. Envíanos un poco de contexto para empezar.', note: 'De qué hablaremos', topics: ['El reto que quieres resolver', 'Lo que ya tienes en marcha', 'Un siguiente paso práctico'], name: 'Tu nombre', email: 'Email de trabajo', message: '¿Qué te gustaría mejorar?', placeholder: 'Cuéntanos tus objetivos, situación actual o preguntas.', submit: 'Solicitar mi llamada gratuita', sending: 'Enviando tu consulta…', success: 'Tu consulta se ha enviado. Nos pondremos en contacto contigo.', emailOpened: 'Se ha preparado un borrador de email. Envíalo desde tu aplicación para contactarnos.', error: 'No hemos podido enviar tu consulta. Inténtalo de nuevo o escríbenos por email.', emailHint: 'Se preparará un borrador en tu aplicación de email para que lo envíes.', retry: 'Espera un momento antes de enviar otra consulta.'},
    team: {title: 'Las personas detrás del trabajo.', intro: 'Conoce a los fundadores que unen estrategia, ingeniería y operaciones.', action: 'Conoce al equipo'},
    aboutPage: {title: 'Unimos estrategia, software y operaciones.', intro: 'Hive Vault Arc es un socio de transformación tecnológica con sede en Tánger, Marruecos. Ayudamos a los equipos a definir el problema, crear sistemas útiles y mantenerlos en funcionamiento.', location: 'Desde Tánger, Marruecos', founders: 'Conoce a los fundadores'},
    insights: {title: 'Ideas para lo que viene.', intro: 'Ideas prácticas para crear y operar mejores sistemas.', action: 'Ver todas las publicaciones', previous: 'Publicaciones anteriores', next: 'Publicaciones siguientes', fallback: 'Contenido en inglés'},
    footer: {tagline: 'Estrategia. Tecnología. Operaciones.', privacy: 'Privacidad', cookies: 'Cookies', legal: 'Aviso legal', copyright: 'Hive Vault Arc. Todos los derechos reservados.'},
  },
  ar: {
    nav: {services: 'خدماتنا', work: 'دراسات الحالة', about: 'من نحن', insights: 'الرؤى', approach: 'منهجنا', contact: 'تواصل معنا', action: 'احجز مكالمة مجانية', menu: 'فتح القائمة', close: 'إغلاق القائمة'},
    hero: {title: 'نخطط ونبني وندير', accentLead: 'أنظمة', accentFocus: 'أعمالك.', benefit: 'أنظمة توفر وقتك. وخطة تراعي ميزانيتك.', description: 'استراتيجية الأعمال والذكاء الاصطناعي والبرمجيات والسحابة. فريق واحد من الخطة الأولى إلى العمليات اليومية.', primary: 'احجز مكالمة تعارف مجانية لمدة 30 دقيقة', secondary: 'استعرض مشاريعنا', factsLabel: 'خبراتنا وقيادتنا', servicePillars: 'مجالات خدمات', coFounders: 'مؤسسين مشاركين', clients: 'من عملائنا', pauseMotion: 'إيقاف حركة الخلفية مؤقتًا', resumeMotion: 'استئناف حركة الخلفية'},
    challenges: {title: 'ما الذي يعطل سير العمل؟', intro: 'خطة أوضح أو أدوات مترابطة أو عمليات مستقرة. لنبدأ بالتحدي الذي تواجهه.', items: [
      {title: 'الخطوة القادمة غير واضحة.', description: 'تعرف ما يحتاج إلى تحسين، لكن تحديد ما يجب تغييره أولًا أصعب.', action: 'حدد أولوياتك'},
      {title: 'أدواتك تعمل بشكل منفصل.', description: 'تنتقل الاستفسارات والتحديثات والتقارير يدويًا، ويتولى فريقك سد الفجوات.', action: 'اربط مسارات العمل'},
      {title: 'العمليات تقاطع العمل باستمرار.', description: 'تستهلك الصيانة ومشكلات الأنظمة اليومية وقتًا يحتاجه فريقك لإنجاز عمله.', action: 'حافظ على استقرار أنظمتك'},
    ]},
    services: {eyebrow: 'خدماتنا', title: 'اختر نقطة البداية.', intro: 'استراتيجية أو هندسة أو دعم مستمر حيث تحتاج إليه. نربط العمل حول أهدافك.', visualNote: 'تصور توضيحي للخدمة', visualGroupNote: 'تصورات توضيحية للخدمات', groups: [
      {label: 'التخطيط', title: 'وضوح أكبر لقرارك القادم.', description: 'أولويات الأعمال ومراجعة العمليات وخارطة طريق تقنية عملية.', links: ['استراتيجية الأعمال والاستشارات', 'الاستشارات التقنية']},
      {label: 'البناء', title: 'تحويل خططك إلى أدوات عملية.', description: 'مساعدون بالذكاء الاصطناعي وتدفقات عمل متصلة وتطبيقات ولوحات متابعة.', links: ['الذكاء الاصطناعي والبيانات والتحليلات', 'هندسة البرمجيات']},
      {label: 'التشغيل', title: 'الحفاظ على عمل أنظمتك.', description: 'إعداد السحابة والمراقبة والصيانة والدعم التشغيلي المستمر.', links: ['السحابة والبنية التحتية', 'العمليات والخدمات المُدارة']},
    ]},
    work: {title: 'مشاريع حقيقية. أنظمة مترابطة.', intro: 'اكتشف كيف نجمع الاستراتيجية والبرمجيات والعمليات في مشاريع عملائنا.', open: 'استعرض المشروع', empty: 'اكتشف مجموعة مشاريعنا', previous: 'المشاريع السابقة', next: 'المشاريع التالية', challenge: 'التحدي', scope: 'نطاق المشروع', delivery: 'ما أنجزناه', english: 'متاح باللغة الإنجليزية', bridge: 'المشاريع التي تراها. والمنهج الذي يقف وراءها.', bridgeAction: 'تعرّف على منهج ARC', testimonial: 'شهادة عميل'},
    approach: {eyebrow: 'منهجنا', title: 'كيف يتقدم مشروعك؟', intro: 'يربط منهج ARC بين التقييم والتنفيذ والعمليات اليومية.', visualNote: 'رسم توضيحي للعملية', phases: [
      {name: 'Assess', title: 'توضيح المشكلة.', description: 'نراجع أهدافك ووضعك الحالي، ثم نحدد ما ينبغي إنجازه أولًا.', focus: ['الأهداف والأنظمة الحالية', 'الأولويات ونطاق العمل', 'خارطة الطريق والمراحل']},
      {name: 'Re-engineer', title: 'تحويل الخطة إلى واقع.', description: 'نحسن العمليات ونربط الأدوات ونبني الحل بما يناسب فريقك.', focus: ['تحسين العمليات', 'البرمجيات والتكاملات', 'الاختبار والإطلاق']},
      {name: 'Command', title: 'الحفاظ على عمل النظام.', description: 'نراقب أنظمتك ونصونها ونحسنها ضمن نطاق دعم متفق عليه.', focus: ['المراقبة والصيانة', 'الدعم التشغيلي', 'التحسينات المستمرة']},
    ]},
    together: {eyebrow: 'العمل معًا', title: 'فريق واحد طوال الرحلة.', description: 'تجتمع الاستراتيجية والهندسة والعمليات حول المشكلة التي تريد حلها.', items: [
      {title: 'أهداف أعمالك أولًا', description: 'نبدأ بما تريد تحقيقه.'},
      {title: 'نطاق ومراحل محددة', description: 'مخرجات واضحة وجداول زمنية واقعية وتحديثات منتظمة.'},
      {title: 'دعم يناسب احتياجاتك', description: 'دعم مستمر يناسب فريقك وعملياتك.'},
    ]},
    faq: {eyebrow: 'أسئلة شائعة', title: 'قبل أن نبدأ.', intro: 'إجابات عملية عن العمل معنا.', items: [
      {question: 'ماذا لو لم نعرف الخدمة التي نحتاجها؟', answer: 'ابدأ بتحدي الأعمال. يمكننا مراجعة وضعك الحالي معًا وتحديد الخطوة التالية المناسبة.'},
      {question: 'هل يمكن البدء بمشكلة محددة؟', answer: 'نعم. تساعدنا المحادثة الأولى على تحديد نطاق يركز على أولويتك. ويمكننا مناقشة تغييرات أوسع مع تطور احتياجاتك.'},
      {question: 'هل يمكنكم العمل مع أنظمتنا الحالية؟', answer: 'نعم. نراجع الأدوات التي تستخدمها ونبحث عن فرص ربطها أو تحسينها قبل اقتراح استبدالها.'},
      {question: 'كيف تُحدد الأسعار والمواعيد؟', answer: 'نناقش الأسعار بعد المحادثة الأولى. يحدد نطاق العمل والتكاملات وجهد التنفيذ واحتياجات الدعم المقترح والجدول الزمني.'},
      {question: 'هل يتوفر الدعم بعد الإطلاق؟', answer: 'نعم. يمكن إدراج المراقبة والصيانة والتحسينات المستمرة ضمن نطاق دعم متفق عليه.'},
    ]},
    contact: {eyebrow: 'لنبدأ', title: 'خطوتك القادمة تبدأ هنا.', description: 'ناقش أهدافك وأنظمتك في مكالمة تعارف مجانية لمدة 30 دقيقة. شارك بعض التفاصيل لنبدأ.', note: 'ما الذي سنناقشه؟', topics: ['التحدي الذي تريد حله', 'الأنظمة الموجودة لديك', 'خطوة عملية للتقدم'], name: 'اسمك', email: 'البريد الإلكتروني للعمل', message: 'ما الذي ترغب في تحسينه؟', placeholder: 'أخبرنا بأهدافك أو وضعك الحالي أو أسئلتك.', submit: 'اطلب مكالمة التعارف المجانية', sending: 'جارٍ إرسال استفسارك…', success: 'تم إرسال استفسارك. سنتواصل معك.', emailOpened: 'تم إعداد مسودة بريد إلكتروني. أرسلها من تطبيق البريد للتواصل معنا.', error: 'تعذر إرسال استفسارك. حاول مجددًا أو راسلنا مباشرة.', emailHint: 'سنعد مسودة في تطبيق البريد الإلكتروني لتقوم بإرسالها.', retry: 'انتظر قليلًا قبل إرسال استفسار آخر.'},
    team: {title: 'الفريق وراء العمل.', intro: 'تعرّف على المؤسسين الذين يجمعون بين الاستراتيجية والهندسة والعمليات.', action: 'تعرّف على الفريق'},
    aboutPage: {title: 'نربط الاستراتيجية والبرمجيات والعمليات.', intro: 'Hive Vault Arc شريك للتحول التقني مقره طنجة، المغرب. نساعد الفرق على تحديد المشكلة وبناء أنظمة عملية وتشغيلها باستمرار.', location: 'مقرنا في طنجة، المغرب', founders: 'تعرّف على المؤسسين'},
    insights: {title: 'أفكار للخطوة القادمة.', intro: 'رؤى عملية حول بناء أنظمة أفضل وتشغيلها.', action: 'استكشف جميع الرؤى', previous: 'الرؤى السابقة', next: 'الرؤى التالية', fallback: 'المحتوى باللغة الإنجليزية'},
    footer: {tagline: 'الاستراتيجية. التكنولوجيا. العمليات.', privacy: 'الخصوصية', cookies: 'ملفات تعريف الارتباط', legal: 'معلومات قانونية', copyright: 'Hive Vault Arc. جميع الحقوق محفوظة.'},
  },
};
