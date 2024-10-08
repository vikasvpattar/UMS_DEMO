import React from 'react'

function ModalPanltyBooks({data, setData, handleSubmit}) {

  return (
    <div
    className="modal fade"
    id="penalty_edit1"
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
          <form
            method="post"
            encType="multipart/form-data"
            action="controller/processLibrary.php"
            className="form-horizontal"
          />
          <div className="form-group" style={{ marginLeft: 100 }}>
            <label
              className="control-label col-md-4"
              htmlFor="first-name"
            >
              Amount <span className="required">*</span>
            </label>
            <div className="col-md-4">
              <input
                type="number"
                min={0}
                max={100}
                value={data}
                onChange={e=>setData(e.target.value)}
                className="form-control"
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
              type="submit"
              style={{ marginBottom: 5 }}
              name="submit"
              value="penalty"
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

export default ModalPanltyBooks
