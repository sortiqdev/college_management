import { createBrowserRouter } from "react-router-dom";
import DashboardRedirect from "../routes/DashboardRedirect"
/* =======================
   Layouts
======================= */
import AppLayout from "../layout/AppLayout";
import OrgLayout from "../layout/OrgLayout";




/* =======================
   Public Pages
======================= */
import Home from "../page/public/home/Home";
import About from "../page/public/about/About";
import Contact from "../page/public/contact/Contact";
import Blog from "../page/public/blog/Blog";
import Login from "../page/public/login/Login";
import Module from "../page/public/module/Module";

/* =======================
   Org Dashboard
======================= */
import Student from "../page/dashboard/academic/Student";
import Teacher from "../page/dashboard/academic/Teacher";
import Parent from "../page/dashboard/academic/Parent";

/* =======================
   Admin
======================= */
import Admin from "../page/dashboard/admin/Admin";

/* =======================
   Master
======================= */

// (Optional future page)
// import OrganizationList from "../page/dashboard/masterpanel/page/organizations/OrganizationList";
// =======================
// STUDENT MODULE IMPORTS
// =======================

import Attendance from "../page/dashboard/academic/components/attendance/Attendance";
import AttendanceView from "../page/dashboard/academic/components/attendance/AttendanceView";
import AttendanceCreate from "../page/dashboard/academic/components/attendance/AttendanceCreate";

import Homework from "../page/dashboard/academic/components/homework/Homework";
import HomeworkView from "../page/dashboard/academic/components/homework/HomeworkView";
import HomeworkCreate from "../page/dashboard/academic/components/homework/HomeworkCreate";

import Announcement from "../page/dashboard/academic/components/announcement/Announcement";
import AnnouncementView from "../page/dashboard/academic/components/announcement/AnnouncementView";
import AnnouncementCreate from "../page/dashboard/academic/components/announcement/AnnoucementCreate";

import Notice from "../page/dashboard/academic/components/notice/Notice";
import NoticeView from "../page/dashboard/academic/components/notice/NoticeView";   
import NoticeCreate from "../page/dashboard/academic/components/notice/NoticeCreate";

import Result from "../page/dashboard/academic/components/result/Result";
import ResultView from "../page/dashboard/academic/components/result/ResultView";

import FeeLedger from "../page/dashboard/academic/components/fees/FeeLedger";
import FeesView from "../page/dashboard/academic/components/fees/FeesView";
import FeesManage from "../page/dashboard/academic/components/fees/FeesManage";
import ResultEdit from "../page/dashboard/academic/components/result/ResultEdit"; 
import Syllabus from "../page/dashboard/academic/components/syllabus/Syllabus";
import SyllabusView from "../page/dashboard/academic/components/syllabus/SyllabusView";
import SyllabusUpload from "../page/dashboard/academic/components/syllabus/SyllabusUpload";

import Timetable from "../page/dashboard/academic/components/timetable/Timetable";
import TimetableView from "../page/dashboard/academic/components/timetable/TimetableView";
import TimetableCreate from "../page/dashboard/academic/components/timetable/TimetableCreate";
import User from "../page/dashboard/admin/components/users/User";
import UserList from "../page/dashboard/admin/components/users/UserList";
import UserCreate from "../page/dashboard/admin/components/users/UserCreate";
import Hostel from "../page/dashboard/academic/components/hostel/hostel";
import HostelView from "../page/dashboard/academic/components/hostel/hostelView";

import Profile from "../page/dashboard/academic/components/profile/Profile";
import ProfileEdit from "../page/dashboard/academic/components/profile/ProfileEdit";
import ProfileView from "../page/dashboard/academic/components/profile/ProfileView";
import Departments from "../page/dashboard/admin/components/departments/Department";
import DepartmentCreate from "../page/dashboard/admin/components/departments/DepartmentCreate";
import DepartmentList from "../page/dashboard/admin/components/departments/DepartmentList";

/* =======================


 import AcademicDashboard from "../page/dashboard/academic/AcademicDashboard";
/* =======================
   SuperAdmin
======================= */
import SuperAdmin from "../page/dashboard/superadmin/SuperAdmin";
import AdminDashboard from "../page/dashboard/admin/AdminDashboard";
import TeacherDashboard from "../page/dashboard/academic/TeacherDashboard";
import ParentDashboard from "../page/dashboard/academic/ParentDashboard";
import SuperAdminDashboard from "../page/dashboard/superadmin/SuperAdminDashboard";
import AcademicDashboard from "../page/dashboard/academic/AcademicDashboard";
import Library from "../page/dashboard/academic/components/library/library";
import LibraryReports from "../page/dashboard/academic/components/library/libraryReports";
import LibraryCreate from "../page/dashboard/academic/components/library/libraryCreate";
import LibraryView from "../page/dashboard/academic/components/library/libraryView";
import HostelCreate from "../page/dashboard/academic/components/hostel/hostelCreate";

const router = createBrowserRouter([
  /* 🌐 PUBLIC WEBSITE */
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "blog", element: <Blog /> },
      { path: "login", element: <Login /> },
      { path: "module", element: <Module /> },
    ],
  },

  /* 🏢 ORG DASHBOARD */
// routes/AppRoutes.jsx

{
  path: "/dashboard",
  element: <OrgLayout />,
  children: [
  {
      index: true,
      element: <DashboardRedirect />,
    },


 {
    path: "superadmin",
     element: <SuperAdmin />,

    children: [
      { index: true, element: <SuperAdminDashboard /> },
      { path: "profile", element: <ProfileView /> },
       { path: "notice", element: <NoticeCreate /> },
        { path: "announcement", element: <AnnouncementCreate /> },
{  path: "departments",
  element: <Departments />,
  children: [
    { index: true, element: <DepartmentList /> },
    { path: "add", element: <DepartmentCreate /> },
  ],
},          {
            path: "users",
            element: <User />,
            children: [
              { index: true, element: <UserList /> },
              { path: "add", element: <UserCreate /> },
            ],
          },
    ],
  },
   {
      path: "admin",
      element: <Admin />,
      children: [
        { index: true, element: <AdminDashboard /> },
        { path: "profile", element: <ProfileView /> },
        { path: "notice", element: <NoticeCreate /> },
        { path: "announcement", element: <Announcement/>,
          children:[
            {index:true, element:<AnnouncementView />},
            {path:"add", element:<AnnouncementCreate />}
          ]
         },
        { path: "departments",  element: <Departments />,
            children: [
             { index: true, element: <DepartmentList /> },
             { path: "add", element: <DepartmentCreate /> },
                  ],},
        { path: "users", element: <User />,
            children: [
             { index: true, element: <UserList /> },
            { path: "add", element: <UserCreate /> },
                 ], },
       {path:"library", element:<Library  />,
            children:[
              {index: true, element: <LibraryCreate />},
              {path:"reports" , element: <LibraryReports />}
            ]
        }
      ],
    },


    // =========================
    // 🎓 STUDENT ROUTES
    // =========================
    {
      path: "student",
      element: <Student />,
      children: [
        { index: true, element: <AcademicDashboard /> },

        { path: "attendance", element: <Attendance /> },
        { path: "attendance/view", element: <AttendanceView /> },

        { path: "homework", element: <Homework /> },
        { path: "homework/view", element: <HomeworkView /> },

        { path: "announcement", element: <Announcement /> },
        { path: "announcement/view", element: <AnnouncementView /> },
        {path:"notice", element:<Notice />,
          children:[
            {index:true, element:<NoticeView />},
          ]
        },
       {path:"hostel", element: <Hostel />,
          children:[
            {index: true, element: <HostelView />},]
       },

        { path: "results", element: <Result /> },
        { path: "results/view", element: <ResultView /> },
        {path: "library", element:<Library />,
          children:[
            {index: true , element: <LibraryView />}
          ]
        },
        { path: "fees", element: <FeeLedger /> },
        { path: "fees/view", element: <FeesView /> },

        { path: "syllabus", element: <Syllabus /> },
        { path: "syllabus/view", element: <SyllabusView /> },

        { path: "timetable", element: <Timetable /> },
        { path: "timetable/view", element: <TimetableView /> },

        { path: "profile", element: <Profile /> },
        { path: "profile/edit", element: <ProfileEdit /> },
      {path:"profile/view",
  element:<ProfileView  />},


     
      ],
    },

    // =========================
    // 👨‍🏫 TEACHER ROUTES
    // =========================
    {
      path: "teacher",
      element: <Teacher />,
      children: [
         { path: "fees", element: <FeesView /> },
        { index: true, element: <TeacherDashboard /> },
        { path: "attendance", element: <AttendanceCreate /> },
        { path: "homework", element: <HomeworkCreate /> },
        { path: "notice", element: <NoticeCreate /> },
        { path: "announcement", element: <AnnouncementCreate /> },
           { path: "syllabus", element: <SyllabusUpload />,
            children:[
               { path: "syllabus/view", element: <SyllabusView /> },
            ]
            },
          
        { path: "results", element: <ResultEdit /> },
      {path: "hostel", element: <Hostel />,
          children: [
            { index: true, element: <HostelView /> },
            { path: "management", element: <HostelCreate /> }
          ]
        }
,
        { path: "timetable", element: <TimetableCreate /> },
        { path: "profile", element: <Profile /> },
     {
      path: "library",
      element: <Library />,
      children: [
        { index: true, element: <LibraryView /> },
        { path: "add", element: <LibraryCreate /> },  // match sidebar
        { path: "reports", element: <LibraryReports /> }
      ]
    },
      ],
    },

    // =========================
    // 👨‍👩‍👧 PARENT ROUTES
    // =========================
    {
      path: "parent",
      element: <Parent />,
      children: [
        { index: true, element: <ParentDashboard /> },
        { path: "attendance", element: <AttendanceView /> },
       
        { path: "announcement", element: <AnnouncementView /> },
         { path: "notice", element: <NoticeView /> },
        { path: "results", element: <ResultView /> },
        { path: "fees", element: <FeesView /> },
        { path: "profile", element: <ProfileView /> },
      ],
    },
  ],
},


  /* 🛠 ADMIN */


  /* 👑 SUPER ADMIN */
  {
    path: "/superadmin",
     element: <OrgLayout />,

    children: [
      { index: true, element: <SuperAdminDashboard /> },
      { path: "profile", element: <ProfileView /> },
       { path: "notice", element: <NoticeCreate /> },
        { path: "announcements", element: <AnnouncementCreate /> },
    ],
  },

  /* 👑 MASTER PANEL */
  
]);

export default router;
