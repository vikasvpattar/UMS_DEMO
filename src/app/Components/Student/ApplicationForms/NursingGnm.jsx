import React,{useState , useEffect} from 'react'

const NursingGnm = ({form_data}) => {

    const [info, setInfo] = useState({})

  useEffect(() => {

    if (form_data) {
      setInfo({
        ...form_data
      })
    }
  }, [form_data])

    return (
        <div className='NursingGnm'>
            <form>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="form-group">
                            <label>Select Course</label>

                            <select 
                            name="course" 
                            className="form-control"
                            value={info?.course}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, course: e.target.value })} 
                            id="" 
                            required
                            >
                                <option value="">Select Course</option>
                                <option value="GNM">GNM</option>
                                <option value="ANM">ANM</option>
                            </select>
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
                                    <th>Subjects</th>
                                    <th>Theory Marks</th>
                                    <th>Theory Obtained Marks</th>
                                    <th>Subjects</th>
                                    <th>Theory Marks</th>
                                    <th>Theory Obtained Marks</th>
                                </tr>
                                <tr>
                                    <th>Chemistry</th>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.chem_marks}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, chem_marks: e.target.value })}
                                            name="chem_marks"
                                            id="chem_marks"
                                            className="form-control"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.chem_botained_marks}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, chem_botained_marks: e.target.value })}
                                            name="chem_obtained"
                                            id="chem_obtained"
                                            className="form-control"
                                        />
                                    </td>
                                    <th>Gujarati</th>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.guj_marks}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, guj_marks: e.target.value })}
                                            name="guj_marsk"
                                            id="guj_marks"
                                            className="form-control"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.guj_botained_marks}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, guj_botained_marks: e.target.value })}
                                            name="guj_obtained"
                                            id="guj_obtained"
                                            className="form-control"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Physics</th>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.phy_marks}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, phy_marks: e.target.value })}
                                            name="phy_marks"
                                            id="phy_marks"
                                            className="form-control"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.phy_botained_marks}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, phy_botained_marks: e.target.value })}
                                            name="phy_obtained"
                                            id="phy_obtained"
                                            className="form-control"
                                        />
                                    </td>
                                    <th>English</th>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.eng_marsk}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, eng_marsk: e.target.value })}
                                            name="eng_marsk"
                                            id="guj_marks"
                                            className="form-control"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.eng_obtained}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, eng_obtained: e.target.value })}
                                            name="eng_obtained"
                                            id="guj_obtained"
                                            className="form-control"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Biology</th>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.bio_marks}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, bio_marks: e.target.value })}
                                            name="bio_marks"
                                            id="bio_marks"
                                            className="form-control"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.bio_obtained}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, bio_obtained: e.target.value })}
                                            name="bio_obtained"
                                            id="bio_obtained"
                                            className="form-control"
                                        />
                                    </td>
                                    <th>Sanskrit’s</th>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.sanskrit_marks}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, sanskrit_marks: e.target.value })}
                                            name="san_marsk"
                                            id="san_marks"
                                            className="form-control"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.sanskrit_botained_marks}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, sanskrit_botained_marks: e.target.value })}
                                            name="san_obtained"
                                            id="san_obtained"
                                            className="form-control"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Chemistry pect</th>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.chem_pect_marks}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, chem_pect_marks: e.target.value })}
                                            name="chemp_marks"
                                            id="chemp_marks"
                                            className="form-control"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.chem_pect_botained_marks}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, chem_pect_botained_marks: e.target.value })}
                                            name="chemp_obtained"
                                            id="chem_obtained"
                                            className="form-control"
                                        />
                                    </td>
                                    <th>Philosophy</th>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.phil_marks}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, phil_marks: e.target.value })}
                                            name="phil_marsk"
                                            id="phil_marks"
                                            className="form-control"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.phil_botained_marks}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, phil_botained_marks: e.target.value })}
                                            name="phil_obtained"
                                            id="phil_obtained"
                                            className="form-control"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Physics pect</th>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.phy_pect_marks}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, phy_pect_marks: e.target.value })}
                                            name="phyp_marks"
                                            id="phyp_marks"
                                            className="form-control"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.phy_pect_botained_marks}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, phy_pect_botained_marks: e.target.value })}
                                            name="phyp_obtained"
                                            id="phyp_obtained"
                                            className="form-control"
                                        />
                                    </td>
                                    <th>Sociology</th>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.sociology_marks}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, sociology_marks: e.target.value })}
                                            name="soci_marsk"
                                            id="soci_marks"
                                            className="form-control"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.sociology_botained_marks}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, sociology_botained_marks: e.target.value })}
                                            name="soci_obtained"
                                            id="soci_obtained"
                                            className="form-control"
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <th>Biology pect</th>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.bio_pect_marks}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, bio_pect_marks: e.target.value })}
                                            name="biop_marks"
                                            id="biop_marks"
                                            className="form-control"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.bio_pect_botained_marks}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, bio_pect_botained_marks: e.target.value })}
                                            name="biop_obtained"
                                            id="biop_obtained"
                                            className="form-control"
                                        />
                                    </td>
                                    <th>Psychology</th>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.psycho_marks}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, psycho_marks: e.target.value })}
                                            name="psy_marsk"
                                            id="psy_marks"
                                            className="form-control"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.psycho_botained_marks}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, psycho_botained_marks: e.target.value })}
                                            name="psy_obtained"
                                            id="psy_obtained"
                                            className="form-control"
                                        />
                                    </td>
                                </tr>
                                <tr>

                                    <th>Geography</th>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.geo_marks}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, geo_marks: e.target.value })}
                                            name="geo_marsk"
                                            id="geo_marks"
                                            className="form-control"
                                        />
                                    </td>


                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.geo_botained_marks}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, geo_botained_marks: e.target.value })}
                                            name="geo_obtained"
                                            id="geo_obtained"
                                            className="form-control"
                                        />
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>

                                <tr>
                                    <th>Total</th>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.total_marks}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, total_marks: e.target.value })}
                                            name="total_marks"
                                            id="total_marks"
                                            className="form-control"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            required type="number"
                                            value={info?.total_botained_marks}
                                            readOnly={true}
                                            // onChange={(e) => setInfo({ ...info, total_botained_marks: e.target.value })}
                                            name="total_obtained"
                                            id="total_obtained"
                                            className="form-control"
                                        />
                                    </td>
                                    <td></td>
                                    <td></td><td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="row mt-5">

                    <div className="col-md-3">
                        <div className="form-group">
                            <h5>

                                Upload Credit Certificate
                                <span className="text-danger">*</span>
                            </h5>
                            <input 
                            required 
                            type="file" 
                            className="form-control" 
                            value={info?.credit_certi}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, credit_certi: e.target.files[0] })}
                            name="credit" 
                            />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <h5>

                                Upload GuCET Markssheet
                                <span className="text-danger">*</span>
                            </h5>
                            <input 
                            required 
                            type="file" 
                            className="form-control" 
                            value={info?.gucet_sheet}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, gucet_sheet: e.target.files[0] })}
                            name="gucet_markssheet" 
                            />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <h5>

                                Upload NEET Markssheet
                                <span className="text-danger">*</span>
                            </h5>
                            <input 
                            required 
                            type="file" 
                            className="form-control" 
                            value={info?.neet_sheet}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, neet_sheet: e.target.files[0] })}
                            name="neet_markssheet" 
                            />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <h5>
                                Upload Leaving Certificate

                                <span className="text-danger">*</span>
                            </h5>
                            <input 
                            required 
                            type="file" 
                            className="form-control" 
                            value={info?.lc}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, lc: e.target.files[0] })}
                            name="lc" />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <h5>

                                Upload Aadhar Card
                                <span className="text-danger">*</span>
                            </h5>
                            <input 
                            required 
                            type="file" 
                            className="form-control" 
                            value={info?.aadhaar_card}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, aadhaar_card: e.target.files[0] })}
                            name="aadhar" />
                        </div>
                    </div>


                    <div className="col-md-3">
                        <div className="form-group">
                            <h5>

                                Upload Credit Certificate
                                <span className="text-danger">*</span>
                            </h5>
                            <input 
                            required 
                            type="file" 
                            className="form-control" 
                            value={info?.credit}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, credit: e.target.files[0] })}
                            name="credit" />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <h5>

                                Upload Bank Details
                                <span className="text-danger">*</span>
                            </h5>
                            <input 
                            required 
                            type="file" 
                            className="form-control" 
                            value={info?.bank}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, bank: e.target.files[0] })}
                            name="bank" />
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group">
                            <h5>

                                Upload Other Non Criminal Certi
                                <span className="text-danger">*</span>
                            </h5>
                            <input 
                            required 
                            type="file" 
                            className="form-control" 
                            value={info?.other}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, other: e.target.files[0] })}
                            name="other" />
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <p className="mt-2">
                        <b> DECLARATION BY THE APPLICANT</b> <br />
                        <input
                            className="form-check-input check mr-5"
                            name="agree"
                            value={info?.declaration}
                            readOnly={true}
                            // onChange={(e) =>setInfo({ ...info, declaration: e.target.value })}
                            required type="checkbox"
                            defaultChecked=""
                            id="inlineCheckbox1"
                            defaultValue={1}
                            checked
                        />{" "}
                        Hereby declare that I have read and understood the eligibility
                        criteria for the Diploma Astrology programme for which I seek
                        admission. I fulfill the minimum eligibility criteria and I
                        have provided necessary information in this regard in the
                        application form. I shall provide proof of my eligibility. I
                        accept the rules of the university and shall not raise any
                        dispute in future about the rules. In the event of any
                        information being found incorrect or misleading my candidature
                        is liable to be cancelled by the University any time and shall
                        NOT entitle me for refund of any fee paid by me to the
                        university. I accept the allotment of study centre by the
                        university.
                    </p>

                    <div className="col-md-12">
                        <p>
                            <b> Instruction to Candidates</b> <br />
                        </p>
                        <ol>
                            <li>
                                Those fulfilling eligibility criteria fixed by the
                                University only will be considered for admission.{" "}
                            </li>
                            <li>
                                If admission is confirmed, enrolment number will be given
                                and attested identity card will be mailed by the Diploma
                                Astrology Programme Office, Directorate Admissions
                            </li>
                            <li>
                                For admitted learners, study materials will be mailed/
                                given by hand.
                            </li>
                            <li>
                                Schedule for contact programme/ practical will be
                                intimated.
                            </li>
                            <li>
                                Allotment of Study Centres: It will done by the University
                                and decision of the university is final.
                            </li>
                            <li>
                                Submission of Assignment is compulsory Since it Carriers
                                20% weightage
                            </li>
                            <li>
                                Refund of fee is NOT permitted. if denied admission,
                                programme fee will be refunded
                            </li>
                            <li>
                                For theory courses, first year examination will be held in
                                April-2023 only.
                            </li>
                            {/*<li>Examination form format is enclosed.</li>*/}
                        </ol>
                        <p />
                    </div>
                    <div className="col-md-4">
                        <h5>Place:</h5>
                        <input
                            required type="text"
                            className="form-control"

                            name="place"
                            value={info?.place}
                            readOnly={true}
                            // onChange={(e) =>setInfo({ ...info, place: e.target.value })}
                        />
                    </div>
                    <div className="col-md-4">
                        <h5>Date:</h5>
                        <input
                            required type="date"
                            // onChange={(e) => {setDefaultDate(e.target.value);}}
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
            </form>
        </div>
    )
}

export default NursingGnm