import axios from "axios";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx/xlsx.mjs";
import { useDownloadExcel } from "react-export-table-to-excel";
import Nodata from "../../../Components/NoData/Nodata";
import ModalAdmissionEnquirry from "../../../modals/Students/ModalAdmissionEnquirry";
import { STUDENT_ADMISSION_ENQUIRRY } from "../../../utils/apiConstants";
import {
  LOCAL_COLLEGE,
  LOCAL_PROGRAM,
} from "../../../utils/LocalStorageConstants";

const AdmissionEnquirry = ({ setLoading, collegeId }) => {
  const [data, setData] = useState();
  const [status, setStatus] = useState("ACTIVE");
  const [edit, setEdit] = useState();

  const tableRef = useRef();

  const getLocalColleges = () => {
    return localStorage.getItem(LOCAL_COLLEGE)
      ? JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
      : null;
  };

  const getLocalPrograms = () => {
    return localStorage.getItem(LOCAL_PROGRAM)
      ? JSON.parse(localStorage.getItem(LOCAL_PROGRAM))
      : null;
  };

  const [localColleges] = useState(getLocalColleges());
  const [localPrograms] = useState(getLocalPrograms());

  const getData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url:
        STUDENT_ADMISSION_ENQUIRRY +
        `?college_id=${collegeId}&&status=${status}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };
    await axios(config)
      .then((res) => {
        setData(res.data.data);
        setLoading(0);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(0);
      });
  };

  const handleDelete = (i) => {
    setLoading(1);
    const config = {
      method: "put",
      url: STUDENT_ADMISSION_ENQUIRRY + "/" + i,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        status: "DECLINED",
      },
    };
    axios(config)
      .then((res) => {
        toast.success("Success");
        setLoading(0);
      })
      .catch((err) => {
        toast.error("Somrthing went wrong");
      });
  };

  useEffect(() => {
    getData();
  }, [status]);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Student Admission Enquiry Report",
    sheet: "Users",
  });
  return (
    <div className="AdmissionEnquirry">
      <ModalAdmissionEnquirry
        data={edit}
        setLoading={setLoading}
        reloadData={getData}
      />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title">Select Criteria</h2>
                    <br />
                    <form>
                      <div className="row">
                        {/* <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label htmlFor="validationCustom01">Source </label>
                                                        <select name="source" id="" className="form-control">
                                                            <option value="">Select</option>
                                                            <option value="\" />
                                                            <option value="Front Office">Front Office</option>
                                             <option value="Front Office">Front Office</option>
                                             <option value="Front Office">Front Office</option>
                                                        </select>
                                                    </div>
                                                </div> */}
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">Status</label>
                            <select
                              name="status"
                              value={status}
                              className="form-control"
                              onChange={(e) => setStatus(e.target.value)}
                            >
                              <option value="">Select</option>
                              <option value="ACTIVE">PENDING</option>
                              <option value="APPROVED">APPROVED</option>
                              <option value="DECLINED">DECLINED</option>
                            </select>
                          </div>
                        </div>
                        {/* <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label htmlFor="validationCustom01">College</label>
                                                        <select name="status" className="form-control">
                                                            <option value="">Select College</option>
                                                            <option value="Active">Active</option>
                                                            <option value="passive">Passive</option>
                                                            <option value="win">Win</option>
                                                            <option value="loss">Loss</option>
                                                        </select>
                                                    </div>
                                                </div> */}
                        {/* <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label htmlFor="validationCustom01">Program</label>
                                                        <select name="status" className="form-control">
                                                            <option value="">Select Program</option>
                                                            <option value="Active">Active</option>
                                                            <option value="passive">Passive</option>
                                                            <option value="win">Win</option>
                                                            <option value="loss">Loss</option>
                                                        </select>
                                                    </div>
                                                </div> */}
                      </div>
                      {/* <div className="row float-right">
                                                <button
                                                    className="btn btn-primary btn-rounded"
                                                    type="submit"
                                                    name="submit"
                                                >
                                                    <i className="fa fa-search" aria-hidden="true" /> Search
                                                </button>
                                            </div> */}
                    </form>
                  </div>
                </div>
                {/* end card */}
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <div className="card-title">
                      Admission Enquiry
                      <button
                        className="btn btn-primary float-right rounded-pill mb-3"
                        onClick={onDownload}
                      >
                        Export
                      </button>
                    </div>
                    <hr />
                    <div className="table-responsive">
                      <table
                        id="datatable"
                        className="table table-bordered nowrap overflow-auto"
                        style={{ borderCollapse: "", borderSpacing: 0 }}
                        ref={tableRef}
                      >
                        <thead>
                          <tr>
                            <th>Sl.No.</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Source</th>
                            <th>Enquiry Date</th>
                            <th>
                              Last <br />
                              Follow-up Date
                            </th>
                            <th>
                              Next <br />
                              Follow-up Date
                            </th>
                            <th>Program</th>
                            <th>College</th>
                            <th>Status</th>
                            {status === "APPROVED" ? null : <th>Action</th>}
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {data && data?.length !== 0 ? (
                            data?.map((i, key) => {
                              return (
                                <>
                                  <tr>
                                    <td>{key + 1}</td>
                                    <td>{i?.name}</td>
                                    <td>{i?.phone}</td>
                                    <td>{i?.email}</td>
                                    <td>{i?.source ? i.source : "Website"}</td>
                                    <td>{i?.createdAt?.split("T")[0]}</td>
                                    <td>{i?.date?.split("T")[0]}</td>
                                    <td>
                                      {i?.follow_up_date
                                        ? i.follow_up_date?.split("T")[0]
                                        : "Not Added"}
                                    </td>
                                    <td>
                                      {
                                        localPrograms.find(
                                          (s) => s?.id === i?.program_id
                                        )?.name
                                      }
                                    </td>
                                    <td>
                                      {
                                        localColleges.find(
                                          (s) => s?.id === i?.college_id
                                        )?.name
                                      }
                                    </td>
                                    <td>
                                      {i?.status === "ACTIVE"
                                        ? "PENDING"
                                        : i?.status}
                                    </td>
                                    {status === "APPROVED" ? null : (
                                      <td style={{ minWidth: "100px" }}>
                                        <abb title="Follow Up">
                                          <button
                                            className="btn badge badge-light p-2 mr-3 "
                                            data-toggle="modal"
                                            data-target="#ModalAdmissionEnquirry"
                                            onClick={() => {
                                              setEdit(i);
                                            }}
                                          >
                                            {" "}
                                            <i
                                              className="fa fa-phone text-success"
                                              aria-hidden="true"
                                            />{" "}
                                          </button>
                                        </abb>{" "}
                                        <abb title="Delete">
                                          <button
                                            className="btn badge badge-light p-2"
                                            onClick={() => {
                                              handleDelete(i?.id);
                                            }}
                                          >
                                            {" "}
                                            <i
                                              className="fa fa-trash text-danger"
                                              aria-hidden="true"
                                            />{" "}
                                          </button>
                                        </abb>{" "}
                                      </td>
                                    )}
                                  </tr>
                                </>
                              );
                            })
                          ) : (
                            <tr>
                              {" "}
                              <td colSpan={12}>
                                <Nodata />
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* end col */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionEnquirry;
