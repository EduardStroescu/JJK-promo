import gsap from "gsap";

export const animateCharacter = (characterRef) => {
  const tl = gsap.timeline({
    defaults: {
      ease: "expo.inOut",
      duration: 1.5,
    },
  });

  tl.to(characterRef.current, {
    autoAlpha: 1,
  });

  return tl;
};

export const animateSelectedCharacterOverlay = (selectedCharacterRef) => {
  const tl = gsap.timeline({
    defaults: {
      ease: "expo.inOut",
      duration: 0.8,
    },
  });

  tl.to(selectedCharacterRef.current, {
    clipPath: "circle(100% at 50% 50%)",
  });
  return tl;
};
