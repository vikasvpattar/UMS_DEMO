import React, { useState, useEffect } from 'react'

const AyurvedaPg = ({ form_data }) => {

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
      <div className="row mt-3">
        <div className="col-md-12">
          <h4>(B)Academic Information:</h4>

        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="">Board</label>
            <select
              name="board"
              value={info?.board}
              // onChange={handleChange} 
              readOnly={true}
              className="form-control">
              <option value="">Select Board</option>

              <option value="GHSEB">GHSEB</option>
              <option value="CBSE">CBSE</option>
              <option value="ICSE">ICSE</option>

            </select>
          </div>
        </div>
        <div className="col-md-4">

          <div className="form-group">
            <label>Month & Year of Passing</label>

            <input
              type="month"
              className="form-control"
              name="month_year"
              value={info?.month_year}
              //   onChange={handleChange} 
              readOnly={true}
            />

          </div>
        </div>
        <div className="col-md-4">

          <div className="form-group">
            <label>Examination Seat No. </label>

            <input
              type="text"
              className="form-control"
              name="examination_seat_no"
              value={info?.examination_seat_no}
              //   onChange={handleChange} 
              readOnly={true}
            />

          </div>
        </div>


        <div className="col-md-4">

          <div className="form-group">
            <label>GUJCET No. </label>

            <input
              type="text"
              className="form-control"
              placeholder="GUJCET Seat No."
              name="gujcet_no"
              value={info?.gujcet_no}
              //    onChange={handleChange}
              readOnly={true}
            />

          </div>
        </div>
        <div className="col-md-4">

          <div className="form-group">
            <label>Marks </label>

            <input
              type="number"
              className="form-control"
              placeholder="Examination Seat No."
              name="gujcet_marks"
              value={info?.gujcet_marks}
              //    onChange={handleChange}
              readOnly={true}
            />

          </div>
        </div>
        <div className="col-md-4">

          <div className="form-group">
            <label>AIPGT No. </label>

            <input
              type="text"
              className="form-control"
              placeholder="AIPGT  No."
              name="aipgt_no"
              value={info?.aipgt_no}
              //    onChange={handleChange}
              readOnly={true}
            />

          </div>
        </div>
        <div className="col-md-4">

          <div className="form-group">
            <label>Obtained Marks in AIPGT </label>

            <input
              type="text"
              className="form-control"
              placeholder="Obtained Marks in AIPGT"
              name="neet_marks"
              value={info?.aipgt_marks}
              //    onChange={handleChange}
              readOnly={true}
            />

          </div>
        </div>

      </div>

   <br/>

      <div className="row ">
        <h4>(D) Documents</h4>
        <div className="col-12">
          <table className="table table-bordered">
            <tr>
              <th>Sl.No</th>
              <th>Document</th>
              <th>Attachment</th>
            </tr>
            <tr>
              <td>
                1.
              </td>
              <td>
                AIPGT Marksheet
              </td>
              <td>
                {
                  info?.attach_aipgt_markssheet
                    ?
                    <a href={info?.attach_aipgt_markssheet} target="_blank"><i className='ri ri-attachment-line'></i></a>
                    :
                    <span className='badge badge-soft-info'>Not Uploaded</span>
                }
              </td>
            </tr>
            <tr>
              <td>
                2.
              </td>
              <td>
                School Leaving Certificate
              </td>
              <td>
                {
                  info?.attach_school_lc
                    ?
                    <a href={info?.attach_school_lc} target="_blank"><i className='ri ri-attachment-line'></i></a>
                    :
                    <span className='badge badge-soft-info'>Not Uploaded</span>
                }
              </td>
            </tr>
            <tr>
              <td>
                3.
              </td>
              <td>
                Caste Certificate (if Applicable)
              </td>
              <td>
                {
                  info?.attach_caste_cert
                    ?
                    <a href={info?.attach_caste_cert} target="_blank"><i className='ri ri-attachment-line'></i></a>
                    :
                    <span className='badge badge-soft-info'>Not Uploaded</span>
                }
              </td>
            </tr>
            <tr>
              <td>
                4.
              </td>
              <td>
                Degree Certificate
              </td>
              <td>
                {
                  info?.degree
                    ?
                    <a href={info?.degree} target="_blank"><i className='ri ri-attachment-line'></i></a>
                    :
                    <span className='badge badge-soft-info'>Not Uploaded</span>
                }
              </td>
            </tr>
            <tr>
              <td>
                5.
              </td>
              <td>
               Registration Form
              </td>
              <td>
                {
                  info?.reg_form
                    ?
                    <a href={info?.reg_form} target="_blank"><i className='ri ri-attachment-line'></i></a>
                    :
                    <span className='badge badge-soft-info'>Not Uploaded</span>
                }
              </td>
            </tr>
           
          </table>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-4">
          <h5>Place:</h5>
          <input
            type="text"
            className="form-control"
            name='place'
            value={info?.place}
            //   onChange={handleChange}
            readOnly={true}
          />
        </div>
        <div className="col-md-4">
          <h5>Date:</h5>
          <input
            type="text"
            className="form-control"
            name='date'
            value={info?.date?.split("T")[0]}
            // onChange={handleChange}
            readOnly={true}
          />
        </div>
      </div>
    </div>
  )
}

export default AyurvedaPg