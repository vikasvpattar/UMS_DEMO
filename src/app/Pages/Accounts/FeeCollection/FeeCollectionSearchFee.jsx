import React from 'react'

function FeeCollectionSearchFee() {
  return (
    <div className='FeeCollectionSearchFee'>
        <div className="main-content">
  <div className="page-content">
    <div className="container-fluid">
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0">Search Fees Payment</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);">Fee Collection</a>
                </li>
                <li className="breadcrumb-item active">Search Fees Payment</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      {/* end page title */}
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Select criteria</h2>
              <br />
              <form method="POST">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="validationCustom02">
                        Payment Id <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="pid"
                        id="pid"
                        placeholder="Enter Payment ID"
                        required="required"
                        defaultValue=""
                      />
                    </div>
                  </div>
                </div>
                <div className="row float-right ">
                  <button
                    className="btn btn-primary btn-rounded  "
                    type="submit"
                    name="submit"
                  >
                    <i className="fa fa-search" aria-hidden="true" /> Search
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* end card */}
        </div>
      </div>
      {/* container-fluid */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  {" "}
                  <h4 className="card-title">Payment Id Detail</h4>
                </div>
                <div className="col-md-8 ">
                  <span className="float-right">
                    <a href="#">
                      <i className="fa fa-file-pdf-o " aria-hidden="true" />
                    </a>{" "}
                    &nbsp;{" "}
                    <a href="#">
                      <i className="fa fa-file-excel-o" aria-hidden="true" />
                    </a>{" "}
                  </span>
                </div>
              </div>
              <hr />
              <div
                id="datatable_wrapper"
                className="dataTables_wrapper dt-bootstrap4 no-footer"
              >
                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <div className="dataTables_length" id="datatable_length">
                      <label>
                        Show{" "}
                        <select
                          name="datatable_length"
                          aria-controls="datatable"
                          className="custom-select custom-select-sm form-control form-control-sm"
                        >
                          <option value={10}>10</option>
                          <option value={25}>25</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </select>{" "}
                        entries
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <div id="datatable_filter" className="dataTables_filter">
                      <label>
                        Search:
                        <input
                          type="search"
                          className="form-control form-control-sm"
                          placeholder=""
                          aria-controls="datatable"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <table
                      id="datatable"
                      className="table table-bordered dt-responsive nowrap table-hover dataTable no-footer dtr-inline"
                      style={{
                        borderCollapse: "collapse",
                        borderSpacing: 0,
                        width: "100%"
                      }}
                      role="grid"
                      aria-describedby="datatable_info"
                    >
                      <thead>
                        <tr role="row">
                          <th
                            className="sorting_asc"
                            tabIndex={0}
                            aria-controls="datatable"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "129.005px" }}
                            aria-sort="ascending"
                            aria-label=" Payment ID: activate to sort column descending"
                          >
                            {" "}
                            Payment ID
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="datatable"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "62.0046px" }}
                            aria-label="Date: activate to sort column ascending"
                          >
                            Date
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="datatable"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "76.0046px" }}
                            aria-label="Name: activate to sort column ascending"
                          >
                            Name
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="datatable"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "70.0046px" }}
                            aria-label="Class: activate to sort column ascending"
                          >
                            Class
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="datatable"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "116.005px" }}
                            aria-label="Fee Group: activate to sort column ascending"
                          >
                            Fee Group
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="datatable"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "103.005px" }}
                            aria-label="Fee Type: activate to sort column ascending"
                          >
                            Fee Type
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="datatable"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "96.0046px" }}
                            aria-label="Amount: activate to sort column ascending"
                          >
                            Amount
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="datatable"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "103.005px" }}
                            aria-label="Discount: activate to sort column ascending"
                          >
                            Discount
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="datatable"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "56.0046px" }}
                            aria-label="Fine: activate to sort column ascending"
                          >
                            Fine
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="datatable"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "80.0046px" }}
                            aria-label="Action: activate to sort column ascending"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* <tr> <td colspan="9">
                          <div align="center" class="text-danger">No data available in table <br> <br><img src="assets/images/addnewitem.svg" width="150"><br><br> <span class="text-success bolds"><i class="fa fa-arrow-left"></i> Add new record or search with different criteria.</span><div></div></div>
                          </tr> </td> </tbody> */}
                        <tr className="odd">
                          <td
                            valign="top"
                            colSpan={10}
                            className="dataTables_empty"
                          >
                            No data available in table
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 col-md-5">
                    <div
                      className="dataTables_info"
                      id="datatable_info"
                      role="status"
                      aria-live="polite"
                    >
                      Showing 0 to 0 of 0 entries
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-7">
                    <div
                      className="dataTables_paginate paging_simple_numbers"
                      id="datatable_paginate"
                    >
                      <ul className="pagination pagination-rounded">
                        <li
                          className="paginate_button page-item previous disabled"
                          id="datatable_previous"
                        >
                          <a
                            href="#"
                            aria-controls="datatable"
                            data-dt-idx={0}
                            tabIndex={0}
                            className="page-link"
                          >
                            <i className="mdi mdi-chevron-left" />
                          </a>
                        </li>
                        <li
                          className="paginate_button page-item next disabled"
                          id="datatable_next"
                        >
                          <a
                            href="#"
                            aria-controls="datatable"
                            data-dt-idx={1}
                            tabIndex={0}
                            className="page-link"
                          >
                            <i className="mdi mdi-chevron-right" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* end col */}
      </div>{" "}
      {/* end row */}
    </div>
    {/* End Page-content */}
  </div>
  {/* end main content*/}
</div>

    </div>
  )
}

export default FeeCollectionSearchFee