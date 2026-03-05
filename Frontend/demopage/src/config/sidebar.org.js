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

export const ORG_MENU = (role) => {

  const isStudent = role === "student";

  return [

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

  // ================= USER MANAGEMENT =================
  {
    key: "departments",
    label: "Organization Mangement",
    icon: Users,
    children: [
       {
        key: "user-create",
        label: "Create User",
        path: `/dashboard/${role}/users/add`,
        icon: UserCog,
      },
       {
        key: "user-list",
        label: "User List",
        path: `/dashboard/${role}/users`,
        icon: Users,
      },
       {
        key: "academic-program",
        label: "Create Programs",
        path: `/dashboard/${role}/academic/program`,
      }, 
      {
        key: "department-create",
        label: "Create Department",
        path: `/dashboard/${role}/departments/add`,
      },
      {
        key: "department-list",
        label: "Department List",
        path: `/dashboard/${role}/departments`,
      },
     
    ],
  },


  // ================= SECURITY =================
  {
    key: "role",
    label: "Roles & Permissions",
    path: `/dashboard/${role}/role`,
    icon: ShieldCheck,
  },



    {
    key: "academic-data",
    label: "Academic Data",
    icon: BookOpen,
    children: [
      {
        key: "academic-calendar",
        label: "Academic Calendar",
        path: `/dashboard/${role}/academic/calender`,
      },
      {
        key: "academic-timetable",
        label: "Academic Timetable",
        path: `/dashboard/${role}/academic/timetable`,
      },
      {
        key: "academic-subject",
        label: "Subjects",
        path: `/dashboard/${role}/academic/subject`,
      },
     
      {
        key: "academic-semester",
        label: "Semesters",
        path: `/dashboard/${role}/academic/semester`,
      },
      {
        key: "academic-class",
        label: "Classes",
        path: `/dashboard/${role}/academic/class`,
      },
       {
        key: "academic-section",
        label: "Sections",
        path: `/dashboard/${role}/academic/section`,
      },
     
      {
        key: "academic-permissions",
        label: "Academic Permissions",
        path: `/dashboard/${role}/academic/permissions`,
      },
      {
        key: "academic-assign",
        label: "Assign Subjects",
        path: `/dashboard/${role}/academic/assign`,
      },
      {
        key: "academic-year",
        label: "Academic Year",
        path: `/dashboard/${role}/academic/year`,
      },
     
       
  
  
  ]},

  // ================= COMMUNICATION =================
  {
    key: "announcement",
    label: "Announcements",
    path: `/dashboard/${role}/announcement`,
    icon: Megaphone,
    children: [
      {
        key: "announcement-create",
        label: "Create Announcement",
        path: `/dashboard/${role}/announcement/add`,
      }
    ]
  },

 
  {
    key: "notice",
    label: "Notices",
    path: `/dashboard/${role}/notice`,
    icon: Bell,
  },

  // ================= FINANCE =================

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
    path: `/dashboard/${role}/library`,

    ...(!isStudent && {
      children: [
        {
          key: "library-view",
          label: "View Books",
          path: `/dashboard/${role}/library`,
        },
        {
          key: "library-create",
          label: "Add Books",
          path: `/dashboard/${role}/library/add`,
        },
        {
          key: "library-reports",
          label: "Library Reports",
          path: `/dashboard/${role}/library/reports`,
        }
      ]
    })
  },

  {
    key: "transport",
    label: "Transport",
    icon: Bus,
    path: `/dashboard/${role}/transport`,

    ...(!isStudent && {
      children: [
        {
          key: "transport-management",
          label: "Bus Management",
          path: `/dashboard/${role}/transport/management`,
        }
      ]
    })
  },

  {
    key: "hostel",
    label: "Hostel",
    icon: Building2,
    path: `/dashboard/${role}/hostel`,

    ...(!isStudent && {
      children: [
        {
          key: "hostel-management",
          label: "Hostel Management",
          path: `/dashboard/${role}/hostel/management`,
        }
      ]
    })
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

  // ================= STUDENTS / STAFF =================
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

  // ================= SECURITY =================
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
 
  icon: BarChart3,
children: [
  {
    key: "academic-reports",
    label: "Academic Reports",
    path: `/dashboard/${role}/reports`,
  },
  {
    key: "fee-reports",
    label: "Fee Reports",
    path: `/dashboard/${role}/reports/fees`,
  },
  {
    key: "payroll-reports",
    label: "Payroll Reports",
    path: `/dashboard/${role}/reports/payroll`,
  },
]
},
{
  key: "fees",
  label: "Fees Management",
  icon: CreditCard,
  children: [
    {
      key: "fees-structure",
      label: "Fees Structure",
      path: `/dashboard/${role}/fees/structure`,
    },
    {
      key: "fees-program-map",
      label: "Fee Program Map",
      path: `/dashboard/${role}/fees/program-map`,
    },
    {
      key: "fees-admin",
      label: "Fees Admin",
      path: `/dashboard/${role}/fees/collection`,
    },
  ],
},
{
  key: "payroll",
  label: "Payroll",
  icon: Wallet, // or DollarSign / CreditCard
  children: [
    {
      key: "teacher-payroll",
      label: "Teacher Payroll",
      path: `/dashboard/${role}/payroll/teacher-payroll`,
    },
    {
      key: "salary-structure",
      label: "Salary Structure",
      path: `/dashboard/${role}/payroll/salary-structure`,
    },
    {
      key: "approval",
      label: "Payroll Approval",
      path: `/dashboard/${role}/payroll/approval`,
    },
    {
      key: "change-request",
      label: "Change Requests",
      path: `/dashboard/${role}/payroll/change-request`,
    },
    {
      key: "student-fees",
      label: "Student Fees",
      path: `/dashboard/${role}/payroll/student-fees`,
    },
  ],
},
  {
    key: "profile",
    label: "Profile",
    path: `/dashboard/${role}/profile`,
    icon: UserCog,
  },

];
};