import React,{useState , useEffect} from 'react'
import { SessionOpt } from '../../../Data/student/sessionData';

const BasicInformation = ({data , basic_data , set_basic_data, localDepartments, classOpt, semOpt}) => {

    const [info, setInfo] = useState({});

    useEffect(() => {

        if(basic_data){
          setInfo({
            ...basic_data,
            "application_status" : "SUBMITTED"
          })
        }
      }, [data])

      useEffect(()=>{
        set_basic_data(info)
        if(info && data?.basic_data){
        data.basic_data = info
        }
      },[info])

    return (
        <div className='BasicInformation'>
            <div>
                {" "}
                <br />
                <br />
                <form>
              <div className="row">
                <div className="col-lg-12">

                  <div className="form-group">
                    <label>Name of Student</label>
                    <input
                      required type="text"

                      name="fullname"
                      className="form-control"
                      value={info?.name}
                      // onChange={(e) => setInfo({ ...info, name: e.target.value })}
                      readOnlyr={true}
                      placeholder="Student Full Name*"
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>Mobile Number</label>

                    <input
                      required type="number"
                      value={info?.phone}
                      // onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                      readOnlyr={true}
                      name="mob_no"
                      className="form-control"
                      placeholder="Mobile Number"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>Father Name</label>

                    <input
                      required type="text"
                      value={info?.father_name}
                      // onChange={(e) => setInfo({ ...info, father_name: e.target.value })}
                      readOnlyr={true}
                      name="parent_mobile"
                      className="form-control"
                      placeholder="Father Name *"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>Father Mobile Number</label>

                    <input
                      required type="text"
                      value={info?.father_phone}
                      // onChange={(e) => setInfo({ ...info, father_phone: e.target.value })}
                      readOnlyr={true}
                      name="parent_mobile"
                      className="form-control"
                      placeholder="Father Mobile Number *"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>Mother Name</label>

                    <input
                      required type="text"
                      value={info?.mother_name}
                      // onChange={(e) => setInfo({ ...info, mother_name: e.target.value })}
                      readOnlyr={true}
                      name="parent_mobile"
                      className="form-control"
                      placeholder="Mother Name *"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>Mother Mobile Number</label>

                    <input
                      required type="text"
                      value={info?.mother_phone}
                      // onChange={(e) => setInfo({ ...info, mother_phone: e.target.value })}
                      readOnlyr={true}
                      name="parent_mobile"
                      className="form-control"
                      placeholder="Mother Mobile Number *"
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>Date of Birth</label>

                    <div className="input-group">
                      <input
                        type="date"
                        placeholder="Date of Birth*"
                        name="dob"
                        value={info?.dob?.split("T")[0]}
                        // onChange={(e) => setInfo({ ...info, dob: e.target.value })}
                        readOnlyr={true}
                        data-date-format="yy-mm-dd"
                        className="form-control"
                        id="date"
                      />
                      {/* <span className="input-group-append d-print-none h-auto">
                        <span className="input-group-text bg-light h-100">
                          <i className="ri-calendar-2-line" />
                        </span>
                      </span> */}
                    </div>

                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>Nationality</label>
                    <input
                      required type="text"
                      value={info?.nationality}
                      // onChange={(e) => setInfo({ ...info, nationality: e.target.value })}
                      readOnlyr={true}
                      name="nationality"
                      className="form-control"
                      placeholder="Nationality"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>Email of Student</label>

                    <input
                      required type="email"
                      value={info?.email}
                      // onChange={(e) => setInfo({ ...info, email: e.target.value })}
                      readOnlyr={true}
                      name="email"
                      className="form-control"
                      placeholder="Email ID*"
                    />
                  </div>
                </div>

                <div
                  className="col-lg-6 col-md-6 program-level"
                  style={{ marginBottom: 0 }}
                >
                  <div className="form-group">
                    <p className="mb-1">
                      <b> Marital Status</b>
                    </p>
                    {/* <div class="form-check"> */}
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        value={"single"}
                        // onChange={(e) => setInfo({ ...info, marital_status: e.target.value })}
                        readOnlyr={true}
                        name="marital_status"
                        required type="radio"
                        id="inlineCheckbox1"
                        checked={info?.marital_status=='single'?true:false}
                        />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox1"
                      >
                        Single
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        value={"married"}
                        // onChange={(e) => setInfo({ ...info, marital_status: e.target.value })}
                        readOnlyr={true}
                        name="marital_status"
                        required type="radio"
                        id="inlineCheckbox2"
                        checked={info?.marital_status=='married'?true:false}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox2"
                      >
                        Married
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>Gender</label>
                    <select className="form-control" value={info?.gender}
                      // onChange={(e) => setInfo({ ...info, gender: e.target.value })}
                      readOnlyr={true}
                      name="gender">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <label>Category</label>
              <select 
              value={info?.category}
              onChange={(e) => setInfo({ ...info, category: e.target.value })}
              name="category"
              className='form-control'>
                <option value="">Select Category</option>
                <option value="OPEN">OPEN</option>
                <option value="SEBC">SEBC</option>
                <option value="ST">ST</option>
                <option value="SC">SC</option>
                <option value="OPEN_EWS">OPEN_EWS</option>
                <option value="OTHERS">OTHERS</option>
              </select>
            </div>
          </div>




                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>Caste</label>
                    <input
                      required type="text"
                      value={info?.caste}
                      // onChange={(e) => setInfo({ ...info, caste: e.target.value })}
                      readOnlyr={true}
                      name="caste"
                      className="form-control"
                      placeholder="Caste *"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>Sub Caste</label>
                    <input
                      required type="text"
                      value={info?.sub_caste}
                      // onChange={(e) => setInfo({ ...info, sub_caste: e.target.value })}
                      readOnlyr={true}
                      name="sub_caste"
                      className="form-control"
                      placeholder="Sub-Caste*"
                    />
                  </div>
                </div>

                {/* <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>Blood Group</label>
                    <select value={info?.blood_grp}
                      name="blood_grp" id="" className="form-control">
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div> */}

                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        value={info?.address}
                        // onChange={(e) => setInfo({ ...info, address: e.target.value })}
                        readOnlyr={true}
                        name="address"
                        placeholder="Students Parmanent Address*"
                        id="floatingTextarea2"
                        rows={2}
                        cols={1}
                        defaultValue={""}
                      />
                      <label htmlFor="floatingTextarea2">Address</label>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>State</label>
                    <input
                      required type="text"
                      value={info?.state}
                      // onChange={(e) => setInfo({ ...info, state: e.target.value })}
                      readOnlyr={true}
                      name="state"
                      className="form-control"
                      placeholder="State"
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>District</label>
                    <input
                      required type="text"
                      value={info?.dist}
                      // onChange={(e) => setInfo({ ...info, dist: e.target.value })}
                      readOnlyr={true}
                      name="dist"
                      className="form-control"
                      placeholder="District"
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>Taluk</label>
                    <input
                      required type="text"
                      value={info?.taluk}
                      // onChange={(e) => setInfo({ ...info, taluk: e.target.value })}
                      readOnlyr={true}
                      name="taluk"
                      className="form-control"
                      placeholder="Taluk"
                    />
                  </div>
                </div>
                {/* <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>Pin Code</label>
                    <input
                      required type="text"
                      value={info?.pin}
                      name="pin"
                      className="form-control"
                      placeholder="Pin Code"
                    />
                  </div>
                </div> */}
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>Birth Place</label>
                    <input
                      required type="text"
                      value={info?.birth_place}
                      // onChange={(e) => setInfo({ ...info, birth_place: e.target.value })}
                      readOnlyr={true}
                      name="pin"
                      className="form-control"
                      placeholder="Birth Place"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>Aadhar Number</label>
                    <input
                      required type="text"
                      value={info?.aadhar_number}
                      // onChange={(e) => setInfo({ ...info, aadhar_number: e.target.value })}
                      readOnlyr={true}
                      name="aadhar_number"
                      className="form-control"
                      placeholder="Aadhar Number *."
                    />
                  </div>
                </div>
                {/* <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>PAN Card Number</label>
                    <input
                      required type="text"
                      value={info?.pan}
                      name="pan"
                      className="form-control"
                      placeholder="PAN Card Number *"
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>Bank Name</label>
                    <input
                      required type="text"
                      value={info?.bank_name}
                      // onChange={(e) => setInfo({ ...info, bank_name: e.target.value })}
                      readOnlyr={true}
                      name="bank_name"
                      className="form-control"
                      placeholder="Name of the Bank *"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>Bank Account Number</label>
                    <input
                      required type="text"
                      value={info?.acc_no}
                      // onChange={(e) => setInfo({ ...info, acc_no: e.target.value })}
                      readOnlyr={true}
                      name="acc_no"
                      className="form-control"
                      placeholder="Bank Account Number *"
                    />
                  </div>
                </div> */}
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>10th Passing Year</label>
                    <input
                      required type="month"
                      value={info?.sslc_pass_month}
                      // onChange={(e) => setInfo({ ...info, sslc_pass_month: e.target.value })}
                      readOnlyr={true}
                      name="sslc_pass_month"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>10th Percentage</label>
                    <input
                      required type="text"
                      value={info?.sslc_perce}
                      // onChange={(e) => setInfo({ ...info, sslc_perce: e.target.value })}
                      readOnlyr={true}
                      name="sslc_perce"
                      className="form-control"
                      placeholder="10th Percentage *"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>10th Board of Exam</label>
                    <input
                      required type="text"
                      value={info?.sslc_board}
                      // onChange={(e) => setInfo({ ...info, sslc_board: e.target.value })}
                      readOnlyr={true}
                      name="sslc_board"
                      className="form-control"
                      placeholder="Board of Examination *"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>10th Seat Number</label>
                    <input
                      required type="text"
                      value={info?.sslc_seat_no}
                      // onChange={(e) => setInfo({ ...info, sslc_seat_no: e.target.value })}
                      readOnlyr={true}
                      name="sslc_seat_no"
                      className="form-control"
                      placeholder="Seat Number *"
                    />
                  </div>
                </div>


              </div>
              <div className="row">

                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>12th Passing Year</label>
                    <input
                      required type="month"
                      value={info?.pu_pass_month}
                      // onChange={(e) => setInfo({ ...info, pu_pass_month: e.target.value })}
                      readOnlyr={true}
                      name="pu_pass_month"
                      className="form-control"
                      placeholder="Student Mobile Number *"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>12th Percentage</label>
                    <input
                      required type="text"
                      value={info?.pu_perce}
                      // onChange={(e) => setInfo({ ...info, pu_perce: e.target.value })}
                      readOnlyr={true}
                      name="pu_perce"
                      className="form-control"
                      placeholder="12th Percentage *"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>12th Subject Combination</label>
                    <input
                      required type="text"
                      value={info?.subjects}
                      // onChange={(e) => setInfo({ ...info, subjects: e.target.value })}
                      readOnlyr={true}
                      name="subjects"
                      className="form-control"
                      placeholder="Sub Combinations  *"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>12th Board of Exam</label>
                    <input
                      required type="text"
                      value={info?.pu_board}
                      // onChange={(e) => setInfo({ ...info, pu_board: e.target.value })}
                      readOnlyr={true}
                      name="pu_board"
                      className="form-control"
                      placeholder="Board of Examination *"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>12th Seat Number</label>
                    <input
                      required type="text"
                      value={info?.pu_seat_no}
                      // onChange={(e) => setInfo({ ...info, pu_seat_no: e.target.value })}
                      readOnlyr={true}
                      name="pu_seat_no"
                      className="form-control"
                      placeholder="Seat Number *"
                    />
                  </div>
                </div>




              </div>


              <div className="row mt-4">
                {/* <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <h5>Upload Aadhar</h5>
                    <input
                      required type="file"
                      // value={info?.std_img}
                      name="aadhar"
                      className="form-control"

                    />
                  </div>
                </div> */}
                {/* <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <h5>Upload PUC Markssheet</h5>
                    <input
                      required type="file"
                      name="pu_markscard"
                      className="form-control"

                    />
                  </div>
                </div> */}
                {/* <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <h5>Upload SSLC Markssheet</h5>
                    <input
                      required type="file"
                      name="sslc_markscard"
                      className="form-control"
                    />
                  </div>
                </div> */}
                <h5 className='col-12'>Course details</h5>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <lable>Department</lable>
                    <select
                      name=""
                      id=""
                      className="form-control"
                      value={info?.department_id}
                      // onChange={(e) => setInfo({ ...info, department_id: e.target.value })}
                      readOnlyr={true}
                      // for nursing we are selecting department while registering so we dont allow them to change their department
                      disabled={true}
                    >
                      <option value="">Select Department</option>

                      {
                        localDepartments?.map((i, key) => (
                          <option value={i?.id}>{i?.name}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <lable>Class</lable>
                    <select
                      className="form-control"
                      value={info?.admission_class_id}
                      // onChange={(e) => setInfo({ ...info, admission_class_id: e.target.value })}
                      readOnlyr={true}
                      disabled
                    >
                      <option value="">Select Class</option>

                      {
                        classOpt?.map((i, key) => (
                          <option value={i?.id}>{i?.name}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <lable>Semester</lable>
                    <select
                      className="form-control"
                      value={info?.admission_semester_id}
                      // onChange={(e) => setInfo({ ...info, admission_semester_id: e.target.value })}
                      readOnlyr={true}
                      disabled
                    >
                      <option value="">Select Semester</option>

                      {
                        semOpt?.map((i, key) => (
                          <option value={i?.id}>{i?.name}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>Select Session</label>
                    <select
                      value={info?.year_of_admission}
                      onChange={(e) =>
                        setInfo({ ...info, year_of_admission: e.target.value })
                      }
                      name="year_of_admission"
                      className="form-control"
                    >
                      <option value="">Select Session</option>
                      {
                        SessionOpt && SessionOpt.map((item, key) => {
                          return (
                            <option value={item?.id}>{item?.name}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                </div>
              </div>
            </form>
            </div>
        </div>
    )
}

export default BasicInformation