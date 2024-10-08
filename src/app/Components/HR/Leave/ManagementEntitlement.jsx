import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useEmployee from "../../../Hooks/Employee/useEmployee";
import ModalAddEntitlment from "../../../modals/HR/Leave/Management/ModalAddEntitlment";
import { LEAVE_ENTITLEMENT, LEAVE_GET_ALL } from "../../../utils/apiConstants";
import { ALL_DATA } from "../../../utils/LocalStorageConstants";
import { SESSION_ROLE } from "../../../utils/sessionStorageContants";
import Loader from "../../Loader/Loader";
import Nodata from "../../NoData/Nodata";
import Select from "react-select";

function ManagementEntitlement({ setLoading, collegeId }) {
  const [data, setData] = useState([]);
  const [employee] = useEmployee(collegeId);

  const [emp, setEmp] = useState("");
  const [alldata, setAllData] = useState([]);

  const [editType, setEditType] = useState("");

  const [edit, setEdit] = useState();

  const [role, setRole] = useState(sessionStorage.getItem(SESSION_ROLE));

  const [search, setSearch] = useState("");

  const [employeeOpt, setEmployeeOpt] = useState([]);

  const getData = async (p) => {
    if (!p) {
      return;
    }

    setLoading(1);

    let url1;

    if (p == "All") {
      url1 = `${LEAVE_ENTITLEMENT}?college_id=${collegeId}`;
    } else {
      url1 = `${LEAVE_ENTITLEMENT}?college_id=${collegeId}&employee_id=${p}`;
    }

    setEmp(p);
    const config = {
      method: "get",
      url: url1,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        let entitledData = res.data.data;
        if (sessionStorage.getItem("role") != "SUPERADMIN") {
          entitledData = entitledData.filter(
            (s) => s.year == new Date().getFullYear()
          );
        }
        console.log("entitle data - ", entitledData);
        setData(entitledData);
        // console.log(res);
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err.response.data.message);
      });
  };
  const getAlldata = async () => {
    const config = {
      method: "get",
      url: `${LEAVE_GET_ALL}?college_id=${collegeId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
    };

    axios(config)
      .then((res) => {
        setAllData(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    let temp = [];
    temp.push({ value: "All", label: "All" });
    employee?.map((i, key) => {
      let obj = {};
      obj["value"] = i?.id;
      obj["label"] = i?.first_name + " " + i?.last_name;
      temp.push(obj);
    });
    setEmployeeOpt(temp);
  }, [employee]);

  useEffect(() => {
    getData("All");
    getAlldata();
  }, []);
  return (
    <div>
      <ModalAddEntitlment
        reloadData={(d) => {
          getData(d);
        }}
        setLoading={setLoading}
        empId={emp}
        allData={alldata}
        collegeId={collegeId}
        edit={edit}
        editType={editType}
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
                    {/* <select
                                            id="role"
                                            name="role"
                                            className="form-control"
                                            value={emp}
                                            onChange={(e) => { getData(e.target.value) }}
                                        >
                                            <option value="All" selected>All</option>
                                            {
                                                employee?.map((i, key) => (
                                                    <option value={i.id} key={key}>{i.first_name} {i.last_name}</option>
                                                ))
                                            }
                                        </select> */}
                    <Select
                      id="role"
                      options={employeeOpt}
                      onChange={(e) => {
                        getData(e.value);
                        // getEntitlement(e.value);
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
            <h4 className="mb-0">Entitlement Report</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="/">Leave</a>
                </li>
                <li className="breadcrumb-item active">Entitlement Report</li>
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
              {role == "SUPERADMIN" && (
                <div>
                  {emp !== "" ? (
                    <button
                      className="btn btn-rounded btn-success btn-outline px-4"
                      data-toggle="modal"
                      data-target="#ModalAddEntitlment"
                      onClick={() => {
                        setEditType("add");
                      }}
                    >
                      New Entitlement
                    </button>
                  ) : (
                    <button className="btn text-danger">
                      Select Employee to add new Entitlement
                    </button>
                  )}
                </div>
              )}

              <button className="btn btn-rounded btn-primary btn-outline px-4">
                Export &uarr;
              </button>
            </div>

            <div>
              {data && data.length !== 0 ? (
                data?.map((i, key) => (
                  <div
                    className="row my-3 mx-2 p-3 border rounded shadow report-div cursor-normal"
                    data-toggle="modal"
                    data-target="#ModalAddEntitlment"
                    onClick={() => {
                      setEditType("edit");
                      setEdit(i);
                    }}
                    key={key}
                  >
                    <div className="col-12 row">
                      <div className="report-title col-12">
                        {employee &&
                          employee?.find((j) => j.id === i.employee_id)
                            ?.first_name}
                        {}
                      </div>
                      <div className="row col-12  role-parts">
                        <div className="col-sm-3 col-12 role-part-left">
                          <button className="btn btn-primary btn-rounded">
                            {i.leave_type}
                          </button>
                          <div className="d-flex my-2 text-danger">
                            {i.to_date.split("T")[0]}
                          </div>
                        </div>
                        <div className="col-sm-9 col-12  row role-part-right">
                          <div className={`col-6 report-items `}>
                            <div className="report-item-title">Balance</div>
                            <div className="report-item-value btn btn-danger p-1">
                              {i?.balance}
                            </div>
                          </div>
                          <div className={`col-6 report-items `}>
                            <div className="report-item-title">Earned</div>
                            <div className="report-item-value ">
                              {i?.earned}
                            </div>
                          </div>
                          {/* <div className={`col-6 report-items `}>
                                                    <div className='report-item-title'>
                                                        Carried Over
                                                    </div>
                                                    <div className='report-item-value '>
                                                        {i.carried_over}
                                                    </div>
                                                </div> */}
                          <div className={`col-6 report-items `}>
                            <div className="report-item-title">Entitlement</div>
                            <div className="report-item-value ">
                              {i.entitled_days}
                            </div>
                          </div>
                          <div className={`col-6 report-items `}>
                            <div className="report-item-title">Taken</div>
                            <div className="report-item-value ">
                              {i.taken_days ? i.taken_days : 0}
                            </div>
                          </div>
                          {/* <div className={`col-6 report-items `}>
                                                    <div className='report-item-title'>
                                                        Emergency
                                                    </div>
                                                    <div className='report-item-value '>
                                                        4
                                                    </div>
                                                </div> */}
                          {/* {
                                                                i.Data.map((j, key2) => (

                                                                    <div className={`col-6 report-items `} key={key2}>
                                                                        <div className='report-item-title'>
                                                                            {j.title}
                                                                        </div>
                                                                        <div className={`report-item-value ${j.title==='Balance'?'btn btn-danger p-1':''}`}>
                                                                            {j.value}
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            } */}
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

export default ManagementEntitlement;
