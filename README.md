[![npm](https://img.shields.io/npm/v/react-time-tools.svg)](https://www.npmjs.com/package/react-time-tools) [![npm](https://img.shields.io/npm/dm/react-time-tools.svg)](https://www.npmjs.com/package/react-time-tools) [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🧩 React Time Tools — Time Management Utilities for React

A lightweight and precise hook collection designed to simplify working with time in React apps. Whether you're building timers, scheduling tasks, showing relative time, or running time-based interactions — this library offers intuitive, production-ready solutions.

---

## 🔧 Feature Summary

| Hook                | Description                            |
| ------------------- | -------------------------------------- |
| `useCurrentTime`    | Real-time time tracking and formatting |
| `useCountdown`      | Countdown timer with full control      |
| `useStopwatch`      | Stopwatch with laps                    |
| `useDebouncedTime`  | Debounce value updates                 |
| `useTimeoutEffect`  | Trigger effect once after delay        |
| `useTimeAgo`        | Relative "X mins ago" strings          |
| `useInterval`       | Safe recurring logic                   |
| `useTimeScheduler`  | Repeat task every N ms                 |
| `useTimeComparison` | Check if now is between two times      |
| `useTimeSpeed`      | Simulated fast/slow time flow          |

---

### ⏰ `useCurrentTime`

Track and format the current time in real-time.

**Arguments**:

- `format?: '12-hour' | '24-hour'`
- `interval?: number` (default: 1000)
- `withMilliseconds?: boolean`

**Returns**:

- `time: Date`
- `formattedTime: string`

```tsx
const { time, formattedTime } = useCurrentTime({
  format: "12-hour",
  interval: 1000,
});
```

**Use case**: live clocks, time displays, dashboards.

```tsx
import { useCurrentTime } from "react-time-tools";

export function LiveClock() {
  const { formattedTime } = useCurrentTime({ format: "24-hour" });
  return <div>The current time is: {formattedTime}</div>;
}
```

---

### ⏳ `useCountdown`

Countdown with control over timing.

**Arguments**:

- `initialSeconds: number`
- `options?: { onEnd?: () => void }`

**Returns**:

- `minutes: number`, `seconds: number`
- `start()`, `pause()`, `reset(newSeconds?)`
- `isRunning: boolean`

```tsx
import { useCountdown } from "react-time-tools";

function CountdownTimer() {
  const { minutes, seconds, start, pause, reset } = useCountdown(90);
  return (
    <div>
      <p>
        {minutes}:{seconds.toString().padStart(2, "0")}
      </p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={() => reset(90)}>Reset</button>
    </div>
  );
}
```

**Use case**: countdowns in forms, quizzes, games.

---

### 🕒 `useStopwatch`

Track time and record laps.

**Returns**:

- `time: { minutes, seconds, milliseconds }`
- `laps: number[]`
- `start()`, `pause()`, `reset()`, `addLap()`
- `isRunning: boolean`

```tsx
import { useStopwatch } from "react-time-tools";

function Stopwatch() {
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
        {laps.map((lap, index) => (
          <li key={index}>
            Lap {index + 1}: {lap}ms
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**Use case**: stopwatch apps, profiling, logging.

---

### 🔁 `useDebouncedTime`

Delay value updates until user stops interacting.

**Arguments**:

- `value: T`
- `delay: number`

**Returns**:

- `T`

````tsx
import { useDebouncedTime } from 'react-time-tools';
import { useState, useEffect } from 'react';

function DebouncedInput() {
  const [input, setInput] = useState('');
  const debounced = useDebouncedTime(input, 500);

  useEffect(() => {
    if (debounced) console.log('Search:', debounced);
  }, [debounced]);

  return <input value={input} onChange={(e) => setInput(e.target.value)} />;
}
```tsx
const debounced = useDebouncedTime(input, 500);
````

**Use case**: debounced search, user input.

---

### ⌛ `useTimeoutEffect`

Run a callback after a delay, with automatic cleanup.

**Arguments**:

- `callback: () => void`
- `delay: number`

````tsx
import { useTimeoutEffect } from 'react-time-tools';

function DelayedNotice() {
  const [visible, setVisible] = useState(true);
  useTimeoutEffect(() => setVisible(false), 5000);

  return visible ? <p>Visible for 5 seconds</p> : null;
}
```tsx
useTimeoutEffect(() => doSomething(), 3000);
````

**Use case**: alerts, feedback banners, auto-dismiss.

---

### 🕰 `useTimeAgo`

Convert a `Date` to a human-readable relative string.

**Arguments**:

- `date: Date`

**Returns**:

- `string`

````tsx
import { useTimeAgo } from 'react-time-tools';

function MessageTime({ sentAt }: { sentAt: Date }) {
  const timeAgo = useTimeAgo(sentAt);
  return <span>{timeAgo}</span>;
}
```tsx
const timeAgo = useTimeAgo(new Date('2024-01-01T10:00:00Z'));
````

**Use case**: messaging, logging, news feeds.

---

### 🔄 `useInterval`

Call a function at regular intervals (safe version of `setInterval`).

**Arguments**:

- `callback: () => void`
- `delay: number | null`

````tsx
import { useInterval } from 'react-time-tools';

function TimerTick() {
  const [count, setCount] = useState(0);
  useInterval(() => setCount((c) => c + 1), 1000);

  return <p>Ticks: {count}</p>;
}
```tsx
useInterval(() => setCount((c) => c + 1), 1000);
````

**Use case**: polling, timers, animations.

---

### 🧭 `useTimeScheduler`

Run a task repeatedly at a fixed interval.

**Arguments**:

- `intervalMs: number`
- `task: () => void`

````tsx
import { useTimeScheduler } from 'react-time-tools';

function AutoFetcher() {
  const [data, setData] = useState(null);
  useTimeScheduler({ intervalMs: 60000, task: () => fetch('/api').then(r => r.json()).then(setData) });

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```tsx
useTimeScheduler({ intervalMs: 1800000, task: () => refreshData() });
````

**Use case**: periodic fetch, cache refresh.

---

### 🕓 `useTimeComparison`

Check if the current time is between two values.

**Arguments**:

- `start: string | Date | number`
- `end: string | Date | number`

**Returns**:

- `boolean`

````tsx
import { useTimeComparison } from 'react-time-tools';

function WorkingHoursNotice() {
  const isWorking = useTimeComparison({ start: '09:00', end: '18:00' });
  return <div>{isWorking ? 'We are open!' : 'Currently closed.'}</div>;
}
```tsx
const isWorking = useTimeComparison({ start: '09:00', end: '18:00' });
````

**Use case**: working hours logic, time-based UI.

---

### 🚀 `useTimeSpeed`

Simulate accelerated or slowed-down time flow — great for games, timelines, or demo modes.

**Arguments**:

- `initialSpeed?: number` — multiplier of real time (e.g. `2` = twice as fast)

**Returns**:

- `time: Date` — simulated time
- `setSpeed: (multiplier: number) => void` — function to change the speed

```tsx
const { time, setSpeed } = useTimeSpeed({ initialSpeed: 2 });
```

**Use case**: simulations, demos, timeline scrubbing.

```tsx
import { useTimeSpeed } from "react-time-tools";

export function SimulatedClock() {
  const { time, setSpeed } = useTimeSpeed({ initialSpeed: 2 });
  return (
    <div>
      <p>{time.toLocaleTimeString()}</p>
      <button onClick={() => setSpeed(0.5)}>0.5x</button>
      <button onClick={() => setSpeed(1)}>1x</button>
      <button onClick={() => setSpeed(2)}>2x</button>
    </div>
  );
}
```

---

## ✅ Why React Time Tools?

- 💡 Focused: every hook solves a specific time-based problem
- ⚡ Lightweight: no external runtime deps
- 🔒 Safe: cleans up timers on unmount
- 🔧 Modern: TypeScript-native, works with React 17–18+
- 💬 Easy to learn: clean signatures and types

---

> Built for: dashboards, games, monitoring panels, real-time UI, time utilities, user feedback systems.

📦 Install:

```bash
npm install react-time-tools
```

⭐ Star the repo if you like it — and help improve time-based tooling for React!

---
