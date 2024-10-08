import React,{useState , useEffect} from 'react'

const Law = ({form_data}) => {

  const [info, setInfo] = useState({})

  useEffect(() => {

    if (form_data) {
      setInfo({
        ...form_data
      })
    }
  }, [form_data])


  return (
    <div className='Law'>
        <div className="row">
                <h4 className='col-12 mb-2'>Previous Educational Details</h4>

                {/* <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>Yearly Income</label>
                    <input
                      type="text"
                      name="income"
                      className="form-control"
                      placeholder="Yearly Income*"
                      value={info?.yearly_income}
                    />
                  </div>
                </div> */}
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>Name of University</label>

                    <input
                      type="text"
                      name="university"
                      className="form-control"
                      placeholder="Name of University*"
                      value={info?.university}
                      // onChange={e=>{setInfo({...info,university:e.target.value})}}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>University Place</label>

                    <input
                      type="text"
                      name="uni_place"
                      className="form-control"
                      placeholder="University Place*"
                      value={info?.university_place}
                      // onChange={e => {setInfo({...info, university_place:e.target.value})}}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>Exam</label>

                    <input
                      type="text"
                      name="exam"
                      className="form-control"
                      placeholder="Exam"
                      value={info?.exam}
                      // onChange={e=>{setInfo({...info, exam:e.target.value})}}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <label>Passing Year</label>
                  <div className="form-group">
                    <input
                      type="text"
                      name="pass_year"
                      className="form-control"
                      placeholder="Passing Year"
                      value={info?.passing_year}
                      // onChange={e=>setInfo({...info, passing_year:e.target.value})}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>Seat No</label>

                    <input
                      type="text"
                      name="seat_no"
                      className="form-control"
                      placeholder="Seat No"
                      value={info?.seat_no}
                      // onChange={e=>setInfo({...info, seat_no: e.target.value})}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label>Class</label>

                    <input
                      type="text"
                      name="class"
                      className="form-control"
                      placeholder="Class"
                      value={info?.class}
                      // onChange={e=>setInfo({...info, class:e.target.value})}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Name of College</label>

                    <input
                      type="text"
                      name="college"
                      className="form-control"
                      placeholder="Name of College"
                      value={info?.college}
                      // onChange={e=>setInfo({...info, college: e.target.value})}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="form-group">
                    <label>Percentage</label>

                    <input
                      type="text"
                      name="percent"
                      className="form-control"
                      placeholder="Percentage"
                      value={info?.percentage}
                      // onChange={e=>setInfo({...info, percentage: e.target.value})}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="form-group">
                    <label>Total Marks</label>

                    <input
                      type="text"
                      name="total_marks"
                      className="form-control"
                      placeholder="Total Marks"
                      value={info?.total_marks}
                      // onChange={e=>setInfo({...info, total_marks: e.target.value})}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="form-group">
                    <label>Obtained Marks</label>

                    <input
                      type="text"
                      name="obt_marks"
                      className="form-control"
                      placeholder="Obtained Marks"
                      value={info?.obtain_marks}
                      // onChange={e=>setInfo({...info, obtain_marks: e.target.value})}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        name="choice_sub"
                        value={info?.game_choice}
                        // onChange={(e) => setInfo({ ...info, game_choice: e.target.value })}
                        readOnly={true}
                        placeholder="Choice of Game and Subjects"
                        id="choice_sub"
                        style={{ height: 100 }}
                        defaultValue={""}
                      />
                      <label htmlFor="choice_sub">Choice of Game and Subjects</label>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        name="scholarship"
                        value={info?.obtained_scholarship}
                        // onChange={(e) => setInfo({ ...info, obtained_scholarship: e.target.value })}
                        readOnly={true}
                        placeholder="If Obtain any Scholarship Please Fill Detail"
                        id="floatingTextarea2"
                        style={{ height: 100 }}
                        defaultValue={""}
                      />
                      <label htmlFor="floatingTextarea2">
                        If Obtain any Scholarship Please Fill Detail
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 table-responsive">
                  <table className="table table-bordered border-danger rounded">
                    <thead>
                      <tr>
                        <th colSpan={2} className="text-center">
                          Exam{" "}
                        </th>
                        <th style={{minWidth:'120px'}}>Passing Year</th>
                        <th style={{minWidth:'120px'}}>Name of College</th>
                        <th style={{minWidth:'120px'}}>Seat No</th>
                        <th style={{minWidth:'120px'}}>Name of University and Board</th>
                        <th style={{minWidth:'120px'}}>Obtained Marks</th>
                        <th style={{minWidth:'120px'}}>Class</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td rowSpan={10} align="center">
                          B.A <br /> B.COM <br /> B.S.C <br /> B.B.A <br /> or Others
                        </td>
                        <td>Semester-1</td>
                        <td>
                          <input
                            type="month"
                            name="pyear1"
                            value={info?.sem1_passing_year}
                            // onChange={(e) => setInfo({ ...info, sem1_passing_year: e.target.value })}
                            readOnly={true}
                            id="pyear1"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="clg1"
                            value={info?.sem1_college}
                            // onChange={(e) => setInfo({ ...info, sem1_college: e.target.value })}
                            readOnly={true}
                            id="clg1"
                            className="form-control"
                            pattern="[a-z]"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="seat1"
                            value={info?.sem1_seat_no}
                            // onChange={(e) => setInfo({ ...info, sem1_seat_no: e.target.value })}
                            readOnly={true}
                            id="seat1"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="board1"
                            value={info?.sem1_university}
                            // onChange={(e) => setInfo({ ...info, sem1_university: e.target.value })}
                            readOnly={true}
                            id="board1"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="marks1"
                            value={info?.sem1_obtaine_marks}
                            // onChange={(e) => setInfo({ ...info, sem1_obtaine_marks: e.target.value })}
                            readOnly={true}
                            id="marks1"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="class1"
                            value={info?.sem1_class}
                            // onChange={(e) => setInfo({ ...info, sem1_class: e.target.value })}
                            readOnly={true}
                            id="class1"
                            className="form-control"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Semester-2</td>
                        <td>
                          <input
                            type="month"
                            name="pyear2"
                            value={info?.sem2_passing_year}
                            // onChange={(e) => setInfo({ ...info, sem2_passing_year: e.target.value })}
                            readOnly={true}
                            id="pyear2"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="clg2"
                            value={info?.sem2_college}
                            // onChange={(e) => setInfo({ ...info, sem2_college: e.target.value })}
                            readOnly={true}
                            id="clg2"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="seat2"
                            value={info?.sem2_seat_no}
                            // onChange={(e) => setInfo({ ...info, sem2_seat_no: e.target.value })}
                            readOnly={true}
                            id="seat2"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="board2"
                            value={info?.sem2_university}
                            // onChange={(e) => setInfo({ ...info, sem2_university: e.target.value })}
                            readOnly={true}
                            id="board2"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="marks2"
                            value={info?.sem2_obtaine_marks}
                            // onChange={(e) => setInfo({ ...info, sem2_obtaine_marks: e.target.value })}
                            readOnly={true}
                            id="marks2"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="class2"
                            value={info?.sem2_class}
                            // onChange={(e) => setInfo({ ...info, sem2_class: e.target.value })}
                            readOnly={true}
                            id="class2"
                            className="form-control"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Semester-3</td>
                        <td>
                          <input
                            type="month"
                            name="pyear3"
                            value={info?.sem3_passing_year}
                            // onChange={(e) => setInfo({ ...info, sem3_passing_year: e.target.value })}
                            readOnly={true}
                            id="pyear3"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="clg3"
                            value={info?.sem3_college}
                            // onChange={(e) => setInfo({ ...info, sem3_college: e.target.value })}
                            readOnly={true}
                            id="clg3"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="seat3"
                            value={info?.sem3_seat_no}
                            // onChange={(e) => setInfo({ ...info, sem3_seat_no: e.target.value })}
                            readOnly={true}
                            id="seat3"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="board3"
                            value={info?.sem3_university}
                            // onChange={(e) => setInfo({ ...info, sem3_university: e.target.value })}
                            readOnly={true}
                            id="board3"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="marks3"
                            value={info?.sem3_obtaine_marks}
                            // onChange={(e) => setInfo({ ...info, sem3_obtaine_marks: e.target.value })}
                            readOnly={true}
                            id="marks3"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="class3"
                            value={info?.sem3_class}
                            // onChange={(e) => setInfo({ ...info, sem3_class: e.target.value })}
                            readOnly={true}
                            id="class3"
                            className="form-control"
                          />
                        </td>
                      </tr>{" "}
                      <tr>
                        <td>Semester-4</td>
                        <td>
                          <input
                            type="month"
                            name="pyear4"
                            value={info?.sem4_passing_year}
                            // onChange={(e) => setInfo({ ...info, sem4_passing_year: e.target.value })}
                            readOnly={true}
                            id="pyear4"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="clg4"
                            value={info?.sem4_college}
                            // onChange={(e) => setInfo({ ...info, sem4_college: e.target.value })}
                            readOnly={true}
                            id="clg4"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="seat4"
                            value={info?.sem4_seat_no}
                            // onChange={(e) => setInfo({ ...info, sem4_seat_no: e.target.value })}
                            readOnly={true}
                            id="seat4"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="board4"
                            value={info?.sem4_university}
                            // onChange={(e) => setInfo({ ...info, sem4_university: e.target.value })}
                            readOnly={true}
                            id="board4"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="marks4"
                            value={info?.sem4_obtaine_marks}
                            // onChange={(e) => setInfo({ ...info, sem4_obtaine_marks: e.target.value })}
                            readOnly={true}
                            id="marks4"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="class4"
                            value={info?.sem4_class}
                            // onChange={(e) => setInfo({ ...info, sem4_class: e.target.value })}
                            readOnly={true}
                            id="class4"
                            className="form-control"
                          />
                        </td>
                      </tr>{" "}
                      <tr>
                        <td>Semester-5</td>
                        <td>
                          <input
                            type="month"
                            name="pyear5"
                            value={info?.sem5_passing_year}
                            // onChange={(e) => setInfo({ ...info, sem5_passing_year: e.target.value })}
                            readOnly={true}
                            id="pyear5"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="clg5"
                            value={info?.sem5_college}
                            // onChange={(e) => setInfo({ ...info, sem5_college: e.target.value })}
                            readOnly={true}
                            id="clg5"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="seat5"
                            value={info?.sem5_seat_no}
                            // onChange={(e) => setInfo({ ...info, sem5_seat_no: e.target.value })}
                            readOnly={true}
                            id="seat5"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="board5"
                            value={info?.sem5_university}
                            // onChange={(e) => setInfo({ ...info, sem5_university: e.target.value })}
                            readOnly={true}
                            id="board5"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="marks5"
                            value={info?.sem5_obtaine_marks}
                            // onChange={(e) => setInfo({ ...info, sem5_obtaine_marks: e.target.value })}
                            readOnly={true}
                            id="marks5"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="class5"
                            value={info?.sem5_class}
                            // onChange={(e) => setInfo({ ...info, sem5_class: e.target.value })}
                            readOnly={true}
                            id="class5"
                            className="form-control"
                          />
                        </td>
                      </tr>{" "}
                      <tr>
                        <td>Semester-6</td>
                        <td>
                          <input
                            type="month"
                            name="pyear6"
                            value={info?.sem6_passing_year}
                            // onChange={(e) => setInfo({ ...info, sem6_passing_year: e.target.value })}
                            readOnly={true}
                            id="pyear6"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="clg6"
                            value={info?.sem6_college}
                            // onChange={(e) => setInfo({ ...info, sem6_college: e.target.value })}
                            readOnly={true}
                            id="clg6"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="seat6"
                            value={info?.sem6_seat_no}
                            // onChange={(e) => setInfo({ ...info, sem6_seat_no: e.target.value })}
                            readOnly={true}
                            id="seat6"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="board6"
                            value={info?.sem6_university}
                            // onChange={(e) => setInfo({ ...info, sem6_university: e.target.value })}
                            readOnly={true}
                            id="board6"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="marks6"
                            value={info?.sem6_obtaine_marks}
                            // onChange={(e) => setInfo({ ...info, sem6_obtaine_marks: e.target.value })}
                            readOnly={true}
                            id="marks6"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="class6"
                            value={info?.sem6_class}
                            // onChange={(e) => setInfo({ ...info, sem6_class: e.target.value })}
                            readOnly={true}
                            id="class6"
                            className="form-control"
                          />
                        </td>
                      </tr>{" "}
                      <tr>
                        <td>Semester-7</td>
                        <td>
                          <input
                            type="month"
                            name="pyear7"
                            value={info?.sem7_passing_year}
                            // onChange={(e) => setInfo({ ...info, sem7_passing_year: e.target.value })}
                            readOnly={true}
                            id="pyear7"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="clg7"
                            value={info?.sem7_college}
                            // onChange={(e) => setInfo({ ...info, sem7_college: e.target.value })}
                            readOnly={true}
                            id="clg7"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="seat7"
                            value={info?.sem7_seat_no}
                            // onChange={(e) => setInfo({ ...info, sem7_seat_no: e.target.value })}
                            readOnly={true}
                            id="seat7"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="board7"
                            value={info?.sem7_university}
                            // onChange={(e) => setInfo({ ...info, sem7_university: e.target.value })}
                            readOnly={true}
                            id="board7"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="marks7"
                            value={info?.sem7_obtaine_marks}
                            // onChange={(e) => setInfo({ ...info, sem7_obtaine_marks: e.target.value })}
                            readOnly={true}
                            id="marks7"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="class7"
                            value={info?.sem7_class}
                            // onChange={(e) => setInfo({ ...info, sem7_class: e.target.value })}
                            readOnly={true}
                            id="class7"
                            className="form-control"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Semester-8</td>
                        <td>
                          <input
                            type="month"
                            name="pyear8"
                            value={info?.sem8_passing_year}
                            // onChange={(e) => setInfo({ ...info, sem8_passing_year: e.target.value })}
                            readOnly={true}
                            id="pyear8"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="clg8"
                            value={info?.sem8_college}
                            // onChange={(e) => setInfo({ ...info, sem8_college: e.target.value })}
                            readOnly={true}
                            id="clg8"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="seat8"
                            value={info?.sem8_seat_no}
                            // onChange={(e) => setInfo({ ...info, sem8_seat_no: e.target.value })}
                            readOnly={true}
                            id="seat8"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="board8"
                            value={info?.sem8_university}
                            // onChange={(e) => setInfo({ ...info, sem8_university: e.target.value })}
                            readOnly={true}
                            id="board8"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="marks8"
                            value={info?.sem8_obtaine_marks}
                            // onChange={(e) => setInfo({ ...info, sem8_obtaine_marks: e.target.value })}
                            readOnly={true}
                            id="marks8"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="class8"
                            value={info?.sem8_class}
                            // onChange={(e) => setInfo({ ...info, sem8_class: e.target.value })}
                            readOnly={true}
                            id="class8"
                            className="form-control"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Semester-9</td>
                        <td>
                          <input
                            type="month"
                            name="pyear9"
                            value={info?.sem9_passing_year}
                            // onChange={(e) => setInfo({ ...info, sem9_passing_year: e.target.value })}
                            readOnly={true}
                            id="pyear9"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="clg9"
                            value={info?.sem9_college}
                            // onChange={(e) => setInfo({ ...info, sem9_college: e.target.value })}
                            readOnly={true}
                            id="clg9"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="seat9"
                            value={info?.sem9_seat_no}
                            // onChange={(e) => setInfo({ ...info, sem9_seat_no: e.target.value })}
                            readOnly={true}
                            id="seat9"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="board9"
                            value={info?.sem9_university}
                            // onChange={(e) => setInfo({ ...info, sem9_university: e.target.value })}
                            readOnly={true}
                            id="board9"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="marks9"
                            value={info?.sem9_obtaine_marks}
                            // onChange={(e) => setInfo({ ...info, sem9_obtaine_marks: e.target.value })}
                            readOnly={true}
                            id="marks9"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="class9"
                            value={info?.sem9_class}
                            // onChange={(e) => setInfo({ ...info, sem9_class: e.target.value })}
                            readOnly={true}
                            id="class9"
                            className="form-control"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Semester-10</td>
                        <td>
                          <input
                            type="month"
                            name="pyear10"
                            value={info?.sem10_passing_year}
                            // onChange={(e) => setInfo({ ...info, sem10_passing_year: e.target.value })}
                            readOnly={true}
                            id="pyear10"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="clg10"
                            value={info?.sem10_college}
                            // onChange={(e) => setInfo({ ...info, sem10_college: e.target.value })}
                            readOnly={true}
                            id="clg10"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="seat10"
                            value={info?.sem10_seat_no}
                            // onChange={(e) => setInfo({ ...info, sem10_seat_no: e.target.value })}
                            readOnly={true}
                            id="seat10"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="board10"
                            value={info?.sem10_university}
                            // onChange={(e) => setInfo({ ...info, sem10_university: e.target.value })}
                            readOnly={true}
                            id="board10"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="marks10"
                            value={info?.sem10_obtaine_marks}
                            // onChange={(e) => setInfo({ ...info, sem10_obtaine_marks: e.target.value })}
                            readOnly={true}
                            id="marks10"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="class10"
                            value={info?.sem10_class}
                            // onChange={(e) => setInfo({ ...info, sem10_class: e.target.value })}
                            readOnly={true}
                            id="class10"
                            className="form-control"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Other</td>
                        <td>
                          <input
                            type="text"
                            name="other"
                            value={info?.other_sem}
                            // onChange={(e) => setInfo({ ...info, other_sem: e.target.value })}
                            readOnly={true}
                            id="other"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="month"
                            name="pyear11"
                            value={info?.other_passing_year}
                            // onChange={(e) => setInfo({ ...info, other_passing_year: e.target.value })}
                            readOnly={true}
                            id="pyear11"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="clg11"
                            value={info?.other_college}
                            // onChange={(e) => setInfo({ ...info, other_college: e.target.value })}
                            readOnly={true}
                            id="clg11"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="seat11"
                            value={info?.other_seat_no}
                            // onChange={(e) => setInfo({ ...info, other_seat_no: e.target.value })}
                            readOnly={true}
                            id="seat11"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="board11"
                            value={info?.other_university}
                            // onChange={(e) => setInfo({ ...info, other_university: e.target.value })}
                            readOnly={true}
                            id="board11"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="marks11"
                            value={info?.other_obtaine_marks}
                            // onChange={(e) => setInfo({ ...info, other_obtaine_marks: e.target.value })}
                            readOnly={true}
                            id="marks11"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="class11"
                            value={info?.other_class}
                            // onChange={(e) => setInfo({ ...info, other_class: e.target.value })}
                            readOnly={true}
                            id="class11"
                            className="form-control"
                          />
                        </td>
                      </tr>
                    </tbody>
                    </table>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-12">
                  <div className="form-group ">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input check mr-5"
                        name="agree"
                        value={info?.check_one}
                        // onChange={(e) => setInfo({ ...info, check_one: e.target.value })}
                        readOnly={true}
                        type="checkbox"
                        checked
                        required=""
                        id="inlineCheckbox1"
                        defaultValue={1}
                      />
                      <h5 htmlFor="inlineCheckbox1 ml-5">
                        I Don't Apply in Any Other Course for Academic Course in the
                        Academic Sessions.
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group mb-5">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input check mr-5"
                        name="promise"
                        value={info?.check_two}
                        // onChange={(e) => setInfo({ ...info, check_two: e.target.value })}
                        readOnly={true}
                        type="checkbox"
                        checked
                        required=""
                        id="inlineCheckbox2"
                        defaultValue={1}
                      />
                      <h5 htmlFor="inlineCheckbox2 ">
                        I Promise, I Follow Swaminarayan University and College Rules
                        and Regulations Strictly.
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <h5>Place:</h5>
                  <input type="text" className="form-control" name="place" value={info?.applied_place}
                    // onChange={(e) => setInfo({ ...info, applied_place: e.target.value })} 
                    readOnly={true}
                    />
                </div>
                <div className="col-md-4">
                  <h5>Date:</h5>
                  <input
                    type="text"
                    className="form-control"
                    name="sign_date"
                    readOnly={true}
                    value={info?.date}
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <h5>
                    <u>Note :</u>
                  </h5>
                  <ol>
                    <li>
                      Students Pay Tuition Fee and Others Fee As per University and
                      College Norms
                    </li>
                    <li>If Student was any Job Submit "No Objection Certificate"</li>
                    <li>All Students Follow Bar Council of India's Rules Strictly</li>
                    <li>Students Follow College and Institution's Rules Strictly </li>
                  </ol>
                </div>
              </div>
    </div>
  )
}

export default Law