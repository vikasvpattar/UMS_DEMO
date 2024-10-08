import React from 'react'

function ModalAllowable({
  data,
  setData,
  handleSubmit
}) {


    
  return (
    <div
    className="modal fade"
    id="days_edit1"
    tabIndex={-1}
    role="dialog"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title" id="myModalLabel">
            <i className="glyphicon glyphicon-edit" /> Edit
          </h4>
        </div>
        <div className="modal-body">
          <div className="form-group" style={{ marginLeft: 100 }}>
            <label
              className="control-label col-md-4"
              htmlFor="first-name"
            >
              Day/Days <span className="required">*</span>
            </label>
            <div className="col-md-4">
              <input
                type="number"
                min={0}
                max={100}
                className="form-control"
                value={data}
                onChange={e=>setData(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer" style={{ marginTop: 50 }}>
            <button
              className="btn btn-inverse"
              data-dismiss="modal"
              aria-hidden="true"
            >
              <i className="glyphicon glyphicon-remove icon-white" />{" "}
              No
            </button>
            <button
              style={{ marginBottom: 5 }}
              className="btn btn-primary"
              data-dismiss="modal"
              aria-hidden="true"
              onClick={handleSubmit}
            >
              <i className="glyphicon glyphicon-ok icon-white" />{" "}
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ModalAllowable
