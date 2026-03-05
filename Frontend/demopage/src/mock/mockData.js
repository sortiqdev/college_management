// ===============================
// STUDENT MOCK DATA
// ===============================

export const STUDENT_DATA = {
  profile: {
    name: "Tanav Bassi",
    rollNumber: "202300319",
    class: "B.Tech CSE - 8A",
    email: "tanav@gmail.com",
    phone: "9876543210",
    dob: "18-01-2001",
    state: "Himachal Pradesh",
    city: "Kangra",
    parent: {
      fatherName: "Bimal Bassi",
      motherName: "Beena Bassi",
      guardianPhone: "9876543210"
    }},



  dashboard: {
    rollNumber: "123654",
    class: "POLY Me - 6A",
    attendance: 87,
     name: "ABCD",
    email: "abcd@gmail.com",
    phone: "15987412",
      todayClasses: [
      {
        subject: "Data Structures",
        time: "09:00 AM - 10:00 AM",
        teacher: "Prof. Sharma"
      },
      {
        subject: "Operating Systems",
        time: "11:00 AM - 12:00 PM",
        teacher: "Dr. Mehta"
      },
      {
        subject: "Computer Networks",
        time: "01:00 PM - 02:00 PM",
        teacher: "Prof. Verma"
      }
    ],

    assignments: [
      {
        title: "DSA Linked List Implementation",
        status: "Pending",
        dueDate: "20 Feb 2026"
      },
      {
        title: "OS Process Scheduling Report",
        status: "Submitted",
        dueDate: "18 Feb 2026"
      },
      {
        title: "CN Routing Algorithms",
        status: "Pending",
        dueDate: "25 Feb 2026"
      }
    ]
  },

attendance: {
  overall: {
    total: 120,
    present: 104,
    percentage: 87
  },
  monthly: [
    {
      month: "January",
      total: 20,
      present: 18,
      percentage: 90
    },
    {
      month: "February",
      total: 22,
      present: 19,
      percentage: 86
    },
    {
      month: "March",
      total: 24,
      present: 21,
      percentage: 88
    }
  ]
},


  syllabus: [
    {
      id: 1,
      subject: "Data Structures",
      teacher: "Mr. Sharma",
      pdf: "/mock/ds.pdf",
    },
    {
      id: 2,
      subject: "Operating Systems",
      teacher: "Mrs. Mehta",
      pdf: "/mock/os.pdf",
    },
  ],

  timetable: [
    { day: "Monday", subject: "DS", time: "10:00 AM - 11:00 AM" },
    { day: "Monday", subject: "OS", time: "11:00 AM - 12:00 PM" },
    { day: "Tuesday", subject: "DBMS", time: "9:00 AM - 10:00 AM" },
  ],

  assignments: [
    {
      id: 1,
      subject: "Data Structures",
      title: "Linked List Implementation",
      dueDate: "2026-02-20",
      status: "Pending",
    },
    {
      id: 2,
      subject: "OS",
      title: "Deadlock Report",
      dueDate: "2026-02-25",
      status: "Submitted",
    },
  ],

  announcements: [
    { id: 1, title: "Mid Term Exams", date: "2026-03-01" },
    { id: 2, title: "Holiday Notice", date: "2026-02-18" },
  ],

  notices: [
    { id: 1, message: "Submit fee before 10th March." },
    { id: 2, message: "Attendance below 75% warning." },
  ],

  results: [
    { subject: "DS", marks: 85, grade: "A" },
    { subject: "OS", marks: 78, grade: "B+" },
    { subject: "DBMS", marks: 90, grade: "A+" },
  ],

   fees: {
    summary: {
      total: 50000,
      paid: 30000,
      due: 20000,
      fine: 500,
    },

    transport: {
      route: "Route 5",
      pickupPoint: "Main Chowk",
      timing: "7:30 AM",
      monthlyFare: 1500,
      // schedule of time at each stop along the route
      stops: [
        { name: "Main Chowk", time: "7:30 AM" },
        { name: "Central Park", time: "7:45 AM" },
        { name: "College Gate", time: "8:00 AM" },
      ],
      // attendance details – whether student boarded the assigned bus
      attendance: {
        status: "on_bus", // other values: "not_on_bus", "other_bus"
        busId: "Bus 5",
        // if student boarded a different bus, optionally record it
        otherBus: null,
        message: "You are on the correct bus."
      }
    },

    classOverview: []
  },
  homework: [
  {
    id: 1,
    title: "Data Structures Assignment",
    description: "Implement Singly Linked List with insert and delete operations.",
    subject: "Computer Science",
    className: "B.Tech CSE - 8A",
    dueDate: "25 Feb 2026",
    assignedBy: "Prof. Sharma",
    status: "Pending"
  },
  {
    id: 2,
    title: "Operating Systems Lab Work",
    description: "Write a C program to simulate FCFS scheduling algorithm.",
    subject: "Operating Systems",
    className: "B.Tech CSE - 8A",
    dueDate: "28 Feb 2026",
    assignedBy: "Dr. Mehta",
    status: "Submitted"
  },
  {
    id: 3,
    title: "Database Management System",
    description: "Design ER diagram for Library Management System.",
    subject: "DBMS",
    className: "B.Tech CSE - 8A",
    dueDate: "02 Mar 2026",
    assignedBy: "Ms. Gupta",
    status: "Pending"
  }
]

};



// ===============================
// TEACHER MOCK DATA
// ===============================

export const TEACHER_DATA = {
  profile: {
    name: "Rohit Sharma",
    employeeId: "TCH-101",
    department: "Computer Science",
    email: "rohit@school.com",
    phone: "9123456780",
  },

  classesAssigned: [
    { class: "B.Tech CSE - 8A", subject: "Data Structures" },
    { class: "B.Tech CSE - 7B", subject: "DBMS" },
  ],

  students: [
    { name: "Tanav Bassi", roll: "202300319" },
    { name: "Aman Verma", roll: "202300320" },
    { name: "Priya Singh", roll: "202300321" },
  ],

  syllabusUploaded: [
    { subject: "DS", file: "ds.pdf", date: "2026-01-10" },
  ],

  assignmentsCreated: [
    { title: "Linked List", class: "8A", due: "2026-02-20" },
  ],

  attendanceMarked: [
    { date: "2026-02-10", class: "8A", present: 45, absent: 5 },
  ],
};



// ===============================
// PARENT MOCK DATA
// ===============================

export const PARENT_DATA = {
  profile: {
    name: "XYZB ",
    childName: "ABCD",
    relation: "Father",
    phone: "9876540000",
    email: "xyzb@gmail.com",
  },

  childAttendance: {
    overall: 87,
  },

  childResults: [
    { subject: "DS", marks: 85 },
    { subject: "OS", marks: 78 },
  ],

  childFees: {
    total: 50000,
    paid: 30000,
    due: 20000,
  },

  announcements: [
    { id: 1, title: "PTM Meeting", date: "2026-03-05" },
  ],
};
