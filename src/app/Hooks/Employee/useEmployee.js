import React, { useEffect, useState } from "react";
import {
  LOCAL_COLLEGE,
  LOCAL_EMPLOYEE,
} from "../../utils/LocalStorageConstants";

const useEmployee = (id) => {
  const [data, setData] = useState([]);

  const getEmployee = () => {
    if (localStorage.getItem(LOCAL_COLLEGE)) {
      return new Promise((resolve, reject) => {
        return resolve(JSON.parse(localStorage.getItem(LOCAL_COLLEGE)));
      });
    } else {
      return null;
    }
  };

  const getData = async () => {
    const d = JSON.parse(localStorage.getItem(LOCAL_EMPLOYEE));
    setData(d?.filter((s) => s.college_id == id && s.role != "HR"));
  };

  useEffect(() => {
    getData();
  }, [id, localStorage.getItem(LOCAL_EMPLOYEE)]);

  return [data];
};

export default useEmployee;
