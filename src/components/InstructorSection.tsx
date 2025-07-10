import '../styles/CourseSales.css';

const InstructorSection = () => (
  <section className="instructor-section">
    <div className="instructor-image-container">
      <img 
        src="https://randomuser.me/api/portraits/men/32.jpg" 
        alt="Rahul Mehra" 
        className="instructor-image"
      />
      <div className="social-links">
        <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
        <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
        <a href="#" aria-label="GitHub"><i className="fab fa-github"></i></a>
      </div>
    </div>
    <div className="instructor-info">
      <h2>Meet Your Instructor</h2>
      <div className="instructor-bio">
        <p>👋 Hi, I'm <strong>Rahul Mehra</strong>, a Senior Software Engineer with over a decade of experience in building scalable web applications for startups and Fortune 500 companies alike.</p>
        
        <p>🚀 I've helped over <strong>5,000 students</strong> worldwide transition into tech careers through my comprehensive courses and mentorship programs. My teaching philosophy focuses on practical, hands-on learning that prepares you for real-world development challenges.</p>
        
        <p>💡 In this course, I'll be sharing industry best practices, insider tips, and the exact skills that helped me build applications used by millions of users.</p>
        
        <div className="instructor-stats">
          <div className="stat-item">
            <div className="stat-number">10+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5K+</div>
            <div className="stat-label">Students Taught</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4.9★</div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default InstructorSection;
