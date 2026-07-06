'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import { DEFAULT_DEVOTIONAL_FOCUS_IMAGE } from '../lib/constants';
import { resolveMediaUrl } from '../lib/mediaUrl';

type DevotionalImageProps = Omit<ImageProps, 'src' | 'onError'> & {
  src?: string | null;
  fallback?: string;
};

export default function DevotionalImage({
  src,
  alt,
  fallback = DEFAULT_DEVOTIONAL_FOCUS_IMAGE,
  ...props
}: DevotionalImageProps) {
  const initial = resolveMediaUrl(src?.trim() || '') || fallback;
  const [imgSrc, setImgSrc] = useState(initial);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        if (imgSrc !== fallback) {
          setImgSrc(fallback);
        }
      }}
    />
  );
}
