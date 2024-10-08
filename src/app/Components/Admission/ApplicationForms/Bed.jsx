import React ,{useState , useEffect}from 'react'

const Bed = ({form_data}) => {

  const [info, setInfo] = useState({})

  useEffect(() => {

    if (form_data) {
      setInfo({
        ...form_data
      })
    }
  }, [form_data])


  return (
    <div>
        <div className="row">
                <div className="row mt-3">
                  <h5 className="mb-3 col-12">Graduation Details</h5>
                  <div className="col-lg-6">
                    <div className="form-group">
                    <label>Name of College</label>
                      <input
                        type="text"
                        name="college"
                        value={info?.ug_college}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, ug_college: e.target.value })}
                        className="form-control"
                        placeholder="Name of College"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                    <label>Name of University</label>
                      <input
                        type="text"
                        name="university"
                        value={info?.ug_university}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, ug_university: e.target.value })}
                        className="form-control"
                        placeholder="Name of University*"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                    <label>Graduation</label>
                      <input
                        type="text"
                        name="ug"
                        value={info?.ug_graduation}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, ug_graduation: e.target.value })}
                        className="form-control"
                        placeholder="Graduation: B.Sc./B.A./B.Com./Other*"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                    <label>Subject Combination</label>
                      <input
                        type="text"
                        name="subject"
                        value={info?.ug_subject}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, ug_subject: e.target.value })}
                        className="form-control"
                        placeholder="UG Subjects Combination*"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                    <label>Passing Month and Year</label>
                      <input
                        type="month"
                        name="pass_year"
                        value={info?.ug_passing_year}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, ug_passing_year: e.target.value })}
                        className="form-control"
                        placeholder="Passing Month and Year (ex: yyyy-mm-dd)"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                    <label>Seat Number</label>
                      <input
                        type="text"
                        name="seat_no"
                        value={info?.ug_seat_no}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, ug_seat_no: e.target.value })}
                        className="form-control"
                        placeholder="Seat No"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                    <label>Percentage</label>
                      <input
                        type="text"
                        name="percent"
                        value={info?.ug_percentage}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, ug_percentage: e.target.value })}
                        className="form-control"
                        placeholder="Percentage"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                    <label>Total Marks</label>
                      <input
                        type="text"
                        name="total_marks"
                        value={info?.ug_total_marks}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, ug_total_marks: e.target.value })}
                        className="form-control"
                        placeholder="Total Marks"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                    <label>Obtain Marks</label>
                      <input
                        type="text"
                        name="obt_marks"
                        value={info?.ug_obtain_marks}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, ug_obtain_marks: e.target.value })}
                        className="form-control"
                        placeholder="Obtain Marks"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <h5 className="mb-3 col-12">Post Graduation Details</h5>
                  <div className="col-lg-6">
                    <div className="form-group">
                    <label>Name of College</label>
                      <input
                        type="text"
                        name="pg_college"
                        value={info?.pg_college}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, pg_college: e.target.value })}
                        className="form-control"
                        placeholder="Name of College"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                    <label>Name of University<span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        name="pg_university"
                        value={info?.pg_university}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, pg_university: e.target.value })}
                        className="form-control"
                        placeholder="Name of University*"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                    <label >Graduation<span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        name="pg"
                        value={info?.pg_graduation}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, pg_graduation: e.target.value })}
                        className="form-control"
                        placeholder="Graduation: M.Sc./M.A./M.Com./Other*"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                    <label>Subject Combination</label>
                      <input
                        type="text"
                        name="pg_subject"
                        value={info?.pg_subject}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, pg_subject: e.target.value })}
                        className="form-control"
                        placeholder="PG Subjects Combination*"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                    <label>Passing Month and Year</label>
                      <input
                        type="month"
                        name="pg_pass_year"
                        value={info?.pg_passing_year}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, pg_passing_year: e.target.value })}
                        className="form-control"
                        placeholder="Passing Month and  Year"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                    <label>Seat Number</label>
                      <input
                        type="text"
                        name="pg_seat_no"
                        value={info?.pg_seat_no}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, pg_seat_no: e.target.value })}
                        className="form-control"
                        placeholder="Seat No"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                    <label>Percentage</label>
                      <input
                        type="text"
                        name="pg_percent"
                        value={info?.pg_percentage}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, pg_percentage: e.target.value })}
                        className="form-control"
                        placeholder="Percentage"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                    <label>Total Marks</label>
                      <input
                        type="text"
                        name="pg_total_marks"
                        value={info?.pg_total_marks}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, pg_total_marks: e.target.value })}
                        className="form-control"
                        placeholder="Total Marks"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                    <label>Obtain Marks</label>
                      <input
                        type="text"
                        name="pg_obt_marks"
                        value={info?.pg_obtain_marks}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, pg_obtain_marks: e.target.value })}
                        className="form-control"
                        placeholder="Obtain Marks"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <h5 className="mb-3 col-12">Last Examination Details</h5>
                  <div className="col-lg-6">
                    <div className="form-group">
                    <label>Name of College</label>
                      <input
                        type="text"
                        name="last_college"
                        value={info?.le_college}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, le_college: e.target.value })}
                        className="form-control"
                        placeholder="Name of College"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                    <label>Name of University<span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        name="last_university"
                        value={info?.le_university}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, le_university: e.target.value })}
                        className="form-control"
                        placeholder="Name of University"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                    <label>Subject Combination</label>
                      <input
                        type="text"
                        name="pg_subject"
                        value={info?.le_subject}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, le_subject: e.target.value })}
                        className="form-control"
                        placeholder="UG Subjects Combination*"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                    <label>Passing Month and Year</label>
                      <input
                        type="month"
                        name="pg_pass_year"
                        value={info?.le_passing_year}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, le_passing_year: e.target.value })}
                        className="form-control"
                        placeholder="Passing Month and  Year"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                    <label>Seat Number</label>
                      <input
                        type="text"
                        name="pg_seat_no"
                        value={info?.le_seat_no}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, le_seat_no: e.target.value })}
                        className="form-control"
                        placeholder="Seat No"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                    <label>Percentage</label>
                      <input
                        type="text"
                        name="pg_percent"
                        value={info?.le_percentage}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, le_percentage: e.target.value })}
                        className="form-control"
                        placeholder="Percentage"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                    <label>Total Marks</label>
                      <input
                        type="text"
                        name="pg_total_marks"
                        value={info?.le_total_marks}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, le_total_marks: e.target.value })}
                        className="form-control"
                        placeholder="Total Marks"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                    <label>Obtain Marks</label>
                      <input
                        type="text"
                        name="pg_obt_marks"
                        value={info?.le_obtain_marks}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, le_obtain_marks: e.target.value })}
                        className="form-control"
                        placeholder="Obtain Marks"
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="row mt-3">
                  <h5 className="mb-3 col-12">B.Ed. Method</h5>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                    <label>Subject 1</label>
                      <input
                        type="text"
                        name="sub1"
                        value={info?.bed_subject1}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, bed_subject1: e.target.value })}
                        className="form-control"
                        placeholder="Subject 1"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                    <label>Subject 2</label>
                      <input
                        type="text"
                        name="sub2"
                        value={info?.bed_subject2}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, bed_subject2: e.target.value })}
                        className="form-control"
                        placeholder="Subject 2"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                    <label>Remarks</label>
                      <textarea
                        className="form-control"
                        name="remarks"
                        value={info?.bed_remarks}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, bed_remarks: e.target.value })}
                        placeholder="Remarks*"
                        id="remarks"
                        rows={2}
                        cols={1}
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <h5 htmlFor="">
                        Student Photo <small className="text-danger">*</small>
                      </h5>
                      <input
                        type="file"
                        name="image"
                        value={info?.student_photo}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, student_photo: e.target.value })}
                        className="form-control form-control-lg"
                        placeholder="Subject 2"
                      />
                    </div>
                  </div>
                </div> */}
                  <div className="col-md-6">
                    <h5>Place:</h5>
                    <input 
                    type="text" 
                    className="form-control" 
                    name="place" 
                    value={info?.applied_place}
                    readOnly={true}
                    // onChange={(e) => setInfo({ ...info, applied_place: e.target.value })} 
                    />
                  </div>
                  <div className="col-md-6">
                    <h5>Date:</h5>
                    <input
                      type="text"
                      className="form-control"
                      name="sign_date"
                      value={info?.date}
                      readOnly={true}
                    //   onChange={(e) => setInfo({ ...info, applied_date: e.target.value })}
                      defaultValue=""
                    />
                  </div>
              </div>
    </div>
  )
}

export default Bed