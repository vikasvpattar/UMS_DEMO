import React from "react";

const FeeCollectionFeeReciept = ({
  data,
  mainData,
  subData,
  collegeId,
  collegeOpt,
  classData,
  departmentData,
}) => {
  var a = [
    "",
    "one ",
    "two ",
    "three ",
    "four ",
    "five ",
    "six ",
    "seven ",
    "eight ",
    "nine ",
    "ten ",
    "eleven ",
    "twelve ",
    "thirteen ",
    "fourteen ",
    "fifteen ",
    "sixteen ",
    "seventeen ",
    "eighteen ",
    "nineteen ",
  ];
  var b = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  function inWords(num) {
    if (!num) return;
    if ((num = num.toString()).length > 9) return "overflow";
    var n = ("000000000" + num)
      .substr(-9)
      .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    var str = "";
    str +=
      n[1] != 0
        ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
        : "";
    str +=
      n[2] != 0
        ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh "
        : "";
    str +=
      n[3] != 0
        ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand "
        : "";
    str +=
      n[4] != 0
        ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred "
        : "";
    str +=
      n[5] != 0
        ? (str != "" ? "and " : "") +
          (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
          "only "
        : "";
    return str;
  }
  return (
    <div className="FeeCollectionFeeReciept">
      <div className="container" style={{ padding: "20px" }}>
        <div className="row">
          <div className="col-6" style={{ padding: "20px" }}>
            {data?.payment_id ? (
              <div
                className="d-flex w-full"
                style={{ justifyContent: "end" }}
              >
                {data?.payment_id}
              </div>
            ) : null}
            <div className="row">
              <div className="col-3">
                <img
                  src="/assets/images/Nexenstial Logo.png"
                  alt=""
                  width={100}
                />
              </div>
              <div className="col-9">
                <div style={{ fontSize: "15px", textAlign: "center" }}>
                  Swaminarayan University, Kalol
                </div>
                <div style={{ textAlign: "center", fontSize: "15px" }}>
                  {collegeOpt?.find((s) => s.id == collegeId)?.name}
                </div>
                <div style={{ textAlign: "center", fontSize: "12px" }}>
                  +91 8908908908
                </div>
                <div style={{ textAlign: "center", fontSize: "12px" }}>
                  info@Swaminarayanuniversity.ac.in
                </div>
              </div>
            </div>
            <div className="row mt-3 bg-dark py-2">
              <div
                className="col-12"
                style={{
                  fontSize: "15px",
                  textAlign: "center",
                  color: "white",
                }}
              >
                COLLEGE COPY
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-12 row">
                <div className="col-8">
                  <div>Name: {mainData?.student?.name}</div>
                  <div>
                    Department:{" "}
                    {
                      departmentData?.find(
                        (s) => s.id == mainData?.student?.department_id
                      )?.name
                    }
                  </div>
                  <div>Registered No: {mainData?.student?.id}</div>
                </div>
                <div className="col-4">
                  <div>
                    Date :{" "}
                    {data?.date
                      ?.split("T")[0]
                      ?.split("-")
                      ?.reverse()
                      ?.join(".")}
                  </div>
                  <div>
                    Class :{" "}
                    {
                      classData?.find(
                        (s) => s.id == mainData?.student?.class_id
                      )?.name
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3 bg-dark py-2">
              <div
                className="col-12 row"
                style={{
                  fontSize: "15px",
                  textAlign: "center",
                  color: "white",
                }}
              >
                <div
                  className="col-9"
                  style={{ borderRight: "1px solid white" }}
                >
                  Fee Name
                </div>
                <div className="col-3">Amount</div>
              </div>
            </div>
            <div
              className="row py-2 d-flex flex-column"
              style={{ minHeight: "130px" }}
            >
              <div className="col-12 row mb-2" style={{ maxHeight: "50px" }}>
                <div
                  className="col-9"
                  style={{ borderRight: "1px solid black" }}
                >
                  {subData?.fee_type_name?.replace(/[0-9]/g, "")}
                </div>
                <div className="col-3">₹ {data?.amount}</div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-12 row">
                <div className="col-9">Grand Total:</div>
                <div className="col-3">₹{data?.amount}</div>
              </div>
              <div className="col-12 row mb-2">
                <div className="ml-3">In Words : <span style={{ textTransform: "capitalize" }}>{inWords(data?.amount)}</span> rupees only</div>
              </div>
              <div className="col-12 row mb-2">
                <div className="ml-3">Note/Remark : {data?.note}</div>
              </div>
              <div className="col-12">
                <strong>Pay Type: </strong>
                {data?.mode}
              </div>
              <div className="col-12">
                <strong>Ref No: </strong>
                {data?.payment_id}
              </div>
              <div className="col-12">
                <strong>Collected By: </strong>
                {data?.collected_by}
              </div>
            </div>
            <div className="row">
              <div className="col-6"></div>
              <div className="col-6 row" style={{ textAlign: "center" }}>
                <div className="col-12">For Admin</div>
                <hr />
                <div className="col-12">
                  <strong>Recievers Signature</strong>
                </div>
              </div>
            </div>
            {/* <table className="table table-bordered">
                  <tr style={{fontSize:'15px',textAlign:'center',color:'white'}}>
                    <th className='bg-dark'>
                    Fee Name
                    </th>
                    <th className='bg-dark'>
                    Amount
                    </th>
                  </tr>
                  <tr >
                    <td >
                      Helo
                    </td>
                    <td >
                      Helo
                    </td>
                  </tr>
                </table> */}
          </div>
          <div className="col-6" style={{ padding: "20px" }}>
            {data?.payment_id ? (
              <div
                className="d-flex w-full"
                style={{ justifyContent: "end" }}
              >
                {data?.payment_id}
              </div>
            ) : null}
            <div className="row">
              <div className="col-3">
                <img
                  src="/assets/images/Nexenstial Logo.png"
                  alt=""
                  width={100}
                />
              </div>
              <div className="col-9">
                <div style={{ fontSize: "15px", textAlign: "center" }}>
                  Swaminarayan University, Kalol
                </div>
                <div style={{ textAlign: "center", fontSize: "15px" }}>
                  {collegeOpt?.find((s) => s.id == collegeId)?.name}
                </div>
                <div style={{ textAlign: "center", fontSize: "12px" }}>
                  +91 8908908908
                </div>
                <div style={{ textAlign: "center", fontSize: "12px" }}>
                  info@Swaminarayanuniversity.ac.in
                </div>
              </div>
            </div>
            <div className="row mt-3 bg-dark py-2">
              <div
                className="col-12"
                style={{
                  fontSize: "15px",
                  textAlign: "center",
                  color: "white",
                }}
              >
                RECEIPT
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-12 row">
                <div className="col-8">
                  <div>Name: {mainData?.student?.name}</div>
                  <div>
                    Department:{" "}
                    {
                      departmentData?.find(
                        (s) => s.id == mainData?.student?.department_id
                      )?.name
                    }
                  </div>
                  <div>Registered No: {mainData?.student?.id}</div>
                </div>
                <div className="col-4">
                  <div>
                    Date :{" "}
                    {data?.date
                      ?.split("T")[0]
                      ?.split("-")
                      ?.reverse()
                      ?.join(".")}
                  </div>
                  <div>
                    Class :{" "}
                    {
                      classData?.find(
                        (s) => s.id == mainData?.student?.class_id
                      )?.name
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3 bg-dark py-2">
              <div
                className="col-12 row"
                style={{
                  fontSize: "15px",
                  textAlign: "center",
                  color: "white",
                }}
              >
                <div
                  className="col-9"
                  style={{ borderRight: "1px solid white" }}
                >
                  Fee Name
                </div>
                <div className="col-3">Amount</div>
              </div>
            </div>
            <div
              className="row py-2 d-flex flex-column"
              style={{ minHeight: "130px" }}
            >
              <div className="col-12 row mb-2" style={{ maxHeight: "50px" }}>
                <div
                  className="col-9"
                  style={{ borderRight: "1px solid black" }}
                >
                  {subData?.fee_type_name?.replace(/[0-9]/g, "")}
                </div>
                <div className="col-3">₹ {data?.amount}</div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-12 row">
                <div className="col-9">Grand Total:</div>
                <div className="col-3">₹{data?.amount}</div>
              </div>
              <div className="col-12 row mb-2">
                <div className="ml-3">In Words : <span style={{ textTransform: "capitalize" }}>{inWords(data?.amount)}</span> rupees only</div>
              </div>
              <div className="col-12 row mb-2">
                <div className="ml-3">Note/Remark : {data?.note}</div>
              </div>
              <div className="col-12">
                <strong>Pay Type: </strong>
                {data?.mode}
              </div>
              <div className="col-12">
                <strong>Ref No: </strong>
                {data?.payment_id}
              </div>
              <div className="col-12">
                <strong>Collected By: </strong>
                {data?.collected_by}
              </div>
            </div>
            <div className="row">
              <div className="col-6"></div>
              <div className="col-6 row" style={{ textAlign: "center" }}>
                <div className="col-12">For Admin</div>
                <hr />
                <div className="col-12">
                  <strong>Recievers Signature</strong>
                </div>
              </div>
            </div>
            {/* <table className="table table-bordered">
                  <tr style={{fontSize:'15px',textAlign:'center',color:'white'}}>
                    <th className='bg-dark'>
                    Fee Name
                    </th>
                    <th className='bg-dark'>
                    Amount
                    </th>
                  </tr>
                  <tr >
                    <td >
                      Helo
                    </td>
                    <td >
                      Helo
                    </td>
                  </tr>
                </table> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeCollectionFeeReciept;
