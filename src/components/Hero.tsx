import React from 'react';

const slides = [
  {
    title: "First time in India",
    subtitle: "Banking Education with 100% Placement Assurance.",
    background: '/happy-caucasian-male-graduate-graduation-glow-with-diploma-looking-camera-campus.jpg'
  },
  {
    title: "Assured Jobs",
    subtitle: "We ensure every student has a clear career path with guaranteed job assistance.",
    background: '/8.-Thumbnail-Job-offer-letter.jpg'
  },
  {
    title: "Guest lectures by industry experts",
    subtitle: "We provide guest lectures by experienced and skilled industry leaders to boost networking of students.",
    background: 'https://www.jnujaipur.ac.in/Uploads/image/748imguf_GuestLectureonFinancialSectorScenarioandOpportunities1.webp'
  },
  {
    title: "Government certified training centre",
    subtitle: "We are registered under a government scheme of micro, small, and medium enterprises.",
    background: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEitf2Zs1qopHG9x15y_xujExv_SXPJwKDoas_Fu8yUNC2QUd4bal1N0gQkV1Yg_NY4jwJ9F63-xaVXFAxpJbEP1o_8SdMEEaM_Q7ZYOM-noYwKXi3mgfUqTdPDQydzxfHRUh-6iFlTcVzkm/s1600/Government-Jobs-In-India-for-2013.jpg'
  },
  {
    title: "Training by ex-bankers or certified trainers",
    subtitle: "Skilled and qualified ex-bankers help students understand real industry requirements.",
    background: '/Befkewnfk.jpg'
  }
];

interface HeroProps { }

const Hero: React.FC<HeroProps> = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slideCount = slides.length;

  const handleSlideChange = (direction: 'next' | 'prev') => {
    setCurrentSlide((prev) => {
      if (direction === 'next') return (prev + 1) % slideCount;
      return (prev - 1 + slideCount) % slideCount;
    });
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      handleSlideChange('next');
    }, 5000);
    return () => clearInterval(timer);
  }, [slideCount]);

  return (
    <section className="relative bg-black text-white h-screen overflow-hidden flex items-center -mt-2 bg-gradient-to-b from-black to-gray-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-2000 ease-in-out"
        style={{
          backgroundImage: `url(${slides[currentSlide].background})`,
          transform: 'translateY(1px)'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>


      {/* Navigation Buttons */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
        <button
          onClick={() => handleSlideChange('prev')}
          className="w-12 h-12 bg-white/10 border-2 border-white flex items-center justify-center"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
        <button
          onClick={() => handleSlideChange('next')}
          className="w-12 h-12 bg-white/10 border-2 border-white flex items-center justify-center"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Slide Content */}
      <div className="max-w-6xl mx-auto z-10 relative flex flex-col items-center text-center gap-8 md:gap-12 p-8 md:p-12">
        <h1 className="text-4xl md:text-7xl font-bold text-white">{slides[currentSlide].title}</h1>
        <h2 className="text-xl md:text-3xl font-medium max-w-2xl text-white/90">{slides[currentSlide].subtitle}</h2>
      </div>
    </section>
  );
};

export default Hero;
