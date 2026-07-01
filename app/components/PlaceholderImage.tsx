'use client';

import { useState } from 'react';

interface PlaceholderImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
}

export default function PlaceholderImage({
  src,
  alt,
  className = '',
  fill,
  width,
  height,
}: PlaceholderImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-navy via-navy-light to-purple ${className}`}
        style={fill ? { position: 'absolute', inset: 0 } : { width, height }}
      >
        <div className="text-center p-4">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full border-2 border-gold/40 flex items-center justify-center">
            <span className="text-gold text-lg">✦</span>
          </div>
          <p className="text-gold-light/60 text-xs font-medium">{alt}</p>
        </div>
      </div>
    );
  }

  if (fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={`object-cover ${className}`}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={() => setHasError(true)}
    />
  );
}
