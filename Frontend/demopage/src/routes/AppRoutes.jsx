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
import Role from "../page/dashboard/admin/components/roles/Role";
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
import Transport from "../page/dashboard/academic/components/transport/transport";
import TransportView from "../page/dashboard/academic/components/transport/transportView";
import TransportCreate from "../page/dashboard/academic/components/transport/transportCreate";
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

import Reports from "../page/dashboard/admin/components/reports/Reports";
import AcademicReport from "../page/dashboard/admin/components/reports/AcademicReport";

/* =======================
/* ========================
   admin academic
   ======================= */
import AcademicData from "../page/dashboard/admin/components/academic/AcademicData";
import AcademicCalendar from "../page/dashboard/admin/components/academic/calender/AcademicCalendar";
import AcademicTimetable from "../page/dashboard/admin/components/academic/timetable/AcademicTimetable";
import AcademicSubject from "../page/dashboard/admin/components/academic/subjects/AcademicSubject";
import AcademicSemester from "../page/dashboard/admin/components/academic/semester/AcademicSemester";
import AcademicClass from "../page/dashboard/admin/components/academic/classes/AcademicClass";
import AcademicSection from "../page/dashboard/admin/components/academic/sections/AcademicSection";
import AcademicProgram from "../page/dashboard/admin/components/academic/programs/AcademicProgram";
import AcademicAssign from "../page/dashboard/admin/components/academic/assign/AcademicAssign";
import AcademicYear from "../page/dashboard/admin/components/academic/years/AcademicYear";
/* =======================
   SuperAdmin
======================= */
import AdminManagement from "../page/dashboard/superadmin/components/admin/AdminManagement";
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
import FeeReport from "../page/dashboard/admin/components/reports/FeeReport";
import PayrollReport from "../page/dashboard/admin/components/reports/PayrollReport";

import Payroll from "../page/dashboard/admin/components/payroll/Payroll";
import PayrollApproval from "../page/dashboard/admin/components/payroll/PayrollApproval";
import TeacherPayroll from "../page/dashboard/admin/components/payroll/TeacherPayroll";
import StudentFees from  "../page/dashboard/admin/components/payroll/StudentPayroll";
import SalaryStructure from "../page/dashboard/admin/components/payroll/SalaryStructure";
import PayrollChangeRequest from "../page/dashboard/admin/components/payroll/PayrollChangeRequest"
import Fees from "../page/dashboard/admin/components/fees/fees";
import FessStructure from "../page/dashboard/admin/components/fees/FessStructure";
import FeeProgramMap from "../page/dashboard/admin/components/fees/FeeProgramMap";
import FeesAdmin from "../page/dashboard/admin/components/fees/FeesAdmi";
import Billing from "../page/dashboard/superadmin/components/billing&subscriptions/billing";
import Students from "../page/dashboard/superadmin/components/student/Student";
import TeacherOverview from "../page/dashboard/superadmin/components/teacher/TeacherOverview";
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
  {
    path: "/dashboard",
    element: <OrgLayout />,
    children: [
      { index: true, element: <DashboardRedirect /> },
      
      {
        path: "superadmin",
        element: <SuperAdmin />,
    children: [
      { index: true, element: <SuperAdminDashboard /> },
      { path: "profile", element: <ProfileView /> },
      { path: "notice", element: <NoticeCreate /> },
      { path: "announcement", element: <AnnouncementCreate /> },
      {path: "students", element : <Students />},
      {path:"teachers", element: <TeacherOverview />},
      {path:"admins",element:<AdminManagement />},
      {  path: "departments", element: <Departments />,
          children: [
             { index: true, element: <DepartmentList /> },
             { path: "add", element: <DepartmentCreate /> },
                     ],},
      { path: "users", element: <User />,
            children: [
              { index: true, element: <UserList /> },
              { path: "add", element: <UserCreate /> },
            ],},
               { path: "billing", element: <Billing /> }


               ],},

      {
        path: "admin",
        element: <Admin />,
           children: [
        { index: true, element: <AdminDashboard /> },
        {path:"academic", element: <AcademicData />,
          children: [
            {path:"calender", element: <AcademicCalendar />},
            {path: "timetable", element: <AcademicTimetable />},
            {path: "subject", element: <AcademicSubject />},
            {path: "semester", element: <AcademicSemester />},
            {path: "class", element: <AcademicClass />},
            {path: "section", element: <AcademicSection />},
            {path: "program", element: <AcademicProgram />},
            {path: "assign", element: <AcademicAssign />},
            {path: "year", element: <AcademicYear />},
          ]        },
        {  path: "reports",  element: <Reports />,
  children: [
       {index:"true" ,        element:  <AcademicReport />   },
       {      path: "fees",      element: <FeeReport />,    },
       {      path: "payroll",      element: <PayrollReport />,    },
  ],},
        { path: "profile", element: <ProfileView /> },
        { path: "notice", element: <NoticeCreate /> },
        {path: "role" , element:<Role />},
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
      {
 path:"library",
 element:<Library />,
 children:[
   {index:true, element:<LibraryView/>},
   {path:"add", element:<LibraryCreate/>},
   {path:"reports", element:<LibraryReports/>}
 ]
},
  {
  path: "payroll",
  element: <Payroll />,
  children: [
    {      path: "teacher-payroll",      element: <TeacherPayroll />    },
    {      path: "salary-structure",      element: <SalaryStructure />    },
    {      path: "approval",      element: <PayrollApproval />    },
    {      path: "change-request",      element: <PayrollChangeRequest />    },
    {      path: "student-fees",      element: <StudentFees />    }  ]},
{
  path: "fees",
  element: <Fees />,
  children: [
    { path: "structure", element: <FessStructure /> },
    { path: "program-map", element: <FeeProgramMap /> },
    { path: "collection", element: <FeesAdmin /> },
  ],
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

        { path: "announcement", element: <Announcement />, 
          children:[ {index:true, element:<AnnouncementView />},]},
        
      

        {path:"notice", element:<Notice />,
          children:[ {index:true, element:<NoticeView />}, ] },

        {path:"hostel", element: <Hostel />,
          children:[ {index: true, element: <HostelView />},] },

        { path: "transport", element: <Transport />, 
          children: [ { index: true, element: <TransportView /> } ] },

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
            children:[{ path: "syllabus/view", element: <SyllabusView /> },] }, 
        { path: "results", element: <ResultEdit /> },
        {path: "hostel", element: <Hostel />,
          children: [ { index: true, element: <HostelView /> },
                      { path: "management", element: <HostelCreate /> }]},
        { path: "timetable", element: <TimetableCreate /> },
        { path: "profile", element: <Profile /> },
        {path: "library", element:<Library />,
          children:[
            {index: true , element: <LibraryView />},
            {path:"add", element:<LibraryCreate />},
            {path:"reports", element:<LibraryReports />}]},
        {path:"transport", element:<Transport />,
          children:[
            {index: true, element:<TransportView />},
            {path:"management", element:<TransportCreate />}
      ],
    },] },
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

]);

export default router;
