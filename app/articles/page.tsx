import {
  FeaturedCaseStudies,
  MainNavBar,
} from "../PortfolioSections";

export default function ArticlesPage() {
  return (
    <main className="articles-page">
      <div className="site-shell">
        <MainNavBar context="articles" />
      </div>
      <FeaturedCaseStudies
        articlesMode
        kicker="UI/UX Philosophy"
        showTitleDeviceStacks={false}
        subtitle="12 Philosophical Principles for Pretty, Intuitive & Satisfying UI/UX Design"
        titleFontSize="29.76px"
        title="From UI To 'You-I':"
        underlineTitles={false}
      />
    </main>
  );
}
