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
import {
  useLanguage,
  useLocalizedDocument,
} from '@/components/language-provider';
import { BrandLogo } from '@/components/brand-logo';
import { LanguageSwitcher } from '@/components/language-switcher';
import { dateLocales, localizedHref } from '@/lib/i18n';

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

const statusTone: Record<IdeaStatus, string> = {
  new: 'bg-brand/10 text-brand',
  reviewed: 'bg-muted text-foreground',
  archived: 'bg-muted text-muted-foreground',
};

export function AdminDashboard() {
  const { locale, t } = useLanguage();
  const [view, setView] = useState<ViewState>('loading');
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [filter, setFilter] = useState<'active' | 'all'>('active');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useLocalizedDocument({
    title: t.meta.adminTitle,
    description: t.admin.loginDescription,
    socialTitle: t.meta.adminTitle,
    locale,
  });

  const statusLabels: Record<IdeaStatus, string> = {
    new: t.admin.statusNew,
    reviewed: t.admin.statusReviewed,
    archived: t.admin.statusArchived,
  };

  const loadIdeas = useCallback(async () => {
    const response = await fetch('/api/admin/ideas', { cache: 'no-store' });
    if (response.status === 401) {
      setView('login');
      return;
    }
    if (!response.ok) throw new Error(t.admin.loadError);

    const data = (await response.json()) as { ideas: Idea[] };
    setIdeas(data.ideas);
    setView('ready');
  }, [t.admin.loadError]);

  useEffect(() => {
    let active = true;

    fetch('/api/admin/ideas', { cache: 'no-store' })
      .then(async (response) => {
        if (!active) return;
        if (response.status === 401) {
          setView('login');
          return;
        }
        if (!response.ok) throw new Error(t.admin.loadError);

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
  }, [t.admin.loadError]);

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
      body: JSON.stringify({ password, locale }),
    });
    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setLoginError(data.error || t.admin.loginError);
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
          aria-label={t.admin.loading}
        />
      </main>
    );
  }

  if (view === 'login') {
    return (
      <main className="min-h-screen bg-background">
        <header className="border-b border-foreground/10">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
            <a
              href={localizedHref('/', locale)}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {t.admin.backHome}
            </a>
            <LanguageSwitcher />
          </div>
        </header>

        <section className="mx-auto flex max-w-6xl justify-center px-5 py-14 sm:px-8 sm:py-24">
          <form className="w-full max-w-sm" onSubmit={handleLogin}>
            <a
              href={localizedHref('/', locale)}
              className="inline-flex shrink-0 items-center"
            >
              <BrandLogo />
            </a>
            <h1 className="mt-10 text-3xl font-semibold tracking-[-0.05em]">
              {t.admin.loginTitle}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t.admin.loginDescription}
            </p>
            <label className="field-label mt-8" htmlFor="admin-password">
              <span>{t.admin.password}</span>
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
              {t.admin.login}
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
          <a
            href={localizedHref('/', locale)}
            className="inline-flex shrink-0 items-center"
          >
            <BrandLogo />
          </a>
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="size-4" aria-hidden="true" />
              {t.admin.logout}
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="flex flex-col gap-5 border-b border-foreground/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              {t.admin.ideas}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {newCount === 0
                ? t.admin.noNewIdeas
                : t.admin.newIdeasCount(newCount)}
            </p>
          </div>
          <div className="flex w-fit rounded-lg bg-muted p-1 text-sm">
            <button
              type="button"
              className={`rounded-md px-4 py-2 transition-colors ${filter === 'active' ? 'bg-surface text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setFilter('active')}
            >
              {t.admin.active}
            </button>
            <button
              type="button"
              className={`rounded-md px-4 py-2 transition-colors ${filter === 'all' ? 'bg-surface text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setFilter('all')}
            >
              {t.admin.all}
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
              <p className="mt-4 font-medium">{t.admin.emptyTitle}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t.admin.emptyDescription}
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
                      {new Intl.DateTimeFormat(dateLocales[locale], {
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
                    {t.admin.reviewedAction}
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
                    {t.admin.archiveAction}
                  </Button>
                  <a
                    href={`mailto:${idea.email}`}
                    className="inline-flex h-7 items-center justify-center gap-1 rounded-md bg-foreground px-2.5 text-[0.8rem] font-medium text-white transition-colors hover:bg-foreground/80"
                  >
                    <Mail className="size-3.5" aria-hidden="true" />
                    {t.admin.replyAction}
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
