import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';
import './Courses.css';

function Courses() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Courses', icon: '📚' },
    { id: 'science', name: 'Science', icon: '🧪' },
    { id: 'math', name: 'Mathematics', icon: '📐' },
    { id: 'arts', name: 'Arts', icon: '🎨' },
    { id: 'competitive', name: 'Competitive', icon: '🏆' },
  ];

  const allCourses = [
    {
      icon: '🧪',
      title: 'Science Excellence',
      description: 'Master physics, chemistry, and biology with expert guidance.',
      duration: '12 Months',
      students: '2,543',
      rating: '4.9',
      price: '₹5,999',
      category: 'science',
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
      category: 'math',
    },
    {
      icon: '🎨',
      title: 'Creative Arts',
      description: 'Unleash your creativity with our comprehensive arts program.',
      duration: '8 Months',
      students: '1,876',
      rating: '4.7',
      price: '₹3,999',
      category: 'arts',
    },
    {
      icon: '🏆',
      title: 'JEE Preparation',
      description: 'Complete preparation for Joint Entrance Examination.',
      duration: '24 Months',
      students: '4,321',
      rating: '4.9',
      price: '₹12,999',
      category: 'competitive',
      featured: true,
    },
    {
      icon: '⚗️',
      title: 'Chemistry Advanced',
      description: 'Deep dive into organic, inorganic, and physical chemistry.',
      duration: '9 Months',
      students: '1,654',
      rating: '4.6',
      price: '₹4,499',
      category: 'science',
    },
    {
      icon: '🔬',
      title: 'Physics Fundamentals',
      description: 'Build strong foundation in mechanics, thermodynamics, and more.',
      duration: '11 Months',
      students: '2,109',
      rating: '4.7',
      price: '₹5,499',
      category: 'science',
    },
    {
      icon: '📊',
      title: 'Statistics & Data',
      description: 'Learn statistical analysis and data interpretation skills.',
      duration: '6 Months',
      students: '987',
      rating: '4.5',
      price: '₹3,499',
      category: 'math',
    },
    {
      icon: '🎭',
      title: 'Theater Arts',
      description: 'Express yourself through drama, acting, and performance.',
      duration: '7 Months',
      students: '756',
      rating: '4.8',
      price: '₹3,799',
      category: 'arts',
    },
    {
      icon: '🎯',
      title: 'NEET Preparation',
      description: 'Comprehensive medical entrance exam preparation course.',
      duration: '24 Months',
      students: '3,876',
      rating: '4.9',
      price: '₹13,999',
      category: 'competitive',
      featured: true,
    },
  ];

  const filteredCourses =
    selectedCategory === 'all'
      ? allCourses
      : allCourses.filter((course) => course.category === selectedCategory);

  return (
    <div className="courses-page">
      <Navbar />

      {/* Hero Section */}
      <section className="courses-hero">
        <div className="container">
          <h1>
            <span className="hero-icon">📚</span> Our Courses
          </h1>
          <p className="hero-subtitle">
            Discover a wide range of courses designed to help you excel
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="categories-section">
        <div className="container">
          <div className="categories">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${
                  selectedCategory === category.id ? 'active' : ''
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="courses-list-section">
        <div className="container">
          <div className="courses-header">
            <h2>
              {selectedCategory === 'all'
                ? 'All Courses'
                : categories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <p>{filteredCourses.length} courses available</p>
          </div>
          <div className="courses-grid">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))
            ) : (
              <div className="no-courses">
                <span className="no-courses-icon">🔍</span>
                <p>No courses found in this category</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="courses-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Can't find what you're looking for? 🤔</h2>
            <p>Contact us and we'll create a custom course for you!</p>
            <a href="/contact" className="btn btn-white">
              Contact Us 📞
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Courses;
