import { useState } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@lib/cn';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface ContactFormProps {
  onSubmit?: (data: FormState) => Promise<void>;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm({ onSubmit }: ContactFormProps): React.JSX.Element {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) {
      next.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please enter a valid email';
    }
    if (!form.message.trim()) {
      next.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      next.message = 'Message must be at least 10 characters';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    try {
      if (onSubmit) {
        await onSubmit(form);
      } else {
        const apiUrl = import.meta.env['VITE_API_URL'] as string | undefined;
        const res = await fetch(`${apiUrl ?? ''}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error('Request failed');
      }
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        data-testid="form-success"
        className="rounded-xl border border-[var(--color-terminal-green)]/20 bg-[var(--color-terminal-green)]/5 p-8 text-center"
      >
        <p className="mb-2 text-lg font-medium text-[var(--color-foreground)]">Message sent! ✓</p>
        <p className="text-sm text-[var(--color-foreground)]/60">
          I&apos;ll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => void handleSubmit(e)}
      data-testid="contact-form"
      noValidate
      className="space-y-6"
    >
      <div>
        <label
          htmlFor="contact-name"
          className="mb-2 block text-sm font-medium text-[var(--color-foreground)]/70"
        >
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className={cn(
            'w-full rounded-lg border bg-white/[0.03] px-4 py-3 text-sm text-[var(--color-foreground)] outline-none transition-colors placeholder:text-white/20 focus:ring-1 focus:ring-[var(--color-primary)]',
            errors.name
              ? 'border-red-500/50'
              : 'border-white/10 focus:border-[var(--color-primary)]/50'
          )}
          placeholder="Your name"
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p id="name-error" className="mt-1.5 text-xs text-red-400" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="mb-2 block text-sm font-medium text-[var(--color-foreground)]/70"
        >
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className={cn(
            'w-full rounded-lg border bg-white/[0.03] px-4 py-3 text-sm text-[var(--color-foreground)] outline-none transition-colors placeholder:text-white/20 focus:ring-1 focus:ring-[var(--color-primary)]',
            errors.email
              ? 'border-red-500/50'
              : 'border-white/10 focus:border-[var(--color-primary)]/50'
          )}
          placeholder="your@email.com"
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-xs text-red-400" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-2 block text-sm font-medium text-[var(--color-foreground)]/70"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          rows={5}
          className={cn(
            'w-full resize-none rounded-lg border bg-white/[0.03] px-4 py-3 text-sm text-[var(--color-foreground)] outline-none transition-colors placeholder:text-white/20 focus:ring-1 focus:ring-[var(--color-primary)]',
            errors.message
              ? 'border-red-500/50'
              : 'border-white/10 focus:border-[var(--color-primary)]/50'
          )}
          placeholder="What's on your mind?"
          aria-describedby={errors.message ? 'message-error' : undefined}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-red-400" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-400" role="alert">
          Something went wrong. Please try again or email me directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === 'loading' ? (
          'Sending...'
        ) : (
          <>
            <Send size={16} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
