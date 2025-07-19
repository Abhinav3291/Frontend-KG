import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Section } from './ui/section';
import { Container } from './ui/container';






const TestimonialsSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);


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



      </Container>
    </Section>
  );
};

export default TestimonialsSection;
