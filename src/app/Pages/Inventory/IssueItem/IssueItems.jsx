import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ROUTES } from "../../../Router/routerConfig";
import { useNavigate } from "react-router-dom";
import { INVENTORY_ISSUE_ITEM } from "../../../utils/Inventory.apiConst";
import { SESSION_ROLE } from "../../../utils/sessionStorageContants";

function IssueItems({ setLoading, collegeId }) {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const getdata = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${INVENTORY_ISSUE_ITEM}?college_id=${collegeId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        setLoading(0);
        setData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something Went Wrong");
      });
  };

  const handleDelete = (id) => {
    const config = {
      method: "put",
      url: `${INVENTORY_ISSUE_ITEM}/${id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        status: "INACTIVE",
      },
    };

    axios(config)
      .then((res) => {
        setLoading(0);
        getdata();
        toast.success("Success");
      })
      .catch((err) => {
        console.log(err);
        setLoading(0);
        getdata();
        toast.error("Something Went Wrong");
      });
  };

  const move = () => {
    navigate(ROUTES.Registar.Inventory.IssueItem);
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div ClassName="IssueItem">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Issue Item List</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Inventory</a>
                      </li>
                      <li className="breadcrumb-item active">
                        {" "}
                        Issue Item List
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            {/* end page title */}
            <div className="row ">
              <div className="col-md-12 ">
                <button
                  href="javascript:void(0)"
                  onClick={() => move()}
                  className="btn btn-success btn-sm mb-2 float-right "
                >
                  Issue Item
                </button>
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
                        <h4 className="card-title">Issue Item Lists</h4>
                      </div>
                    </div>
                    <hr />
                    <table
                      id=""
                      className="table table-bordered dt-responsive nowrap table-hover "
                      style={{
                        borderCollapse: "collapse",
                        borderSpacing: 0,
                        width: "100%",
                      }}
                    >
                      <thead>
                        <tr>
                          <th> Sl. No.</th>
                          <th>Item</th>
                          <th>Item Category</th>
                          <th>Issue - Return</th>
                          <th>Issue To</th>
                          <th>Issue By</th>
                          <th>Quantity</th>
                          <th>Status</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data &&
                          data?.map((data, key) => {
                            return (
                              <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{data?.addItem.item_name}</td>
                                <td>
                                  {" "}
                                  {data?.itemCategory.item_category_name}
                                </td>
                                <td>
                                  {" "}
                                  {
                                    data?.fetchIssueItem.return_date?.split(
                                      "T"
                                    )[0]
                                  }
                                </td>
                                <td> {data?.fetchIssueItem.issue_to_id}</td>
                                <td> {data?.fetchIssueItem.issue_by_id}</td>
                                <td> {data?.fetchIssueItem.issue_quantity}</td>
                                <td>
                                  {" "}
                                  <span className="badge badge-soft-success">
                                    {" "}
                                    {data?.fetchIssueItem.item_status}
                                  </span>
                                </td>

                                <td>
                                  <span
                                    className="badge badge-light text-danger mr-3"
                                    data-toggle="tooltip"
                                    title="Delete"
                                    onClick={() => handleDelete(data?.id)}
                                  >
                                    {" "}
                                    <i
                                      class="fa fa-trash "
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        {/* <tr>
                    <td>1</td>
                    <td>Bat</td>
                    <td>Sports</td>
                    <td> 09/08/2021 - 09/12/2021</td>
                    <td>manju</td>
                    <td>Abishek </td>
                    <td>1</td>
                    <td>
                      <span className="badge badge-soft-success">Returned</span>{" "}
                      <a href="">
                        <span className="badge badge-soft-danger">
                          Click to Return
                        </span>
                      </a>
                    </td>
                    <td id="edit3" className="text-center">
                      {" "}
                      <a
                        className="badge badge-light text-danger "
                        data-toggle="tooltip"
                        title="Delete"
                        href="javascript:void(0)"
                      >
                        {" "}
                        <i className="fa fa-trash" aria-hidden="true" />{" "}
                      </a>{" "}
                    </td>
                  </tr> */}
                        {/* <tr> <td colspan="9">
                          <div align="center" class="text-danger">No data available in table <br> <br><img src="assets/images/addnewitem.svg" width="150"><br><br> <span class="text-success bolds"><i class="fa fa-arrow-left"></i> Add new record or search with different criteria.</span><div></div></div>
                          </tr> </td> </tbody> */}
                      </tbody>
                    </table>
                    <br />
                  </div>
                </div>
              </div>{" "}
              {/* end col */}
            </div>{" "}
            {/* end row */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueItems;
