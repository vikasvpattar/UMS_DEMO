
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import ModalPanltyBooks from '../../../../modals/Library/ModalPanltyBooks'
import ModalAllowable from '../../../../modals/Library/Settings/ModalAllowable'
import ModalAllowBooks from '../../../../modals/Library/Settings/ModalAllowBooks'
import { LIBRARY_ALLOWED, LIBRARY_ALLOWED_DAYS, LIBRARY_BOOK_PENALTY, LIBRARY_SETTINGS } from '../../../../utils/Library.apiConst'

function LibrarySettings({setLoading, collegeId}) {

  const [booksallowed, setBooksAllowed] = useState([])
  const [booksallowedDays, setBooksAllowedDays] = useState([])
  const [booksPenalty, setBooksPenalty] = useState([])

  const getData = async() => {
    const config = {
      method:'get',
      url:LIBRARY_SETTINGS
    }

    await axios(config)
    .then(res=>{
      setBooksAllowed(res.data.data[0].no_of_books)
      setBooksAllowedDays(res.data.data[0].no_of_days)
      setBooksPenalty(res.data.data[0].penalty_amount)
      console.log(res);
    })
    .catch(err=>{
      console.log(err);
    })
  }

  const handleSubmit = async() => {
    const config = {
      method:'put',
      url:LIBRARY_SETTINGS+'/'+1,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data:{
        no_of_books:booksallowed,
        no_of_days:booksallowedDays,
        penalty_amount:booksPenalty
      }
    }

    await axios(config)
    .then(res=>{
      console.log(res);
      getData()
    })
    .catch(err=>{
      console.log(err);
      toast.error("Something went wrong")
    })
  }


  useEffect(()=>{
    getData();
  },[])
  return (
    <div className='LibrarySettings'>

      <ModalAllowBooks data={booksallowed} setData={setBooksAllowed} handleSubmit={handleSubmit}/>
      <ModalPanltyBooks data={booksPenalty} setData={setBooksPenalty} handleSubmit={handleSubmit}/>
      <ModalAllowable data={booksallowedDays} setData={setBooksAllowedDays} handleSubmit={handleSubmit}/>
    
    <div className="main-content">
  <div className="page-content">
    <div className="container-fluid">
      {/* Followup */}
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0">Settings List</h4>
          </div>
        </div>
      </div>
      {/* end page title */}
      {/* container-fluid */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Details</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
  <div className="col-12">
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Details</h4>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <p>
              <span className="h4 pl-2 ">Allowed Books </span> per User
            </p>
            <hr />
            <div className="x_content">
             
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{booksallowed}</td>
                    <td>
                      <a
                        className="btn btn-primary"
                        htmlFor="ViewAdmin"
                      href=""
                        data-toggle="modal"
                        data-target="#allowbooks"
                      >
                        <i className="fa fa-edit" /> Edit
                      </a>
                    </td>
                    {/* edit modal */}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-4 ">
          <div className="card">
            <p>
              <span className="h4 pl-2">Penalty</span> per day
            </p>
            <hr />
            <div className="x_content">
            
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Amount (Rs.)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{booksPenalty}</td>
                    <td>
                      <a
                        className="btn btn-primary"
                        htmlFor="ViewAdmin"
                        href="#penalty_edit1"
                        data-toggle="modal"
                        data-target="#penalty_edit1"
                      >
                        <i className="fa fa-edit" /> Edit
                      </a>
                    </td>
                    {/* edit modal */}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <p>
              <span className="h4 pl-2">Allowable </span>days
            </p>
            <hr />
            <div className="x_content">
             
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>No. of Day/Days</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{booksallowedDays}</td>
                    <td>
                      <a
                        className="btn btn-primary"
                        htmlFor="ViewAdmin"
                        href="#days_edit1"
                        data-toggle="modal"
                        data-target="#days_edit1"
                      >
                        <i className="fa fa-edit" /> Edit
                      </a>
                    </td>
                    {/* edit modal */}
                  </tr>
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
  )
}

export default LibrarySettings