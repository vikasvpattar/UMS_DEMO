import React from 'react'

function Select(props) {
  return (
    <div className='Select'>
        <label htmlFor={props.key}>{props.titel}</label>
        <select
        name="select" 
        id={props.key}
        required={props.required}
        >
            {
                props.options.map((data,key)=>(
                    <option value={data.value} selected={key===0?true:false}>{data.title}</option>
                ))
            }
        </select>
    </div>
  )
}

export default Select