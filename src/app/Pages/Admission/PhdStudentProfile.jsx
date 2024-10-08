import React from "react";
import { useLocation } from "react-router-dom";

const PhdStudentProfile = () => {
  const location = useLocation();

  const data = location?.state?.data;
  console.log("data -", data);
  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-flui">
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <img
                    src={data?.photograph}
                    style={{ maxWidth: "300px" }}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-12">
                      <h4>Application for</h4>
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <tr>
                            <th>Admission Type</th>
                            <td>{data?.application_for}</td>
                          </tr>
                          <tr>
                            <th>Specialization</th>
                            <td>{data?.application_for}</td>
                          </tr>
                          <tr>
                            <th> area of Specialization / Research</th>
                            <td>{data?.area_of_specialization}</td>
                          </tr>
                        </table>
                      </div>

                      <h4 className="mt-4">Personal Information</h4>
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <tr>
                            <th>Name of Candidate</th>
                            <td>{data?.candidate_name}</td>
                          </tr>
                          <tr>
                            <th>Phone number</th>
                            <td>{data?.phone}</td>
                          </tr>
                          <tr>
                            <th>Email</th>
                            <td>{data?.email}</td>
                          </tr>
                          <tr>
                            <th>Address</th>
                            <td>{data?.address}</td>
                          </tr>
                          <tr>
                            <th>City</th>
                            <td>{data?.city}</td>
                          </tr>
                          <tr>
                            <th>State</th>
                            <td>{data?.state}</td>
                          </tr>
                          <tr>
                            <th>Father Name</th>
                            <td>{data?.guardian_name}</td>
                          </tr>
                          <tr>
                            <th>Father Mobile</th>
                            <td>{data?.area_of_specialization}</td>
                          </tr>
                          <tr>
                            <th>Date of Birth</th>
                            <td>{data?.dob?.split("T")[0]}</td>
                          </tr>
                          <tr>
                            <th>Gender</th>
                            <td>{data?.gender}</td>
                          </tr>
                          <tr>
                            <th>Category</th>
                            <td>{data?.category}</td>
                          </tr>
                          <tr>
                            <th>Nationality</th>
                            <td>{data?.nationality}</td>
                          </tr>
                          <tr>
                            <th>Maritual Status</th>
                            <td>{data?.marital_status}</td>
                          </tr>
                          <tr>
                            <th>Blood Group</th>
                            <td>{data?.blood_group}</td>
                          </tr>
                          <tr>
                            <th>PAN Card No.</th>
                            <td>{data?.pan}</td>
                          </tr>
                          <tr>
                            <th>Aadhar No.</th>
                            <td>{data?.aadhaar_no}</td>
                          </tr>
                        </table>
                      </div>

                      <h4 className="mt-4">ACADEMIC DETAILS</h4>
                      <div className="table-responsive employment-details">
                        <table className="table table-bordered ">
                          <thead>
                            <tr>
                              <th width={10}>Sr. No.</th>
                              <th>Exam Passed</th>
                              <th>School / College Name</th>
                              <th>University / Board</th>
                              <th>Subject(Specialization)</th>
                              <th>Year of Passing</th>
                              <th>Percentage &amp; Division</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>
                                Secondary (SSC){" "}
                                <span className="required">*</span>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="academic_details_ssc_college_name"
                                  value={
                                    data?.academic_details_ssc_college_name
                                  }
                                  readOnly={true}
                                  maxLength={100}
                                  required=""
                                  wtx-context="2E84417F-C5D7-4EE9-8827-C0C8C47D7279"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="academic_details_ssc_university_board"
                                  value={
                                    data?.academic_details_ssc_university_board
                                  }
                                  readOnly={true}
                                  maxLength={255}
                                  required=""
                                  wtx-context="F9EBA00B-30EF-44BE-B552-3C5C2C23B675"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="academic_details_ssc_subject"
                                  value={data?.academic_details_ssc_subject}
                                  readOnly={true}
                                  maxLength={255}
                                  required=""
                                  wtx-context="21D40576-3017-4734-851A-1F9325F430CB"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="academic_details_ssc_year_of_passing"
                                  value={
                                    data?.academic_details_ssc_year_of_passing
                                  }
                                  readOnly={true}
                                  maxLength={50}
                                  required=""
                                  wtx-context="D9C5B39C-1F01-4648-8532-522DFE43CFAB"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="academic_details_ssc_percentage_division"
                                  value={
                                    data?.academic_details_ssc_percentage_division
                                  }
                                  readOnly={true}
                                  maxLength={50}
                                  required=""
                                  wtx-context="A90416D2-5DDA-487B-8E55-1AAE856FC334"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>
                                Higher Secondary (HSC){" "}
                                <span className="required">*</span>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="academic_details_hsc_college_name"
                                  value={
                                    data?.academic_details_hsc_college_name
                                  }
                                  readOnly={true}
                                  maxLength={100}
                                  required=""
                                  wtx-context="D6F6069E-6AE1-4EA0-89A4-7E6613B67C4B"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="academic_details_hsc_university_board"
                                  value={
                                    data?.academic_details_hsc_university_board
                                  }
                                  readOnly={true}
                                  maxLength={255}
                                  required=""
                                  wtx-context="A91D156B-7FBD-431C-8389-128FE47814BA"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="academic_details_hsc_subject"
                                  value={data?.academic_details_hsc_subject}
                                  readOnly={true}
                                  maxLength={255}
                                  required=""
                                  wtx-context="43998E34-6EB8-490F-8A9E-7D53C235FFE1"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="academic_details_hsc_year_of_passing"
                                  value={
                                    data?.academic_details_hsc_year_of_passing
                                  }
                                  readOnly={true}
                                  maxLength={50}
                                  required=""
                                  wtx-context="3FFDFC92-93BF-4D98-942D-997A7A22DC75"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="academic_details_hsc_percentage_division"
                                  value={
                                    data?.academic_details_hsc_percentage_division
                                  }
                                  readOnly={true}
                                  maxLength={50}
                                  required=""
                                  wtx-context="7BCA029B-CA15-44F2-A2E8-71D405E56E80"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>
                                Under – Graduate{" "}
                                <span className="required">*</span>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="academic_details_ug_college_name"
                                  value={data?.academic_details_ug_college_name}
                                  readOnly={true}
                                  maxLength={100}
                                  required=""
                                  wtx-context="78022A11-41E4-4FFE-87D5-48410BDB1BC0"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="academic_details_ug_university_board"
                                  value={
                                    data?.academic_details_ug_university_board
                                  }
                                  readOnly={true}
                                  maxLength={255}
                                  required=""
                                  wtx-context="231D5A17-7F96-47F9-B09F-7E35598B2E62"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="academic_details_ug_subject"
                                  value={data?.academic_details_ug_subject}
                                  readOnly={true}
                                  maxLength={255}
                                  required=""
                                  wtx-context="6983A1AF-A04D-40C9-8D7B-FA2AAEB6FCB9"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="academic_details_ug_year_of_passing"
                                  value={
                                    data?.academic_details_ug_year_of_passing
                                  }
                                  readOnly={true}
                                  maxLength={50}
                                  required=""
                                  wtx-context="31B94287-16B0-4B15-80C3-89E782966A9E"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="academic_details_ug_percentage_division"
                                  value={
                                    data?.academic_details_ug_percentage_division
                                  }
                                  readOnly={true}
                                  maxLength={50}
                                  required=""
                                  wtx-context="A8E66BE3-4E11-4158-8E60-485D45363FAD"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>
                                Post – Graduate{" "}
                                <span className="required">*</span>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="academic_details_pg_college_name"
                                  value={data?.academic_details_pg_college_name}
                                  readOnly={true}
                                  maxLength={100}
                                  required=""
                                  wtx-context="2DBBBD16-59F4-4342-82D7-A9E0D6270CD5"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="academic_details_pg_university_board"
                                  value={
                                    data?.academic_details_pg_university_board
                                  }
                                  readOnly={true}
                                  maxLength={255}
                                  required=""
                                  wtx-context="D5067B64-EC8E-4A1D-818E-CBE54B6C80C2"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="academic_details_pg_subject"
                                  value={data?.academic_details_pg_subject}
                                  readOnly={true}
                                  maxLength={255}
                                  required=""
                                  wtx-context="47691E52-50C2-44A6-8DF0-C0CEEFB0AA5B"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="academic_details_pg_year_of_passing"
                                  value={
                                    data?.academic_details_pg_year_of_passing
                                  }
                                  readOnly={true}
                                  maxLength={50}
                                  required=""
                                  wtx-context="53928B80-9306-4809-8FB8-8701B33CAD9F"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="academic_details_pg_percentage_division"
                                  value={
                                    data?.academic_details_pg_percentage_division
                                  }
                                  readOnly={true}
                                  maxLength={50}
                                  required=""
                                  wtx-context="116D97FB-CC99-47BA-8ED3-222411471094"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h4 className="mt-4">
                        EMPLOYMENT DETAILS (RECENT THREE)
                      </h4>
                      <div className="table-responsive employment-details">
                        <table className="table table-bordered ">
                          <thead>
                            <tr>
                              <th width={10}>Sr. No.</th>
                              <th>Organization</th>
                              <th>Duration</th>
                              <th>Position Regular / Temporary</th>
                              <th>Nature of Duties</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="employment_1_organization"
                                  value={data?.employment_1_organization}
                                  readOnly={true}
                                  maxLength={100}
                                  wtx-context="61D6FB3E-4291-4EAC-822D-0679D3D28478"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="employment_1_duration"
                                  value={data?.employment_1_duration}
                                  readOnly={true}
                                  maxLength={50}
                                  wtx-context="AAAF8D56-92AD-4497-80F3-865F7C748C51"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="employment_1_regular_temporary"
                                  value={data?.employment_1_regular_temporary}
                                  readOnly={true}
                                  maxLength={100}
                                  wtx-context="3B4FA417-7831-4CEA-8E06-66863FC6042B"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="employment_1_nature_of_duties"
                                  value={data?.employment_1_nature_of_duties}
                                  readOnly={true}
                                  maxLength={255}
                                  wtx-context="23411D83-DCEA-403D-89DF-A52B3BE023A1"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="employment_2_organization"
                                  value={data?.employment_2_organization}
                                  readOnly={true}
                                  maxLength={200}
                                  wtx-context="4A66641B-AEE0-495D-B365-A794787B4EB3"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="employment_2_duration"
                                  value={data?.employment_2_duration}
                                  readOnly={true}
                                  maxLength={50}
                                  wtx-context="4EF65585-1C07-46E1-AF0E-D1ADC4C8541C"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="employment_2_regular_temporary"
                                  value={data?.employment_2_regular_temporary}
                                  readOnly={true}
                                  maxLength={200}
                                  wtx-context="3CE7A3DE-FF79-4565-958F-F13E2FB34F28"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="employment_2_nature_of_duties"
                                  value={data?.employment_2_nature_of_duties}
                                  readOnly={true}
                                  maxLength={255}
                                  wtx-context="B2DD0198-C4FF-4D6B-8EED-2E50C6FE093D"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="employment_3_organization"
                                  value={data?.employment_3_organization}
                                  readOnly={true}
                                  maxLength={300}
                                  wtx-context="1F0116BD-54B1-4CBE-8B38-69558EE82781"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="employment_3_duration"
                                  value={data?.employment_3_duration}
                                  readOnly={true}
                                  maxLength={50}
                                  wtx-context="880C2AB0-3EE5-4C7B-8A20-DC71AE17A30D"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="employment_3_regular_temporary"
                                  value={data?.employment_3_regular_temporary}
                                  readOnly={true}
                                  maxLength={300}
                                  wtx-context="94EE504D-DD9E-4F0E-8D4E-F040F96D0577"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="employment_3_nature_of_duties"
                                  value={data?.employment_3_nature_of_duties}
                                  readOnly={true}
                                  maxLength={355}
                                  wtx-context="3E258618-BE66-4865-8E4E-0F5441119D7C"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h4 className="mt-4">
                        GIVE DETAILS OF RESEARCH PUBLICATION (IN SCOPUS / WOS /
                        UGC CARE)(TOP THREE)
                      </h4>
                      <div className="table-responsive employment-details">
                        <table className="table table-bordered ">
                          <thead>
                            <tr>
                              <th width={10}>Sr. No.</th>
                              <th>Title of Publication</th>
                              <th>Name of Journal/Published</th>
                              <th>No./Vol./Edition/Date </th>
                              <th>National/International</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="research_publication_1_title"
                                  value={data?.research_publication_1_title}
                                  readOnly={true}
                                  maxLength={255}
                                  wtx-context="310AD393-6489-46B5-8D08-4BC026AD803B"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="research_publication_1_no_of_journal_published"
                                  value={
                                    data?.research_publication_1_no_of_journal_published
                                  }
                                  readOnly={true}
                                  maxLength={100}
                                  wtx-context="EDD3EC01-4911-4E63-AD1E-71DFA4AC86C7"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="research_publication_1_no_vol_edition_date"
                                  value={
                                    data?.research_publication_1_no_vol_edition_date
                                  }
                                  readOnly={true}
                                  maxLength={100}
                                  wtx-context="5B36729C-ED77-4174-8F05-5150C57235CF"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="research_publication_1_national_international"
                                  value={
                                    data?.research_publication_1_national_international
                                  }
                                  readOnly={true}
                                  maxLength={100}
                                  wtx-context="BBD7CA0A-8491-431E-8256-3004B0E6F767"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="research_publication_2_title"
                                  value={data?.research_publication_2_title}
                                  readOnly={true}
                                  maxLength={255}
                                  wtx-context="DC20DD15-8B42-4425-8355-56269CC788A8"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="research_publication_2_no_of_journal_published"
                                  value={
                                    data?.research_publication_2_no_of_journal_published
                                  }
                                  readOnly={true}
                                  maxLength={200}
                                  wtx-context="E8884CEA-DCAD-4224-8A2B-E3263579147F"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="research_publication_2_no_vol_edition_date"
                                  value={
                                    data?.research_publication_2_no_vol_edition_date
                                  }
                                  readOnly={true}
                                  maxLength={200}
                                  wtx-context="FCA35548-BAF0-4EBC-864C-BF566F02D662"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="research_publication_2_national_international"
                                  value={
                                    data?.research_publication_2_national_international
                                  }
                                  readOnly={true}
                                  maxLength={200}
                                  wtx-context="DE998606-6771-4F62-AD06-5D214A1710D7"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="research_publication_3_title"
                                  value={data?.research_publication_3_title}
                                  readOnly={true}
                                  maxLength={355}
                                  wtx-context="863F62B5-3730-4CA9-9A9C-63ABA41B13AA"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="research_publication_3_no_of_journal_published"
                                  value={
                                    data?.research_publication_3_no_of_journal_published
                                  }
                                  readOnly={true}
                                  maxLength={300}
                                  wtx-context="EC8E9DD6-73C8-48FA-A97A-52B15B42D477"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="research_publication_3_no_vol_edition_date"
                                  value={
                                    data?.research_publication_3_no_vol_edition_date
                                  }
                                  readOnly={true}
                                  maxLength={300}
                                  wtx-context="8D53EB7A-0AE4-4B85-9BBC-BA85198A0054"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="research_publication_3_national_international"
                                  value={
                                    data?.research_publication_3_national_international
                                  }
                                  readOnly={true}
                                  maxLength={300}
                                  wtx-context="1E8DDA76-0EE1-429F-839A-722EC4E299EB"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h4 className="mt-4">DETAILS OF IN-SERVICE CANDIDATES</h4>
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <tr>
                            <th>Name of the Department</th>
                            <td>{data?.in_service_department}</td>
                          </tr>
                          <tr>
                            <th>Name of the Constituent College</th>
                            <td>
                              {data?.in_service_name_of_constituent_college}
                            </td>
                          </tr>
                          <tr>
                            <th>Date of Appointement</th>
                            <td>{data?.in_service_date_of_appointment}</td>
                          </tr>
                          <tr>
                            <th>Present Designation</th>
                            <td>{data?.in_service_present_designation}</td>
                          </tr>
                          <tr>
                            <th>Period of Service</th>
                            <td>{data?.in_service_period_of_service}</td>
                          </tr>
                          <tr>
                            <th>NOC Received</th>
                            <td>{data?.in_service_noc}</td>
                          </tr>
                        </table>
                      </div>

                      <h4 className="mt-4">Attachments</h4>
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <tr>
                            <th>UG Degree</th>
                            <td>
                              <a
                                href={data?.ug_degree_certificate}
                                target="_blank"
                              >
                                <i className="ri ri-attachment-line cursor-pointer"></i>
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <th>PG Degree</th>
                            <td>
                              <a
                                href={data?.pg_degree_certificate}
                                target="_blank"
                              >
                                <i className="ri ri-attachment-line cursor-pointer"></i>
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <th>ID Proof</th>
                            <td>
                              <a href={data?.id_proof} target="_blank">
                                <i className="ri ri-attachment-line cursor-pointer"></i>
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <th>Photograph</th>
                            <td>
                              <a href={data?.photograph} target="_blank">
                                <i className="ri ri-attachment-line cursor-pointer"></i>
                              </a>
                            </td>
                          </tr>
                        </table>
                      </div>

                      <h4 className="mt-4">PAYMENT DETAILS</h4>
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <tr>
                            <th>Transaction ID</th>
                            <td>{data?.student_tans_id}</td>
                          </tr>
                          <tr>
                            <th>Date</th>
                            {/* <td>{data?.transaction_date}</td> */}
                            <td>{data?.student_tans_date?.split("T")[0]}</td>
                          </tr>
                          <tr>
                            <th>Upload Bank Reciept</th>
                            <td>
                              {data?.fetchPhdAdmission?.student_tans_bank_reciept?.length > 0
                              ?
                              <a
                                href={
                                  data?.fetchPhdAdmission
                                    ?.student_tans_bank_reciept
                                }
                                target="_blank"
                              >
                                <i className="ri ri-attachment-line cursor-pointer">View</i>
                              </a>
                              :
                              <></>
                            }
                              
                            </td>
                          </tr>
                          <tr>
                            <th>Payment Mode</th>
                            <td>
                              {data?.payment_mode ? data?.payment_mode : "-"}
                            </td>
                          </tr>
                          <tr>
                            <th>Payment Status</th>
                            <td>{data?.actual_payment_status}</td>
                          </tr>
                        </table>
                      </div>

                      <div className="mt-5">
                        <div>
                          Date:{" "}
                          {data?.application_submission_date?.split("T")[0]}
                        </div>
                        <div>Place: {data?.application_submission_place}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhdStudentProfile;
