import React from "react";
import { useState, useRef } from "react";
import { BarcodeCollegeMap } from "../../Data/jsonData/Library/Library";
import { useReactToPrint } from "react-to-print";

function BarCodePrint({ data }) {
  const spineLableRef = useRef();

  const [user, setUser] = useState({
    from: "",
    to: "",
  });

  const handlePrint = useReactToPrint({
    content: () => spineLableRef.current,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const getData = async () => {
    await handlePrint();
  };

  return (
    <div>
      <div
        className="modal fade"
        id="printSpineLabel"
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
                Print Spine Labels
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => {
                  setUser({
                    from: "",
                    to: "",
                  });
                }}
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">From</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      placeholder="From which accession number"
                      name="from"
                      value={user?.from}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">To</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      placeholder="To which accession number"
                      name="to"
                      value={user?.to}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <button
                    onClick={getData}
                    className="btn btn-primary btn-rounded mt-4"
                  >
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "none" }}>
        <div className="row p-2" ref={spineLableRef}>
          {data &&
            data
              ?.filter(
                (s) =>
                  s.fetchBooks.book_acc_no >= user?.from &&
                  s.fetchBooks.book_acc_no <= user?.to
              )
              ?.map((i, key) => (
                <div className="col-3 align-items-center mt-3 text-center">
                  <div>
                    <div>{i?.fetchBooks?.book_clasification_no}</div>
                    <div>
                      {i?.fetchBooks?.book_author_one
                        ?.trim()
                        ?.replace(/ /g, "")
                        ?.slice(0, 3)
                        .toUpperCase()}
                    </div>
                    <div>
                      {BarcodeCollegeMap.find(
                        (s) => s.college_id == i?.fetchBooks?.faculty
                      )?.label + i?.fetchBooks?.book_acc_no}
                    </div>
                    <div>SUK</div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default BarCodePrint;
