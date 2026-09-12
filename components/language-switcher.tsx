'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { useLanguage } from '@/components/language-provider';
import { languageOptions, type Locale } from '@/lib/i18n';

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();
  const selected = languageOptions.find((option) => option.value === locale);

  return (
    <Select
      value={locale}
      onValueChange={(value) => {
        if (value) setLocale(value as Locale);
      }}
    >
      <SelectTrigger
        size="sm"
        aria-label={t.common.language}
        className="h-8 min-w-16 border-foreground/10 bg-surface px-2.5"
      >
        <span>{selected?.short}</span>
      </SelectTrigger>
      <SelectContent align="end" alignItemWithTrigger={false}>
        {languageOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
