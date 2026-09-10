import { ArrowDown } from 'lucide-react';

import { IdeaForm } from '@/components/idea-form';

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-[1480px] items-center justify-between border-b border-foreground/15 px-5 py-5 sm:px-8 lg:px-12">
        <a href="#top" className="text-lg font-semibold tracking-[-0.04em]">
          Суть<span className="text-accent-strong">.</span>
        </a>
        <div className="flex items-center gap-6 text-[12px] font-medium uppercase tracking-[0.12em]">
          <span className="hidden text-muted-foreground sm:inline">
            Приём идей открыт
          </span>
          <a className="link-line" href="/admin">
            Вход для команды
          </a>
        </div>
      </header>

      <section
        id="top"
        className="mx-auto grid w-full max-w-[1480px] border-b border-foreground/15 lg:min-h-[calc(100vh-73px)] lg:grid-cols-[1.08fr_0.92fr]"
      >
        <div className="relative flex flex-col justify-between border-foreground/15 px-5 pb-9 pt-12 sm:px-8 sm:pb-12 sm:pt-16 lg:border-r lg:px-12 lg:pb-12 lg:pt-20">
          <div>
            <p className="mb-7 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              <span className="inline-block h-2 w-2 bg-accent-strong" />
              Студия цифровых продуктов
            </p>
            <h1 className="max-w-4xl text-[clamp(3.25rem,7.2vw,7.8rem)] font-medium leading-[0.88] tracking-[-0.075em]">
              Есть проблема?
              <br />
              Сделаем{' '}
              <span className="font-serif italic tracking-[-0.05em]">
                продукт.
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Опишите идею или задачу, которую стоит решить. Мы изучим её и,
              если увидим потенциал, соберём команду для запуска SaaS или
              B2B‑сервиса.
            </p>
          </div>

          <div className="mt-16 flex items-end justify-between lg:mt-24">
            <a
              href="#idea-form"
              className="flex items-center gap-3 text-sm font-medium"
            >
              <span className="grid size-10 place-items-center border border-foreground/25">
                <ArrowDown className="size-4" aria-hidden="true" />
              </span>
              К форме
            </a>
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              RU / 2026
            </span>
          </div>
        </div>

        <div className="flex items-center bg-surface px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
          <div className="mx-auto w-full max-w-xl">
            <div className="mb-9 flex items-start justify-between gap-6">
              <div>
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  Новая заявка / 01
                </p>
                <h2 className="text-3xl font-medium tracking-[-0.045em] sm:text-4xl">
                  Расскажите, что вы заметили
                </h2>
              </div>
              <span className="mt-1 hidden border border-foreground/20 px-2 py-1 font-mono text-[10px] uppercase tracking-wider sm:inline">
                ≈ 2 мин
              </span>
            </div>

            <IdeaForm />
          </div>
        </div>
      </section>
    </main>
  );
}
