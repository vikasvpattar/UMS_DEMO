import React from 'react'

function Nodata(props) {
    return (
        <div align="center" className="text-danger">
             {props.titleTop}
             <br /> <br />
            <img src="/assets/images/addnewitem.svg" width={150} />
            <br />
            <br />{" "}
            <span className="text-success bolds">
                <i className="fa fa-arrow-left" /> 
                {props.titleBottom}
            </span>
            <div></div>
        </div>
    )
}

export default Nodata


Nodata.defaultProps = {
    titleTop: "No data available in table",
    titleBottom: "Add new record or search with different criteria.",
  }