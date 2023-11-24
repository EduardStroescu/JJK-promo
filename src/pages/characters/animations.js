import gsap from "gsap";

export const animateCharacterHover = (characterRef) => {
  const tl = gsap.timeline();

  tl.to(characterRef, {
    // maskPosition: "100% 0",
    opacity: 0,
    duration: 0.7,
    ease: "linear",
  });

  return tl;
};
