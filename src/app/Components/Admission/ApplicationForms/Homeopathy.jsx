import React, { useState, useEffect } from 'react'

const Homeopathy = ({ form_data }) => {

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
            <label>NEET No. </label>

            <input
              type="text"
              className="form-control"
              placeholder="NEET  No."
              name="neet_no"
              value={info?.neet_no}
              //    onChange={handleChange}
              readOnly={true}
            />

          </div>
        </div>
        <div className="col-md-4">

          <div className="form-group">
            <label>Obtained Marks in NEET </label>

            <input
              type="text"
              className="form-control"
              placeholder="Obtained Marks in NEET"
              name="neet_marks"
              value={info?.neet_marks}
              //    onChange={handleChange}
              readOnly={true}
            />

          </div>
        </div>

      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <h4>(C)Marks obtained at H.S.C.E. or Equivalent Examination</h4>
          <table className="table table-bordered text-center">
            <thead>
              <tr>
                <th rowSpan={2}>Sl. No.</th>
                <th rowSpan={2}>SUBJECTS</th>
                <th colSpan={2} >THEORY MARKS</th>
                <th colSpan={2}>PRACTICAL MARKS</th>

              </tr>
              <tr>

                <th>MAXIMUM</th>
                <th>OBTAINED</th>
                <th>MAXIMUM</th>
                <th>OBTAINED</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <th>01</th>
                <th>CHEMISTRY</th>
                <th>
                  <input
                    type="number"
                    className="form-control"
                    name='t_chem_max'
                    value={info?.t_chem_max}
                    // onChange={handleChange}
                    readOnly={true}
                  />
                </th>
                <th>
                  <input
                    type="number"
                    className="form-control"
                    name='t_chem_obt'
                    value={info?.t_chem_obt}
                    // onChange={handleChange}
                    readOnly={true}
                  />
                </th>
                <th>
                  <input
                    type="number"
                    className="form-control"
                    name='p_chem_max'
                    value={info?.p_chem_max}
                    // onChange={handleChange}
                    readOnly={true}
                  />
                </th>
                <th>
                  <input
                    type="number"
                    className="form-control"
                    name='p_chem_obt'
                    value={info?.p_chem_obt}
                    // onChange={handleChange}
                    readOnly={true}
                  />
                </th>

              </tr>

              <tr>
                <th>02</th>
                <th>PHYSICS</th>
                <th>
                  <input
                    type="number"
                    className="form-control"
                    name='t_phy_max'
                    value={info?.t_phy_max}
                    // onChange={handleChange}
                    readOnly={true}
                  />
                </th>
                <th>
                  <input
                    type="number"
                    className="form-control"
                    name='t_phy_obt'
                    value={info?.t_phy_obt}
                    // onChange={handleChange}
                    readOnly={true}
                  />
                </th>
                <th>
                  <input
                    type="number"
                    className="form-control"
                    name='p_phy_max'
                    value={info?.p_phy_max}
                    // onChange={handleChange}
                    readOnly={true}
                  />
                </th>
                <th>
                  <input
                    type="number"
                    className="form-control"
                    name='p_phy_obt'
                    value={info?.p_phy_obt}
                    // onChange={handleChange}
                    readOnly={true}
                  />
                </th>

              </tr>
              <tr>
                <th>03</th>
                <th>BIOLOGY</th>
                <th>
                  <input
                    type="number"
                    className="form-control"
                    name='t_bio_max'
                    value={info?.t_bio_max}
                    // onChange={handleChange}
                    readOnly={true}
                  />
                </th>
                <th>
                  <input
                    type="number"
                    className="form-control"
                    name='t_bio_obt'
                    value={info?.t_bio_obt}
                    // onChange={handleChange}
                    readOnly={true}
                  />
                </th>
                <th>
                  <input
                    type="number"
                    className="form-control"
                    name='p_bio_max'
                    value={info?.p_bio_max}
                    // onChange={handleChange}
                    readOnly={true}
                  />
                </th>
                <th>
                  <input
                    type="number"
                    className="form-control"
                    name='p_bio_obt'
                    value={info?.p_bio_obt}
                    // onChange={handleChange}
                    readOnly={true}
                  />
                </th>

              </tr>
              <tr>
                <th>
                  04
                </th>
                <th>TOTAL</th>
                <th>{Number(info?.t_phy_max) + Number(info?.t_bio_max) + Number(info?.t_chem_max)}</th>
                <th>{Number(info?.t_phy_obt) + Number(info?.t_bio_obt) + Number(info?.t_chem_obt)}</th>
                <th>{Number(info?.p_phy_max) + Number(info?.p_bio_max) + Number(info?.p_chem_max)}</th>
                <th>{Number(info?.p_phy_obt) + Number(info?.p_bio_obt) + Number(info?.p_chem_obt)}</th>


              </tr>
              <tr>
                <th>05</th>
                <th>SANSKRIT / COMPUTER</th>
                <th>
                  <input
                    type="number"
                    className="form-control"
                    name='t_san_or_cs_max'
                    value={info?.t_san_or_cs_max}
                    // onChange={handleChange}
                    readOnly={true}
                  />
                </th>
                <th>
                  <input
                    type="number"
                    className="form-control"
                    name='t_san_or_cs_obt'
                    value={info?.t_san_or_cs_obt}
                    // onChange={handleChange}
                    readOnly={true}
                  />
                </th>

              </tr>
              <tr>
                <th>06</th>
                <th>ENGLISH</th>
                <th>
                  <input
                    type="number"
                    className="form-control"
                    name='t_english_max'
                    value={info?.t_english_max}
                    // onChange={handleChange}
                    readOnly={true}
                  />
                </th>
                <th>
                  <input
                    type="number"
                    className="form-control"
                    name='t_english_obt'
                    value={info?.t_english_obt}
                    // onChange={handleChange}
                    readOnly={true}
                  />
                </th>

              </tr>
              <tr>
                <th>05</th>
                <th>GRAND TOTAL</th>
                <th>
                  {Number(info?.t_san_or_cs_max) + Number(info?.t_english_max)}
                </th>
                <th>
                  {Number(info?.t_san_or_cs_obt) + Number(info?.t_english_obt)}
                </th>

              </tr>
            </tbody>

          </table>


        </div>
      </div>


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
                NEET Marksheet
              </td>
              <td>
                {
                  info?.attach_neet_markssheet
                    ?
                    <a href={info?.attach_neet_markssheet} target="_blank"><i className='ri ri-attachment-line'></i></a>
                    :
                    'Not Uploaded'
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
                    'Not Uploaded'
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
                    'Not Uploaded'
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

export default Homeopathy