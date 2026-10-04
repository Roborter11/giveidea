'use client';

import { ChevronDown, Languages } from 'lucide-react';
import { useState } from 'react';

import { useLanguage } from '@/components/language-provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { languageOptions, type Locale } from '@/lib/i18n';

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const selected = languageOptions.find((option) => option.value === locale);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        aria-label={`${t.common.language}: ${selected?.label}`}
        className="group flex h-9 min-w-[4.75rem] items-center justify-center gap-2 rounded-lg border border-foreground/10 bg-surface px-2.5 text-sm font-semibold outline-none transition-[border-color,background-color,box-shadow] hover:border-foreground/20 hover:bg-muted/50 focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/10 data-popup-open:border-brand/30 data-popup-open:bg-surface data-popup-open:ring-3 data-popup-open:ring-brand/10"
      >
        <Languages className="size-4 text-brand" aria-hidden="true" />
        <span>{selected?.short}</span>
        <ChevronDown
          className="size-3.5 text-muted-foreground transition-transform duration-150 group-data-popup-open:rotate-180"
          aria-hidden="true"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-52 rounded-xl border border-foreground/10 bg-surface p-1.5 shadow-[0_16px_48px_rgb(23_23_23/0.14)] ring-0"
      >
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={(value) => {
            setLocale(value as Locale);
            setOpen(false);
          }}
        >
          <DropdownMenuLabel className="px-2.5 pt-2 pb-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {t.common.language}
          </DropdownMenuLabel>
          {languageOptions.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              className={`min-h-10 gap-3 rounded-lg px-2.5 py-2 pr-9 text-sm focus:bg-muted focus:text-foreground focus:**:text-foreground ${
                option.value === locale ? 'bg-brand/8 text-foreground' : ''
              }`}
            >
              <span className="w-7 text-xs font-semibold tracking-wide text-muted-foreground group-focus/dropdown-menu-item:text-foreground">
                {option.short}
              </span>
              <span className="font-medium">{option.label}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
