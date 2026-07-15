import Image from "next/image";
import {
  Braces,
  Mail,
  MonitorSmartphone,
  Play,
  Server,
  Smartphone,
  Store,
} from "lucide-react";
import { ProjectCarouselButton } from "./ProjectCarouselButton";

const navItems = ["Case Studies", "Stack", "Worklog", "Contact"];

const stackChips = [
  "React Native",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Kotlin",
];

const proofStats = [
  {
    label: "of UI/UX, Front-end & Back-end experience",
    value: "3+ Years",
  },
  { label: "GitHub commits", value: "500+" },
  { label: "Project worklogs", value: "50+" },
  { label: "Android release prep", value: "EAS" },
];

type CaseScreenshot = {
  alt: string;
  orientation?: "landscape" | "portrait";
  src: string;
};

type CaseStudy = {
  description: string;
  eyebrow: string;
  id: string;
  screenshots: CaseScreenshot[];
  stat: string;
  tags: string[];
  title: string;
};

const caseStudies: CaseStudy[] = [
  {
    id: "cinerific",
    title: "Cinerific",
    eyebrow: "Native Android entertainment preview",
    description:
      "Kotlin and Jetpack Compose Android app scaffold translating Figma intro and sign-in frames into tablet-friendly full-screen screens, drawable assets, and an animated intro flow.",
    tags: ["Kotlin", "Compose", "Gradle", "TypeScript"],
    stat: "3 commits",
    screenshots: [
      {
        alt: "Cinerific intro logo frame",
        orientation: "landscape",
        src: "/images/cinerific-intro.png",
      },
    ],
  },
  {
    id: "alla-vostra",
    title: "Alla Vostra",
    eyebrow: "Flagship full-stack mobile commerce",
    description:
      "Expo/React Native ordering flow with Stripe, Postmark, Vercel serverless routes, Android device testing, and Play Store preparation.",
    tags: ["React Native", "Stripe", "Node.js", "EAS"],
    stat: "328 commits",
    screenshots: [
      {
        alt: "Alla Vostra startup screen",
        src: "/images/startup_screen_small.png",
      },
      {
        alt: "Alla Vostra products screen",
        src: "/images/products_overlay_small.png",
      },
      {
        alt: "Alla Vostra confirmation screen",
        src: "/images/confirmed_overlay_small.png",
      },
    ],
  },
  {
    id: "credit-king",
    title: "Credit King",
    eyebrow: "Finance app UI system",
    description:
      "React Native dashboard, animated navigation, Figma asset translation, responsive web/Android parity, and reusable app chrome.",
    tags: ["Expo Router", "SVG", "Animation", "Figma"],
    stat: "94 commits",
    screenshots: [],
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
  screenImageSrc,
  screenImageAlt,
}: {
  title: string;
  metric: string;
  variant: "commerce" | "finance";
  screenImageSrc?: string;
  screenImageAlt?: string;
}) {
  return (
    <div className={`phone-shell phone-shell-${variant}`}>
      <div className="phone-speaker" />
      <div className={`phone-screen${screenImageSrc ? " has-image" : ""}`}>
        {screenImageSrc ? (
          <div className="phone-screen-image-frame">
            <Image
              alt={screenImageAlt ?? `${title} app screen`}
              className="phone-screen-image"
              fill
              sizes="245px"
              src={screenImageSrc}
            />
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

function TabletPreview() {
  return (
    <div className="tablet-shell" aria-hidden="true">
      <div className="tablet-camera" />
      <div className="tablet-screen">
        <Image
          alt=""
          className="tablet-screen-image"
          fill
          sizes="456px"
          src="/images/cinerific-intro.png"
        />
        <div className="tablet-empty-grid" />
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
            <a className="brand" href="#top" aria-label="Martin Prahl home">
              <span>P</span>
              <strong>Martin Prahl</strong>
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
                <ProjectCarouselButton />
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

            <div className="hero-visual" aria-label="Portfolio preview">
              <div className="profile-orbit">
                <Image
                  alt="Martin Prahl profile photo"
                  src="/images/martin3.jpg"
                  width={220}
                  height={220}
                  priority
                  className="profile-photo"
                />
                <span>Martin Prahl</span>
              </div>

              <div className="phone-stage">
                <TabletPreview />
                <PhonePreview
                  title="Alla Vostra"
                  metric="Checkout ready"
                  variant="commerce"
                  screenImageSrc="/images/startup_screen_large.png"
                  screenImageAlt="Alla Vostra startup screen"
                />
                <PhonePreview
                  title="CreditKing"
                  metric="Finance UI"
                  variant="finance"
                />
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
                id={study.id}
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
                {study.screenshots.length > 0 ? (
                  <div
                    aria-label={`${study.title} app screenshots`}
                    className={`case-miniatures${
                      study.screenshots.some(
                        (screenshot) => screenshot.orientation === "landscape",
                      )
                        ? " case-miniatures-landscape"
                        : ""
                    }`}
                  >
                    {study.screenshots.map((screenshot) => (
                      <Image
                        alt={screenshot.alt}
                        className={`case-miniature${
                          screenshot.orientation === "landscape"
                            ? " case-miniature-landscape"
                            : ""
                        }`}
                        height={
                          screenshot.orientation === "landscape" ? 166 : 192
                        }
                        key={screenshot.src}
                        src={screenshot.src}
                        width={
                          screenshot.orientation === "landscape" ? 238 : 108
                        }
                      />
                    ))}
                  </div>
                ) : null}
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
          <a
            className="button button-primary"
            href="mailto:martin@prahlproductions.com"
          >
            <Mail aria-hidden size={18} />
            martin@prahlproductions.com
          </a>
        </div>
      </section>
    </main>
  );
}
