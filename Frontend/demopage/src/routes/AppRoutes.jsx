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
import Home from "../page/Public/Home/Home.jsx";
import About from "../page/Public/About/About";
import Contact from "../page/Public/Contact/Contact";
import Blog from "../page/Public/Blog/Blog";
import Login from "../page/Public/Login/Login";
import Module from "../page/Public/Module/Module";

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
import MasterPanel from "../page/dashboard/masterpanel/MasterPannel";
import RegisterOrg from "../page/dashboard/masterpanel/page/organizations/RegisterOrg";
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
        { path: "announcements", element: <AnnouncementCreate /> },
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
        { path: "announcements", element: <AnnouncementCreate /> },
        {
  path: "departments",
  element: <Departments />,
  children: [
    { index: true, element: <DepartmentList /> },
    { path: "add", element: <DepartmentCreate /> },
  ],
},
{
            path: "users",
            element: <User />,
            children: [
              { index: true, element: <UserList /> },
              { path: "add", element: <UserCreate /> },
            ],
          },
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

        { path: "announcements", element: <Announcement /> },
        { path: "announcements/view", element: <AnnouncementView /> },

        { path: "notices", element: <Notice /> },

        { path: "results", element: <Result /> },
        { path: "results/view", element: <ResultView /> },

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
        { index: true, element: <TeacherDashboard /> },
        { path: "attendance", element: <AttendanceCreate /> },
        { path: "homework", element: <HomeworkCreate /> },
        { path: "notice", element: <NoticeCreate /> },
        { path: "announcements", element: <AnnouncementCreate /> },
           { path: "syllabus/upload", element: <SyllabusUpload /> },
           { path: "syllabus/view", element: <SyllabusView /> },
        { path: "results", element: <ResultEdit /> },
        { path: "timetable", element: <TimetableCreate /> },
        { path: "profile", element: <Profile /> },
     
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
