'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { resolveMediaUrl } from '../lib/mediaUrl';

export interface FlyerData {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl: string | null;
  description?: string | null;
  ctaLabel?: string | null;
}

const SESSION_KEY_PREFIX = 'gpm-flyer-dismissed-';

interface FlyerModalProps {
  flyer: FlyerData | null;
  /** Server-side: active flyer exists and today is a flyer day. */
  show: boolean;
}

export default function FlyerModal({ flyer, show }: FlyerModalProps) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!show || !flyer) {
      setOpen(false);
      return;
    }
    try {
      const dismissed = sessionStorage.getItem(`${SESSION_KEY_PREFIX}${flyer.id}`);
      setOpen(!dismissed);
    } catch {
      setOpen(true);
    }
  }, [show, flyer]);

  const close = useCallback(() => {
    if (flyer) {
      try {
        sessionStorage.setItem(`${SESSION_KEY_PREFIX}${flyer.id}`, '1');
      } catch {
        /* ignore storage errors */
      }
    }
    setOpen(false);
  }, [flyer]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, close]);

  if (!mounted || !flyer) return null;

  const hasTitle = Boolean(flyer.title?.trim());
  const hasDescription = Boolean(flyer.description?.trim());
  const hasCta = Boolean(flyer.linkUrl?.trim());
  const hasFooter = hasTitle || hasDescription || hasCta;
  const ctaText = flyer.ctaLabel?.trim() || 'Learn More';

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="flyer-modal-root"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Overlay */}
          <motion.button
            type="button"
            aria-label="Close flyer"
            className="absolute inset-0 bg-black/65 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={hasTitle ? 'flyer-modal-title' : undefined}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl max-h-[min(92vh,820px)] flex flex-col rounded-2xl sm:rounded-3xl bg-white shadow-[0_32px_80px_rgba(0,0,0,0.45)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
              aria-label="Close"
            >
              <X size={18} strokeWidth={2} />
            </button>

            <div className="relative flex-shrink-0 bg-navy/5 min-h-[200px] max-h-[min(58vh,520px)] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolveMediaUrl(flyer.imageUrl)}
                alt={flyer.title || 'Ministry flyer'}
                className="w-full h-full max-h-[min(58vh,520px)] object-contain object-center"
                draggable={false}
              />
            </div>

            {hasFooter && (
              <div className="flex-shrink-0 px-5 sm:px-7 py-5 sm:py-6 border-t border-cream-dark bg-cream/30 overflow-y-auto">
                {hasTitle && (
                  <h2
                    id="flyer-modal-title"
                    className="text-xl sm:text-2xl font-bold text-navy mb-2 leading-snug"
                  >
                    {flyer.title}
                  </h2>
                )}
                {hasDescription && (
                  <p className="text-navy/70 text-sm sm:text-base leading-relaxed mb-4">
                    {flyer.description}
                  </p>
                )}
                {hasCta && (
                  <a
                    href={flyer.linkUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl btn-primary text-sm font-semibold"
                  >
                    {ctaText}
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
