import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { LIBRARY_BORROW_LOGS } from '../../../../utils/Library.apiConst';
import { useDownloadExcel } from 'react-export-table-to-excel';


function OverAllBooks({setLoading}) {
  const [data, setData] = useState([])

  const tableRef = useRef()

  const getData = async () => {
    setLoading(1)
    const config = {
      method: 'get',
      url: LIBRARY_BORROW_LOGS
    }
    
    await axios(config)
    .then(res => {
        setData(res.data.data)
      })
      .catch(err => {
        console.log(err);
        toast.error("Something went wrong")
      })
      setLoading(0)
    }
    
    useEffect(() => {
    getData()
  }, [])

  //Function to export table in excel
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Users table',
    sheet: 'Users'
  });

  return (


    <div
    >
      {/* <form action="#pills-attendance-tab" method="POST">
        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="class">
                From Date <small className="text-danger">*</small>
              </label>
              <input
                type="date"
                className="form-control"
                name="borrow_from"
                defaultValue="2022-08-10"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="class">
                To Date <small className="text-danger">*</small>
              </label>
              <input
                type="date"
                className="form-control"
                name="borrow_to"
                defaultValue="2022-08-10"
              />
            </div>
          </div>
          <div className="col-md-12">
            <button
              className="btn btn-success float-right"
              name="submit"
              type="submit"
              value="std"
            >
              Search
            </button>
          </div>
        </div>
      </form> */}
      <div className="row mt-3">
        <div className="col-12 d-flex justify-content-between">
          <h5>Overall Books Report</h5>
          <button onClick={onDownload} className="btn btn-success">
            Export
          </button>
        </div>
        <div className="col-md-12 ">
          <div className="table-responsive">
            <table
              className="table   text-wrap table-hover"
              style={{
                borderCollapse: "collapse",
                borderSpacing: 0,
                width: "100%"
              }}
              ref={tableRef}
            >
              <thead>
                <tr>
                  <th>Sl.No</th>
                  <th>Members Name	</th>
                  <th>Book Title	</th>
                  <th>Task</th>
                  <th>Person In Charge</th>
                  <th>Date Transaction</th>
                </tr>
              </thead>
              <tbody>
                {
                  data && data?.length != 0
                    ?
                    data?.map((d, key) => {
                      return (
                        <tr>
                          <td>{key + 1}</td>
                          <td>{d?.name}</td>
                          <td>{d?.book_title}</td>
                          <td>{d?.task}</td>
                          <td>{d?.in_charge}</td>
                          <td>{d?.date?.split("T")[0]}</td>
                        </tr>
                      );
                    })
                    :
                    <tr>
                      <td
                        style={{ padding: 10 }}
                        className="alert alert-danger"
                      >
                        No Books returned at this moment
                      </td>
                    </tr>
                }

              </tbody>
            </table>
            <br />
          </div>
        </div>
      </div>
    </div>

  )
}

export default OverAllBooks