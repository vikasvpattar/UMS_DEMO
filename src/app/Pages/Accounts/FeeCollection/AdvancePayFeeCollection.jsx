import React from "react";

const AdvanceFeeReciept = ({
  data,
  mainData,
  collegeId,
  collegeOpt,
  classData,
  studentInfo,
  class_id,
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
            {data?.length > 0 && data[0]?.fee_id ? (
              <div
                className="d-flex w-full mb-3 mt-3"
                style={{ justifyContent: "end" }}
              >
                {data[0]?.fee_id}
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
                <div style={{ textAlign: "center", fontSize: "17px" }}>
                  {collegeOpt?.find((s) => s.id == collegeId)?.name}
                </div>
                <div style={{ textAlign: "center", fontSize: "17px" }}>
                  Contact : +91 8908908908
                </div>
                <div style={{ textAlign: "center", fontSize: "17px" }}>
                  Email : info@Swaminarayanuniversity.ac.in
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
                <div className="col-6">
                  <div>
                    Name: {mainData?.name ? mainData?.name : studentInfo?.name}
                  </div>
                  <div>
                    Department:{" "}
                    {
                      departmentData?.find(
                        (s) => s.id == mainData?.department_id
                      )?.name
                    }
                  </div>
                  <div>
                    Registered No:{" "}
                    {mainData?.user_id
                      ? mainData?.user_id
                      : mainData?.student_id}
                  </div>
                </div>
                <div className="col-6">
                  <div>
                    Date :{" "}
                    {data && data?.length > 0 &&
                      // data[0]?.date
                      data?.date
                        ?.split("T")[0]
                        ?.split("-")
                        ?.reverse()
                        ?.join(".")}
                  </div>
                  <div>
                    Class : {classData?.find((s) => s.id == class_id)?.name}
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
              style={{ minHeight: "300px" }}
            >
              {data &&
                data?.map((item, key) => {
                  return (
                    <div
                      className="col-12 row mb-2"
                      style={{ maxHeight: "50px" }}
                    >
                      <div
                        className="col-9"
                        style={{ borderRight: "1px solid black" }}
                      >
                        {item?.type}
                      </div>
                      <div className="col-3">₹ {item?.amount}</div>
                    </div>
                  );
                })}
            </div>
            <hr />
            <div className="row mb-5">
              <div className="col-12 row">
                <div className="col-9">Grand Total:</div>
                <div className="col-3">
                  ₹{data?.reduce((acc, it) => acc + it?.amount, 0)}
                </div>
              </div>
              <div className="col-12 row">
                <div className="col-4">In Words :</div>
                <div className="col-8" style={{ textTransform: "capitalize" }}>
                  {inWords(data?.reduce((acc, it) => acc + it?.amount, 0))}{" "}
                  rupees only
                </div>
              </div>
              <div className="col-12 row">
                <div className="col-5">Note/Remark :</div>
                <div className="col-7">
                  {/* {data[0]?.note} */}
                  {data?.note}
                </div>
              </div>
              <div className="col-12">
                <strong>Pay Type: </strong>
                {/* {data[0]?.mode} */}
                {data?.mode}
              </div>
              <div className="col-12">
                <strong>Ref No: </strong>
                {/* {data[0]?.fee_id} */}
                {data?.fee_id}
              </div>
              <div className="col-12">
                <strong>Collected By: </strong>
                {/* {data[0]?.collector_name} */}
                {data?.collector_name}
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
            {/* {data[0]?.fee_id ? ( */}
            {data?.fee_id ? (
              <div
                className="d-flex w-full mb-3 mt-3"
                style={{ justifyContent: "end" }}
              >
                {/* {data[0]?.fee_id} */}
                {data?.fee_id}
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
                <div style={{ textAlign: "center", fontSize: "17px" }}>
                  {collegeOpt?.find((s) => s.id == collegeId)?.name}
                </div>
                <div style={{ textAlign: "center", fontSize: "17px" }}>
                  Contact : +91 8908908908
                </div>
                <div style={{ textAlign: "center", fontSize: "17px" }}>
                  Email : info@Swaminarayanuniversity.ac.in
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
                <div className="col-6">
                  <div>
                    Name: {mainData?.name ? mainData?.name : studentInfo?.name}
                  </div>
                  <div>
                    Department:{" "}
                    {
                      departmentData?.find(
                        (s) => s.id == mainData?.department_id
                      )?.name
                    }
                  </div>
                  <div>
                    Registered No:{" "}
                    {mainData?.user_id
                      ? mainData?.user_id
                      : mainData?.student_id}
                  </div>
                </div>
                <div className="col-6">
                  <div>
                    Date :{" "}
                    {/* {data[0]?.date */}
                    {data?.date
                      ?.split("T")[0]
                      ?.split("-")
                      ?.reverse()
                      ?.join(".")}
                  </div>
                  <div>
                    Class : {classData?.find((s) => s.id == class_id)?.name}
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
              style={{ minHeight: "300px" }}
            >
              {data &&
                data?.map((item, key) => {
                  return (
                    <div
                      className="col-12 row mb-2"
                      style={{ maxHeight: "50px" }}
                    >
                      <div
                        className="col-9"
                        style={{ borderRight: "1px solid black" }}
                      >
                        {item?.type}
                      </div>
                      <div className="col-3">₹ {item?.amount}</div>
                    </div>
                  );
                })}
            </div>
            <hr />
            <div className="row mb-5">
              <div className="col-12 row">
                <div className="col-9">Grand Total:</div>
                <div className="col-3">
                  ₹{data?.reduce((acc, it) => acc + it?.amount, 0)}
                </div>
              </div>
              <div className="col-12 row">
                <div className="col-4">In Words :</div>
                <div className="col-8" style={{ textTransform: "capitalize" }}>
                  {inWords(data?.reduce((acc, it) => acc + it?.amount, 0))}{" "}
                  rupees only
                </div>
              </div>
              <div className="col-12 row">
                <div className="col-5">Note/Remark :</div>
                <div className="col-7">
                  {/* {data[0]?.note} */}
                  {data?.note}
                  </div>
              </div>
              <div className="col-12">
                <strong>Pay Type: </strong>
                {/* {data[0]?.mode} */}
                {data?.mode}
              </div>
              <div className="col-12">
                <strong>Ref No: </strong>
                {/* {data[0]?.fee_id} */}
                {data?.fee_id}
              </div>
              <div className="col-12">
                <strong>Collected By: </strong>
                {/* {data[0]?.collector_name} */}
                {data?.collector_name}
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

export default AdvanceFeeReciept;
