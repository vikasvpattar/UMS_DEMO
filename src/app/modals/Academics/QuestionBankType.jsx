import React from "react";
import {
  studentMarksTemplate1,
  studentMarksTemplate2,
} from "../../utils/s3assetLinks";

const QuestionBankType = () => {
  return (
    <div>
      <div
        className="modal fade"
        id="questionType"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered mw-100 w-75"
          role="document"
          width="600px"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                Select Type Of CSV File
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
                <div className="d-flex justify-content-center">
                  <a
                    className="btn btn-success btn-md btn-rounded float-right ml-1"
                    href={studentMarksTemplate1}
                    download="student"
                  >
                    <i className="fa fa-download" aria-hidden="true" /> Single
                    Question Type
                  </a>{" "}
                  <a
                    className="btn btn-success btn-md btn-rounded float-right ml-1"
                    href={studentMarksTemplate2}
                    download="student"
                  >
                    <i className="fa fa-download" aria-hidden="true" /> Multiple
                    Question Type
                  </a>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBankType;
