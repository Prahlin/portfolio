import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Braces, Mail } from "lucide-react";

import ExpandableFlowStacks from "./ExpandableFlowStacks";

export const metadata: Metadata = {
  title: "Alla Vostra | Full-Stack Mobile Commerce Case Study",
  description:
    "Alla Vostra case study covering React Native, Expo, Stripe, Postmark, Node.js serverless routes, Android QA, EAS builds, and Play Store preparation.",
};

const metadataItems = [
  "React Native / Expo",
  "Stripe payments",
  "Node.js backend",
  "Android QA + release prep",
];

const ownershipItems = [
  {
    title: "Mobile Frontend",
    copy: "React Native and Expo-based interface development, screen composition, navigation flow, and responsive mobile polish.",
  },
  {
    title: "Backend / Server Logic",
    copy: "Node.js serverless routes and application logic supporting checkout-related flows and environment-aware deployment behavior.",
  },
  {
    title: "Payments",
    copy: "Stripe integration for secure payment handling and purchase confirmation paths.",
  },
  {
    title: "Messaging",
    copy: "Postmark-powered confirmation and transactional email workflow support.",
  },
  {
    title: "QA and Release",
    copy: "Android emulator testing across multiple device classes, EAS build preparation, and Play Store readiness work.",
  },
];

const featureItems = [
  {
    title: "Product Browsing",
    copy: "Structured item presentation and flow into selection and ordering.",
  },
  {
    title: "Checkout Experience",
    copy: "A purchase path designed around clarity, payment readiness, and reduced friction.",
  },
  {
    title: "Payment Confirmation State",
    copy: "User-facing confirmation moments tied to real transaction outcomes.",
  },
  {
    title: "Transactional Email Support",
    copy: "Post-purchase messaging that extends the product beyond the in-app flow.",
  },
  {
    title: "Mobile-First Responsiveness",
    copy: "Careful attention to layout behavior across Android device sizes and testing environments.",
  },
  {
    title: "Release Pipeline Awareness",
    copy: "Implementation shaped by what was needed to move toward production-ready Android delivery.",
  },
];

type CaptureAspect = "standard" | "tall";

type FlowScreen = {
  aspect: CaptureAspect;
  caption: string;
  label: "Small" | "Large";
  src: string;
  title: string;
};

type FlowScreenStack = {
  screens: FlowScreen[];
  title: string;
};

const flowSegments = [
  "Launch",
  "Browse",
  "Cart",
  "Details",
  "Payment",
  "Confirmation",
];

const launchScreen: FlowScreen = {
  aspect: "tall",
  label: "Large",
  title: "Startup Screen",
  src: "/images/startup_screen_large.png",
  caption: "Launch screen establishing brand tone and first-use polish.",
};

const screenshotGroups: {
  copy: string;
  stacks: FlowScreenStack[];
  title: string;
}[] = [
  {
    title: "Browse",
    copy: "The browsing surfaces keep the brand, product catalog, company story, inquiry path, and shop entry consistent across Android Small and Large.",
    stacks: [
      {
        title: "Home Screen",
        screens: [
          {
            aspect: "standard",
            label: "Small",
            title: "Home Screen Small",
            src: "/images/home_screen_small.png",
            caption: "Android Small home screen entry point.",
          },
          {
            aspect: "tall",
            label: "Large",
            title: "Home Screen Large",
            src: "/images/home_screen_large.png",
            caption: "Android Large home screen layout.",
          },
        ],
      },
      {
        title: "Products Screen",
        screens: [
          {
            aspect: "standard",
            label: "Small",
            title: "Products Screen Small",
            src: "/images/products_screen_small.png",
            caption: "Android Small product catalog screen.",
          },
          {
            aspect: "tall",
            label: "Large",
            title: "Products Screen Large",
            src: "/images/products_screen_large.png",
            caption: "Android Large product catalog screen.",
          },
        ],
      },
      {
        title: "About Us Screen",
        screens: [
          {
            aspect: "standard",
            label: "Small",
            title: "About Us Screen Small",
            src: "/images/about_us_screen_small.png",
            caption: "Android Small brand story screen.",
          },
          {
            aspect: "tall",
            label: "Large",
            title: "About Us Screen Large",
            src: "/images/about_us_screen_large.png",
            caption: "Android Large brand story screen.",
          },
        ],
      },
      {
        title: "Contact Screen",
        screens: [
          {
            aspect: "standard",
            label: "Small",
            title: "Contact Screen Small",
            src: "/images/contact_screen_small.png",
            caption: "Android Small inquiry and contact screen.",
          },
          {
            aspect: "tall",
            label: "Large",
            title: "Contact Screen Large",
            src: "/images/contact_screen_large.png",
            caption: "Android Large inquiry and contact screen.",
          },
        ],
      },
      {
        title: "Shop Screen",
        screens: [
          {
            aspect: "standard",
            label: "Small",
            title: "Shop Screen Small",
            src: "/images/shop_preview_screen_small.png",
            caption: "Android Small shop screen before product selection.",
          },
          {
            aspect: "tall",
            label: "Large",
            title: "Shop Screen Large",
            src: "/images/shop_preview_screen_large.png",
            caption: "Android Large shop screen for spacing checks.",
          },
        ],
      },
    ],
  },
  {
    title: "Cart",
    copy: "Cart states were treated as part of the purchase path, with empty and filled moments both needing clear feedback.",
    stacks: [
      {
        title: "Empty Cart Overlay",
        screens: [
          {
            aspect: "standard",
            label: "Small",
            title: "Empty Cart Small",
            src: "/images/empty_cart_overlay_small.png",
            caption: "Android Small empty cart state before selection.",
          },
          {
            aspect: "tall",
            label: "Large",
            title: "Empty Cart Large",
            src: "/images/empty_cart_overlay_large.png",
            caption: "Android Large empty cart state for layout QA.",
          },
        ],
      },
      {
        title: "Filled Cart Overlay",
        screens: [
          {
            aspect: "standard",
            label: "Small",
            title: "Filled Cart Small",
            src: "/images/filled_cart_overlay_small.png",
            caption: "Android Small filled cart before checkout.",
          },
          {
            aspect: "tall",
            label: "Large",
            title: "Filled Cart Large",
            src: "/images/filled_cart_overlay_large.png",
            caption: "Android Large filled cart for checkout readiness.",
          },
        ],
      },
    ],
  },
  {
    title: "Customer Details",
    copy: "Checkout details break the purchase path into focused, readable steps instead of one overloaded form.",
    stacks: [
      {
        title: "Address Input Overlay",
        screens: [
          {
            aspect: "standard",
            label: "Small",
            title: "Address Small",
            src: "/images/address_overlay_small.png",
            caption: "Android Small address collection step.",
          },
          {
            aspect: "tall",
            label: "Large",
            title: "Address Large",
            src: "/images/address_overlay_large.png",
            caption: "Android Large address step for taller screens.",
          },
        ],
      },
      {
        title: "Time and Date Overlay",
        screens: [
          {
            aspect: "standard",
            label: "Small",
            title: "Time and Date Small",
            src: "/images/time_date_overlay_small.png",
            caption: "Android Small pickup or delivery scheduling step.",
          },
          {
            aspect: "tall",
            label: "Large",
            title: "Time and Date Large",
            src: "/images/time_date_overlay_large.png",
            caption: "Android Large scheduling state for hierarchy QA.",
          },
        ],
      },
      {
        title: "Contact Input Overlay",
        screens: [
          {
            aspect: "standard",
            label: "Small",
            title: "Contact Small",
            src: "/images/contact_overlay_small.png",
            caption: "Android Small contact information step.",
          },
          {
            aspect: "tall",
            label: "Large",
            title: "Contact Large",
            src: "/images/contact_overlay_large.png",
            caption: "Android Large contact step for field rhythm checks.",
          },
        ],
      },
    ],
  },
  {
    title: "Payment",
    copy: "Payment screens keep the final handoff explicit so users can review the moment and complete checkout with confidence.",
    stacks: [
      {
        title: "Payment Method Overlay",
        screens: [
          {
            aspect: "standard",
            label: "Small",
            title: "Payment Small",
            src: "/images/payment_overlay_small.png",
            caption: "Android Small payment step with reduced friction.",
          },
          {
            aspect: "tall",
            label: "Large",
            title: "Payment Large",
            src: "/images/payment_overlay_large.png",
            caption: "Android Large payment state for release testing.",
          },
        ],
      },
      {
        title: "Payment Input Prompt",
        screens: [
          {
            aspect: "standard",
            label: "Small",
            title: "Payment Input Small",
            src: "/images/payment_input_small.png",
            caption: "Android Small native card input within checkout.",
          },
          {
            aspect: "tall",
            label: "Large",
            title: "Payment Input Large",
            src: "/images/payment_input_large.png",
            caption: "Android Large card entry state for release QA.",
          },
        ],
      },
    ],
  },
  {
    title: "Confirmation",
    copy: "The final state closes the loop with a clear success moment tied to the real checkout outcome.",
    stacks: [
      {
        title: "Order Confirmation Overlay",
        screens: [
          {
            aspect: "standard",
            label: "Small",
            title: "Order Confirmation Small",
            src: "/images/payment_confirmation_overlay_small.png",
            caption: "Android Small order confirmation review before placement.",
          },
          {
            aspect: "tall",
            label: "Large",
            title: "Order Confirmation Large",
            src: "/images/payment_confirmation_overlay_large.png",
            caption: "Android Large order confirmation review for release QA.",
          },
        ],
      },
      {
        title: "Order Placed Prompt",
        screens: [
          {
            aspect: "standard",
            label: "Small",
            title: "Order Placed Small",
            src: "/images/confirmed_overlay_small.png",
            caption: "Android Small post-purchase order placed state.",
          },
          {
            aspect: "tall",
            label: "Large",
            title: "Order Placed Large",
            src: "/images/confirmed_overlay_large.png",
            caption: "Android Large post-purchase order placed state.",
          },
        ],
      },
    ],
  },
];

const architectureNodes = [
  {
    title: "React Native / Expo app",
    copy: "Mobile UI, screen flow, and ordering experience.",
  },
  {
    title: "Serverless backend routes",
    copy: "Node.js logic for payment-connected and environment-aware flows.",
  },
  {
    title: "Stripe",
    copy: "Secure payment handling and transaction outcome coordination.",
  },
  {
    title: "Postmark",
    copy: "Transactional confirmation messaging after purchase events.",
  },
  {
    title: "Android QA / EAS builds",
    copy: "Device testing, build preparation, and Play Store readiness work.",
  },
];

const decisionItems = [
  {
    title: "Payment Flow Coordination",
    copy: "Integrating checkout in a way that felt seamless in the mobile UI while staying aligned with secure server-side handling. The flow needed to keep users oriented without exposing implementation complexity.",
  },
  {
    title: "Cross-Device Android QA",
    copy: "Verifying the experience across Android emulator sizes and release-oriented testing conditions. Layout decisions were checked against practical device behavior, not just a single ideal preview.",
  },
  {
    title: "End-to-End Purchase Clarity",
    copy: "Making the transition from browsing to checkout to confirmation feel coherent and trustworthy for the user. The app experience needed clear states before, during, and after payment.",
  },
];

const readinessItems = [
  "Android small / standard / large emulator QA",
  "EAS build preparation",
  "Payment flow verification",
  "Post-purchase confirmation coverage",
  "Play Store preparation",
];

const timelineItems = [
  {
    title: "Responsive Prototype to Mobile Architecture",
    copy: "The project moved from an interface direction into a React Native and Expo Router structure built for real mobile ordering paths.",
  },
  {
    title: "Secure Stripe Flow, Google Pay / PayPal Considerations, and Postmark Confirmations",
    copy: "Checkout work centered on payment readiness, server-side coordination, and confirmation messaging beyond the in-app screen.",
  },
  {
    title: "Android QA and Release-Ready EAS Build Preparation",
    copy: "Testing and build work focused on Android device classes, release behavior, and the practical path toward Play Store preparation.",
  },
];

const stackGroups = [
  { title: "Frontend", items: ["React Native", "Expo", "Expo Router"] },
  { title: "Web / Supporting Stack", items: ["Next.js", "Tailwind CSS"] },
  { title: "Backend", items: ["Node.js", "Vercel serverless routes"] },
  { title: "Integrations", items: ["Stripe", "Postmark"] },
  { title: "Release / QA", items: ["Android Studio", "EAS"] },
];

const proofItems = [
  "328 commits",
  "Full-stack mobile implementation",
  "Payment integration",
  "Android QA and release prep",
  "Transactional messaging support",
];

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

function CasePhone({
  alt,
  aspect,
  className = "",
  priority = false,
  src,
}: {
  alt: string;
  aspect: "standard" | "tall";
  className?: string;
  priority?: boolean;
  src: string;
}) {
  return (
    <div className={`av-device av-device-${aspect} ${className}`}>
      <div className="av-device-speaker" />
      <div className="av-device-screen">
        <Image
          alt={alt}
          className="av-device-image"
          fill
          priority={priority}
          sizes="(max-width: 720px) 72vw, 280px"
          src={src}
        />
      </div>
    </div>
  );
}

export default function AllaVostraCaseStudy() {
  return (
    <main className="project-page">
      <section className="project-hero" id="top">
        <div className="site-shell">
          <header className="nav-bar project-nav">
            <a className="brand" href="/" aria-label="Prahlin home">
              <span>P</span>
              <strong>Prahlin</strong>
            </a>

            <nav aria-label="Alla Vostra case study navigation">
              <a href="#overview">Overview</a>
              <a href="#product-flow">Flow</a>
              <a href="#contact">Contact</a>
            </nav>
          </header>

          <div className="project-hero-grid">
            <div className="project-hero-copy">
              <a className="project-back-link" href="/#case-studies">
                <ArrowLeft aria-hidden size={16} />
                Case studies
              </a>
              <p className="eyebrow">Mobile Commerce Case Study</p>
              <h1>Alla Vostra</h1>
              <p className="project-subtitle">
                Flagship full-stack mobile commerce app
              </p>
              <p className="project-hero-text">
                Alla Vostra is a mobile commerce project focused on polished
                ordering flows, secure payment handling, transactional
                confirmations, and release-ready Android delivery.
              </p>

              <div className="project-meta-row" aria-label="Project metadata">
                {metadataItems.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <div className="hero-actions project-actions">
                <a
                  className="button button-primary"
                  href="https://github.com/Prahlin/alla_vostra"
                  rel="noreferrer"
                  target="_blank"
                >
                  <Braces aria-hidden size={18} />
                  View GitHub
                </a>
                <a
                  className="button button-secondary"
                  href="mailto:martin@prahlproductions.com"
                >
                  <Mail aria-hidden size={18} />
                  Contact
                </a>
              </div>
            </div>

            <div className="av-showcase" aria-label="Alla Vostra app screens">
              <CasePhone
                alt="Alla Vostra startup screen"
                aspect="tall"
                className="av-device-main"
                priority
                src="/images/startup_screen_large.png"
              />
              <CasePhone
                alt="Alla Vostra products screen"
                aspect="standard"
                className="av-device-browse"
                src="/images/products_screen_small.png"
              />
              <CasePhone
                alt="Alla Vostra confirmation screen"
                aspect="standard"
                className="av-device-confirm"
                src="/images/confirmed_overlay_small.png"
              />
              <div className="av-showcase-proof">
                <strong>328 commits</strong>
                <span>Full-stack ordering, payment, QA, and release work.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="overview">
        <div className="site-shell project-section-grid">
          <SectionHeading kicker="Overview" title="Overview" />
          <div className="project-copy-panel">
            <p>
              Alla Vostra was built as a full-stack mobile ordering experience
              where the product quality had to hold up across interface design,
              payment handling, confirmation flows, and Android release
              preparation.
            </p>
            <p>
              My role covered the app experience end to end: mobile UI
              implementation, front-end architecture, backend-connected purchase
              flows, transactional messaging, emulator and device QA, and
              release-focused iteration.
            </p>
          </div>
        </div>
      </section>

      <section id="scope">
        <div className="site-shell">
          <SectionHeading kicker="Scope" title="Scope and Ownership" />
          <div className="project-card-grid ownership-grid">
            {ownershipItems.map((item) => (
              <article className="project-card" key={item.title}>
                <span>{item.title}</span>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="site-shell">
          <SectionHeading kicker="Product" title="Core Features" />
          <div className="project-card-grid feature-grid">
            {featureItems.map((item) => (
              <article className="project-card" key={item.title}>
                <span>{item.title}</span>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="product-flow">
        <div className="site-shell">
          <SectionHeading kicker="Product Flow" title="Product Flow" />
          <div className="flow-segments" aria-label="Alla Vostra flow stages">
            {flowSegments.map((segment) => (
              <span key={segment}>{segment}</span>
            ))}
          </div>

          <div className="flow-layout">
            <figure
              className={`flow-screen flow-screen-main flow-screen-${launchScreen.aspect}`}
            >
              <div className="flow-image-frame">
                <Image
                  alt={launchScreen.title}
                  fill
                  priority
                  sizes="(max-width: 720px) 72vw, 330px"
                  src={launchScreen.src}
                />
              </div>
              <figcaption>{launchScreen.caption}</figcaption>
            </figure>

            <div className="flow-section-intro">
              <div className="flow-checkout-note">
                <span>Flow System</span>
                <p>
                  The ordering path was built as a connected sequence, from
                  first impression to product selection, cart review, checkout
                  details, payment, and confirmation.
                </p>
              </div>
              <p>
                Android Small and Large captures show how the same purchase
                flow holds across device classes, from browsing to payment.
              </p>
            </div>
          </div>

          <div className="flow-capture-groups">
            {screenshotGroups.map((group, index) => (
              <div className="flow-capture-group" key={group.title}>
                <div className="flow-group-header">
                  <span>Stage {String(index + 2).padStart(2, "0")}</span>
                  <h3>{group.title}</h3>
                  <p>{group.copy}</p>
                </div>

                <ExpandableFlowStacks
                  collapsedLabel={`More ${group.title} Screens`}
                  expandedLabel={`Hide ${group.title} Screens`}
                  initialStackCount={
                    group.title === "Browse" ||
                    group.title === "Customer Details"
                      ? 2
                      : group.stacks.length
                  }
                  mobilePortraitInitialStackCount={1}
                  stacks={group.stacks}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="site-shell project-section-grid">
          <SectionHeading
            kicker="Architecture"
            title="Technical Architecture"
          />
          <div>
            <div
              className="architecture-map"
              aria-label="Alla Vostra technical architecture"
            >
              {architectureNodes.map((node, index) => (
                <div className="architecture-node" key={node.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{node.title}</strong>
                  <p>{node.copy}</p>
                </div>
              ))}
            </div>
            <p className="architecture-copy">
              The project was implemented as a mobile-first client experience
              backed by server-side logic for payment-connected flows and
              transactional messaging. The architecture balanced front-end polish
              with practical production concerns such as payment reliability,
              environment setup, testing coverage, and release preparation.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="site-shell">
          <SectionHeading
            kicker="Engineering"
            title="Engineering Decisions"
          />
          <div className="project-card-grid decision-grid">
            {decisionItems.map((item) => (
              <article className="project-card" key={item.title}>
                <span>{item.title}</span>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="site-shell readiness-layout">
          <SectionHeading
            kicker="Release"
            title="Testing and Release Readiness"
          />
          <div>
            <p className="readiness-copy">
              Alla Vostra was not treated as a static concept piece. The work
              included Android-focused QA, iteration across multiple emulator
              sizes, and build preparation aimed at real release conditions.
            </p>
            <div className="readiness-list">
              {readinessItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="site-shell project-section-grid">
          <SectionHeading kicker="Timeline" title="Build Timeline" />
          <div className="project-timeline">
            {timelineItems.map((item, index) => (
              <article className="project-timeline-item" key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="stack">
        <div className="site-shell">
          <SectionHeading kicker="Stack" title="Stack" />
          <div className="stack-matrix">
            {stackGroups.map((group) => (
              <div className="stack-group" key={group.title}>
                <h3>{group.title}</h3>
                <div>
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="site-shell">
          <SectionHeading kicker="Proof" title="Build Proof" />
          <div className="proof-points">
            {proofItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="site-shell closing-panel">
          <div>
            <p className="eyebrow">Full-stack mobile work</p>
            <h2>Interested in this kind of build?</h2>
            <p>
              This project reflects the kind of work I want to keep doing:
              polished mobile interfaces, real backend-connected flows, careful
              release prep, and product decisions that hold up outside of
              mockups.
            </p>
          </div>
          <div className="closing-actions">
            <a
              className="button button-primary"
              href="https://github.com/Prahlin/alla_vostra"
              rel="noreferrer"
              target="_blank"
            >
              <Braces aria-hidden size={18} />
              View GitHub
            </a>
            <a
              className="button button-secondary"
              href="mailto:martin@prahlproductions.com"
            >
              <Mail aria-hidden size={18} />
              Contact
              <ArrowRight aria-hidden size={18} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
