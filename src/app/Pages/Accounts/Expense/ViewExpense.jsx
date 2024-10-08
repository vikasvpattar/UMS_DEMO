import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Nodata from "../../../Components/NoData/Nodata";
import Select from 'react-select';
import { FEE_EXPENSE, FEE_EXPENSE_SOURCE, FEE_INCOME, FEE_INCOME_SOURCE } from "../../../utils/fees.apiConst";

function ViewExpense({setLoading, collegeId}) {

  const [data, setData] = useState([]);

  const [source, setSource] = useState()

  const [sourceData, setSourceData] = useState([])

  // const getData = () =>{

  //   if(!source) return toast.error("Select Source to continue")

  //   const config = {
  //     method:'get',
  //     url:`${FEE_EXPENSE}?college_id=${collegeId}&expense_source_id=${source}`,
  //     headers: {
  //       Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
  //       "Content-Type": "application/json",
  //     },
  //   }

  //   axios(config)
  //   .then(res=>{
  //     setLoading(0)
  //     setData(res.data.data)
  //   })
  //   .catch(err=>{
  //     setLoading(0)
  //     toast.error("Something Went Wrong")
  //   })
  // }

  const getData = () => {
    setLoading(1);
  
    // Check if the selected option is "ALL"
    if (!source || source === 'ALL') {
      const config = {
        method: 'get',
        url: `${FEE_EXPENSE}?college_id=${collegeId}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('UMS_auth')}`,
          'Content-Type': 'application/json',
        },
      };
  
      axios(config)
        .then((res) => {
          setLoading(0);
          res.data.data.sort((a, b) => b.id - a.id);
          setData(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          toast.error('Something Went Wrong');
        });
    } else {
      const config = {
        method: 'get',
        url: `${FEE_EXPENSE}?college_id=${collegeId}&expense_source_id=${source}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('UMS_auth')}`,
          'Content-Type': 'application/json',
        },
      };
  
      axios(config)
        .then((res) => {
          setLoading(0);
          setData(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          toast.error('Something Went Wrong');
        });
    }
  };

  const getAllData = () =>{
    setLoading(1)
    const config = {
      method:'get',
      url:`${FEE_EXPENSE_SOURCE}?college_id=${collegeId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    }

    axios(config)
    .then(res=>{
      setLoading(0)
      setSourceData(res.data.data)
    })
    .catch(err=>{
      setLoading(0)
      toast.error("Something Went Wrong")
    })
  }

  useEffect(()=>{
    getAllData()
  },[])

  const options = sourceData.map((i) => ({
    value: i.id,
    label: i.name,
  }));

  // Add the "ALL" option
  options.unshift({ value: '', label: 'ALL' });

  return (
    <div className="ViewExpense">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">View Expense</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Expense</a>
                      </li>
                      <li className="breadcrumb-item active"> View Expense</li>
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
                            <label htmlFor="validationCustom02">
                              Select<span style={{ color: "red" }}>*</span>
                            </label>
                            {/* <select
                             className="form-control" 
                             name="search_type"
                             value={source}
                             onChange={(e)=>{setSource(e.target.value)}}
                             >
                              <option value="">Select</option>
                              {
                                sourceData?.map((i,key)=>(
                                  <option value={i.id} key={key}>{i.name}</option>
                                ))
                              }
                            </select> */}

                            <Select
                              options={options}
                              value={options.find((opt) => opt.value === source)}
                              onChange={(selectedOption) => setSource(selectedOption?.value)}
                            />

                          </div>
                        </div>
                      </div>
                      <div className="row d-flex justify-content-end pr-3">
                          <button
                            className="btn btn-nex btn-rounded float-right  "
                            type="submit"
                            name="submit"
                            onClick={getData}
                          >
                            <i className="fa fa-search" aria-hidden="true" />{" "}
                            Search
                          </button>
                      </div>
                  </div>
                </div>
                {/* end card */}
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title text-uppercase ">
                      Expense List{" "}
                      <span className="text-danger">
                        {/* ( From : 2022-08-09 To : 2022-08-09 ) */}
                      </span>{" "}
                    </h4>

                    <hr />

                    <div className="table-responsive">
                      <table
                        id="table_id"
                        className="display table table-bordered  nowrap table-hover "
                        style={{
                          borderCollapse: "collapse",
                          borderSpacing: 0,
                          width: "100%",
                        }}
                      >
                        <thead>
                          <tr>
                            <th>Sl. No.</th>
                            <th>Source of Expense</th>
                            <th>Name</th>
                            <th>Invoice Number</th>
                            <th>Date</th>
                            <th>Amount (Rs.)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data 
                          &&
                          data?.length==0
                          ?
                          <tr>
                            <td colSpan={13}>
                              <Nodata/>
                            </td>
                          </tr>
                          :
                          data?.map((d, key) => {
                            return (
                            
                              <tr>
                                <td>{key+1}</td>
                                <td>{sourceData?.find(s=>s.id==d?.expense_source_id)?.name}</td>
                                <td>{d?.name}</td>
                                <td>{d?.invoice_number}</td>
                                <td>{d?.date?.split("T")[0]}</td>
                                <td>{d?.amount}</td>




                             
                              
                              </tr>
                            );
                          })}

                          
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
  );
}

export default ViewExpense