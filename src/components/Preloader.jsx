import { useEffect, useRef } from "react";
import gsap from "gsap";
import { profile } from "../constants";

const PRELOADER_WIDTH = 1000;
const PRELOADER_HEIGHT = 320;

const Preloader = ({ onComplete }) => {
  const overlayRef = useRef(null);
  const sigRef = useRef(null);
  const clipRectRef = useRef(null);
  const tagRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const sig = sigRef.current;
    if (!overlay || !sig) return;

    gsap.set(sig, { opacity: 1 });
    gsap.set(tagRef.current, { opacity: 0, y: 10 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlay, {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          onComplete,
        });
      },
    });

    tl.fromTo(
      clipRectRef.current,
      { attr: { width: 0 } },
      {
        attr: { width: PRELOADER_WIDTH },
        duration: 2.8,
        ease: "power2.inOut",
      }
    );

    tl.to(
      tagRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4"
    );

    tl.to({}, { duration: 0.9 });

    tl.to([sig, tagRef.current], {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
    });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--charcoal)",
        zIndex: 9999999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
      }}
    >
      <div ref={sigRef} style={{ opacity: 0, width: "min(820px, 88vw)" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${PRELOADER_WIDTH} ${PRELOADER_HEIGHT}`}
          width="100%"
          style={{
            overflow: "visible",
            filter: "drop-shadow(0 0 14px rgba(244,194,79,0.72))",
          }}
        >
          <defs>
            <clipPath id="sig-reveal">
              <rect
                ref={clipRectRef}
                x="0"
                y="0"
                width="0"
                height={PRELOADER_HEIGHT}
              />
            </clipPath>
          </defs>

          <g clipPath="url(#sig-reveal)">
            <text
              x="500"
              y="192"
              textAnchor="middle"
              fill="var(--lime)"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "250px",
                fontWeight: 700,
                letterSpacing: "0.03em",
                textTransform: "uppercase",
              }}
            >
              {profile.firstName.toUpperCase()}
            </text>

            <text
              x="500"
              y="192"
              textAnchor="middle"
              fill="none"
              stroke="rgba(244,194,79,0.24)"
              strokeWidth="6"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "250px",
                fontWeight: 700,
                letterSpacing: "0.03em",
                textTransform: "uppercase",
              }}
            >
              {profile.firstName.toUpperCase()}
            </text>
          </g>
        </svg>
      </div>

      <p
        ref={tagRef}
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(10px, 1.4vw, 14px)",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: "rgba(240,237,230,0.28)",
        }}
      >
        Full Stack Developer
      </p>
    </div>
  );
};

export default Preloader;
