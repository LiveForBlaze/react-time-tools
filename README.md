# react-time-hooks

Useful time-based React hooks: `useCurrentTime`, `useCountdown`, `useStopwatch` and more.

## Example

```tsx
import { useCurrentTime } from "react-time-hooks";

const Clock = () => {
  const { formattedTime } = useCurrentTime({
    format: "12-hour",
    interval: 1000,
  });
  return <p>{formattedTime}</p>;
};
```

## Installation

```bash
npm install react-time-hooks
```
