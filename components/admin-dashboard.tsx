'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Archive,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
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

  if (view === 'loading') {
    return (
      <main className="grid min-h-screen place-items-center bg-background">
        <LoaderCircle className="size-5 animate-spin" aria-label="Загрузка" />
      </main>
    );
  }

  if (view === 'login') {
    return (
      <main className="grid min-h-screen bg-background lg:grid-cols-2">
        <section className="flex min-h-[34svh] flex-col justify-between border-b border-foreground/15 bg-foreground p-5 text-background sm:min-h-[38vh] sm:p-10 lg:min-h-screen lg:border-b-0 lg:border-r lg:p-12">
          <a href="/" className="flex items-center gap-2 text-sm">
            <ArrowLeft className="size-4" aria-hidden="true" />
            На сайт
          </a>
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.15em] text-background/55">
              Закрытый раздел
            </p>
            <h1 className="max-w-xl text-[clamp(3.5rem,7vw,7rem)] font-medium leading-[0.88] tracking-[-0.075em]">
              Вход для команды<span className="text-accent-strong">.</span>
            </h1>
          </div>
        </section>

        <section className="flex items-center px-5 py-10 sm:p-10 lg:p-16">
          <form className="mx-auto w-full max-w-md" onSubmit={handleLogin}>
            <LockKeyhole
              className="mb-8 size-8"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <h2 className="text-3xl font-medium tracking-[-0.045em]">
              Введите пароль
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Заявки содержат личные данные и доступны только администраторам.
            </p>
            <label className="field-label mt-9">
              <span>Пароль</span>
              <Input
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
              className="mt-7 h-12 w-full rounded-none"
            >
              {isLoggingIn ? (
                <LoaderCircle
                  className="size-4 animate-spin"
                  aria-hidden="true"
                />
              ) : null}
              Войти
            </Button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-foreground/15 bg-background px-5 py-4 sm:px-8 lg:static lg:px-12 lg:py-5">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between">
          <a href="/" className="text-lg font-semibold tracking-[-0.04em]">
            Суть<span className="text-accent-strong">.</span>
          </a>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="size-3.5" aria-hidden="true" />
            Выйти
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-[1480px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        <div className="mb-8 grid gap-6 border-b border-foreground/15 pb-8 sm:mb-12 sm:gap-7 sm:pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Панель администратора
            </p>
            <h1 className="text-[clamp(2.75rem,12vw,6.5rem)] font-medium leading-[0.94] tracking-[-0.07em]">
              Входящие идеи
              <sup className="ml-3 align-top font-mono text-sm font-normal tracking-normal text-muted-foreground">
                {String(newCount).padStart(2, '0')}
              </sup>
            </h1>
          </div>
          <div className="grid w-full grid-cols-2 border border-foreground/20 p-1 text-xs font-medium uppercase tracking-[0.08em] sm:flex sm:w-fit">
            <button
              type="button"
              className={`min-h-10 px-4 py-2 ${filter === 'active' ? 'bg-foreground text-background' : ''}`}
              onClick={() => setFilter('active')}
            >
              Активные
            </button>
            <button
              type="button"
              className={`min-h-10 px-4 py-2 ${filter === 'all' ? 'bg-foreground text-background' : ''}`}
              onClick={() => setFilter('all')}
            >
              Все
            </button>
          </div>
        </div>

        {visibleIdeas.length === 0 ? (
          <div className="grid min-h-[300px] place-items-center border border-dashed border-foreground/25 px-5 text-center sm:min-h-[360px]">
            <div>
              <Inbox
                className="mx-auto mb-4 size-7"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <p className="text-lg font-medium">Здесь пока тихо</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Новые заявки появятся в этом разделе.
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-foreground/15 border-y border-foreground/15">
            {visibleIdeas.map((idea, index) => (
              <article
                key={idea.id}
                className={`grid gap-5 py-7 sm:gap-7 sm:py-8 lg:grid-cols-[72px_180px_minmax(0,1fr)_180px] lg:py-10 ${idea.status === 'archived' ? 'opacity-50' : ''}`}
              >
                <div className="flex items-center justify-between lg:hidden">
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="bg-accent-strong px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-foreground">
                    {statusLabels[idea.status]}
                  </span>
                </div>
                <div className="hidden font-mono text-xs text-muted-foreground lg:block">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <p className="font-medium">{idea.name}</p>
                  <a
                    href={`mailto:${idea.email}`}
                    className="mt-1 inline-flex max-w-full items-center gap-1 break-all text-sm text-muted-foreground hover:text-foreground"
                  >
                    {idea.email}
                    <ArrowUpRight className="size-3" aria-hidden="true" />
                  </a>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                    {new Intl.DateTimeFormat('ru-RU', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    }).format(new Date(idea.createdAt))}
                  </p>
                </div>
                <div>
                  <span className="mb-4 hidden bg-accent-strong px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-foreground lg:inline-block">
                    {statusLabels[idea.status]}
                  </span>
                  <p className="max-w-3xl whitespace-pre-wrap text-base leading-relaxed sm:text-lg">
                    {idea.idea}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-col lg:items-stretch">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={
                      updatingId === idea.id || idea.status === 'reviewed'
                    }
                    className="min-h-11 rounded-none bg-transparent lg:min-h-0"
                    onClick={() => updateStatus(idea.id, 'reviewed')}
                  >
                    <CheckCircle2 className="size-3.5" aria-hidden="true" />
                    Изучена
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={
                      updatingId === idea.id || idea.status === 'archived'
                    }
                    className="min-h-11 rounded-none bg-transparent lg:min-h-0"
                    onClick={() => updateStatus(idea.id, 'archived')}
                  >
                    <Archive className="size-3.5" aria-hidden="true" />
                    В архив
                  </Button>
                  <a
                    href={`mailto:${idea.email}`}
                    className="col-span-2 inline-flex min-h-11 items-center justify-center gap-1 rounded-none px-2.5 text-[0.8rem] font-medium hover:bg-muted lg:min-h-7 lg:justify-start"
                  >
                    <Mail className="size-3.5" aria-hidden="true" />
                    Ответить
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
