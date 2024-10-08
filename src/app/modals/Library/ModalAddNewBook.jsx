import axios from "axios";
import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getFileUrl } from "../../Helpers/Helpers";
import { ASSET_EMPLOYEE_DOCUMENT } from "../../utils/AssetsReferenceTypes";
import { LIBRARY_ADD_NEW_BOOK } from "../../utils/Library.apiConst";
import { useRef } from "react";
import { LOCAL_DEPARTMENT } from "../../utils/LocalStorageConstants";
import { BarcodeCollegeMap } from "../../Data/jsonData/Library/Library";

function ModalAddNewBook({ setLoading, collegeId, reloadData, data }) {
  const departmentOpt = useMemo(
    () =>
      JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT)).filter(
        (s) => s.college_id == collegeId
      ),
    [collegeId]
  );
  const fileref = useRef(null);
  const date = new Date();
  const todayDate = date.getDate();
  date.setDate(todayDate);
  const defaultValue = date.toLocaleDateString("en-IN");
  const [user, setUser] = useState({
    book_title: "",
    book_author_one: "",
    book_author_two: "",
    book_author_three: "",
    book_author_four: "",
    book_author_five: "",
    book_rack: "",
    book_row: "",
    book_edition: "",
    book_volume: "",
    book_pages: "",
    book_cost: "",
    book_bill_date: "",
    book_copyright: "",
    book_publication: "",
    book_publisher: "",
    book_isbn: "",
    book_copies: "",
    book_status: "New",
    book_barcode: "",
    book_category_id: 1,
    book_date_added: defaultValue,
    book_image: "",
    book_acc_no: "",
    book_clasification_no: "",
    department_id: "",
  });

  //Function upload attachment to the s3
  const addAttachment = async (e) => {
    try {
      const d = await getFileUrl(
        ASSET_EMPLOYEE_DOCUMENT,
        `Library_Books`,
        e.target.value.split(".")[1],
        setLoading,
        e.target.files[0]
      );
      setUser((prev) => ({
        ...prev,
        book_image: d ? d : "",
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const [edit, setEdit] = useState(0);
  const [editId, setEditId] = useState();

  const clearData = () => {
    setUser({
      book_title: "",
      book_author_one: "",
      book_author_two: "",
      book_author_three: "",
      book_author_four: "",
      book_author_five: "",
      book_rack: "",
      book_row: "",
      book_edition: "",
      book_volume: "",
      book_pages: "",
      book_cost: "",
      book_bill_date: "",
      book_copyright: "",
      book_publication: "",
      book_publisher: "",
      book_isbn: "",
      book_copies: "",
      book_status: "New",
      book_barcode: "11111",
      book_category_id: 1,
      book_date_added: "",
      book_image: "",
      book_acc_no: "",
      book_clasification_no: "",
      department_id: "",
    });
    fileref.current.value = null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const getBookByISBN = async () => {
    if (!user.book_isbn) return toast.error("Please Enter ISBN Code");
    setLoading(1);
    await axios
      .get(
        `https://openlibrary.org/api/books?bibkeys=ISBN:${user.book_isbn}&jscmd=details&format=json`
      )
      .then((res) => {
        console.log(res);
        if (res.data.totalItems === 0) return toast.error("No Book Found");
        console.log("here");
        setUser((prevValue) => ({
          ...prevValue,
          book_title: res.data["ISBN:" + user.book_isbn]?.details?.title,
          book_author_one:
            res.data["ISBN:" + user.book_isbn]?.details?.authors?.[0]?.name ||
            "",
          book_author_two:
            res.data["ISBN:" + user.book_isbn]?.details?.authors?.[1]?.name ||
            "",
          book_author_three:
            res.data["ISBN:" + user.book_isbn]?.details?.authors?.[2]?.name ||
            "",
          book_author_four:
            res.data["ISBN:" + user.book_isbn]?.details?.authors?.[3]?.name ||
            "",
          book_author_five:
            res.data["ISBN:" + user.book_isbn]?.details?.authors?.[4]?.name ||
            "",
          book_pages:
            res.data["ISBN:" + user.book_isbn]?.details?.number_of_pages || "",
          book_publisher:
            res.data["ISBN:" + user.book_isbn]?.details?.publishers?.[0] || "",
          book_clasification_no:
            res.data["ISBN:" + user.book_isbn]?.details
              ?.lc_classifications?.[0] || "",
        }));
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(0);
  };

  const handleEdit = () => {
    if (!user?.book_title) return toast.error("BookTitle is required");
    setLoading(1);
    const config = {
      method: "put",
      url: `${LIBRARY_ADD_NEW_BOOK}/${user?.id}`,
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
        // clearData();
        reloadData();
        toast.success("Success");
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something went wrong");
      });
  };

  const handleSubmit = () => {
    if (!user.book_title || !user.book_acc_no)
      return toast.error("Please Add  Book Title");
    const config = {
      method: "post",
      url: `${LIBRARY_ADD_NEW_BOOK}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user,
        college_id: collegeId,
        faculty: sessionStorage.getItem("college_id"),
        book_barcode:
          BarcodeCollegeMap.find((s) => s.college_id == collegeId).label +
          user.book_acc_no,
        book_date_added: defaultValue,
      },
    };

    axios(config)
      .then((res) => {
        setLoading(0);
        reloadData();
        toast.success("Success");
        // clearData();
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something Went Wrong");
      });
  };

  useEffect(() => {
    if (data) {
      setUser(data?.fetchBooks);
    } else clearData();
  }, [data]);

  return (
    <div
      className="modal fade"
      id="addNewBook"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered mw-100 w-75"
        role="document"
        width="600px"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Add Books
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={clearData}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <input type="hidden" name="new_barcode" defaultValue={10} />
            <div className="row">
              <div className="col-md-12">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    getBookByISBN();
                  }}
                >
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">ISBN</label>
                        <input
                          type="text"
                          className="form-control"
                          value={user?.book_isbn}
                          onChange={handleChange}
                          placeholder="Enter ISBN Code"
                          name="book_isbn"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 d-flex align-items-center pt-2">
                      <button
                        className="btn btn-success"
                        onClick={getBookByISBN}
                      >
                        Fetch Book
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">
                    Title <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    id="exampleFormControlInput1"
                    placeholder="Enter Book Name"
                    name="book_title"
                    value={user?.book_title}
                    required=""
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Department </label>
                  <select
                    className="form-control"
                    value={user?.department_id}
                    name="department_id"
                    onChange={handleChange}
                    id=""
                  >
                    <option value="">Select Department</option>
                    {departmentOpt?.map((i, index) => (
                      <option key={index} value={i.id}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">
                    Acc. No <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    id="exampleFormControlInput1"
                    placeholder="Enter Book Acc Number"
                    name="book_acc_no"
                    value={user?.book_acc_no}
                    required=""
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">
                    Classification No <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    id="exampleFormControlInput1"
                    placeholder="Enter Book Classification Number"
                    name="book_clasification_no"
                    value={user?.book_clasification_no}
                    required=""
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">
                    Author 1 <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    id="exampleFormControlInput1"
                    placeholder="Enter Author Name"
                    name="book_author_one"
                    required=""
                    value={user?.book_author_one}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Author 2</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Enter Author Name"
                    name="book_author_two"
                    value={user?.book_author_two}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Author 3</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    className="form-control "
                    placeholder="Enter Author Name"
                    name="book_author_three"
                    value={user?.book_author_three}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Author 4</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Enter Author Name"
                    name="book_author_four"
                    value={user?.book_author_four}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Author 5</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Enter Author Name"
                    name="book_author_five"
                    value={user?.book_author_five}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Publication</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Enter Publication Year"
                    name="book_publication"
                    value={user?.book_publication}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Book Edition</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Enter Book Edition"
                    name="book_edition"
                    value={user?.book_edition}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Book Volume</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Enter Book Volume"
                    name="book_volume"
                    value={user?.book_volume}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Book Pages</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Enter Book Pages"
                    name="book_pages"
                    value={user?.book_pages}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Book Cost</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Enter Book Cost"
                    name="book_cost"
                    value={user?.book_cost}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">
                    Book Bill Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Enter Book Cost"
                    name="book_bill_date"
                    value={user?.book_bill_date}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Publisher</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Enter Publisher Name"
                    name="book_publisher"
                    value={user?.book_publisher}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Copyright</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Enter Copyright Year"
                    name="book_copyright"
                    value={user?.book_copyright}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">
                    Copies <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Number of Copies"
                    name="book_copies"
                    required=""
                    value={user?.book_copies}
                    disabled={user?.id ? true : false}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">
                    Select Status<span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    name="book_status"
                    className="form-control"
                    onChange={handleChange}
                    value={user?.book_status}
                    id="exampleFormControlInput1"
                    required=""
                  >
                    <option value="New">New</option>
                    <option value="Old">Old</option>
                    <option value="Lost">Lost</option>
                    <option value="Damaged">Damaged</option>
                    <option value="Replacement">Replacement</option>
                    <option value="Hardbound">Hardbound</option>
                  </select>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="validationCustom02">
                    Select Category<span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    name="book_category_id"
                    value={user?.book_category_id}
                    onChange={handleChange}
                    className="form-control"
                    id="validationCustom02"
                    required=""
                  >
                    <option value={1}>Textbook</option>
                    <option value={2}>English</option>
                    <option value={3}>Math</option>
                    <option value={4}>Science</option>
                    <option value={5}>Encyclopedia</option>
                    <option value={6}>Filipiniana</option>
                    <option value={7}>Novel</option>
                    <option value={8}>General</option>
                    <option value={9}>References</option>
                    <option value={9}>Disctnory</option>
                    <option value={10}>Morden Books</option>
                    <option value={11}>CCRH</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Book Image </label>
                  <input
                    type="file"
                    className="form-control"
                    ref={fileref}
                    onChange={addAttachment}
                    placeholder="Cover page Photo"
                    name="book_image"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Book Rack</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Please Enter Book Rack Number"
                    name="book_rack"
                    value={user?.book_rack}
                    disabled={user?.id ? true : false}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Book row</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Please Enter Book Row Number"
                    name="book_row"
                    value={user?.book_row}
                    disabled={user?.id ? true : false}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-success btn-rounded"
                name="submit"
                value="Add_Book"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  if (user?.id) handleEdit();
                  else handleSubmit();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAddNewBook;
