import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextScramble from "../components/TextScramble";
import GradientOrb from "../components/GradientOrb";
import { featuredProjects } from "../constants";
import {
  GITHUB_PROFILE_URL,
  GITHUB_USER,
  loadGithubProfile,
  loadGithubProjects,
} from "../lib/githubProjects";

gsap.registerPlugin(ScrollTrigger);

const GitHubGlyph = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const contributionGraphUrl = `https://gh-heat.anishroy.com/api/${GITHUB_USER}/svg?${new URLSearchParams({
  darkMode: "true",
  transparent: "true",
  colors: "161b22,0e4429,006d32,26a641,39d353",
  textColor: "8b949e",
  borderColor: "30363d",
  showLegend: "true",
  showDayLabels: "true",
  showMonthLabels: "true",
  cellSize: "11",
  cellGap: "4",
  padding: "14",
  radius: "2",
})}`;

const formatGithubDate = (value) => {
  if (!value) return "Syncing now";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const ProjectVisual = ({ project }) => {
  const [imageMissing, setImageMissing] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-[28px]"
      style={{
        background:
          "linear-gradient(160deg, rgba(28,17,7,0.98) 0%, rgba(12,8,3,0.98) 100%)",
        border: "1px solid rgba(255,158,74,0.12)",
        boxShadow: "0 30px 70px rgba(0,0,0,0.32)",
      }}
    >
      {!imageMissing && project.imageSrc ? (
        <img
          src={project.imageSrc}
          alt={project.imageAlt}
          className="block aspect-[4/3] w-full object-cover"
          loading="lazy"
          onError={() => setImageMissing(true)}
        />
      ) : (
        <div
          className="aspect-[4/3] w-full p-7 md:p-9 flex flex-col justify-between"
          style={{
            background:
              "radial-gradient(circle at 18% 18%, rgba(255,217,119,0.16), transparent 28%), linear-gradient(135deg, rgba(255,158,74,0.16), rgba(18,11,4,0.96))",
          }}
        >
          <span className="label" style={{ color: "rgba(240,237,230,0.48)" }}>
            Project preview coming soon
          </span>
          <div>
            <p
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(34px,5vw,62px)",
                lineHeight: 0.95,
                color: "#F0EDE6",
              }}
            >
              {project.title}
            </p>
            <p className="mt-3" style={{ color: "rgba(240,237,230,0.46)", lineHeight: 1.7 }}>
              {project.tagline}
            </p>
          </div>
        </div>
      )}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 p-5 md:p-6"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,5,2,0) 0%, rgba(8,5,2,0.9) 82%, rgba(8,5,2,0.97) 100%)",
        }}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="label rounded-full px-3 py-2"
            style={{
              background: "rgba(244,194,79,0.14)",
              border: "1px solid rgba(255,158,74,0.2)",
              color: "rgba(240,237,230,0.68)",
            }}
          >
            {imageMissing ? "Visual fallback" : "Repository preview"}
          </span>
          <span className="label" style={{ color: "rgba(240,237,230,0.36)" }}>
            {project.slug}
          </span>
        </div>
      </div>
    </div>
  );
};

const FeaturedProjectCard = ({ project, index, registerRef }) => {
  const mediaOrder = index % 2 === 0 ? "lg:order-1" : "lg:order-2";
  const textOrder = index % 2 === 0 ? "lg:order-2" : "lg:order-1";

  return (
    <article
      ref={registerRef}
      className="grid gap-8 border-t pt-10 md:gap-10 md:pt-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center"
      style={{ borderColor: "rgba(240,237,230,0.08)" }}
    >
      <div className={mediaOrder}>
        <ProjectVisual project={project} />
      </div>

      <div className={textOrder}>
        <div className="flex items-center gap-3 mb-4">
          <span className="index-num">{project.id}</span>
          <span
            className="label rounded-full px-3 py-2"
            style={{
              background: "rgba(240,237,230,0.04)",
              border: "1px solid rgba(240,237,230,0.08)",
              color: "rgba(240,237,230,0.48)",
            }}
          >
            Featured project
          </span>
        </div>

        <h3
          className="text-offwhite uppercase"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(42px,6vw,84px)",
            lineHeight: 0.94,
            letterSpacing: "0.02em",
          }}
        >
          {project.title}
        </h3>
        <p
          className="mt-4 max-w-2xl"
          style={{
            fontSize: "clamp(18px,2vw,24px)",
            lineHeight: 1.6,
            color: "rgba(240,237,230,0.56)",
          }}
        >
          {project.tagline}
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <p className="label mb-3" style={{ color: "rgba(240,237,230,0.34)" }}>
              Problem
            </p>
            <p style={{ color: "#F0EDE6", lineHeight: 1.8 }}>{project.problem}</p>
          </div>
          <div>
            <p className="label mb-3" style={{ color: "rgba(240,237,230,0.34)" }}>
              Role
            </p>
            <p style={{ color: "#F0EDE6", lineHeight: 1.8 }}>{project.role}</p>
          </div>
        </div>

        <div className="mt-8">
          <p className="label mb-3" style={{ color: "rgba(240,237,230,0.34)" }}>
            What shipped
          </p>
          <ul className="space-y-3">
            {project.outcomes.map((item) => (
              <li
                key={item}
                style={{
                  color: "rgba(240,237,230,0.58)",
                  lineHeight: 1.75,
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="label rounded-full px-3 py-2"
              style={{
                background: "rgba(240,237,230,0.04)",
                border: "1px solid rgba(240,237,230,0.07)",
                color: "rgba(240,237,230,0.44)",
              }}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-9 flex flex-wrap gap-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="label inline-flex items-center gap-3 rounded-full px-5 py-3 transition-all duration-300"
            style={{
              color: "var(--charcoal)",
              background: "linear-gradient(135deg, #ffd977 0%, #f4c24f 100%)",
              border: "1px solid rgba(255,217,119,0.85)",
              boxShadow: "0 16px 40px rgba(244,194,79,0.18)",
            }}
            data-cursor
          >
            View GitHub {"->"}
          </a>

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="label inline-flex items-center gap-3 rounded-full px-5 py-3 transition-all duration-300"
              style={{
                color: "rgba(240,237,230,0.54)",
                background: "rgba(240,237,230,0.02)",
                border: "1px solid rgba(240,237,230,0.08)",
              }}
              data-cursor
            >
              View Demo {"->"}
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

const Projects = () => {
  const cardRefs = useRef([]);
  const githubBoxRef = useRef(null);
  const contributionBoxRef = useRef(null);
  const [liveProjects, setLiveProjects] = useState([]);
  const [githubProfile, setGithubProfile] = useState(null);
  const [status, setStatus] = useState("loading");
  const [mobileLayout, setMobileLayout] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const controller = new AbortController();

    const hydrateProjects = async () => {
      try {
        const [repoFeed, liveProfile] = await Promise.all([
          loadGithubProjects({ signal: controller.signal }),
          loadGithubProfile({ signal: controller.signal }).catch(() => null),
        ]);

        setLiveProjects(repoFeed);
        setGithubProfile(liveProfile);
        setStatus("ready");
      } catch (error) {
        if (error.name === "AbortError") return;

        setLiveProjects([]);
        setStatus("error");
      }
    };

    hydrateProjects();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      setMobileLayout(window.innerWidth < 768);
    };

    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useGSAP(() => {
    cardRefs.current.filter(Boolean).forEach((element, index) => {
      gsap.fromTo(
        element,
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: index * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    if (githubBoxRef.current) {
      gsap.fromTo(
        githubBoxRef.current,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: githubBoxRef.current,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    if (contributionBoxRef.current) {
      gsap.fromTo(
        contributionBoxRef.current,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contributionBoxRef.current,
            start: "top 94%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, { dependencies: [liveProjects.length, mobileLayout] });

  const latestProject = liveProjects[0] ?? null;
  const liveStackCount = new Set(liveProjects.flatMap((project) => project.tags)).size;
  const githubMetrics = [
    {
      label: "Public repos",
      value: String(githubProfile?.publicRepos ?? liveProjects.length).padStart(2, "0"),
    },
    {
      label: "Live repos tracked",
      value: String(liveProjects.length).padStart(2, "0"),
    },
    {
      label: "Stacks tracked",
      value: String(liveStackCount).padStart(2, "0"),
    },
  ];

  return (
    <section
      id="projects"
      className="px-5 py-20 sm:px-8 md:px-16 md:py-24"
      style={{
        background:
          "linear-gradient(180deg, rgba(5,3,1,0.995) 0%, rgba(14,8,3,0.985) 100%)",
        overflow: "hidden",
      }}
    >
      <GradientOrb
        x="85%"
        y="40%"
        size={mobileLayout ? 320 : 500}
        color="#ff9e4a"
        opacity={0.035}
      />

      <div className="flex items-center gap-4 mb-4">
        <span className="index-num">03</span>
        <div className="rule flex-1" />
        <span className="label text-muted">Featured Work</span>
      </div>

      <div style={{ overflow: "hidden" }}>
        <TextScramble
          text="Selected Projects"
          tag="h2"
          className="display-lg text-offwhite uppercase mb-8 md:mb-10"
          style={{ display: "block" }}
          scrambleOnMount
        />
      </div>

      <p
        className="max-w-3xl"
        style={{
          color: "rgba(240,237,230,0.5)",
          lineHeight: 1.8,
          fontSize: "clamp(16px,1.8vw,20px)",
        }}
      >
        A curated set of projects that show how I approach product UI, Python-backed
        systems, automation, and presentation quality. GitHub stays below as live proof,
        but this section leads with the work I would want a recruiter to review first.
      </p>

      <div className="mt-12 grid gap-12 md:mt-14 md:gap-14">
        {featuredProjects.map((project, index) => (
          <FeaturedProjectCard
            key={project.slug}
            project={project}
            index={index}
            registerRef={(element) => {
              cardRefs.current[index] = element;
            }}
          />
        ))}
      </div>

      {GITHUB_PROFILE_URL && (
        <a
          ref={githubBoxRef}
          href={GITHUB_PROFILE_URL}
          target="_blank"
          rel="noreferrer"
          className="group relative mt-16 block overflow-hidden rounded-[28px] p-5 md:mt-20 md:p-8"
          data-cursor={!mobileLayout ? true : undefined}
          style={{
            background:
              "linear-gradient(135deg, rgba(20,12,4,0.96) 0%, rgba(10,6,2,0.98) 100%)",
            border: "1px solid rgba(255,158,74,0.14)",
            boxShadow: "inset 0 1px 0 rgba(240,237,230,0.04)",
          }}
        >
          <div
            className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              opacity: 0.65,
              background:
                "radial-gradient(circle at 82% 22%, rgba(244,194,79,0.18), transparent 26%), linear-gradient(90deg, rgba(255,158,74,0.06), transparent 55%)",
            }}
          />

          <div className="relative z-10 grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1.25fr)_auto] xl:items-end">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    background: "var(--lime)",
                    boxShadow: "0 0 12px rgba(244,194,79,0.8)",
                  }}
                />
                <span className="label" style={{ color: "rgba(240,237,230,0.42)" }}>
                  MORE ON GITHUB
                </span>
              </div>

              <div className="flex items-center gap-4 md:gap-5">
                {githubProfile?.avatarUrl ? (
                  <img
                    src={githubProfile.avatarUrl}
                    alt={githubProfile.name || githubProfile.login || GITHUB_USER}
                    className="h-16 w-16 rounded-full object-cover"
                    style={{
                      border: "1px solid rgba(255,158,74,0.25)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                    }}
                  />
                ) : (
                  <div
                    className="h-16 w-16 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(244,194,79,0.08)",
                      border: "1px solid rgba(255,158,74,0.2)",
                      color: "var(--lime)",
                    }}
                  >
                    <GitHubGlyph />
                  </div>
                )}

                <div className="min-w-0">
                  <p className="label text-muted mb-2">Connected profile</p>
                  <h3
                    className="text-offwhite uppercase truncate"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "clamp(30px,4vw,58px)",
                      lineHeight: 0.95,
                      letterSpacing: "0.03em",
                    }}
                  >
                    {githubProfile?.name || GITHUB_USER}
                  </h3>
                  <p
                    style={{
                      color: "rgba(240,237,230,0.42)",
                      lineHeight: 1.7,
                      fontSize: mobileLayout ? 11 : 13,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    @{githubProfile?.login || GITHUB_USER} {"  "}
                    {latestProject
                      ? `Latest push ${formatGithubDate(latestProject.pushedAt)}`
                      : "Live synced"}
                  </p>
                </div>
              </div>

              <p
                className="mt-6 max-w-2xl"
                style={{
                  color: "rgba(240,237,230,0.48)",
                  lineHeight: 1.8,
                }}
              >
                Browse the wider repository history, recent pushes, and additional project
                experiments beyond the featured case studies above.
              </p>

              {status === "loading" && (
                <p className="label mt-5" style={{ color: "rgba(240,237,230,0.3)" }}>
                  Syncing live GitHub repositories...
                </p>
              )}

              {status === "error" && (
                <p className="label mt-5" style={{ color: "rgba(240,237,230,0.3)" }}>
                  GitHub could not be loaded right now, but the public profile link still works.
                </p>
              )}
            </div>

            <div className="flex flex-col gap-6 xl:items-end">
              <div className="grid grid-cols-3 gap-3 xl:min-w-[420px]">
                {githubMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl px-3 py-4 md:px-4 md:py-5"
                    style={{
                      background: "rgba(240,237,230,0.025)",
                      border: "1px solid rgba(240,237,230,0.06)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: mobileLayout ? 28 : 36,
                        lineHeight: 1,
                        color: "#F0EDE6",
                      }}
                    >
                      {metric.value}
                    </p>
                    <p className="label mt-2" style={{ color: "rgba(240,237,230,0.35)" }}>
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <span
                  className="label transition-all duration-300"
                  style={{ color: "rgba(240,237,230,0.38)" }}
                >
                  View GitHub profile
                </span>
                <span
                  className="text-2xl transition-all duration-300 group-hover:text-lime"
                  style={{ color: "rgba(240,237,230,0.26)" }}
                >
                  {"->"}
                </span>
              </div>
            </div>
          </div>
        </a>
      )}

      <div
        ref={contributionBoxRef}
        className="relative mt-6 overflow-hidden rounded-[28px] p-5 md:p-8"
        style={{
          background: "rgba(8, 10, 14, 0.72)",
          border: "1px solid rgba(240,237,230,0.08)",
          boxShadow: "inset 0 1px 0 rgba(240,237,230,0.03)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(57,211,83,0.05), transparent 42%), radial-gradient(circle at 100% 0%, rgba(57,211,83,0.1), transparent 28%)",
          }}
        />

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-6">
            <div>
              <p className="label mb-3" style={{ color: "rgba(240,237,230,0.36)" }}>
                LIVE CONTRIBUTION ACTIVITY
              </p>
              <h3
                className="text-offwhite uppercase"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(28px,4vw,52px)",
                  lineHeight: 0.95,
                  letterSpacing: "0.04em",
                }}
              >
                GitHub Heatmap
              </h3>
              <p
                className="mt-3 max-w-2xl"
                style={{
                  color: "rgba(240,237,230,0.45)",
                  lineHeight: 1.8,
                }}
              >
                Live contribution activity pulled from the GitHub calendar for the last
                twelve months.
              </p>
            </div>

            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-4"
              data-cursor={!mobileLayout ? true : undefined}
            >
              <span className="label" style={{ color: "rgba(240,237,230,0.38)" }}>
                Open on GitHub
              </span>
              <span style={{ color: "rgba(240,237,230,0.28)", fontSize: 22 }}>{"->"}</span>
            </a>
          </div>

          <div
            className="overflow-x-auto rounded-2xl p-2.5 md:p-4"
            style={{
              background: "rgba(13, 17, 23, 0.88)",
              border: "1px solid rgba(48, 54, 61, 0.9)",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <img
              src={contributionGraphUrl}
              alt={`Live GitHub contribution heatmap for ${GITHUB_USER}`}
              className="block w-[860px] max-w-none min-w-[680px] md:w-full md:min-w-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
