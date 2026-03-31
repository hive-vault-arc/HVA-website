# FR-05 — Contact Page (French)

**Route:** `/fr/contact`
**View file:** `src/views/Contact.tsx`
**Test file:** `src/views/Contact.test.tsx` — update test strings if they assert on visible text
**App page:** `src/app/contact/page.tsx`
**Depends on:** FR-00

---

## Goal

Translate all visible copy on the Contact page, including form labels, placeholders, validation messages, and success/error states.

---

## String sections to extract

### Page header
- Page eyebrow label
- Page headline (H1)
- Intro paragraph / subheading

### Contact form
Every form field needs:
- `label` (visible field label)
- `placeholder` (input placeholder text)
- `error` (validation error message)

Fields to cover:
- Name field
- Email field
- Company / Organisation field (if present)
- Subject / Service interest dropdown options
- Message textarea
- Submit button text
- Loading state text (e.g. `"Sending..."`)

### Form feedback states
- Success message headline + body
- Error message headline + body (e.g. `"Something went wrong"`)

### Contact info sidebar (if present)
- Email address label
- Phone label
- Address label
- Office location text
- Business hours (if hardcoded)

### Social links (if labeled)
- Any visible text labels next to social icons

---

## messages/fr.json target keys

```json
"contact": {
  "hero": {
    "eyebrow": "",
    "headline": "",
    "body": ""
  },
  "form": {
    "name": { "label": "", "placeholder": "", "error": "" },
    "email": { "label": "", "placeholder": "", "error": "" },
    "company": { "label": "", "placeholder": "" },
    "subject": { "label": "", "placeholder": "" },
    "message": { "label": "", "placeholder": "", "error": "" },
    "submit": "",
    "submitting": "",
    "subjectOptions": []
  },
  "feedback": {
    "successHeadline": "",
    "successBody": "",
    "errorHeadline": "",
    "errorBody": ""
  },
  "info": {
    "emailLabel": "",
    "phoneLabel": "",
    "addressLabel": "",
    "hoursLabel": ""
  }
}
```

---

## Metadata to translate

In `src/app/contact/page.tsx`:
- `title`
- `description`
- `keywords` — `"contacter H.V.A Maroc"`, `"consultation gratuite Tanger"`, etc.

---

## Notes
- Form validation messages must be natural French — avoid literal translations of English error text.
- Do NOT translate email addresses, phone numbers, or physical addresses.
- `Contact.test.tsx` currently asserts on English text — update any `getByText` / `getByLabelText` matchers if they reference translatable strings, or flag for the test sprint.
- Check if the form uses a third-party service (e.g. Formspree, Resend) — the submission endpoint URL is not translatable.

---

## Acceptance criteria
- [ ] All form labels, placeholders, and error messages extracted and translated
- [ ] All feedback states (success / error) translated
- [ ] `messages/fr.json` `"contact"` section fully translated
- [ ] `/fr/contact` form submits and shows correct French feedback
- [ ] No TypeScript errors
