import React from "react";

const FeeCollectionPaymentRow = ({ data, handlePrint }) => {
  return (
    <tr>
      <td colSpan={6} className="text-right">
        <img src="/assets/images/table-arrow.png" alt="" />
      </td>
      <td>{data.payment_id}</td>
      <td>{data?.mode}</td>
      <td>
        <p style={{ whiteSpace: "none" }}>{data?.date?.split("T")[0]}</p>
      </td>
      <td>₹ {data?.discount?.amount || 0}</td>
      <td>₹ 0</td>
      <td>₹ {data?.amount}</td>
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

export default FeeCollectionPaymentRow;
