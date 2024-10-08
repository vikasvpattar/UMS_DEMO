import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Toggler from "../../../Components/Toggler/Toggler";
import { LOCAL_JOBROLES } from "../../../utils/LocalStorageConstants";
import { HR_WORKFLOW } from "../../../utils/apiConstants";

function ModalApprovalWorkFlow({
  type,
  id,
  data,
  reloadData,
  setLoading,
  approvers,
  collegeId,
}) {
  // const [LocalJobRoles,setLocalJobRoles] = useState(JSON.parse(localStorage.getItem(LOCAL_JOBROLES)))

  //object for all input values
  const [user, setUser] = useState({
    title: "",
    approver_1: "",
    approver_2: "",
    approver_3: "",
    approver_4: "",
    notification: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  //fuction to clear the input fields after completion of any operation
  const clearData = () => {
    setUser({
      title: "",
      approver_1: "",
      approver_2: "",
      approver_3: "",
      approver_4: "",
      notification: true,
    });
  };

  //fuction to call after post or put
  const handleSubmit = async (d) => {
    //config for axios
    const config = {
      method: type === "edit" ? "put" : "post",
      url: `${HR_WORKFLOW}${type === "edit" ? "/" + data.id : ""}?type=LEAVE`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
      data: {
        ...user,
        type: "LEAVE",
        college_id: collegeId,
      },
    };
    console.log(config);

    setLoading(1);
    await axios(config)
      .then((res) => {
        setLoading(0);
        toast.success(res.data.message);
        console.log(res);
        reloadData();
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    if (type === "edit") {
      if (data) {
        setUser({
          title: data.title,
          type: data.type,
          approver_1: data.approver_1,
          approver_2: data.approver_2,
          approver_3: data.approver_3,
          approver_4: data?.approver_4,
          notification: data.notification,
        });
      }
    }

    if (type === "add") {
      clearData();
    }
  }, [data, type]);

  // useEffect(()=>{
  //     setLocalJobRoles(JSON.parse(localStorage.getItem(LOCAL_JOBROLES)))
  // },[])

  return (
    <div className="ModalApprovalWorkFlow">
      <div className="ModalEarningPolicy">
        <div
          className="modal fade"
          id="ModalApprovalWorkFlow"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered mw-100 w-75"
            role="document"
          >
            <div className="modal-content ">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  {/* {props.type === 'edit' ? 'Edit' : 'Add'}  */}
                  Approval Workflow
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
                <div className="row">
                  {/* <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="">CODE <span style={{color:'red'}}>*</span></label>
                                        <input 
                                        type="text" 
                                        className="form-control"
                                        placeholder='Enter Code'
                                        value={code}
                                        onChange={(e)=>{setCode(e.target.value)}}
                                         />
                                    </div>
                                </div> */}
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="">
                        Title <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Title"
                        name="title"
                        value={user.title}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="">
                        1st Approver <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        type="text"
                        className="form-control"
                        name="approver_1"
                        value={user.approver_1}
                        onChange={handleChange}
                      >
                        <option value="" selected>
                          Select Employee
                        </option>
                        {approvers.map((i, key) => (
                          <option key={key} value={i.employee_id}>
                            {i.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="">
                        2nd Approver <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        type="text"
                        placeholder="Enter Title"
                        className="form-control"
                        name="approver_2"
                        value={user.approver_2}
                        onChange={handleChange}
                      >
                        <option value="" selected>
                          Select Employee
                        </option>
                        {approvers.map((i, key) => (
                          <option key={key} value={i.employee_id}>
                            {i.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="">
                        3rd Approver <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        type="text"
                        className="form-control"
                        name="approver_3"
                        value={user.approver_3}
                        onChange={handleChange}
                      >
                        <option value="" selected>
                          Select Employee
                        </option>
                        {approvers.map((i, key) => (
                          <option key={key} value={i.employee_id}>
                            {i.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="">
                        4th Approver <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        type="text"
                        className="form-control"
                        name="approver_4"
                        value={user.approver_4}
                        onChange={handleChange}
                      >
                        <option value="" selected>
                          Select Employee
                        </option>
                        {approvers.map((i, key) => (
                          <option key={key} value={i.employee_id}>
                            {i.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-12 my-3">
                    <Toggler
                      label={"Notify on Final approval / rejection"}
                      defaultchecked={user.notification}
                      checked={user.notification}
                      checkboxValue={(e) => {
                        setUser((prevValue) => ({
                          ...prevValue,
                          notification: e.target.checked,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="row d-flex justify-content-between px-2">
                  <button
                    className="btn btn-danger btn-rounded btn-outline"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-success btn-rounded btn-outline"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalApprovalWorkFlow;
