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
              y: 0,
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
    { name: "Story", path: "/story" },
    { name: "Characters", path: "/characters" },
  ];

  return (
    <header ref={navRef} className="navbar__wrapper">
      <nav
        className="navbar"
        ref={navRef}
        style={{ fontFamily: "Jujutsu Kaisen" }}
      >
        {routes.map((route, index) => {
          return (
            <Link
              onClick={() => lenis.scrollTo("top", { duration: 0 })}
              to={route.path}
              key={route.name}
              style={{ position: "relative" }}
            >
              {route.name}
              <div
                className="navbar__pseudoElement"
                ref={createStickyElementRef}
              ></div>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
