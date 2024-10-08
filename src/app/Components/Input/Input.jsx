import React from 'react'

function Input(props) {
  return (
    <div className='Input'>
        <label htmlFor={props.key}>{props.title}</label>

        <input 
        type={props.inputType}
        id={props.key}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        value={props.value}
        required={props.required}
        />

    </div>
  )
}

export default Input