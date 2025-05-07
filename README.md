# react-time-tools

Useful time-based React hooks: `useCurrentTime`, `useCountdown`, `useStopwatch` and more.

## Example

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
import { useCountdown } from "react-time-hooks";

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

## Installation

```bash
npm install react-time-tools
```
