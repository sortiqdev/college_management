import React from "react";
import LibraryCreate from "./libraryCreate";
import LibraryView from "./libraryView";
import LibraryReports from "./libraryReports";

export default function Library({ role }) {
  return (
    <div style={{ padding: 20 }}>
      {role === "teacher" && <LibraryCreate />}
      <LibraryView role={role} />
      {role === "admin" && <LibraryReports />}
    </div>
  );
}