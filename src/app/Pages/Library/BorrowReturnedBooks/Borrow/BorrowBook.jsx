import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { STUDENTS_LIST } from "../../../../utils/apiConstants";
import { LIBRARY_ADD_NEW_BOOK, LIBRARY_BOOK_BORROW, LIBRARY_BORROW_SEARCH, LIBRARY_SETTINGS } from "../../../../utils/Library.apiConst";
import Barcode from 'react-barcode';
import Select from "react-select";

function BorrowBook({ setLoading, collegeId }) {

  const current = new Date();
  const borrowed_date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  const [userId, setUserId] = useState('')


  const [user, setUser] = useState({
    book_image: "",
    book_barcode: "",

    book_title: "",
    book_author_one: "",

    book_isbn: "",
    date_borrowed: "",
    book_status: ""

  });
  const [bookBarcode, setBookBarcode] = useState('')

  const [addNew, setAddNew] = useState(false);
  const [data, setData] = useState([])
  const [issue, setIssueData] = useState([])

  const [stdData, setStdData] = useState([]);

  const [SearchedBook, setSearchedBook] = useState({})

  const [settings, setSettings] = useState()

  const [flag, setFlag] = useState(false)

  // get book list

  const getSettings = async () => {
    const config = {
      method: 'get',
      url: LIBRARY_SETTINGS
    }

    await axios(config)
      .then(res => {
        console.log(res);
        setSettings(res.data.data[0])
      })
      .catch(err => {
        console.log(err);
      })

  }


  const getdata = async () => {
    if (!userId) return toast.error('Select student to search')
    setLoading(1)
    const config = {
      method: 'get',
      url: `${LIBRARY_BOOK_BORROW}?user_id=${userId}&borrowed_status=BORROWED`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    }

    axios(config)
      .then(res => {
        const today = new Date()
        setLoading(0)
        setData(res.data.data)
        for (const i of res.data.data) {
          console.log(i);
          // calculate the difference in milliseconds between the two dates
          console.log(i.fetchBooksBorrow);
          const specifiedDate = new Date(i.fetchBooksBorrow.due_date)
          const differenceMs = today - specifiedDate;

          // convert the difference in milliseconds to days
          const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

          console.log(differenceDays);
          if(differenceDays>0){
            i.fetchBooksBorrow.book_penalty = Number(settings.penalty_amount)*differenceDays
          }
          else{
            i.fetchBooksBorrow.book_penalty = 0
          }
        }
        setFlag(true)
      })
      .catch(err => {
        setLoading(0)
        toast.error("Something Went Wrong")
      })
  }


  const getdataStdData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };
    await axios({ ...config, url: `${STUDENTS_LIST}?status=active&college_id=${collegeId}` })
      .then((res) => {
        setLoading(0);
        setStdData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Somethin went wrong");
      });
  };


  // Search book for borrow
  const searchBook = async (e) => {
    e.preventDefault()
    const config = {
      method: 'get',
      url: `${LIBRARY_BORROW_SEARCH}/${bookBarcode}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    }

    await axios(config)
      .then(res => {
        setSearchedBook(res.data.data)
        console.log(res.data.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const GetThisBook = async () => {
    if (data.length >= settings.no_of_books) return toast.error(`Student Cannot borrow more then ${settings.no_of_books} books`)
    let dueDate = new Date();
    dueDate.setDate(new Date().getDate() + settings.no_of_days);
    setLoading(1)
    const config = {
      method: 'post',
      url: `${LIBRARY_BOOK_BORROW}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        borrowed_status: "BORROWED",
        user_id: userId,
        book_barcode: bookBarcode,
        borrow_date: new Date(),
        due_date: dueDate,
        books_borrower: "student",
        book_id: SearchedBook.id
      }
    }


    await axios(config)
      .then(res => {
        console.log(res);
        toast.success('Borrowed Book Successfull')
        setSearchedBook()
        getdata()
      })
      .catch(err => {
        console.log(err);
        toast.error("Something went wrong")
      })

    setLoading(0)
  }

  const returnBook = async (b) => {
    const config = {
      method: 'put',
      url: LIBRARY_BOOK_BORROW + '/' + b.id,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        borrowed_status: "RETURNED",
        returned_date: new Date(),
        book_id: b?.book_id,
        user_id: b?.user_id,
        books_borrower: b?.books_borrower,
        book_penalty:b?.book_penalty
      }
    }

    await axios(config)
      .then(res => {
        console.log(res);
        toast.success('Returned Successfully')
        getdata()
      })
      .catch(err => {
        console.log(err);
        toast.error("Error while returning book")
      })
  }

  useEffect(() => {
    getdataStdData();
    setData([])
    getSettings()
  }, []);

  useEffect(() => {
    setFlag(false)
    setSearchedBook()
  }, [userId])

  useEffect(() => {
    setSearchedBook()
  }, [bookBarcode])



  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <>
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4 className="mb-0">Borrowed Transaction</h4>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        {/* <select
                            className="form-control"
                            name="user"
                            value={userId}
                            onChange={handleChange}
                          >
                            <option value="">Select Name</option>
                            {stdData?.map((i, key) => (
                              <option value={i.id} key={key}>
                                {i.name}
                              </option>
                            ))}
                          </select>{" "} */}
                        <Select
                          className="mt-3"
                          name="user"
                          onChange={p => setUserId(p.value)}
                          options={
                            [{ label: 'Select Student', value: '', selected: true },
                            ...stdData?.map((i) => ({ label: i?.user_id + '-' + i?.name, value: i?.user_id }))]
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <button
                        className="btn btn-primary float-right"
                        onClick={getdata}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {
                flag
                  ?
                  <div className="row">
                    <div className="col-12">
                      <div className="card">
                        <div className="card-body">
                          <h4 className="card-title">
                            Borrower Name :  <span className="text-danger">{stdData.find(data => data.user_id == userId)?.name}</span>
                          </h4>
                        </div>
                        <hr />
                        <div className="table-responsive">
                          <table
                            className="table table-bordered nowrap"
                            style={{
                              borderCollapse: "collapse",
                              borderSpacing: 0,
                              width: "100%",
                            }}
                          >
                            <thead>
                              <tr>
                                <th>Sl.No.</th>
                                <th>Title</th>
                                <th>Barcode</th>
                                <th>Authors</th>
                                <th>ISBN</th>
                                <th>Date Borrowed</th>
                                <th>Due Date</th>
                                <th>Penalty</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>

                              {
                                data && data.length != 0 ? data?.map((issue, key) => {
                                  return <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>{issue?.books?.book_title}</td>
                                    <td>
                                      {
                                        issue?.books?.book_barcode
                                          ?
                                          <Barcode value={issue?.books?.book_barcode} />
                                          :
                                          null
                                      }
                                    </td>
                                    <td>{issue?.books?.book_author_one}</td>
                                    <td>{issue?.books?.book_isbn}</td>



                                    <td> {issue?.fetchBooksBorrow?.borrow_date?.split("T")[0]}</td>
                                    <td>{issue?.fetchBooksBorrow?.due_date?.split("T")[0]}</td>
                                    <td>{issue?.fetchBooksBorrow?.book_penalty}</td>
                                    <td>
                                      <button
                                        className="btn btn-danger"
                                        onClick={() => returnBook(issue?.fetchBooksBorrow)}
                                      >
                                        Return
                                      </button>
                                    </td>





                                  </tr>
                                })
                                  :
                                  <tr>
                                    <td>No Books Borrowed </td>
                                  </tr>


                              }

                            </tbody>
                          </table>
                        </div>
                      </div>
                      {/* </div> */}
                      <div className="row">
                        <div className="col-12">
                          <div className="card">
                            <form onSubmit={searchBook}>
                              <div className="col-sm-4 ml-4 mt-4">
                                <input
                                  type="text"
                                  style={{ marginBottom: 10, marginLeft: "-9px" }}
                                  className="form-control"
                                  name="barcode"
                                  placeholder="Enter barcode here....."
                                  value={bookBarcode}
                                  onChange={(e) => { setBookBarcode(e.target.value) }}
                                />
                              </div>
                            </form>
                            <hr />
                            {
                              SearchedBook
                                ?
                                <div className="table-responsive">
                                  <table
                                    id=""
                                    className="table table-bordered nowrap"
                                    style={{
                                      borderCollapse: "collapse",
                                      borderSpacing: 0,
                                      width: "100%",
                                    }}
                                  >
                                    <thead className="text-center">
                                      <tr>
                                        <th>Book Image</th>
                                        <th>Barcode</th>
                                        <th>Title</th>
                                        <th>Authors</th>
                                        <th>ISBN</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody className="text-center">
                                      {

                                        <tr>
                                          <td>{SearchedBook?.book_image}</td>
                                          <td>
                                            {
                                              SearchedBook?.book_barcode
                                                ?
                                                <Barcode value={SearchedBook?.book_barcode} />
                                                :
                                                null
                                            }
                                          </td>
                                          <td>{SearchedBook?.book_title}</td>
                                          <td>{SearchedBook?.book_author_one}</td>
                                          <td>{SearchedBook?.book_isbn}</td>
                                          <td>{SearchedBook?.status}</td>
                                          <td>
                                            <button onClick={GetThisBook} className="btn btn-success">
                                              Borrow
                                            </button>
                                          </td>
                                        </tr>

                                      }

                                    </tbody>
                                  </table>
                                </div>
                                :
                                null
                            }

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  :
                  null
              }
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BorrowBook;
