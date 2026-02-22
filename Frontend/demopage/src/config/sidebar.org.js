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
  Building2,
  Bus,
  Library,
  Settings,
  Users,
  GraduationCap,
  School,
  UserCog,
} from "lucide-react";

export const ORG_MENU = (role) => [
  // ================= DASHBOARD =================
  {
    key: "home",
    label: "Dashboard",
    path: `/dashboard/${role}`,
    icon: LayoutDashboard,
  },

  // ================= ACADEMIC =================
  {
    key: "students",
    label: "Students",
    path: `/dashboard/${role}/students`,
    icon: GraduationCap,
  },
  {
    key: "teachers",
    label: "Teachers",
    path: `/dashboard/${role}/teachers`,
    icon: Users,
  },
  {
    key: "attendance",
    label: "Attendance",
    path: `/dashboard/${role}/attendance`,
    icon: ClipboardCheck,
  },
  {
    key: "syllabus",
    label: "Syllabus",
    path: `/dashboard/${role}/syllabus`,
    icon: BookOpen,
  },
  {
    key: "timetable",
    label: "Timetable",
    path: `/dashboard/${role}/timetable`,
    icon: CalendarDays,
  },
  {
    key: "assignments",
    label: "Assignments",
    path: `/dashboard/${role}/assignments`,
    icon: FileText,
  },
  {
    key: "result",
    label: "Results",
    path: `/dashboard/${role}/result`,
    icon: BarChart3,
  },

  // ================= COMMUNICATION =================
  {
    key: "announcement",
    label: "Announcements",
    path: `/dashboard/${role}/announcement`,
    icon: Megaphone,
  },
  {
    key: "notice",
    label: "Notices",
    path: `/dashboard/${role}/notice`,
    icon: Bell,
  },

  // ================= FINANCE =================
  {
    key: "fees",
    label: "Fees Management",
    path: `/dashboard/${role}/fees`,
    icon: CreditCard,
  },

  // ================= FACILITIES =================
  {
    key: "library",
    label: "Library",
    path: `/dashboard/${role}/library`,
    icon: Library,
  },
  {
    key: "transport",
    label: "Transport",
    path: `/dashboard/${role}/transport`,
    icon: Bus,
  },
  {
    key: "hostel",
    label: "Hostel",
    path: `/dashboard/${role}/hostel`,
    icon: Building2,
  },

  // ================= ADMIN SETTINGS =================
  {
    key: "school",
    label: "School Management",
    path: `/dashboard/${role}/school`,
    icon: School,
  },
  {
    key: "user-management",
    label: "User Management",
    path: `/dashboard/${role}/user-management`,
    icon: UserCog,
  },
  {
    key: "settings",
    label: "Settings",
    path: `/dashboard/${role}/settings`,
    icon: Settings,
  },
];