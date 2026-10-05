export const locales = ['uk', 'en', 'ru', 'de', 'es', 'fr'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const languageOptions: Array<{
  value: Locale;
  short: string;
  label: string;
}> = [
  { value: 'uk', short: 'UA', label: 'Українська' },
  { value: 'en', short: 'EN', label: 'English' },
  { value: 'ru', short: 'RU', label: 'Русский' },
  { value: 'de', short: 'DE', label: 'Deutsch' },
  { value: 'es', short: 'ES', label: 'Español' },
  { value: 'fr', short: 'FR', label: 'Français' },
];

type Messages = {
  meta: {
    homeTitle: string;
    homeDescription: string;
    adminTitle: string;
  };
  common: {
    brand: string;
    language: string;
    team: string;
  };
  home: {
    headline: string;
    description: string;
    formTitle: string;
    duration: string;
  };
  form: {
    name: string;
    namePlaceholder: string;
    email: string;
    idea: string;
    ideaPlaceholder: string;
    honeypot: string;
    submit: string;
    submitting: string;
    consent: string;
    successTitle: string;
    successDescription: string;
    submitAnother: string;
    fallbackError: string;
    nameError: string;
    emailError: string;
    ideaError: string;
    submitError: string;
  };
  admin: {
    loading: string;
    backHome: string;
    loginTitle: string;
    loginDescription: string;
    password: string;
    login: string;
    logout: string;
    ideas: string;
    deliveryNotice: string;
    noNewIdeas: string;
    newIdeasCount: (count: number) => string;
    active: string;
    all: string;
    emptyTitle: string;
    emptyDescription: string;
    statusNew: string;
    statusReviewed: string;
    statusArchived: string;
    reviewedAction: string;
    archiveAction: string;
    replyAction: string;
    loadError: string;
    loginError: string;
    passwordNotConfigured: string;
    wrongPassword: string;
  };
};

export const messages: Record<Locale, Messages> = {
  uk: {
    meta: {
      homeTitle: 'giveidea — ідеї, з яких виростають продукти',
      homeDescription:
        'Опишіть ідею та залиште контакти. Ми вивчимо заявку й напишемо, якщо зможемо допомогти.',
      adminTitle: 'Вхідні ідеї — giveidea',
    },
    common: { brand: 'giveidea', language: 'Мова', team: 'Для команди' },
    home: {
      headline: 'Є ідея? Розкажіть.',
      description:
        'Опишіть проблему та залиште контакти. Ми вивчимо заявку й напишемо, якщо зможемо перетворити її на SaaS- або B2B-продукт.',
      formTitle: 'Залишити ідею',
      duration: 'Це займе близько двох хвилин.',
    },
    form: {
      name: 'Ім’я',
      namePlaceholder: 'Олексій',
      email: 'Пошта',
      idea: 'Ідея',
      ideaPlaceholder: 'Яку проблему ви хочете розв’язати?',
      honeypot: 'Не заповнюйте це поле',
      submit: 'Надіслати ідею',
      submitting: 'Надсилаємо',
      consent:
        'Натискаючи кнопку, ви погоджуєтеся на обробку контактних даних.',
      successTitle: 'Ідею надіслано',
      successDescription: 'Ми вивчимо опис і напишемо, якщо зможемо допомогти.',
      submitAnother: 'Надіслати ще одну',
      fallbackError: 'Не вдалося надіслати ідею.',
      nameError: 'Вкажіть ім’я.',
      emailError: 'Перевірте адресу електронної пошти.',
      ideaError: 'Опишіть ідею детальніше — від 20 до 5000 символів.',
      submitError: 'Не вдалося надіслати ідею. Спробуйте ще раз.',
    },
    admin: {
      loading: 'Завантажуємо ідеї',
      backHome: 'На головну',
      loginTitle: 'Вхід для команди',
      loginDescription: 'Введіть пароль адміністратора.',
      password: 'Пароль',
      login: 'Увійти',
      logout: 'Вийти',
      ideas: 'Ідеї',
      deliveryNotice:
        'Нові ідеї надходять на пошту. Тут зберігаються попередні заявки.',
      noNewIdeas: 'Нових заявок немає',
      newIdeasCount: (count) => `Нових заявок: ${count}`,
      active: 'Активні',
      all: 'Усі',
      emptyTitle: 'Тут поки порожньо',
      emptyDescription: 'Попередніх заявок у цьому списку немає.',
      statusNew: 'Нова',
      statusReviewed: 'Опрацьована',
      statusArchived: 'Архів',
      reviewedAction: 'Опрацьовано',
      archiveAction: 'В архів',
      replyAction: 'Відповісти',
      loadError: 'Не вдалося завантажити ідеї.',
      loginError: 'Не вдалося увійти.',
      passwordNotConfigured: 'Пароль адміністратора ще не налаштовано.',
      wrongPassword: 'Неправильний пароль.',
    },
  },
  en: {
    meta: {
      homeTitle: 'giveidea — ideas that become products',
      homeDescription:
        'Describe your idea and leave your contact details. We will review it and get in touch if we can help.',
      adminTitle: 'Incoming ideas — giveidea',
    },
    common: { brand: 'giveidea', language: 'Language', team: 'For the team' },
    home: {
      headline: 'Have an idea? Tell us.',
      description:
        'Describe the problem and leave your contact details. We will review your submission and get in touch if we can turn it into a SaaS or B2B product.',
      formTitle: 'Share your idea',
      duration: 'It takes about two minutes.',
    },
    form: {
      name: 'Name',
      namePlaceholder: 'Alex',
      email: 'Email',
      idea: 'Idea',
      ideaPlaceholder: 'What problem would you like to solve?',
      honeypot: 'Leave this field empty',
      submit: 'Submit idea',
      submitting: 'Sending',
      consent:
        'By clicking the button, you agree to the processing of your contact details.',
      successTitle: 'Idea submitted',
      successDescription:
        'We will review the details and get in touch if we can help.',
      submitAnother: 'Submit another idea',
      fallbackError: 'Could not submit your idea.',
      nameError: 'Please enter your name.',
      emailError: 'Please check your email address.',
      ideaError: 'Please describe your idea in 20 to 5000 characters.',
      submitError: 'Could not submit your idea. Please try again.',
    },
    admin: {
      loading: 'Loading ideas',
      backHome: 'Back to home',
      loginTitle: 'Team sign in',
      loginDescription: 'Enter the administrator password.',
      password: 'Password',
      login: 'Sign in',
      logout: 'Sign out',
      ideas: 'Ideas',
      deliveryNotice:
        'New ideas are sent by email. Previous submissions remain here.',
      noNewIdeas: 'No new submissions',
      newIdeasCount: (count) => `New submissions: ${count}`,
      active: 'Active',
      all: 'All',
      emptyTitle: 'Nothing here yet',
      emptyDescription: 'There are no previous submissions in this list.',
      statusNew: 'New',
      statusReviewed: 'Reviewed',
      statusArchived: 'Archived',
      reviewedAction: 'Reviewed',
      archiveAction: 'Archive',
      replyAction: 'Reply',
      loadError: 'Could not load ideas.',
      loginError: 'Could not sign in.',
      passwordNotConfigured:
        'The administrator password is not configured yet.',
      wrongPassword: 'Incorrect password.',
    },
  },
  ru: {
    meta: {
      homeTitle: 'giveidea — идеи, из которых растут продукты',
      homeDescription:
        'Опишите идею и оставьте контакты. Мы изучим заявку и напишем, если сможем помочь.',
      adminTitle: 'Входящие идеи — giveidea',
    },
    common: { brand: 'giveidea', language: 'Язык', team: 'Для команды' },
    home: {
      headline: 'Есть идея? Расскажите.',
      description:
        'Опишите проблему и оставьте контакты. Мы изучим заявку и напишем, если сможем превратить её в SaaS или B2B-продукт.',
      formTitle: 'Оставить идею',
      duration: 'Это займёт около двух минут.',
    },
    form: {
      name: 'Имя',
      namePlaceholder: 'Алексей',
      email: 'Почта',
      idea: 'Идея',
      ideaPlaceholder: 'Какую проблему вы хотите решить?',
      honeypot: 'Не заполняйте это поле',
      submit: 'Отправить идею',
      submitting: 'Отправляем',
      consent:
        'Нажимая кнопку, вы соглашаетесь на обработку контактных данных.',
      successTitle: 'Идея отправлена',
      successDescription: 'Изучим описание и напишем, если сможем помочь.',
      submitAnother: 'Отправить ещё одну',
      fallbackError: 'Не получилось отправить идею.',
      nameError: 'Укажите имя.',
      emailError: 'Проверьте адрес почты.',
      ideaError: 'Опишите идею чуть подробнее — от 20 до 5000 символов.',
      submitError: 'Не получилось отправить идею. Попробуйте ещё раз.',
    },
    admin: {
      loading: 'Загружаем идеи',
      backHome: 'На главную',
      loginTitle: 'Вход для команды',
      loginDescription: 'Введите пароль администратора.',
      password: 'Пароль',
      login: 'Войти',
      logout: 'Выйти',
      ideas: 'Идеи',
      deliveryNotice:
        'Новые идеи приходят на почту. Здесь хранятся прежние заявки.',
      noNewIdeas: 'Новых заявок нет',
      newIdeasCount: (count) => `Новых заявок: ${count}`,
      active: 'Активные',
      all: 'Все',
      emptyTitle: 'Здесь пока пусто',
      emptyDescription: 'Прежних заявок в этом списке нет.',
      statusNew: 'Новая',
      statusReviewed: 'Изучена',
      statusArchived: 'Архив',
      reviewedAction: 'Изучена',
      archiveAction: 'В архив',
      replyAction: 'Ответить',
      loadError: 'Не удалось загрузить идеи.',
      loginError: 'Не удалось войти.',
      passwordNotConfigured: 'Пароль администратора ещё не настроен.',
      wrongPassword: 'Неверный пароль.',
    },
  },
  de: {
    meta: {
      homeTitle: 'giveidea — Ideen, aus denen Produkte entstehen',
      homeDescription:
        'Beschreiben Sie Ihre Idee und hinterlassen Sie Ihre Kontaktdaten. Wir prüfen Ihre Anfrage und melden uns, wenn wir helfen können.',
      adminTitle: 'Eingehende Ideen — giveidea',
    },
    common: { brand: 'giveidea', language: 'Sprache', team: 'Für das Team' },
    home: {
      headline: 'Eine Idee? Erzählen Sie uns davon.',
      description:
        'Beschreiben Sie das Problem und hinterlassen Sie Ihre Kontaktdaten. Wir prüfen Ihre Anfrage und melden uns, wenn daraus ein SaaS- oder B2B-Produkt entstehen kann.',
      formTitle: 'Idee einreichen',
      duration: 'Dauert etwa zwei Minuten.',
    },
    form: {
      name: 'Name',
      namePlaceholder: 'Alex',
      email: 'E-Mail',
      idea: 'Idee',
      ideaPlaceholder: 'Welches Problem möchten Sie lösen?',
      honeypot: 'Dieses Feld leer lassen',
      submit: 'Idee senden',
      submitting: 'Wird gesendet',
      consent:
        'Mit dem Klick auf die Schaltfläche stimmen Sie der Verarbeitung Ihrer Kontaktdaten zu.',
      successTitle: 'Idee gesendet',
      successDescription:
        'Wir prüfen die Angaben und melden uns, wenn wir helfen können.',
      submitAnother: 'Weitere Idee senden',
      fallbackError: 'Die Idee konnte nicht gesendet werden.',
      nameError: 'Bitte geben Sie Ihren Namen ein.',
      emailError: 'Bitte prüfen Sie Ihre E-Mail-Adresse.',
      ideaError: 'Bitte beschreiben Sie Ihre Idee mit 20 bis 5000 Zeichen.',
      submitError:
        'Die Idee konnte nicht gesendet werden. Bitte versuchen Sie es erneut.',
    },
    admin: {
      loading: 'Ideen werden geladen',
      backHome: 'Zur Startseite',
      loginTitle: 'Team-Anmeldung',
      loginDescription: 'Geben Sie das Administratorpasswort ein.',
      password: 'Passwort',
      login: 'Anmelden',
      logout: 'Abmelden',
      ideas: 'Ideen',
      deliveryNotice:
        'Neue Ideen werden per E-Mail gesendet. Frühere Einsendungen bleiben hier.',
      noNewIdeas: 'Keine neuen Einreichungen',
      newIdeasCount: (count) => `Neue Einreichungen: ${count}`,
      active: 'Aktiv',
      all: 'Alle',
      emptyTitle: 'Noch keine Einträge',
      emptyDescription: 'Keine früheren Einsendungen in dieser Liste.',
      statusNew: 'Neu',
      statusReviewed: 'Geprüft',
      statusArchived: 'Archiviert',
      reviewedAction: 'Geprüft',
      archiveAction: 'Archivieren',
      replyAction: 'Antworten',
      loadError: 'Ideen konnten nicht geladen werden.',
      loginError: 'Die Anmeldung ist fehlgeschlagen.',
      passwordNotConfigured:
        'Das Administratorpasswort ist noch nicht eingerichtet.',
      wrongPassword: 'Falsches Passwort.',
    },
  },
  es: {
    meta: {
      homeTitle: 'giveidea — ideas que se convierten en productos',
      homeDescription:
        'Describe tu idea y deja tus datos de contacto. La revisaremos y te escribiremos si podemos ayudarte.',
      adminTitle: 'Ideas recibidas — giveidea',
    },
    common: { brand: 'giveidea', language: 'Idioma', team: 'Para el equipo' },
    home: {
      headline: '¿Tienes una idea? Cuéntanosla.',
      description:
        'Describe el problema y deja tus datos de contacto. Revisaremos tu propuesta y te escribiremos si podemos convertirla en un producto SaaS o B2B.',
      formTitle: 'Comparte tu idea',
      duration: 'Tardarás unos dos minutos.',
    },
    form: {
      name: 'Nombre',
      namePlaceholder: 'Alex',
      email: 'Correo electrónico',
      idea: 'Idea',
      ideaPlaceholder: '¿Qué problema quieres resolver?',
      honeypot: 'Deja este campo vacío',
      submit: 'Enviar idea',
      submitting: 'Enviando',
      consent:
        'Al hacer clic en el botón, aceptas el tratamiento de tus datos de contacto.',
      successTitle: 'Idea enviada',
      successDescription:
        'Revisaremos los detalles y te escribiremos si podemos ayudarte.',
      submitAnother: 'Enviar otra idea',
      fallbackError: 'No se pudo enviar la idea.',
      nameError: 'Introduce tu nombre.',
      emailError: 'Comprueba tu correo electrónico.',
      ideaError: 'Describe tu idea con entre 20 y 5000 caracteres.',
      submitError: 'No se pudo enviar la idea. Inténtalo de nuevo.',
    },
    admin: {
      loading: 'Cargando ideas',
      backHome: 'Volver al inicio',
      loginTitle: 'Acceso del equipo',
      loginDescription: 'Introduce la contraseña de administrador.',
      password: 'Contraseña',
      login: 'Entrar',
      logout: 'Salir',
      ideas: 'Ideas',
      noNewIdeas: 'No hay propuestas nuevas',
      newIdeasCount: (count) => `Propuestas nuevas: ${count}`,
      active: 'Activas',
      all: 'Todas',
      emptyTitle: 'Todavía no hay nada aquí',
      deliveryNotice:
        'Las nuevas ideas se envían por correo. Las solicitudes anteriores permanecen aquí.',
      emptyDescription: 'No hay solicitudes anteriores en esta lista.',
      statusNew: 'Nueva',
      statusReviewed: 'Revisada',
      statusArchived: 'Archivada',
      reviewedAction: 'Revisada',
      archiveAction: 'Archivar',
      replyAction: 'Responder',
      loadError: 'No se pudieron cargar las ideas.',
      loginError: 'No se pudo iniciar sesión.',
      passwordNotConfigured:
        'La contraseña de administrador aún no está configurada.',
      wrongPassword: 'Contraseña incorrecta.',
    },
  },
  fr: {
    meta: {
      homeTitle: 'giveidea — des idées qui deviennent des produits',
      homeDescription:
        'Décrivez votre idée et laissez vos coordonnées. Nous l’étudierons et vous contacterons si nous pouvons vous aider.',
      adminTitle: 'Idées reçues — giveidea',
    },
    common: { brand: 'giveidea', language: 'Langue', team: 'Pour l’équipe' },
    home: {
      headline: 'Une idée ? Parlez-nous-en.',
      description:
        'Décrivez le problème et laissez vos coordonnées. Nous étudierons votre proposition et vous contacterons si nous pouvons en faire un produit SaaS ou B2B.',
      formTitle: 'Proposer une idée',
      duration: 'Cela prend environ deux minutes.',
    },
    form: {
      name: 'Nom',
      namePlaceholder: 'Alex',
      email: 'E-mail',
      idea: 'Idée',
      ideaPlaceholder: 'Quel problème souhaitez-vous résoudre ?',
      honeypot: 'Laissez ce champ vide',
      submit: 'Envoyer l’idée',
      submitting: 'Envoi en cours',
      consent:
        'En cliquant sur le bouton, vous acceptez le traitement de vos coordonnées.',
      successTitle: 'Idée envoyée',
      successDescription:
        'Nous étudierons les détails et vous contacterons si nous pouvons vous aider.',
      submitAnother: 'Envoyer une autre idée',
      fallbackError: 'Impossible d’envoyer l’idée.',
      nameError: 'Saisissez votre nom.',
      emailError: 'Vérifiez votre adresse e-mail.',
      ideaError: 'Décrivez votre idée en 20 à 5000 caractères.',
      submitError: 'Impossible d’envoyer l’idée. Veuillez réessayer.',
    },
    admin: {
      loading: 'Chargement des idées',
      backHome: 'Retour à l’accueil',
      loginTitle: 'Connexion de l’équipe',
      loginDescription: 'Saisissez le mot de passe administrateur.',
      password: 'Mot de passe',
      login: 'Se connecter',
      logout: 'Se déconnecter',
      ideas: 'Idées',
      deliveryNotice:
        'Les nouvelles idées sont envoyées par e-mail. Les propositions précédentes restent ici.',
      noNewIdeas: 'Aucune nouvelle proposition',
      newIdeasCount: (count) => `Nouvelles propositions : ${count}`,
      active: 'Actives',
      all: 'Toutes',
      emptyTitle: 'Rien pour le moment',
      emptyDescription: 'Aucune proposition précédente dans cette liste.',
      statusNew: 'Nouvelle',
      statusReviewed: 'Étudiée',
      statusArchived: 'Archivée',
      reviewedAction: 'Étudiée',
      archiveAction: 'Archiver',
      replyAction: 'Répondre',
      loadError: 'Impossible de charger les idées.',
      loginError: 'Impossible de se connecter.',
      passwordNotConfigured:
        'Le mot de passe administrateur n’est pas encore configuré.',
      wrongPassword: 'Mot de passe incorrect.',
    },
  },
};

export const dateLocales: Record<Locale, string> = {
  uk: 'uk-UA',
  en: 'en-US',
  ru: 'ru-RU',
  de: 'de-DE',
  es: 'es-ES',
  fr: 'fr-FR',
};

export const openGraphLocales: Record<Locale, string> = {
  uk: 'uk_UA',
  en: 'en_US',
  ru: 'ru_RU',
  de: 'de_DE',
  es: 'es_ES',
  fr: 'fr_FR',
};

export function parseLocale(value: unknown): Locale | null {
  if (typeof value !== 'string') return null;
  const normalized = value.trim().toLowerCase().split(/[-_]/)[0];
  return locales.includes(normalized as Locale) ? (normalized as Locale) : null;
}

export function getMessages(value: unknown): Messages {
  return messages[parseLocale(value) ?? defaultLocale];
}

export function localizedHref(path: string, locale: Locale) {
  return `${path}?lang=${locale}`;
}
