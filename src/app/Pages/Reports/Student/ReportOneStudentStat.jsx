import React from "react";
import avatar from "../../../assets/images/reports/graduated.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Http } from "../../../Services/Services";
import { ACADEMICS_ADD_SUBJECT } from "../../../utils/Academics.apiConst";
import { useState } from "react";
import { useEffect } from "react";
import { ROUTES } from "../../../Router/routerConfig";

const ReportOneStudentStat = ({ setLoading }) => {
  const navigate = useNavigate();

  const [subjectData, setSubjectData] = useState([]);
  const getData = async () => {
    await Http.get(
      `${ACADEMICS_ADD_SUBJECT}?semester_id=${data?.data?.[0]?.semester_id}`
    )
      .then((res) => {
        console.log('data - ', res.data.data);
        setSubjectData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // setLoading(false)
  };

  const { state } = useLocation();
  const { data } = state;

  const changeDir = (i) => {
    let role = sessionStorage.getItem("role");
    if (role == "SUPERADMIN") {
      navigate(
        ROUTES.Registar.Reports.Student.StudentSubStat +
          "/" +
          data?.student_id +
          "/" +
          i
      );
    } else if (role == "ADMIN") {
      navigate(
        ROUTES.Principal.Reports.StudentSubStat +
          "/" +
          data?.student_id +
          "/" +
          i
      );
    } else if (role == "STAFF") {
      navigate(
        ROUTES.Employee.Reports.StudentSubStat +
          "/" +
          data?.student_id +
          "/" +
          i
      );
    }
  };

  useEffect(() => {
    getData();
  }, [data?.data?.[0]?.semester_id]);

  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-header">
                      Student Attendance - {data?.student_id}
                    </h6>
                    <div className="row mt-5">
                      <div className="col-md-1">
                        <img
                          src={avatar}
                          className=" rounded-pill"
                          style={{ width: "100px" }}
                          alt="Student Picture"
                        />
                      </div>
                      <div className="col-md-11">
                        <div>
                          <b>Name : </b> {data?.student_name} <br />
                          <b>Class : </b> {data?.data?.[0]?.class} <br />
                          <b>Semester : </b> {data?.data?.[0]?.semester} <br />
                          <b>Phone : </b> {data?.data?.[0]?.phone} <br />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-header">
                      Student Attendance - {data?.student_id}
                    </h6>
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <tr>
                          <th>Subject</th>
                          <th>Present</th>
                          <th>Absent</th>
                          <th>Percentage</th>
                        </tr>

                        {subjectData?.map((i, key) => {
                          const dd = data?.data?.find(
                            (j) => j?.course_id === i?.id
                          );

                          let total = Number(dd?.present) + Number(dd?.absent);
                          let percent = (Number(dd?.present) / total) * 100;
                          return (
                            <tr>
                              <td
                                className="text-primary fst-underlined cursor-pointer"
                                onClick={() => changeDir(i?.id)}
                              >
                                {i?.name}
                              </td>
                              <td>{dd?.present}</td>
                              <td>{dd?.absent}</td>
                              <td>
                                {!dd?.present && !dd?.absent ? (
                                  <span className="badge badge-soft-secondary">
                                    NA
                                  </span>
                                ) : percent < 85 && percent >= 60 ? (
                                  <span className="badge badge-soft-warning">
                                    {percent?.toFixed(2)}%
                                  </span>
                                ) : percent < 60 ? (
                                  <span className="badge badge-soft-danger">
                                    {percent?.toFixed(2)}%
                                  </span>
                                ) : percent >= 85 ? (
                                  <span className="badge badge-soft-success">
                                    {percent?.toFixed(2)}%
                                  </span>
                                ) : null}
                              </td>
                            </tr>
                          );
                        })}
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
  );
};

export default ReportOneStudentStat;
