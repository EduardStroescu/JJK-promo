import gsap from "gsap";

export const animateStory = (storyRef) => {
  const tl = gsap.timeline({
    defaults: {
      ease: "expo.inOut",
      duration: 1.5,
    },
  });
  tl.to(storyRef.current, {
    autoAlpha: 1,
  });
};
