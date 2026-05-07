"use client";
import { ReactLenis, useLenis } from 'lenis/react'

function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const lenis = useLenis()
  return (
    <ReactLenis root options={{ duration: 1 }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;