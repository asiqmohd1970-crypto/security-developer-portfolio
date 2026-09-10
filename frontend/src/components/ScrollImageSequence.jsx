import React, { useEffect, useRef, useState, useCallback } from 'react';




export const ScrollImageSequence = ({
  frameCount = 300,
  getFrameUrl = (index) => `/frames/ezgif-frame-${String(index).padStart(3, '0')}.jpg`,
  onProgress,
  onStateChange,
}) => {
  const canvasRef = useRef(null);

  // Cached frame images
  const imagesCache = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadingSet = useRef<Set>(new Set());

  // Animation and target tracking
  const rafId = useRef<number | null>(null);
  const targetFrameRef = useRef(1);
  const displayedFrameRef = useRef(1);
  const lastScrollTopRef = useRef(0);
  const lastDirectionRef = useRef<ScrollDirection>('idle');
  const idleTimeoutRef = useRef<number | null>(null);

  // Loading progress
  const [loadedCount, setLoadedCount] = useState(0);
  const [isInitialReady, setIsInitialReady] = useState(false);

  // Preload a single frame
  const preloadFrame = useCallback(
    (index) => {
      if (index < 1 || index > frameCount) return;
      if (imagesCache.current.has(index) || loadingSet.current.has(index)) {
        return;
      }

      loadingSet.current.add(index);
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = getFrameUrl(index);

      img.onload = () => {
        loadingSet.current.delete(index);
        imagesCache.current.set(index, img);
        const count = imagesCache.current.size;
        setLoadedCount(count);

        if (index === 1 || count >= 12) {
          setIsInitialReady(true);
        }

        if (Math.round(displayedFrameRef.current) === index && canvasRef.current) {
          renderFrameRef.current();
        }
      };

      img.onerror = () => {
        loadingSet.current.delete(index);
      };
    },
    [frameCount, getFrameUrl]
  );

  // Progressive loading of all 300 frames: first buffer immediately, then chunked
  useEffect(() => {
    // 1. Immediately preload initial frames + key milestones
    for (let i = 1; i <= Math.min(25, frameCount); i++) {
      preloadFrame(i);
    }
    preloadFrame(Math.floor(frameCount * 0.25));
    preloadFrame(Math.floor(frameCount * 0.5));
    preloadFrame(Math.floor(frameCount * 0.75));
    preloadFrame(frameCount);

    // 2. Incrementally load all remaining frames in non-blocking batches
    let nextIndex = 26;
    const interval = window.setInterval(() => {
      if (nextIndex > frameCount) {
        clearInterval(interval);
        return;
      }
      for (let i = 0; i < 15 && nextIndex <= frameCount; i++) {
        preloadFrame(nextIndex);
        nextIndex++;
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [frameCount, preloadFrame]);

  // Find nearest cached frame to prevent flickering
  const getNearestLoadedImage = useCallback((desiredFrame): HTMLImageElement | null => {
    const rounded = Math.round(desiredFrame);
    if (imagesCache.current.has(rounded)) {
      return imagesCache.current.get(rounded)!;
    }

    // Search outwards
    for (let offset = 1; offset <= 35; offset++) {
      if (imagesCache.current.has(rounded - offset)) {
        return imagesCache.current.get(rounded - offset)!;
      }
      if (imagesCache.current.has(rounded + offset)) {
        return imagesCache.current.get(rounded + offset)!;
      }
    }

    if (imagesCache.current.size > 0) {
      return imagesCache.current.values().next().value || null;
    }

    return null;
  }, []);

  // Canvas render using object-fit: contain (exact aspect ratio, no stretching)
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const currentF = displayedFrameRef.current;
    const nearestImg = getNearestLoadedImage(currentF);

    // Dark sleek background behind the frame
    ctx.fillStyle = '#08090d';
    ctx.fillRect(0, 0, width, height);

    if (nearestImg && nearestImg.complete && nearestImg.naturalWidth > 0) {
      const imgW = nearestImg.naturalWidth;
      const imgH = nearestImg.naturalHeight;
      const imgAspect = imgW / imgH;
      const canvasAspect = width / height;

      let drawW = width;
      let drawH = height;
      let offsetX = 0;
      let offsetY = 0;

      // object-fit: contain
      if (canvasAspect > imgAspect) {
        drawH = height;
        drawW = height * imgAspect;
        offsetX = (width - drawW) / 2;
      } else {
        drawW = width;
        drawH = width / imgAspect;
        offsetY = (height - drawH) / 2;
      }

      ctx.drawImage(nearestImg, offsetX, offsetY, drawW, drawH);
    }
  }, [getNearestLoadedImage]);

  const renderFrameRef = useRef(renderFrame);
  renderFrameRef.current = renderFrame;

  // Responsive High-DPI canvas resizing
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const newW = Math.floor(window.innerWidth * dpr);
    const newH = Math.floor(window.innerHeight * dpr);

    if (canvas.width !== newW || canvas.height !== newH) {
      canvas.width = newW;
      canvas.height = newH;
      renderFrameRef.current();
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas]);

  // Scroll listener: maps scroll progress across page to frame index [0..299] -> frame [1..300]
  useEffect(() => {
    const handleScroll = () => {
      const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableDistance <= 0) return;

      const currentScrollY = window.scrollY;
      const rawProgress = currentScrollY / scrollableDistance;
      const progress = Math.min(Math.max(rawProgress, 0), 1);

      // Frame mapping: 0 -> frame 001, 1 -> frame 300
      // Frame index: Math.floor(scrollProgress * 299), clamped between 0 and 299
      const frameIndex = Math.min(299, Math.max(0, Math.floor(progress * (frameCount - 1))));
      const targetFrame = frameIndex + 1; // 1 to 300

      // Direction: down = forward (001 -> 300), up = reverse (300 -> 001)
      let newDirection = lastDirectionRef.current;
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
      }, 250);

      // Preload nearby frames based on scroll vector
      if (newDirection === 'forward') {
        for (let i = 1; i <= 8; i++) preloadFrame(targetFrame + i);
      } else if (newDirection === 'reverse') {
        for (let i = 1; i <= 8; i++) preloadFrame(targetFrame - i);
      }

      if (onProgress) {
        onProgress(progress, targetFrame, newDirection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (idleTimeoutRef.current) {
        window.clearTimeout(idleTimeoutRef.current);
      }
    };
  }, [frameCount, onProgress, preloadFrame]);

  // 60FPS RAF animation loop
  useEffect(() => {
    let active = true;

    const animate = () => {
      if (!active) return;

      const target = targetFrameRef.current;
      const current = displayedFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.02) {
        displayedFrameRef.current = current + diff * 0.35;
      } else {
        displayedFrameRef.current = target;
      }

      renderFrameRef.current();

      const roundedDisplay = Math.min(frameCount, Math.max(1, Math.round(displayedFrameRef.current)));
      const progress = (roundedDisplay - 1) / (frameCount - 1);

      if (onStateChange) {
        onStateChange({
          currentFrame: roundedDisplay,
          targetFrame: target,
          progress,
          direction: lastDirectionRef.current,
          isLoaded: imagesCache.current.size > 0,
          loadedCount: imagesCache.current.size,
          totalFrames: frameCount,
          fps: 60,
        });
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
      {/* Fixed Fullscreen Canvas Layer: Always Visible Behind Content */}
      <div
        id="scroll-image-sequence-fixed"
        className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden bg-[#08090d]"
        aria-hidden="true"
      >
        <canvas
          ref={canvasRef}
          id="scroll-sequence-canvas"
          className="absolute inset-0 w-full h-full block"
        />

        {/* Minimal subtle vignette overlay */}
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#08090d]/60 pointer-events-none" />
      </div>

      {/* Minimal Initial Loading Screen */}
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
              {loadedCount} / {frameCount}
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
