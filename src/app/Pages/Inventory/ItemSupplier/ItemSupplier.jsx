import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { INVENTORY_ITEM_SUPPLIER } from "../../../utils/Inventory.apiConst";

function Itemsupplier({ setLoading, collegeId }) {
  const [user, setUser] = useState({
    item_supplier_name: "",
    item_supplier_phone: "",
    item_supplier_email: "",
    item_supplier_address: "",
    contact_person_name: "",
    contact_person_phone: "",
    contact_person_email: "",
    contact_person_desc: "",
  });

  const [data, setData] = useState([]);

  const [edit, setEdit] = useState(0);
  const [editId, setEditId] = useState();

  const clearData = () => {
    setUser({
      item_supplier_name: "",
      item_supplier_phone: "",
      item_supplier_email: "",
      item_supplier_address: "",
      contact_person_name: "",
      contact_person_phone: "",
      contact_person_email: "",
      contact_person_desc: "",
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
    if (!user?.item_supplier_name)
      return toast.error("Item Supplier Name  is required");
    if (!user?.contact_person_name)
      return toast.error("Item Supplier Person Name  is required");

    setLoading(1);
    const config = {
      method: "put",
      url: `${INVENTORY_ITEM_SUPPLIER}/${editId}`,
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
        toast.error("Something went wrong");
      });
  };

  const getdata = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${INVENTORY_ITEM_SUPPLIER}?college_id=${collegeId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        setLoading(0);
        console.log("Supplier Data",res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something Went Wrong");
      });
  };

  const handleSubmit = () => {

    const config = {
      method: "post",
      url: `${INVENTORY_ITEM_SUPPLIER}`,
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
      url: `${INVENTORY_ITEM_SUPPLIER}/${id}`,
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
    <div ClassName="Itemsupplier">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Add Item Supplier</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Inventory</a>
                      </li>
                      <li className="breadcrumb-item active"> Item Supplier</li>
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
                      <div className="col-md-3">
                        <div className="form-group has-validation">
                          <label>
                            Name<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="item_supplier_name"
                            id="supiler_name"
                            placeholder="Enter Item Suplier Name"
                            required="required"
                            onChange={handleChange}
                            value={user.item_supplier_name}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label>Phone</label>
                          <input
                            type="number"
                            className="form-control"
                            onkeypress="if(this.value.length==10) return false;"
                            name="item_supplier_phone"
                            id="supiler_contact"
                            placeholder="Enter Contact Number"
                            onChange={handleChange}
                            value={user.item_supplier_phone}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            name="item_supplier_email"
                            id="supiler_email"
                            placeholder="Enter Email Id"
                            onChange={handleChange}
                            value={user.item_supplier_email}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label>Address</label>
                          <textarea
                            name="item_supplier_address"
                            id=""
                            cols={1}
                            rows={1}
                            className="form-control"
                            defaultValue={""}
                            onChange={handleChange}
                            value={user.item_supplier_address}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label>
                            Contact Person Name
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="contact_person_name"
                            id="person_name"
                            placeholder="Enter Contact Person Name"
                            required="required"
                            onChange={handleChange}
                            value={user.contact_person_name}
                          />
                          <div className="invalid-feedback">
                            Please Provide Contact Person Name.
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label> Contact Person Phone</label>
                          <input
                            type="number"
                            onkeypress="if(this.value.length==10) return false;"
                            className="form-control"
                            name="contact_person_phone"
                            id="person_contact"
                            placeholder="Enter Contact Number"
                            onChange={handleChange}
                            value={user.contact_person_phone}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label> Contact Person Email</label>
                          <input
                            type="email"
                            className="form-control"
                            name="contact_person_email"
                            id="person_email"
                            placeholder="Enter Email Address"
                            onChange={handleChange}
                            value={user.contact_person_email}
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
                            name="contact_person_desc"
                            id="description"
                            cols={30}
                            rows={1}
                            defaultValue={""}
                            onChange={handleChange}
                            value={user.contact_person_desc}
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
                        <h4 className="card-title">Item Suplier Lists</h4>
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
                          <th>Item Supplier</th>
                          <th>Contact Person</th>
                          <th>Address</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data &&
                          data?.map((data, key) => {
                            return (
                              <tr key={key}>
                                <td>{key + 1}</td>
                                <td>
                                  {" "}
                                  <b>{data.item_supplier_name}</b>{" "}
                                  <ol>
                                    {" "}
                                    <br />
                                    <li>
                                      {" "}
                                      <b>Contact Number:</b>{" "}
                                      {data.item_supplier_phone}
                                    </li>{" "}
                                    <br />
                                    <li>
                                      {" "}
                                      <b>Email:</b> {data.item_supplier_email}
                                    </li>
                                  </ol>
                                </td>

                                <td
                                  data-toggle="tooltip"
                                  title={data.contact_person_desc}
                                >
                                  <b>{data.contact_person_name}</b> <br />
                                  <ol>
                                    <li>
                                      <b>Contact Number:</b>{" "}
                                      {data.contact_person_phone}
                                    </li>{" "}
                                    <br />
                                    <li>
                                      <b>Email:</b> {data.contact_person_email}
                                    </li>
                                    {/* <li>{data.contact_person_desc}</li> */}
                                  </ol>
                                </td>
                                <td>{data.item_supplier_address}</td>
                                <td>
                                  <span
                                    className="badge badge-light text-dark mr-3"
                                    data-toggle="tooltip"
                                    title="Edit"
                                    onClick={() => {
                                      setUser({
                                        item_supplier_name:
                                          data?.item_supplier_name,
                                        item_supplier_phone:
                                          data?.item_supplier_phone,
                                        item_supplier_email:
                                          data?.item_supplier_email,
                                        item_supplier_address:
                                          data?.item_supplier_address,
                                        contact_person_name:
                                          data?.contact_person_name,
                                        contact_person_phone:
                                          data?.contact_person_phone,
                                        contact_person_email:
                                          data?.contact_person_email,
                                        contact_person_desc:
                                          data?.contact_person_desc,
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

export default Itemsupplier;
