import React from "react";
import { useEffect } from "react";
import "./Events.scss";

function DocumentsModal({ title, img, setLink }) {
  let extension = img ? img.slice(img.length - 3) : img;

  console.log("img -", img);

  // useEffect(() => {
  //   console.log("img -", img);
  // }, [img]);

  // Ensure img is always treated as an array
  // const images = Array.isArray(img) ? img : [];

  return (
    <div
      className="modal fade text-left"
      id="DocumentsModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg ssssss"
        role="document"
      >
        <div className="modal-content ">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              {title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span
                aria-hidden="true"
                onClick={() => {
                  setLink("");
                }}
              >
                ×
              </span>
            </button>
          </div>
          <div className="modal-body text-center">
            {extension == "pdf" ? (
              <object
                data={img}
                type="application/pdf"
                width="100%"
                // height="600px !important"
                // object-fit="contain !important"
              ></object>
            ) : (
              <img src={img} width={580} height={800} />
            )}
          </div>

          {/* <div className="modal-body text-center">

            {images.map((imageUrl, index) => (
              <React.Fragment key={index}>
                {index > 0 && <div style={{ height: "20px" }} />}
                {imageUrl.endsWith(".pdf") ? (
                  <object
                    data={imageUrl}
                    type="application/pdf"
                    width="100%"
                    height="600px"
                  ></object>
                ) : (
                  <img src={imageUrl} className="viewimage"/>
                )}
              </React.Fragment>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default DocumentsModal;
