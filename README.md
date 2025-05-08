# react-time-tools

Useful time-based React hooks: `useCurrentTime`, `useCountdown`, `useStopwatch` and more.

## Example: useCurrentTime

```tsx
import { useCurrentTime } from "react-time-tools";

const Clock = () => {
  const { formattedTime } = useCurrentTime({
    format: "12-hour",
    interval: 1000,
  });
  return <p>{formattedTime}</p>;
};
```

## Example: useCountdown

```tsx
import { useCountdown } from "react-time-tools";

const Timer = () => {
  const { seconds, minutes, start, pause, reset } = useCountdown(60, {
    onEnd: () => alert("Time's up!"),
  });

  return (
    <div>
      <p>
        {minutes}:{seconds.toString().padStart(2, "0")}
      </p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={() => reset(90)}>Reset to 90s</button>
    </div>
  );
};
```

## Example: useStopwatch

```tsx
import { useStopwatch } from "react-time-tools";

const Stopwatch = () => {
  const { time, laps, start, pause, reset, addLap } = useStopwatch();

  return (
    <div>
      <p>
        {time.minutes}:{time.seconds.toString().padStart(2, "0")}.
        {time.milliseconds}
      </p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
      <button onClick={addLap}>Lap</button>
      <ul>
        {laps.map((lap, i) => (
          <li key={i}>
            Lap {i + 1}: {lap}ms
          </li>
        ))}
      </ul>
    </div>
  );
};
```

## Example: useDebouncedTime

```tsx
import { useDebouncedTime } from "react-time-tools";

const SearchInput = () => {
  const [input, setInput] = useState("");
  const debouncedInput = useDebouncedTime(input, 500);

  useEffect(() => {
    if (debouncedInput) {
      console.log("Search for:", debouncedInput);
    }
  }, [debouncedInput]);

  return <input value={input} onChange={(e) => setInput(e.target.value)} />;
};
```

## Example: useTimeoutEffect

```tsx
import { useTimeoutEffect } from "react-time-tools";

const Message = () => {
  useTimeoutEffect(() => {
    alert("Hello after 2 seconds!");
  }, 2000);

  return <p>Wait for it...</p>;
};
```

## Example: useTimeAgo

```tsx
import { useTimeAgo } from "react-time-tools";

const TimeAgoDisplay = () => {
  const timeAgo = useTimeAgo(new Date("2024-05-01T12:00:00Z"));

  return <p>{timeAgo}</p>;
};
```

## Example: useTimeScheduler

```tsx
import { useTimeScheduler } from "react-time-tools";

const ScheduledFetcher = () => {
  useTimeScheduler({
    intervalMs: 1800000, // every 30 minutes
    task: () => {
      console.log("Fetching data...");
      // fetchData();
    },
  });

  return <p>Data will be fetched every 30 minutes.</p>;
};
```

## Example: useTimeComparison

```tsx
import { useTimeComparison } from "react-time-tools";

const IsWorkHours = () => {
  const isWorkingTime = useTimeComparison({
    start: "09:00",
    end: "18:00",
  });

  return (
    <p>{isWorkingTime ? "Within working hours" : "Outside working hours"}</p>
  );
};
```

## Installation

```bash
npm install react-time-tools
```
