import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ModalAddEntitlment from "../../../modals/HR/Leave/Management/ModalAddEntitlment";
import { LEAVE_ENTITLEMENT, LEAVE_GET_ALL } from "../../../utils/apiConstants";
import { ALL_DATA } from "../../../utils/LocalStorageConstants";
import { SESSION_EMPLOYEE_ID } from "../../../utils/sessionStorageContants";
import Loader from "../../Loader/Loader";
import Nodata from "../../NoData/Nodata";

function Entitlement({ setLoading }) {
  const [data, setData] = useState([]);
  const employee = JSON.parse(localStorage.getItem(ALL_DATA)).employee;
  const [emp, setEmp] = useState("");
  const [alldata, setAllData] = useState([]);

  const getEmployeeId = () => {
    return sessionStorage.getItem(SESSION_EMPLOYEE_ID)
      ? sessionStorage.getItem(SESSION_EMPLOYEE_ID)
      : null;
  };

  const [employeeId, setEmployeeId] = useState(getEmployeeId);

  const getData = async (p) => {
    setLoading(1);
    setEmp(p);
    const config = {
      method: "get",
      url: `${LEAVE_ENTITLEMENT}?employee_id=${employeeId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        res.data.data = res.data.data?.filter(
          (s) => s.year == new Date().getFullYear()
        );
        setData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err.response.data.message);
      });
  };
  const getAlldata = async () => {
    const config = {
      method: "get",
      url: LEAVE_GET_ALL,
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
    getData("");
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
      />

      <div className="container mt-3">
        <div className="card">
          <div className="card-body">
            <div className="row d-flex justify-content-between p-3">
              <button className="btn btn-rounded btn-primary btn-outline px-4">
                Export &uarr;
              </button>
            </div>

            <div>
              {data && data.length !== 0 ? (
                data?.map((i, key) => (
                  <div
                    className="row my-3 mx-2 p-3 border rounded shadow report-div cursor-normal"
                    key={key}
                  >
                    <div className="col-12 row">
                      <div className="report-title col-12">
                        {
                          employee.find((j) => j.id === i.employee_id)
                            ?.first_name
                        }
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

export default Entitlement;
