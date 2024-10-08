import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { feeJsonData } from "../../../Data/jsonData/Fee/FeeJsonData";
import { ADDTRANSPORTFEE } from "../../../utils/fees.apiConst";

const TransportFeeModal = ({ setLoading, reloadData }) => {
  const [addedAmount, setAddedAmount] = useState("");

  const [mode, setMode] = useState("CASH");
  const [note, setNote] = useState("");

  const [feeid, setFeeid] = useState("");

  const params = useParams();
  const [searchParams] = useSearchParams();

  var curr = new Date();
  curr.setDate(curr.getDate());
  const [date, setDate] = useState(curr.toISOString().substring(0, 10));

  const [discountDet, setDiscountDet] = useState();
  const [maxAmount, setMaxAmount] = useState("");

  const clearData = () => {
    setAddedAmount("");
    setNote("");
    setMode("CASH");
  };

  const getData = async () => {
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    const [data1] = await Promise.all([
      axios({
        ...config,
        url: `${ADDTRANSPORTFEE}?session_id=${
          params.id
        }&department_id=${searchParams.get(
          "department_id"
        )}&student_id=${searchParams.get("student_session_id")}`,
      })
        .then((res) => {
          setLoading(0);
          console.log(res.data.data);
          setFeeid(res.data.data[0].id);
          setMaxAmount(res.data.data[0].amount);
        })
        .catch((err) => {
          console.log(err);
        }),
    ]);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(searchParams.get("session"));

  const handleSubmit = async () => {
    if (parseInt(addedAmount) > parseInt(maxAmount) || addedAmount === "") {
      toast.error("Please Select a valid amount");
      return;
    }

    const obj = [
      {
        date: date,
        year: searchParams.get("session"),
        payment_mode: mode,
        payment_amount: addedAmount,
        note: note,
        collected_by: sessionStorage.getItem("employee_id"),
      },
    ];
    const config1 = {
      method: "put",
      url: `${ADDTRANSPORTFEE}/${feeid}`,
      headers: {
        "Content-type": "application/json",
      },
      data: {
        payment: obj,
      },
    };
    axios({
      ...config1,
    })
      .then((res) => {
        setLoading(0);
        console.log(res.data.data);
        toast.success("SuccessFully Updated");
        reloadData();
        clearData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="ModalAddFee">
      <div
        className="modal fade"
        id="addhostelfee"
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
                Transport Fees
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

export default TransportFeeModal;
