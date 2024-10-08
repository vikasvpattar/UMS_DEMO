import axios from "axios";
import React, { useState, useEffect } from "react";
import Select from 'react-select'
import { toast } from "react-toastify";
import useEmployee from "../../../Hooks/Employee/useEmployee";
import ModalManagementApplication from "../../../modals/HR/Leave/Management/ModalManagementApplication";
import {
  LEAVE_APPLICATION,
  LEAVE_ENTITLEMENT,
  LEAVE_APPROVER_APPLICATION
} from "../../../utils/apiConstants";
import Nodata from "../../NoData/Nodata";

function ManagementApplication({ setLoading, collegeId }) {
  const [data, setData] = useState([]);
  const [employee] = useEmployee(collegeId);
  const [emp, setEmp] = useState("");
  const [emp1, setEmp1] = useState([]);
  const [type, setType] = useState("");
  const [edit, setEdit] = useState();
  const [entitlement, setEntitlement] = useState();
  const [search, setSearch] = useState("");
  const [employeeOpt, setEmployeeOpt] = useState([]);

  const getEntitlement = async (p) => {
    if (!p) {
      return;
    }

    setLoading(1);
    setEmp(p);

    const config = {
      method: "get",
      url: `${LEAVE_ENTITLEMENT}?employee_id=${p}&&college_id=${collegeId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        console.log('entitlements - ', res.data.data);
        setEntitlement(res.data.data);
        // console.log(res);
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err.response.data.message);
      });
  };

  const getData = async (p) => {
    console.log(' p - ', p);
    if (!p) {
      return;
    }
    setLoading(1);

    setEmp(p);
    let url1;

    if(p == "All") {
      url1 = `${LEAVE_APPLICATION}?college_id=${collegeId}`;
    }
    else {
      url1 = `${LEAVE_APPLICATION}?employee_id=${p}&college_id=${collegeId}`;
    }
    const config = {
      method: "get",
      url: url1,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
    };

    let url2;

    if(p == "All") {
      url2 = `${LEAVE_APPLICATION}?college_id=${collegeId}`
    }
    else {
      url2 = `${LEAVE_APPLICATION}?employee_id=${sessionStorage.getItem("employee_id")}&college_id=${collegeId}`
    }
    const config1 = {
      method: "get",
      url: url2,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
    };

    await axios(config)
      .then(async (res) => {
        res.data.data.sort((a, b) => {
          const comparison = a.from_date.localeCompare(b.from_date);
          if (comparison < 0) {
            return 1;
          } else if (comparison > 0) {
            return -1;
          } else {
            return 0;
          }
        });
        
        console.log('leave applications - ',res.data.data);
        let tempData = res.data.data;
        let finalData = [];
        for(let i in tempData) {
          let approvals = [];
          let config1 = {
            method: "get",
            url:  `${LEAVE_APPROVER_APPLICATION}/${tempData[i].id}`,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
            },
          }

          setLoading(1);
          await axios(config1)
            .then((res) => {
              setLoading(0);
              approvals = res.data.data;
              let obj = {
                ...tempData[i],
                approvals
              }
              finalData.push(obj);
              
            })
            .catch((err) => {
              setLoading(0);
              toast.error(err.response.data.message);
            });
        }
        console.log('final data - ', finalData);
        setData(finalData);
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err.response.data.message);
      });

    await axios(config1)
      .then((res) => {
        console.log(res.data.data);
        setEmp1(res.data.data);
        setLoading(0);
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    // getData("All");
  }, []);

  useEffect(()=> {
    let temp = [];
    temp.push({'value':'All','label': 'All'});
    (employee?.map((i, key) => {
      let obj = {};
      obj['value'] = i?.id;
      obj['label'] = i?.first_name + " " + i?.last_name;
      temp.push(obj);
    }))
    setEmployeeOpt(temp);
  },[employee])

  return (
    <div>
      <ModalManagementApplication
        type={type}
        emp1={emp1}
        employee={employee}
        empId={emp}
        data={edit}
        reloadData={(d) => getData(d)}
        setLoading={setLoading}
        entitlement={entitlement}
        collegeId={collegeId}
      />
      {/* start page title */}
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Select Employee</h2>
              <br />
              <div className="row d-flex ">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="validationCustom01">
                      Employee<span style={{ color: "red" }}>*</span>
                    </label>
                    <Select 
                      id="role"
                      options={employeeOpt} 
                      onChange={(e) => {
                        getData(e.value);
                        getEntitlement(e.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end card */}
        </div>
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0">Transaction Report</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="/">Leave</a>
                </li>
                <li className="breadcrumb-item active">Transaction Report</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      {/* end page title */}

      <div className="container">
        <div className="card">
          <div className="card-body">
            <div className="row d-flex justify-content-between p-3">
              {emp !== "" ? (
                <button
                  className="btn btn-rounded btn-success btn-outline px-4"
                  data-toggle="modal"
                  data-target="#ModalManagementApplication"
                  onClick={() => {
                    setType("add");
                    setEdit();
                  }}
                >
                  New Application
                </button>
              ) : (
                <button className="btn text-danger">
                  Select Employee to add new Application
                </button>
              )}

              <button className="btn btn-rounded btn-primary btn-outline px-4">
                Export &uarr;
              </button>
            </div>

            <div>
              {data && data?.length !== 0 ? (
                data?.
                map((i, key) => (
                  <div
                    className="row my-3 mx-2 p-3 border rounded shadow report-div cursor-pointer"
                    data-toggle="modal"
                    data-target="#ModalManagementApplication"
                    onClick={() => {
                      setType("edit");
                      setEdit(i);
                    }}
                  >
                    <div className="col-12 row" key={key}>
                      <div className="report-title col-12">
                        {employee?.find((j) => j.id === i.employee_id)
                          ?.first_name +
                          " " +
                          employee.find((j) => j.id === i.employee_id)
                            ?.last_name}
                      </div>
                      <div className="col-12 d-flex flex-nowrap justify-content-between align-items-center role-parts">
                        <div className="align-self-start text-center col-5">
                          <div>{i?.from_date?.split("T")[0]}</div>
                          <div>&darr;</div>
                          <div>{i?.to_date?.split("T")[0]}</div>
                          <div
                            className={`${
                              i?.status === "PENDING"
                                ? "text-warning"
                                : i?.status === "APPROVED"
                                ? "text-success"
                                : "text-danger"
                            }`}
                          >
                            {i?.status}
                          </div>
                        </div>
                        
                        <div className="d-flex">{i?.approvals[0]?.leave_type}</div>
                        <div className="col-2">
                          <div className="d-flex">{i.session}</div>
                          <button className=" w-auto btn btn-dark p-1">
                            {i?.number_of_days} Day
                          </button>
                        </div>
                        <div className="col-4">
                        <div>
                          {i?.approvals?.map((j,k) => {
                            return (<><p style={{fontSize:"0.8rem"}}>
                              Approver {`${j?.approver_num} : ${j?.first_name} ${j?.last_name}`} {j?.status == "ACTIVE" ? <span className="badge badge-soft-warning">Pending</span> : j?.status == "APPROVED" ? <span className="badge badge-soft-success">Approved</span> : <span className="badge badge-soft-danger">{`${j?.status}`}</span>} <br /> 
                              <span>Date : {j?.status == "ACTIVE" ? "--" : j?.updatedAt.split('T')[0]}</span>
                            </p>
                            
                            </>
                            )
                          })}
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <Nodata />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagementApplication;
