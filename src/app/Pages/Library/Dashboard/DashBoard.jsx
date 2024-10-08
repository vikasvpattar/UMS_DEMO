import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LIBRARY_ADD_NEW_BOOK, LIBRARY_DASHBOARD } from "../../../utils/Library.apiConst";
import { LOCAL_COLLEGE } from "../../../utils/LocalStorageConstants";
import { LIBRARY_BORROW_LOGS } from "../../../utils/Library.apiConst";
import { STUDENTS_LIST_GET } from "../../../utils/InfoUploadingApiConstants";
import { STUDENT_DETAILS } from "../../../utils/apiConstants";

const DashBoard = ({college_id, currentDate}) => {

  const getCollegeData = () => {
    return localStorage.getItem(LOCAL_COLLEGE)
      ? JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
      : null;
  };

  const [collegeOpt, setCollegeOpt] = useState(getCollegeData());

  useEffect(() => {
    setCollegeOpt(getCollegeData());
  }, [localStorage.getItem(LOCAL_COLLEGE)]);
  

  const [data, setData] = useState();

  const [data1, setData1] = useState();

  const getData = async () => {
    const config = {
      method: "get",
      //url: LIBRARY_DASHBOARD,
      url: `${LIBRARY_DASHBOARD}?faculty=${sessionStorage.getItem("college_id")}`
    };

    await axios(config)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });

  };


  const getData1 = async () => {

    const config = {
      method: "get",
      url: LIBRARY_ADD_NEW_BOOK,
    };

    await axios(config)
      .then((res) => {
        console.log(res);
        setData1(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });


      const config1 = {
        method: "get",
         url: STUDENT_DETAILS,
       // url: STUDENT_DETAILS ? `${STUDENT_DETAILS}?user_id = ${LIBRARY_ADD_NEW_BOOK}?book_isbn` : null,
      };
  
      await axios(config1)
        .then((res) => {
          console.log(res);
          setData1(res.data.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong");
        });


        const config2 = {
          method: "get",
          url: LIBRARY_BORROW_LOGS,
          //url: LIBRARY_BORROW_LOGS ? `${LIBRARY_BORROW_LOGS}?user_id = ${LIBRARY_ADD_NEW_BOOK}?book_isbn` : null,
        };
    
        await axios(config2)
          .then((res) => {
            console.log(res);
            setData1(res.data.data);
          })
          .catch((err) => {
            console.log(err);
            toast.error("Something went wrong");
          });



  };


  useEffect(() => {
    getData();
    getData1();
  }, []);

  
  return (
    <div className="Dashboard">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Dashboard</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Home</a>
                      </li>
                      <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div className="row">
                  <div className="col-md-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="media">
                          <div className="media-body overflow-hidden">
                            <p className="text-truncate font-size-14 mb-2">
                              Total Number of Books{" "}
                            </p>

                            <h4 className="mb-0">
                              {data?.totalBooks}
                            </h4>                            
                            
                          </div>
                          <div className="text-primary">
                            <img
                              src="../assets/images/books.png"
                              width="50px"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="media">
                          <div className="media-body overflow-hidden">
                            <p className="text-truncate font-size-14 mb-2">
                              {" "}
                              Total Book Borrowed
                            </p>
                            <h4 className="mb-0">{data?.totalBorrowed}</h4>
                          </div>
                          <div className="text-primary">
                            <img
                              src="../assets/images/checklist.png"
                              width="50px"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="media">
                          <div className="media-body overflow-hidden">
                            <p className="text-truncate font-size-14 mb-2">
                              {" "}
                              Today Borrowed Book
                            </p>
                            <h4 className="mb-0">
                              {/* {data?.totalBorrowed} */}
                              {data?.allBorrowed}
                            </h4>
                          </div>
                          <div className="text-primary">
                            <img
                              src="../assets/images/schedule.png"
                              width="50px"
                              alt=""
                            />
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
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                          <h4 className="mb-0">
                            Recents Book Borrow / Return List
                          </h4>
                        </div>
                        <div className="table-responsive">
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
                                <th>Sl No.</th>
                                <th>Book Name</th>
                                <th>Enrollement Number</th>
                                <th>Full Name</th>
                                <th>Contact Number</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              
                              {data?.bookLogs?.map((i, key) => {
                                const correspondingBookLog2 = data?.bookLogs2?.[key] 
                                const correspondingBookLog3 = data?.bookLogs3?.[key]; 
                                  return (
                                    <tr key={key}>
                                      <td>{key + 1}</td>
                                      <td>{i?.book_title}</td>
                                      <td>{correspondingBookLog3?.user_id}</td>
                                      <td>{correspondingBookLog2?.name}</td> 
                                      <td>{correspondingBookLog2?.phone}</td>
                                      <td>{correspondingBookLog3?.task}</td>
                                    </tr>
                                  );
                              })}


                              {/* {data?.data?.map((i, key) => {           
                                  return (
                                    <tr key={key}>
                                      <td>{key + 1}</td>
                                      <td>{i?.book_title}</td>
                                      <td>{i?.user_id}</td>
                                      <td>{i?.name}</td> 
                                      <td>{i?.phone}</td>
                                      <td>{i?.task}</td>
                                    </tr>
                                  );
                              })} */}

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
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
