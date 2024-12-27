import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  image: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    image: "https://images.unsplash.com/photo-1590424946952-7e9f43d68a8b?ixlib=rb-4.0.3",
    title: "Violencia Física",
    description: "Incluye golpes, empujones y cualquier forma de agresión que dañe tu cuerpo. Es importante identificarla y buscar ayuda inmediata."
  },
  {
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3",
    title: "Violencia Psicológica",
    description: "Manipulación, humillación, control y aislamiento son formas de violencia que afectan tu salud mental y autoestima."
  },
  // ... otros slides
];

export function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg my-8">
      <div className="relative h-[400px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex flex-col md:flex-row h-full bg-white rounded-lg overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full md:w-1/2 h-48 md:h-full object-cover"
              />
              <div className="p-6 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">{slide.title}</h3>
                <p className="text-gray-600">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-[var(--primary)]' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}