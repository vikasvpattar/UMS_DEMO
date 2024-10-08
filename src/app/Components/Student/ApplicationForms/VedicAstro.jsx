import React,{useState , useEffect} from 'react'

const VedicAstro = ({form_data}) => {

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
                <h5 className='col-12'>DD Details</h5>
                <div className="col-lg-3">
                    <div className="form-group">
                        <label>Enter DD Number</label>

                        <input
                            type="text"
                            name="ddno"
                            value={info?.dd_number}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, dd_number: e.target.value })}
                            className="form-control"
                            placeholder="Enter DD Number*"
                        />
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="form-group">
                        <label>Enter DD Date</label>

                        <input
                            type="text"
                            name="dd_date"
                            value={info?.dd_date}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, dd_date: e.target.value })}
                            className="form-control"
                            placeholder="Enter DD Date*"
                        />
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="form-group">
                        <label>Enter Amount: Rs.</label>

                        <input
                            type="text"
                            name="amount"
                            value={info?.dd_amount}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, dd_amount: e.target.value })}
                            className="form-control"
                            placeholder="Enter Amount: Rs.*"
                        />
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="form-group">
                        <label>Bank Name and Places</label>

                        <input
                            type="text"
                            name="name"
                            value={info?.bank_name}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, bank_name: e.target.value })}
                            className="form-control"
                            placeholder="Bank Name and Places*"
                        />
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="form-group">
                        <label>Name of Student</label>

                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Name of Student*"
                        />
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="form-group">
                        <label>Father / Husband / Guardians Name</label>

                        <input
                            type="text"
                            name="guardian"
                            className="form-control"
                            placeholder="Father / Husband / Guardians Name*"
                        />
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="form-group">
                        <label>Pin Code</label>

                        <input
                            type="text"
                            name="pin"
                            className="form-control"
                            placeholder="Pin Code"
                        />
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="form-group">
                        <label>Mobile Number</label>

                        <input
                            type="text"
                            name="mob_no"
                            className="form-control"
                            placeholder="Mobile Number"
                        />
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="form-group">
                        <label>Email ID</label>

                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Email ID*"
                        />
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="form-group">
                        <label>Date of Birth</label>

                        <input
                            type="text"
                            name="dob"
                            className="form-control"
                            placeholder="Date of Birth*"
                        />
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="form-group">
                        <label>Category</label>
                        <input
                            type="text"
                            name="category"
                            className="form-control"
                            placeholder="Category*"
                        />
                    </div>
                </div>
                <div
                    className="col-lg-4 col-md-6 program-level"
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
                                name="marital"
                                type="radio"
                                id="inlineCheckbox1"
                                defaultValue="single"
                            />
                            <label className="form-check-label" htmlFor="inlineCheckbox1">
                                Single
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                name="marital"
                                type="radio"
                                id="inlineCheckbox2"
                                defaultValue="married"
                            />
                            <label className="form-check-label" htmlFor="inlineCheckbox2">
                                Married
                            </label>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="form-group">
                        <label>Select Gender</label>

                        <select className="form-control" name="gender">
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="form-group">
                        <div className="form-floating">
                            <textarea
                                className="form-control"
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
            </div>
            <div className="row mt-5">
                <h5 className="mb-3">
                    Educational Qualification: (Graduation and onwards)
                </h5>
                <div className="col-md-12 table-responsive">
                    <table className="table table-bordered border-danger rounded">
                        <tbody>
                            <tr>
                                <th>Degree</th>
                                <th>Register Number</th>
                                <th>Passing Year</th>
                                <th>Subjects/Major</th>
                                <th>University</th>
                                <th>Total Percentage</th>
                            </tr>
                            <tr>
                                <th>
                                    10 <sup>th</sup> STD/SSLC
                                </th>
                                <td>
                                    <input
                                        type="text"
                                        name="seat_no"
                                        value={info?.tenth_number}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, tenth_number: e.target.value })}
                                        id="seat_no"
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="month"
                                        name="pyear"
                                        value={info?.tenth_passyear}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, tenth_passyear: e.target.value })}
                                        id="pyear"
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="subjects"
                                        value={info?.tenth_subject}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, tenth_subject: e.target.value })}
                                        id="subjects"
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="university"
                                        value={info?.tenth_university}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, tenth_university: e.target.value })}
                                        id="university"
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="marks"
                                        value={info?.tenth_percent}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, tenth_percent: e.target.value })}
                                        id="marks"
                                        className="form-control"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>+2 / HSC</th>
                                <td>
                                    <input
                                        type="text"
                                        name="seat_no2"
                                        value={info?.twelve_number}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, twelve_number: e.target.value })}
                                        id="seat_no2"
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="month"
                                        name="pyear2"
                                        value={info?.twelve_passyear}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, twelve_passyear: e.target.value })}
                                        id="pyear2"
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="subjects2"
                                        value={info?.twelve_subject}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, twelve_subject: e.target.value })}
                                        id="subjects2"
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="university2"
                                        value={info?.twelve_university}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, twelve_university: e.target.value })}
                                        id="university2"
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="marks2"
                                        value={info?.twelve_percent}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, twelve_percent: e.target.value })}
                                        id="marks2"
                                        className="form-control"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>UG</th>
                                <td>
                                    <input
                                        type="text"
                                        name="seat_no3"
                                        value={info?.ug_number}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, ug_number: e.target.value })}
                                        id="seat_no3"
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="month"
                                        name="pyear3"
                                        value={info?.ug_passyear}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, ug_passyear: e.target.value })}
                                        id="pyear3"
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="subjects3"
                                        value={info?.ug_subject}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, ug_subject: e.target.value })}
                                        id="subjects3"
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="university3"
                                        value={info?.ug_university}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, ug_university: e.target.value })}
                                        id="university3"
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="marks3"
                                        value={info?.ug_percent}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, ug_percent: e.target.value })}
                                        id="marks3"
                                        className="form-control"
                                    />
                                </td>
                            </tr>
                            <tr>

                                <th>PG</th>
                                <td>
                                    <input
                                        type="text"
                                        name="seat_no3"
                                        value={info?.pg_number}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, pg_number: e.target.value })}
                                        id="seat_no3"
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="month"
                                        name="pyear3"
                                        value={info?.pg_passyear}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, pg_passyear: e.target.value })}
                                        id="pyear3"
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="subjects3"
                                        value={info?.pg_subject}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, pg_subject: e.target.value })}
                                        id="subjects3"
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="university3"
                                        value={info?.pg_university}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, pg_university: e.target.value })}
                                        id="university3"
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="marks3"
                                        value={info?.pg_percent}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, pg_percent: e.target.value })}
                                        id="marks3"
                                        className="form-control"
                                    />
                                </td>

                            </tr>


                            <tr>




                                <th>PhD</th>
                                <td>
                                    <input
                                        type="text"
                                        name="seat_no4"
                                        value={info?.phd_number}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, phd_number: e.target.value })}
                                        id="seat_no4"
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="month"
                                        name="pyear4"
                                        value={info?.phd_passyear}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, phd_passyear: e.target.value })}
                                        id="pyear2"
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="subjects4"
                                        value={info?.phd_subject}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, phd_subject: e.target.value })}
                                        id="subjects4"
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="university4"
                                        value={info?.phd_university}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, phd_university: e.target.value })}
                                        id="university4"
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="marks4"
                                        value={info?.phd_percent}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, phd_percent: e.target.value })}
                                        id="marks4"
                                        className="form-control"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                        <label>Select Territory</label>

                        <select className="form-control" name="territory"
                            value={info?.territoy}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, territory: e.target.value })}
                            >
                            <option value="">Select Territory</option>
                            <option value="Rural">Rural</option>
                            <option value="Urban">Urban</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Work Experience</label>

                        <input
                            type="text"
                            name="experience"
                            value={info?.work_exp}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, work_exp: e.target.value })}
                            placeholder="Work Experience "
                            className="form-control"
                        />
                    </div>
                </div>
                <h5 className="mt-4">
                    Astrology Experience (Please give Details Chronological including
                    present employment)
                </h5>
                <div className="col-md-12">
                    <div className="form-group">
                        <textarea
                            name="one"
                            value={info?.one_astro_exp}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, one_astro_exp: e.target.value })}
                            className="form-control"
                            id=""
                            cols={1}
                            rows={3}
                            placeholder="I."
                            defaultValue={""}
                        />
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <textarea
                            name="two"
                            value={info?.two_astro_exp}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, two_astro_exp: e.target.value })}
                            className="form-control"
                            id=""
                            cols={1}
                            rows={3}
                            placeholder="II."
                            defaultValue={""}
                        />
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <textarea
                            name="three"
                            value={info?.three_astro_exp}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, three_astro_exp: e.target.value })}
                            className="form-control"
                            id=""
                            cols={1}
                            rows={3}
                            placeholder="III."
                            defaultValue={""}
                        />
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 mt-5">
                    <div className="form-group">
                        <h5 htmlFor="">
                            Upload Student Photo <small className="text-danger">*</small>
                        </h5>
                        <input
                            type="file"
                            name="image"
                            value={info?.student_photo}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, student_photo: e.target.value })}
                            className="form-control"
                            placeholder="Subject 2"
                        />
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <p className="mt-2">
                    <b> DECLARATION BY THE APPLICANT</b> <br />
                    <input
                        className="form-check-input check mr-5"
                        name="agree"
                        value={info?.declaration_one}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, declaration_one: e.target.value })}
                        type="checkbox"
                        defaultChecked=""
                        required=""
                        id="inlineCheckbox1"
                        defaultValue={1}
                    />{" "}
                    Hereby declare that I have read and understood the eligibility
                    criteria for the Diploma Astrology programme for which I seek
                    admission. I fulfill the minimum eligibility criteria and I have
                    provided necessary information in this regard in the application
                    form. I shall provide proof of my eligibility. I accept the rules of
                    the university and shall not raise any dispute in future about the
                    rules. In the event of any information being found incorrect or
                    misleading my candidature is liable to be cancelled by the
                    University any time and shall NOT entitle me for refund of any fee
                    paid by me to the university. I accept the allotment of study centre
                    by the university.
                </p>
                <div className="col-md-12">
                    <p className="mt-3">
                        <b> Checklist of Enclosures</b>
                        {/*<ul style="list-style-type:none">*/}
                    </p>
                    <p className="mt-2">
                        <input
                            className="form-check-input check mr-5"
                            name="passport_photo"
                            value={info?.ddeclartion_photo}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, ddeclartion_photo: e.target.value })}
                            type="checkbox"
                            required=""
                            id="inlineCheckbox1"
                            defaultValue={1}
                        />{" "}
                        Self attested Passport Photograph affixed in the relevant place of
                        the Application.
                    </p>
                    <p className="mt-2">
                        <input
                            className="form-check-input check mr-5"
                            name="program_fee"
                            value={info?.ddeclartion_dd}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, ddeclartion_dd: e.target.value })}
                            type="checkbox"
                            required=""
                            id="inlineCheckbox1"
                            defaultValue={1}
                        />{" "}
                        Demand Draft for the Programme Fee of Rs.10000 for first year (Pl.
                        write Name, Address at the back of DD) in favour of SWAMINARAYAN
                        University Payable at
                    </p>
                    <p className="mt-2">
                        <input
                            className="form-check-input check mr-5"
                            name="edu_qulification"
                            value={info?.ddeclartion_qualification}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, ddeclartion_qualification: e.target.value })}
                            type="checkbox"
                            required=""
                            id="inlineCheckbox1"
                            defaultValue={1}
                        />{" "}
                        Attested copies of Certificate in support of Educational
                        Qualification (s)
                    </p>
                    <p className="mt-2">
                        <input
                            className="form-check-input check mr-5"
                            name="proof_dob"
                            value={info?.ddeclartion_dob}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, ddeclartion_dob: e.target.value })}
                            type="checkbox"
                            required=""
                            id="inlineCheckbox1"
                            defaultValue={1}
                        />{" "}
                        Proof of Date of Birth (Copy).
                    </p>
                    <p className="mt-2">
                        <input
                            className="form-check-input check mr-5"
                            name="stam_photo"
                            value={info?.ddeclartion_sphoto}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, ddeclartion_sphoto: e.target.value })}
                            type="checkbox"
                            required=""
                            id="inlineCheckbox1"
                            defaultValue={1}
                        />{" "}
                        Stamp size Photograph-2.
                    </p>
                    <p className="mt-2">
                        <input
                            className="form-check-input check mr-5"
                            name="address_slip"
                            value={info?.ddeclartion_address}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, ddeclartion_address: e.target.value })}
                            type="checkbox"
                            required=""
                            id="inlineCheckbox1"
                            defaultValue={1}
                        />{" "}
                        Address Slips containing address for communications.
                    </p>
                    {/*</ul>*/}
                    <p />
                    <div className="col-md-12">
                        <p>
                            <b> Instruction to Candidates</b> <br />
                        </p>
                        <ol>
                            <li>
                                Those fulfilling eligibility criteria fixed by the University
                                only will be considered for admission.{" "}
                            </li>
                            <li>
                                If admission is confirmed, enrolment number will be given and
                                attested identity card will be mailed by the Diploma Astrology
                                Programme Office, Directorate Admissions
                            </li>
                            <li>
                                For admitted learners, study materials will be mailed/ given
                                by hand.
                            </li>
                            <li>
                                Schedule for contact programme/ practical will be intimated.
                            </li>
                            <li>
                                Allotment of Study Centres: It will done by the University and
                                decision of the university is final.
                            </li>
                            <li>
                                Submission of Assignment is compulsory Since it Carriers 20%
                                weightage
                            </li>
                            <li>
                                Refund of fee is NOT permitted. if denied admission, programme
                                fee will be refunded
                            </li>
                            <li>
                                For theory courses, first year examination will be held in
                                April-2023 only.
                            </li>
                            {/*<li>Examination form format is enclosed.</li>*/}
                        </ol>
                        <p />
                    </div>
                </div>
                <div className="col-md-4">
                    <h5>Place:</h5>
                    <input type="text" className="form-control" name="place"
                        value={info?.place}
                        readOnly={true}
                        // onChange={(e) => setInfo({ ...info, place: e.target.value })} 
                        />
                </div>
                <div className="col-md-4">
                    <h5>Date:</h5>
                    <input
                        type="date"
                        // onChange={(e) => { setDefaultDate(e.target.value) }}
                        // value={defaultDate}
                        className="form-control"
                        name="sign_date"
                        defaultValue=""
                        readOnly=""
                    />
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

export default VedicAstro