import { useEffect, useState, useRef, useCallback } from "react";

interface UseTimeSpeedOptions {
  initialSpeed?: number;
}

export function useTimeSpeed({ initialSpeed = 1 }: UseTimeSpeedOptions = {}) {
  const [simulatedTime, setSimulatedTime] = useState(new Date());
  const speedRef = useRef(initialSpeed);
  const lastRealTime = useRef(Date.now());
  const lastSimulatedTime = useRef(simulatedTime.getTime());

  const setSpeed = useCallback((newSpeed: number) => {
    lastSimulatedTime.current = Date.now();
    lastRealTime.current = Date.now();
    speedRef.current = newSpeed;
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const delta = now - lastRealTime.current;
      const newSim = lastSimulatedTime.current + delta * speedRef.current;
      setSimulatedTime(new Date(newSim));
    };

    const interval = setInterval(tick, 500);
    return () => clearInterval(interval);
  }, []);

  return { time: simulatedTime, setSpeed };
}
