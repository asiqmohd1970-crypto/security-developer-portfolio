import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ScrollSequenceState, ScrollDirection } from '../types';

interface ScrollImageSequenceProps {
  frameCount?: number;
  getFrameUrl?: (index: number) => string;
  onProgress?: (progress: number, currentFrame: number, direction: ScrollDirection) => void;
  onStateChange?: (state: ScrollSequenceState) => void;
}

export const ScrollImageSequence: React.FC<ScrollImageSequenceProps> = ({
  frameCount: initialFrameCount = 240,
  getFrameUrl = (index: number) => `/frames/${String(index).padStart(4, '0')}.jpg`,
  onProgress,
  onStateChange,
}) => {
  const [frameCount, setFrameCount] = useState<number>(initialFrameCount);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cached decoded frame images
  const imagesCache = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadingSet = useRef<Set<number>>(new Set());

  // Animation and target tracking
  const rafId = useRef<number | null>(null);
  const targetFrameRef = useRef<number>(1);
  const displayedFrameRef = useRef<number>(1);
  const lastDrawnFrameIndexRef = useRef<number>(-1);
  const lastCanvasWRef = useRef<number>(0);
  const lastCanvasHRef = useRef<number>(0);
  const lastNotifiedFrameRef = useRef<number>(-1);
  const lastScrollTopRef = useRef<number>(0);
  const lastDirectionRef = useRef<ScrollDirection>('idle');
  const idleTimeoutRef = useRef<number | null>(null);

  // Loading progress
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isInitialReady, setIsInitialReady] = useState<boolean>(false);

  // Query /api/frames-status on mount to automatically adapt frame count
  useEffect(() => {
    fetch('/api/frames-status')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === 'number' && data.count > 0) {
          const count = Math.min(data.count, 240);
          setFrameCount(count);
        }
      })
      .catch(() => {
        // Fall back to default frame count
      });
  }, []);

  // Preload a single frame with asynchronous GPU decoding and dual-format fallback
  const preloadFrame = useCallback(
    (index: number) => {
      if (index < 1 || index > frameCount) return;
      if (imagesCache.current.has(index) || loadingSet.current.has(index)) {
        return;
      }

      loadingSet.current.add(index);
      const img = new Image();
      img.crossOrigin = 'anonymous';

      const primaryUrl = getFrameUrl(index);
      const fallbackUrl = `/frames/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;

      const storeDecodedImage = () => {
        loadingSet.current.delete(index);
        imagesCache.current.set(index, img);
        const count = imagesCache.current.size;
        setLoadedCount(count);

        if (index === 1 || count >= 15) {
          setIsInitialReady(true);
        }

        // If this newly loaded image is close to currently viewed frame, re-render
        if (Math.abs(Math.round(displayedFrameRef.current) - index) <= 2) {
          renderFrameRef.current();
        }
      };

      const handleSuccess = () => {
        if ('decode' in img && typeof img.decode === 'function') {
          img
            .decode()
            .then(storeDecodedImage)
            .catch(() => {
              // Store anyway if decode throws (e.g. format quirk)
              storeDecodedImage();
            });
        } else {
          storeDecodedImage();
        }
      };

      img.onload = handleSuccess;
      img.onerror = () => {
        if (img.src !== fallbackUrl && !img.src.endsWith(fallbackUrl)) {
          const fallbackImg = new Image();
          fallbackImg.crossOrigin = 'anonymous';
          fallbackImg.onload = () => {
            loadingSet.current.delete(index);
            imagesCache.current.set(index, fallbackImg);
            setLoadedCount(imagesCache.current.size);
            if (index === 1 || imagesCache.current.size >= 15) {
              setIsInitialReady(true);
            }
            if (Math.abs(Math.round(displayedFrameRef.current) - index) <= 2) {
              renderFrameRef.current();
            }
          };
          fallbackImg.onerror = () => {
            loadingSet.current.delete(index);
          };
          fallbackImg.src = fallbackUrl;
          return;
        }
        loadingSet.current.delete(index);
      };

      img.src = primaryUrl;
    },
    [frameCount, getFrameUrl]
  );

  // High-performance tiered preload: Milestone frames first, then burst fill remaining
  useEffect(() => {
    // 1. Initial burst: frames 1..20
    for (let i = 1; i <= Math.min(20, frameCount); i++) {
      preloadFrame(i);
    }

    // 2. Critical milestone anchors distributed across the entire scroll range
    const milestones = [
      10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
      110, 120, 130, 140, 150, 160, 170, 180, 190, 200,
      210, 220, 230, 240,
    ];
    milestones.forEach((m) => {
      if (m <= frameCount) preloadFrame(m);
    });

    // 3. Immediately stream all remaining frames in rapid parallel chunks
    let cur = 1;
    const interval = window.setInterval(() => {
      if (cur > frameCount) {
        clearInterval(interval);
        return;
      }
      for (let i = 0; i < 16 && cur <= frameCount; i++) {
        preloadFrame(cur);
        cur++;
      }
    }, 25);

    return () => {
      clearInterval(interval);
    };
  }, [frameCount, preloadFrame]);

  // Find nearest cached image with full range search (guaranteed never jumps to frame 1)
  const getNearestLoadedImage = useCallback(
    (desiredFrame: number): { img: HTMLImageElement; frameIndex: number } | null => {
      const rounded = Math.min(frameCount, Math.max(1, Math.round(desiredFrame)));
      if (imagesCache.current.has(rounded)) {
        return { img: imagesCache.current.get(rounded)!, frameIndex: rounded };
      }

      // Outward search for closest available frame
      for (let offset = 1; offset <= frameCount; offset++) {
        const lower = rounded - offset;
        if (lower >= 1 && imagesCache.current.has(lower)) {
          return { img: imagesCache.current.get(lower)!, frameIndex: lower };
        }
        const higher = rounded + offset;
        if (higher <= frameCount && imagesCache.current.has(higher)) {
          return { img: imagesCache.current.get(higher)!, frameIndex: higher };
        }
      }

      if (imagesCache.current.size > 0) {
        const firstEntry = imagesCache.current.entries().next().value;
        if (firstEntry) {
          return { img: firstEntry[1], frameIndex: firstEntry[0] };
        }
      }

      return null;
    },
    [frameCount]
  );

  // Canvas render using object-fit: cover with zero-flicker double-buffering logic
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    if (width === 0 || height === 0) return;

    const currentF = displayedFrameRef.current;
    const nearest = getNearestLoadedImage(currentF);

    if (nearest && nearest.img && nearest.img.complete && nearest.img.naturalWidth > 0) {
      // If the exact same frame is already rendered and dimensions haven't changed, skip
      if (
        lastDrawnFrameIndexRef.current === nearest.frameIndex &&
        lastCanvasWRef.current === width &&
        lastCanvasHRef.current === height
      ) {
        return;
      }

      const img = nearest.img;
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;
      const imgAspect = imgW / imgH;
      const canvasAspect = width / height;

      let drawW = width;
      let drawH = height;
      let offsetX = 0;
      let offsetY = 0;

      // Mathematical object-fit: cover (image completely covers canvas without gaps)
      if (canvasAspect > imgAspect) {
        drawW = width;
        drawH = width / imgAspect;
        offsetX = 0;
        offsetY = (height - drawH) * 0.5;
      } else {
        drawH = height;
        drawW = height * imgAspect;
        offsetY = 0;
        offsetX = (width - drawW) * 0.5;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';

      // Directly draw image over canvas (covers 100% of pixels - NO fillRect needed!)
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

      lastDrawnFrameIndexRef.current = nearest.frameIndex;
      lastCanvasWRef.current = width;
      lastCanvasHRef.current = height;
    } else if (lastDrawnFrameIndexRef.current === -1) {
      // Only fill background on initial startup before any image is drawn
      ctx.fillStyle = '#08090d';
      ctx.fillRect(0, 0, width, height);
    }
  }, [getNearestLoadedImage]);

  const renderFrameRef = useRef(renderFrame);
  renderFrameRef.current = renderFrame;

  // Responsive canvas resizing capped at 1920x1080 for peak GPU performance
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const rect = canvas.getBoundingClientRect();
    const clientW = Math.round(rect.width || window.innerWidth || document.documentElement.clientWidth);
    const clientH = Math.round(rect.height || window.innerHeight || document.documentElement.clientHeight);

    // Never exceed native 1920x1080 source image resolution
    const newW = Math.min(1920, Math.floor(clientW * dpr));
    const newH = Math.min(1080, Math.floor(clientH * dpr));

    if (canvas.width !== newW || canvas.height !== newH) {
      canvas.width = newW;
      canvas.height = newH;
      lastCanvasWRef.current = 0;
      lastCanvasHRef.current = 0;
      renderFrameRef.current();
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    const container = containerRef.current;

    if (window.ResizeObserver && container) {
      const ro = new ResizeObserver(() => {
        resizeCanvas();
      });
      ro.observe(container);
      return () => ro.disconnect();
    }

    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  // Scroll listener: maps scroll progress smoothly from 1 to frameCount
  useEffect(() => {
    const handleScroll = () => {
      const scrollingEl = document.scrollingElement || document.documentElement;
      const scrollableDistance = Math.max(1, scrollingEl.scrollHeight - window.innerHeight);
      const currentScrollY = window.scrollY ?? window.pageYOffset ?? scrollingEl.scrollTop ?? 0;
      const rawProgress = currentScrollY / scrollableDistance;
      const progress = Math.min(Math.max(rawProgress, 0), 1);

      // Continuous floating-point target frame for smooth interpolation
      const targetFrame = 1 + progress * (frameCount - 1);

      // Direction tracking
      let newDirection: ScrollDirection = lastDirectionRef.current;
      if (currentScrollY > lastScrollTopRef.current) {
        newDirection = 'forward';
      } else if (currentScrollY < lastScrollTopRef.current) {
        newDirection = 'reverse';
      }
      lastScrollTopRef.current = currentScrollY;
      lastDirectionRef.current = newDirection;

      targetFrameRef.current = targetFrame;

      if (idleTimeoutRef.current) {
        window.clearTimeout(idleTimeoutRef.current);
      }
      idleTimeoutRef.current = window.setTimeout(() => {
        lastDirectionRef.current = 'idle';
      }, 200);

      // Active look-ahead preload around target frame
      const roundedTarget = Math.round(targetFrame);
      if (newDirection === 'forward') {
        for (let i = 1; i <= 6; i++) preloadFrame(roundedTarget + i);
      } else if (newDirection === 'reverse') {
        for (let i = 1; i <= 6; i++) preloadFrame(roundedTarget - i);
      }

      if (onProgress) {
        onProgress(progress, roundedTarget, newDirection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      if (idleTimeoutRef.current) {
        window.clearTimeout(idleTimeoutRef.current);
      }
    };
  }, [frameCount, onProgress, preloadFrame]);

  // 60/120 FPS requestAnimationFrame loop with responsive damping
  useEffect(() => {
    let active = true;

    const animate = () => {
      if (!active) return;

      const target = targetFrameRef.current;
      const current = displayedFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) < 0.005) {
        displayedFrameRef.current = target;
      } else if (Math.abs(diff) > 12) {
        // Fast catch-up on rapid scrolls
        displayedFrameRef.current = current + diff * 0.8;
      } else {
        // Crisp, natural follow with zero sluggishness
        displayedFrameRef.current = current + diff * 0.55;
      }

      // Draw canvas
      renderFrameRef.current();

      const roundedDisplay = Math.min(frameCount, Math.max(1, Math.round(displayedFrameRef.current)));

      // Dispatch lightweight window event for isolated UI components (like Navbar)
      if (roundedDisplay !== lastNotifiedFrameRef.current) {
        lastNotifiedFrameRef.current = roundedDisplay;
        window.dispatchEvent(
          new CustomEvent('scroll-frame-change', {
            detail: {
              currentFrame: roundedDisplay,
              totalFrames: frameCount,
            },
          })
        );

        if (onStateChange) {
          const progress = (roundedDisplay - 1) / Math.max(1, frameCount - 1);
          onStateChange({
            currentFrame: roundedDisplay,
            targetFrame: Math.round(target),
            progress,
            direction: lastDirectionRef.current,
            isLoaded: imagesCache.current.size > 0,
            loadedCount: imagesCache.current.size,
            totalFrames: frameCount,
            fps: 60,
          });
        }
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      active = false;
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [frameCount, onStateChange]);

  return (
    <>
      {/* Fullscreen Sticky Background Canvas Layer */}
      <div
        ref={containerRef}
        id="scroll-image-sequence-fixed"
        className="hero-frame-container fixed inset-0 w-full h-[100dvh] z-0 pointer-events-none overflow-hidden bg-[#08090d]"
        aria-hidden="true"
      >
        <canvas
          ref={canvasRef}
          id="scroll-sequence-canvas"
          className="hero-frame absolute inset-0 w-full h-[100dvh] block"
        />

        {/* Minimal subtle vignette overlay */}
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#08090d]/60 pointer-events-none" />
      </div>

      {/* Minimal Initial Ready Screen */}
      {!isInitialReady && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08090d] text-white p-6">
          <div className="max-w-xs w-full text-center">
            <div className="inline-block w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-mono font-bold text-sm mb-4 leading-8">
              MA
            </div>
            <p className="text-sm font-medium tracking-wide text-slate-200 mb-1 font-display">
              Loading experience...
            </p>
            <p className="text-xs font-mono text-cyan-400 mb-4">
              {Math.min(loadedCount, frameCount)} / {frameCount}
            </p>
            <div className="w-full h-1 bg-white/[0.08] rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-400 transition-all duration-150 ease-out"
                style={{ width: `${Math.min(100, (loadedCount / Math.min(25, frameCount)) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
