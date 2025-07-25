import { useState, type JSX } from "react";
import {
  ChevronLeft,
  ChevronRight,


} from "lucide-react";

// TypeScript interfaces
interface Slide {
  title: string;
  subtitle: string;
  image: string;
  features: string[];
}

export default function Hero(): JSX.Element {

  const [currentSlide, setCurrentSlide] = useState<number>(0);


  const slides: Slide[] = [
    {
      title: 'First time in India',
      subtitle: 'Banking Education with 100% Placement Assurance.',
      image: './hero_bg.jpg',
      features: [
        '100% Placement Assurance',
        'Industry Expert Trainers',
        'Banking-Focused Curriculum',
        'Certification Programs',
      ],
    },
    {
      title: 'Lectures by Industry Leaders',
      subtitle: 'Weekend sessions by experienced bankers covering practical aspects and career growth.',
      image: './hero_bg.jpg',
      features: [
        '1-hour weekend sessions',
        'Corporate survival strategies',
        'Do’s and don’ts for clients & organization',
        'How to achieve targets & get promoted',
      ],
    },
    {
      title: 'Resume Building & GD Prep',
      subtitle: 'Job finding strategies, sample interviews, and group discussion preparation.',
      image: './hero_bg.jpg',
      features: [
        'Resume building workshops',
        'Sample interviews',
        'GD (Group Discussion) preparation',
        'Job search strategies',
      ],
    },
    {
      title: 'Training by ex-bankers',
      subtitle: 'Skilled and qualified ex-bankers help students understand real industry requirements.',
      image: './hero_bg.jpg',
      features: [
        'Ex-Banker Trainers',
        'Real-world Case Studies',
        'Industry Insights',
        'Practical Training',
      ],
    },
    {
      title: 'Case Studies Session',
      subtitle: 'Expand conceptual and contextual knowledge with weekly case studies.',
      image: './hero_bg.jpg',
      features: [
        'Fintech policy & advancements',
        'Effective learning strategies',
        'Practical application discussions',
        'Banking software exposure',
        'Eg: Finnone, Salesforce'
      ],
    }
  ];

  // Next / Prev slide
  const nextSlide = (): void =>
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = (): void =>
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  // Handle brochure download/view
  const handleViewBrochure = (): void => {
    const brochureUrl = '/files/kg_broucher.pdf';
    window.open(brochureUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="-mt-16 -mb-16 min-h-[50vh] lg:min-h-screen bg-black text-white ">


      {/* HERO SLIDER */}
      <section id="home" className=" h-[50vh] lg:h-screen overflow-hidden">
        {slides.map((slide: Slide, index: number) => (
          <div
            key={index}
            className={`absolute -inset-0 flex flex-col items-center justify-center text-center transition-opacity duration-1000 ease-in-out ${index === currentSlide
              ? "opacity-100 z-10 rounded-none"
              : "opacity-0 z-0 pointer-events-none"
              }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "50vh",
              borderRadius: "0px"
            }}
          >
            {/* Responsive overlay: darker on mobile, lighter on desktop */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-20 max-w-xl">
              <p className="text-white text-sm sm:text-lg">
                {slide.subtitle}
              </p>
              <h1 className="text-3xl sm:text-5xl font-bold text-white">
                {slide.title}
              </h1>
              {/* Features List */}
              <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {slide.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center pl-5">
                    <span className="inline-block bg-blue-100 p-1 rounded-full mr-3">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={handleViewBrochure}
                className="mt-5 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition"
              >
                View Brochure
              </button>
            </div>
          </div>
        ))}

        {/* Prev / Next Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 p-2 rounded-full z-30"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 p-2 rounded-full z-30"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 w-full flex justify-center gap-2 z-30">
          {slides.map((_: Slide, idx: number) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full ${idx === currentSlide
                ? "bg-white"
                : "bg-white bg-opacity-50"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}