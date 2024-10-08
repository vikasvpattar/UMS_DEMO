import React, { useState } from "react";
import ManagementApplication from "../../../../Components/HR/Leave/ManagementApplication";
import ManagementEntitlement from "../../../../Components/HR/Leave/ManagementEntitlement";
import ManagementSwitches from "../../../../Components/HR/Leave/ManagementSwitches";

function LeaveManagement({ setLoading, collegeId }) {
  const [tab, setTab] = useState("Entitlement");
  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid"></div>

          <ManagementSwitches tab={tab} setTab={setTab} />
          {tab === "Entitlement" && (
            <ManagementEntitlement
              setLoading={setLoading}
              collegeId={collegeId}
            />
          )}
          {tab === "Application" && (
            <ManagementApplication
              setLoading={setLoading}
              collegeId={collegeId}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LeaveManagement;
