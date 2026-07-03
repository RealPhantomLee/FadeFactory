"use client";

import { useState } from "react";

// Front-end only for now. Wire to an email service / route handler later.
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const inputClass =
    "w-full border border-line bg-panel px-4 py-3 text-cream placeholder:text-muted/60 focus:border-gold focus:outline-none transition-colors";

  if (sent) {
    return (
      <div className="card flex h-full flex-col items-center justify-center p-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-3xl text-gold">✓</span>
        <h3 className="display mt-6 text-2xl text-cream">Message sent</h3>
        <p className="mt-2 text-muted">Thanks, {form.name || "friend"} — we&apos;ll be in touch shortly.</p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setForm({ name: "", email: "", message: "" });
          }}
          className="btn btn-outline mt-8"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-4"
    >
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">Name</label>
        <input required value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} placeholder="Your name" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">Email</label>
        <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} placeholder="you@email.com" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">Message</label>
        <textarea required rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} className={inputClass} placeholder="How can we help?" />
      </div>
      <button type="submit" className="btn btn-gold w-full">
        Send Message
      </button>
    </form>
  );
}
