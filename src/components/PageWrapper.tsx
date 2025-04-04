'use client';

import { ReactNode } from 'react';
import ParticleNetwork from './ParticleNetwork';

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="relative min-h-screen">
      <ParticleNetwork />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 