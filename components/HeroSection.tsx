"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const heroSlides = [
  {
    id: 1,
    title: "New Collection 2024",
    subtitle: "Discover the latest trends in beauty",
    image: "https://images.unsplash.com/photo-1596462502278-af242a95ab2b?w=1200&h=600&fit=crop",
    cta: "Shop Now",
  },
  {
    id: 2,
    title: "Summer Sale",
    subtitle: "Get up to 50% off on premium brands",
    image: "https://images.unsplash.com/photo-1522338242992-e1a54900f60e?w=1200&h=600&fit=crop",
    cta: "Explore",
  },
  {
    id: 3,
    title: "Exclusive Brands",
    subtitle: "Premium beauty products at your fingertips",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&h=600&fit=crop",
    cta: "Browse",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % heroSlides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="relative w-full h-[320px] sm:h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden">
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl">{slide.subtitle}</p>
            <button className="bg-[#C9A24D] text-black px-8 py-3 rounded-full font-semibold hover:bg-[#B8922A] transition">
              {slide.cta}
            </button>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full z-10 transition"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full z-10 transition"
      >
        <ChevronRight size={32} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === current ? "bg-[#C9A24D]" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
