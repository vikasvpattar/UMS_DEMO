import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function PBBscNursing({form_data}) {
  const [info, setInfo] = useState({});

  console.log(form_data);

  useEffect(() => {
    if (form_data) {
      setInfo({
        ...form_data,
      });
    }
  }, [form_data]);

  return (
    <div>
      <div className="register-area mt-2 pb-70">
        <div className="">
          <div className="register" style={{ maxWidth: "100%" }}>
            <form action="">
              <div className="row">
                <div className="col-md-12">
                  <h4> Information of XII (HSC Examination)</h4>
                </div>

                <div className="col-md-4 mt-3">
                  <div className="form-group">
                    <label htmlFor="">Stream</label>
                    <select
                      className="form-control"
                      name="stream"
                      value={info?.stream}
                      readOnly={true}
                    >
                      <option value="">Select Stream</option>
                      <option value="Science">Science</option>
                      <option value="Commerce">Commerce</option>
                      <option value="Arts">Arts</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-4 mt-3">
                  <div className="form-group">
                    <label>Month and Year Of Passing</label>
                    <input
                      type="month"
                      className="form-control"
                      name="month_year"
                      value={info?.month_year}
                      readOnly={true}
                    />
                  </div>
                </div>

                <div className="col-md-4 mt-3">
                  <div className="form-group">
                    <label>Percentage</label>
                    <input
                      type="number"
                      className="form-control"
                      name="XII_percentage"
                      value={info?.XII_percentage}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <h4>Other Academic Details</h4>
                </div>
                <div className="col-md-4 mt-3">
                  <div className="form-group">
                    <label>Month and Year Of Passing (GNM)</label>
                    <input
                      type="month"
                      className="form-control"
                      name="gnm_month_year"
                      value={info?.gnm_month_year}
                      readOnly={true}
                    />
                  </div>
                </div>

                <div className="col-md-4 mt-3">
                  <div className="form-group">
                    <label>Name of State Council Nursing</label>
                    <input
                      type="text"
                      className="form-control"
                      name="state_council_nursing"
                      value={info?.state_council_nursing}
                      readOnly={true}
                    />
                  </div>
                </div>

                <div className="col-md-4 mt-3">
                  <div className="form-group">
                    <label>Registration Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="user_id"
                      value={info?.user_id}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-12 mt-3">
                <div className="form-group">
                  <label>Marks Obtained in GNM Examination</label>
                  <table className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th rowSpan={2}></th>
                        <th colSpan={2}>1st Year</th>
                        <th colSpan={2}>2nd Year</th>
                        <th colSpan={2}>3rd Year</th>
                        <th rowSpan={2}>External Aggregate Percentage</th>
                      </tr>
                      <tr>
                        <th>Internal</th>
                        <th>External</th>
                        <th>Internal</th>
                        <th>External</th>
                        <th>Internal</th>
                        <th>External</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Max Marks</th>
                        <th>
                          <input
                            type="number"
                            className="form-control"
                            name="max_internal_1"
                            value={info?.max_internal_1}
                            readOnly={true}
                          />
                        </th>
                        <th>
                          <input
                            type="number"
                            className="form-control"
                            name="max_external_1"
                            value={info?.max_external_1}
                            readOnly={true}
                          />
                        </th>

                        <th>
                          <input
                            type="number"
                            className="form-control"
                            name="max_internal_2"
                            value={info?.max_internal_2}
                            readOnly={true}
                          />
                        </th>
                        <th>
                          <input
                            type="number"
                            className="form-control"
                            name="max_external_2"
                            value={info?.max_external_2}
                            readOnly={true}
                          />
                        </th>

                        <th>
                          <input
                            type="number"
                            className="form-control"
                            name="max_internal_3"
                            value={info?.max_internal_3}
                            readOnly={true}
                          />
                        </th>
                        <th>
                          <input
                            type="number"
                            className="form-control"
                            name="max_external_3"
                            value={info?.max_external_3}
                            readOnly={true}
                          />
                        </th>
                      </tr>
                      <tr>
                        <th>Marks Obtained</th>
                        <th>
                          <input
                            type="number"
                            className="form-control"
                            name="obtained_internal_1"
                            value={info?.obtained_internal_1}
                            readOnly={true}
                          />
                        </th>
                        <th>
                          <input
                            type="number"
                            className="form-control"
                            name="obtained_external_1"
                            value={info?.obtained_external_1}
                            readOnly={true}
                          />
                        </th>

                        <th>
                          <input
                            type="number"
                            className="form-control"
                            name="obtained_internal_2"
                            value={info?.obtained_internal_2}
                            readOnly={true}
                          />
                        </th>
                        <th>
                          <input
                            type="number"
                            className="form-control"
                            name="obtained_external_2"
                            value={info?.obtained_external_2}
                            readOnly={true}
                          />
                        </th>

                        <th>
                          <input
                            type="number"
                            className="form-control"
                            name="obtained_internal_3"
                            value={info?.obtained_internal_3}
                            readOnly={true}
                          />
                        </th>
                        <th>
                          <input
                            type="number"
                            className="form-control"
                            name="obtained_external_3"
                            value={info?.obtained_external_3}
                            readOnly={true}
                          />
                        </th>
                      </tr>
                      <tr>
                        <th>Percentage</th>
                        <td colSpan={2}>{info?.percent_1}</td>
                        <td colSpan={2}>{info?.percent_2}</td>
                        <td colSpan={2}>{info?.percent_3}</td>
                        <th colSpan={2}>{info?.aggregate_percentage}</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mt-3">
                  <div className="form-group">
                    <label>Examination Board University</label>
                    <input
                      type="text"
                      className="form-control"
                      name="exam_board"
                      value={info?.exam_board}
                      readOnly={true}
                    />
                  </div>
                </div>

                <div className="col-md-4 mt-3">
                  <div className="form-group">
                    <label>Total Nursing Experience (In Years)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="nursing_experience"
                      value={info?.nursing_experience}
                      readOnly={true}
                    />
                  </div>
                </div>

                <hr className="mt-4" />

                <div className="col-md-10">
                <h5>Document Details</h5>
                  <table className="table table-bordered text-center mt-3">
                    <thead>
                      <tr>
                        <th>Sl. No</th>
                        <th>Document</th>
                        <th>Attachment</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1.</td>
                        <td>HSC Marksheet</td>
                        <td>
                          {info?.HSC_marks_card ? (
                            <a href={info?.HSC_marks_card} target="_blank">
                              <i className="ri ri-attachment-line"></i>
                            </a>
                          ) : (
                            <span className="badge badge-soft-info">
                              Not Uploaded
                            </span>
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td>2.</td>
                        <td>Registration Ceritificate</td>
                        <td>
                          {info?.registeration_certificate ? (
                            <a
                              href={info?.registeration_certificate}
                              target="_blank"
                            >
                              <i className="ri ri-attachment-line"></i>
                            </a>
                          ) : (
                            <span className="badge badge-soft-info">
                              Not Uploaded
                            </span>
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td>3.</td>
                        <td>Experience Ceritificate</td>
                        <td>
                          {info?.experience_certificate ? (
                            <a
                              href={info?.experience_certificate}
                              target="_blank"
                            >
                              <i className="ri ri-attachment-line"></i>
                            </a>
                          ) : (
                            <span className="badge badge-soft-info">
                              Not Uploaded
                            </span>
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td>4.</td>
                        <td>GNM 1st Year Marks Card</td>
                        <td>
                          {info?.GNM_marks_card_1 ? (
                            <a href={info?.GNM_marks_card_1} target="_blank">
                              <i className="ri ri-attachment-line"></i>
                            </a>
                          ) : (
                            <span className="badge badge-soft-info">
                              Not Uploaded
                            </span>
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td>5.</td>
                        <td>GNM 2nd Year Marks Card</td>
                        <td>
                          {info?.GNM_marks_card_2 ? (
                            <a href={info?.GNM_marks_card_2} target="_blank">
                              <i className="ri ri-attachment-line"></i>
                            </a>
                          ) : (
                            <span className="badge badge-soft-info">
                              Not Uploaded
                            </span>
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td>6.</td>
                        <td>GNM 2nd Year Marks Card</td>
                        <td>
                          {info?.GNM_marks_card_3 ? (
                            <a href={info?.GNM_marks_card_3} target="_blank">
                              <i className="ri ri-attachment-line"></i>
                            </a>
                          ) : (
                            <span className="badge badge-soft-info">
                              Not Uploaded
                            </span>
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td>7.</td>
                        <td>Transfer Certificate</td>
                        <td>
                          {info?.transfer_certificate ? (
                            <a
                              href={info?.transfer_certificate}
                              target="_blank"
                            >
                              <i className="ri ri-attachment-line"></i>
                            </a>
                          ) : (
                            <span className="badge badge-soft-info">
                              Not Uploaded
                            </span>
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td>8.</td>
                        <td>Age Certificate</td>
                        <td>
                          {info?.age_certificate ? (
                            <a href={info?.age_certificate} target="_blank">
                              <i className="ri ri-attachment-line"></i>
                            </a>
                          ) : (
                            <span className="badge badge-soft-info">
                              Not Uploaded
                            </span>
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td>9.</td>
                        <td>Domicile Certificate</td>
                        <td>
                          {info?.domicile_certificate ? (
                            <a
                              href={info?.domicile_certificate}
                              target="_blank"
                            >
                              <i className="ri ri-attachment-line"></i>
                            </a>
                          ) : (
                            <span className="badge badge-soft-info">
                              Not Uploaded
                            </span>
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td>10.</td>
                        <td>Caste Certificate</td>
                        <td>
                          {info?.caste_certificate ? (
                            <a href={info?.caste_certificate} target="_blank">
                              <i className="ri ri-attachment-line"></i>
                            </a>
                          ) : (
                            <span className="badge badge-soft-info">
                              Not Uploaded
                            </span>
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td>11.</td>
                        <td>Govt Gazette</td>
                        <td>
                          {info?.Govt_gazette ? (
                            <a href={info?.Govt_gazette} target="_blank">
                              <i className="ri ri-attachment-line"></i>
                            </a>
                          ) : (
                            <span className="badge badge-soft-info">
                              Not Uploaded
                            </span>
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td>12.</td>
                        <td>NOC Certificate From Current Working Department</td>
                        <td>
                          {info?.NOC_from_current_working_dept ? (
                            <a
                              href={info?.NOC_from_current_working_dept}
                              target="_blank"
                            >
                              <i className="ri ri-attachment-line"></i>
                            </a>
                          ) : (
                            <span className="badge badge-soft-info">
                              Not Uploaded
                            </span>
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td>13.</td>
                        <td>Medical Fitness Certificate</td>
                        <td>
                          {info?.Medical_Fitness_Certificate ? (
                            <a
                              href={info?.Medical_Fitness_Certificate}
                              target="_blank"
                            >
                              <i className="ri ri-attachment-line"></i>
                            </a>
                          ) : (
                            <span className="badge badge-soft-info">
                              Not Uploaded
                            </span>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="row mt-5">
                  <div className="col-md-4">
                    <h5>Place:</h5>
                    <input
                      type="text"
                      className="form-control"
                      name="place"
                      value={info?.place}
                      readOnly={true}
                    />
                  </div>
                  <div className="col-md-7">
                    <h5>Date Of Filling Application</h5>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={info?.date?.split("T")[0]}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PBBscNursing;
