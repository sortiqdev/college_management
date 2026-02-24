import React, { useState, useEffect } from 'react';
import './TeacherDashboard.css';

// Card component
const DashboardCard = ({ title, count, icon, bgColor, borderColor }) => (
  <div className={`dashboard-card ${bgColor}`}>
    <div className="card-header">
      <div className={`card-icon ${borderColor}`}>
        {icon}
      </div>
      <div className="card-title">{title}</div>
    </div>
    <div className="card-count">{count}</div>
    <div className="card-footer">
      <span className="view-link">View All →</span>
    </div>
  </div>
);

const TeacherDashboard = () => {
  // State for dashboard data
  const [dashboardData] = useState({
    classesToday: 4,
    assignments: 12,
    tests: 3,
    notices: 5,
    announcements: 8
  });

  const [classData] = useState([
    { id: 1, name: 'Mathematics - Class 10A', time: '09:00 AM', students: 35 },
    { id: 2, name: 'Science - Class 10B', time: '10:30 AM', students: 32 },
    { id: 3, name: 'English - Class 10A', time: '01:00 PM', students: 35 },
    { id: 4, name: 'Social Studies - Class 10B', time: '02:30 PM', students: 32 }
  ]);

  // Fetch data from API - replace with actual API endpoint
  useEffect(() => {
    // TODO: Replace with actual API call
    // Example:
    // fetchDashboardData()
    //   .then(data => setDashboardData(data))
    //   .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="teacher-dashboard">
     

      {/* Main Stats Grid */}
      <div className="stats-grid">
        <DashboardCard
          title="Classes Today"
          count={dashboardData.classesToday}
          icon="📚"
          bgColor="bg-blue"
          borderColor="border-blue"
        />
        <DashboardCard
          title="Assignments"
          count={dashboardData.assignments}
          icon="✏️"
          bgColor="bg-purple"
          borderColor="border-purple"
        />
        <DashboardCard
          title="Tests"
          count={dashboardData.tests}
          icon="📝"
          bgColor="bg-orange"
          borderColor="border-orange"
        />
        <DashboardCard
          title="Notices"
          count={dashboardData.notices}
          icon="📌"
          bgColor="bg-red"
          borderColor="border-red"
        />
        <DashboardCard
          title="Announcements"
          count={dashboardData.announcements}
          icon="📢"
          bgColor="bg-green"
          borderColor="border-green"
        />
      </div>

      {/* Classes Schedule Section */}
      <div className="classes-section">
        <div className="section-header">
          <h2>Today's Classes</h2>
          <button className="view-all-btn">View All →</button>
        </div>

        <div className="classes-list">
          {classData.length > 0 ? (
            classData.map((cls) => (
              <div key={cls.id} className="class-card">
                <div className="class-info">
                  <h3>{cls.name}</h3>
                  <div className="class-details">
                    <span className="time">⏰ {cls.time}</span>
                    <span className="students">👥 {cls.students} students</span>
                  </div>
                </div>
                <button className="start-class-btn">Start Class</button>
              </div>
            ))
          ) : (
            <div className="no-classes">No classes scheduled for today</div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-btn action-btn-primary">
            <span>➕</span>
            Create Assignment
          </button>
          <button className="action-btn action-btn-secondary">
            <span>➕</span>
            Create Test
          </button>
          <button className="action-btn action-btn-tertiary">
            <span>📢</span>
            Post Announcement
          </button>
          <button className="action-btn action-btn-quaternary">
            <span>📋</span>
            View Grades
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
