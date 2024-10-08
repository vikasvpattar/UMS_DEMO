import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import EmployeeProfileBasic from "../../../Components/Employee/Profile/EmployeeProfileBasic";
import StaffBasic from "../../../Components/HR/Staff/StaffBasic";
import StaffEducation from "../../../Components/HR/Staff/StaffEducation";
import StaffEmploymentTerms from "../../../Components/HR/Staff/StaffEmploymentTerms";
import StaffExperience from "../../../Components/HR/Staff/StaffExperience";
import StaffLegalDocs from "../../../Components/HR/Staff/StaffLegalDocs";
import StaffPlacement from "../../../Components/HR/Staff/StaffPlacement";
import StaffPublications from "../../../Components/HR/Staff/StaffPublications";
import StaffSwitcher from "../../../Components/HR/Staff/StaffSwitcher";
import StaffTraining from "../../../Components/HR/Staff/StaffTraining";
import { SESSION_EMPLOYEE_ID } from "../../../utils/sessionStorageContants";

function EmployeeProfile({ setLoading }) {
  const getEmployeeId = () =>
    sessionStorage.getItem(SESSION_EMPLOYEE_ID)
      ? sessionStorage.getItem(SESSION_EMPLOYEE_ID)
      : null;

  const id = getEmployeeId();
  console.log(id);

  const [tab, setTab] = useState("Basic");
  return (
    <div className="EditStaff">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Human Resource</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="/">Human Resource</a>
                      </li>
                      <li className="breadcrumb-item active">Add New Staff</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            {/* end page title */}

            {/* switcher */}
            <StaffSwitcher setTab={setTab} tab={tab} />
            {/* <div className="alert alert-success alert-rounded " role="alert">
        Your Email Id is your Username and Password would be sent to your registered Mobile Number and Email Id
      </div> */}
            {tab === "Basic" && (
              <EmployeeProfileBasic tab={tab} id={id} setLoading={setLoading} />
            )}
            {tab === "Placement" && (
              <StaffPlacement id={id} tab={tab} setLoading={setLoading} />
            )}
            {tab === "Employment Terms" && (
              <StaffEmploymentTerms id={id} tab={tab} setLoading={setLoading} />
            )}
            {tab === "Education" && (
              <StaffEducation tab={tab} id={id} setLoading={setLoading} />
            )}
            {tab === "Experience" && (
              <StaffExperience tab={tab} id={id} setLoading={setLoading} />
            )}
            {tab === "Training" && (
              <StaffTraining tab={tab} id={id} setLoading={setLoading} />
            )}
            {tab === "Document" && (
              <StaffLegalDocs tab={tab} id={id} setLoading={setLoading} />
            )}
            {tab === "Publications" && (
              <StaffPublications tab={tab} id={id} setLoading={setLoading} />
            )}
          </div>
          {/* container-fluid */}
        </div>
        {/* End Page-content */}
      </div>
    </div>
  );
}

export default EmployeeProfile;
