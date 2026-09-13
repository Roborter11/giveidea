'use client';

import { type SyntheticEvent, useState } from 'react';
import { Check, LoaderCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/components/language-provider';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function IdeaForm({ formId = 'idea-form' }: { formId?: string }) {
  const { locale, t } = useLanguage();
  const [state, setState] = useState<FormState>('idle');
  const [error, setError] = useState('');
  const [validationAttempted, setValidationAttempted] = useState(false);

  async function handleSubmit(
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) {
    event.preventDefault();
    setState('submitting');
    setError('');

    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, locale }),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || t.form.fallbackError);
      }

      form.reset();
      setValidationAttempted(false);
      setState('success');
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : t.form.fallbackError,
      );
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <div className="rounded-lg border border-foreground/10 bg-surface p-6 sm:p-8">
        <span className="grid size-9 place-items-center rounded-full bg-brand text-white">
          <Check className="size-4" strokeWidth={2.5} aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em]">
          {t.form.successTitle}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          {t.form.successDescription}
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-7 h-11 bg-transparent"
          onClick={() => setState('idle')}
        >
          {t.form.submitAnother}
        </Button>
      </div>
    );
  }

  return (
    <form
      id={formId}
      className="space-y-5"
      data-validation={validationAttempted ? 'attempted' : 'idle'}
      onInvalidCapture={() => setValidationAttempted(true)}
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field-label" htmlFor={`${formId}-name`}>
          <span>{t.form.name}</span>
          <Input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            placeholder={t.form.namePlaceholder}
            className="field-input"
          />
        </label>
        <label className="field-label" htmlFor={`${formId}-email`}>
          <span>{t.form.email}</span>
          <Input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="name@company.ru"
            className="field-input"
          />
        </label>
      </div>

      <label className="sr-only" aria-hidden="true">
        {t.form.honeypot}
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="field-label" htmlFor={`${formId}-idea`}>
        <span>{t.form.idea}</span>
        <Textarea
          id={`${formId}-idea`}
          name="idea"
          required
          minLength={20}
          maxLength={5000}
          placeholder={t.form.ideaPlaceholder}
          className="min-h-36 resize-y rounded-lg border-input bg-surface px-4 py-3 text-base leading-relaxed shadow-none focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/15"
        />
      </label>

      <div className="pt-1">
        <Button
          type="submit"
          size="lg"
          disabled={state === 'submitting'}
          className="h-12 w-full bg-brand px-6 text-base text-white hover:bg-foreground sm:w-auto"
        >
          {state === 'submitting' ? (
            <>
              <LoaderCircle
                className="size-4 animate-spin"
                aria-hidden="true"
              />
              {t.form.submitting}
            </>
          ) : (
            t.form.submit
          )}
        </Button>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          {t.form.consent}
        </p>
        {error ? (
          <p role="alert" className="mt-2 text-sm text-destructive">
            {error}
          </p>
        ) : null}
      </div>
    </form>
  );
}
