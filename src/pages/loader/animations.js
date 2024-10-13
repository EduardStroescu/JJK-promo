import { gsap } from "gsap";

export const introAnimation = (wordGroupsRef) => {
  const tl = gsap.timeline();
  tl.to(
    wordGroupsRef.current,
    {
      transform: "translateY(-120vh)",
      duration: 3,
      ease: "power3.inOut",
    },
    "+4"
  );

  return tl;
};

export const animateTitleIn = () => {
  const tl = gsap.timeline({
    defaults: {
      ease: "expo.inOut",
      duration: 2,
    },
  });

  tl.fromTo(
    "[data-title-first]",
    {
      x: 100,
      autoAlpha: 0,
    },
    {
      x: 0,
      autoAlpha: 1,
    },
    "<"
  )
    .fromTo(
      "[data-title-second]",
      {
        x: -100,
        autoAlpha: 0,
      },
      {
        x: 0,
        autoAlpha: 1,
      },
      "0"
    )
    .fromTo(
      "[data-title-last]",
      {
        y: -100,
        autoAlpha: 0,
      },
      {
        y: 0,
        autoAlpha: 1,
      },
      "+1"
    )
    .to(
      "[data-flames]",
      {
        opacity: 1,
        duration: 3,
      },
      "+2"
    );

  return tl;
};

export const animateLoaderOut = (loaderRef) => {
  const tl = gsap.timeline();
  tl.to(
    loaderRef.current,
    {
      "clip-path": "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1,
      ease: "expo.inOut",
    },
    "<"
  );

  return tl;
};

export const progressAnimation = (progressRef, progressNumberRef) => {
  const tl = gsap.timeline();

  tl.to(progressRef.current, {
    x: "0vw",
    duration: 5,
    ease: "power3.inOut",
  })
    .to(
      progressNumberRef.current,
      {
        x: "100vw",
        duration: 5,
        ease: "power3.inOut",
      },
      "<"
    )
    .to(
      progressNumberRef.current,
      {
        textContent: "100",
        duration: 5,
        roundProps: "textContent",
      },
      "<"
    )
    .to(progressNumberRef.current, {
      y: 24,
      autoAlpha: 0,
    })
    .to(progressRef.current, {
      y: "100%",
      duration: 1,
    });

  return tl;
};
