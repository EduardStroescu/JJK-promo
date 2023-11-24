import { useEffect, useRef } from "react";
import { Eye } from "./Eye";
import { animateScrollToTop } from "../../pages/home/animations";
import gsap from "gsap";
import styles from "./scrollToTopButton.module.scss";

export function ScrollToTopButton() {
  const timeline = useRef(gsap.timeline());
  const scrollToTopRef = useRef();
  useEffect(() => {
    const context = gsap.context(() => {
      const tl = timeline.current;
      tl.add(animateScrollToTop(scrollToTopRef, scroll.ref));
    });

    return () => context.revert();
  }, []);

  return (
    <div ref={scrollToTopRef} style={{ opacity: 0 }} className={styles.button}>
      <Eye />
      <img
        src="/hand.png"
        alt=""
        className={styles.button__image}
        loading="lazy"
      />
    </div>
  );
}
