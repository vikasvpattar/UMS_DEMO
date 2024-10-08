import React from 'react'
import { useRef } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import rdsign from './../../assets/images/admissions/rdsign.jpg'


function PrintAdmitCard() {
  const location = useLocation()
  const data = location.state.data
  const printRef = useRef()
  const { id } = useParams()
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  return (
    <div>

      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card p-3" ref={printRef} >
              <div className="card-body">
                <div className="row mb-2 mt-5">
                  <div className="col-4">
                    <div className="">

                      <img src="/assets/images/logoWide.png" width={250} alt="" />
                    </div>
                  </div>
                  <div className="col-5">
            <h4 className="text-center">Ph.D Entrance Exam Nov-2022</h4>
          <h5 className="text-center">Admit Card</h5>
            </div>
                </div>


                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th>Roll Number:</th>
                      <th>
                        2206{id < 10 ? '00' + id : id < 100 ? '0' + id : id}
                      </th>
                      <th>Father Name:</th>
                      <th>
                        {data?.guardian_name}
                      </th>
                    </tr>
                    <tr>
                      <th>Candidate Name:</th>
                      <th>
                        {data?.candidate_name}
                      </th>
                      <th>Gender:</th>
                      <th>
                        {data?.gender}
                      </th>
                    </tr>
                    <tr>
                      <th>Category:</th>
                      <th>
                        {data?.category}
                      </th>
                      {/* <th>Person with Disability(PwD):</th>
                <th>
                  <select name="disable" id="" className="form-control">
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </th> */}
                    </tr>
                  </tbody>
                </table>
                <hr />
                <div className="row">
                  <div className="col-8">
                    <h5 className="text-center bg-secondary text-white p-2">
                      Test Details
                    </h5>
                    <table className="table mt-3">
                      <tbody>
                        <tr colSpan={4}>
                          <th>Reporting Time:</th>
                          <td colSpan={2}>9:00 am(IST)</td>
                          <th>Gate Closing Time:</th>
                          <td colSpan={2}>10:00 am(IST) </td>
                        </tr>
                        <tr colSpan={4}>
                          <th>Faculty :</th>
                          <td colSpan={2}>{data?.application_for}</td>
                          <th>Specialisation :</th>
                          <td colSpan={2}>{data?.application_for}</td>
                        </tr>
                        {/* <tr colSpan={4}>
                    <th>Test Center:</th>
                    <td colSpan={4} />
                  </tr> */}
                        <tr colSpan={4}>
                          <th>Venue of Test:</th>
                          <td colSpan={4} >Swaminarayan University, Kalol</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table table-bordered mt-5">
                      <tbody>
                        <tr>
                          <th>Date of Examination:</th>
                          <td>27.11.2022</td>
                          <td rowSpan={3} width="30%" />
                        </tr>
                        {/* <tr>
                    <th>Shift:</th>
                    <th>First</th>
                  </tr> */}
                        <tr>
                          <th>Timing of Test:</th>
                          <th>10:00 am to 12:00 pm</th>
                        </tr>
                      </tbody>
                    </table>
                    <br /><br />
                    <div className="row mt-4">
                      <div className="col-4">
                        <div className="d-flex justify-content-center">
                          <img src={rdsign} style={{ width: '80px' }} />
                        </div>
                        <hr />
                        <div>Signature of Dean Research</div>
                      </div>
                    </div>

                  </div>
                  <div className="col-4 border-left shadow-sm">
                    <h5 className="text-center mt-3" style={{ height: "22rem" }}>
                      Photograph <br /> <br />
                      <img
                        src={data?.photograph}
                        style={{ maxWidth: '200px' }}
                        alt="" />
                    </h5>
                    <br /><br />
                    <hr />
                    <div className="row">
                      <div className="col-md-12">
                        <p className="text-center">Candidate Signature</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="col-md-12">
                <h5 className="text-center">IMPORTANY INSTRUCTIONS FOR CANDIDATES</h5>
                <ol>
                  <li>
                    Ph.D. applicants have to attend the entrance examination as per schedule.
                  </li>
                  <li>
                    On the day of Entrance exam, the students have to reach the venue 1 hour prior to the exam timing.
                  </li>
                  <li>
                    Any unfair practices in the examination shall lead to expulsion of the candidate from the Examination.
                  </li>
                  <li>
                    Students have to carry Admit Card and Identity proof and need to produce it upon asking.
                  </li>
                  <li>
                    Students will be allowed to enter the examination hall 15 mins before the
                    commencement of the exam. Once Entrance exam commences no student will be allowed in the examination halls.
                  </li>
                </ol>
              </div>
              <div className='p-3 d-flex justify-content-center d-print-none'>
                <button className="btn btn-danger px-4" onClick={handlePrint}>
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PrintAdmitCard