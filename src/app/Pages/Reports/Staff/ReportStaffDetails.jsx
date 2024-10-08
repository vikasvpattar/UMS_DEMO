import React, { useState, useEffect, useRef } from "react";
import {
  LOCAL_DEPARTMENT,
  LOCAL_USER_ROLES,
  LOCAL_COLLEGE,
} from "../../../utils/LocalStorageConstants";
import axios from "axios";
import { REPORT_STAFF_DETAILS } from "../../../utils/Reports.apiConst";
import { toast } from "react-toastify";
import { MDBDataTable } from "mdbreact";
import {formatDate} from "../../../utils/formatDate"
import {ageCalculator} from "../../../utils/ageCalculator"
import { useDownloadExcel } from 'react-export-table-to-excel'

export default function ReportStaffDetails({ setLoading, collegeId }) {

  
  //Export Start
  const tableRef = useRef();
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Staff Detail Reports',
    sheet: 'staff-details'
  });
  //Export End

  const [tableData, setTableData] = useState([]);

  //FORM HANDLE START
  const [formData, setFormData] = useState({
    college_id: "all",
    department: "all",
    role: "all",
    gender: "all",
    status: "all",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  //MDB TABLE DATA
  let mdbTableData = {
    columns: [
      {
        label: "S.No",
        field: "s_no",
        sort: "asc",
        width: 100
      },
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 150
      },
      {
        label: "Employee Id",
        field: "emp_id",
        sort: "asc",
        width: 100
      },
      {
        label: "Role",
        field: "role",
        sort: "asc",
        width: 270
      },
      {
        label: "Department",
        field: "department_name",
        sort: "asc",
        width: 300
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 200
      },
      {
        label: "Phone",
        field: "phone",
        sort: "asc",
        width: 150
      },
      {
        label: "Gender",
        field: "gender",
        sort: "asc",
        width: 100
      },
      {
        label: "Experience",
        field: "work_experience",
        sort: "asc",
        width: 100
      },
      {
        label: "Date of Birth",
        field: "dob",
        sort: "asc",
        width: '150px'
      },
      {
        label: "Date of Joining",
        field: "date_of_joining",
        sort: "asc",
        width: 100
      },
    ],
  }

   mdbTableData.rows= tableData.map((item,index) => ({
    s_no: index+1,
    name: `${item.first_name} ${item.last_name}`,
    emp_id: item.emp_id,
    role: item.role,
    department_name: item.department_name,
    email: item.email,
    phone: item.phone,
    gender: item.gender,
    work_experience: item.work_experience,
    dob:formatDate(item.dob),
    date_of_joining: formatDate(item.date_of_joining)
  }));

  const handleSubmit = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${REPORT_STAFF_DETAILS}?college_id=${formData.college_id}&department=${formData.department}&role=${formData.role}&gender=${formData.gender}&status=${formData.status}`,
    };

    await axios(config)
      .then((res) => {
        setTableData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      }).finally(() => {
        setLoading(0);
      });
  };

  //FORM HANDLE END

  //DYNAMIC DROPDOWN START

  //>states
  const [facultyData, setFacultyData] = useState(
    JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
  );

  const [departmentData, setDepartmentData] = useState(
    JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
  );

  const [roleData, setRoleData] = useState(
    JSON.parse(localStorage.getItem(LOCAL_USER_ROLES))
  );

  //>useEffect
  useEffect(() => {
    setDepartmentData(
      JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))?.filter(
        (item) => item.college_id == formData.college_id
      )
    );

    setFormData((prevValue) => {
      return {
        ...prevValue,
        department: "all",
      };
    });
  }, [formData.college_id]);

  //DYNAMIC DROPDOWN END


  

  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Staff Details</h4>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="card-body">
                        <div className="card-title">Select Criteria</div>
                        <div className="row">
                          <div className="col-md-2">
                            <div className="form-group">
                              <label htmlFor="">Faculty</label>
                              <select
                                className="form-control"
                                name="college_id"
                                onChange={handleChange}
                              >
                                <option value="all">All</option>
                                {facultyData?.map((item) => (
                                  <option value={item?.id} key={item?.id}>
                                    {item?.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="form-group">
                              <label htmlFor="">Department</label>
                              <select
                                className="form-control"
                                name="department"
                                onChange={handleChange}
                              >
                                <option value="all">All</option>
                                {departmentData?.map((item) => (
                                  <option value={item?.id} key={item?.id}>
                                    {item?.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="form-group">
                              <label htmlFor="">Role</label>
                              <select
                                className="form-control"
                                name="role"
                                onChange={handleChange}
                              >
                                <option value="all">All</option>
                                {roleData?.map((item) => (
                                  <option value={item?.id} key={item?.id}>
                                    {item?.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="form-group">
                              <label htmlFor="">Gender</label>
                              <select
                                className="form-control"
                                name="gender"
                                onChange={handleChange}
                              >
                                <option value="all">All</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="form-group">
                              <label htmlFor="">Status</label>
                              <select
                                className="form-control"
                                name="status"
                                onChange={handleChange}
                              >
                                <option value="all">All</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 d-flex justify-content-end">
                          <button
                            className="btn btn-success"
                            onClick={handleSubmit}
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h5>Staff List</h5>
                  </div>
                  <div className="col-md-6">
                    <button onClick={onDownload} className="btn btn-primary float-right ">
                      Export
                    </button>
                    {/* <button onClick={onDownload} className="btn btn-primary float-right mr-3">
                      Print
                    </button> */}
                  </div>
                  <div className="col-md-12">

                  <MDBDataTable className="table-responsive" responsive entries={50} striped bordered hover data={mdbTableData}/>
                    
                      <table style={{tableLayout:'fixed',width:'100%',fontSize:'9px',display:'none'}} ref={tableRef} className="table table-bordered">
                        <thead>

                          <tr>
                            <th>Photo</th>
                            <th>S.No</th>
                            <th>Employee Id</th>
                            <th>Employee Name</th>
                            <th>Department</th>
                            <th>Faculty Name</th>
                            <th>Designation</th>
                            <th>Father's name</th>
                            <th>Mother's name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Gender</th>
                            <th>Date of Birth</th>
                            <th>Marital Status</th>
                            <th>Current Address</th>
                            <th>Permanent Address</th>
                            <th>Qualification</th>
                            <th>Experience</th>
                            <th>Date of Joining</th>
                            <th>Current Work Experience</th>
                            <th>EPF Number</th>
                            <th>Work Shift</th>
                            <th>Location</th>
                            <th>Contract Type</th>
                            <th>Account Title</th>
                            <th>Account Number</th>
                            <th>Bank Name</th>
                            <th>IFSC Code</th>
                            <th>Bank Branch</th>
                            <th>Basic Salary</th>
                            <th>Deduction</th>
                            <th>Resume</th>
                            <th>Joining Letter</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        
                        <tbody>
                          {tableData?.map((item, index) => (
                            <tr key={item.id}>
                              <td className="text-break">{index+1}</td>
                              <td className="text-break"><img src={item.photo} width={50}/></td>
                              <td className="text-break">{item.emp_id}</td>
                              <td className="text-break">{item.first_name+' '+item.last_name}</td>
                              <td className="text-break">{item.department_name}</td>
                              <td className="text-break">{item.college_name}</td>
                              <td className="text-break">{item.role}</td>
                              <td className="text-break">{item.father_name}</td>
                              <td className="text-break">{item.mother_name}</td>
                              <td className="text-break">{item.email}</td>
                              <td className="text-break">{item.phone}</td>
                              <td className="text-break">{item.gender}</td>
                              <td className="text-break">{formatDate(item.dob)}</td>
                              <td className="text-break">{item.marital_status}</td>
                              <td className="text-break">{item.current_address}</td>
                              <td className="text-break">{item.permanent_address}</td>
                              <td className="text-break">{item.qualification}</td>
                              <td className="text-break">{item.work_experience}</td>
                              <td className="text-break">{formatDate(item.date_of_joining)}</td>
                              <td className="text-break">{ageCalculator(item.date_of_joining)}</td>
                              <td className="text-break">{item.epf_number}</td>
                              <td className="text-break">{item.work_shift}</td>
                              <td className="text-break">{item.location}</td>
                              <td className="text-break">{item.contract_type}</td>
                              <td className="text-break">{item.account_title}</td>
                              <td className="text-break">{item.account_number}</td>
                              <td className="text-break">{item.bank_name}</td>
                              <td className="text-break">{item.ifsc_code}</td>
                              <td className="text-break">{item.bank_branch}</td>
                              <td className="text-break">{item.basic_salary}</td>
                              <td className="text-break">{item.deduction}</td>
                              <td className="text-break">{item.resume}</td>
                              <td className="text-break">{item.joining_letter}</td>
                              <td className="text-break">{item.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    
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
