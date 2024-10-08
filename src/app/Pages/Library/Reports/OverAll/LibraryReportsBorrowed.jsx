import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import Barcode from 'react-barcode'
import { toast } from 'react-toastify'
import { LIBRARY_BOOK_BORROW } from '../../../../utils/Library.apiConst'
import { useDownloadExcel } from 'react-export-table-to-excel';

const LibraryReportsBorrowed = ({ setLoading }) => {

    const [data, setData] = useState([])

    const tableRef = useRef()

    const getData = async () => {
        setLoading(1)
        const config = {
            method: 'get',
            url: `${LIBRARY_BOOK_BORROW}?borrowed_status=BORROWED`
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
            {/* <form action="#pills-staff-tab" method="POST">
                          <div className="row">
                            <div className="col-md-3">
                              <div className="form-group">
                                <label htmlFor="class">
                                  From Date <small className="text-danger">*</small>
                                </label>
                                <input
                                  type="date"
                                  className="form-control"
                                  name="return_from"
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
                                  name="return_to"
                                  defaultValue="2022-08-10"
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <button
                                className="btn btn-success float-right"
                                name="submit"
                                type="submit"
                                value="staff"
                              >
                                Search
                              </button>
                            </div>
                          </div>
                        </form> */}
            <div className="row mt-3">
                <div className="col-12 d-flex justify-content-between">
                    <h5>Borrowed Books Monitoring</h5>
                    <button onClick={onDownload} className="btn btn-success">
                        Export
                    </button>
                </div>
                <div className="col-md-12 ">
                    <div className="table-responsive">
                        <table
                            id=""
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
                                    <th>Sl.No.</th>
                                    <th>Barcode</th>
                                    <th>Borrower Name</th>
                                    <th>Title</th>
                                    <th>Date Borrowed</th>
                                    <th>Due Date</th>
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

export default LibraryReportsBorrowed