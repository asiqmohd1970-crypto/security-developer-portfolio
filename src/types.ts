import type { ReactNode } from 'react';

export type ScrollDirection = 'forward' | 'reverse' | 'idle';

export interface ScrollSequenceState {
  currentFrame: number;
  targetFrame: number;
  progress: number;
  direction: ScrollDirection;
  isLoaded: boolean;
  loadedCount: number;
  totalFrames: number;
  fps: number;
}

export interface ScrollImageSequenceProps {
  frameCount?: number;
  getFrameUrl?: (index: number) => string;
  customFramesMap?: Map<number, string>;
  scrollLengthMultiplier?: number;
  objectFit?: 'cover' | 'contain';
  className?: string;
  onProgress?: (progress: number, currentFrame: number, direction: ScrollDirection) => void;
  children?: (state: ScrollSequenceState) => ReactNode;
}

export interface SequenceConfig {
  folderPath: string;
  filePrefix: string;
  fileExtension: string;
  digits: number;
  frameCount: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  category: string;
  year: string;
  tech: string[];
  description: string;
  stats: { label: string; value: string }[];
  accentColor: string;
}
