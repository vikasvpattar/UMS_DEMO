import React,{useState , useEffect} from 'react'

const Msc = ({form_data}) => {

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
            <div className="register" style={{ maxWidth: "100%" }}>
                <h3 className='col-12'>M.Sc. Admission Form</h3>
                <form action="" method="POST">
                    <div className="row">
                        <h5 className='col-12'>Select M.Sc. Subject</h5>
                        <div className="col-lg-4">
                            <div className="form-group">
                                <select
                                    name="admission_to"
                                    required="required"
                                    id="admission_to"
                                    className="form-control"
                                >
                                    <option value="">Select Subject</option>
                                    <option value="Chemistry">Chemistry</option>
                                    <option value="Microbiology">Microbiology</option>
                                    <option value="Microbiology">Microbiology</option>
                                    <option value="Botany">Botany</option>
                                    <option value="Biotechnology">Biotechnology</option>
                                    <option value="Zoology">Zoology</option>
                                    <option value="Mathematics">Mathematics</option>
                                </select>{" "}
                            </div>
                        </div>
                    </div>
                    <div className="row">

                        <h5 className="mb-3">Details of Qualifications</h5>
                        <div className="col-md-12 table-responsive">
                            <table className="table table-bordered border-danger rounded">
                                <tbody>
                                    <tr>
                                        <th>Details of Qualifications</th>
                                        <th>School/College</th>
                                        <th>Passing Year</th>
                                        <th>Subjects/Major</th>
                                        <th>Board / University</th>
                                        <th>Percentage or CGPA</th>

                                    </tr>

                                    <tr>
                                        <th>B.Sc.</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="school3"
                                                value={info?.bsc_school}
                                                readOnly={true}
                                                // onChange={(e) => setInfo({ ...info, bsc_school: e.target.value })}
                                                id="school3"
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="month"
                                                name="pyear3"
                                                value={info?.bsc_passyear}
                                                readOnly={true}
                                                // onChange={(e) => setInfo({ ...info, bsc_passyear: e.target.value })}
                                                id="pyear3"
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="subjects3"
                                                value={info?.bsc_subject}
                                                readOnly={true}
                                                // onChange={(e) => setInfo({ ...info, bsc_subject: e.target.value })}
                                                id="subjects3"
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="university3"
                                                value={info?.bsc_board}
                                                readOnly={true}
                                                // onChange={(e) => setInfo({ ...info, bsc_board: e.target.value })}
                                                id="university3"
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="marks3"
                                                value={info?.bsc_percent}
                                                readOnly={true}
                                                // onChange={(e) => setInfo({ ...info, bsc_percent: e.target.value })}
                                                id="marks3"
                                                className="form-control"
                                            />
                                        </td>

                                    </tr>
                                    <tr>
                                        <th>Any Other</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="school4"
                                                value={info?.other_school}
                                                readOnly={true}
                                                // onChange={(e) => setInfo({ ...info, other_school: e.target.value })}
                                                id="school4"
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="month"
                                                name="pyear4"
                                                value={info?.other_passyear}
                                                readOnly={true}
                                                // onChange={(e) => setInfo({ ...info, other_passyear: e.target.value })}
                                                id="pyear4"
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="subjects4"
                                                value={info?.other_subject}
                                                readOnly={true}
                                                // onChange={(e) => setInfo({ ...info, other_subject: e.target.value })}
                                                id="subjects4"
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="university4"
                                                value={info?.other_board}
                                                readOnly={true}
                                                // onChange={(e) => setInfo({ ...info, other_board: e.target.value })}
                                                id="university4"
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="marks4"
                                                value={info?.other_percent}
                                                readOnly={true}
                                                // onChange={(e) => setInfo({ ...info, other_percent: e.target.value })}
                                                id="marks4"
                                                className="form-control"
                                            />
                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </form>
            </div>
            <div className="row ">
                <div className="col-lg-4 col-md-6 mt-5">
                    <div className="form-group">
                        <h5 htmlFor="">
                            Upload BSc Photo Marksheet <small className="text-danger">*</small>
                        </h5>
                        <input
                            type="file"
                            name="marks_card3"
                            value={info?.bsc_marks_card}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, bsc_marks_card: e.target.value })}
                            id="marks_card3"
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 mt-5">
                    <div className="form-group">
                        <h5 htmlFor="">
                            Upload Other Marksheet <small className="text-danger">*</small>
                        </h5>
                        <input
                            type="file"
                            name="marks_card4"
                            value={info?.other_marks_card}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, other_marks_card: e.target.value })}
                            id="marks_card4"
                            className="mb-3 form-control"
                        />
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-12">
                    <h5 className="text-center">
                        <u> UNDERTAKING </u>
                    </h5>
                    <div className="form-group ">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input check mr-5"
                                name="agree"
                                value={info?.undertaking}
                                readOnly={true}
                                // onChange={(e) => setInfo({ ...info, undertaking: e.target.value })}
                                type="checkbox"
                                defaultChecked=""
                                required=""
                                id="inlineCheckbox1"
                                defaultValue={1}
                            />
                            <p htmlFor="inlineCheckbox1 ml-5" style={{ textAlign: "justify" }}>
                                I understand M.Sc. is a full-time course and I hereby tender
                                undertaking that I will not study or work elsewhere during college
                                hours. Further I agree that if my attendance in theory or
                                practical class or both is not as per Swaminarayan University
                                rules. Shree Swaminarayan Science College has all right to cancel
                                my admission or withdraw my examination form and I will be fully
                                responsible for the same.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <h5>Place:</h5>
                    <input type="text" 
                    className="form-control" 
                    name="place" 
                    value={info?.place}
                    readOnly={true}
                    // onChange={(e) => setInfo({ ...info, place: e.target.value })} 
                    />
                </div>
                <div className="col-md-4">
                    <h5>Date:</h5>
                    <input
                        type="text"
                        className="form-control"
                        name="sign_date"
                        value={info?.date}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, date: e.target.value })}
                    />
                </div>
            </div>
        </div>
    )
}

export default Msc