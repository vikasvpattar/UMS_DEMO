import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { feeJsonData } from "../../../Data/jsonData/Fee/FeeJsonData";
import { FEE_DETAILS } from "../../../utils/fees.apiConst";

const ModalCollectFee = ({
  selectedArr,
  mainData,
  setLoading,
  reloadData,
  collegeId,
}) => {
  const [mode, setMode] = useState("CASH");

  const [totalAmount, setTotalAmount] = useState(0);

  const [date, setDate] = useState(new Date()?.toISOString()?.split("T")[0]);

  const [note, setNote] = useState("");

  const handleSubmit = () => {
    const config = {
      method: "post",
      url: FEE_DETAILS,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...mainData,
        student: {
          ...mainData.student,
          college_id: collegeId,
        },
        feeDetails: mainData?.feeDetails.map((i) => {
          if (selectedArr?.includes(i?.fee_type_id))
            return {
              ...i,
              mode: mode,
              paid_amount: i?.amount,
              date: date,
              note: note,
            };
          return i;
        }),
      },
    };
    console.log(config);

    axios(config)
      .then((res) => {
        toast.success("Successfully Added");
        reloadData();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    var d = 0;
    for (const i of mainData?.feeDetails) {
      if (selectedArr.includes(i?.fee_type_id)) d += i?.amount - i?.paid_amount;
    }
    setTotalAmount(d);
  }, [selectedArr]);

  return (
    <div className="ModalCollectFee">
      <div
        className="modal fade"
        id="collectfee"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="collectfee"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="collectfee">
                Collect Fees
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
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="">
                      Date <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <label htmlFor="">Payment Mode</label> <br />
                  <select
                    name=""
                    id=""
                    className="form-control"
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                  >
                    {feeJsonData?.map((i, key) => (
                      <option value={i?.id} key={key}>
                        {i?.name}
                      </option>
                      // <div className="custom-control custom-radio custom-control-inline" key={key}>
                      //   <input
                      //     type={'checkbox'}
                      //     className="custom-control-input"
                      //     checked={mode===i?.id?true:false}
                      //     onClick={()=>{
                      //       setMode(i?.id);
                      //       console.log(i?.id);
                      //     }}
                      //   />
                      //   <label className="custom-control-label" htmlFor="check">
                      //     {i?.name}
                      //   </label>
                      // </div>
                    ))}
                  </select>
                </div>
                <div className="col-md-12 mt-3">
                  <div className="form-group">
                    <label htmlFor="">Note</label>
                    <textarea
                      cols={1}
                      rows={3}
                      className="form-control"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div id="multifee">
                {selectedArr?.map((i, key) => (
                  <>
                    <div className=" d-flex ">
                      <h5 className="text-primary">
                        {mainData?.student?.fee_group}
                      </h5>{" "}
                      <br />
                      <h5 className="text-primary text-right ml-auto">
                        ₹{" "}
                        {mainData?.feeDetails?.find((s) => s?.fee_type_id == i)
                          ?.amount -
                          mainData?.feeDetails?.find((s) => s?.fee_type_id == i)
                            ?.paid_amount}
                      </h5>
                    </div>
                    <p className="text-muted">
                      {
                        mainData?.feeDetails?.find((s) => s?.fee_type_id == i)
                          ?.fee_type_name
                      }
                    </p>
                    <div className="d-flex ">
                      <h5 className="text-danger">Fine </h5>
                      <h5 className="text-danger text-right ml-auto">
                        ₹ 0.00{" "}
                      </h5>
                    </div>
                    <br />
                  </>
                ))}
              </div>

              <div className="d-flex ">
                <h5 className="">Total </h5>
                <h5 className=" text-right ml-auto" id="total_fee">
                  ₹ {totalAmount}
                </h5>
              </div>
            </div>
            <div className="modal-footer">
              <input type="hidden" name="id" defaultValue={1} />
              <input type="hidden" name="stdid" defaultValue={1} />
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                name="submit"
                value="multicollect_fee"
                data-dismiss="modal"
                onClick={handleSubmit}
              >
                Paid
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCollectFee;
