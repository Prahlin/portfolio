import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { MainNavBar } from "../PortfolioSections";

export const metadata: Metadata = {
  title: "About Dev | Prahl.dev",
  description:
    "A narrative About Dev page for Martin Prahl, a full-stack mobile and web developer focused on polished interfaces, reliable systems, and inspectable product delivery.",
};

const proofChips = [
  "Design Systems",
  "Native Commerce",
  "API Contracts",
  "Release Notes",
  "Documentation",
];

const timelineItems = [
  {
    evidence:
      "Evidence: UI/UX philosophy, visual hierarchy studies, shipped mobile screens.",
    title: "Started with product interfaces.",
    text: "Learned to treat layout, hierarchy, and responsive behavior as engineering problems, not decoration.",
  },
  {
    evidence: "Evidence: Alla Vostra, Cinerific, Credit King.",
    title: "Moved into native mobile delivery.",
    text: "Built Android and React Native products with real state, routing, animation, payments, and release constraints.",
  },
  {
    evidence: "Evidence: Vercel API, Stripe, PayPal, Postmark.",
    title: "Closed the backend gap.",
    text: "Added server-owned validation, API routes, contact messages, payment rail orchestration, and production env structure.",
  },
  {
    evidence: "Evidence: 100+ logs across active projects.",
    title: "Turned process into an artifact.",
    text: "Worklogs, screenshots, diffs, QA notes, and release records make the work inspectable after the code ships.",
  },
];

const principles = [
  {
    tone: "green",
    title: "Vision",
    text: "Without imagination, there is no prototype, and without a prototype, well... There is no product.",
  },
  {
    tone: "cyan",
    title: "Interconnectedness",
    text: "Breaking down barriers between art and science, design and code, isn't some far-flung pipedream; It's the lifeblood of everything I do.",
  },
  {
    tone: "amber",
    title: "User-friendliness",
    text: "Albert Einstein once said, \"If you can't explain it simply, you don't understand it well enough.\" I do everything to make sure my products echo this sentiment.",
  },
  {
    tone: "rose",
    title: "Readiness",
    text: "In 2027, it is only fair to expect a developer to provide an all-in-one solution from start to finish. That's why I'm a one-stop shop for full-stack development.",
  },
  {
    tone: "green",
    title: "Modernness",
    text: "When it comes to creating a truly progressive & forward-thinking product, nothing - and I mean nothing - should be off the table.",
  },
  {
    tone: "cyan",
    title: "Cohesiveness",
    text: "A software application isn't stronger than its weakest points; That's why I treat them as crucial points in need of immediate attention, not as afterthoughts",
  },
];

export default function AboutDevPage() {
  return (
    <main className="aboutdev-page" id="top">
      <div className="site-shell">
        <MainNavBar context="aboutdev" />
      </div>

      <section className="aboutdev-hero">
        <div className="site-shell aboutdev-hero-grid">
          <div className="aboutdev-hero-copy">
            <p className="aboutdev-eyebrow">About Dev</p>
            <h1>
              The throughline is ownership: design taste, engineering depth,
              and finished software.
            </h1>
            <p className="aboutdev-lede">
              I build full-stack product experiences where the interface,
              system behavior, release path, and written record all line up.
              The goal is software that feels considered on the surface and
              stays reliable underneath.
            </p>
            <div className="aboutdev-chip-row" aria-label="Primary strengths">
              {proofChips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          </div>

          <figure
            aria-label="Martin Prahl profile photo"
            className="aboutdev-profile-bubble"
          >
            <Image
              alt="Martin Prahl"
              src="/images/martin3.jpg"
              width={282}
              height={282}
              priority
              className="profile-photo aboutdev-profile-photo"
            />
            <span className="aboutdev-profile-tag">Martin Prahl</span>
          </figure>
        </div>
      </section>

      <section className="aboutdev-section aboutdev-story-section">
        <div className="site-shell">
          <div className="aboutdev-section-head">
            <div>
              <p className="aboutdev-eyebrow">How I Got Here</p>
              <h2>A timeline built around proof, not biography filler.</h2>
            </div>
            <p>
              This page is personal, but it stays practical. Every story beat
              ties back to a skill, artifact, or production outcome.
            </p>
          </div>

          <div className="aboutdev-timeline">
            {timelineItems.map((item, index) => (
              <article className="aboutdev-timeline-item" key={item.title}>
                <span className="aboutdev-timeline-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <p className="aboutdev-timeline-proof">{item.evidence}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="aboutdev-section">
        <div className="site-shell aboutdev-quote-band">
          <blockquote>
            I care about the moment where a product stops being a demo and
            starts behaving like something a real person can trust.
          </blockquote>
          <article className="aboutdev-card">
            <p className="aboutdev-eyebrow">Working Style</p>
            <h2>Precise, visual, and persistent.</h2>
            <p>
              I like tight feedback loops, measured changes, explicit
              tradeoffs, and interfaces that are rich without becoming noisy.
            </p>
          </article>
        </div>
      </section>

      <section className="aboutdev-section aboutdev-principles-section">
        <div className="site-shell">
          <div className="aboutdev-section-head aboutdev-principles-head">
            <div>
              <p className="aboutdev-eyebrow">Principles</p>
              <h2>My Core Beliefs</h2>
            </div>
          </div>

          <div className="aboutdev-principles-grid">
            {principles.map((principle) => (
              <article
                className="aboutdev-principle"
                data-tone={principle.tone}
                key={principle.title}
              >
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="aboutdev-section aboutdev-cta-section">
        <div className="site-shell">
          <div className="aboutdev-cta">
            <div>
              <p className="aboutdev-eyebrow">Next Step</p>
              <h2>Start with the shipped work, then talk through the next build.</h2>
            </div>
            <div className="aboutdev-cta-actions">
              <a className="button button-primary" href="/#case-studies">
                View case studies
                <ArrowRight aria-hidden size={18} />
              </a>
              <a className="button button-secondary" href="/#contact">
                Contact
                <Mail aria-hidden size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
