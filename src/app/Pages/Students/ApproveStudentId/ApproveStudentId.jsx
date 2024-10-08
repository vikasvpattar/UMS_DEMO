import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { sessionOpt } from "../../../Data/jsonData/Academics/Academics";
import {
  GET_STUDENT_BY_ID,
  GET_STUDENT_BY_ID1,
  UPDATE_STUDENT_BY_ID,
} from "../../../utils/apiConstants";
import {
  LOCAL_DEPARTMENT,
  LOCAL_PROGRAM,
} from "../../../utils/LocalStorageConstants";
import {
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_SECTION,
  ACADEMICS_ADD_SEMESTER,
} from "../../../utils/Academics.apiConst";

const ApproveStudentId = ({ setLoading, collegeId }) => {
  const [data, setData] = useState([]);
  const [allids, setAllIds] = useState([]);
  const [allData, setallData] = useState(false);
  const [flag, setFlag] = useState(false);
  const [confirmFlag, setConfirmFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState();
  const [type, setType] = useState("");
  let LastId = 0;

  const [prog, setProg] = useState();
  const [depart, setDepart] = useState();
  const [currentclass, setCurrentClass] = useState();
  const [currentSemester, setCurrentSemester] = useState();
  const [classopt, setClassOpt] = useState([]);
  const [sectionOpt, setSectionOpt] = useState([]);
  const [semesterOpt, setSemesterOpt] = useState([]);
  const [program, setProgram] = useState(
    JSON.parse(localStorage.getItem(LOCAL_PROGRAM))
  );
  const [department, setDepartment] = useState(
    JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
  );

  useEffect(() => {
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    setDepartment(
      JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))?.filter(
        (itemt) => itemt.college_id == collegeId
      )
    );

    axios({
      ...config,
      url: `${ACADEMICS_ADD_CLASS}?college_id=${collegeId}`,
    })
      .then((res) => {
        setClassOpt(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios({
      ...config,
      url: `${ACADEMICS_ADD_SECTION}?college_id=${collegeId}`,
    })
      .then((res) => {
        setSectionOpt(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios({
      ...config,
      url: `${ACADEMICS_ADD_SEMESTER}?college_id=${collegeId}`,
    })
      .then((res) => {
        setSemesterOpt(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [localStorage.getItem(LOCAL_DEPARTMENT), collegeId]);

  let prevIds = [];

  const getData = async () => {
    if (!prog || !depart || !collegeId || !currentclass || !session) {
      toast.error("Please Enter All Details");
      return;
    }
    console.log("type - ", type);
    setLoading(1);
    const config1 = {
      method: "get",
      url: `${GET_STUDENT_BY_ID1}?session_id=${session}&class_id=${currentclass}&program=${prog}&department=${depart}&college=${collegeId}&application_status=APPROVED_REGISTRAR&type=${type?.value}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config1)
      .then(async (res) => {
        console.log("Id's Data", res.data.data);
        res.data.data.forEach((element) => {
          prevIds.push(
            parseInt(element.user_id.slice(-3, element.user_id.length))
          );
        });
        await prevIds.sort(function (a, b) {
          return a - b;
        });
        if (prevIds.length > 0) {
          LastId = prevIds[prevIds.length - 1];
        } else {
          LastId = 0;
        }
        console.log(prevIds);
        sessionStorage.setItem("LAST_ID", LastId);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
      });

    const config = {
      method: "get",
      url: `${GET_STUDENT_BY_ID}?session_id=${session}&class_id=${currentclass}&program=${prog}&department=${depart}&college=${collegeId}&application_status=APPROVED_REGISTRAR&type=${type?.value}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log("data2 - ", res.data.data);
        res.data.data.map((item, key) => {
          sectionOpt
            ?.filter((s) => s.semester_id == currentSemester)
            ?.map((item1, key) => {
              if (key == 0) {
                item.section = item1?.id;
              }
            });
        });
        res.data.data.sort((a, b) =>
          a.user_id.slice(-3).localeCompare(b.user_id.slice(-3))
        );
        setData(res.data.data);
        LastId++;
        let x = [];
        res.data.data.forEach((element) => {
          let old = element?.user_id;
          let str = old.replace(/\d{3,5}$/, "");
          let mainStr;
          if (LastId < 10) {
            let string_append = "";
            type.value == "C2D"
              ? (string_append = "50")
              : type.value == "D2D"
              ? (string_append = "70")
              : (string_append = "00");
            mainStr = str + string_append + LastId;
          } else if (LastId < 100) {
            let string_append1 = "";
            type.value == "C2D"
              ? (string_append1 = "5")
              : type.value == "D2D"
              ? (string_append1 = "7")
              : (string_append1 = "0");
            mainStr = str + string_append1 + LastId;
          } else {
            mainStr = str + LastId;
          }
          x.push({
            id: element.id,
            section: element.section,
            old_usn: old,
            usn: mainStr,
          });
          LastId++;
        });
        console.log(x);
        setAllIds(x);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
      });

    if (prevIds.length > 0) {
      LastId = prevIds[prevIds.length - 1];
    } else {
      LastId = 0;
    }

    setLoading(0);
  };

  const updateData = async () => {
    let y = [];
    LastId = sessionStorage.getItem("LAST_ID");
    LastId++;
    if (!allData || confirmFlag) {
      data.forEach((element) => {
        if (element.change && element.section) {
          let old = element?.user_id;
          let str = old.replace(/\d{3,5}$/, "");
          let mainStr;
          if (LastId < 10) {
            let string_append = "";
            type.value == "C2D"
              ? (string_append = "50")
              : type.value == "D2D"
              ? (string_append = "70")
              : (string_append = "00");
            mainStr = str + string_append + LastId;
          } else if (LastId < 100) {
            let string_append1 = "";
            type.value == "C2D"
              ? (string_append1 = "5")
              : type.value == "D2D"
              ? (string_append1 = "7")
              : (string_append1 = "0");
            mainStr = str + string_append1 + LastId;
          } else {
            mainStr = str + LastId;
          }
          y.push({
            id: element.id,
            section: element.section,
            old_usn: old,
            usn: mainStr,
          });
          LastId++;
        }
      });
    }
    setLoading(1);
    const config = {
      method: "post",
      data: allData ? allids : y,
      url: UPDATE_STUDENT_BY_ID,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        toast.success("SuccessFully Updated Details");
        setOpen(false);
        getData();
      })
      .catch((err) => {
        setLoading(0);
        setOpen(false);
        console.log(err);
      });
  };

  const handleDepartmentChange = (selectedOption) => {
    setDepart(selectedOption?.value);
  };

  const handleProgramChange = (selectedOption) => {
    setType("");
    setProg(selectedOption?.value);
  };

  const handletypeChange = (selectedOption) => {
    setType(selectedOption);
  };

  const handleClassChange = (selectedOption) => {
    setCurrentClass(selectedOption?.value);

    // Clear the selected semester when class changes
    setCurrentSemester(null); // or setCurrentSemester('')
  };

  const handleSemesterChange = (selectedOption) => {
    setCurrentSemester(selectedOption?.value);
  };

  const handleSessionChange = (selectedOption) => {
    setSession(selectedOption?.value);
  };

  return (
    <div className="StudentDetails">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title">Select Criteria</h2>
                    <br />
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Department <span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            name="depart"
                            className="form-control"
                            value={depart}
                            onChange={(e) => {
                              setDepart(e.target.value);
                            }}
                          >
                            <option value="" selected>
                              ALL
                            </option>
                            {department?.map((i, key) => (
                              <option value={i.id} key={key}>
                                {i.name}
                              </option>
                            ))}
                          </select> */}

                          <Select
                            options={[
                              ...department
                                ?.filter((s) => s.college_id == collegeId)
                                ?.map((i) => ({ value: i.id, label: i.name })),
                            ]}
                            value={
                              depart
                                ? {
                                    value: depart,
                                    label: department?.find(
                                      (i) => i.id == depart
                                    )?.name,
                                  }
                                : null
                            }
                            onChange={handleDepartmentChange}
                            placeholder="Select Department"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Program</label>
                          {/* <select
                            className="form-control"
                            value={prog}
                            onChange={(e) => {
                              setProg(e.target.value);
                            }}
                          >
                            <option value="">Select Program</option>
                            {program?.map((i, key) => (
                              <option value={i?.id}>{i?.name}</option>
                            ))}
                          </select> */}

                          <Select
                            options={[
                              ...program?.map((i) => ({
                                value: i.id,
                                label: i.name,
                              })),
                            ]}
                            value={
                              prog
                                ? {
                                    value: prog,
                                    label: program?.find((i) => i.id == prog)
                                      ?.name,
                                  }
                                : null
                            }
                            onChange={handleProgramChange}
                            placeholder="Select Program"
                          />
                        </div>
                      </div>

                      {prog == "04" || prog == "02" ? (
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="">Type</label>
                            <Select
                              options={[
                                { value: "Regular", label: "Regular" },
                                { value: "C2D", label: "C2D" },
                                { value: "D2D", label: "D2D" },
                              ]}
                              value={type}
                              onChange={handletypeChange}
                              placeholder="Select Type"
                            />
                          </div>
                        </div>
                      ) : null}
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Class</label>
                          {/* <select
                            className="form-control"
                            value={currentclass}
                            onChange={(e) => {
                              setCurrentClass(e.target.value);
                            }}
                          >
                            <option value="">Select Class</option>
                            {classopt
                              ?.filter((s) => s?.department_id == depart)
                              ?.map((i, key) => (
                                <option value={i?.id}>{i?.name}</option>
                              ))}
                          </select> */}

                          <Select
                            options={[
                              ...classopt
                                ?.filter((s) => s?.department_id == depart)
                                ?.map((i) => ({ value: i.id, label: i.name })),
                            ]}
                            value={
                              currentclass
                                ? {
                                    value: currentclass,
                                    label: classopt?.find(
                                      (i) => i.id == currentclass
                                    )?.name,
                                  }
                                : null
                            }
                            onChange={handleClassChange}
                            placeholder="Select Class"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Semester</label>
                          {/* <select
                            className="form-control"
                            value={currentSemester}
                            onChange={(e) => {
                              setCurrentSemester(e.target.value);
                            }}
                          >
                            <option value="">Select Semester</option>
                            {semesterOpt
                              ?.filter((s) => s.class_id == currentclass)
                              ?.map((i, key) => (
                                <option value={i?.id}>{i?.name}</option>
                              ))}
                          </select> */}

                          <Select
                            options={[
                              ...semesterOpt
                                ?.filter((s) => s.class_id == currentclass)
                                ?.map((i) => ({ value: i.id, label: i.name })),
                            ]}
                            value={
                              currentSemester
                                ? {
                                    value: currentSemester,
                                    label: semesterOpt?.find(
                                      (i) => i.id == currentSemester
                                    )?.name,
                                  }
                                : null
                            }
                            onChange={handleSemesterChange}
                            placeholder="Select Semester"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Select Session</label>
                          {/* <select
                            className="form-control"
                            value={session}
                            onChange={(e) => {
                              setSession(e.target.value);
                            }}
                          >
                            <option value="">Select Session</option>
                            {sessionOpt &&
                              sessionOpt.map((i, key) => {
                                return <option value={i?.id}>{i?.name}</option>;
                              })}
                          </select> */}

                          <Select
                            options={sessionOpt?.map((i) => ({
                              value: i.id,
                              label: i.name,
                            }))}
                            value={
                              session
                                ? {
                                    value: session,
                                    label: sessionOpt?.find(
                                      (i) => i.id == session
                                    )?.name,
                                  }
                                : null
                            }
                            onChange={handleSessionChange}
                            placeholder="Select Session"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row float-right">
                      <button
                        className="btn btn-primary btn-rounded"
                        type="submit"
                        name="submit"
                        onClick={getData}
                      >
                        <i className="fa fa-search" aria-hidden="true" /> Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        {" "}
                        <h4 className="card-title">Students Details</h4>
                      </div>
                      {data.length > 0 ? (
                        <div className="col-md-8">
                          <span className="float-right">
                            {!open ? (
                              <button
                                className="btn btn-primary mx-2"
                                onClick={() => setOpen(true)}
                              >
                                Edit
                              </button>
                            ) : null}
                            {open == true ? (
                              <>
                                <button
                                  className="btn btn-primary mx-2"
                                  onClick={() => updateData()}
                                >
                                  Save
                                </button>
                                <button
                                  className="btn btn-primary mx-2"
                                  onClick={() => {
                                    setallData(false);
                                    setOpen(false);
                                    if (!allData) {
                                      data?.forEach((item) => {
                                        item.change = 0;
                                      });
                                    }
                                  }}
                                >
                                  Cancel
                                </button>
                              </>
                            ) : null}
                          </span>
                        </div>
                      ) : null}
                    </div>
                    <div className="table-responsive">
                      <hr />
                      <h6>Students - {data?.length}</h6>
                      <table
                        id="datatable"
                        className="table table-bordered  nowrap table-hover"
                        style={{
                          borderCollapse: "collapse",
                          borderSpacing: 0,
                          width: "100%",
                        }}
                      >
                        <thead>
                          <tr>
                            <th>
                              <input
                                type="checkbox"
                                checked={allData ? true : false}
                                disabled={open ? false : true}
                                onClick={() => {
                                  setallData(!allData);
                                  if (!allData) {
                                    data?.forEach((item) => {
                                      item.change = 1;
                                    });
                                  } else {
                                    data?.forEach((item) => {
                                      item.change = 0;
                                    });
                                  }
                                  setFlag(!flag);
                                }}
                              />
                              All
                            </th>
                            <th>Select Section</th>
                            <th>Sl No</th>
                            <th>Enrollment No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Date of Birth</th>
                            <th style={{ width: "10rem" }}>Gender</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data && data.length !== 0 ? (
                            data?.map((i, key) => (
                              <tr>
                                <td>
                                  <input
                                    type="checkbox"
                                    checked={
                                      allData ? true : i?.change ? true : false
                                    }
                                    disabled={open ? false : true}
                                    onChange={() => {
                                      setallData(false);
                                      i.change == 1
                                        ? (i.change = 0)
                                        : (i.change = 1);
                                      setFlag(!flag);
                                    }}
                                  />
                                </td>
                                <td>
                                  <select
                                    className="form-control"
                                    onChange={(e) => {
                                      setConfirmFlag(true);
                                      i.section = parseInt(e.target.value);
                                    }}
                                  >
                                    {sectionOpt
                                      ?.filter(
                                        (s) => s.semester_id == currentSemester
                                      )
                                      ?.map((item, key) => {
                                        return (
                                          <>
                                            <option value={item?.id}>
                                              {item?.name}
                                            </option>
                                          </>
                                        );
                                      })}
                                  </select>
                                </td>
                                <td>{key + 1}</td>
                                <td>{i?.user_id}</td>
                                <td>{i?.name}</td>
                                <td>{i?.email}</td>
                                <td>{i?.phone}</td>
                                <td>{i?.dob?.split("T")[0]}</td>
                                <td>{i?.gender}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={10}>
                                <div align="center" className="text-danger">
                                  No data available in table <br /> <br />
                                  <img
                                    src="/assets/images/addnewitem.svg"
                                    width={150}
                                  />
                                  <br />
                                  <br />{" "}
                                  <span className="text-success bolds">
                                    <i className="fa fa-arrow-left" /> Add new
                                    record or search with different criteria.
                                  </span>
                                  <div />
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/* end col */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveStudentId;
