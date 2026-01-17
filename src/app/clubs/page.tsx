'use client';

export default function ClubsPage() {
  const clubs = [
    {
      id: 1,
      name: 'Programming Club',
      members: 128,
      events: 5,
      description: 'A community of coding enthusiasts who learn, build, and compete together. Regular workshops and hackathons.',
    },
    {
      id: 2,
      name: 'Art Society',
      members: 86,
      events: 3,
      description: 'For students passionate about visual arts. Regular exhibitions, workshops, and collaborative projects.',
    },
    {
      id: 3,
      name: 'Sports Club',
      members: 210,
      events: 8,
      description: 'Promoting physical fitness and sportsmanship through various athletic activities and competitions.',
    },
    {
      id: 4,
      name: 'Debating Society',
      members: 95,
      events: 6,
      description: 'Develop public speaking and critical thinking skills through regular debates and discussions.',
    },
    {
      id: 5,
      name: 'Environmental Club',
      members: 75,
      events: 4,
      description: 'Promoting sustainability and environmental awareness on campus and in the community.',
    },
    {
      id: 6,
      name: 'Music Club',
      members: 120,
      events: 7,
      description: 'For musicians and music lovers. Regular jam sessions, performances, and workshops.',
    },
  ];

  return (
    <div className="page-container">
      <div className="container">
        <h2 className="page-title">University Clubs</h2>
        <p className="page-subtitle">Join student clubs and organizations to connect with like-minded peers</p>

        <div className="clubs-grid">
          {clubs.map((club) => (
            <div key={club.id} className="club-card">
              <div className="club-banner"></div>
              <div className="club-detail">
                <h3 className="club-name">{club.name}</h3>
                <div className="club-meta">
                  <div>
                    <i className="fas fa-users"></i> {club.members} members
                  </div>
                  <div>
                    <i className="fas fa-calendar"></i> {club.events} events
                  </div>
                </div>
                <p className="club-description">{club.description}</p>
                <div className="club-actions">
                  <button className="btn btn-primary">Join Club</button>
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
