import { ArrowDown, ArrowUpRight } from 'lucide-react';

import { IdeaForm } from '@/components/idea-form';

const steps = ['Проблема', 'Контекст', 'Возможность'];

export default function Home() {
  return (
    <main id="top" className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 flex h-[68px] items-stretch bg-foreground text-white lg:static">
        <a
          href="#top"
          className="flex w-[132px] items-center border-r border-white/20 px-5 font-mono text-sm font-semibold tracking-[0.12em] sm:w-[176px] sm:px-8 lg:w-[280px] lg:px-10"
        >
          СУТЬ<span className="text-signal">/</span>
        </a>
        <div className="flex flex-1 items-center justify-between px-5 sm:px-8 lg:px-10">
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-white/55 sm:block">
            Продуктовая лаборатория
          </span>
          <a
            href="/admin"
            className="ml-auto flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white"
          >
            <span className="size-1.5 bg-signal" />
            Вход
          </a>
        </div>
      </header>

      <section className="lg:hidden">
        <div className="blueprint-rule bg-brand px-5 pt-10 pb-9 text-white sm:px-8 sm:pt-14">
          <div className="mb-12 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
            <span>Приём идей открыт</span>
            <span>001—∞</span>
          </div>
          <h1 className="max-w-3xl text-[clamp(3.4rem,15vw,6.5rem)] font-semibold leading-[0.88] tracking-[-0.075em]">
            Не храните идею в заметках.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/78 sm:text-lg">
            Опишите реальную проблему. Мы проверим гипотезу и, если она сильная,
            соберём SaaS или B2B‑продукт.
          </p>
          <a
            href="#idea-form-mobile"
            className="mt-9 flex h-14 w-full items-center justify-between bg-signal px-5 text-sm font-semibold text-foreground active:translate-y-px"
          >
            Передать идею
            <ArrowDown className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="border-b border-foreground/15 bg-surface">
          <div className="grid grid-cols-3 divide-x divide-foreground/15 border-b border-foreground/15">
            {steps.map((step, index) => (
              <div key={step} className="px-4 py-4 sm:px-8">
                <span className="mb-2 block font-mono text-[9px] text-muted-foreground">
                  0{index + 1}
                </span>
                <span className="text-xs font-semibold">{step}</span>
              </div>
            ))}
          </div>

          <div className="px-5 py-10 sm:px-8 sm:py-14">
            <div className="mx-auto max-w-2xl">
              <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-brand">
                Новая заявка
              </p>
              <h2 className="max-w-lg text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.055em] sm:text-5xl">
                Начнём с проблемы
              </h2>
              <p className="mt-3 mb-8 text-sm leading-relaxed text-muted-foreground">
                Без презентации и сложных терминов. Напишите, что не работает и
                для кого.
              </p>
              <IdeaForm formId="idea-form-mobile" compact />
            </div>
          </div>
        </div>

        <footer className="flex items-center justify-between bg-foreground px-5 py-6 font-mono text-[9px] uppercase tracking-[0.14em] text-white/55 sm:px-8">
          <span>Суть / Product lab</span>
          <span>Berlin / 2026</span>
        </footer>
      </section>

      <section className="hidden lg:block">
        <div className="blueprint-rule grid min-h-[47vh] grid-cols-[minmax(0,1fr)_280px] bg-brand text-white">
          <div className="flex flex-col justify-between border-r border-white/20 px-10 pt-10 pb-9 xl:px-14 xl:pt-12">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-white/65">
              <span>Приём идей открыт</span>
              <span>001—∞</span>
            </div>
            <h1 className="max-w-[1120px] text-[clamp(5rem,8vw,9rem)] font-semibold leading-[0.82] tracking-[-0.078em]">
              Не храните идею в заметках.
            </h1>
          </div>

          <div className="flex flex-col justify-between p-8 xl:p-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/65">
              SaaS / B2B
            </span>
            <div>
              <p className="text-lg leading-relaxed text-white/82">
                Опишите реальную проблему. Мы проверим гипотезу и соберём
                продукт.
              </p>
              <a
                href="#idea-form-desktop"
                className="mt-7 flex size-14 items-center justify-center bg-signal text-foreground transition-transform hover:-translate-y-1"
                aria-label="Перейти к форме"
              >
                <ArrowDown className="size-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="grid min-h-[53vh] grid-cols-[360px_minmax(0,1fr)] xl:grid-cols-[430px_minmax(0,1fr)]">
          <aside className="flex flex-col justify-between bg-foreground p-10 text-white xl:p-14">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                Как описать
              </p>
              <ol className="mt-8 divide-y divide-white/18 border-y border-white/18">
                {steps.map((step, index) => (
                  <li key={step} className="flex items-center gap-5 py-4">
                    <span className="font-mono text-[10px] text-signal">
                      0{index + 1}
                    </span>
                    <span className="text-sm font-semibold">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <a
              href="/admin"
              className="flex items-center justify-between border-t border-white/18 pt-5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/60 hover:text-white"
            >
              Для команды
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </aside>

          <div className="bg-background px-10 py-12 xl:px-16 xl:py-14">
            <div className="mx-auto max-w-4xl">
              <div className="mb-9 grid grid-cols-[1fr_auto] items-end gap-8">
                <div>
                  <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-brand">
                    Новая заявка / 01
                  </p>
                  <h2 className="text-5xl font-semibold tracking-[-0.055em] xl:text-6xl">
                    Начнём с проблемы
                  </h2>
                </div>
                <p className="max-w-[220px] text-sm leading-relaxed text-muted-foreground">
                  Без презентации. Просто опишите, что не работает и для кого.
                </p>
              </div>
              <IdeaForm formId="idea-form-desktop" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
