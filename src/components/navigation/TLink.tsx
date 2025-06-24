import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

interface TLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;

  exit?: gsap.core.Tween | gsap.core.Timeline;
}

export const TLink = ({ href, className, children, exit, ...props }: TLinkProps) => {
  const router = useRouter();

  const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!router || !href) return;

    e.preventDefault();

    if (exit) {
      await new Promise((resolve) => {
        exit.eventCallback('onComplete', resolve);
        exit.play();
      });
    }

    router.push(href as string);
  };

  return (
    <Link onClick={handleTransition} href={href} className={className} {...props}>
      {children}
    </Link>
  );
};
