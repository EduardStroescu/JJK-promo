import { useEffect } from "react";
import { useScrollContext } from "./Scroll";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function VideoBackground({ videoRef }) {
  const scroll = useScrollContext();

  useEffect(() => {
    const playbackConst = 90;
    const video = videoRef.current;

    if (!video) return;

    video.pause();
    function updateFrame() {
      if (video.readyState >= 3) {
        const frameNumber = scroll.progress * playbackConst;
        video.currentTime = frameNumber;
      }
    }

    updateFrame();
  }, [scroll.progress]);

  useEffect(() => {
    const video = videoRef.current;

    function handleLoadedMetadata() {
      const { duration } = video;
      const playbackConst = 110;
      const scrollSection = scroll.ref;

      if (video) {
        scrollSection.style.height =
          Math.floor(duration) * playbackConst + "px";
        ScrollTrigger.refresh();
      }
    }

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);

      // Reset the scroll container's size when the component is unmounted
      const scrollSection = scroll.ref;
      scrollSection.style.height = "auto";
    };
  }, []);

  return (
    <video
      ref={videoRef}
      id="v0"
      preload="auto"
      muted
      playsInline
      autoPlay
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    >
      <source
        type="video/mp4"
        src="https://res.cloudinary.com/dkqbb07gx/video/upload/jjk/zihbdki13rjlcqpvpf7b.mp4"
      />
    </video>
  );
}
