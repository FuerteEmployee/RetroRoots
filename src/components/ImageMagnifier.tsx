import React, { useState, MouseEvent, useRef } from 'react';

interface ImageMagnifierProps {
  src: string;
  zoomSrc?: string;
  alt?: string;
  zoomLevel?: number;
}

const ImageMagnifier: React.FC<ImageMagnifierProps> = ({
  src,
  zoomSrc,
  alt = "",
  zoomLevel = 2.5
}) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseEnter = () => {
    if (window.innerWidth < 1024) return;
    setShowMagnifier(true);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const elem = imgRef.current;
    if (!elem) return;
    
    const { top, left, width, height } = elem.getBoundingClientRect();
    
    let xPos = e.clientX - left;
    let yPos = e.clientY - top;

    // Convert to percentage
    const xPercent = Math.max(0, Math.min(100, (xPos / width) * 100));
    const yPercent = Math.max(0, Math.min(100, (yPos / height) * 100));

    setXY([xPercent, yPercent]);
  };

  const activeSrc = zoomSrc || src;

  // Size of the lens in percentage
  const lensSize = 100 / zoomLevel;

  // Clamped top-left coordinates of the lens so it doesn't overflow the image bounds
  const lensLeft = Math.max(0, Math.min(100 - lensSize, x - lensSize / 2));
  const lensTop = Math.max(0, Math.min(100 - lensSize, y - lensSize / 2));

  // Map the lens position perfectly to the background-position percentages
  const bgPosX = (lensLeft / (100 - lensSize)) * 100;
  const bgPosY = (lensTop / (100 - lensSize)) * 100;

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center cursor-crosshair"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
      />

      {/* Lens indicator over the image */}
      {showMagnifier && (
        <div 
          className="absolute pointer-events-none bg-blue-500/10 border border-blue-500/30 shadow-[0_0_0_9999px_rgba(255,255,255,0.4)]"
          style={{
            width: `${lensSize}%`,
            height: `${lensSize}%`,
            top: `${lensTop}%`,
            left: `${lensLeft}%`,
          }}
        />
      )}

      {/* The large zoomed container to the right */}
      {showMagnifier && (
        <div
          className="absolute z-[100] bg-white border border-border shadow-2xl pointer-events-none overflow-hidden"
          style={{
            top: 0,
            left: 'calc(100% + 24px)', // 24px gap between image and zoom box
            // We scale up the output box proportionally so the aspect ratio matches the main image exactly
            width: '150%', 
            height: '150%',
            backgroundImage: `url('${activeSrc}')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${zoomLevel * 100}% ${zoomLevel * 100}%`,
            // Use the perfectly mapped lens coordinates
            backgroundPositionX: `${bgPosX}%`,
            backgroundPositionY: `${bgPosY}%`,
            borderRadius: '0.5rem',
          }}
        />
      )}
    </div>
  );
};

export default ImageMagnifier;
