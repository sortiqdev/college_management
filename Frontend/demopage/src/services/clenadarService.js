// src/services/calendarService.js

export  const getEvents = async () => {
  return [
    {
      title: "Diwali Holiday",
      start: "2026-11-12",
      color: "#ff4d4f"
    },
    {
      title: "Mid Term Exam",
      start: "2026-11-20",
      color: "#faad14"
    },
    {
      title: "Sports Day",
      start: "2026-11-25",
      color: "#1890ff"
    }
  ];
};

export const createEvent = async (eventData) => {
  console.log("New Event Created:", eventData);

  // later this will call backend API
  return {
    success: true
  };
};