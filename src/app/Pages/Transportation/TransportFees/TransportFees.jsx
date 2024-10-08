import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useRef } from "react";
import { TRANSPORT_FEES } from "../../../utils/Transport.apiConst";

function TransportFees({ setLoading }) {
  const [user, setUser] = useState({
    months: "",
    due_date: "",
    find_type: "",
    fixed_amount: "",
  });

  const [data, setData] = useState([]);

  const clearData = () => {
    setUser({
      months: "",
      due_date: "",
      find_type: "",
      fixed_amount: "",
    });
  };

  //   const [isChecked, setIsChecked] = useState(false);

  //   // Function to handle checkbox change
  //   const handleCheckboxChange = (event) => {
  //   setIsChecked(event.target.checked);
  //   };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const config = {
      method: "post",
      url: `${TRANSPORT_FEES}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user,
      },
    };

    axios(config)
      .then((res) => {
        setLoading(0);
        toast.success("Success");
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something Went Wrong");
      });
  };

  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isCheckedJanMonths, setIsCheckedJanMonths] = useState(false);
  const [isCheckedFebMonths, setIsCheckedFebMonths] = useState(false);
  const [isCheckedMarchMonths, setIsCheckedMarchMonths] = useState(false);
  const [isCheckedAprMonths, setIsCheckedAprMonths] = useState(false);
  const [isCheckedMayMonths, setIsCheckedMayMonths] = useState(false);
  const [isCheckedJuneMonths, setIsCheckedJuneMonths] = useState(false);
  const [isCheckedJulyMonths, setIsCheckedJulyMonths] = useState(false);
  const [isCheckedAugMonths, setIsCheckedAugMonths] = useState(false);
  const [isCheckedSepMonths, setIsCheckedSepMonths] = useState(false);
  const [isCheckedOctMonths, setIsCheckedOctMonths] = useState(false);
  const [isCheckedNovMonths, setIsCheckedNovMonths] = useState(false);
  const [isCheckedDecMonths, setIsCheckedDecMonths] = useState(false);

  const handleAllCheckboxChange = () => {
    setIsCheckedAll(!isCheckedAll);
    setIsCheckedJanMonths(!isCheckedAll);
    setIsCheckedFebMonths(!isCheckedAll);
    setIsCheckedMarchMonths(!isCheckedAll);
    setIsCheckedAprMonths(!isCheckedAll);
    setIsCheckedMayMonths(!isCheckedAll);
    setIsCheckedJuneMonths(!isCheckedAll);
    setIsCheckedJulyMonths(!isCheckedAll);
    setIsCheckedAugMonths(!isCheckedAll);
    setIsCheckedSepMonths(!isCheckedAll);
    setIsCheckedOctMonths(!isCheckedAll);
    setIsCheckedNovMonths(!isCheckedAll);
    setIsCheckedDecMonths(!isCheckedAll);
  };

  const handleJanMonthsCheckboxChange = () => {
    setIsCheckedJanMonths(!isCheckedJanMonths);
    setIsCheckedAll(
      (isCheckedFebMonths || !isCheckedJanMonths) && isCheckedFebMonths
    );
  };

  const handleFebMonthsCheckboxChange = () => {
    setIsCheckedFebMonths(!isCheckedFebMonths);
    //   setIsCheckedAll(isCheckedJanMonths || !isCheckedFebMonths);
    setIsCheckedAll(
      (isCheckedJanMonths || !isCheckedFebMonths) && isCheckedJanMonths
    );
  };

  const handleMarchMonthsCheckboxChange = () => {
    setIsCheckedMarchMonths(!isCheckedMarchMonths);
    setIsCheckedAll(
      ((isCheckedFebMonths || isCheckedJanMonths || !isCheckedMarchMonths) &&
        isCheckedFebMonths) ||
        isCheckedJanMonths
    );
  };

  const handleAprMonthsCheckboxChange = () => {
    setIsCheckedAprMonths(!isCheckedAprMonths);
    setIsCheckedAll(
      ((isCheckedFebMonths ||
        isCheckedJanMonths ||
        isCheckedMarchMonths ||
        !isCheckedAprMonths) &&
        isCheckedFebMonths) ||
        isCheckedJanMonths ||
        isCheckedMarchMonths
    );
  };

  const handleMayMonthsCheckboxChange = () => {
    setIsCheckedMayMonths(!isCheckedMayMonths);
    setIsCheckedAll(
      ((isCheckedFebMonths ||
        isCheckedJanMonths ||
        isCheckedMarchMonths ||
        isCheckedAprMonths ||
        !isCheckedMayMonths) &&
        isCheckedFebMonths) ||
        isCheckedJanMonths ||
        isCheckedMarchMonths ||
        isCheckedAprMonths
    );
  };

  const handleJuneMonthsCheckboxChange = () => {
    setIsCheckedJuneMonths(!isCheckedJuneMonths);
    setIsCheckedAll(
      ((isCheckedFebMonths ||
        isCheckedJanMonths ||
        isCheckedMarchMonths ||
        isCheckedAprMonths ||
        isCheckedMayMonths ||
        !isCheckedJuneMonths) &&
        isCheckedFebMonths) ||
        isCheckedJanMonths ||
        isCheckedMarchMonths ||
        isCheckedAprMonths ||
        isCheckedMayMonths
    );
  };

  const handleJulyMonthsCheckboxChange = () => {
    setIsCheckedJulyMonths(!isCheckedJulyMonths);
    setIsCheckedAll(
      ((isCheckedFebMonths ||
        isCheckedJanMonths ||
        isCheckedMarchMonths ||
        isCheckedAprMonths ||
        isCheckedMayMonths ||
        isCheckedJuneMonths ||
        !isCheckedJulyMonths) &&
        isCheckedFebMonths) ||
        isCheckedJanMonths ||
        isCheckedMarchMonths ||
        isCheckedAprMonths ||
        isCheckedMayMonths ||
        isCheckedJuneMonths
    );
  };

  const handleAugMonthsCheckboxChange = () => {
    setIsCheckedAugMonths(!isCheckedAugMonths);
    setIsCheckedAll(
      ((isCheckedFebMonths ||
        isCheckedJanMonths ||
        isCheckedMarchMonths ||
        isCheckedAprMonths ||
        isCheckedMayMonths ||
        isCheckedJuneMonths ||
        isCheckedJulyMonths ||
        !isCheckedAugMonths) &&
        isCheckedFebMonths) ||
        isCheckedJanMonths ||
        isCheckedMarchMonths ||
        isCheckedAprMonths ||
        isCheckedMayMonths ||
        isCheckedJuneMonths ||
        isCheckedJulyMonths
    );
  };

  const handleSepMonthsCheckboxChange = () => {
    setIsCheckedSepMonths(!isCheckedSepMonths);
    setIsCheckedAll(
      ((isCheckedFebMonths ||
        isCheckedJanMonths ||
        isCheckedMarchMonths ||
        isCheckedAprMonths ||
        isCheckedMayMonths ||
        isCheckedJuneMonths ||
        isCheckedJulyMonths ||
        isCheckedAugMonths ||
        !isCheckedSepMonths) &&
        isCheckedFebMonths) ||
        isCheckedJanMonths ||
        isCheckedMarchMonths ||
        isCheckedAprMonths ||
        isCheckedMayMonths ||
        isCheckedJuneMonths ||
        isCheckedJulyMonths ||
        isCheckedAugMonths
    );
  };

  const handleOctMonthsCheckboxChange = () => {
    setIsCheckedOctMonths(!isCheckedOctMonths);
    setIsCheckedAll(
      ((isCheckedFebMonths ||
        isCheckedJanMonths ||
        isCheckedMarchMonths ||
        isCheckedAprMonths ||
        isCheckedMayMonths ||
        isCheckedJuneMonths ||
        isCheckedJulyMonths ||
        isCheckedAugMonths ||
        isCheckedSepMonths ||
        !isCheckedOctMonths) &&
        isCheckedFebMonths) ||
        isCheckedJanMonths ||
        isCheckedMarchMonths ||
        isCheckedAprMonths ||
        isCheckedMayMonths ||
        isCheckedJuneMonths ||
        isCheckedJulyMonths ||
        isCheckedAugMonths ||
        isCheckedSepMonths
    );
  };

  const handleNovMonthsCheckboxChange = () => {
    setIsCheckedNovMonths(!isCheckedNovMonths);
    setIsCheckedAll(
      ((isCheckedFebMonths ||
        isCheckedJanMonths ||
        isCheckedMarchMonths ||
        isCheckedAprMonths ||
        isCheckedMayMonths ||
        isCheckedJuneMonths ||
        isCheckedJulyMonths ||
        isCheckedAugMonths ||
        isCheckedSepMonths ||
        isCheckedOctMonths ||
        !isCheckedNovMonths) &&
        isCheckedFebMonths) ||
        isCheckedJanMonths ||
        isCheckedMarchMonths ||
        isCheckedAprMonths ||
        isCheckedMayMonths ||
        isCheckedJuneMonths ||
        isCheckedJulyMonths ||
        isCheckedAugMonths ||
        isCheckedSepMonths ||
        isCheckedOctMonths
    );
  };

  const handleDecMonthsCheckboxChange = () => {
    setIsCheckedDecMonths(!isCheckedDecMonths);
    setIsCheckedAll(
      ((isCheckedFebMonths ||
        isCheckedJanMonths ||
        isCheckedMarchMonths ||
        isCheckedAprMonths ||
        isCheckedMayMonths ||
        isCheckedJuneMonths ||
        isCheckedJulyMonths ||
        isCheckedAugMonths ||
        isCheckedSepMonths ||
        isCheckedOctMonths ||
        isCheckedNovMonths ||
        !isCheckedDecMonths) &&
        isCheckedFebMonths) ||
        isCheckedJanMonths ||
        isCheckedMarchMonths ||
        isCheckedAprMonths ||
        isCheckedMayMonths ||
        isCheckedJuneMonths ||
        isCheckedJulyMonths ||
        isCheckedAugMonths ||
        isCheckedSepMonths ||
        isCheckedOctMonths ||
        isCheckedNovMonths
    );
  };

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4> Transport Fees </h4>
            </div>

            <table className="table">
              <tr>
                <th>
                  <input
                    type="checkbox"
                    name="all"
                    id="all"
                    checked={isCheckedAll}
                    onChange={handleAllCheckboxChange}
                  />{" "}
                  All
                </th>
              </tr>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    name="jan_months"
                    id="jan_months"
                    checked={isCheckedJanMonths}
                    onChange={handleJanMonthsCheckboxChange}
                  />
                </th>
                <th>
                  Month
                  <input
                    readOnly
                    type="text"
                    className="form-control"
                    name="jan_months"
                    value="January"
                    onChange={handleChange}
                  />
                </th>

                <th>
                  {" "}
                  Due Date
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter Date"
                    name="due_date"
                    value={user.due_date}
                    onChange={handleChange}
                  />
                </th>

                <th>
                  {" "}
                  Fine Type
                  <div>
                    <input
                      type="radio"
                      name="jan_fine"
                      checked
                      value="none"
                      onChange={handleChange}
                    />

                    <label className="mr-3 ml-2 ml-2" htmlFor="">
                      none
                    </label>
                    <input
                      type="radio"
                      name="jan_fine"
                      onChange={handleChange}
                    />
                    <label htmlFor="" className="ml-2 mr-2">
                      percentage
                    </label>
                    <input
                      type="number"
                      name="jan_percentage"
                      id="percentage"
                    />

                    <label className="mr-3" htmlFor=""></label>
                    <input
                      type="radio"
                      name="jan_amount"
                      onChange={handleChange}
                      value="amount"
                    />
                    <label htmlFor="" className="ml-2 mr-2">
                      Fix Amount
                    </label>
                    <input type="number" name="jan_amount" id="amount" />
                  </div>
                </th>
              </tr>

              <tr>
                <th>
                  <input
                    type="checkbox"
                    name="feb_months"
                    id="feb_months"
                    checked={isCheckedFebMonths}
                    onChange={handleFebMonthsCheckboxChange}
                  />
                </th>
                <th>
                  Month
                  <input
                    readOnly
                    type="text"
                    className="form-control"
                    name="feb_months"
                    value="February"
                    onChange={handleChange}
                  />
                </th>

                <th>
                  {" "}
                  Due Date
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter Date"
                    name="feb_due_date"
                    value={user.due_date}
                    onChange={handleChange}
                  />
                </th>

                <th>
                  {" "}
                  Fine Type
                  <div>
                    <input
                      type="radio"
                      name="feb_fine"
                      checked
                      value="none"
                      onChange={handleChange}
                    />

                    <label className="mr-3 ml-2 ml-2" htmlFor="">
                      none
                    </label>
                    <input
                      type="radio"
                      name="feb_fine"
                      onChange={handleChange}
                    />
                    <label htmlFor="" className="ml-2 mr-2">
                      percentage
                    </label>
                    <input
                      type="number"
                      name="feb_percentage"
                      id="percentage"
                    />

                    <label className="mr-3" htmlFor=""></label>
                    <input
                      type="radio"
                      name="feb_amount"
                      onChange={handleChange}
                      value="amount"
                    />
                    <label htmlFor="" className="ml-2 mr-2">
                      Fix Amount
                    </label>
                    <input type="number" name="feb_amount" id="amount" />
                  </div>
                </th>
              </tr>

              <tr>
                <th>
                  <input
                    type="checkbox"
                    name="march_months"
                    id="march_months"
                    checked={isCheckedMarchMonths}
                    onChange={handleMarchMonthsCheckboxChange}
                  />
                </th>
                <th>
                  Month
                  <input
                    readOnly
                    type="text"
                    className="form-control"
                    name="march_months"
                    value="March"
                    onChange={handleChange}
                  />
                </th>

                <th>
                  {" "}
                  Due Date
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter Date"
                    name="march_due_date"
                    value={user.due_date}
                    onChange={handleChange}
                  />
                </th>

                <th>
                  {" "}
                  Fine Type
                  <div>
                    <input
                      type="radio"
                      name="march_fine"
                      checked
                      value="none"
                      onChange={handleChange}
                    />

                    <label className="mr-3 ml-2 ml-2" htmlFor="">
                      none
                    </label>
                    <input
                      type="radio"
                      name="march_fine"
                      onChange={handleChange}
                    />
                    <label htmlFor="" className="ml-2 mr-2">
                      percentage
                    </label>
                    <input
                      type="number"
                      name="march_percentage"
                      id="percentage"
                    />

                    <label className="mr-3" htmlFor=""></label>
                    <input
                      type="radio"
                      name="march_amount"
                      onChange={handleChange}
                      value="amount"
                    />
                    <label htmlFor="" className="ml-2 mr-2">
                      Fix Amount
                    </label>
                    <input type="number" name="march_amount" id="amount" />
                  </div>
                </th>
              </tr>

              <tr>
                <th>
                  <input
                    type="checkbox"
                    name="apr_months"
                    id="apr_months"
                    checked={isCheckedAprMonths}
                    onChange={handleAprMonthsCheckboxChange}
                  />
                </th>
                <th>
                  Month
                  <input
                    readOnly
                    type="text"
                    className="form-control"
                    name="apr_months"
                    value="April"
                    onChange={handleChange}
                  />
                </th>

                <th>
                  {" "}
                  Due Date
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter Date"
                    name="apr_due_date"
                    value={user.due_date}
                    onChange={handleChange}
                  />
                </th>

                <th>
                  {" "}
                  Fine Type
                  <div>
                    <input
                      type="radio"
                      name="apr_fine"
                      checked
                      value="none"
                      onChange={handleChange}
                    />

                    <label className="mr-3 ml-2 ml-2" htmlFor="">
                      none
                    </label>
                    <input
                      type="radio"
                      name="apr_fine"
                      onChange={handleChange}
                    />
                    <label htmlFor="" className="ml-2 mr-2">
                      percentage
                    </label>
                    <input
                      type="number"
                      name="apr_percentage"
                      id="percentage"
                    />

                    <label className="mr-3" htmlFor=""></label>
                    <input
                      type="radio"
                      name="apr_amount"
                      onChange={handleChange}
                      value="amount"
                    />
                    <label htmlFor="" className="ml-2 mr-2">
                      Fix Amount
                    </label>
                    <input type="number" name="apr_amount" id="amount" />
                  </div>
                </th>
              </tr>

              <tr>
                <th>
                  <input
                    type="checkbox"
                    name="may_months"
                    id="may_months"
                    checked={isCheckedMayMonths}
                    onChange={handleMayMonthsCheckboxChange}
                  />
                </th>
                <th>
                  Month
                  <input
                    readOnly
                    type="text"
                    className="form-control"
                    name="may_months"
                    value="May"
                    onChange={handleChange}
                  />
                </th>

                <th>
                  {" "}
                  Due Date
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter Date"
                    name="may_due_date"
                    value={user.due_date}
                    onChange={handleChange}
                  />
                </th>

                <th>
                  {" "}
                  Fine Type
                  <div>
                    <input
                      type="radio"
                      name="may_fine"
                      checked
                      value="none"
                      onChange={handleChange}
                    />

                    <label className="mr-3 ml-2 ml-2" htmlFor="">
                      none
                    </label>
                    <input
                      type="radio"
                      name="may_fine"
                      onChange={handleChange}
                    />
                    <label htmlFor="" className="ml-2 mr-2">
                      percentage
                    </label>
                    <input
                      type="number"
                      name="may_percentage"
                      id="percentage"
                    />

                    <label className="mr-3" htmlFor=""></label>
                    <input
                      type="radio"
                      name="may_amount"
                      onChange={handleChange}
                      value="amount"
                    />
                    <label htmlFor="" className="ml-2 mr-2">
                      Fix Amount
                    </label>
                    <input type="number" name="may_amount" id="amount" />
                  </div>
                </th>
              </tr>

              <tr>
                <th>
                  <input
                    type="checkbox"
                    name="june_months"
                    id="june_months"
                    checked={isCheckedJuneMonths}
                    onChange={handleJuneMonthsCheckboxChange}
                  />
                </th>
                <th>
                  Month
                  <input
                    readOnly
                    type="text"
                    className="form-control"
                    name="june_months"
                    value="June"
                    onChange={handleChange}
                  />
                </th>

                <th>
                  {" "}
                  Due Date
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter Date"
                    name="june_due_date"
                    value={user.due_date}
                    onChange={handleChange}
                  />
                </th>

                <th>
                  {" "}
                  Fine Type
                  <div>
                    <input
                      type="radio"
                      name="june_fine"
                      checked
                      value="none"
                      onChange={handleChange}
                    />

                    <label className="mr-3 ml-2 ml-2" htmlFor="">
                      none
                    </label>
                    <input
                      type="radio"
                      name="june_fine"
                      onChange={handleChange}
                    />
                    <label htmlFor="" className="ml-2 mr-2">
                      percentage
                    </label>
                    <input
                      type="number"
                      name="june_percentage"
                      id="percentage"
                    />

                    <label className="mr-3" htmlFor=""></label>
                    <input
                      type="radio"
                      name="june_amount"
                      onChange={handleChange}
                      value="amount"
                    />
                    <label htmlFor="" className="ml-2 mr-2">
                      Fix Amount
                    </label>
                    <input type="number" name="june_amount" id="amount" />
                  </div>
                </th>
              </tr>

              <tr>
                <th>
                  <input
                    type="checkbox"
                    name="july_months"
                    id="july_months"
                    checked={isCheckedJulyMonths}
                    onChange={handleJulyMonthsCheckboxChange}
                  />
                </th>
                <th>
                  Month
                  <input
                    readOnly
                    type="text"
                    className="form-control"
                    name="july_months"
                    value="July"
                    onChange={handleChange}
                  />
                </th>

                <th>
                  {" "}
                  Due Date
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter Date"
                    name="july_due_date"
                    value={user.due_date}
                    onChange={handleChange}
                  />
                </th>

                <th>
                  {" "}
                  Fine Type
                  <div>
                    <input
                      type="radio"
                      name="july_fine"
                      checked
                      value="none"
                      onChange={handleChange}
                    />

                    <label className="mr-3 ml-2 ml-2" htmlFor="">
                      none
                    </label>
                    <input
                      type="radio"
                      name="july_fine"
                      onChange={handleChange}
                    />
                    <label htmlFor="" className="ml-2 mr-2">
                      percentage
                    </label>
                    <input
                      type="number"
                      name="july_percentage"
                      id="percentage"
                    />

                    <label className="mr-3" htmlFor=""></label>
                    <input
                      type="radio"
                      name="july_amount"
                      onChange={handleChange}
                      value="amount"
                    />
                    <label htmlFor="" className="ml-2 mr-2">
                      Fix Amount
                    </label>
                    <input type="number" name="july_amount" id="amount" />
                  </div>
                </th>
              </tr>

              <tr>
                <th>
                  <input
                    type="checkbox"
                    name="aug_months"
                    id="aug_months"
                    checked={isCheckedAugMonths}
                    onChange={handleAugMonthsCheckboxChange}
                  />
                </th>
                <th>
                  Month
                  <input
                    readOnly
                    type="text"
                    className="form-control"
                    name="aug_months"
                    value="August"
                    onChange={handleChange}
                  />
                </th>

                <th>
                  {" "}
                  Due Date
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter Date"
                    name="aug_due_date"
                    value={user.due_date}
                    onChange={handleChange}
                  />
                </th>

                <th>
                  {" "}
                  Fine Type
                  <div>
                    <input
                      type="radio"
                      name="aug_fine"
                      checked
                      value="none"
                      onChange={handleChange}
                    />

                    <label className="mr-3 ml-2 ml-2" htmlFor="">
                      none
                    </label>
                    <input
                      type="radio"
                      name="aug_fine"
                      onChange={handleChange}
                    />
                    <label htmlFor="" className="ml-2 mr-2">
                      percentage
                    </label>
                    <input
                      type="number"
                      name="aug_percentage"
                      id="percentage"
                    />

                    <label className="mr-3" htmlFor=""></label>
                    <input
                      type="radio"
                      name="aug_amount"
                      onChange={handleChange}
                      value="amount"
                    />
                    <label htmlFor="" className="ml-2 mr-2">
                      Fix Amount
                    </label>
                    <input type="number" name="aug_amount" id="amount" />
                  </div>
                </th>
              </tr>

              <tr>
                <th>
                  <input
                    type="checkbox"
                    name="sep_months"
                    id="sep_months"
                    checked={isCheckedSepMonths}
                    onChange={handleSepMonthsCheckboxChange}
                  />
                </th>
                <th>
                  Month
                  <input
                    readOnly
                    type="text"
                    className="form-control"
                    name="sep_months"
                    value="September"
                    onChange={handleChange}
                  />
                </th>

                <th>
                  {" "}
                  Due Date
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter Date"
                    name="sep_due_date"
                    value={user.due_date}
                    onChange={handleChange}
                  />
                </th>

                <th>
                  {" "}
                  Fine Type
                  <div>
                    <input
                      type="radio"
                      name="sep_fine"
                      checked
                      value="none"
                      onChange={handleChange}
                    />

                    <label className="mr-3 ml-2 ml-2" htmlFor="">
                      none
                    </label>
                    <input
                      type="radio"
                      name="sep_fine"
                      onChange={handleChange}
                    />
                    <label htmlFor="" className="ml-2 mr-2">
                      percentage
                    </label>
                    <input
                      type="number"
                      name="sep_percentage"
                      id="percentage"
                    />

                    <label className="mr-3" htmlFor=""></label>
                    <input
                      type="radio"
                      name="sep_amount"
                      onChange={handleChange}
                      value="amount"
                    />
                    <label htmlFor="" className="ml-2 mr-2">
                      Fix Amount
                    </label>
                    <input type="number" name="sep_amount" id="amount" />
                  </div>
                </th>
              </tr>

              <tr>
                <th>
                  <input
                    type="checkbox"
                    name="oct_months"
                    id="oct_months"
                    checked={isCheckedOctMonths}
                    onChange={handleOctMonthsCheckboxChange}
                  />
                </th>
                <th>
                  Month
                  <input
                    readOnly
                    type="text"
                    className="form-control"
                    name="oct_months"
                    value="October"
                    onChange={handleChange}
                  />
                </th>

                <th>
                  {" "}
                  Due Date
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter Date"
                    name="oct_due_date"
                    value={user.due_date}
                    onChange={handleChange}
                  />
                </th>

                <th>
                  {" "}
                  Fine Type
                  <div>
                    <input
                      type="radio"
                      name="oct_fine"
                      checked
                      value="none"
                      onChange={handleChange}
                    />

                    <label className="mr-3 ml-2 ml-2" htmlFor="">
                      none
                    </label>
                    <input
                      type="radio"
                      name="oct_fine"
                      onChange={handleChange}
                    />
                    <label htmlFor="" className="ml-2 mr-2">
                      percentage
                    </label>
                    <input
                      type="number"
                      name="oct_percentage"
                      id="percentage"
                    />

                    <label className="mr-3" htmlFor=""></label>
                    <input
                      type="radio"
                      name="oct_amount"
                      onChange={handleChange}
                      value="amount"
                    />
                    <label htmlFor="" className="ml-2 mr-2">
                      Fix Amount
                    </label>
                    <input type="number" name="oct_amount" id="amount" />
                  </div>
                </th>
              </tr>

              <tr>
                <th>
                  <input
                    type="checkbox"
                    name="nov_months"
                    id="nov_months"
                    checked={isCheckedNovMonths}
                    onChange={handleNovMonthsCheckboxChange}
                  />
                </th>
                <th>
                  Month
                  <input
                    readOnly
                    type="text"
                    className="form-control"
                    name="nov_months"
                    value="November"
                    onChange={handleChange}
                  />
                </th>

                <th>
                  {" "}
                  Due Date
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter Date"
                    name="nov_due_date"
                    value={user.due_date}
                    onChange={handleChange}
                  />
                </th>

                <th>
                  {" "}
                  Fine Type
                  <div>
                    <input
                      type="radio"
                      name="nov_fine"
                      checked
                      value="none"
                      onChange={handleChange}
                    />

                    <label className="mr-3 ml-2 ml-2" htmlFor="">
                      none
                    </label>
                    <input
                      type="radio"
                      name="nov_fine"
                      onChange={handleChange}
                    />
                    <label htmlFor="" className="ml-2 mr-2">
                      percentage
                    </label>
                    <input
                      type="number"
                      name="nov_percentage"
                      id="percentage"
                    />

                    <label className="mr-3" htmlFor=""></label>
                    <input
                      type="radio"
                      name="nov_amount"
                      onChange={handleChange}
                      value="amount"
                    />
                    <label htmlFor="" className="ml-2 mr-2">
                      Fix Amount
                    </label>
                    <input type="number" name="nov_amount" id="amount" />
                  </div>
                </th>
              </tr>

              <tr>
                <th>
                  <input
                    type="checkbox"
                    name="dec_months"
                    id="dec_months"
                    checked={isCheckedDecMonths}
                    onChange={handleDecMonthsCheckboxChange}
                  />
                </th>
                <th>
                  Month
                  <input
                    readOnly
                    type="text"
                    className="form-control"
                    name="dec_months"
                    value="December"
                    onChange={handleChange}
                  />
                </th>

                <th>
                  {" "}
                  Due Date
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter Date"
                    name="dec_due_date"
                    value={user.due_date}
                    onChange={handleChange}
                  />
                </th>

                <th>
                  {" "}
                  Fine Type
                  <div>
                    <input
                      type="radio"
                      name="dec_fine"
                      checked
                      value="none"
                      onChange={handleChange}
                    />

                    <label className="mr-3 ml-2 ml-2" htmlFor="">
                      none
                    </label>
                    <input
                      type="radio"
                      name="dec_fine"
                      onChange={handleChange}
                    />
                    <label htmlFor="" className="ml-2 mr-2">
                      percentage
                    </label>
                    <input
                      type="number"
                      name="dec_percentage"
                      id="percentage"
                    />

                    <label className="mr-3" htmlFor=""></label>
                    <input
                      type="radio"
                      name="dec_amount"
                      onChange={handleChange}
                      value={user.fixed_amount}
                      //  value="amount"
                    />
                    <label htmlFor="" className="ml-2 mr-2">
                      Fix Amount
                    </label>
                    <input type="number" name="dec_amount" id="amount" />
                  </div>
                </th>
              </tr>

              <tr>
                <th>
                  <div className="row float-right">
                    <button
                      className="btn btn-nex btn-rounded"
                      type="submit"
                      name="submit"
                      onClick={(e) => handleSubmit(e)}
                    >
                      <i className="fa fa-save" aria-hidden="true" /> Save
                    </button>
                  </div>
                </th>
              </tr>

              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransportFees;
