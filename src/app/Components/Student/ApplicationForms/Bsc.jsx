import React,{useState , useEffect} from 'react'

const Bsc = ({form_data}) => {

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
                <h5 className='col-12 mb-2'>Select Semester Of B.Sc. for Admission</h5>
                <div className="col-lg-6">
                    <div className="form-group">
                        <select
                            name="admission_to"
                            value={info?.semester}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, semester: e.target.value })}
                            required="required"
                            id="admission_to"
                            className="form-control"
                        >
                            <option value="">Select Semester</option>
                            <option value="I">I</option>
                            <option value="II">II</option>
                            <option value="III">III</option>
                            <option value="IV">IV</option>
                            <option value="V">V</option>
                            <option value="VI">VI</option>
                        </select>{" "}
                    </div>
                </div>


                <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                        <select className="form-control" name="handicapped">
                            <option value="">Physically Handicapped</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="form-group">
                        <div className="form-floating">
                            <label htmlFor="floatingTextarea2">
                                {" "}
                                Name of the Sports/Other activity Interested for:
                            </label>
                            <textarea
                                className="form-control"
                                name="sports"
                                placeholder="Name of the Sports/Other activity Interested for:*"
                                id="floatingTextarea2"
                                rows={2}
                                cols={1}
                                defaultValue={""}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group">
                        <div className="form-floating">
                            <label htmlFor="floatingTextarea2"> Achievement if any:</label>
                            <textarea
                                className="form-control"
                                name="achievement"
                                placeholder="Achievement if any:*"
                                id="floatingTextarea2"
                                rows={2}
                                cols={1}
                                defaultValue={""}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group">
                        <div className="form-floating">
                            <label htmlFor="floatingTextarea2">
                                {" "}
                                Award if any[District /State /National]:
                            </label>
                            <textarea
                                className="form-control"
                                name="achievement"
                                placeholder="Award if any[District /State /National]:*"
                                id="floatingTextarea2"
                                rows={2}
                                cols={1}
                                defaultValue={""}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <h5 className="mb-3">
                    12<sup>th</sup> Science Details:{" "}
                </h5>
                <div className="col-md-12 table-responsive">
                    <table className="table table-bordered border-danger rounded text-center align-middle">
                        <tbody>


                            <tr>
                                <th>No of Attempts:</th>
                                <th>
                                    <input
                                        type="number"
                                        min={1}
                                        max={9}
                                        placeholder="No of Attempts:*"
                                        required="required"
                                        name="pu_attempts"
                                        value={info?.no_attempts}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, no_attempts: e.target.value })}
                                        className="form-control"
                                    />
                                </th>
                            </tr>

                            <tr>
                                <th>Subjects</th>
                                <th>Marks Obtained</th>
                            </tr>
                            <tr>
                                <th>Physics</th>
                                <td>
                                    {" "}
                                    <input
                                        type="text"
                                        placeholder="Enter Physics Marks*"
                                        required="required"
                                        id="phy"
                                        name="phy"
                                        value={info?.subject_phy}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, subject_phy: e.target.value })}
                                        className="form-control"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Chemistry</th>
                                <td>
                                    {" "}
                                    <input
                                        type="text"
                                        placeholder="Enter Chemistry Marks*"
                                        required="required"
                                        id="chem"
                                        name="chem"
                                        value={info?.subject_chem}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, subject_chem: e.target.value })}
                                        className="form-control"
                                    />
                                </td>
                            </tr>{" "}
                            <tr>
                                <th>Maths</th>
                                <td>
                                    {" "}
                                    <input
                                        type="text"
                                        placeholder="Enter Maths Marks*"
                                        required="required"
                                        id="maths"
                                        name="maths"
                                        value={info?.subject_mat}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, subject_mat: e.target.value })}
                                        className="form-control"
                                    />
                                </td>
                            </tr>{" "}
                            <tr>
                                <th>Biology</th>
                                <td>
                                    {" "}
                                    <input
                                        type="text"
                                        placeholder="Enter Biology Marks*"
                                        required="required"
                                        id="bio"
                                        name="bio"
                                        value={info?.subject_bio}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, subject_bio: e.target.value })}
                                        className="form-control"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Total Marks</th>
                                <th id="total" />

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row ">

                <div className="col-lg-4 col-md-6 mt-5">
                    <div className="form-group">
                        <h5 htmlFor="">
                            Upload Aadhaar Card<small className="text-danger">*</small>
                        </h5>
                        <input
                            type="file"
                            name="aadhar"
                            value={info?.aadhaar_card}
                            readOnly={true}
                            // onChange={(e) => setInfo({ ...info, aadhaar_card: e.target.value })}
                            className="form-control form-control-lg"
                        />
                    </div>
                </div>

            </div>
            <div className="row mt-3">
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
                                defaultValue={1} checked
                            />
                            <p
                                htmlFor="inlineCheckbox1 ml-5"
                                style={{ textAlign: "justify" }}
                            >
                                I understand B.Sc. is a full time course and i hereby tender
                                undertaking that I will not study or work elsewhere during
                                college hours. Further I agree that if my attendance in theory
                                or practical class or both is not as per Swaminarayan
                                University rules. Shree Swaminarayan Science College has all
                                right to cancel any admission or withdraw my examination form
                                and I will be fully responsible for the same.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-12">
                    <h5>Instruction to Candidates</h5>
                    <p></p>
                    <ol>
                        <li>
                            Admission form should be filled up by the student in neat and
                            legible handwriting{" "}
                        </li>
                        <li>Fees once paid is nonrefundable</li>
                        <li>
                            Candidate have to choose their subject and group carefully as no
                            change in choice of subject is permissible afterward
                        </li>
                        <li>
                            Candidate having studied in board other than Gujarat board/CBSE
                            are instructed to submit original provisional eligibility
                            certificate (PEC) which is issued by Swaminarayan university,
                            along with their application form
                        </li>
                        <li>
                            Original marksheet of last examination passed will have to be
                            deposited with the admission committee. This will be returned to
                            the student after their enrollment in the university
                        </li>
                        <li>
                            Candidate are advised to get enough photocopies of 12th standard
                            Original marksheet for their further use as he original will not
                            be given back until the enrollment or cancellation of their
                            admission whichever is earlier.
                        </li>
                        <li>Candidate have to attach along with this form</li>
                        <ul style={{ listStyleType: "square" }} stat="A">
                            <li>
                                Duly attested photocopies of marksheet of HSC and SSC /
                                Previous examination (Semester) marksheet.
                            </li>
                            <li>
                                Copy of examination trial certificate and school leaving
                                certificate.
                            </li>
                            <li>Identity Proof</li>
                            <li>Permanent residence proof</li>
                            <li>Copy of Disablement Certificate (If applicable).</li>
                            <li>Caste Certificate Original/ True Copy (Latest)</li>
                            <li>EBC certificate</li>
                            <li>Sports/Cultural certificate</li>
                        </ul>
                        <li>
                            Change in any information provided earlier will be informed
                            immediately to the institute with necessary documents.
                        </li>
                        <li>
                            As per Honorable Supreme Court order, ragging is strictly
                            prohibited legal action will be taken against students indulging
                            in ragging
                        </li>
                        <li>
                            The student should park their vehicles at proper place (at their
                            own risk) No valuable should be kept in vehicles.
                        </li>
                        <li>
                            It is compulsory to keep college Identity Card, without which
                            the student may not be allowed to enter the premises and the
                            college building
                        </li>
                    </ol>
                    <p />
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
                        type="text"
                        className="form-control"
                        name="sign_date"
                        // value={defaultDate}
                        // onChange={(e) => {setDefaultDate(e.target.value);}}
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

export default Bsc