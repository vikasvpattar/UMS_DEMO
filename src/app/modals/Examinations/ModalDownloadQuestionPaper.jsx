import React from 'react'

function ModalDownloadQuestionPaper() {
  return (
    <div
    className="modal fade"
    id="download"
    tabIndex={-1}
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="download">
         Add Details
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
          <div className="col-12">
            <div className="form-group">
                <label htmlFor="">Registrar Examiner Email-ID <small className="text-danger">*</small></label>
                <input type="email" name="registrar_email" id="registrar_email" className="form-control" required />
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
                <label htmlFor="">Dean of Faculty of College Email-ID <small className="text-danger">*</small></label>
                <input type="email" name="rdean_email" id="dean_email" className="form-control" required />
            </div>
          </div><div className="col-12">
            <div className="form-group">
                <label htmlFor="">Exam Squad Email-ID <small className="text-danger">*</small></label>
                <input type="email" name="squad_email" id="squad_email" className="form-control" required />
            </div>
          </div>
        </div>
        </div>
        <input type="hidden" name="id" defaultValue="" />
        <input type="hidden" name="examid" id="examid1" defaultValue="" />
        <div className="modal-footer">
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
            value="subject"
          >
            <i className="fa fa-send" aria-hidden="true" /> &nbsp;Submit
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ModalDownloadQuestionPaper