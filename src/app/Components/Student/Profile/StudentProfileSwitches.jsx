import { Button } from "antd";
import React from "react";

const StudentProfileSwitches = ({
  tab,
  setTab,
  OpenDrawer,
  allstudentloading,
  data,
}) => {
  return (
    <div className="StudentProfileSwitches">
      <ul className="nav nav-tabs ">
        {data?.map((i, key) => (
          <li className="nav-item cursor-pointer">
            <a
              className={`nav-link ${tab === i && "active"}`}
              onClick={() => {
                setTab(i);
              }}
              role="tab"
            >
              {i}
            </a>
          </li>
        ))}
        {/* <li style={{ float: "right" }}>
                    {" "}
                    <abb title="Login Details">
                        {" "}
                        <a
                            className="nav-link "
                            data-toggle="modal"
                            data-target="#login"
                            href="#edit"
                        >
                            <i className="fa fa-key" />
                        </a>
                    </abb>
                </li> */}
        <li style={{ float: "right" }} className="ml-2">
          <abb title="Students List">
            <Button
              className="btn-nex"
              onClick={OpenDrawer}
              type="primary"
              icon={<i className="fas fa-align-justify" />}
              loading={allstudentloading}
            />
          </abb>
        </li>
      </ul>
    </div>
  );
};

export default StudentProfileSwitches;
