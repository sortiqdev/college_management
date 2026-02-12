import {
  LayoutDashboard,
  ClipboardCheck,
  BookOpen,
  CalendarDays,
  FileText,
  Megaphone,
  Bell,
  BarChart3,
  CreditCard,
  User
} from "lucide-react";

export const ORG_MENU = [
  {
    key: "home",
    label: "Dashboard",
    path: "/dashboard/student",
    icon: LayoutDashboard,
  },
  {
    key: "attendance",
    label: "Attendance",
    path: "/dashboard/student/attendance",
    icon: ClipboardCheck,
  },
  {
    key: "syllabus",
    label: "Syllabus",
    path: "/dashboard/student/syllabus",
    icon: BookOpen,
  },
  {
    key: "timetable",
    label: "Timetable",
    path: "/dashboard/student/timetable",
    icon: CalendarDays,
  },
  {
    key: "homework",
    label: "Assignments",
    path: "/dashboard/student/homework",
    icon: FileText,
  },
  {
    key: "announcement",
    label: "Announcements",
    path: "/dashboard/student/announcements",
    icon: Megaphone,
  },
  {
    key: "notice",
    label: "Notices",
    path: "/dashboard/student/notices",
    icon: Bell,
  },
  {
    key: "result",
    label: "Results",
    path: "/dashboard/student/results",
    icon: BarChart3,
  },
  {
    key: "fees",
    label: "Fees",
    path: "/dashboard/student/fees",
    icon: CreditCard,
  },
  {
    key: "profile",
    label: "Profile",
    path: "/dashboard/student/profile",
    icon: User,
  },
];
