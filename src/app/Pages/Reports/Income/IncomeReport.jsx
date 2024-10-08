import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState, useRef, useEffect } from 'react';
import Select from "react-select";
import { useNavigate } from 'react-router-dom';
import Nodata from '../../../Components/NoData/Nodata';
import { useReactToPrint } from "react-to-print";
import { useDownloadExcel } from "react-export-table-to-excel";
import { FEE_INCOME, FEE_INCOME_SOURCE } from '../../../utils/fees.apiConst';

function IncomeReport({ setLoading }) {

    const navigate = useNavigate();

    const [data, setData] = useState([])
    const [sourceData, setSourceData] = useState([])
    const [selectedSource, setSelectedSource] = useState("");

    let date = new Date().toISOString().split("T")[0];

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");


    const handleSearch = async () => {
      if (fromDate && toDate && new Date(toDate) < new Date(fromDate)) {
        toast.error("To Date cannot be earlier than From Date");
        return;
      }
      setLoading(1);
  
      try {
        const sourceResponse = await axios({
          method: "get",
          url: FEE_INCOME_SOURCE,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
            "Content-Type": "application/json",
          },
        });
  
        const sourceData = sourceResponse.data.data;
        const selectedSourceObject = sourceData.find(
          (item) => item.name === selectedSource
        );
        const selectedSourceId = selectedSourceObject
          ? selectedSourceObject.id
          : null;
  
        const incomeResponse = await axios({
          method: "get",
          url: FEE_INCOME,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
            "Content-Type": "application/json",
          },
          params: {
            from_date: fromDate,
            to_date: toDate,
            income_source_id: selectedSourceId,
          },
        });
  
        const incomeData = incomeResponse.data.data;
  
        console.log("Selected Source:", selectedSource);
        console.log("Selected Source ID:", selectedSourceId);
        console.log("Fetched Income Data:", incomeData);
  
        setData(incomeData);
        setSourceData(sourceData);
        setLoading(0);
      } catch (error) {
        console.error(error);
        setLoading(0);
        toast.error("Something went wrong");
      }
    };
  
    console.log("selectedSource", selectedSource);
  
    useEffect(() => {
      // Function to get the current date in "YYYY-MM-DD" format
      const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };
  
      // Set the default values for fromDate and toDate with the current date
      const currentDate = getCurrentDate();
      setFromDate(currentDate);
      setToDate(currentDate);

      handleSearch();
  

    }, []);

    const tableRef = useRef();

    const PrintRecipt = useReactToPrint({
      content: () => tableRef.current,
    });

    const handlePrint = () => {
      PrintRecipt();
    };

    const { onDownload } = useDownloadExcel({
      currentTableRef: tableRef.current,
      filename: " Income Report ",
      sheet: "Users",
    });

    const options = sourceData?.map((data, key) => ({
      value: data?.name, // Use the name as the value for the option
      label: data?.name,
    }));
    
    const allOption = { value: '', label: 'All' };

      
  return (
    <div>
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">

            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center">
                  <h4 className="mb-0">INCOME REPORTS DATE WISE</h4>
                </div>
              </div>
            </div>

        <div className="row">
          <div className="col-xl-12">

            <div className="card">
              <div className="card-body">
                <div className="card-title"><h5>Select Criteria</h5></div>
                <br></br>
                <br></br>

                    <div className="row">

                      <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="validationCustom02"> Source Header </label>
                            {/* <select
                              type="text"
                              className="form-control"
                              id="validationCustom02"
                              name="name"
                              value={selectedSource}
                              onChange={(e) => setSelectedSource(e.target.value)}
                            >
                            <option value="">All</option>
                              {sourceData
                                ?.map((data, key) => {
                                return (
                                  <option value={data?.income_source_id} key={key}>
                                    {data?.name}
                                  </option>
                                );
                              })}
                            </select> */}

                            <Select
                              id="validationCustom02"
                              name="name"
                              value={options.find(option => option.value == selectedSource) || allOption}
                              onChange={(selectedOption) => setSelectedSource(selectedOption.value)}
                              options={[allOption, ...options]}
                            />

                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            {" "}
                            From Date{" "}
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="validationCustom02"
                            name="date"
                            value={fromDate ? fromDate : date}
                            onChange={(e) => setFromDate(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02"> To Date </label>
                          <input
                            type="date"
                            className="form-control"
                            id="validationCustom02"
                            name="date"
                            value={toDate ? toDate : date}
                            onChange={(e) => setToDate(e.target.value)}
                          />
                        </div>
                      </div>

                    </div>
                    <br/>
                    <br/>
                    
                    <div className="row">
                      <div className="col-md-12">
                        <div className="d-flex justify-content-end">
                          <button
                            className="btn btn-nex rounded-pill"
                            onClick={handleSearch}
                          >
                          search
                          </button>
                        </div>
                      </div>
                    </div>

              </div>
            </div>

          </div>
        </div> 

                  <div className="row">

                    <div className="col-md-12">
                      <div className="card">
                        <div className="card-body">
                        <div className="row mb-3">
                          <div className="col-md-12 d-flex justify-content-between align-items-center">
                            <div className="card-title text-uppercase">
                              {" "}
                              <h5> INCOME REPORT LIST</h5>
                            </div>
                            <span>
                            <button
                              className="btn btn-primary rounded-pill mr-2"
                              onClick={handlePrint}
                            >
                              Export PDF
                            </button>
                            <button
                              className="btn btn-primary rounded-pill"
                              onClick={onDownload}
                            >
                              Export Excel
                            </button>
                            </span>
                          </div>
                        </div>
                          <hr />

                            <div className="table-responsive">

                              <table
                                id="table_id"
                                ref={tableRef}
                                className="display table table-bordered  nowrap table-hover "
                                style={{ borderCollapse: "collapse", borderSpacing: 0, width: "100%" }}
                              >

                                <thead>
                                  <tr>
                                    <th>Sl. No.</th>
                                    <th>Source of Income</th>
                                    <th>Name</th>
                                    <th>Invoice Number</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {
                                    data
                                    &&
                                    data?.length == 0
                                    ?
                                    <tr>
                                      <td colSpan={10}>
                                        <Nodata />
                                      </td>
                                    </tr>
                                    :
                                    data
                            
                                    ?.filter((item) => {
                                        // // Check if the source matches (or selectedSource is empty, meaning "All" is selected)
                                        // const sourceMatches =
                                        //   selectedSource === "" ||
                                        //   sourceData?.find((s) => s?.id === item?.income_source_id)?.name === selectedSource;
                                
                                        // Check if the date falls within the specified range
                                        const itemDate = new Date(item.date).getTime();
                                        const fromDateTimestamp = new Date(fromDate).getTime();
                                        const toDateTimestamp = new Date(toDate).getTime();
                                
                                        return itemDate >= fromDateTimestamp && itemDate <= toDateTimestamp;
                                      })
                                    .map((data, key) => {
                                      return <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>{sourceData?.find(s=>s?.id==data?.income_source_id)?.name}</td>
                                        <td>{data?.name}</td>
                                        <td>{data?.invoice_number}</td>
                                        <td>{data?.date?.split("T")[0]}</td>
                                        <td>{data?.amount}</td>
                                        
                                      </tr>
                                    })
                                  }
                                </tbody>

                              </table>

                            </div>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

            </div>
        </div>
    </div>
  )
}

export default IncomeReport;
