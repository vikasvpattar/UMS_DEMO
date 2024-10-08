import React,{useState , useEffect} from 'react'

const NursingBsc = ({form_data}) => {

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
                <h3>B.Sc. Nursing Application Form</h3>
                <form>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group">
                                <label>Student Full Name</label>
                                <input
                                    required type="text"

                                    name="fullname"
                                    className="form-control"
                                    value={info?.fullname}
                                    readOnly={true}
                                    // onChange={(e) => setInfo({ ...info, fullname: e.target.value })}
                                    placeholder="Student Full Name*"
                                />
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Mobile Number</label>

                                <input
                                    required type="number"
                                    value={info?.mob_no}
                                    readOnly={true}
                                    // onChange={(e) => setInfo({ ...info, mob_no: e.target.value })}
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
                                    required type="email"
                                    value={info?.email}
                                    readOnly={true}
                                    // onChange={(e) => setInfo({ ...info, email: e.target.value })}
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
                                    required type="text"
                                    value={info?.dob}
                                    readOnly={true}
                                    // onChange={(e) => setInfo({ ...info, dob: e.target.value })}
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
                                    required type="text"
                                    value={info?.category}
                                    readOnly={true}
                                    // onChange={(e) => setInfo({ ...info, category: e.target.value })}
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
                                        value={"single"}
                                        // onChange={(e) => setInfo({ ...info, marital: e.target.value })}
                                        name="marital"
                                        required type="radio"
                                        id="inlineCheckbox1"
                                        defaultValue="single"
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
                                        // onChange={(e) => setInfo({ ...info, marital: e.target.value })}
                                        name="marital"
                                        required type="radio"
                                        id="inlineCheckbox2"
                                        defaultValue="married"
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
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Select Gender</label>

                                <select 
                                    className="form-control" 
                                    value={info?.gender}
                                    readOnly={true}
                                    // onChange={(e) => setInfo({ ...info, gender: e.target.value })}
                                    name="gender">
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Parent Mobile Number</label>

                                <input
                                    required type="text"
                                    value={info?.parent_mobile}
                                    readOnly={true}
                                    // onChange={(e) => setInfo({ ...info, parent_mobile: e.target.value })}
                                    name="parent_mobile"
                                    className="form-control"
                                    placeholder="Parent Mobile Number *"
                                />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Aadhar Number</label>

                                <input
                                    required type="text"
                                    value={info?.aadhar}
                                    readOnly={true}
                                    // onChange={(e) => setInfo({ ...info, aadhar: e.target.value })}
                                    name="aadhar"
                                    className="form-control"
                                    placeholder="Aadhar Number *."
                                />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Caste</label>

                                <input
                                    required type="text"
                                    value={info?.caste}
                                    readOnly={true}
                                    // onChange={(e) => setInfo({ ...info, caste: e.target.value })}
                                    name="caste"
                                    className="form-control"
                                    placeholder="Caste *"
                                />
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="form-group">
                                <div className="form-floating">
                                    <textarea
                                        className="form-control"
                                        value={info?.address}
                                        readOnly={true}
                                        // onChange={(e) => setInfo({ ...info, address: e.target.value })}
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

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>District</label>

                                <input
                                    required type="text"
                                    value={info?.dist}
                                    readOnly={true}
                                    // onChange={(e) => setInfo({ ...info, dist: e.target.value })}
                                    name="dist"
                                    className="form-control"
                                    placeholder="District"
                                />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Taluk</label>

                                <input
                                    required type="text"
                                    value={info?.taluk}
                                    readOnly={true}
                                    // onChange={(e) => setInfo({ ...info, taluk: e.target.value })}
                                    name="taluk"
                                    className="form-control"
                                    placeholder="Taluk"
                                />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Pin Code</label>

                                <input
                                    required type="text"
                                    value={info?.pin}
                                    readOnly={true}
                                    // onChange={(e) => setInfo({ ...info, pin: e.target.value })}
                                    name="pin"
                                    className="form-control"
                                    placeholder="Pin Code"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group">
                                <label>PAN Card Number</label>

                                <input
                                    required type="text"
                                    value={info?.pan}
                                    readOnly={true}
                                    // onChange={(e) => setInfo({ ...info, pan: e.target.value })}
                                    name="pan"
                                    className="form-control"
                                    placeholder="PAN Card Number *"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group">
                                <select 
                                value={info?.blood_grp}
                                readOnly={true}
                                    // onChange={(e) => setInfo({ ...info, blood_grp: e.target.value })}
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
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group">
                                <label>Name of the Bank</label>
                                <input
                                    required type="text"
                                    value={info?.bank_name}
                                    readOnly={true}
                                    // onChange={(e) => setInfo({ ...info, bank_name: e.target.value })}
                                    name="bank_name"
                                    className="form-control"
                                    placeholder="Name of the Bank *"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group">
                                <label>Bank Account Number</label>

                                <input
                                    required type="text"
                                    value={info?.acc_no}
                                    readOnly={true}
                                    // onChange={(e) => setInfo({ ...info, acc_no: e.target.value })}
                                    name="acc_no"
                                    className="form-control"
                                    placeholder="Bank Account Number *"
                                />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="form-group">
                                <label>Student Mobile Number</label>

                                <input
                                    required type="month"
                                    value={info?.pu_pass_month}
                                    readOnly={true}
                                    // onChange={(e) => setInfo({ ...info, pu_pass_month: e.target.value })}
                                    name="pu_pass_month"
                                    className="form-control"
                                    placeholder="Student Mobile Number *"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group">
                                <label>12th Percentage</label>

                                <input
                                    required type="text"
                                    value={info?.pu_perce}
                                    readOnly={true}
                                    // onChange={(e) => setInfo({ ...info, pu_perce: e.target.value })}
                                    name="pu_perce"
                                    className="form-control"
                                    placeholder="12th Percentage *"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group">
                                <label>Seat Number</label>

                                <input
                                    required type="text"
                                    value={info?.pu_seat_no}
                                    readOnly={true}
                                    // onChange={(e) => setInfo({ ...info, pu_seat_no: e.target.value })}
                                    name="pu_seat_no"
                                    className="form-control"
                                    placeholder="Seat Number *"
                                />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Board of Examination</label>

                                <input
                                    required type="text"
                                    value={info?.pu_board}
                                    readOnly={true}
                                    // onChange={(e) => setInfo({ ...info, pu_board: e.target.value })}
                                    name="pu_board"
                                    className="form-control"
                                    placeholder="Board of Examination *"
                                />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="form-group">
                                <label>10th Pass Year</label>

                                <input
                                    required type="month"
                                    value={info?.sslc_pass_month}
                                    readOnly={true}
                                    // onChange={(e) => setInfo({ ...info, sslc_pass_month: e.target.value })}
                                    name="sslc_pass_month"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group">
                                <label>10th Percentage</label>

                                <input
                                    required type="text"
                                    value={info?.sslc_perce}
                                    readOnly={true}
                                    // onChange={(e) => setInfo({ ...info, sslc_perce: e.target.value })}
                                    name="sslc_perce"
                                    className="form-control"
                                    placeholder="10th Percentage *"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group">
                                <label>Seat Number</label>

                                <input
                                    required type="text"
                                    value={info?.sslc_seat_no}
                                    readOnly={true}
                                    // onChange={(e) => setInfo({ ...info, sslc_seat_no: e.target.value })}
                                    name="sslc_seat_no"
                                    className="form-control"
                                    placeholder="Seat Number *"
                                />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Board of Examination</label>

                                <input
                                    required type="text"
                                    value={info?.sslc_board}
                                    readOnly={true}
                                    // onChange={(e) => setInfo({ ...info, sslc_board: e.target.value })}
                                    name="sslc_board"
                                    className="form-control"
                                    placeholder="Board of Examination *"
                                />
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
                                                value={info?.bio_botained_marks}
                                                readOnly={true}
                                                // onChange={(e) => setInfo({ ...info, bio_botained_marks: e.target.value })}
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
                                        <th>English</th>
                                        <td>
                                            <input
                                                required type="number"
                                                value={info?.eng2_marks}
                                                readOnly={true}
                                                // onChange={(e) => setInfo({ ...info, eng2_marks: e.target.value })}
                                                name="eng2_marks"
                                                id="eng2_marks"
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                required type="number"
                                                value={info?.eng2_obtained}
                                                readOnly={true}
                                                // onChange={(e) => setInfo({ ...info, eng2_obtained: e.target.value })}
                                                name="eng2_obtained"
                                                id="eng2_obtained"
                                                className="form-control"
                                            />
                                        </td>
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
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-md-3">
                            <div className="form-group">
                                <h5>

                                    Upload Student Photo
                                    <span className="text-danger">*</span>
                                </h5>
                                <input 
                                required 
                                type="file" 
                                className="form-control" 
                                value={info?.student_photo}
                                readOnly={true}
                                // onChange={(e) => setInfo({ ...info, student_photo: e.target.files[0] })}
                                name="std_img" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <h5>

                                    Upload 10 <sup>th</sup> Markssheet
                                    <span className="text-danger">*</span>
                                </h5>
                                <input 
                                required 
                                type="file" 
                                className="form-control" 
                                value={info?.tenth_marks_card}
                                readOnly={true}
                                // onChange={(e) => setInfo({ ...info, tenth_marks_card: e.target.files[0] })}
                                name="sslc_markssheet" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <h5>

                                    Upload 12 <sup>th</sup> Markssheet
                                    <span className="text-danger">*</span>
                                </h5>
                                <input 
                                required 
                                type="file" 
                                className="form-control" 
                                value={info?.twelve_marks_card}
                                readOnly={true}
                                // onChange={(e) => setInfo({ ...info, twelve_marks_card: e.target.value })}
                                name="puc_markssheet" />
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
                                value={info?.credit_certi}
                                readOnly={true}
                                // onChange={(e) => setInfo({ ...info, credit_certi: e.target.value })}
                                name="credit" />
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
                                // onChange={(e) => setInfo({ ...info, gucet_sheet: e.target.value })}
                                name="gucet_markssheet" />
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
                                // onChange={(e) => setInfo({ ...info, neet_sheet: e.target.value })}
                                name="neet_markssheet" />
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
                                // onChange={(e) => setInfo({ ...info, lc: e.target.value })}
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
                                // onChange={(e) => setInfo({ ...info, aadhaar_card: e.target.value })}
                                name="aadhar" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <h5>

                                    Upload Freeship Card

                                </h5>
                                <input 
                                required 
                                type="file" 
                                className="form-control" 
                                value={info?.freeship_card}
                                readOnly={true}
                                // onChange={(e) => setInfo({ ...info, freeship_card: e.target.value })}
                                name="freeship_card" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <h5>
                                    Upload Caste Certificate
                                    <span className="text-danger">*</span>
                                </h5>
                                <input 
                                required 
                                type="file" 
                                className="form-control" 
                                value={info?.caste_certi}
                                readOnly={true}
                                // onChange={(e) => setInfo({ ...info, caste_certi: e.target.value })}
                                name="caste" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <h5>

                                    Upload Trail Certificate
                                    <span className="text-danger">*</span>
                                </h5>
                                <input
                                    required type="file"
                                    className="form-control"
                                    value={info?.trail_certi}
                                    readOnly={true}
                                    // onChange={(e) => setInfo({ ...info, trail_certi: e.target.value })}
                                    name="trail_cartificate" />
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
                </form>
            </div>
        </div>
    )
}

export default NursingBsc