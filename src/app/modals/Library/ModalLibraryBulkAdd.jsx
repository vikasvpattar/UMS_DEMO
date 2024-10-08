import React from "react";
import papa from "papaparse";
import { useState, useEffect } from "react";
import { libraryTemplate } from "../../utils/s3assetLinks";
import { useRef } from "react";
import { LIBRARY_ADD_BULK_BOOK } from "../../utils/Library.apiConst";
import axios from "axios";
import { toast } from "react-toastify";

const ModalLibraryBulkAdd = ({ collegeId, setLoading }) => {
  const fileref = useRef(null);
  const [data, setData] = useState([]);

  const handleProcessCSV = (d) => {
    let arr = [];
    for (let i of d) {
      const obj = {
        faculty: collegeId,
        book_title: i["book_title"],
        book_author_one: i["book_author_one"],
        book_rack: i["book_rack"],
        book_row: i["book_row"],
        book_author_two: i["book_author_two"],
        book_author_three: i["book_author_three"],
        book_author_four: i["book_author_four"],
        book_author_five: i["book_author_five"],
        book_edition: i["book_edition"],
        book_volume: i["book_volume"],
        book_pages: i["book_pages"],
        book_cost: i["book_cost"],
        book_bill_date: i["book_bill_date"],
        book_acc_no: i["book_acc_no"],
        book_clasification_no: i["book_clasification_no"],
        book_copyright: i["book_copyright"],
        book_publication: i["book_publication"],
        book_publisher: i["book_publisher"],
        book_isbn: i["book_isbn"],
        book_status: i["book_status"],
        book_category_id: i["book_category_id"],
        book_date_added: i["book_date_added"],
        book_image: i["book_image"],
      };
      arr.push(obj);
    }
    console.log(arr);
    setData(arr);
  };

  var commonConfig = { delimiter: "," };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    console.log(files);
    let x = files[0].name;
    if (x.slice(x.length - 3) != "csv") {
      fileref.current.value = null;
      return toast.error("File Should be in CSV Format");
    }
    if (files) {
      papa.parse(files[0], {
        ...commonConfig,
        header: true,
        complete: async (res) => {
          console.log("com", res);
          await handleProcessCSV(res.data);
        },
      });
    }
  };

  const handleSubmit = async () => {
    if (data.length == 0) {
      toast.error("Please Select a file First");
      return;
    }
    console.log(data[0]);
    let x = data;
    setLoading(1);
    const chunkSize = 200; // Adjust the chunk size as needed
    for (let i = 0; i < x.length; i += chunkSize) {
      let data = x.slice(i, i + chunkSize);
      const config = {
        method: "post",
        url: LIBRARY_ADD_BULK_BOOK,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
          "Content-Type": "application/json",
        },
        data: data,
      };

      await axios(config)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
          toast.error("Something Went Wrong");
        });
    }
    fileref.current.value = null;
    toast.success("Successfully Uploaded Details");
    setLoading(0);
  };

  return (
    <div
      className="modal fade"
      id="bulkbookadd"
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
              Bulk Books Add
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="row px-5">
            <div className="col-12">
              <a href={libraryTemplate} download className="btn btn-primary">
                Download Template
              </a>
            </div>
          </div>
          <div className="modal-body">
            <div className="">
              <label>
                Please Upload the following values for the following books.
              </label>
              <p>
                TEXT BOOK - 1, HAND BOOK - 2, REFERENCE - 3, DICTIONARY - 4{" "}
              </p>
            </div>
            <label htmlFor="">Select CSV File to process</label>
            <div className="row d-flex">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="file"
                    ref={fileref}
                    onChange={handleFileUpload}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <button
                    className="btn btn-primary btn-md btn-rounded"
                    onClick={handleSubmit}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLibraryBulkAdd;
