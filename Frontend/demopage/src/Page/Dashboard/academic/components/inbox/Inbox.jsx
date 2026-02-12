import React, { useState } from 'react'
import './Notifications.css'

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Assignment Submitted',
      message: 'Your Data Structures assignment has been successfully submitted.',
      type: 'success',
      date: '2026-02-07',
      read: false,
    },
    {
      id: 2,
      title: 'Grade Posted',
      message: 'Your Web Development project has been graded. Grade: A+',
      type: 'info',
      date: '2026-02-06',
      read: false,
    },
    {
      id: 3,
      title: 'Class Cancelled',
      message: 'Database Management class on 2026-02-08 has been cancelled.',
      type: 'alert',
      date: '2026-02-05',
      read: true,
    },
    {
      id: 4,
      title: 'Lab Report Deadline',
      message: 'Operating Systems lab report is due tomorrow by 5:00 PM.',
      type: 'warning',
      date: '2026-02-04',
      read: true,
    },
    {
      id: 5,
      title: 'Attendance Alert',
      message: 'Your attendance in Data Structures is below 75%. Please contact your instructor.',
      type: 'alert',
      date: '2026-02-03',
      read: true,
    },
  ])

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const handleDelete = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const getNotificationIcon = (type) => {
    const icons = {
      success: '✅',
      info: 'ℹ️',
      warning: '⚠️',
      alert: '🔴',
    }
    return icons[type] || '📧'
  }

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h1>🔔 Notifications</h1>
        <p>You have {notifications.filter((n) => !n.read).length} unread notifications</p>
      </div>

      <div className="notification-stats">
        <button className="stat-btn">All ({notifications.length})</button>
        <button className="stat-btn">Unread ({notifications.filter((n) => !n.read).length})</button>
        <button className="stat-btn">Success ({notifications.filter((n) => n.type === 'success').length})</button>
        <button className="stat-btn">Alert ({notifications.filter((n) => n.type === 'alert').length})</button>
      </div>

      <div className="notifications-list">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div key={notif.id} className={`notification-card ${notif.type} ${notif.read ? 'read' : 'unread'}`}>
              <div className="notification-icon">{getNotificationIcon(notif.type)}</div>
              <div className="notification-content">
                <h4>{notif.title}</h4>
                <p>{notif.message}</p>
                <span className="notification-date">📅 {notif.date}</span>
              </div>
              <div className="notification-actions">
                {!notif.read && (
                  <button className="btn-mark-read" onClick={() => handleMarkAsRead(notif.id)}>
                    Mark Read
                  </button>
                )}
                <button className="btn-delete" onClick={() => handleDelete(notif.id)}>
                  🗑️
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-notifications">
            <p>📭 No notifications yet!</p>
          </div>
        )}
      </div>
    </div>
  )
}
