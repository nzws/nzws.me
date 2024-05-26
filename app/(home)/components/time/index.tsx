"use client";

export function Time({ time }: { time: string }) {
  const d = new Date(time);

  return <time dateTime={d.toISOString()}>{d.toLocaleString()}</time>;
}
