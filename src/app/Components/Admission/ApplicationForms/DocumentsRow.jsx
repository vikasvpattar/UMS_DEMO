import React from 'react'

const DocumentsRow = ({name,data}) => {
  return (
    <tr>
        <td>{name}</td>
        {
            data
            ?
            <td>
                <a href={data} target='_blank'><i className='ri ri-attachment2-line'></i></a>
            </td>
            :
            <td>Not Uploaded</td>
        }
    </tr>
  )
}

export default DocumentsRow