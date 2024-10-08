import React from 'react'
import './SetupOffice.scss'

function SwitcherSetupOffice(props) {
  return (
    <div className='SwitcherSetupOffice'>
        <div className="row">
  <div className="col-md-12 ">
    <div className="card setup-office">
      <div className="card-body">
        {/* Nav tabs */}
        <ul className="nav nav-pills justify-content-around" role="tablist">
          <li className="nav-item waves-effect waves-light" onClick={()=>{props.setTab(1)}}>
            <a
              className="nav-link active"
              id="fill-purpose-tab"
              data-toggle="tab"
              href="#fill-purpose"
              role="tab"
            >
              <span className="d-block d-sm-none">
                <i className="fas fa-home" />
              </span>
              <span className="d-none d-sm-block">Purpose</span>
            </a>
          </li>
          <li className="nav-item waves-effect waves-light" onClick={()=>{props.setTab(2)}}>
            <a
              className="nav-link"
              id="fill-complain-tab"
              data-toggle="tab"
              href="#fill-complain"
              role="tab"
            >
              <span className="d-block d-sm-none">
                <i className="far fa-user" />
              </span>
              <span className="d-none d-sm-block">Complain Type</span>
            </a>
          </li>
          <li className="nav-item waves-effect waves-light" onClick={()=>{props.setTab(3)}}>
            <a
              className="nav-link"
              id="fill-source-tab"
              data-toggle="tab"
              href="#fill-source"
              role="tab"
            >
              <span className="d-block d-sm-none">
                <i className="far fa-envelope" />
              </span>
              <span className="d-none d-sm-block">Source</span>
            </a>
          </li>
          <li className="nav-item waves-effect waves-light" onClick={()=>{props.setTab(4)}}>
            <a
              className="nav-link"
              id="fill-reference-tab"
              data-toggle="tab"
              href="#fill-reference"
              role="tab"
            >
              <span className="d-block d-sm-none">
                <i className="fas fa-cog" />
              </span>
              <span className="d-none d-sm-block">Reference</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default SwitcherSetupOffice