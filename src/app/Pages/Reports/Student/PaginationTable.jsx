import React, {  useEffect,useState } from 'react';
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import * as XLSX from 'xlsx';
import { useDownloadExcel } from "react-export-table-to-excel";
import { college_title } from "../../../Data/main";

const Table = ({ data, numberofDays, user, days, year_id, month_id, currentPage, setCurrentPage, itemsPerPage, setItemsPerPage, setLoading, department_id,college_id,session_id,classData, semesterData}) => {

    useEffect(() => {
        setCurrentPage(1);
      }, [itemsPerPage,data]);
    
  let colleges = JSON.parse(localStorage.getItem('COLLEGE'));
  let departments = JSON.parse(localStorage.getItem('DEPARTMENT'));

  const monthFull = [
    { id: "01", label: "January" },
    { id: "02", label: "February" },
    { id: "03", label: "March" },
    { id: "04", label: "April" },
    { id: "05", label: "May" },
    { id: "06", label: "June" },
    { id: "07", label: "July" },
    { id: "08", label: "August" },
    { id: "09", label: "September" },
    { id: "10", label: "October" },
    { id: "11", label: "November" },
    { id: "12", label: "December" }
  ];

  let m = month_id ? monthFull.find(month => month.id == month_id): "";
  let month = m? m.label: "";
  let dp = departments ? departments.find(department => department.id == department_id):"";
  let clg = colleges ? colleges.find(college =>college.id == college_id):"";
  let dp_name = dp? dp.name: "";
  let clg_name = clg? clg.name: "";
  let clas = classData? classData.name : "";
  let sem = semesterData? semesterData.name : "";
  let session = session_id? session_id.toString() + "-" + (parseInt(session_id) + 1).toString() : "";
  console.log(session);
  const tableRef = useRef();

  const PrintRecipt = useReactToPrint({
    content: () => tableRef.current,
  });

  const handlePrint = async () => {
    console.log('pages exporting');
    await setItemsPerPage(1000000);  // max we can set is 9007199254740990
    PrintRecipt();
    await setItemsPerPage(50);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = Object.values(data).slice(startIndex, endIndex);
    const handleItemsPerPageChange = event => {
        const newItemsPerPage = parseInt(event.target.value, 10);
        setItemsPerPage(newItemsPerPage);
    };
    const { onDownload } = useDownloadExcel({
      currentTableRef: tableRef.current,
      filename: month + " attendance",
      sheet: "Users",
      transformData: (data) => {
        return data.map(row => {
          return Object.fromEntries(
            Object.entries(row).map(([key, value]) => {
              return [key, { value, style: 'mso-number-format:"\@"' }];
            })
          );
        });
      },
    });
    // const { onDownloadPrint } = useDownloadExcel({
    //   currentTableRef: tableRef.current,
    //   filename: month + " attendance",
    //   sheet: "Users"
    // });
    const onDownloadEnhanced  = async () => {
      await setItemsPerPage(1000000);  // max we can set is 9007199254740990
      onDownload();
      await setItemsPerPage(50);
    } 
    const handleDownloadExcel = () => {
        // const headers = ['student_id', 'student_name', 'subject_id', 'pa_id', ...days];

        // const reorderedData = data.map(({ student_id, student_name, subject_id, pa_id, ...rest }) => ({
        //     student_id,
        //     student_name,
        //     subject_id,
        //     pa_id,
        //     ...rest,
        //   }));
        
        //   const dataForExcel = reorderedData.map(item => {
        //     const rowData = headers.map(header => item[header]);
        //     return rowData;
        //   });

        const originalHeaders = ['student_id', 'student_name', 'subject_id', 'pa_id','total_id', ...days];
        const excelHeaders = ['Student USN', 'Student name', 'Subject', 'Present/Absent', 'Total', ...days]; 

        const reorderedData = data.map(({ student_id, student_name, subject_id, pa_id, total_id, ...rest }) => ({
            student_id,
            student_name,
            subject_id,
            pa_id,
            total_id,
            ...rest,
        }));

        const dataForExcel = reorderedData.map(item => {
            const rowData = excelHeaders.map(header => {
                const originalHeader = originalHeaders[excelHeaders.indexOf(header)];
                return item[originalHeader];
            });
            return rowData;
        });
        const worksheet = XLSX.utils.aoa_to_sheet([excelHeaders, ...dataForExcel]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, `${month_id}-${year_id}-attendance.xlsx`); // 'data.xlsx'
        
    };


  return (
    <div>
      <div className="mt-2">
        {/* <label>
            Show entries :
            <select className="ml-2" value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value={50}>50</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            </select>
        </label>
        <div>
        <span className="badge badge-soft-success ml-3" >P</span><p className="d-inline-block"> - Present</p>
        <span className="badge badge-soft-danger ml-3" >A</span><p className="d-inline-block"> - Absent</p>
        <span className="badge badge-soft-secondary ml-3" >NA</span><p className="d-inline-block"> - NA</p>
        </div> */}

        <div className="row">
            <div className="col-md-6">
                <label>
                    Show entries:
                    <select className="ml-2" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                        <option value={50}>50</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </label>
            </div>
            <div className="col-md-6 text-md-right">
                <span className="badge badge-soft-success ml-3">P</span><p className="d-inline-block ml-1"> -Present</p>
                <span className="badge badge-soft-danger ml-3">A</span><p className="d-inline-block ml-1"> -Absent</p>
                <span className="badge badge-soft-danger ml-3">H</span><p className="d-inline-block ml-1"> -Holiday</p>
                <span className="badge badge-soft-secondary ml-3">NA</span><p className="d-inline-block ml-1"> -Not available</p>
            </div>
        </div>


        <div className="d-flex justify-content-end">
        {/* <button className="btn btn-primary rounded-pill mr-2 mb-3" onClick={handlePrint}>
            Export PDF
        </button> */}
        <button className="btn btn-nex rounded-pill ml-2 mb-3" onClick={onDownloadEnhanced}>
            Export Excel
        </button>
        </div>
      </div>
      {/* <div className="d-flex justify-content-end">
            <button className="btn btn-primary rounded-pill" onClick={handlePrint} >
            Export PDF
            </button>
        </div>
        <div className="d-flex justify-content-end">
            <button onClick={handleDownloadExcel}>Download Excel</button>
        </div> */}
        
    <div className="table-responsive">
    <table className="table table-bordered" ref={tableRef} style={{ display: 'table' }} >
      <thead>
        <tr>
          <th colSpan={5 + numberofDays}>{college_title}</th>
        </tr>
        <tr>
          <th colSpan={2}>College : {clg_name}</th>
          <th colSpan={5}>Department : {dp_name}</th>
          <th colSpan={6}>Session : {session}</th>
          <th colSpan={5}>Year : {year_id}</th>
          <th colSpan={6}>Month : {month}</th>
          <th colSpan={6}>Class : {clas}</th>
          <th colSpan={numberofDays - 25}>Semester : {sem}</th>
        </tr>
        <tr>
          <th>Student Id</th>
          <th>Student name</th>
          <th>Subject</th>
          <th style={{ width: '80px', minWidth: '80px' }}>P/A</th>
          <th>Total</th>
          {days.slice(0,numberofDays)?.map((i, key) => {
            const dt = new Date(year_id+"-"+month_id+"-"+(i).toString());
            if (dt.getDay() === 0) {
                return (
                <th className="bg-light-danger">
                    <span>{i}</span>
                </th>
                )
            }
            else return (<th key={key}>{i}</th>)
            })}
        </tr>
      </thead>
      <tbody>
        {setLoading(1)}
        {currentData.map(item => (
          <tr>
            <td>{item.student_id}</td>
            <td>{item.student_name}</td>
            <td>{item.subject_id}</td>
            <td>{item.pa_id}</td>
            <td>{item.total_id}</td>
            {days.slice(0,numberofDays)?.map((v,key) => {
                const dt = new Date(year_id+"-"+month_id+"-"+(v).toString());
                if (dt.getDay() === 0) {
                  return (
                    <td className="bg-light-danger">
                        <span>{item[v]}</span>
                    </td>
                  )
                }
                else return (<td key={key}>
                        <span className={`badge badge-soft-${item[v]=="P"?"success":(item[v]=="A"?"danger":"secondary")}`} >{item[v]}</span>
                    </td>)
            })}
          </tr>
        ))}
        {setLoading(0)}
      </tbody>
    </table>
    </div>
    </div>
  );
};

const PaginationTable = ({data, numberofDays, days, year_id, month_id, setLoading,department_id,college_id,session_id,classData,semesterData}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage,setItemsPerPage] = useState(50);
    if(!data) return (<></>)

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <Table data={data} currentPage={currentPage} setCurrentPage= {setCurrentPage} itemsPerPage={itemsPerPage} setItemsPerPage = {setItemsPerPage} numberofDays = {numberofDays} days={days} year_id={year_id} month_id={month_id} setLoading={setLoading} department_id={department_id} college_id={college_id} session_id={session_id} classData={classData} semesterData={semesterData}/>

      {/* <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div> */}
      {/* <div className="pagination mt-4 d-flex justify-content-end" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
                </button>
            </li>
            ))}
        </ul>
      </div> */}

        <div className="pagination mt-4 d-flex justify-content-end" style={{ overflowX: 'auto', display: 'flex' }}>
          <ul className="pagination" style={{ minWidth: '100%' }}>
              {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                  </button>
              </li>
              ))}
          </ul>
        </div>

        

    </div>
  );
};

export default PaginationTable;
