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
  ShieldCheck,
  FileSearch,
  BadgeCheck,
  Wallet,
} from "lucide-react";

export const ORG_MENU = (role) => [
  // ================= COMMON =================
  {
    key: "dashboard",
    label: "Dashboard",
    path: `/dashboard/${role}`,
    icon: LayoutDashboard,
  },
  



  // ================= ACADEMICS =================
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
    path: `/dashboard/${role}/homework`,
    icon: FileText,
  },
  {
    key: "attendance",
    label: "Attendance",
    path: `/dashboard/${role}/attendance`,
    icon: ClipboardCheck,
  },
  {
    key: "result",
    label: "Results",
    path: `/dashboard/${role}/result`,
    icon: BarChart3,
  },
 
{
  key: "users",
  label: "User Management",
  icon: Users,
  children: [
    {
      key: "user-list",
      label: "User List",
      path: `/dashboard/${role}/users`,
      icon: Users,
    },
    {
      key: "user-create",
      label: "Create User",
      path: `/dashboard/${role}/users/add`,
      icon: UserCog,
    }
  ]
},
  // ================= SECURITY =================
  {
    key: "roles-permissions",
    label: "Roles & Permissions",
    path: `/dashboard/${role}/roles-permissions`,
    icon: ShieldCheck,
  },
  // ================= COMMUNICATION =================
  {
    key: "announcement",
    label: "Announcements",
    path: `/dashboard/${role}/announcement`,
    icon: Megaphone,
  },
   {
  key: "departments",
  label: "Departments",
  icon: Building2,
 
  children: [
    {
      key: "department-list",
      label: "Department List",
      path: `/dashboard/${role}/departments`,
     
    },
    {
      key: "department-create",
      label: "Create Department",
      path: `/dashboard/${role}/departments/add`,
 
    },
  ],
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
  {
    key: "billing",
    label: "Billing & Subscription",
    path: `/dashboard/${role}/billing`,
    icon: Wallet,
  },
  {
    key: "payroll",
    label: "Payroll",
    path: `/dashboard/${role}/payroll`,
    icon: BadgeCheck,
  },

  // ================= FACILITIES =================
  {
    key: "library",
    label: "Library",
    
    icon: Library,
      children: [
        {
          key: "library-view",
          label: "View Books",
          path : `/dashboard/${role}/library`,
        },
        {
          key: "library-create",
          label: "Add Books",
          path : `/dashboard/${role}/library/add`,
        },
        {
          key: "library-reports", 
          label: "Library Reports",
          path : `/dashboard/${role}/library/reports`,
        }
      ],
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

  // ================= ORGANIZATION =================
  {
    key: "school",
    label: "School Management",
    path: `/dashboard/${role}/school`,
    icon: School,
  },
  {
    key: "organization-profile",
    label: "Organization Profile",
    path: `/dashboard/${role}/organization-profile`,
    icon: Building2,
  },

  // ================= USER MANAGEMENT =================
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
    key: "admins",
    label: "Admins",
    path: `/dashboard/${role}/admins`,
    icon: UserCog,
  },

  {
    key: "audit-logs",
    label: "Audit Logs",
    path: `/dashboard/${role}/audit-logs`,
    icon: FileSearch,
  },
  {
    key: "security-settings",
    label: "Security Settings",
    path: `/dashboard/${role}/security-settings`,
    icon: Settings,
  },

  // ================= REPORTING =================
  {
    key: "reports",
    label: "Reports",
    path: `/dashboard/${role}/reports`,
    icon: BarChart3,
  },
   {
    key: "profile",
    label: "Profile",
    path: `/dashboard/${role}/profile`,
    icon: UserCog,
  },
];