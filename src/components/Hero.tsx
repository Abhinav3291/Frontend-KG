import { Check, Award, Users, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import { Section } from './ui/section';
import { Container } from './ui/container';

const slides = [
  {
    title: 'First time in India',
    subtitle: 'Banking Education with 100% Placement Assurance.',
    background: 'https://thumbs.dreamstime.com/b/rear-view-female-university-graduate-stands-holds-degree-certificate-to-celebrate-graduation-ceremony-clear-151371118.jpg',
    features: [
      '100% Placement Assurance',
      'Industry Expert Trainers',
      'Banking-Focused Curriculum',
      'Certification Programs'
    ]
  },
  {
    title: 'Assured Jobs',
    subtitle: 'We ensure every student has a clear career path with guaranteed job assistance.',
    background: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
    features: [
      'Guaranteed Job Assistance',
      'Resume Building',
      'Interview Preparation',
      'Career Counseling'
    ]
  },
  {
    title: 'Training by ex-bankers',
    subtitle: 'Skilled and qualified ex-bankers help students understand real industry requirements.',
    background: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    features: [
      'Ex-Banker Trainers',
      'Real-world Case Studies',
      'Industry Insights',
      'Practical Training'
    ]
  }
];

const stats = [
  { value: '1000+', label: 'Students Trained', icon: Users },
  { value: '95%', label: 'Placement Rate', icon: Award },
  { value: '50+', label: 'Hiring Partners', icon: Briefcase },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = slides.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Section className="bg-gradient-to-b from-white to-gray-50 py-0 relative">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 relative z-10">


            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {slides[currentSlide].title}
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl">
              {slides[currentSlide].subtitle}
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {slides[currentSlide].features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 p-1 rounded-full mr-3">
                    <Check className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-medium rounded-lg">
                Enroll Now
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-lg font-medium rounded-lg">
                Download Brochure
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl">
            <img
              src={slides[currentSlide].background}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover object-center transition-opacity duration-1000"
            />
            {/* Floating Badge */}
            <div className="absolute bottom-8 left-8 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Certified Program</p>
                  <p className="text-xs text-gray-500">Recognized by Industry</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 flex justify-between z-10 lg:left-1/2 lg:-translate-x-1/2 lg:max-w-7xl lg:px-4">
            <button
              onClick={prevSlide}
              className="bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-6 lg:col-span-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-blue-600 w-8' : 'bg-gray-300'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
