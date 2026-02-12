import React, { useEffect, useState } from "react";
import API from "../../../../../services/api";
import "./Profile.css";
import { useAuth } from "../../../../../Hooks/useAuth";

import { getStudentProfile } from "../../../../../services/dataProvider";


export default function ProfileView() {
    // console.log("ROLE:", role);
    const { role } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const res = await API.get("/profile"); 
        // backend should return role-based data
        // setData(res.data || null);
        const  result = await getStudentProfile();
setData(result);
      } catch (error) {
        console.log("Profile API not ready — showing empty state");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-right">
          <div className="profile-section">
            <div className="section-body">
              Loading profile...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">

      {/* LEFT CARD */}
     <div className="profile-left">
      <div className="profile-avatar"></div>

      <h3>{data?.name || "----"}</h3>

      <p>
        {role === "student" && `Roll No: ${data?.rollNumber || "----"}`}
        {role === "teacher" && `Employee ID: ${data?.employeeId || "----"}`}
        {role === "parent" && `Parent ID: ${data?.parentId || "----"}`}
      </p>

      <p>
        {role === "student" && `Class: ${data?.class || "----"}`}
        {role === "teacher" && `Department: ${data?.department || "----"}`}
      </p>
    </div>
      {/* RIGHT SIDE */}
      <div className="profile-right">

        {/* STUDENT */}
    {role === "student" && (
  <>
    <Section title="Student Details">
      <Row label="Name" value={data?.name} />
      <Row label="D.O.B" value={data?.dob} />
      <Row label="Email" value={data?.email} />
      <Row label="Contact" value={data?.phone} />
      <Row label="State" value={data?.state} />
      <Row label="City" value={data?.city} />
    </Section>

    <Section title="Parent Details">
      <Row label="Father Name" value={data?.parent?.fatherName} />
      <Row label="Mother Name" value={data?.parent?.motherName} />
      <Row label="Guardian Contact" value={data?.parent?.guardianPhone} />
    </Section>
  </>
)}


        {/* TEACHER */}
        {role === "teacher" && (
          <Section title="Teacher Details">
            <Row label="Name" value={data?.name} />
            <Row label="Employee ID" value={data?.employeeId} />
            <Row label="Department" value={data?.department} />
            <Row label="Qualification" value={data?.qualification} />
            <Row label="Experience" value={data?.experience} />
          </Section>
        )}

        {/* PARENT */}
        {role === "parent" && (
          <>
            <Section title="Parent Information">
              <Row label="Name" value={data?.name} />
              <Row label="Email" value={data?.email} />
              <Row label="Mobile" value={data?.mobile} />
            </Section>

            <Section title="Child Information">
              <Row label="Student Name" value={data?.child?.name} />
              <Row label="Class" value={data?.child?.className} />
              <Row label="Roll No" value={data?.child?.rollNumber} />
            </Section>
          </>
        )}

      </div>
    </div>
  );
}

/* Reusable Components */

function Section({ title, children }) {
  return (
    <div className="profile-section">
      <div className="section-header">{title}</div>
      <div className="section-body">{children}</div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="profile-row">
      <div className="profile-label">{label}</div>
      <div className="profile-value">{value || "----"}</div>
    </div>
  );
}
