import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  INVENTORY_ADD_ITEM,
  INVENTORY_ITEM_CATEGORY,
} from "../../../utils/Inventory.apiConst";

function AddItem({ setLoading, collegeId }) {
  const [user, setUser] = useState({
    item_name: "",
    item_category_id: "",
    item_unit: "",
    item_desc: "",
  });

  const [data, setData] = useState([]);

  const [edit, setEdit] = useState(0);
  const [categoryData, setCategoryData] = useState([]);

  const [editId, setEditId] = useState();

  const clearData = () => {
    setUser({
      item_name: "",
      item_category_id: "",
      item_unit: "",
      item_desc: "",
    });
  };

  const getdataCategoryData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };
    await axios({
      ...config,
      url: `${INVENTORY_ITEM_CATEGORY}?college_id=${collegeId}`,
    })
      .then((res) => {
        setLoading(0);
        console.log(res.data.data);
        setCategoryData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        // toast.error("Something went wrong");
        console.log(err);
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
    if (!user?.item_name || !user?.item_category_id || !user?.item_unit) return toast.error("Please add all required details");

    console.log(editId);
    setLoading(1);
    const config = {
      method: "put",
      url: `${INVENTORY_ADD_ITEM}/${editId}`,
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
      url: `${INVENTORY_ADD_ITEM}?college_id=${collegeId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        setLoading(0);
        setData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something Went Wrong");
      });
  };

  const handleSubmit = () => {
    if (!user.item_name) return toast.error("Please add item name");

    const config = {
      method: "post",
      url: `${INVENTORY_ADD_ITEM}`,
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
    console.log(id);
    const config = {
      method: "put",
      url: `${INVENTORY_ADD_ITEM}/${id}`,
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

  useEffect(() => {
    getdataCategoryData();
  }, []);
  useEffect(() => {
    if (user?.item_category_id) getdata();
    else setData([]);
  }, [user?.item_category_id]);

  return (
    <div ClassName="AddItem">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Add Item </h4>
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
                    <form
                      className="needs-validation"
                      noValidate=""
                      method="POST"
                      action="javascript:void(0)"
                    >
                      <div className="row">
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>
                              Add Item <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="item_name"
                              id="item_name"
                              placeholder="Enter Item Name "
                              required="required"
                              onChange={handleChange}
                              value={user.item_name}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>
                              Select Item Category{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              name="item_category_id"
                              id="item_category_id"
                              className="form-control"
                              required=""
                              onChange={handleChange}
                              value={user.item_category_id}
                            >
                              <option value="">Select Category</option>
                              {categoryData?.map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.item_category_name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>
                              Unit<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="item_unit"
                              id="unit"
                              placeholder="Enter Uint "
                              required="required"
                              onChange={handleChange}
                              value={user.item_unit}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">
                              Description
                            </label>
                            <textarea
                              className="form-control"
                              name="item_desc"
                              id="description"
                              cols={30}
                              rows={1}
                              defaultValue={""}
                              onChange={handleChange}
                              value={user.item_desc}
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
                              <i className="fa fa-save" aria-hidden="true" />{" "}
                              Save
                            </button>
                          )}
                        </div>
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
                        <h4 className="card-title">Item Lists</h4>
                      </div>
                      <div className="col-md-8 ">
                        <span className="float-right">
                          <acronym title="PDF">
                            {" "}
                            <a href="#">
                              <i
                                className="fa fa-file-pdf-o "
                                aria-hidden="true"
                              />
                            </a>
                          </acronym>
                          <a href="#"> </a> &nbsp;{" "}
                          <acronym title="Excel">
                            <a href="#">
                              {" "}
                              <i
                                className="fa fa-file-excel-o"
                                aria-hidden="true"
                              />
                            </a>
                          </acronym>
                          <a href="#"> </a>
                        </span>
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
                          <th>Item Name</th>
                          <th>Item Category</th>
                          <th>Unit</th>
                          <th>Available Quantity</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data &&
                          data?.map((data1, key) => {
                            return (
                              <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{data1.addItem.item_name}</td>
                                <td> {data1.itemCategory.item_category_name}</td>
                                <td> {data1.addItem.item_unit}</td>
                                <td></td>

                                <td>
                                  <span
                                    className="badge badge-light text-dark mr-3"
                                    data-toggle="tooltip"
                                    title="Edit"
                                    onClick={() => {
                                      setUser({
                                        item_name: data1?.addItem.item_name,
                                        item_category_id: data1?.itemCategory.id,
                                        item_unit: data1?.addItem.item_unit,
                                        item_desc: data1?.addItem.item_desc,
                                      });
                                      setEdit(1);
                                      setEditId(data1?.addItem?.id);
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
                                    onClick={() => handleDelete(data1?.addItem?.id)}
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

export default AddItem;
