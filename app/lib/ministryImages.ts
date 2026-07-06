export interface MinistryCarouselImage {
  src: string;
  alt: string;
}

/** Default photos for the About page "Who We Are" coverflow carousel. */
export const MINISTRY_CAROUSEL_IMAGES: MinistryCarouselImage[] = [
  { src: '/images/ministry-2.jpg', alt: 'Glory Prayer Ministry team' },
  { src: '/images/ministry-1.jpeg', alt: 'Ministry worship gathering' },
  { src: '/images/lion.jpeg', alt: 'Lion of Judah — our foundation' },
  { src: '/images/ctg.png', alt: 'Community in fellowship' },
];
