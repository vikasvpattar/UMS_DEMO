import React from 'react'

function EmployerInformation() {
  return (
    <div className='EmployerInformation'>
      <div className="main-content">
  <div className="page-content">
    <div className="container-fluid">
      {/* start page title */}

      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0">Information</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="/employerInfo">Employeer</a>
                </li>
                <li className="breadcrumb-item active">Information</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      {/* end page title */}

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
             <div className="row">
              <div className="col-md-2">
              <img src="https://nexenstial.com/assets/images/Nexenstial.png" alt="icon" className="img-fluid" />
              </div>
              <div className="col-md-10">
                <div className="row">
                  <div className="col-md-2">
                  <p>Name</p>
                  <h5>My Organization</h5>
                  </div>
                  <div className="col-md-2">
                  <p>Registration Number</p>
                  <h5>12345</h5>
                  </div>
                  <div className="col-md-2">
                  <p>Industry</p>
                  <h5>Other</h5>
                  </div>
                  <div className="col-md-2">
                  <p>Home Country</p>
                  <h5>India</h5>
                  </div>
                  <div className="col-md-4">
                  <p>Portal (URL)</p>
                  <a href="/">https://hr.my/go/portal/b5aedf2469994a62b8500c2b91ec420d</a>
                  </div>
                  
                </div>
              </div>
             </div>

            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3>Contact</h3>
            </div>
            <div className="card-body">
              <div className="row gx-2">
                <div className="col-md-3">
                  <p>Email</p>
                  <a href="/"><h5>nexenstial@gmail.com</h5></a>
                </div>
                <div className="col-md-3">
                  <p>Website</p>
                 <a href="/"> <h5>nexenstial.com</h5></a>
                </div>

<div className="col-md-3">
                <p>Address 1</p>
                <h5>-</h5>
              </div>
              <div className="col-md-3">
                <p>Address 2</p>
                <h5>-</h5>
              </div>
              </div>
              <div className="row mt-5">
              <div className="col-md-3">
                <p>City</p>
                <h5>Hubli</h5>
              </div>
              <div className="col-md-3">
                <p>Pincode</p>
                <h5>582301</h5>
              </div>
              <div className="col-md-3">
                <p>State</p>
                <h5>Karnataka</h5>
              </div>
              <div className="col-md-3">
                <p>Country/Region</p>
                <h5>India</h5>
              </div>
              </div>
              <div className="row mt-5">
              <div className="col-md-3">
                <p>Telephone</p>
                <h5>-</h5>
              </div>
              <div className="col-md-3">
                <p>Fax</p>
                <h5>-</h5>
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

export default EmployerInformation