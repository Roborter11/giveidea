'use client';

/* oxlint-disable next/no-html-link-for-pages -- vinext uses native document navigation */

import {
  type SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Archive,
  ArrowLeft,
  Check,
  Inbox,
  LoaderCircle,
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
  new: 'bg-brand/10 text-brand',
  reviewed: 'bg-muted text-foreground',
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
    let active = true;

    fetch('/api/admin/ideas', { cache: 'no-store' })
      .then(async (response) => {
        if (!active) return;
        if (response.status === 401) {
          setView('login');
          return;
        }
        if (!response.ok) throw new Error('Не удалось загрузить идеи.');

        const data = (await response.json()) as { ideas: Idea[] };
        if (!active) return;
        setIdeas(data.ideas);
        setView('ready');
      })
      .catch(() => {
        if (active) setView('login');
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleLogin(
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) {
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
        <LoaderCircle
          className="size-5 animate-spin text-muted-foreground"
          aria-label="Загружаем идеи"
        />
      </main>
    );
  }

  if (view === 'login') {
    return (
      <main className="min-h-screen bg-background">
        <header className="border-b border-foreground/10">
          <div className="mx-auto flex h-16 max-w-6xl items-center px-5 sm:px-8">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              На главную
            </a>
          </div>
        </header>

        <section className="mx-auto flex max-w-6xl justify-center px-5 py-14 sm:px-8 sm:py-24">
          <form className="w-full max-w-sm" onSubmit={handleLogin}>
            <a href="/" className="text-lg font-semibold tracking-[-0.04em]">
              Суть<span className="text-brand">.</span>
            </a>
            <h1 className="mt-10 text-3xl font-semibold tracking-[-0.05em]">
              Вход для команды
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Введите пароль администратора.
            </p>
            <label className="field-label mt-8" htmlFor="admin-password">
              <span>Пароль</span>
              <Input
                id="admin-password"
                name="password"
                type="password"
                required
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
              className="mt-5 h-12 w-full bg-brand text-base text-white hover:bg-foreground"
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
      <header className="border-b border-foreground/10 bg-background">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="/" className="text-lg font-semibold tracking-[-0.04em]">
            Суть<span className="text-brand">.</span>
          </a>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="size-4" aria-hidden="true" />
            Выйти
          </Button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="flex flex-col gap-5 border-b border-foreground/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              Идеи
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {newCount === 0
                ? 'Новых заявок нет'
                : `Новых заявок: ${newCount}`}
            </p>
          </div>
          <div className="flex w-fit rounded-lg bg-muted p-1 text-sm">
            <button
              type="button"
              className={`rounded-md px-4 py-2 transition-colors ${filter === 'active' ? 'bg-surface text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setFilter('active')}
            >
              Активные
            </button>
            <button
              type="button"
              className={`rounded-md px-4 py-2 transition-colors ${filter === 'all' ? 'bg-surface text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setFilter('all')}
            >
              Все
            </button>
          </div>
        </div>

        {visibleIdeas.length === 0 ? (
          <div className="mt-8 grid min-h-72 place-items-center rounded-lg border border-foreground/10 bg-surface px-5 text-center">
            <div>
              <Inbox
                className="mx-auto size-5 text-muted-foreground"
                aria-hidden="true"
              />
              <p className="mt-4 font-medium">Здесь пока пусто</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Новые идеи появятся автоматически.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {visibleIdeas.map((idea) => (
              <article
                key={idea.id}
                className={`rounded-lg border border-foreground/10 bg-surface p-5 sm:p-6 ${idea.status === 'archived' ? 'opacity-60' : ''}`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold">{idea.name}</p>
                    <a
                      href={`mailto:${idea.email}`}
                      className="mt-1 inline-block break-all text-sm text-brand hover:underline"
                    >
                      {idea.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span
                      className={`rounded-full px-2.5 py-1 ${statusTone[idea.status]}`}
                    >
                      {statusLabels[idea.status]}
                    </span>
                    <time>
                      {new Intl.DateTimeFormat('ru-RU', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      }).format(new Date(idea.createdAt))}
                    </time>
                  </div>
                </div>

                <p className="mt-5 max-w-3xl whitespace-pre-wrap text-[15px] leading-relaxed">
                  {idea.idea}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={
                      updatingId === idea.id || idea.status === 'reviewed'
                    }
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
                    onClick={() => updateStatus(idea.id, 'archived')}
                  >
                    <Archive className="size-3.5" aria-hidden="true" />
                    В архив
                  </Button>
                  <a
                    href={`mailto:${idea.email}`}
                    className="inline-flex h-7 items-center justify-center gap-1 rounded-md bg-foreground px-2.5 text-[0.8rem] font-medium text-white transition-colors hover:bg-foreground/80"
                  >
                    <Mail className="size-3.5" aria-hidden="true" />
                    Ответить
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
