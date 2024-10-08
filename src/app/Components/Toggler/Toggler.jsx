import React from "react";
import "./Toggler.scss";
import Toggle from "react-toggle";

function Toggler(props) {
  console.log(props.checkedData);
  return (
    <label className="d-flex align-items-center">
      <Toggle
        defaultChecked={props.checked}
        icons={false}
        onChange={(e) => {
          let id = props?.checkedData?.filter(
            (s) =>
              s?.topic_id == props.id &&
              s?.session_id == parseInt(props?.session)
          )[0]?.id;
          console.log(id, props.id, props.session);
          if (id) {
            props?.checkboxValue1(e);
          } else {
            props?.checkboxValue(e);
          }
        }}
        checked={props.checked}
      />
      <span className="ml-3">{props.label}</span>
    </label>
  );
}

Toggler.defaultProps = {
  label: "Active",
};

export default Toggler;
