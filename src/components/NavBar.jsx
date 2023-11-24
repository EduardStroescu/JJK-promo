import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useScrollContext } from "./Scroll";
import { Link } from "@tanstack/react-router";
import { useStickyContext } from "./StickyCursor/StickyContext";

export function NavBar() {
  const { lenis } = useScrollContext();
  const timeline = useRef(gsap.timeline());
  const scroll = useScrollContext();
  const navRef = useRef();
  const { addStickyElement } = useStickyContext();
  const createStickyElementRef = (el) => {
    el && addStickyElement(el);
  };

  const animateNav = (navRef, scrollRef) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollRef,
        start: "0px",
        end: "8600px",
        onUpdate: (self) => {
          const scrollDirection = self.direction;

          if (scrollDirection === 1) {
            gsap.to(navRef.current, {
              y: -100,
              autoAlpha: 0,
              duration: 3,
              ease: "expo.out",
            });
          } else {
            gsap.to(navRef.current, {
              y: 10,
              autoAlpha: 1,
              duration: 3,
              ease: "expo.out",
            });
          }
        },
      },
    });
    return tl;
  };

  useEffect(() => {
    const context = gsap.context(() => {
      const tl = timeline.current;
      tl.add(animateNav(navRef, scroll.ref), 0);
    });

    return () => context.revert();
  }, []);

  const routes = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Story", path: "/story" },
    { name: "Characters", path: "/characters" },
  ];

  return (
    <header className="w-full flex flex-row items-center justify-center fixed top-0 left-0 py-6 text-3xl text-white  z-[99999999]">
      <nav
        ref={navRef}
        style={{ fontFamily: "Jujutsu Kaisen" }}
        className="flex flex-row gap-16 bg-black/20 px-10 rounded-full py-1 backdrop-blur-lg"
      >
        {routes.map((route, index) => {
          return (
            <Link
              onClick={() => lenis.scrollTo("top", { duration: 0 })}
              to={route.path}
              key={route.name}
              className="relative"
            >
              {route.name}
              <div
                ref={createStickyElementRef}
                className="absolute left-0 -top-0 w-full h-full hover:scale-y-[4]"
              ></div>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
