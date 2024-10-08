import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'
import { FEE_DETAILS } from '../../../utils/fees.apiConst'

const ModalReturnFee = ({setLoading, data, mainData, reloadData, collegeId}) => {

  const handleSubmit = () =>{
    const d = mainData?.feeDetails
    const config = {
      method:'post',
      url:`${FEE_DETAILS}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data:{
        ...mainData,
        student:{
          ...mainData.student,
          college_id:collegeId
        },
        feeDetails:
             mainData?.feeDetails.map((i)=>{
              if(i?.fee_type_id==data?.fee_type_id)
                return{
                  ...data,
                    paid_amount : 0,
                    reset: true
                }
              return i
              }),
      }
    }

    console.log(config)

    axios(config)
    .then(res=>{
      toast.success("Successfully Added")
      reloadData()
    })
    .catch(err=>{
      toast.error(err.response.data.message)
    })
  }


  return (
    <div className='ModalReturnFee'>
        <div
  className="modal fade"
  id="return"
  tabIndex={-1}
  role="dialog"
  aria-labelledby="return"
  style={{ display: "none" }}
  aria-hidden="true"
>
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="return">
          Confirmation
        </h5>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <p>
          Are you sure want to delete invoice, this action is irreversible. Do
          you want to proceed?
        </p>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
        >
          Close
        </button>
        <button
          type="button"
          className="btn btn-primary"
          id="return_event"
          data-dismiss="modal"
          onClick={handleSubmit}
        >
          Return
        </button>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default ModalReturnFee