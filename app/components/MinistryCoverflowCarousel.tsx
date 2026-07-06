'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper';
import type { SwiperOptions } from 'swiper/types';
import {
  EffectCoverflow,
  Autoplay,
  Navigation,
  Pagination,
  Keyboard,
} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import type { MinistryCarouselImage } from '../lib/ministryImages';

interface MinistryCoverflowCarouselProps {
  images: MinistryCarouselImage[];
  className?: string;
}

const COVERFLOW_BASE = {
  rotate: 0,
  stretch: 0,
  depth: 100,
  modifier: 2.5,
  slideShadows: false,
} as const;

export default function MinistryCoverflowCarousel({
  images,
  className = '',
}: MinistryCoverflowCarouselProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const canAdvance = images.length > 1;

  if (images.length === 0) return null;

  const coverflowBreakpoints = {
    0: {
      coverflowEffect: { ...COVERFLOW_BASE, modifier: 1.5 },
      spaceBetween: 12,
    },
    640: {
      coverflowEffect: { ...COVERFLOW_BASE, modifier: 2 },
      spaceBetween: 18,
    },
    1024: {
      coverflowEffect: COVERFLOW_BASE,
      spaceBetween: 28,
    },
  } as SwiperOptions['breakpoints'];

  return (
    <div
      className={`ministry-coverflow relative w-full h-full flex flex-col ${className}`}
      aria-roledescription="carousel"
      aria-label="Ministry photo gallery"
    >
      <div className="ministry-coverflow__stage flex-1 min-h-0 relative">
        <Swiper
          modules={[EffectCoverflow, Autoplay, Navigation, Pagination, Keyboard]}
          effect="coverflow"
          grabCursor
          centeredSlides
          centerInsufficientSlides
          rewind={canAdvance}
          slidesPerView="auto"
          spaceBetween={24}
          slideToClickedSlide
          watchSlidesProgress
          observer
          observeParents
          observeSlideChildren
          speed={700}
          keyboard={{ enabled: true, onlyInViewport: true }}
          autoplay={
            canAdvance
              ? {
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                  waitForTransition: true,
                }
              : false
          }
          coverflowEffect={COVERFLOW_BASE}
          breakpoints={coverflowBreakpoints}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{
            el: paginationRef.current,
            clickable: true,
            dynamicBullets: false,
          }}
          onBeforeInit={(swiper) => {
            if (typeof swiper.params.navigation !== 'boolean') {
              swiper.params.navigation!.prevEl = prevRef.current;
              swiper.params.navigation!.nextEl = nextRef.current;
            }
            if (typeof swiper.params.pagination !== 'boolean') {
              swiper.params.pagination!.el = paginationRef.current;
            }
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setActiveIndex(swiper.realIndex);

            requestAnimationFrame(() => {
              if (typeof swiper.params.navigation !== 'boolean') {
                swiper.params.navigation!.prevEl = prevRef.current;
                swiper.params.navigation!.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }
              if (typeof swiper.params.pagination !== 'boolean') {
                swiper.params.pagination!.el = paginationRef.current;
                swiper.pagination.init();
                swiper.pagination.render();
                swiper.pagination.update();
              }
            });
          }}
          onResize={(swiper) => {
            swiper.update();
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="ministry-coverflow__swiper h-full w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={`${image.src}-${index}`} className="ministry-coverflow__slide">
              <div className="ministry-coverflow__slide-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="ministry-coverflow__image"
                  loading="eager"
                  draggable={false}
                />
                <div className="ministry-coverflow__caption">
                  <span>{image.alt}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {canAdvance && (
          <>
            <button
              ref={prevRef}
              type="button"
              aria-label="Previous photo"
              className="ministry-coverflow__nav ministry-coverflow__nav--prev"
            >
              <ChevronLeft size={20} strokeWidth={1.75} />
            </button>
            <button
              ref={nextRef}
              type="button"
              aria-label="Next photo"
              className="ministry-coverflow__nav ministry-coverflow__nav--next"
            >
              <ChevronRight size={20} strokeWidth={1.75} />
            </button>
          </>
        )}
      </div>

      {canAdvance && (
        <div ref={paginationRef} className="ministry-coverflow__pagination" />
      )}
    </div>
  );
}
