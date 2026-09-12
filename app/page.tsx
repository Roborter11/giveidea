'use client';

/* oxlint-disable next/no-html-link-for-pages -- vinext uses native document navigation */

import {
  useLanguage,
  useLocalizedDocument,
} from '@/components/language-provider';
import { LanguageSwitcher } from '@/components/language-switcher';
import { IdeaForm } from '@/components/idea-form';
import { localizedHref } from '@/lib/i18n';

export default function Home() {
  const { locale, t } = useLanguage();

  useLocalizedDocument({
    title: t.meta.homeTitle,
    description: t.meta.homeDescription,
    socialTitle: t.home.headline,
    locale,
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-foreground/10">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a
            href={localizedHref('/', locale)}
            className="text-lg font-semibold tracking-[-0.04em]"
          >
            {t.common.brand}
            <span className="text-brand">.</span>
          </a>
          <div className="flex items-center gap-3 sm:gap-5">
            <LanguageSwitcher />
            <a
              href={localizedHref('/admin', locale)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t.common.team}
            </a>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:min-h-[calc(100vh-64px)] lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-24 lg:py-24">
        <div className="lg:pt-8">
          <h1 className="max-w-xl text-[clamp(2.9rem,5.5vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-balance">
            {t.home.headline}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.home.description}
          </p>
        </div>

        <div className="border-t border-foreground/15 pt-7 lg:border-t-0 lg:pt-0">
          <h2 className="text-2xl font-semibold tracking-[-0.04em]">
            {t.home.formTitle}
          </h2>
          <p className="mt-2 mb-8 text-sm text-muted-foreground">
            {t.home.duration}
          </p>
          <IdeaForm formId="idea-form" />
        </div>
      </section>
    </main>
  );
}
