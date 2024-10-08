import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { INVENTORY_ITEM_CATEGORY } from "../../../utils/Inventory.apiConst";

function ItemCategory({ setLoading, collegeId }) {
  const [user, setUser] = useState({
    item_category_name: "",
    item_category_desc: "",
  });

  const [data, setData] = useState([]);

  const [edit, setEdit] = useState(0);
  const [editId, setEditId] = useState();

  const clearData = () => {
    setUser({
      item_category_name: "",
      item_category_desc: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    if (!user?.item_category_name)
      return toast.error("Please add category name ");

    setLoading(1);
    const config = {
      method: "put",
      url: `${INVENTORY_ITEM_CATEGORY}/${editId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user,
      },
    };

    axios(config)
      .then((res) => {
        setLoading(0);
        getdata();
        clearData();
        toast.success("Success");
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  const getdata = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${INVENTORY_ITEM_CATEGORY}?college_id=${collegeId}`,
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

  const handleSubmit = () => {
    if (!user.item_category_name)
      return toast.error("Please add category name");

    const config = {
      method: "post",
      url: `${INVENTORY_ITEM_CATEGORY}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user,
        college_id: collegeId,
      },
    };

    axios(config)
      .then((res) => {
        setLoading(0);
        toast.success("Success");
        getdata();
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something Went Wrong");
      });
  };

  const handleDelete = (id) => {
    const config = {
      method: "put",
      url: `${INVENTORY_ITEM_CATEGORY}/${id}`,
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
        setLoading(0);
        getdata();
        toast.error("Something Went Wrong");
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div ClassName="Itemcategory">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Add Item Category</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Inventory</a>
                      </li>
                      <li className="breadcrumb-item active"> Item Category</li>
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
                    <h2 className="card-title">Add Criteria</h2>
                    <br />
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>
                            Item Category<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="item_category_name"
                            value={user.item_category_name}
                            placeholder="Enter Item Category "
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Description
                          </label>
                          <textarea
                            className="form-control"
                            name="item_category_desc"
                            value={user.item_category_desc}
                            onChange={handleChange}
                            cols={30}
                            rows={1}
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-md-12 ">
                        {edit ? (
                          <button
                            className="btn btn-nex btn-rounded float-right  "
                            type="submit"
                            name="submit"
                            onClick={(e) => handleEdit(e)}
                          >
                            Save Changes
                          </button>
                        ) : (
                          <button
                            className="btn btn-nex btn-rounded float-right  "
                            type="submit"
                            name="submit"
                            onClick={(e) => handleSubmit(e)}
                          >
                            <i className="fa fa-save" aria-hidden="true" /> Save
                          </button>
                        )}
                      </div>
                    </div>
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
                        <h4 className="card-title">Item Category Lists</h4>
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
                          <th>Item Category</th>
                          <th>Description</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data &&
                          data?.map((data, key) => {
                            return (
                              <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{data.item_category_name}</td>
                                <td> {data.item_category_desc}</td>

                                <td>
                                  <span
                                    className="badge badge-light text-dark mr-3"
                                    data-toggle="tooltip"
                                    title="Edit"
                                    onClick={() => {
                                      setUser({
                                        item_category_name:
                                          data?.item_category_name,
                                        item_category_desc:
                                          data?.item_category_desc,
                                      });
                                      setEdit(1);
                                      setEditId(data?.id);
                                    }}
                                  >
                                    {" "}
                                    <i
                                      class="fa fa-edit "
                                      aria-hidden="true"
                                    ></i>
                                  </span>
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

export default ItemCategory;
