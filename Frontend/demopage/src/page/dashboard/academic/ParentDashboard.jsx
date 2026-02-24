import React, { useState, useEffect } from 'react';
import './ParentDashboard.css';

// Re-usable card component (declared outside render)
const DashboardCard = ({ title, value, hint, icon, bgClass, borderClass, children }) => (
  <div className={`dashboard-card ${bgClass}`}>
    <div className="card-header">
      <div className={`card-icon ${borderClass}`}>{icon}</div>
      <div className="card-title">{title}</div>
    </div>

    <div className="card-count">{value ?? '—'}</div>

    {hint && <div className="card-hint">{hint}</div>}

    <div className="card-footer">
      {children ?? <span className="view-link">View Details →</span>}
    </div>
  </div>
);

export default function ParentDashboard() {
  // dashboardData will be populated from API; default to null/empty so UI shows empty state
  const [dashboardData, setDashboardData] = useState({
    studentName: '',
    attendancePercent: null, // number or null
    feesDue: null, // amount or null
    latestResult: null, // string or null
    noticesCount: null,
    announcementsCount: null
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchDashboard() {
      setLoading(true);
      setError(null);

      try {
        // Single empty API endpoint for parent dashboard (replace with real endpoints)
        const res = await fetch('/api/parent/dashboard');

        if (!res.ok) {
          // If API is empty/unavailable, keep defaults (empty state)
          if (mounted) setLoading(false);
          return;
        }

        const data = await res.json();

        if (mounted) {
          /* Expected data shape (example):
             { studentName: 'John Doe', attendancePercent: 92, feesDue: 2500, latestResult: 'A', noticesCount: 2, announcementsCount: 1 }
             If API returns different structure, adapt mapping here.
          */
          setDashboardData({
            studentName: data.studentName ?? '',
            attendancePercent: 'attendancePercent' in data ? data.attendancePercent : null,
            feesDue: 'feesDue' in data ? data.feesDue : null,
            latestResult: data.latestResult ?? null,
            noticesCount: 'noticesCount' in data ? data.noticesCount : null,
            announcementsCount: 'announcementsCount' in data ? data.announcementsCount : null
          });
          setLoading(false);
        }
      } catch  {
        if (mounted) {
          setError('Unable to fetch data');
          setLoading(false);
        }
      }
    }

    fetchDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="parent-dashboard">
      <div className="dashboard-header">
        <h1>Parent Dashboard</h1>
        <p>Overview for {dashboardData.studentName || 'your child'}</p>
      </div>

      {loading ? (
        <div className="loading">Loading parent dashboard...</div>
      ) : (
        <>
          {error && <div className="error">{error}</div>}

          <div className="stats-grid">
            <DashboardCard
              title="Attendance"
              value={dashboardData.attendancePercent !== null ? `${dashboardData.attendancePercent}%` : null}
              hint={dashboardData.attendancePercent === null ? 'No attendance data' : 'Percentage present this term'}
              icon="📈"
              bgClass="bg-blue"
              borderClass="border-blue"
            >
              <button className="small-btn">View Attendance</button>
            </DashboardCard>

            <DashboardCard
              title="Fees Due"
              value={dashboardData.feesDue !== null ? `₹ ${dashboardData.feesDue}` : null}
              hint={dashboardData.feesDue === null ? 'No billing info' : 'Total outstanding fees'}
              icon="💳"
              bgClass="bg-purple"
              borderClass="border-purple"
            >
              <div className="card-actions">
                <button className="small-btn">Pay Now</button>
                <button className="ghost-btn">Fee History</button>
              </div>
            </DashboardCard>

            <DashboardCard
              title="Result"
              value={dashboardData.latestResult ?? null}
              hint={dashboardData.latestResult ? 'Latest exam grade' : 'No results yet'}
              icon="🏆"
              bgClass="bg-orange"
              borderClass="border-orange"
            >
              <button className="small-btn">View Report</button>
            </DashboardCard>

            <DashboardCard
              title="Notices"
              value={dashboardData.noticesCount !== null ? dashboardData.noticesCount : null}
              hint={dashboardData.noticesCount === null ? 'No notices' : 'School notices for parents'}
              icon="📌"
              bgClass="bg-red"
              borderClass="border-red"
            >
              <button className="small-btn">Open Notices</button>
            </DashboardCard>

            <DashboardCard
              title="Announcements"
              value={dashboardData.announcementsCount !== null ? dashboardData.announcementsCount : null}
              hint={dashboardData.announcementsCount === null ? 'No announcements' : 'Important messages'}
              icon="📢"
              bgClass="bg-green"
              borderClass="border-green"
            >
              <button className="small-btn">Open Announcements</button>
            </DashboardCard>
          </div>

          <div className="classes-section">
            <div className="section-header">
              <h2>Recent Summary</h2>
              <button className="view-all-btn">View All →</button>
            </div>

            <div className="summary-grid">
              <div className="summary-card">
                <h3>Attendance</h3>
                <p className="summary-value">{dashboardData.attendancePercent !== null ? `${dashboardData.attendancePercent}%` : 'No data'}</p>
                <p className="summary-desc">Overall presence this term</p>
              </div>

              <div className="summary-card">
                <h3>Fees</h3>
                <p className="summary-value">{dashboardData.feesDue !== null ? `₹ ${dashboardData.feesDue}` : 'No data'}</p>
                <p className="summary-desc">Outstanding fees</p>
              </div>

              <div className="summary-card">
                <h3>Result</h3>
                <p className="summary-value">{dashboardData.latestResult ?? 'No data'}</p>
                <p className="summary-desc">Most recent exam</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
