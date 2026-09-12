import { ArrowDown } from 'lucide-react';

import { IdeaForm } from '@/components/idea-form';

export default function Home() {
  return (
    <main
      id="top"
      className="min-h-screen overflow-hidden bg-background text-foreground"
    >
      <header className="sticky top-0 z-40 mx-auto flex h-16 w-full max-w-[1480px] items-center justify-between border-b border-foreground/15 bg-background px-5 sm:px-8 lg:static lg:h-auto lg:py-5 lg:px-12">
        <a href="#top" className="text-lg font-semibold tracking-[-0.04em]">
          Суть<span className="text-accent-strong">.</span>
        </a>
        <div className="flex items-center gap-6 text-[11px] font-medium uppercase tracking-[0.12em] lg:text-[12px]">
          <span className="hidden items-center gap-2 text-muted-foreground sm:flex">
            <span className="size-1.5 bg-accent-strong" />
            Приём идей открыт
          </span>
          <a className="link-line" href="/admin">
            <span className="lg:hidden">Админ</span>
            <span className="hidden lg:inline">Вход для команды</span>
          </a>
        </div>
      </header>

      <section className="lg:hidden">
        <div className="px-5 pt-9 pb-10 sm:px-8 sm:pt-12 sm:pb-12">
          <p className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            <span className="inline-block size-2 bg-accent-strong" />
            Студия цифровых продуктов
          </p>
          <h1 className="max-w-2xl text-[clamp(3.35rem,15.5vw,6.5rem)] font-medium leading-[0.87] tracking-[-0.075em]">
            Есть проблема?
            <br />
            Сделаем{' '}
            <span className="font-serif italic tracking-[-0.05em]">
              продукт.
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Расскажите о задаче, которую стоит решить. Если увидим потенциал —
            соберём команду и запустим SaaS или B2B‑сервис.
          </p>
          <a
            href="#idea-form-mobile"
            className="mt-8 flex h-14 w-full items-center justify-between bg-foreground px-5 text-sm font-medium text-background active:translate-y-px"
          >
            Оставить идею
            <ArrowDown className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="border-y border-foreground/15 bg-surface px-5 py-9 sm:px-8 sm:py-12">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 flex items-start justify-between gap-5">
              <div>
                <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  Новая заявка / 01
                </p>
                <h2 className="max-w-md text-[2rem] font-medium leading-[1.02] tracking-[-0.05em] sm:text-4xl">
                  Что вы хотите изменить?
                </h2>
              </div>
              <span className="border border-foreground/20 px-2 py-1 font-mono text-[9px] uppercase tracking-wider">
                2 мин
              </span>
            </div>
            <IdeaForm formId="idea-form-mobile" compact />
          </div>
        </div>

        <footer className="flex items-center justify-between px-5 py-6 text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:px-8">
          <span>Суть / 2026</span>
          <span>Идея → Продукт</span>
        </footer>
      </section>

      <section className="mx-auto hidden w-full max-w-[1480px] border-b border-foreground/15 lg:grid lg:min-h-[calc(100vh-73px)] lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative flex flex-col justify-between border-r border-foreground/15 px-12 pt-20 pb-12">
          <div>
            <p className="mb-7 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              <span className="inline-block size-2 bg-accent-strong" />
              Студия цифровых продуктов
            </p>
            <h1 className="max-w-4xl text-[clamp(4.8rem,7.2vw,7.8rem)] font-medium leading-[0.88] tracking-[-0.075em]">
              Есть проблема?
              <br />
              Сделаем{' '}
              <span className="font-serif italic tracking-[-0.05em]">
                продукт.
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-xl leading-relaxed text-muted-foreground">
              Опишите идею или задачу, которую стоит решить. Мы изучим её и,
              если увидим потенциал, соберём команду для запуска SaaS или
              B2B‑сервиса.
            </p>
          </div>

          <div className="mt-24 flex items-end justify-between">
            <a
              href="#idea-form-desktop"
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

        <div className="flex items-center bg-surface px-12 py-16">
          <div className="mx-auto w-full max-w-xl">
            <div className="mb-9 flex items-start justify-between gap-6">
              <div>
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  Новая заявка / 01
                </p>
                <h2 className="text-4xl font-medium tracking-[-0.045em]">
                  Расскажите, что вы заметили
                </h2>
              </div>
              <span className="mt-1 border border-foreground/20 px-2 py-1 font-mono text-[10px] uppercase tracking-wider">
                ≈ 2 мин
              </span>
            </div>

            <IdeaForm formId="idea-form-desktop" />
          </div>
        </div>
      </section>
    </main>
  );
}
