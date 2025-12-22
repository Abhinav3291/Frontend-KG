import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/TestimonialsSection.css';

const renderStars = (count: number) => {
  return Array(5)
    .fill(0)
    .map((_, i) => (
      <i
        key={i}
        className={`fas fa-star${i < count ? '' : '-o'}`}
        aria-hidden="true"
      ></i>
    ));
};

const TestimonialsSection = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5
  });
  const [formError, setFormError] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewTestimonial(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.name.trim() || !newTestimonial.content.trim()) {
      setFormError('Please fill in all required fields.');
      return;
    }

    const newEntry = {
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
    setFormError('');
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2>Recent Placements</h2>


          {/* Video Section */}
          <motion.div
            className="testimonials-video-container"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="testimonials-video-wrapper">
              <video
                ref={videoRef}
                className="testimonials-video"
                onClick={toggleVideoPlay}
                controls={true}
                poster="/Screenshot 2025-07-15 094753.png"
                preload="auto"
                aria-label="Student testimonials video"
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              >
                <source src="https://res.cloudinary.com/dyqfgmxio/video/upload/v1752555104/IMG_0040_gyvj6p.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {!isVideoPlaying && (
                <div
                  className="play-button"
                  onClick={toggleVideoPlay}
                  onKeyDown={(e) => e.key === 'Enter' && toggleVideoPlay()}
                  role="button"
                  tabIndex={0}
                  aria-label="Play video"
                >
                  <i className="fas fa-play"></i>
                </div>
              )}
            </div>
            <p className="testimonials-video-caption">
              Hear directly from our students about their learning journey
            </p>
          </motion.div>

          {/* Descriptive Text */}


          {/* Form toggle */}
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Share Your Experience
            </button>
          ) : (
            <div className="testimonial-form mt-8 p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Share Your Experience</h3>
              {formError && <p className="text-red-500 mb-4">{formError}</p>}
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={newTestimonial.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Role/Position</label>
                    <input
                      type="text"
                      name="role"
                      value={newTestimonial.role}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Experience *</label>
                  <textarea
                    name="content"
                    value={newTestimonial.content}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-2 border rounded-md"
                    required
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <select
                    name="rating"
                    value={newTestimonial.rating}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md"
                  >
                    {[5, 4, 3, 2, 1].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'star' : 'stars'}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Submit Testimonial
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Testimonials Display */}
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="testimonial-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px 0px' }}
              transition={{ duration: 0.6, delay: testimonial.id * 0.0001 }}
            >
              <div className="testimonial-content">
                <p className="testimonial-text">{testimonial.content}</p>
                <div className="testimonial-meta">
                  <div className="testimonial-avatar">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.author)}&background=4f46e5&color=fff`;
                      }}
                    />
                  </div>
                  <div className="testimonial-author">
                    <h4>{testimonial.author}</h4>
                    <span className="testimonial-role">{testimonial.role}</span>
                    <div className="testimonial-rating">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  <div className="testimonial-date">
                    <i className="far fa-calendar-alt"></i> {testimonial.date}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
