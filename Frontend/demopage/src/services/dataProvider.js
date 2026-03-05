import API from "./api";

// 🔥 Import your mock data here
import { STUDENT_DATA } from "../mock/mockData";

export const getStudentDashboard = async () => {
  try {
    const res = await API.get("/student/dashboard");
    return res.data;
  } catch  {
    console.log("Backend not ready — using mock data");
    return STUDENT_DATA.dashboard; // fallback
  }
};

export const getStudentAttendance = async () => {
  try {
    const res = await API.get("/student/attendance");
    return res.data;
  } catch {
     console.log("Backend not ready — using mock data");
    return STUDENT_DATA.attendance;
  }
};

export const getStudentAssignments = async () => {
  try {
    const res = await API.get("/student/assignments");
    return res.data;
  } catch {
    return STUDENT_DATA.assignments;
  }
};

export const getStudentProfile = async () => {
  try {
    const res = await API.get("/student/profile");  
    return res.data;
    } catch {
             console.log("Backend not ready — using mock data");
    return STUDENT_DATA.profile;
  }
};

export const getStudentSyllabus = async () => {
  try {
    const res = await API.get("/student/syllabus"); 
    return res.data;
    } catch {
    return STUDENT_DATA.syllabus;
    }
};

export const getStudentTimetable = async () => {
  try {
    const res = await API.get("/student/timetable"); 
    return res.data;
    } catch {
    return STUDENT_DATA.timetable;
  }
};

export const getStudentResults = async () => {
  try {
    const res = await API.get("/student/results");
    return res.data;
  }
    catch {
    return STUDENT_DATA.results;
  }
};

export const getStudentFees = async () => {
  try {
    const res = await API.get("/student/fees");
    return res.data;
  } catch {
    console.log("Backend not ready — using mock data")
    return STUDENT_DATA.fees;
  }
};

export const getStudentTransport = async () => {
  try {
    const res = await API.get("/student/transport");
    return res.data;
  } catch {
    console.log("Backend not ready — using mock data for transport");
    // fallback to fees.transport if transport endpoint not available
    return STUDENT_DATA.fees.transport;
  }
};

export const getStudentHomework = async ()=>{
  try{
     const res = await API.get("/student/homework");
     return res.data;
  }catch{
        console.log("Backend not ready — using mock data")
        return STUDENT_DATA.homework
  }
}
