import React,{useEffect,useState} from 'react'
import DocumentApprovalWorkflow from '../../../../modals/HR/DocumentWorkflow/DocumentApprovalWorkFlow'
import { EMPLOYEE_DOCUMENT_APPROVAL_WORKFLOW, HR_WORKFLOW } from '../../../../utils/apiConstants';
import './../DocumentWorkflow.scss'
import axios from 'axios';
import Loader from '../../../../Components/Loader/Loader';
import { toast } from 'react-toastify';
import Nodata from '../../../../Components/NoData/Nodata';

function DocApprovalWorkflow({setLoading, collegeId}) {
  const [data, setData] = useState([]);
  const [type, setType] = useState()
  const [edit, setEdit] = useState();

  const getData = async () => {
    setLoading(1)
    const config = {
      method: 'get',
      url: `${HR_WORKFLOW}?type=DOCUMENT&&college_id${collegeId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
      },
    };

    await axios(config)
    .then((res) => {
        setLoading(0)
        console.log(res.data.data);
        setData(res.data.data)
        // toast.success("Data Fetched Success ")
      })
      .catch(err =>
        {
          setLoading(0)
          console.log(err)
        })
          
      
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className='DocApprovalWorkflow'>
      <DocumentApprovalWorkflow reloadData={getData} type={type} data={edit} setLoading={setLoading} collegeId={collegeId}/>
      <div className="main-content">

        <div className="page-content">
          <div className="container-fluid">

            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Approval Workflow</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">Human Resource</li>
                      <li className="breadcrumb-item active">Document Approval Workflow</li>
                    </ol>
                  </div>

                </div>
              </div>
            </div>

            <div >
              <div className="card">
                <div className="card-body">

                  <div className="row d-flex justify-content-end p-3">
                    <button
                      className="btn btn-rounded btn-success btn-outline px-4 mb-3"
                      data-toggle="modal"
                      data-target="#ModalDocApproval"
                      onClick={() => { setType("add"); setEdit() }}
                    >
                      Add +
                    </button>
                  </div>

                  <div>
                    {data && data.length !== 0?data.map((i,key)=>(
                      <div
                      className="row mt-3 mx-2 p-3 border rounded role-div flex-nowrap shadow"
                      data-toggle="modal"
                      data-target="#ModalDocApproval"
                      onClick={() => { setType("edit"); setEdit(i); }}
                    >
                      <div className="col-11" >
                        <div className="role-title">
                              {i.title}
                        </div>
                        {/* <div className="role-code">
                          {i.id}
                        </div> */}
                      </div>
                    </div>
                    ))
                  :
                  <Nodata/>
                    }
                    

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

export default DocApprovalWorkflow