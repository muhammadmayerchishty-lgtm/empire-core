'use client';
import React, { useEffect, useRef, useState } from 'react';

interface EmpireCanvasProps {
  totalFrames?: number;
  framePrefix?: string;
  frameExt?: string;
  folderPath?: string;
}

export default function EmpireCanvas({
  totalFrames = 1440,
  framePrefix = 'frame_', // Agar frames ka naam 0001.jpg format me hai (prefix bina), toh isko "" kar dena
  frameExt = 'jpg',
  folderPath = '/frames',
}: EmpireCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  useEffect(() => {
    let isCancelled = false;
    const imgArray: HTMLImageElement[] = new Array(totalFrames);
    imagesRef.current = imgArray;

    let loaded = 0;
    const batchSize = 60;

    const loadBatch = async (startIdx: number) => {
      for (let i = startIdx; i < Math.min(startIdx + batchSize, totalFrames); i++) {
        if (isCancelled) return;
        const img = new Image();
        const paddedIndex = String(i + 1).padStart(4, '0');
        img.src = `${folderPath}/${framePrefix}${paddedIndex}.${frameExt}`;
        img.onload = () => {
          if (isCancelled) return;
          loaded++;
          setLoadedCount(loaded);
          if (loaded === Math.min(batchSize, totalFrames)) {
            setIsReady(true);
            renderFrame(0);
          }
        };
        imgArray[i] = img;
      }
      if (startIdx + batchSize < totalFrames && !isCancelled) {
        setTimeout(() => loadBatch(startIdx + batchSize), 50);
      }
    };

    loadBatch(0);

    return () => {
      isCancelled = true;
    };
  }, [totalFrames, folderPath, framePrefix, frameExt]);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (img && img.complete) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;
      ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    }
  };

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = maxScroll > 0 ? scrollTop / maxScroll : 0;
      const targetFrame = Math.min(totalFrames - 1, Math.floor(scrollFraction * totalFrames));

      if (targetFrame !== currentFrameRef.current) {
        currentFrameRef.current = targetFrame;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => renderFrame(targetFrame));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [totalFrames]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        renderFrame(currentFrameRef.current);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full h-[700vh] bg-[#050505]">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas ref={canvasRef} className="block w-full h-full object-cover" />
        {!isReady && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center text-cyan-400 font-mono text-sm tracking-widest z-50">
            <span>EXTRACTING CORE EMPIRE MATRIX...</span>
            <span className="mt-2 text-white text-xs">
              {Math.round((loadedCount / totalFrames) * 100)}% ({loadedCount}/{totalFrames})
            </span>
          </div>
        )}
      </div>
    </div>
  );
}