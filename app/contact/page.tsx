import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { SHOP } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Contact & Hours",
  description: "Find Fade Factory — address, hours, phone, and booking. Walk-ins welcome.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Come Through"
          title={<>Visit the Shop</>}
          subtitle="Walk-ins welcome. Booking recommended. We can't wait to get you in the chair."
          image="/images/StoreImage.jpg"
        />

        <section className="section bg-ink">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
            {/* Info */}
            <Reveal>
              <span className="eyebrow">Details</span>
              <h2 className="display mt-5 text-4xl text-cream">Find Us</h2>

              <div className="mt-10 space-y-8">
                <InfoRow label="Location" lines={[SHOP.address, SHOP.cityStateZip]} />
                <InfoRow label="Phone" lines={[SHOP.phone]} href={SHOP.phoneHref} />
                <InfoRow label="Email" lines={[SHOP.email]} href={`mailto:${SHOP.email}`} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Hours</p>
                  <ul className="mt-3 space-y-2">
                    {SHOP.hours.map((h) => (
                      <li key={h.day} className="flex max-w-xs justify-between gap-6 text-cream/85">
                        <span>{h.day}</span>
                        <span className="text-muted">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 flex gap-6">
                {SHOP.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/70 transition-colors hover:text-gold"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={120}>
              <div className="card p-8 sm:p-10">
                <h2 className="display text-3xl text-cream">Send a Message</h2>
                <p className="mt-2 text-sm text-muted">Questions, private events, or product inquiries — drop us a line.</p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function InfoRow({ label, lines, href }: { label: string; lines: string[]; href?: string }) {
  const content = lines.map((l) => (
    <p key={l} className="text-cream/85">
      {l}
    </p>
  ));
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">{label}</p>
      <div className="mt-2">
        {href ? (
          <a href={href} className="transition-colors hover:text-gold">
            {content}
          </a>
        ) : (
          content
        )}
      </div>
    </div>
  );
}
