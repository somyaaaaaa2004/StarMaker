import './CourseCard.css';

function CourseCard({ course }) {
  const {
    icon = '📚',
    title = 'Course Title',
    description = 'Course description goes here',
    duration = '6 Months',
    students = '1,234',
    rating = '4.8',
    price = 'Free',
    featured = false,
  } = course;

  return (
    <div className={`course-card ${featured ? 'featured' : ''}`}>
      {featured && <div className="featured-badge">⭐ Featured</div>}
      <div className="course-icon">{icon}</div>
      <h3 className="course-title">{title}</h3>
      <p className="course-description">{description}</p>
      <div className="course-meta">
        <div className="meta-item">
          <span className="meta-icon">⏱️</span>
          <span>{duration}</span>
        </div>
        <div className="meta-item">
          <span className="meta-icon">👥</span>
          <span>{students} Students</span>
        </div>
        <div className="meta-item">
          <span className="meta-icon">⭐</span>
          <span>{rating}</span>
        </div>
      </div>
      <div className="course-footer">
        <div className="course-price">{price}</div>
        <button className="course-btn">Enroll Now 🚀</button>
      </div>
    </div>
  );
}

export default CourseCard;
