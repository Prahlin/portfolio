import Image from "next/image";
import {
  Apple,
  Braces,
  CreditCard,
  Database,
  Mail,
  MailCheck,
  MonitorSmartphone,
  Palette,
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
    label: "Full-Stack Mastery",
    value: "3yrs",
  },
  { label: "Quality GitHub Commits", value: "1.0k" },
  { label: "Real-Time Project Worklogs", value: "0.2k" },
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
      <g transform="translate(-2.76 -2.76) scale(1.23)">
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
      </g>
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
      <g transform="translate(-3.36 -3.36) scale(1.28)">
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
      </g>
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

function ProfileOrbit({ className }: { className: string }) {
  return (
    <div className={`profile-orbit ${className}`}>
      <a
        aria-label="Open About Dev page"
        className="profile-photo-link"
        href="/aboutdev"
      >
        <Image
          alt="Martin Prahl profile photo"
          src="/images/martin3.jpg"
          width={220}
          height={220}
          priority
          className="profile-photo"
        />
      </a>
      <span>Martin Prahl</span>
    </div>
  );
}

function HeroBridgeQuote({ className }: { className: string }) {
  return (
    <p className={`hero-bridge-quote ${className}`}>
      <span>&ldquo;Everyone&apos;s got a brilliant</span>
      <span>idea. Few know how to funnel</span>
      <span>it into a must-have product.&rdquo;</span>
    </p>
  );
}

const worklogItems = [
  {
    label: "WORK STATION",
    icon: <MonitorSmartphone aria-hidden />,
    text: (
      <>
        <strong>Laptop</strong>
        <span className="workspace-device-list">
          <span>Macbook Air 15.2&quot; M4 16GB SSD</span>
        </span>
        <span className="workspace-device-secondary-group">
          <strong>External Monitor</strong>
          <span className="workspace-device-list">
            <span>CMV 14&quot;</span>
          </span>
        </span>
      </>
    ),
  },
  {
    label: "QA DEVICES",
    icon: <Smartphone aria-hidden />,
    text: (
      <>
        <strong>Android</strong>
        <span className="workspace-qa-device-groups">
          <strong>Smartphones / Tablets</strong>
          <span className="workspace-device-list">
            <span>Samsung Galaxy A3 (Small)</span>
            <span>Samsung Galaxy S21 FE (Standard)</span>
            <span>Samsung Galaxy S20 Ultra (Large)</span>
            <span className="workspace-device-list-break">
              Galaxy Tab A (Standard)
            </span>
          </span>
        </span>
        <span className="workspace-qa-platform-group">
          <strong>iOS</strong>
          <span className="workspace-qa-device-groups">
            <strong>Smartphones / Tablets</strong>
            <span className="workspace-device-list">
              <span>iPhone 14 (Standard)</span>
              <span>iPhone 12 Pro Max (Large)</span>
              <span className="workspace-device-list-break">
                iPad Air 14 (Standard)
              </span>
            </span>
          </span>
        </span>
      </>
    ),
  },
  {
    label: "DESIGN SOFTWARE",
    icon: <Palette aria-hidden />,
    text: (
      <>
        <strong>Development Environments</strong>
        <span className="workspace-device-list">
          <span>VS Code</span>
          <span>Android Studio</span>
          <span>Xcode</span>
          <span>PyCharm</span>
        </span>
        <span className="workspace-device-secondary-group">
          <strong>AI-Assisted Development</strong>
          <span className="workspace-device-list">
            <span>Codex</span>
            <span>Claude</span>
            <span>ChatGPT</span>
            <span>GitHub Copilot</span>
          </span>
        </span>
        <span className="workspace-device-secondary-group">
          <strong>Design &amp; Motion</strong>
          <span className="workspace-device-list">
            <span>Figma</span>
            <span>Photoshop</span>
            <span>Illustrator</span>
            <span>After Effects</span>
            <span>Media Encoder</span>
          </span>
        </span>
        <span className="workspace-coding-software-group">
          <Braces aria-hidden className="workspace-coding-software-icon" />
          <span className="workspace-software-subeyebrow">
            CODING
            <br />
            SOFTWARE
          </span>
          <span className="workspace-device-secondary-group">
            <strong>Testing &amp; Debugging</strong>
            <span className="workspace-device-list">
              <span>Expo Go</span>
              <span>Android Emulator / AVD</span>
              <span>iOS Simulator</span>
              <span>ADB</span>
              <span>Postman</span>
            </span>
          </span>
          <span className="workspace-device-secondary-group">
            <strong>Workflow Platforms</strong>
            <span className="workspace-device-list">
              <span>GitHub</span>
              <span>Jira</span>
              <span>ServiceNow</span>
            </span>
          </span>
        </span>
      </>
    ),
  },
];

const timelineItems = [
  {
    evidence:
      "Evidence: UI/UX philosophy, visual hierarchy studies, shipped mobile screens.",
    title: "Research",
    text: (
      <>
        Banking customers are <em>not</em> Video Streamers, Global users{" "}
        <em>not</em> American ones. That&apos;s why I conduct{" "}
        comprehensive, theoretical{" "}
        <strong>
          <u>Industry & Product Research</u>
        </strong>{" "}
        before the <u>practical</u> work of{" "}
        <em>UI/UX, Front-End, Back-End, Build & Release</em> planning even begins.
      </>
    ),
  },
  {
    evidence: "Evidence: Alla Vostra, Cinerific, Credit King.",
    title: "Plan",
    text: [
      "Cross-platform or Platform-specific? Web version or App-only? UI-focused or Back-end heavy?",
      "I help make the difficult decisions about your unique product.",
    ],
  },
  {
    evidence: "Evidence: Vercel API, Stripe, PayPal, Postmark.",
    title: "Scaffold",
    text: (
      <>
        Although the nitty-gritty of every project is different, some
        systematization is paramount; that&apos;s why I always, without exception,
        begin every session with <strong>read-project</strong> briefings,{" "}
        <strong>commit changes</strong> in an organized manner, track real-time{" "}
        <strong>snapshots</strong> of project changes, and generate end-of-day{" "}
        <strong>worklogs</strong> at all times.
      </>
    ),
  },
  {
    evidence: "Evidence: 100+ logs across active projects.",
    title: "Analyze",
    text: "Creation without learning is useless. By studying & analyzing diffs while the project is growing, I ensure that I'm in the loop, and deeply comprehend, every coding change made to the project in real time.",
  },
  {
    evidence: "",
    title: "Testing",
    text: "",
  },
  {
    evidence: "",
    title: "Building",
    text: "",
  },
  {
    evidence: "",
    title: "Release",
    text: "",
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
    title: "Inter-connectivity",
    text: "Just like art is science and science is art, design & code should be one.",
  },
  {
    tone: "amber",
    title: "User-friendliness",
    text: 'As Einstein said, "If you can\'t explain it simply, you don\'t really know it."',
  },
  {
    tone: "violet",
    title: "Cohesion",
    text: "Let's be real; a product is never stronger than its weakest point.",
  },
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
  const content = screenImageSrc ? (
    <Image
      alt={screenImageAlt ?? `${title} app screen`}
      className="phone-framed-image"
      fill
      sizes="245px"
      src={screenImageSrc}
    />
  ) : (
    <>
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
    <a
      aria-label="Open Cinerific case study"
      className="tablet-shell tablet-shell-capture tablet-shell-link"
      href="/projects/cinerific"
    >
      <Image
        alt="Cinerific app preview"
        className="tablet-framed-image"
        fill
        sizes="456px"
        src="/images/cinerific-hero-tablet-tab-s7-uniform.png"
      />
    </a>
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
                    <span style={{ color: "#43ff92" }}>
                      <span style={{ whiteSpace: "nowrap" }}>React&nbsp;Native&nbsp;/</span> Kotlin
                    </span>{" "}
                    Developer
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
                        textAlign: "left",
                        width: "max-content",
                      }}
                    >
                      <span
                        className="hero-view-word"
                        aria-label="Check Out"
                      >
                        Check Out
                      </span>
                      <span
                        className="hero-project-word"
                        aria-label="Projects"
                      >
                        Projects
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
                    aria-label="LinkedIn"
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
                    <Image
                      alt=""
                      className="social-label-image linkedin-label-image"
                      height={70}
                      src="/images/social-labels/linkedin-label.png"
                      width={254}
                    />
                  </a>
                  <a
                    aria-label="Resume"
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
                    <Image
                      alt=""
                      className="social-label-image resume-label-image"
                      height={70}
                      src="/images/social-labels/resume-label.png"
                      width={244}
                    />
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

            <ProfileOrbit className="profile-orbit-wide" />
            <HeroBridgeQuote className="hero-bridge-quote-wide" />

            <div className="hero-visual" aria-label="Portfolio preview">
              <ProfileOrbit className="profile-orbit-compact" />
              <HeroBridgeQuote className="hero-bridge-quote-compact" />

              <div className="phone-stage">
                <TabletPreview />
                <PhonePreview
                  title="Alla Vostra"
                  metric="Checkout ready"
                  variant="commerce"
                  href="/projects/alla-vostra"
                  screenImageSrc="/images/alla-vostra-hero-startup-framed.png"
                  screenImageAlt="Alla Vostra startup screen"
                />
                <PhonePreview
                  title="CreditKing"
                  metric="Finance UI"
                  variant="finance"
                  screenImageSrc="/images/landing-hero-finance-framed.png"
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
          <SectionHeading title="My Work Space" />
          <div className="timeline">
            {worklogItems.map((item) => (
              <div
                key={item.label}
                className={`timeline-item${
                  item.label === "DESIGN SOFTWARE"
                    ? " timeline-item-software"
                    : ""
                }`}
              >
                {item.label === "DESIGN SOFTWARE" ? (
                  <div className="section-heading workspace-workflow-heading">
                    <h2>My Work Tools</h2>
                  </div>
                ) : null}
                <span className="workspace-eyebrow">
                  {item.icon}
                  <span className="workspace-eyebrow-label">
                    {item.label.split(" ")[0]}
                    {item.label.includes(" ") ? (
                      <>
                        <br />
                        {item.label.split(" ").slice(1).join(" ")}
                      </>
                    ) : null}
                  </span>
                </span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
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
                  <h3>
                    <span className="aboutdev-timeline-title">{item.title}</span>
                  </h3>
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
