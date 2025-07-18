import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Section } from './ui/section';
import { Container } from './ui/container';
import { Button } from './ui/button';

interface Testimonial {
  id: number;
  content: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  date: string;
}

const renderStars = (count: number) => {
  return Array(5).fill(0).map((_, i) => (
    <svg
      key={i}
      className={`w-5 h-5 ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ));
};

const TestimonialsSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5
  });

  useEffect(() => {
    // Reset success message after 5 seconds
    if (formSuccess) {
      const timer = setTimeout(() => {
        setFormSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formSuccess]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewTestimonial(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!newTestimonial.name.trim() || !newTestimonial.content.trim()) {
      setFormError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newEntry: Testimonial = {
        id: Date.now(),
        content: newTestimonial.content,
        author: newTestimonial.name,
        role: newTestimonial.role,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          newTestimonial.name
        )}&background=4f46e5&color=fff`,
        rating: newTestimonial.rating,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };

      setTestimonials([newEntry, ...testimonials]);
      setNewTestimonial({ name: '', role: '', content: '', rating: 5 });
      setShowForm(false);
      setFormSuccess('Thank you for sharing your experience!');
    } catch (error) {
      setFormError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(console.error);
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  const handleVideoKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleVideoPlay();
    }
  };

  return (
    <Section className="bg-gray-50 -mb-16">
      <Container>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from our students about their learning journey and career growth
          </p>
        </motion.div>

        {/* Video Section */}
        <motion.div
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative rounded-xl overflow-hidden shadow-lg bg-black">
            <div className="aspect-w-16 aspect-h-9">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                onClick={toggleVideoPlay}
                controls={isVideoPlaying}
                poster="/Screenshot 2025-07-15 094753.png"
                preload="metadata"
                aria-label="Student testimonials video"
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              >
                <source src="https://res.cloudinary.com/dyqfgmxio/video/upload/v1752555104/IMG_0040_gyvj6p.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {!isVideoPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                  onClick={toggleVideoPlay}
                  onKeyDown={handleVideoKeyDown}
                  role="button"
                  tabIndex={0}
                  aria-label="Play video"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 flex items-center justify-center transform transition-transform hover:scale-110">
                    <svg
                      className="w-8 h-8 md:w-10 md:h-10 text-primary-600 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-500 text-center">
            Hear directly from our students about their learning journey
          </p>
        </motion.div>


        {/* Testimonials Grid */}
        {testimonials.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              What Our Students Say
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-12 w-12 rounded-full"
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.author)}&background=4f46e5&color=fff`;
                        }}
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">{testimonial.author}</h4>
                      {testimonial.role && (
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex mb-3">
                    {renderStars(testimonial.rating)}
                  </div>

                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>

                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {testimonial.date}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
};

export default TestimonialsSection;
