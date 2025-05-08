import { useEffect, useRef } from "react";

interface UseTimeSchedulerOptions {
  intervalMs: number;
  task: () => void;
}

export function useTimeScheduler({
  intervalMs,
  task,
}: UseTimeSchedulerOptions) {
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const scheduleNext = () => {
      timeoutRef.current = window.setTimeout(() => {
        task();
        scheduleNext();
      }, intervalMs);
    };

    scheduleNext();

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [intervalMs, task]);
}
