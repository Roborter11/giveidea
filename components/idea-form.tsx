'use client';

import { FormEvent, useState } from 'react';
import { ArrowUpRight, Check, LoaderCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function IdeaForm({
  formId = 'idea-form',
  compact = false,
}: {
  formId?: string;
  compact?: boolean;
}) {
  const [state, setState] = useState<FormState>('idle');
  const [error, setError] = useState('');
  const [ideaLength, setIdeaLength] = useState(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('submitting');
    setError('');

    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || 'Не получилось отправить идею.');
      }

      form.reset();
      setIdeaLength(0);
      setState('success');
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Не получилось отправить идею.',
      );
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <div
        className={cn(
          'flex flex-col justify-between border-t border-foreground/20 pt-7',
          compact ? 'min-h-[330px]' : 'min-h-[380px]',
        )}
      >
        <div>
          <span className="mb-7 grid size-12 place-items-center bg-accent-strong text-foreground">
            <Check className="size-5" aria-hidden="true" />
          </span>
          <h3
            className={cn(
              'max-w-md font-medium tracking-[-0.05em]',
              compact ? 'text-3xl sm:text-4xl' : 'text-4xl',
            )}
          >
            Идея уже у нас.
          </h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            Мы внимательно изучим описание. Если увидим совпадение по опыту и
            потенциалу — напишем на указанную почту.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          className={cn(
            'rounded-none border-foreground/30 bg-transparent px-4',
            compact ? 'h-12 w-full sm:w-fit' : 'w-fit',
          )}
          onClick={() => setState('idle')}
        >
          Отправить ещё одну
        </Button>
      </div>
    );
  }

  return (
    <form
      id={formId}
      className={compact ? 'scroll-mt-20 space-y-6' : 'space-y-7'}
      onSubmit={handleSubmit}
    >
      <div
        className={cn(
          'grid gap-7',
          compact ? 'md:grid-cols-2' : 'sm:grid-cols-2',
        )}
      >
        <label className="field-label">
          <span>Ваше имя</span>
          <Input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            placeholder="Алексей"
            className="field-input"
          />
        </label>
        <label className="field-label">
          <span>Почта</span>
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
        Не заполняйте это поле
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="field-label">
        <span className="flex items-center justify-between">
          <span>Идея или проблема</span>
          <span className="font-mono text-[10px] tracking-normal">
            {ideaLength} / 5000
          </span>
        </span>
        <Textarea
          id={`${formId}-idea`}
          name="idea"
          required
          minLength={20}
          maxLength={5000}
          onChange={(event) => setIdeaLength(event.target.value.length)}
          placeholder="Кто сталкивается с проблемой? Как её решают сейчас? Что можно сделать лучше?"
          className={cn(
            'resize-y rounded-none border-0 border-b border-foreground/25 bg-transparent px-0 py-4 text-base leading-relaxed normal-case tracking-normal shadow-none focus-visible:border-foreground focus-visible:ring-0',
            compact ? 'min-h-36' : 'min-h-40',
          )}
        />
      </label>

      <div
        className={cn(
          'flex flex-col gap-5 pt-2',
          compact ? '' : 'sm:flex-row sm:items-center sm:justify-between',
        )}
      >
        <div className="max-w-[290px]">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Нажимая «Отправить», вы соглашаетесь на обработку контактных данных.
          </p>
          {error ? (
            <p
              role="alert"
              className="mt-2 text-xs font-medium text-destructive"
            >
              {error}
            </p>
          ) : null}
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={state === 'submitting'}
          className={cn(
            'h-13 min-w-[180px] rounded-none bg-foreground px-6 text-background hover:bg-accent-strong hover:text-foreground',
            compact && 'h-14 w-full text-base',
          )}
        >
          {state === 'submitting' ? (
            <>
              <LoaderCircle
                className="size-4 animate-spin"
                aria-hidden="true"
              />
              Отправляем
            </>
          ) : (
            <>
              Отправить идею
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
