import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/OpeningStorySection.css';

const OpeningStorySection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoSource = 'https://res.cloudinary.com/dyqfgmxio/video/upload/v1752555071/Untitled_video_-_Made_with_Clipchamp_5_cknovg.mp4';
  const posterImage = '/Screenshot 2025-07-15 094530.png';

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    if (e.target === videoRef.current) {
      togglePlay();
    }
  };

  return (
    <section className="opening-story -mb-16 py-5">
      <motion.div
        className="opening-story-content"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="opening-story-text">
          <h2 className='font-bold'>Founder's Voice</h2>
          <p>
            When I started KG Training & Placements, it was not just to teach — it was to empower. I saw a gap between what students learn and what industries need. My goal was to bridge that gap.
            We don't just train for exams — we build confidence, skills, and most importantly, a career path. KG isn't just an institute, it's a launchpad
          </p>
        </div>

        <div className="video-container">
          <div className="video-wrapper">
            <video
              ref={videoRef}
              className={`course-video ${isPlaying ? 'playing' : ''}`}
              onClick={handleVideoClick}
              controls={isPlaying}
              poster={posterImage}
              preload="auto"
              aria-label="Course introduction video"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={videoSource} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {!isPlaying && (
              <div
                className="play-button"
                role="button"
                aria-label="Play video"
                onClick={togglePlay}
                onKeyDown={(e) => e.key === 'Enter' && togglePlay()}
                tabIndex={0}
              >
                <i className="fas fa-play"></i>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default OpeningStorySection;
