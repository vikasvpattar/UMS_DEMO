import React from "react";
import { LOCAL_COLLEGE } from "../../../utils/LocalStorageConstants";

const TransportPrint = ({
  data,
  mainData,
  subData,
 // collegeId,

  empData,
  collegeOpt,
  classData,
  classId,
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

  let x = classData && classData.find((s) => s.id == classId)?.name;

  // let z = collegeOpt && collegeOpt.find((s) => s.id == collegeId)?.name;

  console.log(x);

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

  console.log("data",data);
 // console.log("colegeId",collegeId);
 // console.log("Selected College Name:", collegeOpt?.find((s) => s.id == collegeId)?.name);

  const selectedCollegeId = subData?.college_id;

  const localCollegeId = sessionStorage.getItem(LOCAL_COLLEGE)?.id;

  const facultyName = collegeOpt?.find(college => college.id === localCollegeId)?.name;

  return (
    <div className="FeeCollectionFeeReciept">
      <div className="container" style={{ padding: "20px" }}>
        <div className="row">
          <div className="col-6" style={{ padding: "20px" }}>
            {data?.id ? (
              <div
                className="d-flex w-full mb-3 mt-3"
                style={{ justifyContent: "end" }}
              >
                {data?.id}
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
                  {/* {collegeOpt?.find((s) => s.id == collegeId)?.name} */}
                  
                  {/* { collegeOpt?.find((s) => s.subData?.college_id === localCollegeId)?.name } */}
                  {
                      collegeOpt?.find(
                        (s) => s.id == subData?.college_id
                      )?.name
                    }
                  
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
                  <div>Name: {subData?.name}</div>
                  <div>
                    Department:{" "}
                    {
                      departmentData?.find(
                        (s) => s.id == subData?.department_id
                      )?.name
                    }
                  </div>
                  <div></div>
                  <div>Registered No: {mainData[0]?.student_id}</div>
                </div>
                <div className="col-6">
                  <div>
                    Date :{" "}
                    {data?.date
                      ?.split("T")[0]
                      ?.split("-")
                      ?.reverse()
                      ?.join(".")}
                  </div>
                  <div>Year : {data?.year}</div>
                  <div>
                    Class : {classData?.find((s) => s.id == classId)?.name}
                  </div>
                </div>
                <div className="col-sm-12">
                  <div><b>Enrollment No: {mainData[0]?.user_id}</b></div>
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
              <div className="col-12 row mb-2" style={{ maxHeight: "50px" }}>
                <div
                  className="col-9"
                  style={{ borderRight: "1px solid black" }}
                >
                  Transport Fees
                </div>
                <div className="col-3">₹ {data?.payment_amount}</div>
              </div>
            </div>
            <hr />
            <div className="row mb-5">
              <div className="col-12 row">
                <div className="col-9">Grand Total:</div>
                <div className="col-3">₹{data?.payment_amount}</div>
              </div>
              <div className="col-12 row">
                <div className="col-4">In Words :</div>
                <div className="col-8" style={{ textTransform: "capitalize" }}>
                  {inWords(data?.payment_amount)} rupees only
                </div>
              </div>
              <div className="col-12 row">
                <div className="col-5">Note/Remark :</div>
                <div className="col-7">{data?.note}</div>
              </div>
              <div className="col-12">
                <strong>Pay Type: </strong>
                {data?.payment_mode}
              </div>
              <div className="col-12">
                <strong>Ref No: </strong>
                {data?.id}
              </div>
              <div className="col-12">
                <strong>Collected By </strong>
                {empData?.filter((s) => s.id == data?.collected_by)[0]
                  ?.first_name +
                  empData?.filter((s) => s.id == data?.collected_by)[0]
                    ?.last_name}
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
          </div>
          <div className="col-6" style={{ padding: "20px" }}>
            {data?.id ? (
              <div
                className="d-flex w-full mb-3 mt-3"
                style={{ justifyContent: "end" }}
              >
                {data?.id}
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
                  {/* {collegeOpt?.find((s) => s.id == subData)?.name} */}
                  {/* {z} */}
                  {/* { collegeOpt?.find((s) => s.subData?.college_id === localCollegeId)?.name } */}
                  {
                      collegeOpt?.find(
                        (s) => s.id == subData?.college_id
                      )?.name
                    }
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
                  <div>Name: {subData?.name}</div>
                  <div>
                    Department:{" "}
                    {
                      departmentData?.find(
                        (s) => s.id == subData?.department_id
                      )?.name
                    }
                  </div>
                  <div>Registered No: {mainData[0]?.student_id}</div>
                </div>
                <div className="col-6">
                  <div>
                    Date :{" "}
                    {data?.date
                      ?.split("T")[0]
                      ?.split("-")
                      ?.reverse()
                      ?.join(".")}
                  </div>
                  <div>Year : {data?.year}</div>
                  <div>Class : {x}</div>
                </div>
                <div className="col-sm-12">
                  <div><b>Enrollment No: {mainData[0]?.user_id}</b></div>
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
              <div className="col-12 row mb-2" style={{ maxHeight: "50px" }}>
                <div
                  className="col-9"
                  style={{ borderRight: "1px solid black" }}
                >
                  Transport Fees
                </div>
                <div className="col-3">₹ {data?.payment_amount}</div>
              </div>
            </div>
            <hr />
            <div className="row mb-5">
              <div className="col-12 row">
                <div className="col-9">Grand Total:</div>
                <div className="col-3">₹{data?.payment_amount}</div>
              </div>
              <div className="col-12 row">
                <div className="col-4">In Words :</div>
                <div className="col-8" style={{ textTransform: "capitalize" }}>
                  {inWords(data?.payment_amount)} rupees only
                </div>
              </div>
              <div className="col-12 row">
                <div className="col-5">Note/Remark :</div>
                <div className="col-7">{data?.note}</div>
              </div>
              <div className="col-12">
                <strong>Pay Type: </strong>
                {data?.payment_mode}
              </div>
              <div className="col-12">
                <strong>Ref No: </strong>
                {data?.id}
              </div>
              <div className="col-12">
                <strong>Collected By </strong>
                {empData?.filter((s) => s.id == data?.collected_by)[0]
                  ?.first_name +
                  empData?.filter((s) => s.id == data?.collected_by)[0]
                    ?.last_name}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportPrint;
