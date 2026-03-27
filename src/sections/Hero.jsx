import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticBtn from "../components/MagneticBtn";
import GradientOrb from "../components/GradientOrb";
import TextScramble from "../components/TextScramble";
import isMobile from "../utils/isMobile";
import { heroPoints, heroRoles, profile, socials } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const actionLinks = [
  socials.find(({ name }) => name === "GitHub"),
  socials.find(({ name }) => name === "LinkedIn"),
  { name: profile.resumeLabel, href: profile.resumeHref },
].filter(Boolean);

const Hero = () => {
  const sectionRef = useRef(null);
  const nameRef = useRef(null);
  const lastRef = useRef(null);
  const roleRef = useRef(null);
  const descRef = useRef(null);
  const lineRef = useRef(null);
  const scrollRef = useRef(null);
  const gridRef = useRef(null);
  const badgeRef = useRef(null);
  const statusRef = useRef(null);
  const socialsRef = useRef(null);

  useEffect(() => {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId;

    const type = () => {
      if (!roleRef.current) return;

      const currentRole = heroRoles[roleIndex];

      if (!deleting) {
        charIndex += 1;
        roleRef.current.textContent = currentRole.slice(0, charIndex);

        if (charIndex >= currentRole.length) {
          deleting = true;
          timeoutId = window.setTimeout(type, 1700);
          return;
        }
      } else {
        charIndex -= 1;
        roleRef.current.textContent = currentRole.slice(0, charIndex);

        if (charIndex <= 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % heroRoles.length;
        }
      }

      timeoutId = window.setTimeout(type, deleting ? 28 : 48);
    };

    timeoutId = window.setTimeout(type, 1200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useGSAP(() => {
    const timeline = gsap.timeline({ delay: 0.5 });

    timeline.fromTo(
      gridRef.current.children,
      { scaleY: 0, transformOrigin: "top" },
      { scaleY: 1, duration: 1.6, stagger: 0.05, ease: "power3.inOut" }
    );

    timeline.fromTo(
      [statusRef.current, badgeRef.current],
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" },
      "-=0.9"
    );

    timeline.fromTo(
      nameRef.current,
      { y: "105%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1.3, ease: "power4.out" },
      "-=0.8"
    );

    timeline.fromTo(
      lastRef.current,
      { y: "105%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1.3, ease: "power4.out" },
      "-=1.1"
    );

    timeline.fromTo(
      lineRef.current,
      { scaleX: 0, transformOrigin: "left" },
      { scaleX: 1, duration: 0.9, ease: "expo.out" },
      "-=0.6"
    );

    timeline.fromTo(
      descRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
      "-=0.5"
    );

    timeline.fromTo(
      socialsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      "-=0.6"
    );

    timeline.fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      "-=0.3"
    );

    if (!isMobile()) {
      gsap.to(nameRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(lastRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.8,
        },
      });

      gsap.to(gridRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2.2,
        },
      });

      gsap.to([statusRef.current, badgeRef.current], {
        yPercent: 28,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    gsap.to(scrollRef.current, {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "25% top",
        scrub: true,
      },
    });
  });

  useEffect(() => {
    if (isMobile()) return;

    const section = sectionRef.current;
    if (!section) return;

    const onMove = (event) => {
      const rotateX = ((event.clientY / window.innerHeight) - 0.5) * 5;
      const rotateY = ((event.clientX / window.innerWidth) - 0.5) * -5;

      gsap.to(section, {
        rotateX,
        rotateY,
        duration: 2,
        ease: "power2.out",
        transformPerspective: 1200,
        transformOrigin: "center center",
      });
    };

    const onLeave = () => {
      gsap.to(section, {
        rotateX: 0,
        rotateY: 0,
        duration: 1.5,
        ease: "power3.out",
      });
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-end pb-16 px-8 md:px-16 pt-32 overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
    >
      <GradientOrb x="15%" y="25%" size={700} color="#ffb347" opacity={0.04} />
      <GradientOrb x="80%" y="70%" size={500} color="#ffd977" opacity={0.03} />

      <div ref={gridRef} className="absolute inset-0 pointer-events-none flex">
        {[...Array(9)].map((_, index) => (
          <div
            key={index}
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: `${(index + 1) * 10}%`,
              background: "rgba(240,237,230,0.035)",
            }}
          />
        ))}
      </div>

      <div ref={statusRef} className="absolute top-24 left-8 md:left-16 flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full"
          style={{
            background: "var(--lime)",
            boxShadow: "0 0 8px rgba(244,194,79,0.9)",
            animation: "hpulse 2s infinite",
          }}
        />
        <span className="label text-muted">{profile.availability}</span>
      </div>

      <div ref={badgeRef} className="absolute top-24 right-8 md:right-16 label text-muted">
        {profile.badge}
      </div>

      <div className="relative select-none mb-0" style={{ zIndex: 1 }}>
        <div style={{ overflow: "hidden" }} ref={nameRef}>
          <TextScramble
            text={profile.firstName.toUpperCase()}
            tag="h1"
            className="display-xl text-offwhite leading-none"
            scrambleOnMount
            style={{ display: "block" }}
          />
        </div>

        <div style={{ overflow: "hidden" }} ref={lastRef}>
          <h1
            className="display-xl leading-none"
            style={{
              WebkitTextStroke: "1.5px rgba(240,237,230,0.18)",
              color: "transparent",
            }}
          >
            {profile.lastName.toUpperCase()}
          </h1>
        </div>
      </div>

      <div ref={lineRef} className="rule my-8" style={{ zIndex: 1 }} />

      <div
        ref={descRef}
        className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_auto] gap-8 items-start"
        style={{ zIndex: 1 }}
      >
        <div>
          <p className="label text-muted mb-2">Role</p>
          <p
            className="uppercase tracking-wider"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(20px,2.8vw,34px)",
              color: "var(--lime)",
              minHeight: "1.4em",
            }}
          >
            <span ref={roleRef} />
            <span style={{ animation: "blink 1s step-end infinite", color: "var(--lime)" }}>
              _
            </span>
          </p>
        </div>

        <div className="max-w-2xl">
          <p className="body-lg" style={{ color: "rgba(240,237,230,0.52)", lineHeight: 1.8 }}>
            {profile.summary}
          </p>
          <ul className="mt-5 space-y-3">
            {heroPoints.map((point) => (
              <li
                key={point}
                style={{
                  color: "rgba(240,237,230,0.36)",
                  lineHeight: 1.7,
                  fontSize: "clamp(13px,1.2vw,15px)",
                }}
              >
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div ref={socialsRef} className="flex flex-col gap-4 shrink-0">
          {actionLinks.map((link) => (
            <MagneticBtn key={link.name} strength={0.4}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : "_self"}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="label block px-4 py-2 rounded-full transition-all duration-300"
                style={{
                  color: "rgba(240,237,230,0.35)",
                  border: "1px solid rgba(240,237,230,0.08)",
                  background: "rgba(240,237,230,0.02)",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.color = "var(--lime)";
                  event.currentTarget.style.borderColor = "rgba(255,158,74,0.35)";
                  event.currentTarget.style.background = "rgba(244,194,79,0.08)";
                  event.currentTarget.style.letterSpacing = "0.28em";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.color = "rgba(240,237,230,0.35)";
                  event.currentTarget.style.borderColor = "rgba(240,237,230,0.08)";
                  event.currentTarget.style.background = "rgba(240,237,230,0.02)";
                  event.currentTarget.style.letterSpacing = "0.2em";
                }}
              >
                {link.name} {link.href.startsWith("mailto:") ? "->" : "->"}
              </a>
            </MagneticBtn>
          ))}
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2"
        style={{ transform: "translateX(-50%)", zIndex: 1 }}
      >
        <div className="w-px h-14 overflow-hidden" style={{ background: "rgba(240,237,230,0.08)" }}>
          <div
            className="w-full"
            style={{
              height: "50%",
              background: "var(--lime)",
              animation: "scrollDrop 2s ease-in-out infinite",
            }}
          />
        </div>
        <span className="label text-muted" style={{ fontSize: 9, letterSpacing: "0.3em" }}>
          SCROLL
        </span>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes hpulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.5)} }
        @keyframes scrollDrop {
          0%   { transform: translateY(-100%); opacity: 0; }
          30%  { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
