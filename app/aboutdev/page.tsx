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
    title: "Industry & Product Research",
    text: (
      <>
        Banking customers are <em>not</em> Video Streamers, Global users{" "}
        <em>not</em> American ones. That's why I
        conduct{" "}
        comprehensive, theoretical{" "}
        <strong><u>Industry & Product Research</u></strong> before the{" "}
        <u>practical</u> work of{" "}
        <em>UI/UX, Front-End, Back-End, Build & Release</em> planning
        even begins.
      </>
    ),
  },
  {
    evidence: "Evidence: Alla Vostra, Cinerific, Credit King.",
    title: "Project Planning",
    text: [
      "Cross-platform or Platform-specific? Web version or App-only? UI-focused or Back-end heavy?",
      "I help make the difficult decisions about your unique product.",
    ],
  },
  {
    evidence: "Evidence: Vercel API, Stripe, PayPal, Postmark.",
    title: "Scaffolding the Workflow",
    text: (
      <>
        Although the nitty-gritty of every project is different, some
        systematization is paramount; that's why I always, without exception,
        begin every session with <strong>read-project</strong> briefings,{" "}
        <strong>commit changes</strong> in an organized manner, track real-time{" "}
        <strong>snapshots</strong> of project changes, and generate end-of-day{" "}
        <strong>worklogs</strong> at all times.
      </>
    ),
  },
  {
    evidence: "Evidence: 100+ logs across active projects.",
    title: "Learning-As-I-Go",
    text: "Creation without learning is useless. By studying & analyzing diffs while the project is growing, I ensure that I'm in the loop, and deeply comprehend, every coding change made to the project in real time.",
  },
];

const principles = [
  {
    tone: "green",
    title: "Vision",
    text: "No imagination means no prototype. No prototype means no build.",
  },
  {
    tone: "blue",
    title: "Modernness",
    text: "When creating a unique product, absolutely nothing should be off the table.",
  },
  {
    tone: "cyan",
    title: "Sustainability",
    text: "A product that doesn't hold up over time, simply isn't a viable product.",
  },
  {
    tone: "amber",
    title: "Leadership",
    text: "Making the difficult decisions isn't always fun -- but it's always necessary.",
  },
  {
    tone: "violet",
    title: "Cohesion",
    text: "Let's be real; a product is never stronger than its weakest point.",
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
              <em>
                &ldquo;Zillions of people have a brilliant idea. Few know how to
                funnel it into a world-changing, must-have product.&rdquo;
              </em>
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
              <p className="aboutdev-eyebrow">The Way I Work</p>
              <h2>My Workflow</h2>
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
                <div className="aboutdev-timeline-copy">
                  <h3>{item.title}</h3>
                  {Array.isArray(item.text) ? (
                    item.text.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))
                  ) : (
                    <p>{item.text}</p>
                  )}
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
            <em>
              &ldquo;The throughline is ownership: design taste, engineering depth,
              and finished software.&rdquo;
            </em>
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
              <p className="aboutdev-eyebrow">The Values I Represent</p>
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
            <div className="aboutdev-principles-star" aria-hidden="true">
              <svg
                className="aboutdev-principles-star-svg"
                focusable="false"
                viewBox="0 0 100 100"
              >
                <polygon points="50 2 61 35 96 35 68 57 79 90 50 70 21 90 32 57 4 35 39 35" />
              </svg>
            </div>
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
