import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
// import events from '../../Data/events'
// import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import { HOLIDAY_CALENDER } from "../../utils/apiConstants";
import axios from "axios";
import { toast } from "react-toastify";

function Calender({ setLoading, collegeId }) {
  const [holidays, setHolidays] = useState();
  const [events, setEvents] = useState();

  const date = new Date();
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);

  const prevIsoStrDate = prevMonth.toISOString();
  const nextIsoStrDate = nextMonth.toISOString();

  const [startDate, setStartDate] = useState(nextIsoStrDate);
  const [endDate, setEndDate] = useState(prevIsoStrDate);

  const handleDateClick = (p) => {
    console.log(p);
  };

  const getHolidays = () => {
    setLoading(1);
    const config = {
      method: "get",
      url:
        HOLIDAY_CALENDER +
        `?from_date=${startDate?.split("T")[0]}&to_date=${
          endDate?.split("T")[0]
        }&college_id=${collegeId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then((res) => {
        setLoading(0);
        setHolidays(
          res.data.data.map((i) => ({
            title: i.name,
            start: i.from_date,
            end: i.to_date ? i.to_date : i.from_date,
            classNames:
              i?.leave_type == "CASUAL"
                ? "bg-success"
                : i?.leave_type == "LWP"
                ? "bg-danger"
                : i?.leave_type == "COMP"
                ? "bg-warning"
                : i?.leave_type == "DUTY"
                ? "bg-secondary"
                : i?.leave_type == "RH"
                ? "bg-info"
                : "bg-primary",
          }))
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const handleDateChange = (event) => {
    setStartDate(event?.startStr);
    setEndDate(event?.endStr);
  };

  useEffect(() => {
    getHolidays();
  }, [startDate, endDate]);
  return (
    <div>
      <div className="mb-5">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-around align-items-center">
            <span>
              <i className="ri-focus-fill text-success font-size-18"></i>
            </span>{" "}
            Casual or sick Leave
            <span>
              {" "}
              <i className="ri-focus-fill text-danger font-size-18"></i>
            </span>{" "}
            LWP
            <span>
              <i className="ri-focus-fill text-warning font-size-18"></i>
            </span>{" "}
            Compensatory Leave
            <span>
              <i className="ri-focus-fill text-secondary font-size-18"></i>
            </span>{" "}
            Duty Leave
            <span>
              <i className="ri-focus-fill text-info font-size-18"></i>
            </span>{" "}
            Restricted Holiday
            <span>
              <i className="ri-focus-fill text-primary font-size-18"></i>
            </span>{" "}
            Holiday
          </div>
        </div>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={holidays}
        dateClick={(p) => {
          handleDateClick(p);
        }}
        datesSet={(event) => handleDateChange(event)}
      />
    </div>
  );
}

export default Calender;
