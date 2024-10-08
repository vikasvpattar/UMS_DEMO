import React, { useState, useEffect } from "react";
import ModalDepartments from "../../../../modals/HR/Employer/ModalDepartments";
import "./../Employer.scss";
import axios from "axios";
import { DEPARTMENTS } from "../../../../utils/apiConstants";
import { toast } from "react-toastify";
import { ALL_DATA } from "../../../../utils/LocalStorageConstants";
import Nodata from "../../../../Components/NoData/Nodata";

function Department({ setLoading }) {
  const [data, setData] = useState([]);
  const [type, setType] = useState();
  const [edit, setEdit] = useState();
  const collegeData = JSON.parse(localStorage.getItem(ALL_DATA)).college;
  const [selectedId, setSelectedId] = useState();

  const getData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: DEPARTMENTS,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
      });
  };

  const [departmentData, setDepartmentData] = useState([]);

  const selectCollege = async (id) => {
    setSelectedId(id);
    setLoading(1);
    setDepartmentData(await data?.filter((item) => item?.college_id == id));
    setLoading(0);
  };

  useEffect(() => {
    // setLoading(1)
    setDepartmentData(data?.filter((item) => item?.college_id == selectedId));
    // setLoading(0)
  }, [data]);

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="Department">
      <ModalDepartments
        reloadData={getData}
        type={type}
        data={edit}
        setLoading={setLoading}
      />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Departments</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">Employer</li>
                      <li className="breadcrumb-item active">Departments</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title">Select Criteria</h2>
                    <br />
                    <div className="row d-flex ">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            College<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            id="role"
                            name="role"
                            className="form-control"
                            autoComplete="off"
                            onChange={(e) => selectCollege(e.target.value)}
                          >
                            <option value="" selected>
                              Select
                            </option>
                            {collegeData.map((i, key) => (
                              <option value={i.id} key={key}>
                                {i.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-md-12 d-flex justify-content-end">
                        <button
                          onClick={() => {
                            setType("add");
                            setEdit();
                          }}
                          className="btn btn-rounded btn-success btn-outline px-4"
                          data-toggle="modal"
                          data-target="#ModalDepartments"
                        >
                          Add +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end card */}
              </div>
            </div>

            <div className="">
              <div className="card">
                <div className="card-body">
                  <div>
                    {departmentData && departmentData.length !== 0 ? (
                      departmentData.map((i, key) => (
                        <div
                          className="row my-3 mx-2 p-3 border rounded role-div flex-nowrap shadow"
                          onClick={() => {
                            setType("edit");
                            setEdit(i);
                          }}
                          data-toggle="modal"
                          data-target="#ModalDepartments"
                        >
                          <div className="col-11" key={key}>
                            <div className="role-title">{i.name}</div>
                          </div>
                          <div className="col-1 d-flex align-items-center justify-content-end">
                            {">"}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="mt-3">
                        <Nodata
                          titleTop={"No data available for your search"}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Department;
