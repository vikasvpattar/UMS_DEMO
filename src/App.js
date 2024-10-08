import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MainRouter from './app/Router/MainRouter';
import Router from './app/Router/Router';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './app/Components/ScrollToTop/ScrollToTop';
//Datatable Modules
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables"

import "datatables.net-dt/css/jquery.dataTables.min.css"

function App() {

  useEffect(()=>{
    // $(document).ready(function () {
    //   setTimeout(function () {
    //     $("#datatable").DataTable().destroy();
    //     $("#datatable").DataTable({
    //       columnDefs: [{
    //         "defaultContent": "-",
    //         "targets": "_all"
    //       }]
    //     });
    //   }, 2000);
    // });
  },[])


  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Router />
        {/* <MainRouter/> */}
        <ToastContainer 
        autoClose={2000}
        hideProgressBar={true}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
