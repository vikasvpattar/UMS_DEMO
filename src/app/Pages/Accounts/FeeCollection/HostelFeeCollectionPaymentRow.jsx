import React from "react";

const HostelRow = ({ data, handlePrint }) => {
  return (
    <tr>
      <td colSpan={4} className="text-right">
        <img src="/assets/images/table-arrow.png" alt="" />
      </td>
      <td>{data.id}</td>
      <td>{data?.payment_mode}</td>
      <td>{data?.note}</td>
      <td>
        <p style={{ whiteSpace: "none" }}>{data?.date?.split("T")[0]}</p>
      </td>
      <td>₹ {data?.payment_amount}</td>
      <td></td>
      <td>
        <a
          href="javascript:void(0)"
          className="badge badge-light"
          data-toggle="tooltip"
          title=""
          data-original-title="Print"
          onClick={handlePrint}
        >
          {" "}
          <i className="fa fa-print" />{" "}
        </a>
      </td>
      <td colSpan={6} />
    </tr>
  );
};

export default HostelRow;
