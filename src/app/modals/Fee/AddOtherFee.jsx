import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { ADD_OTHER_FEES } from "../../utils/fees.apiConst";
import { toast } from "react-toastify";

const AddOtherFee = ({ setLoading, getData1 }) => {
  const params = useParams();
  const [flag, setFlag] = useState(false);

  const [info, setInfo] = useState({
    fee_type_id: "OTHERFEES",
    session_id: params.id,
    amount: "",
    discount_amount: "",
    additional_amount: "",
  });

  const clearData = () => {
    setInfo({
      fee_type_id: "OTHERFEES",
      session_id: params.id,
      amount: "",
      discount_amount: "",
      additional_amount: "",
    });
  };

  const submit = async () => {
    console.log(info);
    if (!info.fee_type_id || !info.amount) {
      return toast.error("Please Enter all the required details");
    }

    setLoading(1);

    const config = {
      method: "post",
      url: ADD_OTHER_FEES,
      data: info,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res);
        setLoading(0);
        toast.success("Succesfully Added Fees");
        clearData();
        getData1();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error In Adding Amount");
        setLoading(0);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="ModalAddFee">
      <div
        className="modal fade"
        id="otherfee"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="addfee"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addfee1">
                Add Other Fees
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
                {/* <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="validationCustom02">
                      Fee Group<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control"
                      name="fee_group"
                      value={feeGroup1}
                      onChange={(e) => setFeeGroup1(e.target.value)}
                    >
                      <option value=""> Select Fee Group</option>
                      {feeGroupOpt?.map((i, key) => (
                        <option value={i.id}>{i.name}</option>
                      ))}
                    </select>
                  </div>
                </div> */}
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="">
                      {" "}
                      Select Fee Type<span className="text-danger">*</span>
                    </label>
                    <select className="form-control" disabled={true}>
                      <option value="OTHERFEES">OTHERFEES</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="">
                      {" "}
                      Enter Amount<span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      type="number"
                      value={info?.amount}
                      name="amount"
                    />
                  </div>
                </div>
                {/* <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor=""> Enter Discount Amount</label>
                    <input
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      type="number"
                      name="discount_amount"
                    />
                  </div>
                </div>{" "}
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor=""> Enter Addtional Amount</label>
                    <input
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      type="number"
                      name="additional_amount"
                    />
                  </div>
                </div> */}
              </div>
              <div className="row">
                <div className="flex mb-4 mx-4">
                  <button
                    onClick={() => submit()}
                    className="btn btn-md btn-rounded btn-nex"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOtherFee;
