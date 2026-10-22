'use client';

import {useRef, useState, type FormEvent} from 'react';
import {ArrowRight} from '@/components/icons';
import type {StudioCopy} from '@/data/studio-home';
import type {AppLocale} from '@/i18n/config';
import {trackGenerateLead} from '@/lib/analytics-events';
import {CONTACT_EMAIL} from '@/lib/seo';
import styles from './studio.module.css';

export default function StudioContactForm({copy, locale}: {copy: StudioCopy['contact']; locale: AppLocale}) {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{error: boolean; message: string} | null>(null);
  const lastSubmit = useRef(0);
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_API_URL?.trim();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    if (Date.now() - lastSubmit.current < 30_000) {
      setStatus({error: true, message: copy.retry});
      return;
    }
    const form = event.currentTarget;
    const fields = new FormData(form);
    const payload = {
      name: String(fields.get('name') ?? '').trim(),
      email: String(fields.get('email') ?? '').trim(),
      message: String(fields.get('message') ?? '').trim(),
      company: '', industry: '', teamSize: '', subject: copy.title,
      locale, sourceUrl: window.location.href, formIdentifier: 'contact-discovery',
    };
    setSending(true);
    setStatus(null);
    try {
      if (endpoint) {
        const response = await fetch(endpoint, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)});
        if (!response.ok) throw new Error('Submission failed');
        trackGenerateLead({locale, formId: 'contact-discovery'});
        setStatus({error: false, message: copy.success});
        form.reset();
      } else {
        const body = `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`;
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`[Hive Vault Arc] ${copy.title}`)}&body=${encodeURIComponent(body)}`;
        setStatus({error: false, message: copy.emailOpened});
      }
      lastSubmit.current = Date.now();
    } catch {
      setStatus({error: true, message: copy.error});
    } finally {
      setSending(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={submit} aria-busy={sending}>
      <div className={styles.formRow}>
        <label htmlFor="studio-name">{copy.name}<input id="studio-name" name="name" autoComplete="name" required maxLength={150} /></label>
        <label htmlFor="studio-email">{copy.email}<input id="studio-email" name="email" type="email" autoComplete="email" required maxLength={254} /></label>
      </div>
      <label htmlFor="studio-message">{copy.message}<textarea id="studio-message" name="message" rows={4} required maxLength={5000} placeholder={copy.placeholder} /></label>
      {!endpoint && <p className={styles.formHint}>{copy.emailHint}</p>}
      <button className={styles.primary} type="submit" disabled={sending}>{sending ? copy.sending : copy.submit}<ArrowRight size={18} aria-hidden="true" /></button>
      {status && <p className={styles.formStatus} role={status.error ? 'alert' : 'status'}>{status.message}</p>}
      <a className={styles.directEmail} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
    </form>
  );
}
