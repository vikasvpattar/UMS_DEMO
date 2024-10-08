import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { LIBRARY_ADD_NEW_BOOK } from "../../../utils/Library.apiConst";
import Barcode from "react-barcode";
import { BarcodeCollegeMap } from "../../../Data/jsonData/Library/Library";

function SearchBook({ setLoading, collegeId }) {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({
    title: "",
    author: "",
  });

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
        console.log(res.data.data);
        if (user.title.length > 0) {
          const newData = res.data.data?.filter((book) => {
            return book.fetchBooks.book_title
              .toLowerCase()
              .includes(user.title.toLowerCase());
          });
          setData(newData);
        } else if (user.author.length > 0) {
          const newData = res.data.data?.filter((book) => {
            return (
              book.fetchBooks.book_author_one
                .toLowerCase()
                .includes(user.author.toLowerCase()) ||
              book.fetchBooks.book_author_two
                .toLowerCase()
                .includes(user.author.toLowerCase())
            );
          });
          setData(newData);
        }
        setLoading(0);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
      });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const BarcodeRow = ({ a }) => {
    return <td width={"200px"}>{a ? <Barcode value={a} /> : null}</td>;
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body">
                  <label> Search Book</label>
                  <div className="row">
                    <div className="col-md-4">
                      <label>By Name</label>
                      <div className="form-group">
                        <input
                          type="text"
                          name="title"
                          onChange={handleChange}
                          placeholder="Enter Book Title"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label>By Author</label>
                      <div className="form-group">
                        <input
                          type="text"
                          name="author"
                          onChange={handleChange}
                          placeholder="Enter Book Author"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <button
                        onClick={getdata}
                        className="btn btn-primary btn-rounded mt-4"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
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
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {data?.map((i, key) => {
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
                              <td>{i?.fetchBooks?.book_clasification_no}</td>
                              {i?.fetchBooks?.faculty ? (
                                <BarcodeRow
                                  width={30}
                                  a={
                                    BarcodeCollegeMap.find(
                                      (s) =>
                                        s.college_id == i?.fetchBooks?.faculty
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
                              </td>
                              <td>{i?.fetchBooks?.book_publisher}</td>
                              <td>{i?.fetchBooks?.book_copies}</td>
                              <td>
                                {
                                  arr?.filter(
                                    (s) =>
                                      s.id == i?.fetchBooks?.book_category_id
                                  )[0]?.value
                                }
                              </td>
                              <td>{i?.fetchBooks?.status}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBook;
