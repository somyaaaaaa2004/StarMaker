import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

// Dummy JSON data - 8 students
const dummyStudentPerformance = [
  { id: 1, name: 'Alice Johnson', class: 'Mathematics 101', attendance: 95, marks: 92, progress: 88 },
  { id: 2, name: 'Bob Smith', class: 'Physics Advanced', attendance: 88, marks: 85, progress: 82 },
  { id: 3, name: 'Charlie Brown', class: 'Chemistry Lab', attendance: 92, marks: 90, progress: 86 },
  { id: 4, name: 'Diana Prince', class: 'Biology Seminar', attendance: 85, marks: 88, progress: 80 },
  { id: 5, name: 'Edward Norton', class: 'Mathematics 201', attendance: 78, marks: 82, progress: 75 },
  { id: 6, name: 'Fiona Grace', class: 'Physics Advanced', attendance: 96, marks: 94, progress: 91 },
  { id: 7, name: 'George Miller', class: 'Chemistry Lab', attendance: 82, marks: 79, progress: 74 },
  { id: 8, name: 'Hannah Lee', class: 'Biology Seminar', attendance: 91, marks: 89, progress: 85 },
];

const dummyFeatures = [
  { id: 1, title: 'Course Management', description: 'Manage all courses and curriculum', icon: '📚', status: 'active' },
  { id: 2, title: 'Student Analytics', description: 'Track student performance and progress', icon: '📊', status: 'active' },
  { id: 3, title: 'Attendance System', description: 'Monitor class attendance in real-time', icon: '✅', status: 'active' },
  { id: 4, title: 'Reports Generator', description: 'Generate detailed performance reports', icon: '📋', status: 'pending' },
  { id: 5, title: 'Notification System', description: 'Send updates to students and parents', icon: '🔔', status: 'active' },
];

// Dummy classes tracker data - 12 sessions
const dummyClassesTracker = [
  { id: 1, teacher: 'Dr. Sarah Williams', subject: 'Mathematics', batchClass: 'Math 101 - A', date: '2024-01-15', time: '9:00 AM - 10:30 AM', studentsCount: 25, status: 'completed' },
  { id: 2, teacher: 'Prof. Michael Chen', subject: 'Physics', batchClass: 'Physics Advanced - B', date: '2024-01-15', time: '11:00 AM - 12:30 PM', studentsCount: 18, status: 'completed' },
  { id: 3, teacher: 'Dr. Emily Davis', subject: 'Chemistry', batchClass: 'Chemistry Lab - C', date: '2024-01-15', time: '2:00 PM - 4:00 PM', studentsCount: 20, status: 'completed' },
  { id: 4, teacher: 'Prof. James Wilson', subject: 'Biology', batchClass: 'Biology Seminar - A', date: '2024-01-16', time: '10:00 AM - 11:00 AM', studentsCount: 30, status: 'pending' },
  { id: 5, teacher: 'Dr. Sarah Williams', subject: 'Mathematics', batchClass: 'Math 201 - B', date: '2024-01-16', time: '3:00 PM - 4:30 PM', studentsCount: 22, status: 'pending' },
  { id: 6, teacher: 'Dr. Lisa Anderson', subject: 'English', batchClass: 'English Literature - A', date: '2024-01-16', time: '9:30 AM - 11:00 AM', studentsCount: 28, status: 'pending' },
  { id: 7, teacher: 'Prof. Robert Brown', subject: 'History', batchClass: 'World History - C', date: '2024-01-17', time: '10:00 AM - 11:30 AM', studentsCount: 24, status: 'pending' },
  { id: 8, teacher: 'Dr. Maria Garcia', subject: 'Chemistry', batchClass: 'Organic Chemistry - B', date: '2024-01-17', time: '1:00 PM - 3:00 PM', studentsCount: 19, status: 'pending' },
  { id: 9, teacher: 'Prof. David Lee', subject: 'Computer Science', batchClass: 'CS 101 - A', date: '2024-01-17', time: '2:00 PM - 3:30 PM', studentsCount: 32, status: 'pending' },
  { id: 10, teacher: 'Dr. Jennifer Taylor', subject: 'Mathematics', batchClass: 'Calculus - C', date: '2024-01-18', time: '9:00 AM - 10:30 AM', studentsCount: 26, status: 'pending' },
  { id: 11, teacher: 'Prof. Christopher Martinez', subject: 'Physics', batchClass: 'Mechanics - B', date: '2024-01-18', time: '11:00 AM - 12:30 PM', studentsCount: 21, status: 'pending' },
  { id: 12, teacher: 'Dr. Sarah Williams', subject: 'Mathematics', batchClass: 'Statistics - A', date: '2024-01-14', time: '2:00 PM - 3:30 PM', studentsCount: 27, status: 'completed' },
];

function AdminDashboard() {
  const navigate = useNavigate();
  const [studentData] = useState(dummyStudentPerformance);
  const [featuresData] = useState(dummyFeatures);
  const [classesData] = useState(dummyClassesTracker);
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  // Handle admin logout - clears token and redirects to /login
  const handleLogout = () => {
    // Clear token (same key used by both admin and student login)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    // Redirect to /login
    navigate('/login');
  };

  // Filter students based on search query
  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) {
      return studentData;
    }
    return studentData.filter((student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [studentData, searchQuery]);

  // Filter classes based on status
  const filteredClasses = useMemo(() => {
    if (statusFilter === 'all') {
      return classesData;
    }
    return classesData.filter((classItem) => classItem.status === statusFilter);
  }, [classesData, statusFilter]);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Status Chip component
  const StatusChip = ({ status }) => {
    const isCompleted = status === 'completed';
    return (
      <span
        className={`status-chip ${isCompleted ? 'status-chip-completed' : 'status-chip-pending'}`}
      >
        {isCompleted ? 'Completed' : 'Pending'}
      </span>
    );
  };

  // LinearProgress component
  const LinearProgress = ({ value }) => {
    const percentage = Math.min(100, Math.max(0, value));
    const getColor = () => {
      if (percentage >= 80) return '#667eea';
      if (percentage >= 60) return '#48bb78';
      if (percentage >= 40) return '#ed8936';
      return '#f56565';
    };

    return (
      <div className="linear-progress-container">
        <div className="linear-progress-bar">
          <div
            className="linear-progress-fill"
            style={{
              width: `${percentage}%`,
              backgroundColor: getColor(),
            }}
          />
        </div>
        <span className="linear-progress-label">{percentage}%</span>
      </div>
    );
  };

  const getStatusBadge = (status) => {
    const styles = {
      excellent: { bg: '#d4edda', color: '#155724', text: 'Excellent' },
      good: { bg: '#cce5ff', color: '#004085', text: 'Good' },
      average: { bg: '#fff3cd', color: '#856404', text: 'Average' },
      active: { bg: '#d4edda', color: '#155724', text: 'Active' },
      pending: { bg: '#fff3cd', color: '#856404', text: 'Pending' },
      ongoing: { bg: '#cce5ff', color: '#004085', text: 'Ongoing' },
      scheduled: { bg: '#e2e3e5', color: '#383d41', text: 'Scheduled' },
      completed: { bg: '#d1ecf1', color: '#0c5460', text: 'Completed' },
    };
    const style = styles[status] || styles.active;
    return (
      <span className="status-badge" style={{ backgroundColor: style.bg, color: style.color }}>
        {style.text}
      </span>
    );
  };

  // Handle quick action button click
  const handleQuickAction = () => {
    setSnackbarOpen(true);
    setTimeout(() => {
      setSnackbarOpen(false);
    }, 3000);
  };

  // Quick action cards data
  const quickActions = [
    {
      id: 1,
      title: 'Add Student',
      subtitle: 'Register a new student to the system',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="8.5" cy="7" r="4"></circle>
          <line x1="20" y1="8" x2="20" y2="14"></line>
          <line x1="23" y1="11" x2="17" y2="11"></line>
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Update Marks',
      subtitle: 'Edit and update student marks and grades',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      ),
    },
    {
      id: 3,
      title: 'View Reports',
      subtitle: 'Generate and view detailed reports',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Manage Teachers',
      subtitle: 'Add, edit, or remove teacher accounts',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
  ];

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-dashboard-header">
        <div className="admin-dashboard-title">
          <h1>Admin Dashboard</h1>
          <p>Star Maker Admin Panel</p>
        </div>
        <button className="admin-logout-button" onClick={handleLogout} type="button">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="admin-dashboard-content">
        {/* Student Performance Section */}
        <section className="admin-dashboard-section">
          <div className="admin-card">
            <div className="admin-card-title-section">
              <h2>Student Performance</h2>
              <div className="student-search-container">
                <input
                  type="text"
                  placeholder="Search by student name..."
                  className="student-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="search-icon"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="M21 21l-4.35-4.35"></path>
                </svg>
              </div>
            </div>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Class</th>
                    <th>Attendance %</th>
                    <th>Marks %</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="no-results">
                        No students found matching "{searchQuery}"
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((student) => (
                      <tr key={student.id}>
                        <td>
                          <div className="table-cell-name">
                            <span className="table-avatar">{student.name.charAt(0)}</span>
                            {student.name}
                          </div>
                        </td>
                        <td>{student.class}</td>
                        <td>
                          <span className="percentage-value">{student.attendance}%</span>
                        </td>
                        <td>
                          <span className="percentage-value">{student.marks}%</span>
                        </td>
                        <td>
                          <LinearProgress value={student.progress} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Quick Actions Section */}
        <section className="admin-dashboard-section">
          <div className="admin-section-header">
            <h2>Features</h2>
            <p>Quick actions and system features</p>
          </div>
          <div className="quick-actions-grid">
            {quickActions.map((action) => (
              <div key={action.id} className="quick-action-card">
                <div className="quick-action-icon">{action.icon}</div>
                <div className="quick-action-content">
                  <h3>{action.title}</h3>
                  <p>{action.subtitle}</p>
                </div>
                <button
                  className="quick-action-button"
                  onClick={handleQuickAction}
                  type="button"
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Classes Tracker Section */}
        <section className="admin-dashboard-section">
          <div className="admin-card">
            <div className="admin-card-title-section">
              <h2>Classes Tracker</h2>
              <div className="status-filter-container">
                <select
                  className="status-filter-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="filter-icon"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Teacher</th>
                    <th>Subject</th>
                    <th>Batch/Class</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Students Count</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClasses.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="no-results">
                        No classes found with status "{statusFilter}"
                      </td>
                    </tr>
                  ) : (
                    filteredClasses.map((classItem) => (
                      <tr key={classItem.id}>
                        <td>
                          <div className="table-cell-name">
                            <span className="table-avatar">{classItem.teacher.charAt(0)}</span>
                            {classItem.teacher}
                          </div>
                        </td>
                        <td>{classItem.subject}</td>
                        <td>{classItem.batchClass}</td>
                        <td>{formatDate(classItem.date)}</td>
                        <td>{classItem.time}</td>
                        <td>
                          <span className="percentage-value">{classItem.studentsCount}</span>
                        </td>
                        <td>
                          <StatusChip status={classItem.status} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      {/* Snackbar Component */}
      {snackbarOpen && (
        <div className="snackbar">
          <div className="snackbar-content">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span>Coming soon</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
