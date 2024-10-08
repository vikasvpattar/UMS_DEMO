import React from 'react'

function OffCanvasStudentProfile() {
    return (
                <div className="right-bar">
                    <div data-simplebar="" className="h-100">
                        <div className="rightbar-title px-3 py-4">
                            <a href="javascript:void(0);" className="right-bar-toggle float-right">
                                <i className="mdi mdi-close noti-icon" />
                            </a>
                            <div className="row">
                                <h5 className=" text-center text-primary m-0">
                                    {/*?= $std_res['class_id']?*/}
                                </h5>{" "}
                                &nbsp; &nbsp; &nbsp;(
                                <h5 className="text-center text-danger mb-0">
                                    {/*?= $std_res['section_id']?*/}
                                </h5>
                                )
                            </div>
                        </div>
                        getStudentbyclass($std_res['class_id'],$std_res['section_id']); ?&gt;
                        {/* Settings */}
                        <hr className="mt-0" />
                        <div className="p-4">
                            <div className="row">
                                <div className="col-md-3">
                                    <a className="" href="#">
                                        <img
                                            src="assets/images/profile.png"
                                            className="rounded-circle"
                                            width="80%"
                                            alt="User Image"
                                        />
                                        <img
                                            src="<?= $res['image']?>"
                                            className="rounded-circle"
                                            width="80%"
                                            alt="User Image"
                                            style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: "80%",
                                                alignSelf: "center"
                                            }}
                                        />
                                    </a>
                                </div>
                                <a className="" href="#"></a>
                                <div className="col-md-9 ">
                                    <a className="" href="#">
                                        <p>
                                            First Name and Last Name is Here
                                        </p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default OffCanvasStudentProfile