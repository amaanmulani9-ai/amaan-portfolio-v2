import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextScramble from "../components/TextScramble";
import GradientOrb from "../components/GradientOrb";
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

const Projects = () => {
  const sectionRef = useRef(null);
  const rowRefs = useRef([]);
  const overlayRefs = useRef([]);
  const previewRef = useRef(null);
  const githubBoxRef = useRef(null);
  const contributionBoxRef = useRef(null);
  const numRefs = useRef([]);
  const moveX = useRef(null);
  const moveY = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [projects, setProjects] = useState([]);
  const [githubProfile, setGithubProfile] = useState(null);
  const [status, setStatus] = useState("loading");
  const [mobileLayout, setMobileLayout] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const controller = new AbortController();

    const hydrateProjects = async () => {
      try {
        const [liveProjects, liveProfile] = await Promise.all([
          loadGithubProjects({ signal: controller.signal }),
          loadGithubProfile({ signal: controller.signal }).catch(() => null),
        ]);

        setProjects(liveProjects);
        setGithubProfile(liveProfile);
        setStatus("ready");
      } catch (error) {
        if (error.name === "AbortError") return;

        setProjects([]);
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
    if (!projects.length) return;

    rowRefs.current.forEach((element) => {
      if (!element) return;

      gsap.fromTo(
        element,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 94%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    numRefs.current.forEach((element) => {
      if (!element) return;

      gsap.fromTo(
        element,
        { opacity: 0, scale: 2 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: {
            trigger: element,
            start: "top 94%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    if (!mobileLayout && previewRef.current) {
      moveX.current = gsap.quickTo(previewRef.current, "x", {
        duration: 1.1,
        ease: "power3.out",
      });
      moveY.current = gsap.quickTo(previewRef.current, "y", {
        duration: 1.3,
        ease: "power3.out",
      });
    } else {
      moveX.current = null;
      moveY.current = null;
    }

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
  }, { dependencies: [projects.length, mobileLayout] });

  const onEnter = (index) => {
    if (window.innerWidth < 768) return;
    if (!projects[index]) return;

    setHovered(index);

    gsap.fromTo(
      overlayRefs.current[index],
      { scaleY: 0, transformOrigin: "bottom" },
      { scaleY: 1, duration: 0.28, ease: "power2.out" }
    );

    gsap.to(previewRef.current, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const onLeave = (index) => {
    if (window.innerWidth < 768) return;
    if (!overlayRefs.current[index]) return;

    setHovered(null);

    gsap.to(overlayRefs.current[index], {
      scaleY: 0,
      transformOrigin: "bottom",
      duration: 0.22,
      ease: "power2.in",
    });

    gsap.to(previewRef.current, {
      autoAlpha: 0,
      scale: 0.92,
      duration: 0.25,
    });
  };

  const onMove = (event) => {
    if (!moveX.current || window.innerWidth < 768) return;

    moveX.current(event.clientX + 24);
    moveY.current(event.clientY - 60);
  };

  const activeProject = hovered !== null ? projects[hovered] : null;
  const latestProject = projects[0] ?? null;
  const liveStackCount = new Set(projects.flatMap((project) => project.tags)).size;
  const githubMetrics = [
    {
      label: "Public repos",
      value: String(githubProfile?.publicRepos ?? projects.length).padStart(2, "0"),
    },
    {
      label: "Live projects",
      value: String(projects.length).padStart(2, "0"),
    },
    {
      label: "Stacks tracked",
      value: String(liveStackCount).padStart(2, "0"),
    },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
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
        <span className="label text-muted">Selected Work</span>
      </div>

      <div style={{ overflow: "hidden" }}>
        <TextScramble
          text="Projects"
          tag="h2"
          className="display-lg text-offwhite uppercase mb-12 md:mb-16"
          style={{ display: "block" }}
          scrambleOnMount
        />
      </div>

      <div className="relative" onMouseMove={onMove}>
        {status === "loading" && (
          <p className="label text-muted pb-6">Loading live GitHub repositories...</p>
        )}

        {status === "error" && (
          <p className="label text-muted pb-6">
            Live GitHub projects could not be loaded right now.
          </p>
        )}

        {status === "ready" && projects.length === 0 && (
          <p className="label text-muted pb-6">No public GitHub repositories found.</p>
        )}

        {projects.map((project, index) => {
          const Tag = "a";

          return (
            <Tag
              key={project.id}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              ref={(element) => {
                rowRefs.current[index] = element;
              }}
              className="group relative flex flex-col gap-4 border-t py-5 md:flex-row md:items-center md:justify-between md:gap-6 md:py-6"
              style={{
                borderColor: "rgba(240,237,230,0.06)",
                cursor: mobileLayout ? "pointer" : "none",
              }}
              onMouseEnter={() => onEnter(index)}
              onMouseLeave={() => onLeave(index)}
              data-cursor={!mobileLayout ? true : undefined}
            >
              <div
                ref={(element) => {
                  overlayRefs.current[index] = element;
                }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "var(--dim)",
                  transform: "scaleY(0)",
                  transformOrigin: "bottom",
                  zIndex: 0,
                }}
              />

              <div className="relative z-10 flex min-w-0 flex-1 items-start gap-4 md:items-center md:gap-6">
                <span
                  ref={(element) => {
                    numRefs.current[index] = element;
                  }}
                  className="index-num shrink-0 transition-colors duration-300 group-hover:text-lime"
                >
                  {project.id}
                </span>

                <div className="min-w-0">
                  <h3
                    className="text-offwhite uppercase transition-colors duration-300 group-hover:text-lime md:truncate"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "clamp(28px,4.5vw,64px)",
                      lineHeight: 1,
                    }}
                  >
                    {project.name}
                  </h3>
                  <p className="label text-muted mt-2">{project.type}</p>
                </div>
              </div>

              <div className="relative z-10 flex w-full flex-wrap items-center justify-between gap-3 shrink-0 md:w-auto md:flex-nowrap md:justify-end md:gap-6">
                <div className="flex flex-wrap gap-2 md:justify-end md:max-w-xs">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="label text-muted px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(240,237,230,0.04)",
                        border: "1px solid rgba(240,237,230,0.07)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span
                  className="text-xl transition-all duration-300 md:self-auto"
                  style={{ color: "rgba(240,237,230,0.2)" }}
                  onMouseEnter={(event) => {
                    event.target.style.color = "var(--lime)";
                    event.target.style.transform = "translate(3px,-3px)";
                  }}
                  onMouseLeave={(event) => {
                    event.target.style.color = "rgba(240,237,230,0.2)";
                    event.target.style.transform = "translate(0,0)";
                  }}
                >
                  {"->"}
                </span>
              </div>
            </Tag>
          );
        })}

        <div className="rule" />

        <div
          ref={previewRef}
          className="fixed top-0 left-0 z-50 pointer-events-none hidden md:flex flex-col justify-end rounded-2xl overflow-hidden"
          style={{
            width: 380,
            height: 240,
            opacity: 0,
            scale: 0.92,
            background: "var(--dim)",
            border: "1px solid rgba(255,158,74,0.18)",
            padding: 0,
          }}
        >
          {activeProject && (
            <div
              className="w-full h-full flex flex-col justify-end p-7"
              style={{
                background:
                  "linear-gradient(to top, rgba(8,5,2,0.97) 35%, rgba(23,13,5,0.52))",
              }}
            >
              <p className="label text-lime mb-2">{activeProject.type}</p>
              <h4
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 30,
                  color: "#F0EDE6",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                {activeProject.full}
              </h4>
              <p
                className="mt-2"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: "rgba(240,237,230,0.45)",
                  lineHeight: 1.5,
                }}
              >
                {activeProject.description.slice(0, 120)}...
              </p>
            </div>
          )}
        </div>
      </div>

      {GITHUB_PROFILE_URL && (
        <a
          ref={githubBoxRef}
          href={GITHUB_PROFILE_URL}
          target="_blank"
          rel="noreferrer"
          className="group relative mt-14 block overflow-hidden rounded-[28px] p-5 md:p-8"
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
                  LIVE GITHUB
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
                    {latestProject ? `Latest push ${formatGithubDate(latestProject.pushedAt)}` : "Live synced"}
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
                Open the live GitHub profile to browse every public repository, recent pushes,
                and the source behind the projects shown in this section.
              </p>
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
                Live contribution activity pulled from the GitHub calendar for the last twelve
                months.
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
