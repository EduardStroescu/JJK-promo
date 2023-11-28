import { useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useScrollContext } from "../Scroll";

export function Eye() {
  const { lenis } = useScrollContext();
  const eyeRef = useRef();
  const irisRef = useRef();

  const eye = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const size = window.innerWidth >= 1100 ? 68 : 40; // Adjust as needed

  useEffect(() => {
    const updateEyePosition = () => {
      eye.x.set(eyeRef.current.offsetLeft + eyeRef.current.offsetWidth / 2);
      eye.y.set(eyeRef.current.offsetTop + eyeRef.current.offsetHeight / 2);
    };

    updateEyePosition();

    window.addEventListener("resize", updateEyePosition);

    return () => {
      window.removeEventListener("resize", updateEyePosition);
    };
  }, [eyeRef]);

  window.onmouseout = window.onmouseleave = () => {
    irisRef.current.setAttribute("class", "iris anim");
  };

  window.ontouchend = (e) => {
    if (e.touches.length === 0) window.onmouseout();
  };

  window.onmousemove = (e) => {
    irisRef.current.setAttribute("class", "iris");
    const m = {
      x: e.clientX - eye.x.get(),
      y: e.clientY - eye.y.get(),
    };
    const dist = Math.min(
      60,
      Math.max(-60, Math.sqrt(m.x ** 2 + m.y ** 2) / 6)
    );
    const dir = Math.atan2(m.x, m.y);
    const rx = dist * -Math.cos(dir);
    const ry = dist * Math.sin(dir);

    irisRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${size}px) scale(0.8)`;
  };

  window.ontouchmove = window.ontouchstart = (e) =>
    window.onmousemove(e.touches[0]);

  return (
    <motion.div ref={eyeRef} className="eye">
      <motion.div
        ref={irisRef}
        className="iris anim"
        style={{ transformStyle: "preserve-3d", pointerEvents: "auto" }}
        whileHover={{ backgroundImage: "url('/inkArrowUp.png')" }}
        onClick={() => lenis.scrollTo("top", { lerp: 0.02 })}
      />
    </motion.div>
  );
}
