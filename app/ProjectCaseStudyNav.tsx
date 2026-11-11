"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

import {
  ProjectCtaTextSnippet,
  projectLinks,
} from "./ProjectCarouselButton";

function getProjectPageHref(href: string) {
  return href.startsWith("#") ? `/${href}` : href;
}

export function ProjectCaseStudyNav({
  currentProjectId,
}: {
  currentProjectId: string;
}) {
  const currentIndex = projectLinks.findIndex(
    (project) => project.caseStudyId === currentProjectId,
  );

  if (currentIndex === -1 || projectLinks.length < 2) {
    return null;
  }

  const previousProject =
    projectLinks[(currentIndex + 1) % projectLinks.length];
  const nextProject =
    projectLinks[(currentIndex - 1 + projectLinks.length) % projectLinks.length];

  return (
    <nav
      aria-label="Browse adjacent case studies"
      className="project-case-study-nav"
    >
      <a
        aria-label={`Open previous case study: ${previousProject.name}`}
        className="project-case-study-nav-link is-previous"
        href={getProjectPageHref(previousProject.href)}
      >
        <ArrowLeft aria-hidden />
        <ProjectCtaTextSnippet
          caseStudyId={previousProject.caseStudyId}
          className="project-case-study-nav-project-label"
        />
      </a>
      <a
        aria-label={`Open next case study: ${nextProject.name}`}
        className="project-case-study-nav-link is-next"
        href={getProjectPageHref(nextProject.href)}
      >
        <ProjectCtaTextSnippet
          caseStudyId={nextProject.caseStudyId}
          className="project-case-study-nav-project-label"
        />
        <ArrowRight aria-hidden />
      </a>
    </nav>
  );
}
