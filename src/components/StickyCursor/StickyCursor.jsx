import { animate, transform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { motion, useVelocity } from "framer-motion";
import styles from "./cursor.module.scss";
import { useStickyContext } from "./StickyContext";

export function StickyCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const cursor = useRef(null);
  const cursorSize = isHovered ? 70 : 70;
  const { stickyElementsRef } = useStickyContext();

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const scale = {
    x: useMotionValue(1),
    y: useMotionValue(1),
  };

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const mouseXVelocity = useVelocity(mouse.x);
  const mouseYVelocity = useVelocity(mouse.y);
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const rotate = (distance) => {
    const angle = Math.atan2(-distance.x, distance.y);
    if (cursor.current) {
      animate(cursor.current, { rotate: `${angle}rad` }, { duration: 0 });
    }
  };

  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;

    let hoveredElement = null;

    stickyElementsRef.current.forEach((element) => {
      const { left, top, height, width } = element.getBoundingClientRect();
      if (
        clientX >= left &&
        clientX <= left + width &&
        clientY >= top &&
        clientY <= top + height
      ) {
        hoveredElement = element;
      }
    });

    if (isHovered) {
      rotateAndScaleCursor(clientX, clientY, hoveredElement);
    } else {
      // Move the custom cursor to the center of the viewport
      mouse.x.set(clientX - cursorSize / 2);
      mouse.y.set(clientY - cursorSize / 2);

      // Rotate and scale based on mouse velocity with dampening
      const velocityRotationFactor = 0.0002; // Increase or reduce rotation
      const velocityScalingFactor = 0.00001; // Increase or reduce scaling
      const rotationVelocity = {
        x: mouseXVelocity.get() * velocityRotationFactor,
        y: mouseYVelocity.get() * velocityRotationFactor,
      };
      const scalingVelocity =
        Math.hypot(mouseXVelocity.get(), mouseYVelocity.get()) *
        velocityScalingFactor;

      // Apply dampening
      const dampening = 0.4;
      rotate({
        x: rotationVelocity.x * dampening,
        y: rotationVelocity.y * dampening,
      });

      // Scale based on velocity with square root
      const smoothScaling = Math.sqrt(scalingVelocity);
      const newScaleX = 1 + smoothScaling * dampening * 0.5; // Further adjust the scaling factor
      const newScaleY = 1 - smoothScaling * dampening * 0.5; // Further adjust the scaling factor
      scale.x.set(newScaleX);
      scale.y.set(newScaleY);
    }
  };

  const returnToNormalState = () => {
    // Use animate with type: 'spring' for smoother return
    animate(cursor.current, { rotate: 0 }, { type: "tween", duration: 0.15 });
    animate(scale.x, 1, { type: "spring", damping: 20, stiffness: 300 });
    animate(scale.y, 1, { type: "spring", damping: 20, stiffness: 300 });
  };
  useEffect(() => {
    // Set up an interval to check for mouse inactivity and return to normal state
    const intervalId = setInterval(() => {
      const isMouseStationary =
        mouseXVelocity.get() === 0 && mouseYVelocity.get() === 0;

      if (isMouseStationary && !isHovered) {
        returnToNormalState();
      }
    }, 300);

    return () => clearInterval(intervalId);
  }, [mouseXVelocity, mouseYVelocity, isHovered]);

  const rotateAndScaleCursor = (clientX, clientY, currentElement) => {
    if (currentElement) {
      const { left, top, height, width } =
        currentElement.getBoundingClientRect();

      // Calculate the center position of the hovered element
      const center = { x: left + width / 2, y: top + height / 2 };

      // Calculate the distance between the mouse pointer and the center of the custom cursor
      const distance = { x: clientX - center.x, y: clientY - center.y };

      rotate(distance);

      // Stretch based on the distance
      const absDistance = Math.hypot(distance.x, distance.y);
      const newScaleX = transform(absDistance, [0, height / 2], [1, 1.3]);
      const newScaleY = transform(absDistance, [0, width / 2], [1, 0.8]);
      scale.x.set(newScaleX);
      scale.y.set(newScaleY);

      // Move the mouse to the center of the hovered element + slightly move it towards the mouse pointer
      mouse.x.set(center.x - cursorSize / 2 + distance.x * 0.1);
      mouse.y.set(center.y - cursorSize / 2 + distance.y * 0.1);
    }
  };

  const manageMouseOver = () => {
    setIsHovered(true);
  };

  const manageMouseLeave = () => {
    setIsHovered(false);

    if (cursor.current) {
      animate(
        cursor.current,
        { scaleX: 1, scaleY: 1 },
        { duration: 0.1 },
        { type: "spring" }
      );
    }
  };

  useEffect(() => {
    const initialX = "-500%";
    const initialY = "-500%";

    mouse.x.set(initialX);
    mouse.y.set(initialY);

    const elements = stickyElementsRef.current;

    const handleMouseOverWindow = () => {
      // Fade in the cursor when the mouse enters the window
      animate(cursor.current, { opacity: 1 }, { duration: 0.5 });
    };

    const handleMouseLeaveWindow = () => {
      // Fade out the cursor when the mouse leaves the window
      animate(cursor.current, { opacity: 0 }, { duration: 0.3 });
    };

    if (elements) {
      elements.forEach((element) => {
        element.addEventListener("mouseenter", manageMouseOver);
        element.addEventListener("mouseleave", manageMouseLeave);
      });
    }

    window.addEventListener("mousemove", manageMouseMove);
    document.body.addEventListener("mouseout", handleMouseLeaveWindow);
    document.body.addEventListener("mouseover", handleMouseOverWindow);

    return () => {
      const elementsToCleanUp = stickyElementsRef.current;

      if (elementsToCleanUp) {
        elementsToCleanUp.forEach((element) => {
          element.removeEventListener("mouseenter", manageMouseOver);
          element.removeEventListener("mouseleave", manageMouseLeave);
        });
      }

      window.removeEventListener("mousemove", manageMouseMove);
      document.body.removeEventListener("mouseout", handleMouseLeaveWindow);
      document.body.removeEventListener("mouseover", handleMouseOverWindow);
    };
  }, [isHovered, stickyElementsRef]);

  const template = ({ rotate, scaleX, scaleY }) => {
    return `rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY})`;
  };

  return (
    <div className={styles.cursorContainer}>
      <motion.div
        transformTemplate={template}
        style={{
          left: smoothMouse.x,
          top: smoothMouse.y,
          scaleX: scale.x,
          scaleY: scale.y,
        }}
        animate={{
          width: cursorSize,
          height: cursorSize,
        }}
        className={styles.cursor}
        ref={cursor}
      >
        <motion.img
          className={styles.cursor__cursorFire}
          src="/blueFireball.gif"
          alt=""
        />
      </motion.div>
    </div>
  );
}
