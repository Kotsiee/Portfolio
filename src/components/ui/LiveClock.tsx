'use client';

import { useEffect, useState } from 'react';

export default function LiveClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTime(now);
    };

    updateTime(); // set immediately on client
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (time === null) return null; // SSR fallback to avoid mismatch

  return <span>{time} GMT</span>;
}
