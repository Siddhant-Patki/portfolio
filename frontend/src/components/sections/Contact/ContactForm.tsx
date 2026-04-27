import { useState, useRef } from 'react';
import { Send } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface ContactFormProps {
  onSubmit?: (data: FormState) => Promise<void>;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';
type FieldKey = keyof FormState;
type FormErrors = { [K in FieldKey]?: string };

const inputBase: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: '8px',
  border: '1px solid rgba(255,255,255,0.1)',
  backgroundColor: 'rgba(255,255,255,0.03)',
  color: '#d1d5db',
  fontSize: '15px',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  minHeight: '44px',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
};

const inputError: React.CSSProperties = {
  ...inputBase,
  border: '1px solid rgba(239,68,68,0.5)',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '8px',
  fontSize: '13px',
  fontWeight: 500,
  color: 'rgba(209,213,219,0.6)',
};

function validateField(field: FieldKey, value: string): string | undefined {
  if (field === 'name' && !value.trim()) return 'Name is required';
  if (field === 'email') {
    if (!value.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
  }
  if (field === 'message') {
    if (!value.trim()) return 'Message is required';
    if (value.trim().length < 10) return 'Message must be at least 10 characters';
  }
  return undefined;
}

export function ContactForm({ onSubmit }: ContactFormProps): React.JSX.Element {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<FieldKey>>(new Set());
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function handleChange(field: FieldKey, value: string): void {
    setForm((f) => ({ ...f, [field]: value }));
    if (touched.has(field)) {
      const error = validateField(field, value);
      setErrors((e) => ({ ...e, [field]: error }));
    }
  }

  function handleBlur(field: FieldKey): void {
    setTouched((t) => new Set(t).add(field));
    const error = validateField(field, form[field]);
    setErrors((e) => ({ ...e, [field]: error }));
  }

  function validateAll(): boolean {
    const next: FormErrors = {};
    const nameErr = validateField('name', form.name);
    const emailErr = validateField('email', form.email);
    const msgErr = validateField('message', form.message);
    if (nameErr) next.name = nameErr;
    if (emailErr) next.email = emailErr;
    if (msgErr) next.message = msgErr;
    setErrors(next);
    setTouched(new Set(['name', 'email', 'message'] as FieldKey[]));

    if (next.name) {
      nameRef.current?.focus();
      return false;
    }
    if (next.email) {
      emailRef.current?.focus();
      return false;
    }
    if (next.message) {
      messageRef.current?.focus();
      return false;
    }
    return true;
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!validateAll()) return;

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
      setTouched(new Set());
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        data-testid="form-success"
        style={{
          padding: '32px',
          borderRadius: '12px',
          border: '1px solid rgba(52,211,153,0.2)',
          backgroundColor: 'rgba(52,211,153,0.05)',
          textAlign: 'center',
        }}
      >
        <p style={{ marginBottom: '8px', fontSize: '17px', fontWeight: 500, color: '#d1d5db' }}>
          Message sent ✓
        </p>
        <p style={{ fontSize: '14px', color: 'rgba(209,213,219,0.5)' }}>
          I&apos;ll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  const showError = (field: FieldKey) => touched.has(field) && !!errors[field];

  return (
    <form
      onSubmit={(e) => void handleSubmit(e)}
      data-testid="contact-form"
      noValidate
      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      <div>
        <label htmlFor="contact-name" style={labelStyle}>
          Name{' '}
          <span style={{ color: '#f87171' }} aria-hidden="true">
            *
          </span>
        </label>
        <input
          ref={nameRef}
          id="contact-name"
          type="text"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          style={showError('name') ? inputError : inputBase}
          placeholder="Your name"
          autoComplete="name"
          required
          aria-required="true"
          aria-describedby={showError('name') ? 'name-error' : undefined}
          aria-invalid={showError('name')}
        />
        {showError('name') && (
          <p
            id="name-error"
            style={{ marginTop: '6px', fontSize: '12px', color: '#f87171' }}
            role="alert"
          >
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" style={labelStyle}>
          Email{' '}
          <span style={{ color: '#f87171' }} aria-hidden="true">
            *
          </span>
        </label>
        <input
          ref={emailRef}
          id="contact-email"
          type="email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          style={showError('email') ? inputError : inputBase}
          placeholder="your@email.com"
          autoComplete="email"
          required
          aria-required="true"
          aria-describedby={showError('email') ? 'email-error' : undefined}
          aria-invalid={showError('email')}
        />
        {showError('email') && (
          <p
            id="email-error"
            style={{ marginTop: '6px', fontSize: '12px', color: '#f87171' }}
            role="alert"
          >
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" style={labelStyle}>
          Message{' '}
          <span style={{ color: '#f87171' }} aria-hidden="true">
            *
          </span>
        </label>
        <textarea
          ref={messageRef}
          id="contact-message"
          value={form.message}
          onChange={(e) => handleChange('message', e.target.value)}
          onBlur={() => handleBlur('message')}
          rows={5}
          style={
            showError('message')
              ? { ...inputError, resize: 'none' }
              : { ...inputBase, resize: 'none' }
          }
          placeholder="What's on your mind?"
          autoComplete="off"
          required
          aria-required="true"
          aria-describedby={showError('message') ? 'message-error' : undefined}
          aria-invalid={showError('message')}
        />
        {showError('message') && (
          <p
            id="message-error"
            style={{ marginTop: '6px', fontSize: '12px', color: '#f87171' }}
            role="alert"
          >
            {errors.message}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p style={{ fontSize: '13px', color: '#f87171' }} role="alert" aria-live="polite">
          Something went wrong — please try again or email me directly at{' '}
          <a href="mailto:sidpatki123@gmail.com" style={{ color: '#34d399' }}>
            sidpatki123@gmail.com
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          width: '100%',
          padding: '14px 24px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#34d399',
          color: '#0f172a',
          fontSize: '15px',
          fontWeight: 600,
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          opacity: status === 'loading' ? 0.6 : 1,
          transition: 'opacity 0.2s ease, background-color 0.2s ease',
          fontFamily: 'inherit',
          minHeight: '44px',
        }}
      >
        {status === 'loading' ? (
          'Sending…'
        ) : (
          <>
            <Send size={15} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
