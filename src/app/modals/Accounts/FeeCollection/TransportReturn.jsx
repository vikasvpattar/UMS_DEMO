import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { ADDTRANSPORTFEE } from "../../../utils/fees.apiConst";

const TransportReturn = ({ setLoading, reloadData, feeid }) => {
  const handleSubmit = () => {
    const config = {
      method: "put",
      url: `${ADDTRANSPORTFEE}/${feeid}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        clear_data: 1,
      },
    };

    axios(config)
      .then((res) => {
        console.log(res);
        toast.success("Successfully Returned");
        reloadData();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="ModalReturnFee">
      <div
        className="modal fade"
        id="hostelreturn"
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
                Are you sure want to delete invoice, this action is
                irreversible. Do you want to proceed?
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
  );
};

export default TransportReturn;
