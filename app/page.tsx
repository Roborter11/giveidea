/* oxlint-disable next/no-html-link-for-pages -- vinext uses native document navigation */

import { IdeaForm } from '@/components/idea-form';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-foreground/10">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="/" className="text-lg font-semibold tracking-[-0.04em]">
            Суть<span className="text-brand">.</span>
          </a>
          <a
            href="/admin"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Для команды
          </a>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:min-h-[calc(100vh-64px)] lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-24 lg:py-24">
        <div className="lg:pt-8">
          <h1 className="max-w-xl text-[clamp(3.25rem,6.5vw,6.25rem)] font-semibold leading-[0.92] tracking-[-0.07em]">
            Есть идея? Расскажите.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Опишите проблему и оставьте контакты. Мы изучим заявку и напишем,
            если сможем превратить её в SaaS или B2B‑продукт.
          </p>
        </div>

        <div className="border-t border-foreground/15 pt-7 lg:border-t-0 lg:pt-0">
          <h2 className="text-2xl font-semibold tracking-[-0.04em]">
            Оставить идею
          </h2>
          <p className="mt-2 mb-8 text-sm text-muted-foreground">
            Это займёт около двух минут.
          </p>
          <IdeaForm formId="idea-form" />
        </div>
      </section>
    </main>
  );
}
