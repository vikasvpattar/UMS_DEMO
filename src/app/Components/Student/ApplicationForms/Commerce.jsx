import React,{useState , useEffect} from 'react'

const Commerce = ({form_data}) => {

  const [info, setInfo] = useState({})

  useEffect(() => {

    if (form_data) {
      setInfo({
        ...form_data
      })
    }
  }, [form_data])

  return (
    <div className='Commerce'>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
            <label>Select Course</label>
              <select
                name="course"
                id="course"
                required=""
                className="form-control"
                value={info?.select_course}
                readOnly={true}
                // onChange={(e) => setInfo({...info, select_course: e.target.value})}
              >
                <option value="">Select Course</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
                <option value="IT & Computer">IT &amp; Computer</option>
                <option value="Management">Management</option>
              </select>
            </div>
          </div>
          
          <div className="col-lg-3 col-md-6">
            <div className="form-group">
            <label>Do You want to stay in Hostel?</label>

              <select
                name="hostel"
                id="hostel"
                required=""
                className="form-control"
              >
                <option value="">Do You want to stay in Hostel?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <h5 className="mt-4 mb-2">Details of Last Examination Passed:</h5>
          <div className="col-lg-8 col-md-6">
            <div className="form-group">
            <label>Name of the University</label>

              <input
                type="text"
                name="university"
                value={info?.unversity}
                readOnly={true}
                // onChange={(e) => setInfo({...info, unversity: e.target.value})}
                required=""
                className="form-control"
                placeholder="Name of University*"
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="form-group">
            <label>No. of Attempts</label>
              <input
                type="text"
                name="attemps"
                value={info?.attempts}
                readOnly={true}
                // onChange={(e) => setInfo({...info, attempts: e.target.value})}
                required=""
                className="form-control"
                placeholder="No. of Attempts*"
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="form-group">
            <label>Name of Examination</label>

              <input
                type="text"
                name="exam"
                value={info?.exam_name}
                readOnly={true}
                // onChange={(e) => setInfo({...info, exam_name: e.target.value})}
                required=""
                className="form-control"
                placeholder="Name of Examination*"
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="form-group">
            <label>Passing Year</label>
              <input
                type="text"
                name="pass_year"
                value={info?.passing_year}
                readOnly={true}
                // onChange={(e) => setInfo({...info, passing_year: e.target.value})}
                required=""
                className="form-control"
                placeholder="Passing Year*"
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="form-group">
            <label>Seat No</label>
              <input
                type="text"
                name="seat_no"
                value={info?.seat_no}
                readOnly={true}
                // onChange={(e) => setInfo({...info, seat_no: e.target.value})}
                required=""
                className="form-control"
                placeholder="Seat No*"
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="form-group">
            <label>Center No</label>
              <input
                type="text"
                name="c_no"
                value={info?.center_number}
                readOnly={true}
                // onChange={(e) => setInfo({...info, select_course: e.target.value})}
                required=""
                className="form-control"
                placeholder="Center No. :*"
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="form-group">
            <label>Stream</label>
              <input
                type="text"
                name="stream"
                value={info?.stream}
                readOnly={true}
                // onChange={(e) => setInfo({...info, stream: e.target.value})}
                required=""
                className="form-control"
                placeholder="Stream*"
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="form-group">
            <label>Name of School/College</label>
              <input
                type="text"
                name="clg"
                value={info?.college_name}
                readOnly={true}
                // onChange={(e) => setInfo({...info, college_name: e.target.value})}
                required=""
                className="form-control"
                placeholder="Name of School/College*"
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
            <label>Address of School/College</label>

              <textarea
                name="clg_addr"
                value={info?.college_address}
                readOnly={true}
                // onChange={(e) => setInfo({...info, college_address: e.target.value})}
                required=""
                className="form-control"
                placeholder="Address of School/College*"
                id=""
                cols={2}
                rows={2}
                defaultValue={""}
              />
            </div>
          </div>
          <div className="col-md-12">
            <h5>Undertakings:</h5>
            <p>I hereby undertake the followings:</p>
            <ol>
              <li>
                I know that the medium of instruction in the course is
                English/Gujarati and I would like to give the examination in
                English/Gujarati.
              </li>
              <li>
                I shall abide to pay all the fees decided by the college on
                time.{" "}
              </li>
              <li>
                I know that the fees of current year have to be paid, in case of
                cancellation of admission any time in the middle of the course.
              </li>
              <li>
                I shall not change the college until the course is completed.
              </li>
              <li>I shall not perform any job during college hours.</li>
              <li>I shall co-operate the college in all respect.</li>
              <li>
                Information provided in this application is correct to the best
                of my knowledge.
              </li>
            </ol>
          </div>
          
          <div className="col-lg-4  col-md-6 mt-5">
            <div className="form-group">
              <h5 htmlFor="">
                Upload Aadhar Card <small className="text-danger">*</small>
              </h5>
              <input
                type="file"
                name="aadhar"
                value={info?.aadhaar}
                readOnly={true}
                // onChange={(e) => setInfo({...info, aadhaar: e.target.value})}
                required=""
                className="form-control"
                placeholder="Subject 2"
              />
            </div>
          </div>
          <div className="col-lg-4      col-md-6 mt-5">
            <div className="form-group">
              <h5 htmlFor="">
                Upload School Leaving Certificate
                <small className="text-danger">*</small>
              </h5>
              <input
                type="file"
                name="lc"
                value={info?.leaving_certificate}
                readOnly={true}
                // onChange={(e) => setInfo({...info, leaving_certificate: e.target.value})}
                required=""
                className="form-control"
                placeholder="Subject 2"
              />
            </div>
          </div>
        </div>
        <div className="row mt-3 ">
          <div className="col-md-4">
            <h5>Place:</h5>
            <input
              type="text"
              className="form-control"
              required=""
              name="place"
            value={info?.applied_place}
            readOnly={true}
                // onChange={(e) => setInfo({...info, applied_place: e.target.value})}
            />
          </div>
          <div className="col-md-4">
            <h5>Date:</h5>
            <input
              type="text"
              className="form-control"
              required=""
              name="sign_date"
            //   onChange={(e) => {setDefaultDate(e.target.value);}}
            //   value={defaultDate}
              readOnly=""
            />
          </div>
        </div>
        <div className="payment-details mt-4">
          <h4> Application Fees: Rs 200/- </h4>
          <h4>
            Pay Offline at :<br />
            Account Name: Shree Swaminarayan Vishvamangal Gurukul
            <br />
            Savings account no:- 1282104000067236
            <br />
            Bank: IDBI BANK, Kalol - 382721
            <br />
            IFSC CODE: IBKL0001282
          </h4>
        </div>
        <div className="row ">
          <div className="col-lg-4  d-print-none    col-md-6 mt-5">
            <div className="form-group">
              <h5 htmlFor="">
                Upload Payment Screenshot
                <small className="text-danger">*</small>
              </h5>
              <input 
              type="file" 
              name="payment" 
              className="form-control" 
              value={info?.screenshot_payment}
              readOnly={true}
                // onChange={(e) => setInfo({...info, screenshot_payment: e.target.value})}
                />
            </div>
          </div>
          <div className="col-md-4 mt-5">
            <div className="form-group">
              <h5 htmlFor="">
                Transaction ID<small className="text-danger">*</small>
              </h5>
              <input 
              type="text" 
              name="tran_id" 
              className="form-control" 
              value={info?.transaction_id}
              readOnly={true}
                // onChange={(e) => setInfo({...info, transaction_id: e.target.value})}
                />
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <h5>
              <u>Note :</u>
            </h5>
            <ol>
              <li>Read the form carefully before filling of it.</li>
              <li>Incomplete form will not be accepted.</li>
              <li>
                Enclose true copies of{" "}
                <b>
                  {" "}
                  Mark sheet, School Leaving Certificate, Aadhaar Card etc.{" "}
                </b>
              </li>
              <li>
                Admission to the course on the basis of incorrect information
                will stand automatically be canceled.
              </li>
              <li>
                The acknowledgement slip will be given to the candidate on
                receipt of the application form which must be preserved for all
                further process of admission.
              </li>
              <li>
                Eligibility for the admission in this course is as per rules of
                Swaminarayan University.
              </li>
            </ol>
          </div>
        </div>
        <div className="row">
                <div className="col-md-10">
                  <button
                    className="default-btn float-end "
                    style={{ pointerEvents: "all", cursor: "pointer" }}
                    // onClick={(e) => { e.preventDefault(); setStep(1) }}
                  >
                    Previous
                    <span />
                  </button>
                </div>
                <div className="col-md-2">
                  <button
                    className="default-btn float-end "
                    style={{ pointerEvents: "all", cursor: "pointer" }}
                    // onClick={(e) => { submitForm(e) }}
                  >
                    Apply
                    <span />
                  </button>
                </div>
              </div>
    </div>
  )
}

export default Commerce