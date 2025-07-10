import React from 'react';

const slides = [
  {
    title: "First time in India",
    subtitle: "Banking Education with 100% Placement Assurance.",
    background: '/happy-caucasian-male-graduate-graduation-glow-with-diploma-looking-camera-campus.jpg'
  },

  {
    title: "Assured Jobs",
    subtitle: " ",
    background: '/8.-Thumbnail-Job-offer-letter.jpg'
  }
];

interface HeroProps { }

const Hero: React.FC<HeroProps> = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slideCount = slides.length;

  const handleSlideChange = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    } else {
      setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
    }
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      handleSlideChange('next');
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide, slideCount]);

  return (
    <section className="relative bg-black text-white min-h-[calc(100vh-4rem)] px-6 overflow-hidden flex items-start pt-16">
      <div className="absolute inset-0 bg-cover bg-center transform-gpu" style={{
        backgroundImage: `url(${slides[currentSlide].background})`
      }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
        <button
          onClick={() => handleSlideChange('prev')}
          className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
        <button
          onClick={() => handleSlideChange('next')}
          className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="max-w-6xl mx-auto z-10 relative flex flex-col items-center justify-center gap-12 md:gap-24 pt-32 pb-24">
        <div className="md:w-1/2">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            {slides[currentSlide].title}
          </h1>
          <h2 className="text-4xl md:text-4xl font-bold mb-8">
            {slides[currentSlide].subtitle}
          </h2>
        </div>

      </div>
    </section>
  );
};

export default Hero;
