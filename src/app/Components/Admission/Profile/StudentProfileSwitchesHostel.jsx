import React from 'react'

function StudentProfileSwitchesHostel({tab,setTab}) {

    const data=[
        ' ',
    ]

    return (
        <div className='StudentProfileSwitches'>
            <ul className="nav nav-tabs ">
                {
                    data.map((i,key)=>(
                        <li className="nav-item cursor-pointer">
                    <a
                        className={`nav-link ${tab===i&&'active'}`}
                        onClick={()=>{setTab(i)}}
                        role="tab"
                    >
                        {i}
                    </a>
                </li>
                    ))
                }
                </ul>
        </div>
    )
}

export default StudentProfileSwitchesHostel
