import React from 'react'

function ModalPhoneCallLog() {
  return (
    <div>
        <div
  className="modal fade bs-example-modal-xl"
  tabIndex={-1}
  role="dialog"
  aria-labelledby="myExtraLargeModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog modal-xl">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title mt-0" id="myExtraLargeModalLabel">
          Details
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
        <table className="table table-striped">
          <tbody>
            <tr>
              <th className="border0">Name</th>
              <td className="border0" id="name1">
                Electricity Office
              </td>
              <th className="border0">Phone</th>
              <td className="border0" id="phone1">
                {" "}
                45646421
              </td>
            </tr>
            <tr>
              <th>Date</th>
              <td id="date1">03/04/2021</td>
              <th>Next Follow Up Date</th>
              <td id="followdate">03/09/2021</td>
            </tr>
            <tr>
              <th>Call Duration</th>
              <td id="call1">00:45:00</td>
              <th>Call Type</th>
              <td id="type1">Outgoing</td>
            </tr>
            <tr>
              <th>Description</th>
              <td id="desc1" />
              <th>Note</th>
              <td id="notes1" />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    {/* /.modal-content */}
  </div>
  {/* /.modal-dialog */}
</div>

    </div>
  )
}

export default ModalPhoneCallLog