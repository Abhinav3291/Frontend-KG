import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/OpeningStorySection.css';

const OpeningStorySection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoSource = '/KG FINAL OK grade.mp4';
  const posterImage = '/images/video-poster.jpg';

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
    <section className="opening-story">
      <motion.div
        className="opening-story-content"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="opening-story-text">
          <h2>Founder's Voice</h2>
          <p>Struggling to keep up with the fast-moving world of web development? I was too, until I discovered a step-by-step approach that actually works. This course is designed to take you from beginner to job-ready, with practical skills you can use immediately.</p>
        </div>
        <div className="video-container">
          <div className="video-wrapper">
            <video
              ref={videoRef}
              className={`course-video ${isPlaying ? 'playing' : ''}`}
              onClick={handleVideoClick}
              controls={isPlaying}
              poster={posterImage}
              preload="metadata"
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
