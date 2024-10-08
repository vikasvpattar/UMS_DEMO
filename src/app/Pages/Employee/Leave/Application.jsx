import React from "react";
import EmployeeLeaveApplication from "../../../Components/Employee/Leave/Application";

const Application = ({ setLoading, collegeId }) => {
  return (
    <div>
      <EmployeeLeaveApplication setLoading={setLoading} collegeId={collegeId} />
    </div>
  );
};

export default Application;
