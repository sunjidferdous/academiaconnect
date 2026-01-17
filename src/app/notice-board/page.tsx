'use client';

import { useState } from 'react';

export default function NoticeBoardPage() {
  const [universityFilter, setUniversityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');

  const notices = [
    {
      id: 1,
      university: 'DU',
      universityName: 'University of Dhaka',
      date: 'Oct 15, 2023',
      title: 'Final Exam Schedule Published',
      excerpt: 'The schedule for Fall 2023 semester final examinations has been published. All students are advised to check their respective department notices.',
      tags: ['academic', 'exam'],
      priority: 'high',
    },
    {
      id: 2,
      university: 'BUET',
      universityName: 'BUET',
      date: 'Oct 12, 2023',
      title: 'Admission Test Result',
      excerpt: 'The results for the 2023-2024 undergraduate admission test have been published. Candidates can check their results on the official website.',
      tags: ['admission', 'urgent'],
      priority: 'high',
    },
    {
      id: 3,
      university: 'JU',
      universityName: 'Jahangirnagar University',
      date: 'Oct 10, 2023',
      title: 'Annual Cultural Festival',
      excerpt: 'The annual cultural festival "Boishakhi Mela" will be held on November 15-17. All students are invited to participate and enjoy the events.',
      tags: ['event'],
      priority: 'medium',
    },
    {
      id: 4,
      university: 'CU',
      universityName: 'University of Chittagong',
      date: 'Oct 8, 2023',
      title: 'Scholarship Opportunities',
      excerpt: 'Applications are open for the Chancellor Merit Scholarship for the academic year 2023-2024. Eligible students should apply by October 30.',
      tags: ['scholarship'],
      priority: 'medium',
    },
    {
      id: 5,
      university: 'RU',
      universityName: 'University of Rajshahi',
      date: 'Oct 5, 2023',
      title: 'Library Hours Extended',
      excerpt: 'During the final examination period, the central library will remain open until 10:00 PM. Students must bring their ID cards for entry.',
      tags: ['academic'],
      priority: 'low',
    },
    {
      id: 6,
      university: 'NSTU',
      universityName: 'Noakhali Science & Technology',
      date: 'Oct 3, 2023',
      title: 'Workshop on AI & Machine Learning',
      excerpt: 'The Computer Science department is organizing a 3-day workshop on AI and Machine Learning from October 20-22. Registration is free but limited.',
      tags: ['event', 'academic'],
      priority: 'medium',
    },
  ];

  const filteredNotices = notices.filter((notice) => {
    const universityMatch = universityFilter === 'all' || notice.university === universityFilter;
    const categoryMatch = categoryFilter === 'all' || notice.tags.includes(categoryFilter);
    const searchMatch = 
      notice.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      notice.excerpt.toLowerCase().includes(searchFilter.toLowerCase());
    
    return universityMatch && categoryMatch && searchMatch;
  });

  return (
    <div className="page-container">
      <div className="container">
        <h2 className="page-title">University Notice Board</h2>
        <p className="page-subtitle">Important updates from universities across Bangladesh</p>

        {/* Filter Section */}
        <div className="filter-section">
          <div className="filter-group">
            <label htmlFor="university">University</label>
            <select 
              id="university" 
              value={universityFilter}
              onChange={(e) => setUniversityFilter(e.target.value)}
            >
              <option value="all">All Universities</option>
              <option value="DU">University of Dhaka</option>
              <option value="BUET">BUET</option>
              <option value="CU">University of Chittagong</option>
              <option value="RU">University of Rajshahi</option>
              <option value="JU">Jahangirnagar University</option>
              <option value="NSTU">NSTU</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="category">Category</label>
            <select 
              id="category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="academic">Academic</option>
              <option value="admission">Admission</option>
              <option value="exam">Examination</option>
              <option value="event">Events</option>
              <option value="scholarship">Scholarship</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div className="filter-group search-box">
            <label htmlFor="search">Search Notices</label>
            <input 
              type="text" 
              id="search" 
              placeholder="Type to search..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </div>
        </div>

        {/* Notice Board */}
        <div className="notice-board-grid">
          {filteredNotices.map((notice) => (
            <div key={notice.id} className="notice-card">
              <div className="notice-header">
                <div className="university">
                  <div className="uni-logo">{notice.university}</div>
                  <div className="uni-name">{notice.universityName}</div>
                </div>
                <div className="notice-date">{notice.date}</div>
              </div>
              <div className="notice-content">
                <h3 className="notice-title">{notice.title}</h3>
                <p className="notice-excerpt">{notice.excerpt}</p>
                <div className="notice-tags">
                  {notice.tags.map((tag, index) => (
                    <span key={index} className={`tag ${tag}`}>
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
              <div className="notice-actions">
                <a href="#" className="read-more">
                  Read more <i className="fas fa-arrow-right"></i>
                </a>
                <div className={`notice-priority ${notice.priority}`}></div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotices.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            <i className="fas fa-search" style={{ fontSize: '3rem', marginBottom: '20px' }}></i>
            <p>No notices found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
