import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, socials } from "../constants";
import TextScramble from "../components/TextScramble";
import GradientOrb from "../components/GradientOrb";

gsap.registerPlugin(ScrollTrigger);

const githubLink = socials.find(({ name }) => name === "GitHub")?.href;

const Projects = () => {
  const sectionRef = useRef(null);
  const rowRefs = useRef([]);
  const overlayRefs = useRef([]);
  const previewRef = useRef(null);
  const numRefs = useRef([]);
  const moveX = useRef(null);
  const moveY = useRef(null);
  const [hovered, setHovered] = useState(null);

  useGSAP(() => {
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

    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.1,
      ease: "power3.out",
    });
    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 1.3,
      ease: "power3.out",
    });
  });

  const onEnter = (index) => {
    if (window.innerWidth < 768) return;

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

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 px-8 md:px-16"
      style={{
        background:
          "linear-gradient(180deg, rgba(5,3,1,0.995) 0%, rgba(14,8,3,0.985) 100%)",
        overflow: "hidden",
      }}
    >
      <GradientOrb x="85%" y="40%" size={500} color="#ff9e4a" opacity={0.035} />

      <div className="flex items-center gap-4 mb-4">
        <span className="index-num">03</span>
        <div className="rule flex-1" />
        <span className="label text-muted">Selected Work</span>
      </div>

      <div style={{ overflow: "hidden" }}>
        <TextScramble
          text="Projects"
          tag="h2"
          className="display-lg text-offwhite uppercase mb-16"
          style={{ display: "block" }}
          scrambleOnMount
        />
      </div>

      <div className="relative" onMouseMove={onMove}>
        {projects.map((project, index) => {
          const Tag = project.href ? "a" : "article";

          return (
            <Tag
              key={project.id}
              {...(project.href
                ? { href: project.href, target: "_blank", rel: "noreferrer" }
                : {})}
              ref={(element) => {
                rowRefs.current[index] = element;
              }}
              className="group relative flex items-center justify-between py-6 border-t"
              style={{
                borderColor: "rgba(240,237,230,0.06)",
                cursor: project.href ? "none" : "default",
              }}
              onMouseEnter={() => onEnter(index)}
              onMouseLeave={() => onLeave(index)}
              data-cursor={project.href ? true : undefined}
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

              <div className="relative z-10 flex items-center gap-6 flex-1 min-w-0">
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
                    className="uppercase text-offwhite transition-colors duration-300 group-hover:text-lime truncate"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "clamp(28px,4.5vw,64px)",
                      lineHeight: 1,
                    }}
                  >
                    {project.name}
                  </h3>
                  <p className="label text-muted mt-1 hidden md:block">{project.type}</p>
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-6 shrink-0">
                <div className="hidden md:flex flex-wrap gap-2 justify-end max-w-xs">
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

                {project.href ? (
                  <span
                    className="text-xl transition-all duration-300"
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
                ) : (
                  <span className="label text-muted">Portfolio project</span>
                )}
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
          {hovered !== null && (
            <div
              className="w-full h-full flex flex-col justify-end p-7"
              style={{
                background:
                  "linear-gradient(to top, rgba(8,5,2,0.97) 35%, rgba(23,13,5,0.52))",
              }}
            >
              <p className="label text-lime mb-2">{projects[hovered].type}</p>
              <h4
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 30,
                  color: "#F0EDE6",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                {projects[hovered].full}
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
                {projects[hovered].description.slice(0, 120)}...
              </p>
            </div>
          )}
        </div>
      </div>

      {githubLink && (
        <div className="mt-14 flex items-center gap-6">
          <a
            href={githubLink}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-4"
            data-cursor
          >
            <span
              className="label transition-all duration-300"
              style={{ color: "rgba(240,237,230,0.35)" }}
              onMouseEnter={(event) => {
                event.target.style.color = "var(--lime)";
              }}
              onMouseLeave={(event) => {
                event.target.style.color = "rgba(240,237,230,0.35)";
              }}
              >
                View GitHub profile {"->"}
              </span>
          </a>
        </div>
      )}
    </section>
  );
};

export default Projects;
