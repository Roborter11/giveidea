'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from 'react';

import {
  defaultLocale,
  type Locale,
  messages,
  openGraphLocales,
  parseLocale,
} from '@/lib/i18n';

const STORAGE_KEY = 'sut-language';
const CHANGE_EVENT = 'sut-language-change';

function getClientLocale(): Locale {
  const queryLocale = parseLocale(
    new URLSearchParams(window.location.search).get('lang'),
  );
  if (queryLocale) return queryLocale;

  let savedLocale: Locale | null = null;
  try {
    savedLocale = parseLocale(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    // The URL and default language remain available when storage is blocked.
  }
  if (savedLocale) return savedLocale;

  return defaultLocale;
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange);
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  window.addEventListener('popstate', onStoreChange);

  return () => {
    window.removeEventListener('storage', onStoreChange);
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
    window.removeEventListener('popstate', onStoreChange);
  };
}

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (typeof messages)[Locale];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribe,
    getClientLocale,
    () => defaultLocale,
  );

  const setLocale = useCallback((nextLocale: Locale) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, nextLocale);
    } catch {
      // The URL still preserves the selected language when storage is blocked.
    }
    const url = new URL(window.location.href);
    url.searchParams.set('lang', nextLocale);
    window.history.replaceState(null, '', url);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, t: messages[locale] }),
    [locale, setLocale],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

export function useLocalizedDocument({
  title,
  description,
  socialTitle,
  locale,
}: {
  title: string;
  description: string;
  socialTitle: string;
  locale: Locale;
}) {
  useEffect(() => {
    document.title = title;

    const updates: Array<[string, string]> = [
      ['meta[name="description"]', description],
      ['meta[property="og:title"]', socialTitle],
      ['meta[property="og:description"]', description],
      ['meta[property="og:locale"]', openGraphLocales[locale]],
      ['meta[name="twitter:title"]', socialTitle],
      ['meta[name="twitter:description"]', description],
    ];

    for (const [selector, content] of updates) {
      document.querySelector(selector)?.setAttribute('content', content);
    }
  }, [description, locale, socialTitle, title]);
}
