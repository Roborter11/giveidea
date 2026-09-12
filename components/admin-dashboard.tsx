'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Archive,
  ArrowLeft,
  ArrowUpRight,
  Check,
  Inbox,
  LoaderCircle,
  LockKeyhole,
  LogOut,
  Mail,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type IdeaStatus = 'new' | 'reviewed' | 'archived';

type Idea = {
  id: string;
  name: string;
  email: string;
  idea: string;
  status: IdeaStatus;
  createdAt: string;
};

type ViewState = 'loading' | 'login' | 'ready';

const statusLabels: Record<IdeaStatus, string> = {
  new: 'Новая',
  reviewed: 'Изучена',
  archived: 'Архив',
};

const statusTone: Record<IdeaStatus, string> = {
  new: 'bg-signal text-foreground',
  reviewed: 'bg-soft text-foreground',
  archived: 'bg-muted text-muted-foreground',
};

export function AdminDashboard() {
  const [view, setView] = useState<ViewState>('loading');
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [filter, setFilter] = useState<'active' | 'all'>('active');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadIdeas = useCallback(async () => {
    const response = await fetch('/api/admin/ideas', { cache: 'no-store' });
    if (response.status === 401) {
      setView('login');
      return;
    }
    if (!response.ok) throw new Error('Не удалось загрузить идеи.');

    const data = (await response.json()) as { ideas: Idea[] };
    setIdeas(data.ideas);
    setView('ready');
  }, []);

  useEffect(() => {
    loadIdeas().catch(() => setView('login'));
  }, [loadIdeas]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    const password = new FormData(event.currentTarget).get('password');

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setLoginError(data.error || 'Не удалось войти.');
      setIsLoggingIn(false);
      return;
    }

    await loadIdeas();
    setIsLoggingIn(false);
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIdeas([]);
    setView('login');
  }

  async function updateStatus(id: string, status: IdeaStatus) {
    setUpdatingId(id);
    const response = await fetch('/api/admin/ideas', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (response.ok) {
      setIdeas((current) =>
        current.map((idea) => (idea.id === id ? { ...idea, status } : idea)),
      );
    }
    setUpdatingId(null);
  }

  const visibleIdeas = useMemo(
    () =>
      ideas.filter((idea) => filter === 'all' || idea.status !== 'archived'),
    [filter, ideas],
  );
  const newCount = ideas.filter((idea) => idea.status === 'new').length;
  const reviewedCount = ideas.filter(
    (idea) => idea.status === 'reviewed',
  ).length;
  const archivedCount = ideas.filter(
    (idea) => idea.status === 'archived',
  ).length;

  if (view === 'loading') {
    return (
      <main className="grid min-h-screen place-items-center bg-foreground text-white">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em]">
          <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
          Загружаем идеи
        </div>
      </main>
    );
  }

  if (view === 'login') {
    return (
      <main className="min-h-screen bg-surface lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(440px,0.9fr)]">
        <section className="blueprint-rule flex min-h-[36svh] flex-col justify-between bg-brand p-5 text-white sm:min-h-[42vh] sm:p-10 lg:min-h-screen lg:p-12">
          <a
            href="/"
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/75 hover:text-white"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Вернуться на сайт
          </a>
          <div>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
              Закрытый контур / 01
            </p>
            <h1 className="max-w-3xl text-[clamp(3.6rem,8vw,8rem)] font-semibold leading-[0.84] tracking-[-0.075em]">
              Вход для команды.
            </h1>
          </div>
        </section>

        <section className="flex items-center px-5 py-12 sm:px-10 lg:px-14">
          <form className="mx-auto w-full max-w-md" onSubmit={handleLogin}>
            <span className="mb-9 grid size-12 place-items-center bg-foreground text-white">
              <LockKeyhole className="size-5" aria-hidden="true" />
            </span>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand">
              Авторизация
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.055em]">
              Введите пароль
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Здесь находятся контакты и описания идей. Доступ есть только у
              администраторов.
            </p>
            <label className="field-label mt-10">
              <span>Пароль администратора</span>
              <Input
                id="admin-password"
                name="password"
                type="password"
                required
                autoFocus
                autoComplete="current-password"
                className="field-input"
              />
            </label>
            {loginError ? (
              <p role="alert" className="mt-3 text-sm text-destructive">
                {loginError}
              </p>
            ) : null}
            <Button
              type="submit"
              disabled={isLoggingIn}
              className="mt-7 h-13 w-full bg-brand font-mono text-[11px] uppercase tracking-[0.08em] text-white hover:bg-foreground"
            >
              {isLoggingIn ? (
                <LoaderCircle
                  className="size-4 animate-spin"
                  aria-hidden="true"
                />
              ) : null}
              Открыть панель
            </Button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 flex h-[68px] items-stretch bg-foreground text-white">
        <a
          href="/"
          className="flex w-[132px] items-center border-r border-white/20 px-5 font-mono text-sm font-semibold tracking-[0.12em] sm:w-[190px] sm:px-8"
        >
          СУТЬ<span className="text-signal">/</span>
        </a>
        <div className="flex flex-1 items-center justify-between px-5 sm:px-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">
            <span className="sm:hidden">Admin</span>
            <span className="hidden sm:inline">Панель администратора</span>
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="font-mono text-[10px] uppercase tracking-[0.1em] text-white hover:bg-white/10 hover:text-white"
          >
            <LogOut className="size-3.5" aria-hidden="true" />
            Выйти
          </Button>
        </div>
      </header>

      <div className="lg:grid lg:min-h-[calc(100vh-68px)] lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="bg-brand px-5 py-7 text-white sm:px-8 lg:sticky lg:top-[68px] lg:flex lg:h-[calc(100vh-68px)] lg:flex-col lg:justify-between lg:p-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
              Сводка
            </p>
            <div className="mt-5 grid grid-cols-3 gap-px bg-white/20 lg:grid-cols-1">
              {[
                ['Новые', newCount],
                ['Изучены', reviewedCount],
                ['Архив', archivedCount],
              ].map(([label, value]) => (
                <div key={label} className="bg-brand py-3 lg:py-5">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.12em] text-white/55">
                    {label}
                  </span>
                  <strong className="mt-1 block text-2xl font-semibold tracking-[-0.04em] lg:text-4xl">
                    {String(value).padStart(2, '0')}
                  </strong>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-8 hidden font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-white/45 lg:block">
            Новые заявки появляются здесь автоматически
          </p>
        </aside>

        <section className="px-5 py-8 sm:px-8 sm:py-10 lg:px-10 xl:px-14 xl:py-12">
          <div className="mb-8 flex flex-col gap-6 border-b border-foreground/18 pb-8 sm:flex-row sm:items-end sm:justify-between lg:mb-10">
            <div>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.15em] text-brand">
                Рабочая очередь
              </p>
              <h1 className="text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.88] tracking-[-0.07em]">
                Входящие идеи
              </h1>
            </div>
            <div className="grid grid-cols-2 border border-foreground/25 bg-surface p-1 font-mono text-[10px] uppercase tracking-[0.08em]">
              <button
                type="button"
                className={`min-h-10 px-5 ${filter === 'active' ? 'bg-foreground text-white' : 'hover:bg-muted'}`}
                onClick={() => setFilter('active')}
              >
                Активные
              </button>
              <button
                type="button"
                className={`min-h-10 px-5 ${filter === 'all' ? 'bg-foreground text-white' : 'hover:bg-muted'}`}
                onClick={() => setFilter('all')}
              >
                Все
              </button>
            </div>
          </div>

          {visibleIdeas.length === 0 ? (
            <div className="grid min-h-[360px] place-items-center border border-foreground/20 bg-surface px-5 text-center">
              <div>
                <span className="mx-auto mb-5 grid size-12 place-items-center bg-soft">
                  <Inbox className="size-5" aria-hidden="true" />
                </span>
                <p className="text-xl font-semibold">В очереди пока пусто</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Новые идеи появятся здесь автоматически.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {visibleIdeas.map((idea, index) => (
                <article
                  key={idea.id}
                  className={`border border-foreground/20 bg-surface ${idea.status === 'archived' ? 'opacity-55' : ''}`}
                >
                  <div className="flex items-center justify-between border-b border-foreground/15 px-4 py-3 sm:px-5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`px-2 py-1 font-mono text-[9px] uppercase tracking-[0.08em] ${statusTone[idea.status]}`}
                      >
                        {statusLabels[idea.status]}
                      </span>
                    </div>
                    <time className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted-foreground">
                      {new Intl.DateTimeFormat('ru-RU', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      }).format(new Date(idea.createdAt))}
                    </time>
                  </div>

                  <div className="grid gap-7 p-5 sm:p-6 xl:grid-cols-[200px_minmax(0,1fr)_150px]">
                    <div>
                      <p className="text-lg font-semibold tracking-[-0.025em]">
                        {idea.name}
                      </p>
                      <a
                        href={`mailto:${idea.email}`}
                        className="mt-2 inline-flex max-w-full items-center gap-1 break-all font-mono text-[10px] text-brand hover:underline"
                      >
                        {idea.email}
                        <ArrowUpRight className="size-3" aria-hidden="true" />
                      </a>
                    </div>

                    <p className="max-w-3xl whitespace-pre-wrap text-base leading-relaxed">
                      {idea.idea}
                    </p>

                    <div className="grid grid-cols-2 gap-2 xl:flex xl:flex-col">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={
                          updatingId === idea.id || idea.status === 'reviewed'
                        }
                        className="min-h-11 border-foreground/25 bg-transparent font-mono text-[10px] uppercase xl:min-h-0"
                        onClick={() => updateStatus(idea.id, 'reviewed')}
                      >
                        <Check className="size-3.5" aria-hidden="true" />
                        Изучена
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={
                          updatingId === idea.id || idea.status === 'archived'
                        }
                        className="min-h-11 border-foreground/25 bg-transparent font-mono text-[10px] uppercase xl:min-h-0"
                        onClick={() => updateStatus(idea.id, 'archived')}
                      >
                        <Archive className="size-3.5" aria-hidden="true" />
                        Архив
                      </Button>
                      <a
                        href={`mailto:${idea.email}`}
                        className="col-span-2 inline-flex min-h-11 items-center justify-center gap-2 bg-foreground px-3 font-mono text-[10px] uppercase text-white hover:bg-brand xl:min-h-8"
                      >
                        <Mail className="size-3.5" aria-hidden="true" />
                        Ответить
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
