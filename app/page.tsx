import Image from "next/image";
import {
  ArrowRight,
  Braces,
  Mail,
  MonitorSmartphone,
  Play,
  Server,
  Smartphone,
  Store,
} from "lucide-react";

const navItems = ["Case Studies", "Stack", "Worklog", "Contact"];

const stackChips = [
  "React Native",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Kotlin",
];

const proofStats = [
  { label: "Alla Vostra commits", value: "328" },
  { label: "PDF worklogs", value: "42" },
  { label: "CreditKing commits", value: "94" },
  { label: "Android release prep", value: "EAS" },
];

const caseStudies = [
  {
    title: "Alla Vostra",
    eyebrow: "Flagship full-stack mobile commerce",
    description:
      "Expo/React Native ordering flow with Stripe, Postmark, Vercel serverless routes, Android device testing, and Play Store preparation.",
    tags: ["React Native", "Stripe", "Node.js", "EAS"],
    stat: "328 commits",
  },
  {
    title: "CreditKing",
    eyebrow: "Finance app UI system",
    description:
      "React Native dashboard, animated navigation, Figma asset translation, responsive web/Android parity, and reusable app chrome.",
    tags: ["Expo Router", "SVG", "Animation", "Figma"],
    stat: "94 commits",
  },
];

const worklogItems = [
  "From responsive website prototype to Expo Router mobile architecture",
  "Secure Stripe card flow, Google Pay, PayPal, and Postmark confirmations",
  "Android Small, Standard, and Large emulator QA with release-ready EAS builds",
];

function PhonePreview({
  title,
  metric,
  variant,
}: {
  title: string;
  metric: string;
  variant: "commerce" | "finance";
}) {
  return (
    <div className={`phone-shell phone-shell-${variant}`}>
      <div className="phone-speaker" />
      <div className="phone-screen">
        <div className="phone-status">
          <span>{title}</span>
          <span>5G</span>
        </div>
        <div className="phone-chart">
          <div />
          <div />
          <div />
          <div />
        </div>
        <div className="phone-cardline wide" />
        <div className="phone-cardline" />
        <div className="phone-grid">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="phone-cta">{metric}</div>
      </div>
    </div>
  );
}

function SectionHeading({
  kicker,
  title,
}: {
  kicker: string;
  title: string;
}) {
  return (
    <div className="section-heading">
      <p>{kicker}</p>
      <h2>{title}</h2>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <div className="site-shell">
          <header className="nav-bar">
            <a className="brand" href="#top" aria-label="Prahlin home">
              <span>P</span>
              <strong>Prahlin</strong>
            </a>

            <nav aria-label="Main navigation">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                >
                  {item}
                </a>
              ))}
            </nav>
          </header>

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                React Native first. Kotlin ready. Full-stack where it counts.
              </p>
              <h1>React Native Full-Stack Mobile Developer</h1>
              <p className="hero-lede">
                Polished mobile apps, secure checkout flows, and
                production-ready Android pipelines.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#alla-vostra">
                  View Alla Vostra
                  <ArrowRight aria-hidden size={18} />
                </a>
                <a
                  className="button button-secondary"
                  href="https://github.com/Prahlin"
                  rel="noreferrer"
                  target="_blank"
                >
                  <Braces aria-hidden size={18} />
                  GitHub
                </a>
              </div>

              <div className="stack-row" aria-label="Primary stack">
                {stackChips.map((chip) => (
                  <span key={chip}>{chip}</span>
                ))}
              </div>
            </div>

            <div className="hero-visual" aria-label="Portfolio preview">
              <div className="profile-orbit">
                <Image
                  alt="Martin Prahl profile photo"
                  src="/images/martin2.jpg"
                  width={220}
                  height={220}
                  priority
                  className="profile-photo"
                />
                <span>Martin Prahl</span>
              </div>

              <div className="phone-stage">
                <PhonePreview
                  title="Alla Vostra"
                  metric="Checkout ready"
                  variant="commerce"
                />
                <PhonePreview
                  title="CreditKing"
                  metric="Finance UI"
                  variant="finance"
                />
              </div>

              <div className="proof-panel">
                <div>
                  <Store aria-hidden size={18} />
                  <span>Play Store prep</span>
                </div>
                <div>
                  <Server aria-hidden size={18} />
                  <span>Stripe + Postmark backend</span>
                </div>
              </div>
            </div>
          </div>

          <div className="stats-strip" aria-label="Project proof points">
            {proofStats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="case-section" id="case-studies">
        <div className="site-shell">
          <SectionHeading
            kicker="Featured case studies"
            title="Mobile products with real implementation depth"
          />

          <div className="case-grid">
            {caseStudies.map((study) => (
              <article
                className="case-card"
                id={study.title === "Alla Vostra" ? "alla-vostra" : undefined}
                key={study.title}
              >
                <div className="case-topline">
                  <span>{study.eyebrow}</span>
                  <strong>{study.stat}</strong>
                </div>
                <h3>{study.title}</h3>
                <p>{study.description}</p>
                <div className="case-tags">
                  {study.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="stack-section" id="stack">
        <div className="site-shell split-section">
          <SectionHeading
            kicker="Stack"
            title="Built around React Native, shaped for full-stack delivery"
          />
          <div className="capability-grid">
            <div>
              <MonitorSmartphone aria-hidden />
              <h3>Main stack</h3>
              <p>
                React, React Native, Expo Router, Next.js, Tailwind CSS, and
                mobile-first responsive UI systems.
              </p>
            </div>
            <div>
              <Braces aria-hidden />
              <h3>Backend layer</h3>
              <p>
                Node.js serverless routes, Stripe payment setup, Postmark email
                delivery, environment configuration, and deployment workflows.
              </p>
            </div>
            <div>
              <Smartphone aria-hidden />
              <h3>Secondary mobile</h3>
              <p>
                Kotlin and Android Studio as the native Android path, aligned
                with the same release and device-testing discipline.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="worklog-section" id="worklog">
        <div className="site-shell worklog-layout">
          <SectionHeading
            kicker="Worklog"
            title="A documented build history, not just final screenshots"
          />
          <div className="timeline">
            {worklogItems.map((item, index) => (
              <div key={item} className="timeline-item">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="site-shell contact-panel">
          <div>
            <p className="eyebrow">Available for full-stack mobile work</p>
            <h2>Let’s build something crisp, fast, and release-ready.</h2>
          </div>
          <a className="button button-primary" href="mailto:hello@example.com">
            <Mail aria-hidden size={18} />
            Replace with your email
          </a>
        </div>
      </section>
    </main>
  );
}
