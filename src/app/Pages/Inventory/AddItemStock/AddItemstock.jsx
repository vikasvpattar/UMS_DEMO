import axios from "axios";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  INVENTORY_ADD_ITEM,
  INVENTORY_ISSUE_ITEM,
  INVENTORY_ITEM_CATEGORY,
  INVENTORY_ITEM_SUPPLIER,
  INVENTORY_GET_ITEM,
} from "../../../utils/Inventory.apiConst";
import { getFileUrl } from "../../../Helpers/Helpers";
import { ASSET_EMPLOYEE_DOCUMENT } from "../../../utils/AssetsReferenceTypes";

function Additemstock({ setLoading, collegeId }) {
  const [unit, setUnit] = useState();
  const [flag, setFlag] = useState(false);
  const fileref = useRef(null);
  //all inventory tabular data
  const [attachment1, setAttachment1] = useState();
  const [data, setData] = useState([]);
  const [itemCategory, setItemCategory] = useState([]);
  const [items, setItems] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [stocks, setStocks] = useState([]);

  const [edit, setEdit] = useState(0);
  const [editId, setEditId] = useState();

  const [user, setUser] = useState({
    item_category_id: "",
    item_id: "",
    item_supplier_id: "",
    item_store_id: "",
    add_item_stock: "",
    add_item_price: "",
    add_item_purchase_date: "",
    add_item_document: "",
    add_item_desc: "",
  });

  const clearData = () => {
    setUser({
      issue_usertype_id: "",
      issue_to_id: "",
      issue_by_id: "",
      issue_date: "",
      return_date: "",
      issue_note: "",
      issue_itemcategory_id: "",
      item_store_id: "",
      issue_quantity: "",
    });
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFlag((flag) => !flag);
    setUser((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));

    let x =
      items &&
      items.filter(
        (s) =>
          parseInt(s.addItem.item_category_id) ==
          parseInt(user?.item_category_id)
      );

    let y;
    for (var i = 0; i < x.length; i++) {
      if (x[i].addItem.id == parseInt(user.item_id)) {
        console.log("Hello");
        y = x[i].addItem.item_unit;
        setUnit(y);
        break;
      }
    }
  };

  const handleEdit = () => {
    if (
      attachment1 == undefined ||
      !user.add_item_price ||
      !user.add_item_purchase_date ||
      !user.add_item_stock ||
      !user.item_category_id ||
      !user.item_id ||
      !user.item_supplier_id
    )
    {
      toast.error("Please Fill All Details !");
      return;
    }
      setLoading(1);
    console.log(editId);
    const config = {
      method: "put",
      url: `${INVENTORY_GET_ITEM}/${editId}`,
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
        setUser({
          item_category_id: "",
          item_id: "",
          item_supplier_id: "",
          item_store_id: "",
          add_item_stock: "",
          add_item_price: "",
          add_item_purchase_date: "",
          add_item_document: "",
          add_item_desc: "",
        });
        fileref.current.value = null;
        toast.success("Success");
      })
      .catch((err) => {
        console.log(err);
        setLoading(0);
        toast.error("Something went wrong");
      });
  };

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
        console.log(err);
        setLoading(0);
        // toast.error("Something Went Wrong");
      });

    const config1 = {
      method: "get",
      url: `${INVENTORY_GET_ITEM}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config1)
      .then((res) => {
        console.log(res.data.data);
        setStocks(res.data.data);
      })
      .catch((err) => {
        console.log(err);
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
        // toast.error("Somethin went wrong");
      });
  };

  useEffect(() => {
    getdataItemCategory();
  }, []);

  useEffect(() => {
    if (user?.item_category_id) {
      getdata();
    } else {
      setData([]);
    }
  }, [user?.item_category_id]);

  useEffect(() => {
    getdata();
  }, []);

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
      url: `${INVENTORY_ADD_ITEM}?college_id=${collegeId}`,
    })
      .then((res) => {
        setLoading(0);
        setItems(res.data.data);
        console.log("Item Data", res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        // toast.error("Somethin went wrong");
      });
  };

  useEffect(() => {
    getdataItems();
  }, []);

  useEffect(() => {
    if (user?.item_store_id) getdata();
    else setData([]);
  }, [user?.item_store_id]);

  //Get Supplier

  const getdataSupplier = async () => {
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
      url: `${INVENTORY_ITEM_SUPPLIER}?college_id=${collegeId}`,
    })
      .then((res) => {
        setLoading(0);
        setSupplier(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Somethin went wrong");
      });
  };

  useEffect(() => {
    getdataSupplier();
  }, []);

  useEffect(() => {
    if (user?.item_supplier_id) getdata();
    else setData([]);
  }, [user?.item_supplier_id]);

  const handleSubmit = () => {
    const config = {
      method: "post",
      url: `${INVENTORY_GET_ITEM}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: user,
    };

    axios(config)
      .then((res) => {
        console.log(res);
        setLoading(0);
        toast.success("Success");
        getdata();
        setAttachment1("");
        setUser({
          item_category_id: "",
          item_id: "",
          item_supplier_id: "",
          item_store_id: "",
          add_item_stock: "",
          add_item_price: "",
          add_item_purchase_date: "",
          add_item_document: "",
          add_item_desc: "",
        });
        fileref.current.value = null;
      })
      .catch((err) => {
        console.log(err);
        setLoading(0);
        toast.error("Something Went Wrong");
      });
  };

  const handleDelete = (id) => {
    console.log(id);
    const config = {
      method: "put",
      url: `${INVENTORY_GET_ITEM}/${id}`,
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

  const addAttachment1 = async (e) => {
    let empId = Math.floor(Math.random() * 100);
    try {
      setAttachment1(e.target.files[0]);
      const d = await getFileUrl(
        ASSET_EMPLOYEE_DOCUMENT,
        `${empId}_Leave_Application`,
        e.target.value.split(".")[1],
        setLoading,
        e.target.files[0]
      );
      setAttachment1("");
      user.add_item_document = d;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div ClassName="AddItemstock">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Add Item Stock</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Inventory</a>
                      </li>
                      <li className="breadcrumb-item active">
                        {" "}
                        Add Item Stock
                      </li>
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
                        <div className="form-group">
                          <label>
                            Item Category<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="item_category_id"
                            id="issue_itemcategory_id"
                            className="form-control"
                            value={user?.item_category_id}
                            onChange={(e) => handleChange(e)}
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
                      <div className="col-md-3">
                        <div className="form-group">
                          <label>
                            Item <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="item_id"
                            id="item_store_id"
                            className="form-control"
                            value={user?.item_id}
                            onChange={(e) => {
                              setFlag((flag) => !flag);
                              handleChange(e);
                            }}
                          >
                            <option value="">Select Items</option>
                            {items &&
                              items.map((i, key) => {
                                if (
                                  parseInt(user?.item_category_id) ===
                                  parseInt(i?.addItem?.item_category_id)
                                ) {
                                  return (
                                    <option value={i.addItem.id} key={key}>
                                      {i.addItem.item_name}
                                    </option>
                                  );
                                } else {
                                  return null;
                                }
                              })}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label> Supplier</label>
                          <select
                            name="item_supplier_id"
                            id="item_store_id"
                            className="form-control"
                            value={user?.item_supplier_id}
                            onChange={(e) => handleChange(e)}
                          >
                            <option value="">Select Items</option>
                            {supplier?.map((i, key) => (
                              <option value={i.id} key={key}>
                                {i.item_supplier_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label>
                            {" "}
                            Quantity <span style={{ color: "red" }}>
                              *
                            </span>{" "}
                            <span>({unit})</span>{" "}
                          </label>
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <select
                                className="form-control"
                                autoComplete="off"
                              >
                                <option value="+">+</option>
                                <option value="-">-</option>
                              </select>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              name="add_item_stock"
                              onChange={(e) => handleChange(e)}
                              id="quantity"
                              value={user?.add_item_stock}
                              placeholder="Enter Quantity"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label>
                            Purchase Price{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="add_item_price"
                            value={user?.add_item_price}
                            onChange={(e) => handleChange(e)}
                            id="price"
                            placeholder="Enter Purchase Price"
                            required="required"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label>Purchase Date </label>
                          <input
                            type="date"
                            className="form-control"
                            name="add_item_purchase_date"
                            value={user?.add_item_purchase_date}
                            onChange={(e) => handleChange(e)}
                            id="date"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label>Document </label>
                          <input
                            type="file"
                            className="form-control"
                            name="document"
                            ref={fileref}
                            onChange={(e) => addAttachment1(e)}
                            id="document"
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
                            name="add_item_desc"
                            value={user?.add_item_desc}
                            onChange={(e) => handleChange(e)}
                            id="description"
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
                            onClick={() => handleSubmit()}
                            name="submit"
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
                        <h4 className="card-title">Stock Lists</h4>
                      </div>
                      <div className="col-md-8 ">
                        <span className="float-right">
                          <a href="#" data-toggle="tooltip" title="PDF">
                            <i
                              className="fa fa-file-pdf-o "
                              aria-hidden="true"
                            />
                          </a>{" "}
                          &nbsp;{" "}
                          <a href="#" data-toggle="tooltip" title="Excel">
                            {" "}
                            <i
                              className="fa fa-file-excel-o"
                              aria-hidden="true"
                            />{" "}
                          </a>
                        </span>
                      </div>
                    </div>
                    <hr />
                    <table
                      id="datatable"
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
                          <th>Supplier</th>
                          <th>Store</th>
                          <th>Quantity</th>
                          <th>Purchase Price (Rs.)</th>
                          <th>Purchase Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stocks &&
                          stocks.map((item, key) => {
                            return (
                              <tr>
                                <td>{key + 1}</td>
                                <td>
                                  {item?.itemCategory?.item_category_name}
                                </td>
                                <td>
                                  {item?.itemSupplier?.item_supplier_name}
                                </td>
                                <td>Dummy Store</td>
                                <td>{item?.addItemStock?.add_item_stock}</td>
                                <td>{item?.addItemStock?.add_item_price}</td>
                                <td>
                                  {
                                    item?.addItemStock?.add_item_purchase_date.split(
                                      "T"
                                    )[0]
                                  }
                                </td>
                                <td id="edit3">
                                  {" "}
                                  <span
                                    data-toggle="tooltip"
                                    className="badge badge-light"
                                    title="Edit"
                                  >
                                    {" "}
                                    <i
                                      className="fa fa-edit "
                                      aria-hidden="true"
                                      style={{
                                        color: "blue",
                                        cursor: "pointer",
                                      }}
                                      onmouseover="this.style.color='orange'"
                                      onmouseout="this.style.color='blue'"
                                      onClick={() => {
                                        setUser({
                                          item_category_id:
                                            item?.itemCategory?.id,
                                          item_id: item?.addItem?.id,
                                          item_supplier_id:
                                            item?.itemSupplier?.id,
                                          item_store_id: item?.itemStore?.id,
                                          add_item_stock:
                                            item?.addItemStock?.add_item_stock,
                                          add_item_price:
                                            item?.addItemStock?.add_item_price,
                                          add_item_purchase_date:
                                            item?.addItemStock?.add_item_purchase_date.split(
                                              "T"
                                            )[0],
                                          add_item_document: fileref,
                                          add_item_desc:
                                            item?.addItemStock?.add_item_desc,
                                        });
                                        setEdit(1);
                                        setEditId(item?.addItemStock?.id);
                                      }}
                                    />
                                  </span>{" "}
                                  &nbsp;{" "}
                                  <a
                                    className="badge badge-light text-danger "
                                    data-toggle="tooltip"
                                    title="Delete"
                                    href="javascript:void(0)"
                                  >
                                    {" "}
                                    <i
                                      className="fa fa-trash"
                                      aria-hidden="true"
                                      onClick={() =>
                                        handleDelete(item?.addItemStock?.id)
                                      }
                                    />{" "}
                                  </a>{" "}
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

export default Additemstock;
