'use client';

export default function CoursesPage() {
  const courses = [
    {
      id: 1,
      title: 'Introduction to Programming',
      code: 'CSE101',
      professor: 'Prof. Johnson',
      icon: 'fa-code',
      description: 'Learn the fundamentals of programming with Python. No prior experience required.',
    },
    {
      id: 2,
      title: 'Data Structures & Algorithms',
      code: 'CSE201',
      professor: 'Prof. Williams',
      icon: 'fa-code',
      description: 'Study of fundamental data structures and algorithm design techniques.',
    },
    {
      id: 3,
      title: 'Web Development',
      code: 'CSE301',
      professor: 'Prof. Davis',
      icon: 'fa-code',
      description: 'Learn to build modern web applications using HTML, CSS, JavaScript, and frameworks.',
    },
    {
      id: 4,
      title: 'Machine Learning',
      code: 'CSE401',
      professor: 'Prof. Anderson',
      icon: 'fa-robot',
      description: 'Introduction to machine learning algorithms and their applications.',
    },
    {
      id: 5,
      title: 'Business Ethics',
      code: 'BBA202',
      professor: 'Prof. Miller',
      icon: 'fa-chart-line',
      description: 'Examination of ethical issues in business and corporate social responsibility.',
    },
    {
      id: 6,
      title: 'Digital Marketing',
      code: 'BBA305',
      professor: 'Prof. Taylor',
      icon: 'fa-bullhorn',
      description: 'Strategies for online marketing, social media, and digital advertising.',
    },
  ];

  return (
    <div className="page-container">
      <div className="container">
        <h2 className="page-title">University Courses</h2>
        <p className="page-subtitle">Browse and enroll in courses across different departments</p>

        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-image"></div>
              <div className="course-detail">
                <h3 className="course-title">{course.title}</h3>
                <div className="course-meta">
                  <div>
                    <i className={`fas ${course.icon}`}></i> {course.code}
                  </div>
                  <div>
                    <i className="fas fa-user"></i> {course.professor}
                  </div>
                </div>
                <p className="course-description">{course.description}</p>
                <div className="course-actions">
                  <button className="btn btn-primary">Enroll</button>
                  <button className="btn btn-secondary">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
