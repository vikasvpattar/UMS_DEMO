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
          
          <div className="col-lg-6 col-md-6">
            <div className="form-group">
            <label>Yearly Income</label>
              <input
                type="text"
                name="income"
                className="form-control"
                placeholder="Yearly Income*"
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="form-group">
            <label>Name of University</label>

              <input
                type="text"
                name="university"
                className="form-control"
                placeholder="Name of University*"
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
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="form-group">
            <label>Exam</label>

              <input
                type="text"
                name="exam"
                className="form-control"
                placeholder="Exam"
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <label>Passing Year</label>
            <div className="form-group">
              <input
                type="text"
                name="pass_year"
                className="form-control"
                placeholder="Passing Year"
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="form-group">
            <label>Seat No</label>

              <input
                type="text"
                name="seat_no"
                className="form-control"
                placeholder="Seat No"
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="form-group">
            <label>Class</label>

              <input
                type="text"
                name="class"
                className="form-control"
                placeholder="Class"
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
                  readOnly={true}
                //   onChange={(e) => setInfo({...info, game_choice: e.target.value})}
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
                  readOnly={true}
                //   onChange={(e) => setInfo({...info, obtained_scholarship: e.target.value})}
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
                  <th>Passing Year</th>
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
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem1_passing_year: e.target.value})}
                      id="pyear1"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="clg1"
                      value={info?.sem1_college}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem1_college: e.target.value})}
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
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem1_seat_no: e.target.value})}
                      id="seat1"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="board1"
                      value={info?.sem1_university}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem1_university: e.target.value})}
                      id="board1"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="marks1"
                      value={info?.sem1_obtaine_marks}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem1_obtaine_marks: e.target.value})}
                      id="marks1"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="class1"
                      value={info?.sem1_class}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem1_class: e.target.value})}
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
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem2_passing_year: e.target.value})}
                      id="pyear2"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="clg2"
                      value={info?.sem2_college}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem2_college: e.target.value})}
                      id="clg2"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="seat2"
                      value={info?.sem2_seat_no}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem2_seat_no: e.target.value})}
                      id="seat2"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="board2"
                      value={info?.sem2_university}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem2_university: e.target.value})}
                      id="board2"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="marks2"
                      value={info?.sem2_obtaine_marks}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem2_obtaine_marks: e.target.value})}
                      id="marks2"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="class2"
                      value={info?.sem2_class}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem2_class: e.target.value})}
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
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem3_passing_year: e.target.value})}
                      id="pyear3"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="clg3"
                      value={info?.sem3_college}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem3_college: e.target.value})}
                      id="clg3"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="seat3"
                      value={info?.sem3_seat_no}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem3_seat_no: e.target.value})}
                      id="seat3"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="board3"
                      value={info?.sem3_university}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem3_university: e.target.value})}
                      id="board3"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="marks3"
                      value={info?.sem3_obtaine_marks}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem3_obtaine_marks: e.target.value})}
                      id="marks3"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="class3"
                      value={info?.sem3_class}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem3_class: e.target.value})}
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
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem4_passing_year: e.target.value})}
                      id="pyear4"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="clg4"
                      value={info?.sem4_college}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem4_college: e.target.value})}
                      id="clg4"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="seat4"
                      value={info?.sem4_seat_no}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem4_seat_no: e.target.value})}
                      id="seat4"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="board4"
                      value={info?.sem4_university}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem4_university: e.target.value})}
                      id="board4"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="marks4"
                      value={info?.sem4_obtaine_marks}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem4_obtaine_marks: e.target.value})}
                      id="marks4"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="class4"
                      value={info?.sem4_class}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem4_class: e.target.value})}
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
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem5_passing_year: e.target.value})}
                      id="pyear5"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="clg5"
                      value={info?.sem5_college}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem5_college: e.target.value})}
                      id="clg5"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="seat5"
                      value={info?.sem5_seat_no}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem5_seat_no: e.target.value})}
                      id="seat5"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="board5"
                      value={info?.sem5_university}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem5_university: e.target.value})}
                      id="board5"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="marks5"
                      value={info?.sem5_obtaine_marks}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem5_obtaine_marks: e.target.value})}
                      id="marks5"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="class5"
                      value={info?.sem5_class}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem5_class: e.target.value})}
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
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem6_passing_year: e.target.value})}
                      id="pyear6"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="clg6"
                      value={info?.sem6_college}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem6_college: e.target.value})}
                      id="clg6"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="seat6"
                      value={info?.sem6_seat_no}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem6_seat_no: e.target.value})}
                      id="seat6"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="board6"
                      value={info?.sem6_university}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem6_university: e.target.value})}
                      id="board6"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="marks6"
                      value={info?.sem6_obtaine_marks}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem6_obtaine_marks: e.target.value})}
                      id="marks6"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="class6"
                      value={info?.sem6_class}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem6_class: e.target.value})}
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
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem7_passing_year: e.target.value})}
                      id="pyear7"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="clg7"
                      value={info?.sem7_college}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem7_college: e.target.value})}
                      id="clg7"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="seat7"
                      value={info?.sem7_seat_no}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem7_seat_no: e.target.value})}
                      id="seat7"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="board7"
                      value={info?.sem7_university}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem7_university: e.target.value})}
                      id="board7"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="marks7"
                      value={info?.sem7_obtaine_marks}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem7_obtaine_marks: e.target.value})}
                      id="marks7"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="class7"
                      value={info?.sem7_class}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem7_class: e.target.value})}
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
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem8_passing_year: e.target.value})}
                      id="pyear8"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="clg8"
                      value={info?.sem8_college}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem8_college: e.target.value})}
                      id="clg8"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="seat8"
                      value={info?.sem8_seat_no}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem8_seat_no: e.target.value})}
                      id="seat8"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="board8"
                      value={info?.sem8_university}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem8_university: e.target.value})}
                      id="board8"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="marks8"
                      value={info?.sem8_obtaine_marks}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem8_obtaine_marks: e.target.value})}
                      id="marks8"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="class8"
                      value={info?.sem8_class}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem8_class: e.target.value})}
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
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem9_passing_year: e.target.value})}
                      id="pyear9"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="clg9"
                      value={info?.sem9_college}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem9_college: e.target.value})}
                      id="clg9"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="seat9"
                      value={info?.sem9_seat_no}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem9_seat_no: e.target.value})}
                      id="seat9"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="board9"
                      value={info?.sem9_university}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem9_university: e.target.value})}
                      id="board9"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="marks9"
                      value={info?.sem9_obtaine_marks}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem9_obtaine_marks: e.target.value})}
                      id="marks9"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="class9"
                      value={info?.sem9_class}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem9_class: e.target.value})}
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
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem10_passing_year: e.target.value})}
                      id="pyear10"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="clg10"
                      value={info?.sem10_college}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem10_college: e.target.value})}
                      id="clg10"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="seat10"
                      value={info?.sem10_seat_no}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem10_seat_no: e.target.value})}
                      id="seat10"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="board10"
                      value={info?.sem10_university}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem10_university: e.target.value})}
                      id="board10"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="marks10"
                      value={info?.sem10_obtaine_marks}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem10_obtaine_marks: e.target.value})}
                      id="marks10"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="class10"
                      value={info?.sem10_class}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, sem10_class: e.target.value})}
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
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, other_sem: e.target.value})}
                      id="other"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="month"
                      name="pyear11"
                      value={info?.other_passing_year}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, other_passing_year: e.target.value})}
                      id="pyear11"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="clg11"
                      value={info?.other_college}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, other_college: e.target.value})}
                      id="clg11"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="seat11"
                      value={info?.other_seat_no}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, other_seat_no: e.target.value})}
                      id="seat11"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="board11"
                      value={info?.other_university}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, other_university: e.target.value})}
                      id="board11"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="marks11"
                      value={info?.other_obtaine_marks}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, other_obtaine_marks: e.target.value})}
                      id="marks11"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="class11"
                      value={info?.other_class}
                      readOnly={true}
                    //   onChange={(e) => setInfo({...info, other_class: e.target.value})}
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
                  readOnly={true}
                    //   onChange={(e) => setInfo({...info, check_one: e.target.value})}
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
                  readOnly={true}
                    //   onChange={(e) => setInfo({...info, check_two: e.target.value})}
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
            <input 
            type="text" 
            className="form-control" 
            name="place"  
            value={info?.applied_place}
            readOnly={true}
            //   onChange={(e) => setInfo({...info, applied_place: e.target.value})}
            />
          </div>
          <div className="col-md-4">
            <h5>Date:</h5>
            <input
              type="text"
              className="form-control"
              name="sign_date"
            //   onChange={(e) => {
            //     setDefaultDate(e.target.value);
            //   }}
            //   value={defaultDate}
              readOnly=""
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