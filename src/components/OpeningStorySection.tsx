import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from './ui/section';
import { Container } from './ui/container';
import { cn } from '../lib/utils';
import { Play } from 'lucide-react';

const OpeningStorySection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoSource = 'https://res.cloudinary.com/dyqfgmxio/video/upload/v1752555071/Untitled_video_-_Made_with_Clipchamp_5_cknovg.mp4';
  const posterImage = '/Screenshot 2025-07-15 094530.png';
  const name = 'Sakshi Garg';
  const role = 'CEO AND FOUNDER';

  const handlePlayPause = async () => {
    if (!videoRef.current) return;

    try {
      if (videoRef.current.paused) {
        await videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Video playback error:', error);
      setIsPlaying(false);
    }
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handlePlayPause();
  };

  return (
    <Section className={cn('bg-white')}>
      <Container>
        <div className="h-full w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Video Section */}
          <motion.div
            className="lg:col-span-5 relative group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="sm:block md:hidden text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Founder's Voice
            </h2>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
              <video
                ref={videoRef}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onClick={handleVideoClick}
                controls={false}
                poster={posterImage}
                preload="metadata"
                aria-label="Founder's message"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              >
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div
                className={`absolute inset-0 ${!isPlaying ? 'bg-black/40' : 'bg-transparent group-hover:bg-black/20'} transition-all duration-300 flex items-center justify-center`}
                onClick={handleVideoClick}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayPause();
                  }}
                  className={`${!isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} bg-white/90 text-blue-600 rounded-full p-4 transform transition-all duration-300 hover:scale-110 hover:bg-white`}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  <Play className={`w-8 h-8 ${isPlaying ? 'hidden' : 'block'}`} />
                </button>

                {!isPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white text-2xl font-bold">{name}</h3>
                    <p className="text-blue-200 font-medium">{role}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="max-w-3xl">
              <h2 className="hidden sm:block text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Founder's Voice
              </h2>
              <h3 className="text-xl text-blue-600 font-semibold mb-6">{name}</h3>

              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  When I started KG Training & Placements, it was not just to teach — it was to empower. I saw a gap between what students learn and what industries need. My goal was to bridge that gap.
                </p>
                <p className="leading-relaxed">
                  We don't just train for exams — we build confidence, skills, and most importantly, a career path. KG isn't just an institute, it's a launchpad.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

export default OpeningStorySection;
