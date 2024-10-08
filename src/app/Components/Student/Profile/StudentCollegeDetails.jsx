import React, { useState } from 'react'
import Bed from '../ApplicationForms/Bed'
import Bsc from '../ApplicationForms/Bsc'
import Commerce from '../ApplicationForms/Commerce'
import Law from '../ApplicationForms/Law'
import Msc from '../ApplicationForms/Msc'
import NursingBsc from '../ApplicationForms/NursingBsc'
import NursingGnm from '../ApplicationForms/NursingGnm'
import NursingMsc from '../ApplicationForms/NursingMsc'
import NursingPostBasic from '../ApplicationForms/NursingPostBasic'
import VedicAstro from '../ApplicationForms/VedicAstro'

const StudentCollegeDetails = ({application, form_data}) => {
  return (
    <div className='StudentCollegeDetails mt-3 px-3'>
        {application==='Law'&&<Law form_data={form_data}/>}
        {application==='Commerce'&&<Commerce form_data={form_data}/>}
        {application==='Bsc'&&<Bsc form_data={form_data}/>}
        {application==='Bed'&&<Bed form_data={form_data}/>}
        {application==='Msc'&&<Msc form_data={form_data}/>}
        {application==='Vedic'&&<VedicAstro form_data={form_data}/>}
        {application==='Nursing Bsc'&&<NursingBsc form_data={form_data}/>}
        {application==='Nursing GNM'&&<NursingGnm form_data={form_data}/>}
        {application==='Nursing Msc'&&<NursingMsc form_data={form_data}/>}
        {application==='Nursing Post Basic'&&<NursingPostBasic form_data={form_data}/>}
    </div>
  )
}

export default StudentCollegeDetails