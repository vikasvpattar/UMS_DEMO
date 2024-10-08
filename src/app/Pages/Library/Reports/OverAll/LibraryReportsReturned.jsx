import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState, useRef } from 'react'
import Barcode from 'react-barcode'
import { toast } from 'react-toastify'
import { LIBRARY_BOOK_BORROW } from '../../../../utils/Library.apiConst'
import { useDownloadExcel } from 'react-export-table-to-excel';

const LibraryReportsReturned = ({ setLoading }) => {

    const [data, setData] = useState([])

    const tableRef = useRef()

    const getData = async () => {
        setLoading(1)
        const config = {
            method: 'get',
            url: `${LIBRARY_BOOK_BORROW}?borrowed_status=RETURNED`
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
            {/* <form action="#pills-daily-tab" method="post">
                          <div className="row">
                            <div className="col-md-3">
                              <div className="form-group">
                                <label htmlFor="class">
                                  From Date <small className="text-danger">*</small>
                                </label>
                                <input
                                  type="date"
                                  className="form-control"
                                  name="from"
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
                                  name="to"
                                  defaultValue="2022-08-10"
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <button
                                className="btn btn-success float-right"
                                name="submit"
                                type="submit"
                                value="subject"
                              >
                                Search
                              </button>
                            </div>
                          </div>
                        </form> */}
            <div className="row mt-3">
                <div className="col-md-12 ">
                    <div className='d-flex justify-content-between'>

                        <h5>Returned Books Monitoring</h5>
                        <button onClick={onDownload} className="btn btn-success">
                            Export
                        </button>
                    </div>
                    <div className="pull-left">
                        <div className="span">
                            <div className="alert alert-info">
                                <i className="icon-credit-card icon-large" />
                                &nbsp;Total Amount of Penalty:&nbsp;Rs. ₹{data.reduce((sum, cur) => sum + Number(cur?.fetchBooksBorrow?.book_penalty), 0)}
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <hr />
                        <table
                            id=""
                            className="table table-bordered  nowrap table-hover"
                            style={{
                                borderCollapse: "collapse",
                                borderSpacing: 0,
                                width: "100%"
                            }}
                            ref={tableRef}
                        >
                            <thead>
                                <tr>
                                    <th>Sl.No.</th>
                                    <th>Barcode</th>
                                    <th>Borrower Name</th>
                                    <th>Title</th>
                                    <th>Date Borrowed</th>
                                    <th>Due Date</th>
                                    <th>Returned Date</th>
                                    <th>Penalty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && data?.length != 0
                                        ?
                                        data?.map((i, key) => (
                                            <tr>
                                                <td>{key + 1}</td>
                                                <td>
                                                    {i?.books?.book_barcode
                                                        ?
                                                        <Barcode value={i?.books?.book_barcode} />
                                                        :
                                                        null
                                                    }
                                                </td>
                                                <td>{i?.user}</td>
                                                <td>{i?.books?.book_title}</td>
                                                <td>{i?.fetchBooksBorrow?.borrow_date?.split("T")[0]}</td>
                                                <td>{i?.fetchBooksBorrow?.due_date?.split("T")[0]}</td>
                                                <td>{i?.fetchBooksBorrow?.returned_date?.split("T")[0]}</td>
                                                <td>{i?.fetchBooksBorrow?.book_penalty ? '₹' + i?.fetchBooksBorrow?.book_penalty : '₹0'}</td>
                                            </tr>
                                        ))

                                        :
                                        <tr>
                                            {" "}
                                            <td colSpan={35}>
                                                <div className="text-danger" align="center">
                                                    No data available in table <br /> <br />
                                                    <img
                                                        src="../assets/images/addnewitem.svg"
                                                        width={150}
                                                    />
                                                    <br />
                                                    <br />{" "}
                                                    <span className="text-success bolds">
                                                        <i className="fa fa-arrow-left" /> Add new record
                                                        or search with different criteria.
                                                    </span>
                                                    <div />
                                                </div>
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

export default LibraryReportsReturned