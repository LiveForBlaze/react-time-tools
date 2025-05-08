import { useEffect, useState } from "react";

const getTimeAgo = (timestamp: Date): string => {
  const now = new Date().getTime();
  const past = new Date(timestamp).getTime();
  const diff = Math.floor((now - past) / 1000);

  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};

export function useTimeAgo(date: Date): string {
  const [timeAgo, setTimeAgo] = useState(() => getTimeAgo(date));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(getTimeAgo(date));
    }, 10000); // update every 10 sec

    return () => clearInterval(interval);
  }, [date]);

  return timeAgo;
}
