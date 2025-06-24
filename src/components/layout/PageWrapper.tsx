'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) {
      gsap.fromTo('#page-wrapper', { opacity: 0 }, { opacity: 1, duration: 1.5 });
    } else {
      hasMounted.current = true;
    }
  }, [pathname]);

  return <div id="page-wrapper">{children}</div>;
}
