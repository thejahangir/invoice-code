import React, { useState, useEffect, useRef } from "react";

const AnimatedCounter = ({ value, duration = 400 }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);

  useEffect(() => {
    let startTimestamp = null;
    const start = prevValueRef.current;
    const end = value;
    if (start === end) {
      setDisplayValue(end);
      return;
    }

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setDisplayValue(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        prevValueRef.current = end;
      }
    };
    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [value, duration]);

  return <>{displayValue}</>;
};

export default AnimatedCounter;
