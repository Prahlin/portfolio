import Image from "next/image";
import {
  Apple,
  Braces,
  CreditCard,
  Database,
  Mail,
  MailCheck,
  MonitorSmartphone,
  Play,
  Smartphone,
  Store,
  Triangle,
} from "lucide-react";
import { HeroLede } from "./HeroLede";
import { ProjectCarouselButton } from "./ProjectCarouselButton";
import {
  FeaturedCaseStudies,
  MainNavBar,
  SectionHeading,
} from "./PortfolioSections";
import { ProofStats } from "./ProofStats";

const stackChips = [
  "React Native",
  "Tailwind CSS",
  "TypeScript",
  "Expo",
  "Node.js",
  "Kotlin",
  "Next.js",
  "Compose",
  "REST APIs",
];

const proofStats = [
  {
    label: "Full-Stack Expertise",
    value: "3yrs",
  },
  { label: "Quality GitHub Commits", value: "1.0k+" },
  { label: "Real-Time Project Worklogs", value: "0.1k+" },
  { label: "Shipped Mob/Web Products", value: "8" },
];

const resumeButtonColor = "#fff";
const linkedInButtonColor = "#2867B2";
const githubButtonTextColor = "#f3fff7";

function LinkedInMark() {
  return (
    <svg
      aria-hidden
      className="linkedin-icon-mark"
      height="32.4"
      viewBox="0 0 24 24"
      width="32.4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        fill="#f3fff7"
        height="18"
        rx="3"
        stroke="#000"
        strokeWidth="1.35"
        width="18"
        x="3"
        y="3"
      />
      <circle
        cx="8.1"
        cy="8.15"
        fill={linkedInButtonColor}
        r="1.45"
        stroke="#000"
        strokeWidth="0.35"
      />
      <rect
        fill={linkedInButtonColor}
        height="7.2"
        rx="0.45"
        stroke="#000"
        strokeLinejoin="round"
        strokeWidth="0.35"
        width="2.45"
        x="6.88"
        y="10.75"
      />
      <path
        d="M11.1 10.75h2.35v.92c.45-.66 1.18-1.08 2.18-1.08 1.88 0 3 1.24 3 3.4v3.96h-2.46v-3.62c0-1.04-.47-1.58-1.29-1.58-.86 0-1.33.58-1.33 1.58v3.62H11.1z"
        fill={linkedInButtonColor}
        stroke="#000"
        strokeLinejoin="round"
        strokeWidth="0.35"
      />
    </svg>
  );
}

function GitHubBracesMark() {
  return (
    <svg
      aria-hidden
      className="github-icon-mark"
      height="32.4"
      viewBox="0 0 24 24"
      width="32.4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        fill={githubButtonTextColor}
        height="18"
        rx="3"
        stroke="#000"
        strokeWidth="1.35"
        width="18"
        x="3"
        y="3"
      />
      <path
        d="M10.15 7.45h-.52c-.86 0-1.32.46-1.32 1.32v2.05c0 .72-.5 1.18-1.28 1.18.78 0 1.28.46 1.28 1.18v2.05c0 .86.46 1.32 1.32 1.32h.52"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M13.85 16.55h.52c.86 0 1.32-.46 1.32-1.32v-2.05c0-.72.5-1.18 1.28-1.18-.78 0-1.28-.46-1.28-1.18V8.77c0-.86-.46-1.32-1.32-1.32h-.52"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ResumeDownloadMark() {
  return (
    <svg
      aria-hidden
      className="download-icon-mark"
      height="32.4"
      viewBox="0 0 24 24"
      width="32.4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(-2.76 -2.76) scale(1.23)">
        <rect
          fill="#05AF59"
          height="18"
          rx="3"
          stroke="#000"
          strokeWidth="1.35"
          width="18"
          x="3"
          y="3"
        />
        <g transform="translate(-1.2 -1.18) scale(1.1)">
          <path
            d="M11.1 7.05h1.8v5.03l1.65-1.65 1.27 1.27L12 15.52 8.18 11.7l1.27-1.27 1.65 1.65z"
            fill="#fff"
            stroke="#000"
            strokeLinejoin="round"
            strokeWidth="0.65"
          />
          <rect
            fill="#fff"
            height="1.45"
            rx="0.25"
            stroke="#000"
            strokeWidth="0.65"
            width="7.5"
            x="8.25"
            y="16.05"
          />
        </g>
      </g>
    </svg>
  );
}

const worklogItems = [
  "From responsive website prototype to Expo Router mobile architecture",
  "Secure Stripe card flow, Google Pay, PayPal, and Postmark confirmations",
  "Android Small, Standard, and Large emulator QA with release-ready EAS builds",
];

function PhonePreview({
  title,
  metric,
  variant,
  href,
  screenImageSrc,
  screenImageAlt,
}: {
  href?: string;
  title: string;
  metric: string;
  variant: "commerce" | "finance";
  screenImageSrc?: string;
  screenImageAlt?: string;
}) {
  const className = `phone-shell phone-shell-${variant}${
    screenImageSrc ? " phone-shell-capture" : ""
  }${href ? " phone-shell-link" : ""}`;
  const content = (
    <>
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
    </>
  );

  if (href) {
    return (
      <a
        aria-label={`Open ${title} case study`}
        className={className}
        href={href}
      >
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
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
          src="/images/cinerific_promo.png"
        />
        <div className="tablet-empty-grid" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <div className="site-shell">
          <MainNavBar />

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow">
                <span className="hero-eyebrow-underline">User-friendly</span>{" "}
                <span className="hero-eyebrow-box">UI/UX</span>
                <span className="hero-eyebrow-period">,</span>
                <br />
                <span className="hero-eyebrow-underline">Butter-Smooth</span>{" "}
                <span className="hero-eyebrow-box">Front-End</span>
                <span className="hero-eyebrow-period">,</span>
                <br />
                <span className="hero-eyebrow-underline">
                  Deep, Dependable
                </span>{" "}
                <span className="hero-eyebrow-box">Back-end</span>
                <span className="hero-eyebrow-period">.</span>
              </p>
              <h1>
                    Full-Stack
                <br />
                    React Native / Kotlin Developer
              </h1>
              <HeroLede />

              <div className="hero-actions">
                <div className="hero-project-action">
                  <span
                    className="hero-view-label carousel-button-project-word"
                    aria-hidden
                  >
                    <span
                      className="hero-view-label-stack"
                      style={{
                        display: "grid",
                        gap: "0.28em",
                        justifySelf: "start",
                        marginLeft: "var(--hero-view-stack-left, 0px)",
                        minWidth: "var(--hero-view-stack-width, 0px)",
                        textAlign: "left",
                        width: "max-content",
                      }}
                    >
                      <span
                        className="hero-view-word"
                        aria-label="Check Out"
                      >
                        <span>C</span>
                        <span>h</span>
                        <span>e</span>
                        <span>c</span>
                        <span>k</span>
                        <span className="hero-word-space" aria-hidden>
                          {" "}
                        </span>
                        <span>O</span>
                        <span>u</span>
                        <span>t</span>
                      </span>
                      <span
                        className="hero-project-word"
                        aria-label="Projects"
                      >
                        <span>P</span>
                        <span>r</span>
                        <span>o</span>
                        <span>j</span>
                        <span>e</span>
                        <span>c</span>
                        <span>t</span>
                        <span>s</span>
                      </span>
                    </span>
                  </span>
                  <ProjectCarouselButton />
                </div>
                <div className="hero-social-buttons">
                  <a
                    className="button button-secondary hero-social-button github-button"
                    href="https://github.com/Prahlin"
                    rel="noreferrer"
                    style={{
                      background: "#000",
                      borderColor: "#000",
                      color: githubButtonTextColor,
                    }}
                    target="_blank"
                  >
                    <GitHubBracesMark />
                    <span className="github-label-text" data-text="GitHub">
                      GitHub
                    </span>
                  </a>
                  <a
                    className="button button-secondary hero-social-button linkedin-button"
                    href="https://linkedin.com/in/mprahl"
                    rel="noreferrer"
                    style={{
                      background: linkedInButtonColor,
                      borderColor: linkedInButtonColor,
                      color: "#fff",
                    }}
                    target="_blank"
                  >
                    <LinkedInMark />
                    <span className="linkedin-label-text" data-text="LinkedIn">
                      LinkedIn
                    </span>
                  </a>
                  <a
                    className="button button-secondary hero-social-button resume-button"
                    href="https://www.instagram.com/"
                    rel="noreferrer"
                    style={{
                      background: resumeButtonColor,
                      borderColor: resumeButtonColor,
                      color: "#fff",
                    }}
                    target="_blank"
                  >
                    <ResumeDownloadMark />
                    <span className="resume-label-text" data-text="Resumé">
                      Resumé
                    </span>
                  </a>
                </div>
              </div>

              <div className="stack-row" aria-label="Primary stack">
                {stackChips.map((chip) => (
                  <span key={chip}>{chip}</span>
                ))}
              </div>

              <div className="proof-panel">
                <div className="proof-column">
                  <div className="proof-item">
                    <Triangle aria-hidden size={18} />
                    <span>Vercel</span>
                  </div>
                  <div className="proof-item">
                    <Database aria-hidden size={18} />
                    <span>EAS</span>
                  </div>
                </div>
                <div className="proof-column">
                  <div className="proof-item">
                    <CreditCard aria-hidden size={18} />
                    <span>Stripe</span>
                  </div>
                  <div className="proof-item">
                    <MailCheck aria-hidden size={18} />
                    <span>Postmark</span>
                  </div>
                </div>
                <div className="proof-column">
                  <div className="proof-item">
                    <Store aria-hidden size={18} />
                    <span>GGL Play</span>
                  </div>
                  <div className="proof-item">
                    <Apple aria-hidden size={18} />
                    <span>App Store</span>
                  </div>
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
                  href="/projects/alla-vostra"
                  screenImageSrc="/images/startup_screen_large.png"
                  screenImageAlt="Alla Vostra startup screen"
                />
                <PhonePreview
                  title="CreditKing"
                  metric="Finance UI"
                  variant="finance"
                  screenImageSrc="/images/editor-window-screenshot.png"
                  screenImageAlt="Prahl.dev portfolio portrait screenshot"
                />
              </div>
            </div>
          </div>

          <ProofStats stats={proofStats} />
        </div>
      </section>

      <FeaturedCaseStudies />

      <section className="stack-section" id="stack">
        <div className="site-shell split-section">
          <SectionHeading
            kicker="Stack"
            title="Built around React Native, shaped for full stack delivery"
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
            <p className="eyebrow">Available for full stack mobile work</p>
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
