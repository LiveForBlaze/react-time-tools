import { useState, useRef, useEffect, useCallback } from "react";

export function useStopwatch() {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const start = useCallback(() => {
    if (intervalRef.current !== null) return;
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedMs;
    intervalRef.current = window.setInterval(() => {
      setElapsedMs(Date.now() - (startTimeRef.current ?? 0));
    }, 100);
  }, [elapsedMs]);

  const pause = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    pause();
    setElapsedMs(0);
    setLaps([]);
    startTimeRef.current = null;
  }, [pause]);

  const addLap = useCallback(() => {
    setLaps((prev) => [...prev, elapsedMs]);
  }, [elapsedMs]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const minutes = Math.floor(elapsedMs / 60000);
  const seconds = Math.floor((elapsedMs % 60000) / 1000);
  const milliseconds = elapsedMs % 1000;

  return {
    time: { minutes, seconds, milliseconds },
    laps,
    isRunning,
    start,
    pause,
    reset,
    addLap,
  };
}
