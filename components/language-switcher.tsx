'use client';

import { ChevronDown } from 'lucide-react';

import { useLanguage } from '@/components/language-provider';
import { languageOptions, type Locale } from '@/lib/i18n';

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();
  const selected = languageOptions.find((option) => option.value === locale);

  return (
    <div className="relative h-8 min-w-16 rounded-lg border border-foreground/10 bg-surface">
      <span
        className="pointer-events-none flex h-full items-center justify-center gap-1.5 px-2.5 text-xs font-medium"
        aria-hidden="true"
      >
        {selected?.short}
        <ChevronDown className="size-3.5 text-muted-foreground" />
      </span>
      <select
        value={locale}
        aria-label={t.common.language}
        className="absolute inset-0 size-full cursor-pointer opacity-0"
        onChange={(event) => setLocale(event.target.value as Locale)}
      >
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
