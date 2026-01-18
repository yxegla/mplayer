'use client';

import { useState, useEffect, useRef } from 'react';

export function useColorThief(imageUrl: string | null): string | null {
  const [dominantColor, setDominantColor] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!imageUrl) {
      setDominantColor(null);
      return;
    }

    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const size = 50;
      canvas.width = size;
      canvas.height = size;
      
      ctx.drawImage(img, 0, 0, size, size);
      
      try {
        const imageData = ctx.getImageData(0, 0, size, size);
        const data = imageData.data;
        
        let r = 0, g = 0, b = 0, count = 0;
        
        for (let i = 0; i < data.length; i += 16) {
          const pr = data[i];
          const pg = data[i + 1];
          const pb = data[i + 2];
          const pa = data[i + 3];
          
          if (pa < 128) continue;
          
          const brightness = (pr + pg + pb) / 3;
          if (brightness < 20 || brightness > 235) continue;
          
          r += pr;
          g += pg;
          b += pb;
          count++;
        }
        
        if (count > 0) {
          r = Math.round(r / count);
          g = Math.round(g / count);
          b = Math.round(b / count);
          setDominantColor(`${r}, ${g}, ${b}`);
        }
      } catch {
        setDominantColor(null);
      }
    };

    img.onerror = () => {
      setDominantColor(null);
    };

    img.src = imageUrl;
  }, [imageUrl]);

  return dominantColor;
}
