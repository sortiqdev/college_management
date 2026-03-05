
import API from "../../../../../services/api";
import "./Profile.css";
import { useAuth } from "../../../../../hooks/useAuth";
import { useUser } from "../../../../../hooks/useUser";



export default function ProfileView() {
    // console.log("ROLE:", role);
    const { role } = useAuth();

 
   const  {user} =  useUser();




  return (
    <div className="profile-container">

      {/* LEFT CARD */}
     <div className="profile-left">
      <div className="profile-avatar"></div>
<h3>{user?.firstname} {user?.lastname}</h3>
<p className="profile-role">{role?.toUpperCase()}</p>

      <p>
        {role === "student" && `Roll No: ${user?.rollnumber || "----"}`}
        {role === "teacher" && `Employee ID: ${user?.employeeId || "----"}`}
        {role === "parent" && `Parent ID: ${user?.parentId || "----"}`}
      </p>

      <p>
        {role === "student" && `Class: ${user?.department || "----"}`}
        {role === "teacher" && `Department: ${user?.department || "----"}`}
      </p>
    </div>
      {/* RIGHT SIDE */}
      <div className="profile-right">

        {/* STUDENT */}
    {role === "student" && (
  <>
    <Section title="Student Details">
      <Row label="Name" value={user?.firstname} />
      <Row label="D.O.B" value={user?.dateofbirth} />
      <Row label="Email" value={user?.email} />
      <Row label="Contact" value={user?.phone} />
      <Row label="State" value={user?.state} />
      <Row label="City" value={user?.city} />
    </Section>

    <Section title="Parent Details">
      <Row label="Father Name" value={user?.fathername} />
      <Row label="Mother Name" value={user?.mothername} />
      <Row label="Guardian Contact" value={user?.parentphone} />
    </Section>
  </>
)}


        {/* TEACHER */}
        {role === "teacher" && (
          <Section title="Teacher Details">
            <Row label="Name" value={user?.name} />
            <Row label="Employee ID" value={user?.employeeId} />
            <Row label="Department" value={user?.department} />
             <Row label="Designation" value={user?.designation} />
            <Row label="Qualification" value={user?.qualification} />
            <Row label="Experience" value={user?.experience} />
          </Section>
        )}

        {/* PARENT */}
        {role === "parent" && (
          <>
            <Section title="Parent Information">
              <Row label="Name" value={user?.name} />
              <Row label="Email" value={user?.email} />
              <Row label="Mobile" value={user?.mobile} />
            </Section>

            <Section title="Child Information">
              <Row label="Student Name" value={user?.child?.name} />
              <Row label="Class" value={user?.child?.className} />
              <Row label="Roll No" value={user?.child?.rollNumber} />
            </Section>
          </>
        )}

        {role=== "admin"&&(
<>

<Section title="Admin Information">
      <Row label="Name" value={`${user?.firstname} ${user?.lastname}`} />
      <Row label="Email" value={user?.email} />
      <Row label="Phone" value={user?.phone} />
      <Row label="Department" value={user?.department} />
      <Row label="Designation" value={user?.designation || "Administrator"} />
    </Section>

    <Section title="Organization Details">
      <Row label="Organization Name" value={user?.organizationName} />
      <Row label="Organization ID" value={user?.organizationId} />
      <Row label="Address" value={user?.address} />
      <Row label="City" value={user?.city} />
      <Row label="State" value={user?.state} />
    </Section>

    <Section title="Account Details">
      <Row label="Role" value="Admin" />
      <Row label="Account Status" value="Active" />
      <Row label="Created At" value={user?.createdAt} />
    </Section>

</>

        )}
        {role === "superadmin" && (
  <>
    <Section title="Super Admin Details">
      <Row label="Name" value={`${user?.firstname} ${user?.lastname}`} />
      <Row label="Email" value={user?.email} />
      <Row label="Phone" value={user?.phone} />
      <Row label="Super Admin ID" value={user?.superAdminId} />
    </Section>

    <Section title="Platform Control">
      <Row label="Role" value="Super Admin" />
      <Row label="System Access" value="Full Access" />
      <Row label="Managed Organizations" value={user?.orgCount || "All"} />
    </Section>

    <Section title="System Information">
      <Row label="Last Login" value={user?.lastLogin} />
      <Row label="Account Status" value="Active" />
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
