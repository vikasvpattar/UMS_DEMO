import React from 'react'

function ModalStudentProfileUpload() {
    return (
        <div>
            <div
                className="modal fade"
                id="document"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center" id="exampleModalLabel">
                                Upload Document
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form action="">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">
                                        Title <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleFormControlInput1"
                                        placeholder="Enter Document Name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">
                                        {" "}
                                        Document<span style={{ color: "red" }}>*</span>
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="exampleFormControlInput1"
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ModalStudentProfileUpload