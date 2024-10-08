import React from 'react'
import Calender from '../../../../Components/Calender/Calender'

function Schedule({ setLoading }) {
  return (
    <div className='Schedule'>
      <br />

      <div className="container mt-3 mb-3 card p-3">

        <Calender setLoading={setLoading} />
      </div>
      <br />
      <br />
      <br />
      <br />

    </div>
  )
}

export default Schedule