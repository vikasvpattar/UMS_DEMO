import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { FEE_DETAILS } from "../../../utils/fees.apiConst";
import { feeJsonData } from "./../../../Data/jsonData/Fee/FeeJsonData";

const ModalAddFee = ({
  data,
  mainData,
  setLoading,
  reloadData,
  discount,
  collegeId,
}) => {
  const [addedAmount, setAddedAmount] = useState("");

  const [mode, setMode] = useState("CASH");

  let role = sessionStorage.getItem("role");

  const [note, setNote] = useState("");

  var curr = new Date();
  curr.setDate(curr.getDate());
  const [date, setDate] = useState(curr.toISOString().substring(0, 10));

  const [discountDet, setDiscountDet] = useState();

  const [user, setUser] = useState({
    date: new Date().toISOString,
    amount: "",
    paid_amount: "",
    fee_type_id: "",
  });

  const clearData = () => {
    setAddedAmount("");
    setNote("");
    setMode("CASH");
  };

  const handleSubmit = () => {
    if (addedAmount < 0)
      return toast.error("Can't submit Amount should not be negative");
    const config = {
      method: "post",
      url: `${FEE_DETAILS}`,
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
          if (i?.fee_type_id == data?.fee_type_id)
            return {
              ...data,
              mode: mode,
              date: date,
              note: note,
              paid_amount: parseInt(data?.paid_amount) + parseInt(addedAmount),
              discount_amount:
                parseInt(data?.discount_amount || 0) +
                parseInt(
                  discount?.find((item) => item.id == discountDet)?.amount || 0
                ),
              discount: { ...discount?.find((item) => item.id == discountDet) },
            };
          return i;
        }),
        college_id: collegeId,
        collected_by: sessionStorage.getItem("employee_id"),
      },
    };

    axios(config)
      .then((res) => {
        toast.success("Successfully Added");
        reloadData();
        clearData();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    setDiscountDet("");
  };

  const [maxAmount, setMaxAmount] = useState("");

  useEffect(() => {
    setUser((prev) => ({
      ...prev,
      amount: data?.amount,
      fee_type_id: data?.fee_type_id,
      paid_amount: data?.paid_amount,
    }));

    setAddedAmount(data?.amount - data?.paid_amount - data?.discount_amount);
    setMaxAmount(data?.amount - data?.paid_amount - data?.discount_amount);
  }, [data]);
  return (
    <div className="ModalAddFee">
      <div
        className="modal fade"
        id="addfee"
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
                1st Year : Tution Fees
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
                      {" "}
                      Date<span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      name="feedate"
                      className="form-control"
                      value={date}
                      max={date}
                      readOnly={
                        sessionStorage.getItem("role") == "CASHIER"
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="">
                      {" "}
                      Amount <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      name="amount"
                      className="form-control"
                      required=""
                      id="amount"
                      min={0}
                      max={maxAmount}
                      value={addedAmount}
                      onChange={(e) => {
                        if (e.target.value <= maxAmount)
                          setAddedAmount(e.target.value);
                      }}
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
                    onChange={(e) => {
                      setMode(e.target.value);
                    }}
                  >
                    {feeJsonData?.map((i, key) => (
                      <option value={i?.id} key={key}>
                        {i?.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-12 mt-3">
                  <label htmlFor="">Discount</label> <br />
                  <select
                    name=""
                    id=""
                    className="form-control"
                    value={discountDet}
                    onChange={(e) => {
                      setDiscountDet(e.target.value);
                    }}
                  >
                    <option value="">Select Discount</option>
                    {discount?.map((i, key) => (
                      <option value={i?.id} key={key}>
                        {i?.name} - ( ₹ {i.amount}){" "}
                      </option>
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
            </div>
            <div className="modal-footer">
              <input
                type="hidden"
                name="group_id"
                id="group_id"
                defaultValue={4}
              />
              <input
                type="hidden"
                name="master_id"
                id="master_id"
                defaultValue={1}
              />
              <button
                type="submit"
                className="btn btn-success"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleSubmit}
              >
                Collect Fee
              </button>
              {/*  <a href="javascript:void(0)"  target="_blank" type="submit" class="btn btn-success">Collect Fee & Print</a> */}
              <input type="hidden" name="id" defaultValue={1} />
              <input type="hidden" name="stdid" defaultValue={1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddFee;
