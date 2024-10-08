import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { STUDENTS_ATTENDANCE } from "../../utils/attendance.apiConst";

function AttendanceRow({
  setLoading,
  flag,
  collegeId,
  attendanceDate,
  attendanceData,
  data,
  employeeId,
  defaultAttendance,
  uniqueId,
  presentArray,
  setPresentArray,
  absentArray,
  setAbsentArray,
  studentData,
}) {
  const [attendanceStatus, setAttendanceStatus] = useState(defaultAttendance);

  useEffect(() => {
    setAttendanceStatus(defaultAttendance);
  }, [defaultAttendance]);

  useEffect(() => {
    // console.log(presentArray);
  }, [presentArray]);

  const callPresent = () => {
    const arr = [];
    for (const j of absentArray) {
      if (j?.student_id != data?.user_id) arr.push(j);
    }
    setAbsentArray(arr);
    const obj = {
      student_session_id: data?.session_id,
      student_id: data?.user_id,
    };
    presentArray.push(obj);
  };

  const callAbsent = () => {
    const arr = [];
    for (const j of presentArray) {
      if (j?.student_id != data?.user_id) arr.push(j);
    }
    setPresentArray(arr);
    const obj = {
      student_session_id: data?.session_id,
      student_id: data?.user_id,
    };
    absentArray.push(obj);
  };

  return (
    // <tr>
    //     <td>
    //         Data Found
    //     </td>
    // </tr>
    <tr>
      {" "}
      <td>{uniqueId + 1}</td>
      <td>{data?.user_id}</td>
      <td>{data?.name}</td>
      <td>
        {" "}
        <input
          type="radio"
          name={`at-${uniqueId}`}
          id={`a-${uniqueId}`}
          checked={
            absentArray?.find((s) => s?.student_id == data?.user_id)
              ? true
              : false
          }
          disabled={
            flag
              ? false
              : defaultAttendance
              ? false
              : presentArray?.find(
                  (s) => s?.student_id == data?.user_id
                ) ||
                absentArray?.find(
                  (s) => s?.student_id == data?.user_id
                )
              ? true
              : false
          }
          onChange={() => {
            callAbsent(uniqueId);
          }}
        />
        &nbsp;&nbsp;
        <label htmlFor={`a-${uniqueId}`}> Absent</label>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input
          type="radio"
          name={`at-${uniqueId}`}
          id={`p-${uniqueId}`}
          checked={
            presentArray?.find((s) => s?.student_id == data?.user_id)
              ? true
              : false
          }
          disabled={
            flag
              ? false
              : defaultAttendance
              ? false
              : presentArray?.find(
                  (s) => s?.student_id == data?.user_id
                ) ||
                absentArray?.find(
                  (s) => s?.student_id == data?.user_id
                )
              ? true
              : false
          }
          onChange={() => {
            callPresent(uniqueId);
          }}
        />
        &nbsp;&nbsp;
        <label htmlFor={`p-${uniqueId}`}> Present</label>
        {/* &nbsp;&nbsp;&nbsp;&nbsp;{" "}
          <input
            type="radio"
            name="attand[14]"
            defaultValue="late"
            id="late14"
          />
          &nbsp;&nbsp;
          <label htmlFor="late14"> Late</label> */}
      </td>
      <td>
        <input type="text" id="note14" name="note[]" />
      </td>
    </tr>
  );
  // return(
  //     <tr>
  //         <td colSpan={10}>

  //         Present
  //         </td>
  //     </tr>
  // )
}

export default AttendanceRow;
