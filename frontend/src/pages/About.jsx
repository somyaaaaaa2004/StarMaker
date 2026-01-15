import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './About.css';

function About() {
  const stats = [
    { number: '10,000+', label: 'Happy Students', icon: '🎓' },
    { number: '500+', label: 'Expert Teachers', icon: '👨‍🏫' },
    { number: '50+', label: 'Courses Offered', icon: '📚' },
    { number: '95%', label: 'Success Rate', icon: '🏆' },
  ];

  const values = [
    {
      icon: '💡',
      title: 'Innovation',
      description: 'We use cutting-edge teaching methods and technology to enhance learning.',
    },
    {
      icon: '🤝',
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, setting high standards for our students.',
    },
    {
      icon: '❤️',
      title: 'Passion',
      description: 'Our teachers are passionate about helping students achieve their dreams.',
    },
    {
      icon: '🌟',
      title: 'Growth',
      description: 'We believe in continuous growth and improvement for both students and faculty.',
    },
  ];

  const team = [
    { name: 'Dr. Sarah Johnson', role: 'Principal', icon: '👩‍💼' },
    { name: 'Prof. Michael Chen', role: 'Science Head', icon: '👨‍🔬' },
    { name: 'Ms. Emma Williams', role: 'Arts Director', icon: '👩‍🎨' },
    { name: 'Mr. David Kumar', role: 'Maths Expert', icon: '👨‍🏫' },
  ];

  return (
    <div className="about-page">
      <Navbar />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>
            <span className="hero-icon">🌟</span> About Star Maker
          </h1>
          <p className="hero-subtitle">
            Empowering students to reach for the stars since 2010
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission 🎯</h2>
              <p>
                At Star Maker Coaching Institute, our mission is to provide
                world-class education that transforms lives. We believe every
                student has the potential to shine brightly and achieve
                extraordinary success.
              </p>
              <p>
                Through personalized attention, innovative teaching methods, and
                a supportive learning environment, we guide our students toward
                academic excellence and personal growth.
              </p>
            </div>
            <div className="mission-image">
              <div className="mission-icon">🚀</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Our Core Values 💎</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Meet Our Team 👥</h2>
          <p className="section-subtitle">
            Dedicated professionals committed to your success
          </p>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">{member.icon}</div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Join the Star Maker Family! 🌟</h2>
            <p>Be part of a community that believes in your potential</p>
            <a href="/register" className="btn btn-white">
              Get Started Now 🚀
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
