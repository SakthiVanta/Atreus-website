"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselProps = {
    slides: {
        id: string;
        image: string;
        title: string;
        subtitle: string;
        cta: string;
    }[];
};

export function HeroCarousel({ slides }: CarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000 }),
    ]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="relative group">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {slides.map((slide) => (
                        <div
                            key={slide.id}
                            className="relative flex-[0_0_100%] min-w-0 h-[600px] md:h-[700px]"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            >
                                <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
                            </div>

                            {/* Content */}
                            <div className="relative h-full container mx-auto px-4 md:px-8 flex flex-col justify-center items-start text-white max-w-7xl">
                                <h1 className="text-5xl md:text-7xl font-bold mb-6 max-w-3xl leading-tight animate-fade-in-up">
                                    {slide.title}
                                </h1>
                                <p className="text-xl md:text-2xl mb-8 max-w-2xl text-slate-100">
                                    {slide.subtitle}
                                </p>
                                <Button
                                    className="bg-white text-slate-900 hover:bg-slate-100 text-lg px-8 py-6 rounded-full transition-transform hover:scale-105"
                                >
                                    {slide.cta}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={scrollPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-8 h-8" />
            </button>
            <button
                onClick={scrollNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
                aria-label="Next slide"
            >
                <ChevronRight className="w-8 h-8" />
            </button>
        </div>
    );
}
