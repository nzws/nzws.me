'use client';

import { useEffect, useState } from 'react';

export function Time({ time }: { time: string }) {
  const [localeString, setLocaleString] = useState('');

  useEffect(() => {
    const d = new Date(time);
    setLocaleString(d.toLocaleString());
  }, [time]);

  return <time dateTime={time}>{localeString}</time>;
}
