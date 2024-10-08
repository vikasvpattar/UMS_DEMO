import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState, useEffect, useRef } from 'react';
import { STAFF_DAIRY_GET, STAFF_DAIRY_GET1 } from '../../utils/InfoUploadingApiConstants';
import { act } from '@testing-library/react';
import { EMPLOYEE_ALL } from '../../utils/apiConstants';

function StaffDairyReport2({ setLoading }) {

    const [data, setData] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    let date = new Date().toISOString().split("T")[0];

    function calculateTimeDifference(fromTimeStr, toTimeStr) {
        const fromDate = new Date(`2000-01-01T${fromTimeStr}`);
        const toDate = new Date(`2000-01-01T${toTimeStr}`);

        if (toDate < fromDate) {
            toDate.setDate(toDate.getDate() + 1); // Handle cases where 'to' is on the next day
        }

        return toDate - fromDate;
    }

    let arr1 = [
        {
            id: 1,
            title: "Direct Teaching (Assigned)",
        },
        {
            id: 2,
            title: "Examination Duties",
        },
        {
            id: 3,
            title: "Student Related Co-Curricular Activities",
        },
        {
            id: 4,
            title: "Other Activities",
        },
        {
            id: 5,
            title: "Professional Development Activities",
        },
        {
            id: 6,
            title: "Administrative Responsibility",
        },
        {
            id: 7,
            title: "Research and Academic Contributions",
        },
    ];

    // Function to get the current date in 'YYYY-MM-DD' format
    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getData = async () => {
        if (fromDate && toDate && new Date(toDate) < new Date(fromDate)) {
            toast.error("To Date cannot be earlier than From Date");
            return;
        }
    
        setLoading(1);
    
        const config = {
            method: "get",
            url: STAFF_DAIRY_GET,
            headers: {
                "Content-Type": "application/json",
            },
            params: {
                from_date: fromDate,
                to_date: toDate,
            },
        };
    
        try {
            const res = await axios(config);
            console.log("getData", res.data.data);
    
            const filteredData = res.data.data.filter(entry => {
                const entryDate = entry?.date;
                return (!fromDate || entryDate >= fromDate) && (!toDate || entryDate <= toDate);
            });
    
            const activities = {};
    
            for (const entry of filteredData) {
                if (entry?.from_time && entry?.to_time) {
                    const activity = entry.activity;
                    const emp_id = entry.emp_id;
                    const timeDifference = calculateTimeDifference(entry.from_time, entry.to_time);
    
                    if (!activities[activity]) {
                        activities[activity] = {};
                    }
    
                    if (!activities[activity][emp_id]) {
                        activities[activity][emp_id] = 0;
                    }
    
                    activities[activity][emp_id] += timeDifference;
                }
            }
    
            const aggregatedData = [];
    
            for (const activity in activities) {
                for (const emp_id in activities[activity]) {
                    const totalMilliseconds = activities[activity][emp_id];
                    const totalHours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
                    const totalMinutes = Math.floor((totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    
                    const actualScore = calculateActualScore(activity, emp_id, totalHours, totalMinutes);
                    console.log("actualScore", actualScore);
    
                    aggregatedData.push({
                        activity: parseInt(activity),
                        emp_id: parseInt(emp_id),
                        totalTime: `${totalHours} hours ${totalMinutes} minutes`,
                        status: "ACTIVE",
                        actualScore: actualScore,
                    });
                }
            }
    
            console.log("aggregatedData", aggregatedData);
            setData(aggregatedData);
            setLoading(0);
        } catch (err) {
            setLoading(0);
            console.log(err);
        }
    };


    const getData2 = async () => {

        setLoading(1);

        const config = {
            method: "get",
            url: EMPLOYEE_ALL,
            headers: {
                "Content-Type": "application/json",
            },
        };

        await axios(config)
            .then((res) => {
                console.log("getData2",res.data.data);
                setEmployeeData(res.data.data);

                // After setting employeeData, call getData
                 getData();

                setLoading(0);
            })
            .catch((err) => {
                setLoading(0);
                console.log(err);
            });
    };

    // useEffect(() => {
    //     getData2(); // Fetch employee data when component mounts
    // }, []);


    useEffect(() => {
        // Fetch employee data when component mounts
        getData2();

        // Set default values for fromDate and toDate to the current date
        const currentDate = getCurrentDate();
        setFromDate(currentDate);
        setToDate(currentDate);
    }, []);

    const calculateActualScore = (activity, emp_id, totalHours, totalMinutes) => {
        console.log(`Activity: ${activity}`);
        console.log(`Emp ID: ${emp_id}`);
        
        const employee = employeeData.find(e => e.id == emp_id);
        console.log(`Employee:`, employee);
        
        const role = employee ? employee.role : null;
        console.log(`Role: ${role}`);
        
        const totalMinutesAll = totalHours * 60 + totalMinutes;
        console.log(`Total Minutes All: ${totalMinutesAll}`);

        if (activity == 1) {
            if (role !== "ASSTPR") {
                if (role == "ASPR" || role == "PROF") {
                    return (totalMinutesAll) / (7.75); 
                }
                return (totalMinutesAll) / (10); // Default calculation for other roles in activity 1
            }
            return (totalMinutesAll) / (7.5); // Handle ASSTPR for activity 1
        }
        
        return (totalMinutesAll) / (10); // Default calculation for other activities or if no matching role found for activity 1
    };

   

    return (
        <div className="StaffDairyReport">
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0"> StaffDiary Report </h4>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h2 className="card-title"> Select Criteria </h2>
                                        <br />
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="validationCustom02">
                                                        {" "}
                                                        From Date {" "}
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="validationCustom02"
                                                        name="fromDate"
                                                        // value={fromDate}
                                                        value={fromDate ? fromDate : date}
                                                        onChange={(e) => setFromDate(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="validationCustom02">
                                                        {" "}
                                                        To Date {" "}
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="validationCustom02"
                                                        name="toDate"
                                                        // value={toDate}
                                                        value={toDate ? toDate : date}
                                                        onChange={(e) => setToDate(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row float-right">
                                            <button
                                                className="btn btn-primary btn-rounded mr-3"
                                                type="submit"
                                                name="submit"
                                                onClick={getData}
                                            >
                                                <i className="fa fa-search" aria-hidden="true" />
                                                Search
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Display List Start*/}
                        <div class="card">
                            <div className="card-body">
                                <h5> STAFFDAIRY REPORT LIST </h5>
                                <hr />
                                <table className="table table-bordered table-hover">

                                    <thead>
                                        <tr>
                                            <th> Sl No </th>
                                            <th> Activity Name </th>
                                            <th> Employee Name </th>
                                            <th> Role </th>
                                            <th> Total Time </th>
                                            <th> Actual Score </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {data && data.map((item, index) => {
                                            const employee = employeeData.find(e => e.id === item?.emp_id);
                                            const employeeName = employee ? `${employee.first_name} ${employee.last_name}` : 'N/A';
                                            const role = employee ? `${employee.role}` : 'N/A';
                                            if (item.status === "ACTIVE") {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            {
                                                                arr1.filter((s) => s.id === parseInt(item?.activity))[0]?.title
                                                            }
                                                        </td>    
                                                        <td>{employeeName}</td>
                                                        <td>{role}</td>
                                                        <td>{item?.totalTime}</td>
                                                        <td>{item?.actualScore}</td>
                                                    </tr>
                                                );
                                            }
                                            return null;
                                        })}
                                    </tbody>



                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default StaffDairyReport2;
