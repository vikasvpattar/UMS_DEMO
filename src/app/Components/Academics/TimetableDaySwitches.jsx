import React from "react";

const TimetableDaySwitches = ({ tabData, tab, setTab }) => {
  return (
    <nav>
      <div className="nav nav-tabs" id="nav-tab" role="tablist">
        {tabData.map((i, key) => (
          <div
            className={`nav-item nav-link ${tab === i.id ? "active" : ""}`}
            id="nav-home-tab"
            style={{ cursor: "pointer" }}
            role="tab"
            key={key}
            onClick={() => setTab(i.id)}
          >
            {i.name}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default TimetableDaySwitches;
