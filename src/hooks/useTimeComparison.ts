import { useEffect, useState } from "react";

interface TimeComparisonOptions {
  start: string | Date | number;
  end: string | Date | number;
  timezone?: string; // not implemented yet, placeholder
}

function parseTime(value: string | Date | number): number {
  if (typeof value === "string") {
    const [h, m] = value.split(":").map(Number);
    const now = new Date();
    now.setHours(h, m, 0, 0);
    return now.getTime();
  }
  return new Date(value).getTime();
}

export function useTimeComparison({
  start,
  end,
}: TimeComparisonOptions): boolean {
  const [inRange, setInRange] = useState(false);

  useEffect(() => {
    const check = () => {
      const now = Date.now();
      const startMs = parseTime(start);
      const endMs = parseTime(end);
      setInRange(now >= startMs && now <= endMs);
    };

    check();
    const interval = setInterval(check, 10000); // check every 10 sec
    return () => clearInterval(interval);
  }, [start, end]);

  return inRange;
}
