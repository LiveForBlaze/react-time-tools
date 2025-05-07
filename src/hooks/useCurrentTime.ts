import { useState, useEffect } from "react";

type Format = "24-hour" | "12-hour";

interface Options {
  format?: Format;
  interval?: number;
  withMilliseconds?: boolean;
}

export function useCurrentTime(options: Options = {}) {
  const {
    format = "24-hour",
    interval = 1000,
    withMilliseconds = false,
  } = options;
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const tick = () => setTime(new Date());
    const id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, [interval]);

  const formattedTime = time.toLocaleTimeString(undefined, {
    hour12: format === "12-hour",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    ...(withMilliseconds ? { fractionalSecondDigits: 3 } : {}),
  });

  return { time, formattedTime };
}
