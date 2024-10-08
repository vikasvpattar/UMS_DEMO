import React from 'react'

function ViewLessonPlan({data, timeTabledata}) {
  return (
    <div>
        <>
  {/*  Edit Lesson Plan*/}
  <div
    className="modal fade bs-view-modal-xl "
    tabIndex={-1}
    role="dialog"
    aria-labelledby="myExtraLargeModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-xl">
      <div className="modal-content">
        <div className="modal-header">
          <div className="col-md-12 d-flex">
            <h5
              className="modal-title mt-0 mr-auto"
              id="myExtraLargeModalLabel"
            >
              Lesson Plan
            </h5>
            <a
              href=""
              className="text-danger"
              data-toggle="tooltip"
              title="Print"
            >
              {" "}
              <i className="ri-printer-line" />
            </a>
          </div>
        </div>
        <div className="modal-body">
          <table
            className="table table-bordered pt15 mb0"
            id="headerTableModal"
          >
            <tbody>
              <tr>
                <th>Class</th>
                <td>{timeTabledata?.class_id}</td>
              </tr>
              <tr>
                <th>Subject</th>
                <td>{data?.course_id}</td>
              </tr>
              <tr>
                <th>Date</th>
                <td>{data?.date.split("T")[0]}</td>
              </tr>
              <tr>
                <th>Lesson</th>
                <td>{data?.lesson_id}</td>
              </tr>
              <tr>
                <th>Topic</th>
                <td>{data?.topic_id}</td>
              </tr>
              <tr>
                <th>Sub Topic</th>
                <td >{data?.subtopic}</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <b>General Objectives</b> : {data?.general_objectives}
                  <br />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <b>Teaching Method </b>: {data?.teaching_method}
                  <br />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <b>Previous Knowledge</b> : {data?.previous_knowledge}
                  <br />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <b>Comprehensive Questions</b> : {data?.comprehensive_questions}
                  <br />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <b>Presentation</b> : {data?.presentation}
                  <br />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary">
            Save changes
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
      {/* /.modal-content */}
    </div>
    {/* /.modal-dialog */}
  </div>
  {/* /.modal */}
</>

    </div>
  )
}

export default ViewLessonPlan