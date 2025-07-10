import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/TestimonialsSection.css';

// Initial testimonials data
const initialTestimonials = [
  {
    id: 1,
    content: "This course completely transformed my approach to web development. The hands-on projects and real-world examples gave me the confidence to apply for senior developer positions.",
    author: "Priya Sharma",
    role: "Senior Frontend Developer",
    avatar: "/images/avatars/avatar1.jpg",
    rating: 5,
    date: new Date("2024-06-15").toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  },
  {
    id: 2,
    content: "As someone with no prior coding experience, I was nervous about starting this journey. But the structured curriculum and supportive community made all the difference. Landed my first dev job within 3 months!",
    author: "Rahul Verma",
    role: "Junior Full Stack Developer",
    avatar: "/images/avatars/avatar2.jpg",
    rating: 5,
    date: new Date("2024-05-28").toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  },
  {
    id: 3,
    content: "The mentorship and code reviews were invaluable. I learned industry best practices that I use every day in my role at a tech startup. Worth every penny and more!",
    author: "Ayesha Khan",
    role: "Frontend Engineer",
    avatar: "/images/avatars/avatar3.jpg",
    rating: 5,
    date: new Date("2024-07-02").toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }
];

const renderStars = (count: number) => {
  return Array(5).fill(0).map((_, i) => (
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
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [showForm, setShowForm] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',  // This will be mapped to 'author' when creating the testimonial
    role: '',
    content: '',
    rating: 5
  });
  const [formError, setFormError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTestimonial(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!newTestimonial.name.trim() || !newTestimonial.content.trim()) {
      setFormError('Please fill in all required fields.');
      return;
    }

    // Add new testimonial
    const newEntry = {
      id: Date.now(),
      content: newTestimonial.content,
      author: newTestimonial.name,  // Map name to author for consistency
      role: newTestimonial.role,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newTestimonial.name)}&background=4f46e5&color=fff`,
      rating: newTestimonial.rating,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
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
          <h2>Hear From Our Students</h2>
          <p>Don't just take our word for it. Here's what our students have to say about their learning experience.</p>
          
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
              controls={isVideoPlaying}
              poster="/images/video-poster.jpg"
              preload="metadata"
              aria-label="Student testimonials video"
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
            >
              <source src="/IMG_0040.MP4" type="video/mp4" />
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
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80px',
                  height: '80px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(5px)',
                  WebkitBackdropFilter: 'blur(5px)',
                  zIndex: 2,
                }}
              >
                <i 
                  className="fas fa-play" 
                  style={{ 
                    color: 'white', 
                    fontSize: '2rem',
                    marginLeft: '5px'
                  }}
                ></i>
              </div>
            )}
          </div>
          <p className="testimonials-video-caption">Hear directly from our students about their learning journey</p>
        </motion.div>
      
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              className="testimonial-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px 0px" }}
              transition={{ duration: 0.6, delay: testimonial.id * 0.1 }}
            >
              <div className="testimonial-content">
                <p className="testimonial-text">{testimonial.content}</p>
                
                <div className="testimonial-meta">
                  <div className="testimonial-avatar">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author} 
                      onError={(e) => {
                        // Fallback avatar if image fails to load
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
                    <i className="far fa-calendar-alt"></i>
                    {testimonial.date}
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
