import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitLines from "../components/SplitLines";
import GradientOrb from "../components/GradientOrb";
import TextScramble from "../components/TextScramble";
import {
  aboutPanels,
  aboutStats,
  professionalFacts,
  profile,
  skills,
} from "../constants";
import isMobile from "../utils/isMobile";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const driftRef = useRef(null);
  const imgWrapRef = useRef(null);
  const statsRef = useRef([]);
  const counterRefs = useRef([]);
  const [mobileLayout, setMobileLayout] = useState(() =>
    typeof window !== "undefined" ? isMobile() : false
  );

  useEffect(() => {
    const onResize = () => {
      setMobileLayout(isMobile());
    };

    onResize();
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  useGSAP(() => {
    if (!mobileLayout) {
      gsap.to(sectionRef.current, {
        scale: 0.93,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 65%",
          end: "bottom 5%",
          scrub: true,
        },
      });
    }

    gsap.fromTo(
      imgWrapRef.current,
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" },
      {
        clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.8,
        ease: "power4.out",
        scrollTrigger: { trigger: imgWrapRef.current, start: "top 88%" },
      }
    );

    if (!mobileLayout) {
      gsap.to(imgRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: imgWrapRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(driftRef.current, {
        xPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".about-heading", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "center top",
          scrub: 1.5,
        },
      });
    }

    aboutStats.forEach((stat, index) => {
      const card = statsRef.current[index];
      if (!card) return;

      const value = { current: 0 };

      gsap.fromTo(
        value,
        { current: 0 },
        {
          current: stat.n,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            if (counterRefs.current[index]) {
              counterRefs.current[index].textContent = `${Math.round(value.current)}${stat.suffix}`;
            }
          },
        }
      );

      gsap.fromTo(
        card,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    const skillEls = document.querySelectorAll(".skill-pill");
    gsap.fromTo(
      skillEls,
      { scale: 0.75, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.035,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".skills-wrap",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { dependencies: [mobileLayout] });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden px-5 py-20 sm:px-8 md:px-16 md:py-24"
      style={{
        background:
          "linear-gradient(180deg, rgba(15,8,3,0.985) 0%, rgba(6,4,2,0.99) 100%)",
        borderRadius: "0 0 48px 48px",
      }}
    >
      <GradientOrb
        x="90%"
        y="20%"
        size={mobileLayout ? 360 : 600}
        color="#ffb347"
        opacity={0.035}
      />

      <div className="flex items-center gap-4 mb-4">
        <span className="index-num">02</span>
        <div className="rule flex-1" />
        <span className="label text-muted">Profile</span>
      </div>

      <TextScramble
        text="Professional Summary"
        tag="h2"
        className="about-heading display-lg text-offwhite uppercase mb-12 md:mb-16"
        scrambleOnMount
      />

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-24">
        <div>
          <div
            ref={imgWrapRef}
            className="relative rounded-2xl overflow-hidden"
            style={{ background: "var(--dim)", aspectRatio: "3/4" }}
          >
            <div ref={imgRef} className="absolute inset-0" style={{ top: "-10%", height: "120%" }}>
              <img
                src={profile.portrait}
                alt={profile.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute bottom-0 left-0 w-24 h-24"
              style={{
                background: "linear-gradient(135deg,#ffd977,transparent 60%)",
                opacity: 0.16,
              }}
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {aboutStats.map((stat, index) => (
              <div
                key={stat.label}
                ref={(element) => {
                  statsRef.current[index] = element;
                }}
                className="rounded-xl p-4 md:p-5"
                style={{
                  background: "var(--dim)",
                  border: "1px solid rgba(240,237,230,0.07)",
                }}
              >
                <p
                  ref={(element) => {
                    counterRefs.current[index] = element;
                  }}
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: mobileLayout ? 34 : 46,
                    color: "var(--lime)",
                    lineHeight: 1,
                  }}
                >
                  0{stat.suffix}
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#666",
                    marginTop: 6,
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-10 md:gap-12">
          {!mobileLayout && (
            <div
              className="overflow-hidden select-none pointer-events-none"
              style={{ marginLeft: "-8vw", marginRight: "-8vw" }}
            >
              <div ref={driftRef} className="whitespace-nowrap">
              <span
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(48px,7vw,96px)",
                  color: "#F0EDE6",
                  opacity: 0.035,
                  textTransform: "uppercase",
                }}
              >
                PYTHON · DJANGO · REACT · AWS · APIS · DATABASES · ROBOTICS ·
                DEPLOYMENT · PYTHON · DJANGO · REACT · AWS ·
                </span>
              </div>
            </div>
          )}

          <SplitLines
            text={profile.summary}
            className="body-lg"
            style={{ color: "rgba(240,237,230,0.58)", lineHeight: 1.8 }}
          />

          <div>
            <p
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(20px,2.5vw,30px)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#F0EDE6",
                marginBottom: 14,
              }}
            >
              Quick Facts
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {professionalFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-xl p-4 md:p-5"
                  style={{
                    background: "var(--dim)",
                    border: "1px solid rgba(240,237,230,0.07)",
                  }}
                >
                  <p className="label text-muted mb-3">{fact.label}</p>
                  <p style={{ color: "#F0EDE6", lineHeight: 1.7 }}>{fact.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(20px,2.5vw,30px)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#F0EDE6",
                marginBottom: 14,
              }}
            >
              Profile Highlights
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {aboutPanels.map((panel) => (
                <div
                  key={panel.title}
                  className="rounded-xl p-4 md:p-5"
                  style={{
                    background: "var(--dim)",
                    border: "1px solid rgba(240,237,230,0.07)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "clamp(18px,2.1vw,24px)",
                      color: "#F0EDE6",
                      marginBottom: 10,
                      letterSpacing: "0.03em",
                    }}
                  >
                    {panel.title}
                  </p>
                  <p style={{ color: "rgba(240,237,230,0.45)", lineHeight: 1.7 }}>
                    {panel.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(20px,2.5vw,30px)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#F0EDE6",
                marginBottom: 16,
              }}
            >
              Tech Stack
            </p>
            <div className="skills-wrap flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="skill-pill"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: mobileLayout ? 12 : 13,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: mobileLayout ? "8px 14px" : "9px 20px",
                    borderRadius: 999,
                    background: "var(--dim)",
                    border: "1px solid rgba(240,237,230,0.1)",
                    color: "#F0EDE6",
                    cursor: "default",
                    transition: "all 0.25s",
                  }}
                  onMouseEnter={(event) => {
                    event.target.style.background = "rgba(255, 196, 79, 0.12)";
                    event.target.style.borderColor = "rgba(255, 158, 74, 0.4)";
                    event.target.style.color = "#ffd977";
                    event.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(event) => {
                    event.target.style.background = "var(--dim)";
                    event.target.style.borderColor = "rgba(240,237,230,0.1)";
                    event.target.style.color = "#F0EDE6";
                    event.target.style.transform = "translateY(0)";
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
