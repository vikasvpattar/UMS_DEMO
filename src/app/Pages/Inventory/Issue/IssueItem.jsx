import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useEmployee from "../../../Hooks/Employee/useEmployee";
import {
  INVENTORY_ADD_ITEM,
  INVENTORY_ISSUE_ITEM,
  INVENTORY_ITEM_CATEGORY,
  INVENTORY_GET_ITEM_BYID,
  INVENTORY_ISSUE_ITEM_BYID,
} from "../../../utils/Inventory.apiConst";
import {
  ALL_DATA,
  LOCAL_COLLEGE,
  LOCAL_JOBROLES,
} from "../../../utils/LocalStorageConstants";
import { SESSION_ROLE } from "../../../utils/sessionStorageContants";

function IssueItem({ setLoading, collegeId }) {
  const [employee] = useEmployee(collegeId);

  const userRole = sessionStorage.getItem(SESSION_ROLE);
  const [user, setUser] = useState({
    issue_usertype_id: "",
    issue_to_id: "",
    issue_by_id: userRole,
    issue_date: "",
    return_date: "",
    issue_note: "",
    issue_itemcategory_id: "",
    issue_item_id: "",
    issue_quantity: "",
  });
  const [data, setData] = useState([]);
  const [itemCategory, setItemCategory] = useState([]);
  const [items, setItems] = useState([]);
  const [itemid, setItemid] = useState();
  const [stocks, setStocks] = useState();

  const [edit, setEdit] = useState(0);
  const [editId, setEditId] = useState();

  const clearData = () => {
    setUser({
      issue_usertype_id: "",
      issue_to_id: "",
      issue_by_id: userRole,
      issue_date: "",
      return_date: "",
      issue_note: "",
      issue_itemcategory_id: "",
      issue_item_id: "",
      issue_quantity: "",
    });
  };

  const departmentOptions = JSON.parse(
    localStorage.getItem(ALL_DATA)
  )?.department;
  const userRolesOpt = JSON.parse(localStorage.getItem(ALL_DATA))?.userRoles;
  const collegesOpt = JSON.parse(localStorage.getItem(LOCAL_COLLEGE));
  const jobPositionOpt = JSON.parse(localStorage.getItem(LOCAL_JOBROLES));

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));

    console.log(user);
  };

  const handleEdit = () => {
    setLoading(1);
    const config = {
      method: "put",
      url: `${INVENTORY_ISSUE_ITEM}/${editId}`,
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
      url: `${INVENTORY_ISSUE_ITEM_BYID}/${user?.issue_item_id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res.data.data);
        setLoading(0);

        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(0);
        // toast.error("Something Went Wrong");
      });

    const config1 = {
      method: "get",
      url: `${INVENTORY_GET_ITEM_BYID}/${user?.issue_item_id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config1)
      .then((res) => {
        console.log(res.data.data);
        setLoading(0);
        // setStocks(res.data.data[0].add_item_stock);
      })
      .catch((err) => {
        console.log(err);
        setLoading(0);
        // toast.error("Something Went Wrong");
      });
  };

  // get Item Category

  const getdataItemCategory = async () => {
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
      url: `${INVENTORY_ITEM_CATEGORY}`,
    })
      .then((res) => {
        setLoading(0);
        setItemCategory(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Somethin went wrong");
      });
  };

  useEffect(() => {
    getdataItemCategory();
  }, []);

  useEffect(() => {
    if (user?.issue_itemcategory_id) getdata();
    else setData([]);
  }, [user?.issue_itemcategory_id]);

  // get ItemS

  const getdataItems = async () => {
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
      url: `${INVENTORY_ADD_ITEM}`,
    })
      .then((res) => {
        setLoading(0);
        setItems(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Somethin went wrong");
      });
  };

  useEffect(() => {
    getdataItems();
  }, []);

  useEffect(() => {
    if (user?.issue_item_id) getdata();
    else setData([]);
  }, [user?.issue_item_id]);

  const handleSubmit = () => {
    const config = {
      method: "post",
      url: `${INVENTORY_ISSUE_ITEM}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user,
        issue_by_id: userRole,
      },
    };

    axios(config)
      .then((res) => {
        console.log(res);
        setLoading(0);
        toast.success("Success");
        getdata();
      })
      .catch((err) => {
        console.log(err);
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
        console.log(res);
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
                  <h4 className="mb-0">Issue Item</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Inventory</a>
                      </li>
                      <li className="breadcrumb-item active"> Issue Item </li>
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
                    <h2 className="card-title">Select Creteria</h2>
                    <br />

                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>
                            User Type<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            id="role"
                            name="issue_usertype_id"
                            className="form-control"
                            required=""
                            onChange={handleChange}
                            value={user?.issue_usertype_id}
                          >
                            <option value="" selected>
                              {" "}
                              Select User Type
                            </option>
                            {jobPositionOpt?.map((i, key) => (
                              <option value={i.id} key={i.id}>
                                {i.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>
                            Issue To<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            id="role"
                            name="issue_to_id"
                            className="form-control"
                            required=""
                            onChange={handleChange}
                            value={user?.issue_to_id}
                          >
                            <option value="" selected>
                              {" "}
                              Select Issue to
                            </option>
                            {employee
                              ?.filter(
                                (s) => s?.role == user?.issue_usertype_id
                              )
                              ?.map((i, key) => (
                                <option value={i.id} key={i.id}>
                                  {i?.first_name + " " + i?.last_name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                      {/* <div className="col-md-4">
              <div className="form-group">
                <label>
                  Issue By<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="by"
                  id="by"
                  className="form-control"
                  required=""
                  wtx-context="77946B6F-A98F-478E-83C8-A6B32754C55C"
                >
                  <option value="">Select Issue to</option>
                  <option value=""> Admin</option>
                </select>
              </div>
            </div> */}
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>
                            Issue Date <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            onChange={handleChange}
                            name="issue_date"
                            id="issue_date"
                            placeholder="Enter Email Address"
                            required=""
                            wtx-context="0879542D-53FF-42C4-8360-7D9F79864275"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Return Date </label>
                          <input
                            type="date"
                            className="form-control"
                            onChange={handleChange}
                            name="return_date"
                            id="return_date"
                            placeholder="Enter Email Address"
                            required=""
                            wtx-context="22681A88-0DA9-46F7-AE1B-66BC0A1240F7"
                          />
                        </div>
                      </div>{" "}
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Note</label>
                          <textarea
                            onChange={handleChange}
                            name="issue_note"
                            id=""
                            cols={1}
                            rows={1}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>
                            Item Category<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="issue_itemcategory_id"
                            id="issue_itemcategory_id"
                            className="form-control"
                            value={user?.issue_itemcategory_id}
                            onChange={handleChange}
                          >
                            <option value="">Select Item Category</option>
                            {itemCategory?.map((i, key) => (
                              <option value={i.id} key={key}>
                                {i.item_category_name}
                              </option>
                            ))}
                          </select>{" "}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>
                            Item <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="issue_item_id"
                            id="issue_item_id"
                            className="form-control"
                            value={user?.item_name}
                            onChange={handleChange}
                          >
                            <option value="">Select Items</option>
                            {items?.map((i, key) => (
                              <option value={i.addItem.id} key={key}>
                                {i.addItem.item_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>
                            Quantity<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="issue_quantity"
                            id="quantity"
                            onChange={handleChange}
                            placeholder="Enter Quantity"
                            required=""
                            wtx-context="6F709C20-DB87-42D7-9A4D-2D16DB018B82"
                          />
                          <small>Availabel :11</small>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueItem;
