import React from 'react'

const StudentProfileSwitches = ({tab,setTab}) => {
    const data=[
        'Basic',
        'College Details',
        // 'Fee',
        'Documents',
        'Status'
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
                {/* <li className="nav-item">
                    <a
                        className="nav-link"
                        id="contact-tab"
                        data-toggle="tab"
                        href="#contact"
                        role="tab"
                        aria-controls="contact"
                        aria-selected="false"
                    >
                        Documents
                    </a>
                </li>
                <li style={{ float: "right" }}>
                    {" "}
                    <abb title="Edit Details">
                        {" "}
                        <a
                            className="nav-link "
                            href="javascript:void(0)"
                        >
                            <i className="fa fa-edit" />
                        </a>
                    </abb>
                </li>
                <li style={{ float: "right" }}>
                    {" "}
                    <abb title="Login Details">
                        {" "}
                        <a
                            className="nav-link "
                            data-toggle="modal"
                            data-target="#login"
                            href="#edit"
                        >
                            <i className="fa fa-key" />
                        </a>
                    </abb>
                </li>
                <li style={{ float: "right" }}>
                    {" "}
                    <abb title="Disable Student">
                        {" "}
                        <a
                            className="nav-link  "
                            data-toggle="modal"
                            data-target="#disable"
                            href="#edit"
                            role="button"
                            id="dropdownMenuLink"
                        >
                            <i
                                className="fa fa-thumbs-down"
                                style={{ color: "red" }}
                            />
                        </a>
                    </abb>
                </li>
                <li style={{ float: "right" }}>
                    <div className="dropdown show">
                        <a
                            className="nav-link dropdown-toggle  "
                            href="#"
                            role="button"
                            id="dropdownMenuLink"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className="fa fa-ellipsis-v" />
                        </a>
                        <div
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuLink"
                        >
                            <a className="dropdown-item" href="#">
                                Send Student Password
                            </a>
                            <a className="dropdown-item" href="#">
                                Send Parents Password
                            </a>
                        </div>
                    </div>
                </li>
                <li style={{ float: "right" }}>
                    {" "}
                    <abb title="Disable Student">
                        {" "}
                        <a
                            className="nav-link  "
                            href="#edit"
                            role="button"
                            id="dropdownMenuLink"
                            data-toggle="dropdown"
                        >
                            <i
                                className="fa fa-thumbs-up"
                                style={{ color: "green" }}
                            />
                        </a>
                    </abb>
                </li>
                <li style={{ float: "right" }}>
                    {" "}
                    <abb title="Disable Student">
                        {" "}
                        <a
                            className="nav-link right-bar-toggle "
                            href="#edit"
                            role="button"
                            id="dropdownMenuLink"
                            data-toggle="dropdown"
                        >
                            <i className="fas fa-align-justify" />
                        </a>
                    </abb>
                </li> */}
            </ul>
        </div>
    )
}

export default StudentProfileSwitches