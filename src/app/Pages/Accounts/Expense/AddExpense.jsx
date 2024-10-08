import React,{useState, useEffect} from 'react'
import { toast } from 'react-toastify'
import Nodata from '../../../Components/NoData/Nodata'
import { FEE_EXPENSE, FEE_EXPENSE_SOURCE } from '../../../utils/fees.apiConst'
import axios from 'axios'
import { getFileUrl } from '../../../Helpers/Helpers'
import Select from 'react-select';
import { ASSET_EMPLOYEE_DOCUMENT } from '../../../utils/AssetsReferenceTypes'

function AddExpense ({ setLoading, collegeId }) {

  const [user, setUser] = useState({
    expense_source_id: "",
    name: "",
    invoice_number: "",
    date: "",
    amount: "",
    description: "",
    document: ''
  })

  const [data, setData] = useState([])

  const [sourceData, setSourceDate] = useState([])

  const [edit, setEdit] = useState(0)


  //Function upload attachment to the s3
  const addAttachment1 = async(e) =>{
    try {
        const d = await getFileUrl(ASSET_EMPLOYEE_DOCUMENT,`${collegeId}_Expense`,e.target.value.split(".")[1],setLoading,e.target.files[0]);
        setUser(prev=>({
          ...prev,
          document:d
        }))
    } catch(error) {
        console.log(error);
    }

}



  const clearData = () => {
    const d = user?.expense_source_id
    setUser({
      expense_source_id: d,
      name: "",
      invoice_number: "",
      date: "",
      amount: "",
      description: "",
      document: ''
    }) 
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setUser(prevValue => ({
      ...prevValue,
      [name]: value
    }));
  }

  const getData = async() => {
    setLoading(1)
    const config = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    }

      axios({...config,url: `${FEE_EXPENSE}?expense_source_id=${user?.expense_source_id}`,})
      .then(res => {
        setLoading(0)
        setData(res.data.data)
      })
      .catch(err => {
        setLoading(0)
        toast.error("Something went wrong")
      })
  }

  const getOptData = async() => {
    setLoading(1)
    const config = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    }

    axios({...config, url: `${FEE_EXPENSE_SOURCE}?college_id=${collegeId}`,})
    .then(res => {
      setLoading(0)
      setSourceDate(res.data.data)
    })
    .catch(err => {
      setLoading(0)
      toast.error("Something went wrong")
    })
  }


  const handleSubmit = () => {
    if(!user.expense_source_id || !user.name || !user.invoice_number || !user.date || !user.amount) return toast.error('Mandatory Fields are required')

    const config = {
      method: 'post',
      url: `${FEE_EXPENSE}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user,
        college_id: collegeId
      }
    }

    axios(config)
      .then(res => {
        setLoading(0)
        toast.success("Success")
        getData()
        clearData()
      })
      .catch(err => {
        setLoading(0)
        toast.error("Something Went Wrong")
      })
  }


  const handleEdit = () => {
    if(!user.expense_source_id || !user.name || !user.invoice_number || !user.date || !user.amount) return toast.error('Mandatory Fields are required')

    const config = {
      method: 'put',
      url: `${FEE_EXPENSE}/${user?.id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user,
      }
    }

    axios(config)
      .then(res => {
        setLoading(0)
        toast.success("Success")
        getData()
        clearData()
        setEdit(0)
      })
      .catch(err => {
        setLoading(0)
        toast.error("Something Went Wrong")
      })
  }


  const handleDelete = (id) => {
    const config = {
      method: 'put',
      url: `${FEE_EXPENSE}/${id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        status: 'INACTIVE'
      }
    }

    axios(config)
      .then(res => {
        setLoading(0)
        getData()
        toast.success("Success")
      })
      .catch(err => {
        setLoading(0)
        toast.error("Something Went Wrong")
      })
  }

  useEffect(() => {
    getOptData()
  }, [])

  useEffect(() => {
    if(user?.expense_source_id) getData()
    else setData([])
  }, [user?.expense_source_id])

  const handleChangeSelect = (selectedOption) => {
    console.log("selectedOption",selectedOption);
    console.log("source value",selectedOption ? selectedOption.value : null);
    setUser((prevUser) => ({
      ...prevUser,
      expense_source_id: selectedOption ? selectedOption.value : null,
    }));
  };

  const options = sourceData.map((i) => ({
    value: i.id,
    label: i.name,
  }));

  return (
    <div className='AddExpense'>


      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Add Expense</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Expense</a>
                      </li>
                      <li className="breadcrumb-item active">
                        {" "}
                        Add Expense
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">

                    <h2 className="card-title">Add Criteria</h2>
                    <br />
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Expense Source<span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            name="expense_source_id"
                            id="expense_source_id"
                            className="form-control"
                            required="required"
                            value={user?.expense_source_id}
                            onChange={handleChange}
                          >
                            <option value="">Select Expense Source</option>
                            {
                                sourceData?.map((i,key)=>(
                                  <option value={i.id} key={key}>{i.name}</option>
                                ))
                              }
                          </select>{" "} */}
                           
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            isSearchable={true}
                            name="expense_source_id"
                            value={options.find((option) => option.value == user?.expense_source_id)}
                            onChange={handleChangeSelect}
                            options={options}
                          /> 

                        </div>
                      </div>
                      {
                        user?.expense_source_id
                        ?
                        <>
                        <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">Name</label>
                          <span style={{ color: "red" }}>*</span>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder=" Enter Name"
                            name="name"
                            value={user?.name}
                            onChange={handleChange}
                            required="required"
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          {" "}
                          <label htmlFor="validationCustom02">
                            Invoice Number<span style={{ color: "red" }}>*</span>
                            </label>
                          <input
                            type="text"
                            className="form-control"
                            id="invoice_number"
                            value={user?.invoice_number}
                            onChange={handleChange}
                            placeholder=" Enter Invoice Number"
                            name="invoice_number"
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">
                            Date<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="date"
                            placeholder="Add Date*"
                            name="date"
                            value={user?.date}
                            onChange={handleChange}
                            className="form-control"
                          />

                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Amount<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="amount"
                            placeholder=" Enter Total Amount"
                            name="amount"
                            value={user?.amount}
                            onChange={handleChange}
                            required="required"
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">Attach Document</label>
                          <input
                            type="file"
                            className="form-control"
                            id="doc"
                            placeholder=" Enter First Name"
                            name="document"
                            onChange={addAttachment1}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">Description</label>
                          <textarea
                            className="form-control"
                            name="description"
                            id="description"
                            cols={30}
                            rows={1}
                            defaultValue=""
                            value={user?.description}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                        </>
                        :
                        null
                      }
                      
                    </div>
                    <div className="row ">
                      <div className="col-md-12 ">
                        {
                          edit
                          ?
                          <button
                            className="btn btn-nex btn-rounded float-right "
                            type="submit"
                            name="submit"
                            onClick={handleEdit}
                          >
                            <i className="fa fa-save" aria-hidden="true" /> Save
                          </button>
                          :
                          <button
                            className="btn btn-nex btn-rounded float-right "
                            type="submit"
                            name="submit"
                            onClick={handleSubmit}
                          >
                            <i className="fa fa-save" aria-hidden="true" /> Save
                          </button>

                        }
                      </div>
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
                    <h4 className='card-title text-uppercase '>Expense Lists</h4>
                    <hr />

                    <div className="table-responsive">

                      <table
                        id="table_id"
                        className="display table table-bordered  nowrap table-hover "
                        style={{ borderCollapse: "collapse", borderSpacing: 0, width: "100%" }}
                      >
                        <thead>

                          <tr>
                            <th>Sl. No.</th>

                            <th>Source of Expense</th>
                            <th>Name</th>
                            <th>Invoice Number</th>
                            <th>Date</th>
                            <th>Amount</th>

                            <th>Action</th>


                          </tr>
                        </thead>
                        <tbody>


                          {
                            data
                              &&
                              data?.length == 0
                              ?
                              <tr>
                                <td colSpan={10}>
                                  <Nodata />
                                </td>
                              </tr>
                              :
                              data?.map((data, key) => {
                                return <tr key={key}>
                                  <td>{key + 1}</td>
                                  <td>{data?.expense_source_id}</td>
                                  <td>{data?.name}</td>

                                  <td>{data?.invoice_number}</td>
                                  <td>{data?.date?.split("T")[0]}</td>
                                  <td>{data?.amount}</td>




                                  <td>
                                    <span 
                                  className='badge badge-light text-dark mr-3' 
                                  data-toggle="tooltip" 
                                  title="Edit"
                                  onClick={()=>{
                                    setEdit(1)
                                    setUser(data)
                                  }}
                                  > <i class="fa fa-edit " aria-hidden="true"></i></span>
                                    <span className='badge badge-light text-danger mr-3' data-toggle="tooltip" title="Delete" onClick={() => handleDelete(data?.id)}> <i class="fa fa-trash " aria-hidden="true"></i></span>
                                    {
                                      data?.document
                                      ?
                                      <a href={data?.document} target='_blank' className='badge badge-light text-dark mr-3' data-toggle="tooltip" title="Attachment" > <i class="ri ri-attachment-2 " aria-hidden="true"></i></a>
                                      :
                                      null
                                    }
                                  </td>
                                </tr>
                              })


                          }
                        </tbody>
                      </table>
                      {user?.length == 0 ? <Nodata></Nodata> : null}

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

export default AddExpense