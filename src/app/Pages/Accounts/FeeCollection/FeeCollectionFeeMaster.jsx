import React from "react";
import { useState } from "react";
import NoData from "./../../../Components/NoData/Nodata";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Multiselect from "multiselect-react-dropdown";
import {
  ACCOUNT_FEE_DIS,
  ACCOUNT_FEE_GROUP,
  ACCOUNT_FEE_MASTER,
  ACCOUNT_FEE_TYPE_AMOUNT,
} from "../../../utils/Accounts.apiConst";
import { ROUTES } from "../../../Router/routerConfig";
import { useNavigate } from "react-router-dom";
import { sessionOpt } from "../../../Data/jsonData/Academics/Academics";
import { useRef } from "react";
import { scrollToRef } from "../../../Helpers/ScrollToRef";
import { SESSION_ROLE } from "../../../utils/sessionStorageContants";
import { ACADEMICS_ADD_CLASS } from "../../../utils/Academics.apiConst";
import { LOCAL_DEPARTMENT } from "../../../utils/LocalStorageConstants";
import Select from 'react-select';

function FeeCollectionFeeMaster({ setLoading, collegeId }) {
  const scrollTo = useRef();

  const [feeTypeArray, setFeeTypeArray] = useState([]);

  const [feeDiscountArray, setDiscountArray] = useState([]);

  const [feeGroupOpt, setFeeGroupOpt] = useState([]);

  const [addNew, setAddNew] = useState(false);

  const [edit, setEdit] = useState(false);

  const [feeOpt, setFeeOpt] = useState([]);

  const [feeTypeOpt, setFeeTypeOpt] = useState([]);

  const [feeDiscountOpt, setFeeDiscountOpt] = useState([]);

  const [classOpt, setClassOpt] = useState([]);

  const [editId, setEditId] = useState();

  const [role, setRole] = useState(sessionStorage.getItem(SESSION_ROLE));

  const navigate = useNavigate();

  const changeDirtToAssign = (i) => {
    navigate(
      role == "SUACC"
        ? ROUTES.Accountant.AssignFee
        : role == "SUPERADMIN"
        ? ROUTES.Registar.Accounts.FeeCollection.assignFee
        : role == "ADMIN"
        ? ROUTES.Principal.Accounts.FeeCollection.assignFee
        : "/",
      { state: i }
    );
  };

  const [data, setData] = useState([]);

  const [user, setUser] = useState({
    session_id: "",
    fee_group: "",
    class_id: "",
    fee_type: "",
    due_date: "",
    scholarship:"0",
    amount: "",
    fine_type: "",
    fine_amount: "",
    fine_percentage: "",
  });

  const [departmentId, setDepartmentId] = useState("");

  const departmentOpt = JSON.parse(
    localStorage.getItem(LOCAL_DEPARTMENT)
  )?.filter((s) => s?.college_id == collegeId);

  const clearData = () => {
    setUser((prev) => ({
      ...prev,
      fee_group: "",
      fee_type: "",
      due_date: "",
      amount: "",
      scholarship:"",
      fine_type: "",
      fine_amount: "",
      fine_percentage: "",
    }));

    setDepartmentId("");

    setFeeTypeArray([]);
    setDiscountArray([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkMandatory = () => {
    if (
      !user?.session_id ||
      !user?.class_id ||
      !user?.fee_group ||
      !user?.due_date
    )
      return false;
    if (feeTypeArray?.length == 0) return false;
    return true;
  };

  const getData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${ACCOUNT_FEE_MASTER}?college_id=${collegeId}&session_id=${user?.session_id}&class_id=${user?.class_id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        const data = res.data.data;

        for (var i of data) {
          i.fee_type = String(i.fee_type).split(",");
        }

        setData(data);
        setLoading(0);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  const handleSubmit = async () => {
    if (!checkMandatory()) return toast.error("Mandatory fields are required");
    setLoading(1);
   
     // Extract only the IDs from the feeDiscountArray
    const selectedDiscountIds = feeDiscountArray.map((item) => item.id);
    console.log("feeDiscountArray", feeDiscountArray);

    const data = {
      college_id: collegeId,
      amount: user.amount,
      session_id: user.session_id,
      class_id: user.class_id,
      fee_group_id: user.fee_group,
      fee_type: feeTypeArray.map((item) => item.id),
      // fee_discount: feeDiscountArray.map((item) => item.id),
      fee_discount: selectedDiscountIds,
      due_date: user.due_date,
      scholarship:user.scholarship,
      fine_type: user.fine_type,
      fine:
        user.fine_type == "AMOUNT" ? user.fine_amount : user.fine_percentage,
    };

    const config = {
      method: "post",
      url: ACCOUNT_FEE_MASTER,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        toast.success("Data added successfully");
        clearData();
        getData();
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  const getAllData = async () => {
    setLoading(1);
    // fee group data
    var config = {
      method: "get",
      url: `${ACCOUNT_FEE_GROUP}?college_id=${collegeId}&session_id=${user?.session_id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        setFeeGroupOpt(res.data.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });

    // fee discount data
    var config = {
      method: "get",
      url: `${ACCOUNT_FEE_DIS}?college_id=${collegeId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res);
        setFeeDiscountOpt(res.data.data);
        console.log("dis", res.data.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });

    // fee type amount data
    config = {
      method: "get",
      url: `${ACCOUNT_FEE_TYPE_AMOUNT}?college_id=${collegeId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res.data.data);
        setFeeTypeOpt(res.data.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });

    // class data
    config = {
      method: "get",
      url: `${ACADEMICS_ADD_CLASS}?college_id=${collegeId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        setClassOpt(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(0);
  };

  const handleEdit = async (id) => {
    if (!checkMandatory()) return toast.error("Mandatory fields are required");
    setLoading(1);
    const config = {
      method: "put",
      url: ACCOUNT_FEE_MASTER + "/" + editId,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user,
        fee_type: feeTypeArray.map((item) => item.id),
        fee_discount: feeDiscountArray.map((item) => item.id),
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        getData();
        toast.success("Success");
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    setUser((prev) => ({
      ...prev,
      fine_amount: "",
      fine_percentage: "",
    }));
  }, [user.fine_type]);

  useEffect(() => {
    // getData()
    getAllData();
  }, []);

  // useEffect(() => {
  //   if (user.session_id && addNew) {
  //     getAllData()
  //   }
  // }, [user?.session_id])

  useEffect(() => {
    var d = 0;
    feeTypeArray?.map((i) => (d = d + parseInt(i?.amount)));
    setUser((prev) => ({
      ...prev,
      amount: d,
    }));
    console.log("amount", d);
  }, [feeTypeArray, feeTypeArray?.length]);

  useEffect(() => {
    console.table(user);
    console.log("dis", feeDiscountArray);
  }, [feeDiscountArray]);

  useEffect(() => {
    setRole(sessionStorage.getItem(SESSION_ROLE));
  }, [sessionStorage.getItem(SESSION_ROLE)]);

  const handleChangeSelect = (name, selectedOption) => {
    setUser((prev) => ({
      ...prev,
      [name]: selectedOption?.value,
    }));
  };

  const handleDepartmentChange = (selectedOption) => {
    setDepartmentId(selectedOption?.value);
    
    // Reset the selected class when the department changes
    setUser((prev) => ({
      ...prev,
      class_id: "", // or null, depending on your initial state
    }));
  };
  

  return (
    <div className="FeeCollectionFeeMaster">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Add Fee Master: 2021-22</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Fee Collection</a>
                      </li>
                      <li className="breadcrumb-item active"> Fee Master</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            {/* end page title */}
            <div className="row">
              <div className="col-xl-12">
                <div className="card" ref={scrollTo}>
                  <div className="card-body">
                    <h2 className="card-title">Add criteria</h2>
                    <br />
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Session <span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            className="form-control"
                            name="session_id"
                            value={user.session_id}
                            onChange={handleChange}
                          >
                            <option value="">Select Academic Year</option>
                            {sessionOpt?.map((i, key) => (
                              <option value={i.id}>{i.name}</option>
                            ))}
                          </select> */}

                          <Select
                            options={sessionOpt?.map((i) => ({ value: i.id, label: i.name }))}
                            value={user.session_id ? { value: user.session_id, label: sessionOpt?.find((i) => i.id == user.session_id)?.name } : null}
                            onChange={(selectedOption) =>
                              handleChange({ target: { name: 'session_id', value: selectedOption?.value } })
                            }
                            placeholder="Select Session"
                          />

                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Department <span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            className="form-control"
                            value={departmentId}
                            onChange={(e) => {
                              setDepartmentId(e.target.value);
                            }}
                          >
                            <option value="">Select Department</option>
                            {departmentOpt?.map((i, key) => (
                              <option value={i.id}>{i.name}</option>
                            ))}
                          </select> */}

                          <Select
                            options={departmentOpt?.map((i) => ({ value: i.id, label: i.name }))}
                            value={departmentId ? { value: departmentId, label: departmentOpt?.find((i) => i.id == departmentId)?.name } : null}
                            onChange={handleDepartmentChange}
                            placeholder="Select Department"
                          />

                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Class <span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            className="form-control"
                            name="class_id"
                            value={user.class_id}
                            onChange={handleChange}
                          >
                            <option value="">Select Academic Year</option>
                            {classOpt
                              ?.filter((s) => s?.department_id == departmentId)
                              ?.map((i, key) => (
                                <option value={i.id}>{i.name}</option>
                              ))}
                          </select> */}

                          <Select
                            options={classOpt
                              ?.filter((s) => s?.department_id == departmentId)
                              ?.map((i) => ({ value: i.id, label: i.name }))}
                            value={user.class_id ? { value: user.class_id, label: classOpt?.find((i) => i.id == user.class_id)?.name } : null}
                            onChange={(selectedOption) => handleChangeSelect('class_id', selectedOption)}
                            placeholder="Select Class"
                          />

                        </div>
                      </div>
                      {edit || addNew ? (
                        <>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                Fee Group<span style={{ color: "red" }}>*</span>
                              </label>
                              {/* <select
                                className="form-control"
                                name="fee_group"
                                value={user.fee_group}
                                onChange={handleChange}
                              >
                                <option value=""> Select Fee Group</option>
                                {feeGroupOpt?.map((i, key) => (
                                  <option value={i.id}>{i.name}</option>
                                ))}
                              </select> */}

                              <Select
                                options={feeGroupOpt?.map((i) => ({ value: i.id, label: i.name }))}
                                value={{ value: user.fee_group, label: feeGroupOpt?.find((i) => i.id === user.fee_group)?.name }}
                                onChange={(selectedOption) => handleChangeSelect('fee_group', selectedOption)}
                              />

                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                Fee Type<span style={{ color: "red" }}>*</span>
                              </label>
                              <Multiselect
                                options={
                                  feeTypeOpt
                                    ? feeTypeOpt?.filter(
                                        (s) =>
                                          s?.session_id == user?.session_id &&
                                          s?.class_id == user?.class_id
                                      )
                                    : null
                                }
                                selectedValues={feeTypeArray}
                                onSelect={(p) => {
                                  setFeeTypeArray(p);
                                }}
                                onRemove={(p) => {
                                  setFeeTypeArray(p);
                                }}
                                displayValue={"fee_type"}
                                closeIcon={"cancel"}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                Discount Type
                              </label>
                              <Multiselect
                                options={feeDiscountOpt}
                                // options={feeDiscountOpt ? feeDiscountOpt?.filter(s=>s?.session_id == user?.session_id) : null}
                                selectedValues={feeDiscountArray}
                                onSelect={(p) => {
                                  setDiscountArray(p);
                                }}
                                onRemove={(p) => {
                                  setDiscountArray(p);
                                }}
                                displayValue={"name"}
                                closeIcon={"cancel"}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                Due Date<span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                name="due_date"
                                value={user.due_date}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                Amount<span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="amount"
                                placeholder="Enter Amount"
                                value={user?.amount}
                                readOnly={true}
                              />
                            </div>
                          </div>
                           <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                ScholarShip<span style={{ color: "red" }}>*</span>
                              </label>
                              <select
                                className="form-control"
                                name="scholarship"
                                value={user?.scholarship}
                                onChange={handleChange}
                              >
                                <option value="">ScholarShip Applicable ?</option>
                                <option value="1">Yes</option>
                                <option value="0">NO</option>
                              </select>
                            </div>
                          </div>
                        </>
                      ) : null}

                      {/* {
                        user.fine_type === 'AMOUNT'
                          ?
                          <div
                            className="col-md-3"
                            id="amou"
                          >
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                Fine Amount<span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name='fine_amount'
                                value={user.fine_amount}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          :
                          user.fine_type == 'PERCENTAGE'
                            ?
                            <div
                              className="col-md-3"
                              id="perc"
                            >
                              <div className="form-group">
                                <label htmlFor="validationCustom02">
                                  Percentage<span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name='fine_percentage'
                                  value={user.fine_percentage}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            :
                            null
                      } */}
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-12 ">
                        {addNew == false && edit == false ? (
                          <button
                            className="btn btn-nex btn-rounded float-lg-right mx-1 "
                            type="submit"
                            name="submit"
                            onClick={() => {
                              getData();
                            }}
                          >
                            <i className="fa fa-search" aria-hidden="true" />{" "}
                            Search
                          </button>
                        ) : null}

                        {edit == false ? (
                          <>
                            {addNew == false ? (
                              <button
                                className="btn btn-nex btn-rounded float-lg-right mx-1 "
                                type="submit"
                                name="submit"
                                onClick={() => setAddNew(true)}
                              >
                                <i className="fa fa-add" aria-hidden="true" /> +
                                Add New
                              </button>
                            ) : (
                              <>
                                <button
                                  className="btn btn-nex btn-rounded float-lg-right mx-1"
                                  type="submit"
                                  name="submit"
                                  onClick={handleSubmit}
                                >
                                  <i
                                    className="fa fa-save"
                                    aria-hidden="true"
                                  />{" "}
                                  Save
                                </button>
                                <button
                                  className="btn btn-nex btn-rounded float-lg-right mx-1  p-2 px-3"
                                  type="submit"
                                  name="submit"
                                  // style={{aspectRatio:'1/1'}}
                                  onClick={() => {
                                    setEdit(false);
                                    clearData();
                                    setFeeTypeArray([]);
                                    setDiscountArray([]);
                                    setAddNew(false);
                                    setUser((prev) => ({
                                      ...prev,
                                      fine_type: "",
                                    }));
                                  }}
                                >
                                  {"<   "}&nbsp;&nbsp;&nbsp;{" "}
                                  <i
                                    className="fa fa-search"
                                    aria-hidden="true"
                                  />
                                </button>
                              </>
                            )}
                          </>
                        ) : (
                          <button
                            className="btn btn-nex btn-rounded float-lg-right mx-1"
                            type="submit"
                            name="submit"
                            onClick={() => {
                              handleEdit();
                              setAddNew(false);
                              setEdit(false);
                            }}
                          >
                            <i className="fa fa-save" aria-hidden="true" /> Edit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* end card */}
              </div>
            </div>
            {/* container-fluid */}
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        {" "}
                        <h4 className="card-title">Fee Master Lists</h4>
                      </div>
                      <div className="col-md-8 ">
                        <span className="float-right">
                          <acronym title="PDF">
                            {" "}
                            <a href="#">
                              <i
                                className="fa fa-file-pdf-o "
                                aria-hidden="true"
                              />
                            </a>
                          </acronym>
                          <a href="#"> </a> &nbsp;{" "}
                          <acronym title="Excel">
                            <a href="#">
                              {" "}
                              <i
                                className="fa fa-file-excel-o"
                                aria-hidden="true"
                              />
                            </a>
                          </acronym>
                          <a href="#"> </a>
                        </span>
                      </div>
                    </div>
                    <hr />
                    <div
                      id="datatable_wrapper"
                      className="dataTables_wrapper dt-bootstrap4 no-footer"
                    >
                      <div className="row">
                        <div className="col-sm-12">
                          <table
                            id="datatable"
                            className="table table-bordered dt-responsive nowrap table-hover dataTable no-footer"
                            style={{
                              borderCollapse: "collapse",
                              borderSpacing: 0,
                              width: "100%",
                            }}
                            role="grid"
                            aria-describedby="datatable_info"
                          >
                            <thead>
                              <tr role="row">
                                <th> Sl. No.</th>
                                <th>Class</th>
                                <th>Fee Group</th>
                                <th>Fee Codes</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data && data.length != 0 ? (
                                data?.map((i, key) => (
                                  <tr role="row" className="even" key={key}>
                                    <td className="sorting_1">{key + 1}</td>
                                    <td>
                                      {
                                        classOpt?.find(
                                          (s) => s.id == i?.class_id
                                        )?.name
                                      }
                                    </td>
                                    <td id="edit12">
                                      {
                                        feeGroupOpt?.find(
                                          (s) => s.id == i.fee_group_id
                                        )?.name
                                      }
                                    </td>
                                    <td id="edit22">
                                      Fees :
                                      {i?.fee_type?.length == 0 ? (
                                        "No data Added"
                                      ) : (
                                        <ul
                                          className="liststyle1"
                                          style={{ listStyleType: "none" }}
                                        >
                                          {i?.fee_type?.map((j, key2) => (
                                            <li key={key2}>
                                              {
                                                feeTypeOpt?.find(
                                                  (s) => s.id == j
                                                )?.fee_type_id
                                              }{" "}
                                              &nbsp;&nbsp;
                                              <i className="fa fa-money" />{" "}
                                              &nbsp; ₹{" "}
                                              {
                                                feeTypeOpt?.find(
                                                  (s) => s.id == j
                                                )?.amount
                                              }{" "}
                                              &nbsp;&nbsp;
                                              {/* <a
                                                  href="javascipt:void(0)"
                                                  data-toggle="tooltip"
                                                  title=""
                                                  data-original-title="Edit"
                                                >
                                                  {" "}
                                                  <i className="fa fa-pencil" />
                                                </a>
                                                &nbsp;
                                                <a
                                                  href="javascipt:void(0)"
                                                  className="text-danger"
                                                  data-toggle="tooltip"
                                                  title=""
                                                  data-original-title="Delete"
                                                  
                                                >
                                                  <i className="fa fa-remove" />
                                                </a> */}
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                      Discount :
                                      {!i?.fee_discount ||
                                      i?.fee_discount?.length == 0 ||
                                      !i?.fee_discount[0] ? (
                                        "No data Added"
                                      ) : (
                                        <ul
                                          className="liststyle1"
                                          style={{ listStyleType: "none" }}
                                        >
                                          {i?.fee_discount?.map((j, key2) => (
                                            <li key={key2}>
                                              {
                                                feeDiscountOpt?.find(
                                                  (s) => s.id == j
                                                )?.fee_type_id
                                              }{" "}
                                              &nbsp;&nbsp;
                                              <i className="fa fa-money" />{" "}
                                              &nbsp; ₹{" "}
                                              {
                                                feeDiscountOpt?.find(
                                                  (s) => s.id == j
                                                )?.amount
                                              }{" "}
                                              &nbsp;&nbsp;
                                              {/* <a
                                                  href="javascipt:void(0)"
                                                  data-toggle="tooltip"
                                                  title=""
                                                  data-original-title="Edit"
                                                >
                                                  {" "}
                                                  <i className="fa fa-pencil" />
                                                </a>
                                                &nbsp;
                                                <a
                                                  href="javascipt:void(0)"
                                                  className="text-danger"
                                                  data-toggle="tooltip"
                                                  title=""
                                                  data-original-title="Delete"
                                                  
                                                >
                                                  <i className="fa fa-remove" />
                                                </a> */}
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                      {/* Fine &nbsp;:&nbsp;&nbsp;
                                          {
                                            i?.fine_type=='PERCENTAGE'
                                            ?
                                            `<i className="fa fa-money" />` + '₹' + i?.fine * i?.amount / 100
                                            :
                                            i?.fine_type=='AMOUNT'
                                            ?
                                            <i className="fa fa-money" /> +'₹' +i?.fine
                                            :
                                            'Not Added'
                                          } */}
                                    </td>
                                    <td id="edit32">
                                      <a
                                        href="javascipt:void(0)"
                                        onClick={() => {
                                          setEditId(i?.id);
                                          setEdit(true);
                                          console.log("this", i);
                                          setUser((prev) => ({
                                            ...prev,
                                            fee_group: i?.fee_group_id,
                                            due_date:
                                              i?.due_date?.split("T")[0],
                                            amount: i?.amount,
                                            fine_type: i?.fine_type,
                                            fine_amount:
                                              i?.fine_type == "AMOUNT"
                                                ? i?.fine
                                                : "",
                                            fine_percentage:
                                              i?.fine_type == "AMOUNT"
                                                ? ""
                                                : i?.fine,
                                          }));

                                          const m = [];
                                          feeTypeOpt?.map((s) => {
                                            if (
                                              i?.fee_type?.find(
                                                (k) => k == s?.id
                                              )
                                            )
                                              m.push(s);
                                          });
                                          setFeeTypeArray([...m]);

                                          const n = [];
                                          feeDiscountOpt?.map((s) => {
                                            if (
                                              i?.fee_discount?.find(
                                                (k) => k == s?.id
                                              )
                                            )
                                              n.push(s);
                                          });
                                          setDiscountArray([...n]);
                                        }}
                                      >
                                        {" "}
                                        <i
                                          className="fa fa-pencil"
                                          aria-hidden="true"
                                        />{" "}
                                      </a>{" "}
                                      &nbsp;{" "}
                                      <a
                                        href="javascipt:void(0)"
                                        className="badge badge-light text-success"
                                        data-toggle="tooltip"
                                        title="Assign Students"
                                        data-original-title="View / Assign Students"
                                        onClick={() => {
                                          changeDirtToAssign(i);
                                        }}
                                      >
                                        {" "}
                                        <i
                                          className="fa fa-tags "
                                          aria-hidden="true"
                                          style={{
                                            color: "#364277",
                                            cursor: "pointer",
                                          }}
                                          onmouseover="this.style.color='orange'"
                                          onmouseout="this.style.color='#364277'"
                                        />{" "}
                                      </a>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={10}>
                                    <NoData />
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
              </div>{" "}
              {/* end col */}
            </div>{" "}
            {/* end row */}
          </div>
          {/* End Page-content */}
        </div>
        {/* end main content*/}
      </div>
    </div>
  );
}

export default FeeCollectionFeeMaster;
