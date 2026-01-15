import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';
import './Home.css';

function Home() {
  const featuredCourses = [
    {
      icon: '🧪',
      title: 'Science Excellence',
      description: 'Master physics, chemistry, and biology with expert guidance.',
      duration: '12 Months',
      students: '2,543',
      rating: '4.9',
      price: '₹5,999',
      featured: true,
    },
    {
      icon: '📐',
      title: 'Mathematics Mastery',
      description: 'From basics to advanced calculus - become a math wizard!',
      duration: '10 Months',
      students: '3,210',
      rating: '4.8',
      price: '₹4,999',
    },
    {
      icon: '🎨',
      title: 'Creative Arts',
      description: 'Unleash your creativity with our comprehensive arts program.',
      duration: '8 Months',
      students: '1,876',
      rating: '4.7',
      price: '₹3,999',
    },
  ];

  const highlights = [
    { icon: '🎓', title: 'Expert Teachers', desc: 'Learn from industry professionals' },
    { icon: '🏆', title: 'Certification', desc: 'Get recognized certificates' },
    { icon: '💡', title: 'Interactive Learning', desc: 'Engaging study materials' },
    { icon: '📱', title: 'Flexible Schedule', desc: 'Learn at your own pace' },
  ];

  return (
    <div className="home-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-icon">🌟</span>
            Welcome to Star Maker
            <span className="gradient-text">Coaching Institute</span>
          </h1>
          <p className="hero-subtitle">
            Transform your dreams into reality! Join thousands of successful students
            who are reaching for the stars with our expert coaching.
          </p>
          <div className="hero-buttons">
            <Link to="/courses" className="btn btn-primary">
              Explore Courses 🚀
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Get Started ✨
            </Link>
          </div>
        </div>
        <div className="hero-decoration">
          <div className="floating-star">⭐</div>
          <div className="floating-star">🌟</div>
          <div className="floating-star">✨</div>
          <div className="floating-star">💫</div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="highlights-section">
        <div className="container">
          <h2 className="section-title">Why Choose Star Maker? 🌟</h2>
          <div className="highlights-grid">
            {highlights.map((highlight, index) => (
              <div key={index} className="highlight-card">
                <div className="highlight-icon">{highlight.icon}</div>
                <h3>{highlight.title}</h3>
                <p>{highlight.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="courses-section">
        <div className="container">
          <h2 className="section-title">Featured Courses 🎯</h2>
          <p className="section-subtitle">
            Discover our most popular courses designed to help you excel
          </p>
          <div className="courses-grid">
            {featuredCourses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
          <div className="section-cta">
            <Link to="/courses" className="btn btn-outline">
              View All Courses →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to Start Your Journey? 🚀</h2>
            <p>
              Join thousands of students who are already achieving their dreams.
              Your success story starts here!
            </p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-white">
                Register Now ✨
              </Link>
              <Link to="/contact" className="btn btn-outline-white">
                Contact Us 📞
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
