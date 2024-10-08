import axios from "axios";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import BarCodePrint from "../../../modals/Library/ModalPrintBarCode";
import SpinePrint from "../../../modals/Library/ModalPrintSpine";
import { toast } from "react-toastify";
import ModalAddNewBook from "../../../modals/Library/ModalAddNewBook";
import { LIBRARY_ADD_NEW_BOOK } from "../../../utils/Library.apiConst";
import Barcode from "react-barcode";
import { BarcodeCollegeMap } from "../../../Data/jsonData/Library/Library";
import ModalLibraryBulkAdd from "../../../modals/Library/ModalLibraryBulkAdd";
import { useReactToPrint } from "react-to-print";
import { MDBDataTable } from "mdbreact";

function Books({ setLoading, collegeId }) {
  const [data, setData] = useState();

  // const [data1, setData1] = useState();

  const [data2, setData2] = useState();

  const [edit, setEdit] = useState();

  console.log("Hello")

  // const [searchQuery, setSearchQuery] = useState("");

  // const [count, setCount] = useState(0);
  // const pageSize = 100;

  // useEffect(() => {
  //   let newData = data1?.filter(
  //     (s) =>
  //       s.fetchBooks.new_id > count && s.fetchBooks.new_id <= count + pageSize
  //   );
  //   setData(newData);
  // }, [count, data1]);

  const getdata = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${LIBRARY_ADD_NEW_BOOK}?status=ACTIVE&college_id=${sessionStorage.getItem(
        "college_id"
      )}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        setData(res.data.data);
        let y = {
          columns: [
            {
              label: "Sl.No.",
              field: "new_id",
              sort: "asc",
              width: 150,
            },
            {
              label: "Book Image",
              field: "book_image",
              sort: "asc",
              width: 270,
            },
            {
              label: "Accession Number",
              field: "book_acc_no",
              sort: "asc",
              width: 200,
            },
            {
              label: "Book Number",
              field: "book_author",
              sort: "asc",
              width: 100,
            },
            {
              label: "Classification Number",
              field: "book_clasification_no",
              sort: "asc",
              width: 150,
            },
            {
              label: "Bar Code",
              field: "bar_code",
              sort: "asc",
              width: 100,
            },
            {
              label: "Title",
              field: "book_title",
              sort: "asc",
              width: 100,
            },
            {
              label: "ISBN",
              field: "book_isbn",
              sort: "asc",
              width: 100,
            },
            {
              label: "Authors",
              field: "book_authors",
              sort: "asc",
              width: 100,
            },
            {
              label: "Publisher (Publication)",
              field: "book_publisher",
              sort: "asc",
              width: 100,
            },
            {
              label: "Copies",
              field: "book_copies",
              sort: "asc",
              width: 100,
            },
            {
              label: "Category",
              field: "book_category_id",
              sort: "asc",
              width: 100,
            },
            {
              label: "Status",
              field: "book_status",
              sort: "asc",
              width: 100,
            },
            {
              label: "Action",
              field: "action",
              sort: "asc",
              width: 30,
            },
          ],
        };
        let test = [];
        res.data.data?.forEach((i) => {
          let obj = {
            new_id: i?.fetchBooks?.new_id,
            image: (
              <img
                src={i?.fetchBooks?.book_image}
                style={{ width: "150px" }}
                alt=""
              />
            ),
            book_acc_no: i?.fetchBooks?.book_acc_no,
            book_author: i?.fetchBooks?.book_author_one
              ?.trim()
              ?.replace(/ /g, "")
              ?.slice(0, 3)
              .toUpperCase(),
            book_clasification_no: i?.fetchBooks?.book_clasification_no,
            book_isbn: i?.fetchBooks?.book_isbn,
            book_title: i?.fetchBooks?.book_title,
            book_authors: (
              <>
                <div className="d-flex flex-nowrap">
                  {i?.fetchBooks?.book_author_one
                    ? "1. " + i?.fetchBooks?.book_author_one
                    : ""}
                </div>
                <div className="d-flex flex-nowrap">
                  {i?.fetchBooks?.book_author_two
                    ? "2. " + i?.fetchBooks?.book_author_two
                    : ""}
                </div>
                <div className="d-flex flex-nowrap">
                  {i?.fetchBooks?.book_author_three
                    ? "3. " + i?.fetchBooks?.book_author_three
                    : ""}
                </div>
                <div className="d-flex flex-nowrap">
                  {i?.fetchBooks?.book_author_four
                    ? "4. " + i?.fetchBooks?.book_author_four
                    : ""}
                </div>
                <div className="d-flex flex-nowrap">
                  {i?.fetchBooks?.book_author_five
                    ? "5. " + i?.fetchBooks?.book_author_five
                    : ""}
                </div>
              </>
            ),
            book_publisher: i?.fetchBooks?.book_publisher,
            book_copies: i?.fetchBooks?.book_copies,
            book_status: i?.fetchBooks?.status,
            book_category_id: arr?.filter(
              (s) => s.id == i?.fetchBooks?.book_category_id
            )[0]?.value,
            action: (
              <div className="">
                <span
                  className="badge badge-light text-dark mr-3"
                  title="Edit"
                  data-toggle="modal"
                  data-target="#addNewBook"
                  onClick={() => {
                    setEdit(i);
                  }}
                >
                  {" "}
                  <i class="fa fa-edit " aria-hidden="true"></i>
                </span>
                <span
                  className="badge badge-light text-danger mr-3"
                  data-toggle="tooltip"
                  title="Delete"
                  onClick={() => handleDelete(i?.fetchBooks.id)}
                >
                  {" "}
                  <i class="fa fa-trash " aria-hidden="true"></i>
                </span>
              </div>
            ),
            bar_code: (
              <BarcodeRow
                width={30}
                a={
                  BarcodeCollegeMap.find(
                    (s) => s.college_id == i?.fetchBooks?.faculty
                  )?.label + i?.fetchBooks?.book_acc_no
                }
              />
            ),
          };
          test.push(obj);
        });
        y.rows = test;
        setData2(y);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something Went Wrong");
      });
  };

  const handleDelete = (id) => {
    const config = {
      method: "put",
      url: `${LIBRARY_ADD_NEW_BOOK}/${id}`,
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
    console.log(data2);
  }, []);

  const BarcodeRow = ({ a }) => {
    const curRef = useRef();

    const handlePrintRow = useReactToPrint({
      content: () => curRef.current,
    });

    return (
      <td ref={curRef} width={"200px"} onClick={handlePrintRow}>
        {a ? <Barcode value={a} /> : null}
      </td>
    );
  };

  const arr = [
    {
      id: 1,
      value: "TEXT BOOK",
    },
    {
      id: 2,
      value: "HAND BOOK",
    },
    {
      id: 3,
      value: "REFERENCE",
    },
    {
      id: 4,
      value: "DICTIONARY",
    },
  ];

  // useEffect(() => {
  //   const newData = data?.filter((book) => {
  //     return book.fetchBooks.book_title
  //       .toLowerCase()
  //       .includes(searchQuery.toLowerCase());
  //   });
  //   setData(newData);
  // }, [searchQuery]);

  return (
    <div className="Books">
      <BarCodePrint data={data} />
      <SpinePrint data={data} />
      <ModalAddNewBook
        setLoading={setLoading}
        collegeId={sessionStorage.getItem("college_id")}
        data={edit}
        reloadData={getdata}
      />
      <ModalLibraryBulkAdd
        collegeId={sessionStorage.getItem("college_id")}
        setLoading={setLoading}
      />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <>
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4 className="mb-0">Libarary Books List</h4>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <h4 className="card-title">Books List</h4>
                        </div>
                        <div className="col-md-6 d-flex justify-content-end">
                          <button
                            className="btn btn-danger btn-sm btn-rounded mr-2"
                            type="button"
                            data-toggle="modal"
                            data-target="#printBarcode"
                            name="print"
                          >
                            <i className="fa fa-print" aria-hidden="true" />{" "}
                            Print Barcodes
                          </button>
                          <button
                            className="btn btn-primary btn-sm btn-rounded  mr-2"
                            type="submit"
                            data-toggle="modal"
                            data-target="#addNewBook"
                            name="add  "
                            onClick={() => {
                              setEdit(null);
                            }}
                          >
                            <i className="fa fa-plus" aria-hidden="true" /> Add
                            Books
                          </button>
                          <button
                            className="btn btn-primary btn-sm btn-rounded mr-2"
                            type="submit"
                            data-toggle="modal"
                            data-target="#bulkbookadd"
                          >
                            <i className="fa fa-plus" aria-hidden="true" /> Bulk
                            Upload
                          </button>
                          <button
                            data-toggle="modal"
                            data-target="#printSpineLabel"
                            className="btn btn-primary btn-sm btn-rounded"
                          >
                            Print Spine Label
                          </button>
                        </div>
                      </div>
                      {/* Modal */}
                      <hr />
                      {/* <div className="table-responsive">
                        <table
                          className="table table-bordered"
                          style={{
                            borderCollapse: "collapse",
                            borderSpacing: 0,
                            width: "100%",
                          }}
                        >
                          <thead className="text-center">
                            <tr>
                              <th>Sl.No.</th>
                              <th>Book Image</th>
                              <th>Accession Number</th>
                              <th>Book Number</th>
                              <th>Classification Number</th>
                              <th>Barcode</th>
                              <th>Title</th>
                              <th>ISBN</th>
                              <th>Authors</th>
                              <th>
                                Publisher
                                <br />
                                (Publication)
                              </th>
                              <th>Copies</th>
                              <th>Category</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody className="text-center">
                            {data &&
                              data?.map((i, key) => {
                                return (
                                  <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>
                                      <img
                                        src={i?.fetchBooks?.book_image}
                                        style={{ width: "150px" }}
                                        alt=""
                                      />
                                    </td>
                                    <th>{i?.fetchBooks?.book_acc_no}</th>
                                    <td>
                                      {i?.fetchBooks?.book_author_one
                                        ?.trim()
                                        ?.replace(/ /g, "")
                                        ?.slice(0, 3)
                                        .toUpperCase()}
                                    </td>
                                    <td>
                                      {i?.fetchBooks?.book_clasification_no}
                                    </td>
                                    {i?.fetchBooks?.faculty ? (
                                      <BarcodeRow
                                        width={30}
                                        a={
                                          BarcodeCollegeMap.find(
                                            (s) =>
                                              s.college_id ==
                                              i?.fetchBooks?.faculty
                                          )?.label + i?.fetchBooks?.book_acc_no
                                        }
                                      />
                                    ) : (
                                      <td></td>
                                    )}
                                    <td>{i?.fetchBooks?.book_title}</td>
                                    <td>{i?.fetchBooks?.book_isbn}</td>
                                    <td>
                                      <div className="d-flex flex-nowrap">
                                        {i?.fetchBooks?.book_author_one
                                          ? "1. " +
                                            i?.fetchBooks?.book_author_one
                                          : ""}
                                      </div>
                                      <div className="d-flex flex-nowrap">
                                        {i?.fetchBooks?.book_author_two
                                          ? "2. " +
                                            i?.fetchBooks?.book_author_two
                                          : ""}
                                      </div>
                                      <div className="d-flex flex-nowrap">
                                        {i?.fetchBooks?.book_author_three
                                          ? "3. " +
                                            i?.fetchBooks?.book_author_three
                                          : ""}
                                      </div>
                                      <div className="d-flex flex-nowrap">
                                        {i?.fetchBooks?.book_author_four
                                          ? "4. " +
                                            i?.fetchBooks?.book_author_four
                                          : ""}
                                      </div>
                                      <div className="d-flex flex-nowrap">
                                        {i?.fetchBooks?.book_author_five
                                          ? "5. " +
                                            i?.fetchBooks?.book_author_five
                                          : ""}
                                      </div>
                                    </td>
                                    <td>{i?.fetchBooks?.book_publisher}</td>
                                    <td>{i?.fetchBooks?.book_copies}</td>
                                    <td>
                                      {
                                        arr?.filter(
                                          (s) =>
                                            s.id ==
                                            i?.fetchBooks?.book_category_id
                                        )[0]?.value
                                      }
                                    </td>
                                    <td>{i?.fetchBooks?.status}</td>
                                    <td className="d-flex">
                                      <span
                                        className="badge badge-light text-dark mr-3"
                                        title="Edit"
                                        data-toggle="modal"
                                        data-target="#addNewBook"
                                        onClick={() => {
                                          setEdit(i);
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
                                        onClick={() =>
                                          handleDelete(i?.fetchBooks.id)
                                        }
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
                        <div className="row d-flex mb-2">
                          <div className="col-md-6">
                            {count > 0 ? (
                              <button
                                className="btn btn-primary btn-md float-left"
                                onClick={handlePrev}
                              >
                                Previous
                              </button>
                            ) : null}
                          </div>
                          <div className="col-md-6">
                            <button
                              onClick={handleNext}
                              className="btn btn-primary btn-lg float-right"
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      </div> */}
                      <MDBDataTable striped bordered small className="table-responsive" data={data2} />
                    </div>
                  </div>
                </div>{" "}
                {/* end col */}
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Books;
