import React, { useEffect, useRef, useState } from "react";
import { Http } from "../../../../Services/Services";
import {
  LEAVE_ENTITLEMENT_REPORT,
  LEAVE_ENTITLEMENT_REPORT2,
} from "../../../../utils/apiConstants";
import { toast } from "react-toastify";
import { LOCAL_COLLEGE } from "../../../../utils/LocalStorageConstants";
import { useDownloadExcel } from "react-export-table-to-excel";
import { sessionOpt } from "../../../../Data/jsonData/Academics/Academics";
import Select from "react-select";

const EntitlementDetaildReport = ({ collegeId, setLoading }) => {
  const collegeList = JSON.parse(localStorage.getItem(LOCAL_COLLEGE));
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);

  const handleSessionChange = (selectedOption) => {
    console.log("Selected Session:", selectedOption);
    setSelectedSession(selectedOption);
  };

  const getData = async () => {
    setLoading(true);
    const response = await Http.get(
      //   `${LEAVE_ENTITLEMENT_REPORT}?college_id=${collegeId}`
      `${LEAVE_ENTITLEMENT_REPORT2}?college_id=${collegeId}&year=${selectedSession?.value}`
    ).catch((error) => {
      console.log(error);
      toast.error(error.message || "Error while fetching reports");
    });
    if (response) {
      const empSet = new Set();
      const leaveSet = new Set();
      setData(response.data.data);
      for (const i of response.data.data) {
        empSet.add(i.employee_id);
        leaveSet.add(i.leave_type);
      }
      setEmployees(Array.from(empSet));
      console.log(Array.from(empSet));
      console.log(Array.from(leaveSet));
      setLeaveTypes(Array.from(leaveSet));
    }
    setLoading(false);
  };

  const tableRef = useRef();

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename:
      "Entitlement Detailed Report-" +
      new Date().getFullYear() +
      "-" +
      collegeList?.find((s) => s.id == collegeId)?.name,
    sheet: "Entitlement",
  });

  //   useEffect(() => {
  //     getData();
  //   }, []);
  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <h6 className="card-header">Entitlement Detailed Report</h6>
              </div>
            </div>
            <div className="mt-3 row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="d-flex mb-3">
                          <button
                            onClick={onDownload}
                            className="btn btn-success ml-auto"
                          >
                            Export
                          </button>
                        </div>
                        <div className="row">
                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor="">Select Year</label>

                              <Select
                                className="react-select-container"
                                classNamePrefix="react-select"
                                name="year"
                                id="year"
                                value={selectedSession}
                                onChange={handleSessionChange}
                                options={sessionOpt?.map((i) => ({
                                  //   label: i.name,
                                  label: i.id,
                                  value: i.id,
                                }))}
                                placeholder="Select Year"
                              />
                            </div>
                          </div>
                          <div
                            className="col-md-4 ml-4"
                            style={{ marginTop: "28px" }}
                          >
                            <button
                              className="btn btn-nex  btn-md"
                              type="submit"
                              name="submit"
                              value="collect"
                              onClick={getData}
                            >
                              <i className="fa fa-search" aria-hidden="true" />{" "}
                              Search
                            </button>
                          </div>
                        </div>
                        <div className="table-responsive mt-5">
                          <table
                            ref={tableRef}
                            className="table table-bordered"
                          >
                            <tr>
                              <th colSpan={Number(leaveTypes.length) * 3 + 5}>
                                College Name:{" "}
                                {
                                  collegeList?.find((s) => s.id == collegeId)
                                    ?.name
                                }
                              </th>
                            </tr>
                            <tr>
                              <th rowSpan={2}>Sl.Name</th>
                              <th rowSpan={2}>Employee Name</th>
                              {leaveTypes?.map((item, index) => (
                                <th colSpan={3} key={index}>
                                  {item}
                                </th>
                              ))}
                              <th colSpan={3}>Total</th>
                            </tr>
                            <tr>
                              {leaveTypes?.map((item, index) => (
                                <>
                                  <th>Entitled</th>
                                  <th>Taken</th>
                                  <th>Balance</th>
                                </>
                              ))}
                              <th>Entitled</th>
                              <th>Taken</th>
                              <th>Balance</th>
                            </tr>
                            {employees?.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  {
                                    data?.find((s) => s.employee_id == item)
                                      ?.first_name
                                  }{" "}
                                  {
                                    data?.find((s) => s.employee_id == item)
                                      ?.last_name
                                  }
                                </td>
                                {leaveTypes?.map((leave, index2) => (
                                  <>
                                    <td>
                                      {data
                                        ?.filter(
                                          (s) =>
                                            s.employee_id == item &&
                                            s.leave_type == leave
                                        )
                                        .reduce(
                                          (a, b) => a + b.entitled_days,
                                          0
                                        )
                                        .toFixed(2) || "0"}
                                    </td>
                                    <td>
                                      {data
                                        ?.filter(
                                          (s) =>
                                            s.employee_id == item &&
                                            s.leave_type == leave
                                        )
                                        .reduce((a, b) => a + b.taken_days, 0)
                                        .toFixed(2) || "0"}
                                    </td>
                                    <td>
                                      {data
                                        ?.filter(
                                          (s) =>
                                            s.employee_id == item &&
                                            s.leave_type == leave
                                        )
                                        .reduce((a, b) => a + b.balance, 0)
                                        .toFixed(2) || "0"}
                                    </td>
                                  </>
                                ))}
                                <td>
                                  {data
                                    ?.filter((s) => s.employee_id == item)
                                    .reduce((a, b) => a + b.entitled_days, 0)
                                    .toFixed(2) || "0"}
                                </td>
                                <td>
                                  {data
                                    ?.filter((s) => s.employee_id == item)
                                    .reduce((a, b) => a + b.taken_days, 0)
                                    .toFixed(2) || "0"}
                                </td>
                                <td>
                                  {data
                                    ?.filter((s) => s.employee_id == item)
                                    .reduce((a, b) => a + b.balance, 0)
                                    .toFixed(2) || "0"}
                                </td>
                              </tr>
                            ))}
                            <tr>
                              <td colSpan={2}>
                                <strong>Total</strong>
                              </td>
                              {leaveTypes?.map((leave, index2) => (
                                <>
                                  <td>
                                    {data
                                      ?.filter((s) => s.leave_type == leave)
                                      .reduce((a, b) => a + b.entitled_days, 0)
                                      .toFixed(2) || "0"}
                                  </td>
                                  <td>
                                    {data
                                      ?.filter((s) => s.leave_type == leave)
                                      .reduce((a, b) => a + b.taken_days, 0)
                                      .toFixed(2) || "0"}
                                  </td>
                                  <td>
                                    {data
                                      ?.filter((s) => s.leave_type == leave)
                                      .reduce((a, b) => a + b.balance, 0)
                                      .toFixed(2) || "0"}
                                  </td>
                                </>
                              ))}
                              <td>
                                {data
                                  ?.reduce((a, b) => a + b.entitled_days, 0)
                                  .toFixed(2) || "0"}
                              </td>
                              <td>
                                {data
                                  ?.reduce((a, b) => a + b.taken_days, 0)
                                  .toFixed(2) || "0"}
                              </td>
                              <td>
                                {data
                                  ?.reduce((a, b) => a + b.balance, 0)
                                  .toFixed(2) || "0"}
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntitlementDetaildReport;
