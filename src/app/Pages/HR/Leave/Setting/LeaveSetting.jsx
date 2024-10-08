import React from 'react'

function LeaveSetting() {
  return (
    <div className='LeaveSetting'>
        <div className="main-content">
  <div className="page-content">
    <div className="container-fluid">
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0">Settings</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="/">Leave</a>
                </li>
                <li className="breadcrumb-item active">Settings</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <h4 className="card-title">Leave Planner / Schedule</h4>
                    </div>
                    <div className="col-12">
                        <label htmlFor="">Visibel Employee Leaves</label>
                        <select name="" id="" className="form-control">
                            <option value="">Self</option>
                            <option value="">Same Branch</option>
                            <option value="">Same Department</option>
                            <option value="">Same Branch/Department</option>
                            <option value="" selected>All</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default LeaveSetting