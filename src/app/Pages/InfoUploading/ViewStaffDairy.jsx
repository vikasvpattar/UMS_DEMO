import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import {
  STAFF_DAIRY_GET,
  STAFF_DAIRY_GET1,
  STAFF_DAIRY_PUT,
} from "../../utils/InfoUploadingApiConstants";
import EditStaffDairy from "../../modals/HR/Staff/EditStaffDiaryModal";
import { EMPLOYEE_ALL } from "../../utils/apiConstants";
import {
  LOCAL_COLLEGE,
  LOCAL_DEPARTMENT,
} from "../../utils/LocalStorageConstants";

function ViewStaffDairy({ setLoading, collegeId }) {
  const [data, setData] = useState([]);

  let role = sessionStorage.getItem("role");

  const [data1, setData1] = useState([]);

  const [data2, setData2] = useState("");

  const [faculty, setFaculty] = useState("");

  const [collegeOpt, setCollegeOpt] = useState("");

  const [flag,setFlag] = useState(false);

  const [dept, setDept] = useState("");
  const [deptName, setDeptName] = useState("");

  const [emp, setEmp] = useState("");
  const [empName, setEmpName] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // When the user clicks the edit button
  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const setEmployee = (employee) => {
    setEmp(employee.value);
    setEmpName(employee);
  }

  const setDepartmentName = (employee) => {
    setDept(employee.value);
    setDeptName(employee);
  }

  useEffect(() => {
    if (role == "ADMIN") {
      setFaculty(sessionStorage.getItem("college_id"));
    } else if (role == "STAFF") {
      setDept(sessionStorage.getItem("department_id"));
      setDeptName({value:sessionStorage.getItem("department_id")})
      setFaculty(sessionStorage.getItem("college_id"));
      setEmp(sessionStorage.getItem("employee_id"));
    }
    getData();

  }, []);
  const [department, setDepartment] = useState(
    JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
  );

  const [college, setCollege] = useState(
    JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
  );

  useEffect(() => {
    setCollege(JSON.parse(localStorage.getItem(LOCAL_COLLEGE)));
  }, [localStorage.getItem(LOCAL_COLLEGE)]);

  // Check if emp_id is 187 to display the "Select Criteria" section

  let date = new Date().toISOString().split("T")[0];

  // Add state variables
  const [fromDate, setFromDate] = useState(date);
  const [toDate, setToDate] = useState(date);

  const getData = async () => {
    setLoading(1);
    const emp_id = sessionStorage.getItem("employee_id"); // Get current date

    const config = {
      method: "get",
      url:
        emp_id == 187 || emp_id == 25
          ? STAFF_DAIRY_GET
          : `${STAFF_DAIRY_GET}?emp_id=${emp_id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        res.data.data.sort((a, b) => b.id - a.id);
        setData(res.data.data);
        // Filter the data based on department and employee IDs
        const filteredData = res.data.data.filter((item) => {
          const employee = data1.find((e) => e.id === item.emp_id);
          return (
            !collegeOpt || (employee && employee.department_id == collegeOpt)
          );
        });

        if (emp_id != 187) {
          setData(filteredData);
        } else {
          const x = filteredData?.filter((s) => s.date == date);
          setData(x);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(0);
      });

    const config1 = {
      method: "get",
      url: EMPLOYEE_ALL,
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios(config1)
      .then((res) => {

        setData1(res.data.data);
        setLoading(0);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
      });
  };

  const getData1 = async () => {
    setLoading(1);
    if (fromDate && toDate && new Date(toDate) < new Date(fromDate)) {
      toast.error("To Date cannot be earlier than From Date");
      return;
    }

    const config = {
      method: "get",
      url: `${STAFF_DAIRY_GET1}?emp_id=${emp}&college_id=${faculty}&department_id=${dept}&from_date=${fromDate}&to_date=${toDate}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        res.data.data.sort((a, b) => b.id - a.id);
        setLoading(0);
        setData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
      });
  };

  const [deletedItems, setDeletedItems] = useState([]);

  const handleDelete = (id) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, status: "INACTIVE" } : item
    );
    setData(updatedData);

    setDeletedItems([...deletedItems, id]);

    const config = {
      method: "put",
      url: `${STAFF_DAIRY_PUT}/${id}`,
      // url: emp_id == 187 ? STAFF_DAIRY_PUT : `${STAFF_DAIRY_PUT}?emp_id=${emp_id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        status: "INACTIVE",
      },
    };

    axios(config)
      .then((res) => {
        setLoading(0);
        toast.success("Success");
        getData();
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something Went Wrong");
      });
  };

  let arr1 = [
    {
      id: 1,
      title: "Direct Teaching (Assigned)",
    },
    {
      id: 2,
      title: "Examination Duties",
    },
    {
      id: 3,
      title: "Student Related Co-Curricular Activities",
    },
    {
      id: 4,
      title: "Other Activities",
    },
    {
      id: 5,
      title: "Professional Development Activities",
    },
    {
      id: 6,
      title: "Administrative Responsibility",
    },
    {
      id: 7,
      title: "Research and Academic Contributions",
    },
  ];

  return (
    <div className="view">
      <EditStaffDairy
      flag={flag}
      setFlag={setFlag}
      setLoading={setLoading}
      data={data2}
      getData={getData}
      />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">View Staff Diary </h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">Home</li>
                      <li className="breadcrumb-item active">
                        View Staff Dairy
                      </li>
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
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Faculty <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="faculty"
                            id="section"
                            className="form-control"
                            value={faculty}
                            disabled={
                              role == "STAFF" || role == "ADMIN" ? true : false
                            }
                            onChange={(e) => {
                              setFaculty(e.target.value);
                            }}
                          >
                            <option value="" selected>
                              ALL
                            </option>
                            {college?.map((i, key) => (
                              <option value={i.id} key={key}>
                                {i.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Department <span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            name="department_id"
                            id="section"
                            className="form-control"
                            value={dept}
                            disabled={role == "STAFF" ? true : false}
                            onChange={(e) => {
                              setDept(e.target.value);
                            }}
                          >
                            <option value="">ALL</option>
                            {department
                              ?.filter((s) => s.college_id == faculty)
                              ?.map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.name}
                                </option>
                              ))}
                          </select> */}
                          <Select
                            className="react-select-container"
                            classNamePrefix="react-select"
                            name="faculty"
                            id="section"
                            value={deptName}
                            onChange={(e) => {
                              setDepartmentName(e);
                              setDept(e?.value);
                            }}
                            options={ [
                              { label: "All", value: "" },
                              ...department
                              ?.filter((s) => s.college_id == faculty)
                              ?.map((i) => ({
                                label: i.name,
                                value: i.id,
                              }))
                            ]
                            }
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Employee <span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            disabled={role == "STAFF" ? true : false}
                            name="emp"
                            id="section"
                            className="form-control"
                            value={emp}
                            onChange={(e) => {
                              setEmp(e.target.value);
                            }}
                          >
                            <option value="">ALL</option>
                            {console.log('dept - ', dept)}
                            {data1 &&
                              data1
                                ?.filter(
                                  (s) =>
                                    s.college_id == faculty &&
                                    (!dept || dept == "" || s.department_id == dept)
                                )
                                ?.map((i, key) => (
                                  <option value={i.id} key={key}>
                                    {i.first_name + i?.last_name}
                                  </option>
                                ))}
                          </select> */}
                          <Select
                            className="react-select-container"
                            classNamePrefix="react-select"
                            name="emp"
                            id="section"
                            value={empName}
                            onChange={(e) => {
                              setEmployee(e);
                              setEmp(e.value);
                            }}
                            options={data1 && [
                              { label: "All", value: "" },
                              ...data1
                                ?.filter(
                                  (s) =>
                                    s.college_id == faculty &&
                                    (!dept || dept == "" || s.department_id == dept)
                                )
                                ?.map((i) => 
                                    ({
                                    label : i?.first_name + i?.last_name,
                                    value : i.id
                            }))
                            ]}
                              
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            {" "}
                            From Date{" "}
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            name="fromDate"
                            value={fromDate ? fromDate : date}
                            onChange={(e) => {
                              setFromDate(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02"> To Date </label>
                          <input
                            type="date"
                            className="form-control"
                            id="validationCustom02"
                            placeholder="Purpose of Visiting"
                            name="toDate"
                            value={toDate ? toDate : date}
                            onChange={(e) => setToDate(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row float-right">
                      <button
                        className="btn btn-primary btn-rounded"
                        type="submit"
                        name="submit"
                        onClick={getData1}
                      >
                        <i className="fa fa-search" aria-hidden="true" /> Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div className="card-body">
                <h5 class=""> Staff Dairy List</h5>
                <hr />

                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Employee Name</th>
                      <th>Title</th>
                      <th>Date</th>
                      <th>From Time</th>
                      <th>To Time</th>
                      <th>Activity</th>
                      <th>Content</th>
                      <th>Attachments</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data
                        .filter((item) => !deletedItems.includes(item.id))
                        .filter((item) => {
                          const date = new Date(item.date).getTime();
                          const from = fromDate
                            ? new Date(fromDate).getTime()
                            : 0;
                          const to = toDate
                            ? new Date(toDate).getTime()
                            : Infinity;
                          return (
                            date >= from &&
                            date <= to &&
                            !deletedItems.includes(item.id)
                          );
                        })
                        .map((item, key) => {
                          if (item.status !== "INACTIVE") {
                            const emp_id =
                              sessionStorage.getItem("employee_id");
                            const showDeleteButton =
                              emp_id === "187" || emp_id === "25";

                            const fromDateTimestamp = fromDate
                              ? new Date(fromDate).getTime()
                              : 0;
                            const toDateTimestamp = toDate
                              ? new Date(toDate).getTime()
                              : Infinity;
                            const isCurrentDate = item.date === date;  
                            const itemDateTimestamp = new Date(
                              item.date
                            ).getTime();
                            if (
                              itemDateTimestamp >= fromDateTimestamp &&
                              itemDateTimestamp <= toDateTimestamp
                            )
                            
                             {
                              return (
                                <tr key={key}>
                                  <td>
                                    {data1?.filter(
                                      (s) => s.id == item?.emp_id
                                    )[0]?.first_name
                                      ? data1?.filter(
                                          (s) => s.id == item?.emp_id
                                        )[0]?.first_name +
                                        data1?.filter(
                                          (s) => s.id == item?.emp_id
                                        )[0]?.last_name
                                      : null}
                                  </td>
                                  <td>{item?.title}</td>
                                  <td>{item?.date}</td>
                                  <td>{item?.from_time}</td>
                                  <td>{item?.to_time}</td>
                                  {/* <td>{item?.activity}</td> */}
                                  <td>
                                    {
                                      arr1.filter(
                                        (s) => s.id === parseInt(item?.activity)
                                      )[0]?.title
                                    }
                                  </td>
                                  <td>{item?.content}</td>

                                  <td>
                                    {item?.attachments &&
                                    item?.attachments != "null" ? (
                                      <a
                                        href={item?.attachments}
                                        target="_blank"
                                      >
                                        {" "}
                                        Click Here{" "}
                                      </a>
                                    ) : null}
                                  </td>
                                  <td>{item?.description}</td>
                                  <td>
                                  { isCurrentDate && (


                            //       <td className="d-flex flex-nowrap justify-content-between">{ sessionStorage.getItem("role")!="SUPERADMIN" && sessionStorage.getItem("employee_id") == item?.emp_id ?
                            //         <a 
                            //         data-toggle="modal"
                            //         data-target="#EditStaffDairy"
                            //         onClick={()=>{
                            //           setData2(item)
                            //         }}
                            //         >
                            //             {/* <i
                            //               className="fa fa-edit"
                            //               aria-hidden="true"
                            //             /> */}
                            //             <button 
                            //             className="btn btn-primary mr-2"
                            //             type="submit"
                            //             name="submit"> Edit </button>
                            //             </a> :sessionStorage.getItem("role") =="SUPERADMIN" ?  <a 
                            //                   data-toggle="modal"
                            //                   data-target="#EditStaffDairy"
                            //                   onClick={()=>{
                            //                     setData2(item)
                            //                   }}
                            //             >
                            //             <i
                            //               className="fa fa-edit"
                            //               aria-hidden="true"
                            //             />
                            //             </a> : ""
                            // }
                            //         {showDeleteButton && (
                            //           <button
                            //             className="btn btn-danger mr-2 mt-2"
                            //             onClick={() => handleDelete(item?.id)}
                            //           >
                            //             Delete
                            //           </button>
                            //         )}
                            //       </td>


                                    <td className="d-flex flex-nowrap justify-content-between">
                                      {sessionStorage.getItem("role") !== "SUPERADMIN" &&
                                        sessionStorage.getItem("employee_id") == item?.emp_id ? (
                                      <a
                                        data-toggle="modal"
                                        data-target="#EditStaffDairy"
                                        onClick={() => {
                                          setData2({
                                            ...item,
                                            attachments: item.attachments || "",
                                          });
                                        }}
                                      >
                                      <button className="btn btn-primary mr-2" type="button" name="submit"
                                        onClick={() => handleEditClick(item)}
                                      >
                                        Edit
                                      </button>
                                      </a>
                                      ) : sessionStorage.getItem("role") === "SUPERADMIN" ? (
                                      <a
                                        data-toggle="modal"
                                        data-target="#EditStaffDairy"
                                        onClick={() => {
                                          setData2({
                                            ...item,
                                            attachments: item.attachments || "",
                                          });
                                        }}
                                      >
                                      <button className="btn btn-primary mr-2" type="button" name="submit">Edit</button>
                                      {/* <i className="fa fa-edit" aria-hidden="true" /> */}
                                      </a>
                                      ) : (
                                       <></>
                                      )}
                                      {showDeleteButton && (
                                      <button
                                        className="btn btn-danger mr-2 mt-2"
                                        onClick={() => handleDelete(item?.id)}
                                      >
                                        Delete
                                      </button>
                                      )}
                                    </td>
                                    
                                    
                                  )}
                                  </td>
                                  {/* ... */}
                                </tr>
                              );
                            } else {
                              return null; // Skip rendering for rows outside of the date range
                            }
                          } else {
                            return null; // Skip rendering for INACTIVE rows
                          }
                        })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewStaffDairy;
