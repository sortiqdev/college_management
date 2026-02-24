import { Outlet } from "react-router-dom";

const Department = () => {
  return (
    <div>
      <h2>Departments</h2>
      <Outlet />
    </div>
  );
};

export default Department;