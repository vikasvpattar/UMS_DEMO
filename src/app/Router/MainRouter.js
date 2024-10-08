// import React from 'react';
// import {
//     BrowserRouter as RR,
//     Routes,
//     Route,
// } from "react-router-dom";
// import { navbarData } from '../Data/navbar/Admin/navbarData';
// import { navbarDataStudent } from '../Data/navbar/Student/navbarDataStudent';

// //Routing config here
// import { ROUTES } from './routerConfig';

// //Navbar and Topbar
// import Navbar from '../Components/Navbar/Navbar';
// import Topbar from '../Components/Topbar/Topbar';

// //Dash And login
// import Dashboard from '../Pages/Dashboard/Dashboard';
// import Login from '../Pages/Login/Login';

// //Pages
// import AdmissionEnquiry from '../Pages/FrontOffice/AdmissionEnquiry/AdmissionEnquiry';
// import VisitorsBook from '../Pages/FrontOffice/VisitorsBook/VisitorsBook';
// import PhoneCallLog from '../Pages/FrontOffice/PhoneCallLog/PhoneCallLog';
// import PostalDispatch from '../Pages/FrontOffice/PostalDispatch/PostalDispatch';
// import PostalRecieve from '../Pages/FrontOffice/PostalRecieve/PostalRecieve';
// import Complain from '../Pages/FrontOffice/Complain/Complain';
// import SetupOffice from '../Pages/FrontOffice/SetupOffice/SetupOffice';
// import StudentAdmission from '../Pages/Students/StudentAdmission/StudentAdmission';
// import StudentDetails from '../Pages/Students/StudentDetails/StudentDetails';
// import DisableStudents from '../Pages/Students/DisableStudents/DisableStudents';
// import AddDepartment from '../Pages/HR/AddDepartment/AddDepartment';
// import AddNewStaff from '../Pages/HR/AddNewStaff/AddNewStaff';
// import ViewStaff from '../Pages/HR/ViewStaff/ViewStaff';
// import StaffAttendance from '../Pages/HR/StaffAttendance/StaffAttendance';
// import AddDesignation from '../Pages/HR/AddDesignation/AddDesignation';
// import Feedback from '../Pages/HR/Feedback/Feedback';
// import EditStudentDetails from '../Pages/Students/EditStudentDetails/EditStudentDetails';
// import StudentProfile from '../Pages/Students/StudentProfile/StudentProfile';
// import { navbarDataHR } from '../Data/navbar/HR/navbarDataHR';



// // const RouteWithAdmin = ({component:Component, ...rest}) =>{
  
// //   return(
// //   <Route {...rest} render={props => (
// //     <>
// //         <Navbar />
// //         <Component {...props} />
// //     </>
// //   )}
// //   />
// //   )
// // }


// // const RouteWithAdmin = ({ element:element, path:path }) =>{
  
// //   return(<>
// //     <Navbar data={navbarData}/>
// //     <Navbar data={navbarData}/>
// //     <Routes>
// //       <Route exact path={path} element={element}/>
// //     </Routes>
// //     </>
// //   )
// // }

// const RouteWithAdmin = ({ element: Component, ...rest }) =>{
  
//   return(
//     <Route {...rest} render={props => (
//       <>
//           <Topbar/>
//           <Navbar data={navbarData}/>
//           <Component {...props} />
//       </>
//     )}
//     />
//   )
// }



// const RouteWithStudent = ({ component: Component, ...rest }) =>{
  
//   return(<>
//     <Route {...rest} render={props => (
//       <>
//       <Topbar/>
//       <Navbar data={navbarDataStudent}/>
//           <Component {...props} />
//           </>
//     )}
//     />
//     </>
//   )
// }


// const RouteWithHR = ({ component: Component, ...rest }) =>{
  
//   return(<>
//     <Route {...rest} render={props => (
//       <>
//       <Topbar/>
//       <Navbar data={navbarDataHR}/>
//           <Component {...props} />
//           </>
//     )}
//     />
//     </>
//   )
// }





// function MainRouter() {
//   return (
//       // <RR>

//       //   {/* ////////
//       //   ////////
//       //     //Admin
//       //   ////////
//       //   //////// */}

                

//       //           {/* <RouteWithHR exact path={ROUTES.Admin.frontOffice.VisitorsBook} component={VisitorsBook}/> */}
//       //           {/* //FrontOfffice Routing */}
//       //           <RouteWithAdmin exact path={ROUTES.Admin.frontOffice.AdmissionEnquiry} component={AdmissionEnquiry}/>
//       //           <RouteWithAdmin exact path={ROUTES.Admin.frontOffice.VisitorsBook} component={VisitorsBook}/>
//       //           <RouteWithAdmin exact path={ROUTES.Admin.frontOffice.PhoneCallLog} component={PhoneCallLog}/>
//       //           <RouteWithAdmin exact path={ROUTES.Admin.frontOffice.PostalDispatch} component={PostalDispatch}/>
//       //           <RouteWithAdmin exact path={ROUTES.Admin.frontOffice.PostalRecieve} component={PostalRecieve}/>
//       //           <RouteWithAdmin exact path={ROUTES.Admin.frontOffice.Complain} component={Complain}/>
//       //           <RouteWithAdmin exact path={ROUTES.Admin.frontOffice.SetupOffice} component={SetupOffice}/>


//       //           {/* //Student Pages Routing */}
//       //           <RouteWithAdmin exact path={ROUTES.Admin.Student.StudentAdmission} component={StudentAdmission}/>
//       //           <RouteWithAdmin exact path={ROUTES.Admin.Student.StudentDetails} component={StudentDetails}/>
//       //           <RouteWithAdmin exact path={ROUTES.Admin.Student.DisableStudents} component={DisableStudents}/>
//       //           <RouteWithAdmin exact path={ROUTES.Admin.Student.EditStudentDetails} component={EditStudentDetails}/>
//       //           <RouteWithAdmin exact path={ROUTES.Admin.Student.StudentProfile} component={StudentProfile}/>


//       //           {/* //HR Pages Routing */}
//       //           <RouteWithAdmin exact path={ROUTES.Admin.HR.AddNewStaff} component={AddNewStaff}/>
//       //           <RouteWithAdmin exact path={ROUTES.Admin.HR.ViewStaff} component={ViewStaff}/>
//       //           <RouteWithAdmin exact path={ROUTES.Admin.HR.StaffAttendance} component={StaffAttendance}/>
//       //           <RouteWithAdmin exact path={ROUTES.Admin.HR.AddDesignation} component={AddDesignation}/>
//       //           <RouteWithAdmin exact path={ROUTES.Admin.HR.AddDepartment} component={AddDepartment}/>
//       //           <RouteWithAdmin exact path={ROUTES.Admin.HR.Feedback} component={Feedback}/>



//       //   {/* <RouteWithStudent exact path={ROUTES.Admin.frontOffice.AdmissionEnquiry} component={AdmissionEnquiry}/> */}
//       //   </RR>



//         <RR>
//           <Routes>
//                 {/* <RouteWithAdmin exact path={'/'} element={<Dashboard />}/>
//                 <RouteWithAdmin exact path='/login' element={<Login/>}/>
//                 <RouteWithAdmin exact path={ROUTES.dashboard} element={<Dashboard/>}/> */}
//                 <RouteWithAdmin exact path={ROUTES.Admin.frontOffice.AdmissionEnquiry} element={AdmissionEnquiry}/>
//                 {/* <RouteWithAdmin exact path={ROUTES.Admin.frontOffice.VisitorsBook} element={<VisitorsBook/>}/>
//                 <RouteWithAdmin exact path={ROUTES.Admin.frontOffice.PhoneCallLog} element={<PhoneCallLog/>}/>
//                 <RouteWithAdmin exact path={ROUTES.Admin.frontOffice.PostalDispatch} element={<PostalDispatch/>}/>
//                 <RouteWithAdmin exact path={ROUTES.Admin.frontOffice.PostalRecieve} element={<PostalRecieve/>}/>
//                 <RouteWithAdmin exact path={ROUTES.Admin.frontOffice.Complain} element={<Complain/>}/>
//                 <RouteWithAdmin exact path={ROUTES.Admin.frontOffice.SetupOffice} element={<SetupOffice/>}/> */}
//           </Routes>
//         </RR>
//   )
// }

// export default MainRouter