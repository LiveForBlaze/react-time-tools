import { useState, useRef, useEffect, useCallback } from "react";

interface UseCountdownOptions {
  onEnd?: () => void;
}

export function useCountdown(
  initialSeconds: number,
  options: UseCountdownOptions = {}
) {
  const { onEnd } = options;
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const start = useCallback(() => {
    if (intervalRef.current !== null) return;
    setIsRunning(true);
    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setIsRunning(false);
          onEnd?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [onEnd]);

  const pause = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const reset = useCallback(
    (newTime?: number) => {
      pause();
      setSecondsLeft(newTime ?? initialSeconds);
    },
    [initialSeconds, pause]
  );

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { seconds, minutes, isRunning, start, pause, reset };
}
