import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, ArrowRight } from 'lucide-react';
import { HeroSlide } from '../../types';

interface HeroSliderProps {
  slides: HeroSlide[];
  onNavigate: (path: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ slides, onNavigate }) => {
  const publishedSlides = slides.filter(s => s.status === 'published').sort((a, b) => a.order - b.order);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Check reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  useEffect(() => {
    if (prefersReducedMotion || isPaused || publishedSlides.length <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % publishedSlides.length);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, publishedSlides.length, prefersReducedMotion]);

  if (publishedSlides.length === 0) {
    return null;
  }

  const currentSlide = publishedSlides[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + publishedSlides.length) % publishedSlides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % publishedSlides.length);
  };

  return (
    <div className="relative w-full overflow-hidden bg-neutral-900 aspect-[16/9] sm:aspect-[21/9] min-h-[380px] sm:min-h-[460px] max-h-[580px]">
      {/* Background Slides */}
      {publishedSlides.map((slide, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with Dark Contrast Overlay */}
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />
            {/* Multi-layered gradient overlay to guarantee text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/70 to-neutral-950/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />

            {/* Slide Content */}
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
                <div className="max-w-2xl text-left space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-red-600/90 text-white uppercase backdrop-blur-xs">
                    Nepal Small &amp; Domestic Industry Sourcing
                  </span>
                  
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight sm:leading-none">
                    {slide.title}
                  </h1>

                  <p className="text-sm sm:text-base lg:text-lg text-neutral-200 leading-relaxed font-normal">
                    {slide.description}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onNavigate(slide.buttonLink || '/machines')}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold text-sm sm:text-base px-6 py-3 rounded-lg shadow-lg hover:shadow-red-600/30 transition-all cursor-pointer flex items-center gap-2 group"
                    >
                      <span>{slide.buttonText || 'Explore Machines'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => onNavigate('/contact')}
                      className="bg-white/10 hover:bg-white/20 text-white font-medium text-sm sm:text-base px-5 py-3 rounded-lg border border-white/20 backdrop-blur-xs transition-colors cursor-pointer"
                    >
                      Request Quotation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs focus:outline-hidden focus:ring-2 focus:ring-red-500"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs focus:outline-hidden focus:ring-2 focus:ring-red-500"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Bar: Indicators & Pause/Play */}
      <div className="absolute bottom-4 left-0 right-0 z-30 flex items-center justify-center gap-3">
        {publishedSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`transition-all rounded-full cursor-pointer ${
              i === currentIndex
                ? 'w-8 h-2.5 bg-red-600'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}

        {/* Pause / Play Control */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="ml-2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white border border-white/20 cursor-pointer backdrop-blur-xs"
          title={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
          aria-label={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
        >
          {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
