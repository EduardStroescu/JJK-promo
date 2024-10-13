import { gsap } from "gsap";

export const animateShibuyaSubtitle = (shibuyaRef, scrollRef) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scrollRef,
      start: "700px",
      end: "+=550px",
      scrub: 1,
      onEnter: () => {
        // Play the timeline forward when entering the trigger
        tl.play();
      },
      onLeave: () => {
        // Reverse the timeline when leaving the trigger
        tl.reverse();
      },
      onEnterBack: () => {
        // Play the timeline forward when scrolling back up
        tl.play();
      },
      onLeaveBack: () => {
        // Reverse the timeline when scrolling back up past the end
        tl.reverse();
      },
    },
  });
  tl.addLabel("start")
    .to(shibuyaRef.current, {
      autoAlpha: 1,
      duration: 1,
      ease: "expo.inOut",
    })
    .addLabel("end")
    .to(shibuyaRef.current, {
      autoAlpha: 0,
      duration: 1,
      ease: "expo.inOut",
    });

  // Initially, set the opacity to 0 and pause the timeline
  tl.set(shibuyaRef.current, { autoAlpha: 0 }).pause();

  return tl;
};

export const animateOutNow = (outNowRef) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ["data-footer"],
      start: "+=8000px",
      end: "+=400px",
      scrub: 1,
      onEnter: () => {
        // Play the timeline forward when entering the trigger
        tl.play();
      },
      onLeave: () => {
        // Reverse the timeline when leaving the trigger
        tl.reverse();
      },
      onEnterBack: () => {
        // Play the timeline forward when scrolling back up
        tl.play();
      },
      onLeaveBack: () => {
        // Reverse the timeline when scrolling back up past the end
        tl.reverse();
      },
    },
  });
  tl.addLabel("start")
    .to(outNowRef.current, {
      display: "block",
      autoAlpha: 1,
      duration: 1,
      ease: "expo.inOut",
    })
    .addLabel("end")
    .to(outNowRef.current, {
      autoAlpha: 0,
      duration: 1,
      ease: "expo.inOut",
    });

  // Initially, set the opacity to 0 and pause the timeline
  tl.set(outNowRef.current, { autoAlpha: 0 }).pause();

  return tl;
};

export const animateWatchOn = (watchOnRef) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ["data-footer"],
      start: "+=8400px",
      end: "+=300px",
      scrub: true,
      onEnter: () => {
        // Play the timeline forward when entering the trigger
        tl.play();
      },
      onLeave: () => {
        // Reverse the timeline when leaving the trigger
        tl.reverse();
      },
      onEnterBack: () => {
        // Play the timeline forward when scrolling back up
        tl.play();
      },
      onLeaveBack: () => {
        // Reverse the timeline when scrolling back up past the end
        tl.reverse();
      },
    },
  });
  tl.addLabel("start")
    .to(watchOnRef.current, {
      display: "block",
      autoAlpha: 1,
      duration: 1,
      ease: "expo.inOut",
    })
    .addLabel("end")
    .to(watchOnRef.current, {
      autoAlpha: 0,
      duration: 1,
      ease: "expo.inOut",
    });

  // Initially, set the opacity to 0 and pause the timeline
  tl.set(watchOnRef.current, { autoAlpha: 0 }).pause();

  return tl;
};

export const animateScrollToTop = (scrollToTopRef, scrollRef) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scrollRef,
      start: "0px",
      end: "10080px",
      onUpdate: (self) => {
        // Check if scrolling forwards/backwards
        const scrollDirection = self.direction;

        if (scrollDirection === 1) {
          gsap.to(scrollToTopRef.current, {
            autoAlpha: 1,
            duration: 1,
            delay: 0.5,
            ease: "expo.out",
          });
        } else {
          gsap.to(scrollToTopRef.current, {
            autoAlpha: 0,
            duration: 1,
            delay: 0.5,
            ease: "expo.out",
          });
        }
      },
    },
  });
  tl.to(scrollToTopRef.current, {
    autoAlpha: 0,
  });
};

export const animateImage = () => {
  const tl = gsap.timeline({
    defaults: {
      ease: "expo.inOut",
      duration: 1.5,
    },
  });

  tl.from(
    "[data-image-overlay]",
    {
      "clip-path": "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1,
    },
    ">"
  )
    .to(
      "[data-image-overlay]",
      {
        "clip-path": "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        transformOrigin: "top bottom",
        duration: 1,
      },
      ">"
    )
    .to(
      "[data-image]",
      {
        "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        transformOrigin: "top bottom",
        duration: 1,
      },
      "<"
    );

  return tl;
};

export const revealVideo = (videoRef) => {
  const tl = gsap.timeline();

  tl.fromTo(
    videoRef.current,
    {
      autoAlpha: 0,
    },
    {
      autoAlpha: 1,
      ease: "expo.out",
      duration: 2,
    }
  );

  return tl;
};
