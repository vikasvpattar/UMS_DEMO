import React from 'react'

function DeclarationForm1() {
  return (
  
      <div Classname ='DeclarationForm1'>
    <div className="main-content">
  <div className="page-content">
    <div className="container-fluid">
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0">Resident  Declaration Form</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);">Resident  Declaration Form</a>
                </li>
                <li className="breadcrumb-item active"> Declaration Form</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 mb-4">
                  <h4 className="text-center"><b>Resident (JR/SR) Declaration Form (For AY 2021 – 22)</b></h4>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">Name of the College: </label>
                    <input type="text" name="" className="form-control" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <table className="table table-bordered">
                    <tr>
                      <th>Assessment </th>
                      <td><input type="date" name='assesment_date' className="form-control" /></td>
                      <th>Remarks and Signature of Assessor</th>
                      </tr>
                      <tr>
                        <th>Accepted</th>
                        <th><select name="" className='form-control' id="">
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                          </select>
                          </th>
                          <td rowSpan={2}><textarea name="remarks" className='form-control' id="" cols="3" rows="3"></textarea></td>
                      </tr>
                      <tr>
                        <th>Assessor’s name</th>
                        <td><input type="text" name='assesment_date' className="form-control" /></td>

                      </tr>
                  </table>
<p><b className='text-danger'>Note: </b> It is the responsibility of the Dean to ensure that the submitted Declaration form is ONLY of a Resident Doctor who is working as a full-time employee has not appeared for assessment in any other college for any discipline and in any capacity during the stated academic year.</p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">Name of Resident</label>
                    <input type="text" name="resident_name" className="form-control" />
                  </div>

                </div>
                <div className="col-md-3">
                  <div className="form-group">
                  <label htmlFor="">Date of Birth</label>
                    <input type="date" name="dob" className="form-control" />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                  <label htmlFor="">Age</label>
                    <input type="text" name="age" className="form-control" />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                  <label htmlFor="">Present Designation</label>
                    <input type="text" name="designation" className="form-control" />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                  <label htmlFor="">Department</label>
                    <input type="text" name="dept" className="form-control" />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                  <label htmlFor="">College / Institute</label>
                    <input type="text" name="college" className="form-control" />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                  <label htmlFor="">City/District</label>
                    <input type="text" name="dist" className="form-control" />
                  </div>
                </div>
                
              </div>
              <div className="row mt-4">
<div className="col-md-12">
<h5>Date of appearance in last MCI/NMC assessment</h5>
  </div>              
  <div className="col-md-3">
                  <div className="form-group">
                  <label htmlFor="">UG/PG/Any other</label>
                    <input type="text" name="course" className="form-control" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                  <label htmlFor="">Name of the College</label>
                    <input type="text" name="coolege_name" className="form-control" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                  <label htmlFor="">Whether appeared and accepted at the same College</label>
                    <select name="" id="" className="form-control">
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                  <label htmlFor="">Whether appeared and accepted for the same designation</label>
                    <select name="" id="" className="form-control">
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
  </div>

  <div className="row">
    <div className="col-md-6">
      <div className="form-group">
        <label htmlFor="">Campus/ Present Address of the Resident</label>
        <textarea className='form-control'  name="" id="" cols="3" rows="3"></textarea>
      </div>
    </div>
    <div className="col-md-6">
      <div className="form-group">
        <label htmlFor="">Permanent Address</label>
        <textarea  className='form-control' name="" id="" cols="3" rows="3"></textarea>
      </div>
    </div>
    <div className="col-md-3">
                  <div className="form-group">
                  <label htmlFor="">Residence telephone with STD code</label>
                    <input type="text" name="course" className="form-control" />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                  <label htmlFor="">Mobile Phone Number</label>
                    <input type="text" name="course" className="form-control" />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                  <label htmlFor="">Email address	</label>
                    <input type="text" name="course" className="form-control" />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                  <label htmlFor="">Date of joining the present institution	</label>
                    <input type="date" name="course" className="form-control" />
                  </div>
                </div>
  </div>
  <div className="row mt-5">
    <div className="col-md-12">
      <h5>Educational Qualifications</h5>
    </div>
    <div className="col-md-12 table-responsive">
    <table className="table table-bordered">
      <tr>
        <th>Degree</th>
        <th>Year</th>
        <th>Name of College & University</th>
        <th>Registration Number with date of registration</th>
        <th>Name of State Medical council</th>
      </tr>
      <tr>
        <th>MBBS</th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
      </tr>
      <tr>
        <th>MD/MS</th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
      </tr>
      <tr>
        <th>DM/MCh</th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
      </tr>
      <tr>
        <th>PhD</th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
      </tr>
    </table>
    </div>
    <div className="col-md-4">
      <div className="form-group">
        <label htmlFor="">MD/MS subject</label>
        <input type="text" className="form-control" />
      </div>
    </div>
    <div className="col-md-4">
      <div className="form-group">
        <label htmlFor="">DM/MCh subject</label>
        <input type="text" className="form-control" />
      </div>
    </div>
    <div className="col-md-4">
      <div className="form-group">
        <label htmlFor="">PhD subject</label>
        <input type="text" className="form-control" />
      </div>
    </div>
    <p className='px-3'><b className='text-danger'>Note:</b> For PG & Post PG qualifications, particulars of Registration of Additional Qualification certificates are to be furnished for them to be accepted. Strike out whichever section is not applicable.</p>
  </div>

  <div className="row mt-4">
    <div className="col-md-12">
      <h5>Details of Teaching experience till date</h5>
    </div>
    <div className="col-md-12 table-responsive mb-4">
    <table className="table table-bordered">
      <tr>
        <th>Designation</th>
        <th>Department</th>
        <th>Institution</th>
     <th>From</th>
     <th>To</th>
     <th>Total</th>
      </tr>
      <tr>
        <th>Junior Resident 1	</th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>

      </tr>
      <tr>
        <th>Junior Resident 2	</th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>

      </tr>
      <tr>
        <th>Junior Resident 3	</th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>

      </tr>
      <tr>
        <th>Senior Resident	</th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>

      </tr>
      <tr>
        <th>Any other</th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>
        <th><input type="text" className="form-control" /></th>

      </tr> 
    
    </table>
    <span className=''><b className='text-danger'>*</b> Write NA (Not Applicable) for the designations not held</span>
    </div> 
    <div className="col-md-6">
      <div className="form-group">
        <label htmlFor="">PAN Card Number</label>
        <input type="text" className='form-control' />
      </div>
    </div>
    <div className="col-md-6">
      <div className="form-group">
        <label htmlFor="">Aadhar Card Number</label>
        <input type="text" className='form-control' />
      </div>
    </div>
    <div className="col-md-12 mt-4">
      <h6>I have drawn total emoluments from this college in the current financial year as under</h6>
    </div>
    <div className="col-md-12">
      <table className="table table-bordered">
        <tr>
          <th>Month</th>
          <th>Amount Received</th>
          <th>TDS</th>
          <th>Action</th>
        </tr>
        <tr>
          <th><input type="month" className="form-control" /></th>
          <th><input type="text" className="form-control" /></th>
          <th><input type="text" className="form-control" /></th>
          <th><button className="btn btn-danger mr-3">x</button>
          <button className="btn btn-success">+</button></th>

        </tr>
      </table>
    </div>
    <div className="col-md-12 mt-4">
      <h6>Number of Research articles in Indexed Journals</h6>
    </div>
    <div className="col-md-4">
      <div className="form-group">
        <label htmlFor="">International Journals	</label>
        <input type="text" className='form-control' />
      </div>
    </div>
    <div className="col-md-4">
      <div className="form-group">
        <label htmlFor="">National Journals</label>
        <input type="text" className='form-control' />
      </div>
    </div>
    <div className="col-md-4">
      <div className="form-group">
        <label htmlFor="">State / Institutional Journal</label>
        <input type="text" className='form-control' />
      </div>
    </div>
    </div>
    <div className="row">
      <div className="col-md-12 mt-5">
      <h5 className="text-center">
        Upload Documents 
      </h5>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="">Recent Passport size photo <small className="text-danger">*</small> </label>
          <input type="file" className="form-control" />
        <p className="text-success text-right">Uploded</p>

        </div>
      </div>
      </div>
     <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="">Photo ID proof (Govt. Authority issued) <small className="text-danger">*</small> </label>
          <input type="file" className="form-control" />
        </div>
      </div>
      </div>
      <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="">Certified copy of Appointment order of the present Institute <small className="text-danger">*</small> </label>
          <input type="file" className="form-control" />
        </div>
      </div>
      </div>
      <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="">Copy of Allotment Letter by Dean as proof of present residential address <small className="text-danger">*</small> </label>
          <input type="file" className="form-control" />
        </div>
      </div>
      </div>
      <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="">Permanent address proof: Passport/Aadhar/Voter Card/Electricity/Landline phone bill	Yes / No <small className="text-danger">*</small> </label>
          <input type="file" className="form-control" />
        </div>
      </div>
      </div>
      <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="">Certified copy of Appointment order of the present Institute <small className="text-danger">*</small> </label>
          <input type="file" className="form-control" />
        </div>
      </div>
      </div>
      <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="">Joining report at the present institute. <small className="text-danger">*</small> </label>
          <input type="file" className="form-control" />
        </div>
      </div>
      </div>
      <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="">Copies of MBBS, PG, PhD degrees (as applicable) </label>
          <input type="file" className="form-control" />
        </div>
      </div>
      </div>
        <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="">Copies of MBBS, PG, PhD degree Registration Certificates (as applicable). </label>
          <input type="file" className="form-control" />
        </div>
      </div>
      </div>
        <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="">	Copy of PAN Card </label>
          <input type="file" className="form-control" />
        </div>
      </div>
      </div>
      <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="">Form 16A (downloaded from TRACES) for FY  2019-20 (Assessment Year 2020-21)	</label>
          <input type="file" className="form-control" />
        </div>
      </div>
      </div>
      <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="">Copy of Aadhar Card	 </label>
          <input type="file" className="form-control" />
        </div>
      </div>
      </div>
      <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="">Copies of MBBS, PG, PhD degrees (as applicable) </label>
          <input type="file" className="form-control" />
        </div>
      </div>
      </div>
      
    <div className="row">
    <div className="col-md-12 mt-4">
      <h4 className='text-center'><u>DECLARATION</u></h4>
    </div>
    <div className="col-md-12">
      <ol>
        <li>
        	I, Dr. _____________________ am working in the capacity of a Junior/Senior Resident in the Department of ________________________ at _____________________________ Medical College and do hereby give an undertaking that I am employed as a full-time regular Residentand am staying in Room Number _____ in the Resident’s Hostel in the college premises OR at_(alternative address)_______________________________.
        </li> <br />
        <li>
        	I have not made myself available to any other Medical College/Institution in any discipline, in the capacity of a Resident, teaching staff, administrator or advisor in the current academic year for the purpose of NMC/MCI assessments.
        </li> <br />
        <li>	I am not working in any other medical/dental college in or outside the State in any capacity: Regular/Contractual/Ad-hoc or Full time/Part time/Honorary.</li> <br />
        <li>
        	I declare that I have provided all details with regard to my work and teaching experience and no information has been concealed by me.
        </li> <br />
        <li>	I do solemnly declare that all the details/information furnished by me in this declaration form is absolutely true and correct, and all the documents/certificates that weremade available by me for verification or have been submitted by me along with this declaration form are authentic. In the event of any information furnished or statement made in this declaration subsequently turning out to be false/incorrect or any document/s or certificate/s is/are found to be out of order, or it comes to light that there has been suppression of any material information, I understand and accept that it shall be considered as gross misconduct thereby rendering me liable to disciplinary and/or legal proceedings. It might also lead to suspension/cancellation of my Registration with the State Medical Council and/or removal of my name from the Indian Medical Register.</li>

      </ol>
    </div>
    <div className="col-md-12">
      <h5  className='text-center'>ENDORSEMENT</h5>
    </div>
    <div className="col-md-12">
      <ol>
        <li>This endorsement is the certification that the undersigned has satisfied herself/himself about the correctness, authenticity and veracity of the content of this declaration form in its entirety and endorsed the above declaration as true and correct. I have personally verified all the certificates/documents submitted by the Residentwith the original certificates and documents that were submitted by her/him to the Institute and confirmed the same with the concerned Institute and have found them to be correct and authentic.</li> <br />
        <li>I also confirm that Dr. __________________________ is working as a full time Regular Resident (ie. for 24 hours) and is not practicing or carrying out any other activity, and is staying in Room No. _________ of the Residents’ Hostel in the college premises, since she/he has joined the Institute (If Staying in the College Hostel).</li> <br />
        <li>In the event of this declaration turning out to be false or incorrect or any part of this declaration subsequently turning out to be false or incorrect or it comes to light that there has been suppression of any material information, it is understood and accepted that the undersigned shall also be equally responsible besides the declarant herself/himself, for the misdeclaration or misstatement.</li>
      </ol>
    </div>
    <div className="col-md-12">
      <h5  className='text-center'>NOTE</h5>
    </div>
    <div className="col-md-12">
      <ol>
        <li>	This Declaration Form will not be accepted and the Resident will not be considered as a Resident in case any of the documents listed above are not enclosed/attached with the Declaration Form.

</li> <br />
<li>	The Resident will not be considered if the original Appointment letter, Relieving order, Experience certificates, Government Photo ID, Degrees, Registration Certificates, PAN Card, Aadhar Card, MCI Smart ID Card and State Medical Council ID (if issued) are not produced for verification at the time of assessment.</li> <br />

<li>
Residents must submit the revised Declaration form in this format only, Submissions in the old format will be rejected and Resident will not be considered.
</li>
      </ol>
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

  )
}

export default DeclarationForm1