import React from "react";
import { useState, useEffect } from "react";

function UGPharmacy({ form_data }) {
  const [info, setInfo] = useState({});
  
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
                  <h4>Previous Academic Details</h4>
                </div>
                <div className="col-md-12 mt-3">
                  <table className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th colSpan={1}>Examination</th>
                        <th colSpan={1}>Board/University</th>
                        <th colSpan={1}>Month and Passing Year</th>
                        <th colSpan={1}>Subjects</th>
                        <th colSpan={1}>Max. Marks</th>
                        <th colSpan={1}>Marks Obtained</th>
                        <th colSpan={1}>Percentage %</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th className="pt-4">Diploma</th>
                        <th>
                          <input
                            type="text"
                            className="form-control"
                            name="diploma_board"
                            value={info?.diploma_board}
                            readOnly={true}
                          />
                        </th>
                        <th>
                          <input
                            type="month"
                            className="form-control"
                            name="diploma_passing_year"
                            value={info?.diploma_passing_year}
                            readOnly={true}
                          />
                        </th>
                        <th>
                          <input
                            type="text"
                            className="form-control"
                            name="diploma_subjects"
                            value={info?.diploma_subjects}
                            readOnly={true}
                          />
                        </th>

                        <th>
                          <input
                            type="number"
                            className="form-control"
                            name="diploma_max_marks"
                            value={info?.diploma_max_marks}
                            readOnly={true}
                          />
                        </th>
                        <th>
                          <input
                            type="number"
                            className="form-control"
                            name="diploma_obtained_marks"
                            value={info?.diploma_obtained_marks}
                            readOnly={true}
                          />
                        </th>
                        <th className="pt-4">{info?.diploma_percentage}</th>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="col-md-10 mt-4">
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
                        <td>Caste Ceritificate</td>
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
                        <td>2.</td>
                        <td>FreeShip Card</td>
                        <td>
                          {info?.freeship_card ? (
                            <a href={info?.freeship_card} target="_blank">
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
                        <td>Income Ceritificate</td>
                        <td>
                          {info?.income_certificate ? (
                            <a href={info?.income_certificate} target="_blank">
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
                        <td>Diploma Marks Card</td>
                        <td>
                          {info?.diploma_markscard ? (
                            <a href={info?.diploma_markscard} target="_blank">
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
                        <td>Leaving Ceritificate</td>
                        <td>
                          {info?.leaving_certificate ? (
                            <a href={info?.leaving_certificate} target="_blank">
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
                  <div className="col-md-4">
                    <h5>Date:</h5>
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

export default UGPharmacy;
