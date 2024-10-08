import React, { useEffect, useState } from "react";
import { BrowserRouter as RR, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Http } from "../Services/Services";
import { getIndianTime } from "../Helpers/timeHelpers";
import { LOGS_ROUTES } from "../utils/logsConstants";

//nav datas
import { navbarData } from "./../Data/navbar/Admin/navbarData";
import { navbarDataHR } from "./../Data/navbar/HR/navbarDataHR";
import { navbarDataFrontOffice } from "../Data/navbar/FrontOffice/navbarFrontOffice";
import { InfoUploading } from "../Data/navbar/InfoUploadingData/InfoUploading";
import { InfoWarden } from "../Data/navbar/Warden/navbarWarden.js";

import UserCredentials from "../Components/Employee/Credentials/UserCredentials.jsx";
import AdmissionEnquiry from "../Pages/FrontOffice/AdmissionEnquiry/AdmissionEnquiry";
import { ROUTES } from "./routerConfig";
import VisitorsBook from "../Pages/FrontOffice/VisitorsBook/VisitorsBook";
import Navbar from "../Components/Navbar/Navbar";
import Topbar from "../Components/Topbar/Topbar";
import PhoneCallLog from "../Pages/FrontOffice/PhoneCallLog/PhoneCallLog";
import PostalDispatch from "../Pages/FrontOffice/PostalDispatch/PostalDispatch";
import PostalRecieve from "../Pages/FrontOffice/PostalRecieve/PostalRecieve";
import Complain from "../Pages/FrontOffice/Complain/Complain";
import SetupOffice from "../Pages/FrontOffice/SetupOffice/SetupOffice";
import StudentAdmission from "../Pages/Students/StudentAdmission/StudentAdmission";
import StudentDetails from "../Pages/Students/StudentDetails/StudentDetails";
import StudentView from "../Pages/Students/StudentProfile/StudentView";
import DisableStudents from "../Pages/Students/DisableStudents/DisableStudents";
import StudentAdmissionEnquiry from "./../Pages/Students/admissionEnquiry/AdmissionEnquirry";
import StudentAdmissionDetails from "./../Pages/Students/admissionDetails/AdmissionDetails";
import AddNewStaff from "../Pages/HR/AddNewStaff/AddNewStaff";
import ViewStaff from "../Pages/HR/ViewStaff/ViewStaff";
import EditStudentDetails from "../Pages/Students/EditStudentDetails/EditStudentDetails";
import StudentProfile from "../Pages/Students/StudentProfile/StudentProfile";
import EditStaff from "../Pages/HR/EditStaff/EditStaff";
import WebAccount from "../Pages/HR/Staff/WebAccount/WebAccount";
import Footer from "../Components/Footer/Footer";
import DashboardHR from "../Pages/HR/Dashboard/DashboardHR";
import JobPosition from "../Pages/HR/Employer/JobPosition/JobPosition";
import Department from "../Pages/HR/Employer/Department/Department";
import EmployerBranch from "../Pages/HR/Employer/Branch/EmployerBranch";
import EmployerLevel from "../Pages/HR/Employer/Level/EmployerLevel";
import EmployerBank from "../Pages/HR/Employer/Bank/EmployerBank";
import EmployerCourse from "../Pages/HR/Employer/Course/EmployerCourse";
import EmployerTrainer from "../Pages/HR/Employer/Trainer/EmployerTrainer";
import EmployerEnthicity from "../Pages/HR/Employer/Enthicity/EmployerEnthicity";
import EmployerReligion from "../Pages/HR/Employer/Religion/EmployerReligion";
import EmployerDocs from "../Pages/HR/Employer/Document/EmployerDocs";
import SalaryAdjustment from "../Pages/HR/PayRoll/SalaryAdjustment/SalaryAdjustment";
import PayRollEarning from "../Pages/HR/PayRoll/Earning/PayRollEarning";
import PayRollBonus from "../Pages/HR/PayRoll/Earning/PayRollBonus";
import PayRollDeduction from "../Pages/HR/PayRoll/Earning/PayRollDeduction";
import OnlineTransactionReport from "../Pages/Reports/Fees/OnlineTransactionReport.jsx";
import PayRollStationaryContribution from "../Pages/HR/PayRoll/Earning/PayRollStationaryContribution";
import PayRollProcess from "../Pages/HR/PayRoll/Process/PayRollProcess";
import LeaveSetting from "../Pages/HR/Leave/Setting/LeaveSetting";
import LeaveWorkDay from "../Pages/HR/Leave/Workday/LeaveWorkDay";
import LeaveHoliday from "../Pages/HR/Leave/Holiday/LeaveHoliday";
import EarningPolicy from "../Pages/HR/Leave/EarningPolicy/EarningPolicy";
import AppovalWorkflow from "../Pages/HR/Leave/ApprovalWorkflow/AppovalWorkflow";
import LeaveCustomApprover from "../Pages/HR/Leave/CustomApprover/LeaveCustomApprover";
import LeaveLeaveType from "../Pages/HR/Leave/LeaveType/LeaveLeaveType";
import LeaveEntitlementReport from "../Pages/HR/Leave/EntitlementReport/LeaveEntitlementReport";
import LeaveTransactionReport from "../Pages/HR/Leave/TransactionReport/LeaveTransactionReport";
import LeaveReview from "../Pages/HR/Leave/Riview/LeaveReview";
import ViewIncome from "../Pages/Accounts/Income/ViewIncome";
import AddIncome from "../Pages/Accounts/Income/AddIncome";
import AddIncomeSource from "../Pages/Accounts/Income/AddIncomeSource";
import ViewExpense from "../Pages/Accounts/Expense/ViewExpense";
import AddExpense from "../Pages/Accounts/Expense/AddExpense";
import AddExpenseSource from "../Pages/Accounts/Expense/AddExpenseSource";
import FeeCollectionCollectFee from "../Pages/Accounts/FeeCollection/FeeCollectionCollectFee";
import FeeCollectionSearchFee from "../Pages/Accounts/FeeCollection/FeeCollectionSearchFee";
import FeeCollectionSearchDue from "../Pages/Accounts/FeeCollection/FeeCollectionSearchDue";
import FeeCollectionFeeMaster from "../Pages/Accounts/FeeCollection/FeeCollectionFeeMaster";
import FeeCollectionFeeType from "../Pages/Accounts/FeeCollection/FeeCollectionFeeType";
import FeeCollectionFeeGroup from "../Pages/Accounts/FeeCollection/FeeCollectionFeeGroup";
import FeeCollectionFeeDiscount from "../Pages/Accounts/FeeCollection/FeeCollectionFeeDiscount";
import AttendanceManagement from "../Pages/HR/Attendance/Management/AttendanceManagement";
import AttendanceFieldCheckIn from "../Pages/HR/Attendance/FieldCheckIn/AttendanceFieldCheckIn";
import AttendanceTimeClockReport from "../Pages/HR/Attendance/TimeClockReport/AttendanceTimeClockReport";
import TeamDiscussion from "../Pages/HR/Team/Discussion/TeamDiscussion";
import TeamAnnouncement from "../Pages/HR/Team/Announcement/TeamAnnouncement";
import TeamDocumentandForm from "../Pages/HR/Team/Document/TeamDocumentandForm";
import DocManagement from "../Pages/HR/DocumentWorkflow/Management/DocManagement";
import DocReview from "../Pages/HR/DocumentWorkflow/Review/DocReview";
import DocApprovalWorkflow from "../Pages/HR/DocumentWorkflow/ApprovalWorkFlow/DocApprovalWorkflow";
import DocCustomApprover from "../Pages/HR/DocumentWorkflow/CustomApprover/DocCustomApprover";
import EmployerInformation from "../Pages/HR/Employer/Information/EmployerInformation";
import EmployeeCollegeType from "../Pages/HR/Employer/CollegeType/EmployeeCollegeType";
import EmployeeSpecialization from "../Pages/HR/Employer/Specialization/EmployeeSpecialization";
import EmployeeProgram from "../Pages/HR/Employer/Program/EmployeeProgram";
import EmployeeCollege from "../Pages/HR/Employer/College/EmployeeCollege";
import EmployeeCollegeSpecialization from "../Pages/HR/Employer/CollegeSpecialization/EmployeeCollegeSpecialization";
import { ALL_DATA } from "../utils/apiConstants";
import LeaveManagement from "../Pages/HR/Leave/Management/LeaveManagement";
import TeamChat from "../Pages/HR/Team/Chat/TeamChat";
import Planner from "../Pages/HR/Leave/Planner/Planner";
import Register from "../Pages/Register/Register";
import Schedule from "../Pages/HR/Leave/Schedule/Schedule";
import {
  LOCAL_COLLEGE,
  LOCAL_COLLEGE_SPECIALIZATION,
  LOCAL_COLLEGE_TYPES,
  LOCAL_DEPARTMENT,
  LOCAL_EMPLOYEE,
  LOCAL_JOBROLES,
  LOCAL_PROGRAM,
  LOCAL_SPECIALIZATION,
  LOCAL_USER_ROLES,
} from "../utils/LocalStorageConstants";
import { navbarDataIT } from "../Data/navbar/IT/navbarIT.js";

import EmployerApprovalWorkflow from "../Pages/HR/Employer/EmployerApprovalWorkFlow/EmployerApprovalWorkflow";
import TransportRoute from "../Pages/Transportation/TransportRoute/TransportRoute";
import TransportVehicle from "../Pages/Transportation/TransportVehicle/TransportVehicle";
import TransportAssignVehicles from "../Pages/Transportation/TransportAssignVehicles/TransportAssignVehicles";
import HostelRooms from "../Pages/Hostel/HostelRooms/HostelRooms";
import HostelBeds from "../Pages/Hostel/HostelBeds/HostelBeds";
import Hostel from "../Pages/Hostel/Hostel/Hostel";
import RoomType from "../Pages/Hostel/RoomType/RoomType";
import IssueItems from "../Pages/Inventory/IssueItem/IssueItems";
import Additemstock from "../Pages/Inventory/AddItemStock/AddItemstock";
import AddItem from "../Pages/Inventory/AddItem/AddItem";
import ItemCategory from "../Pages/Inventory/ItemCategory/ItemCategory";
import ItemStore from "../Pages/Inventory/ItemStore/ItemStore";
import Itemsupplier from "../Pages/Inventory/ItemSupplier/ItemSupplier";
import DesignHallticket from "../Pages/Certificates/DesignHallticket/DesignHallticket";
import DesignMarkscard from "../Pages/Certificates/DesignMarksCard/DesignMarkscard";
import MonthWiseAttendance from "../Pages/Reports/Student/MonthWiseAttendance";

import Loader from "../Components/Loader/Loader";
import {
  navbarDataEmployee,
  navbarDataEmployeeReview,
} from "../Data/navbar/Employee/NavbarEmployee";
import {
  SESSION_AUTH,
  SESSION_COLLEGE_ID,
  SESSION_EMPLOYEE_ID,
  SESSION_EMPLOYEE_REVIEW,
  SESSION_ROLE,
} from "../utils/sessionStorageContants";

import ClassTimeTable from "../Pages/Academics/ClassTimeTable";
import CreateTimeTable from "../Pages/Academics/CreateTimeTabel";
import TeachersTimetable from "../Pages/Academics/TeachesTimetable";
import PromoteStudents from "../Pages/Academics/PromoteStudents";
import TransferStudents from "../Pages/Academics/TransferStudents.jsx";
import AddBatch from "../Pages/Academics/AddBatch";
import AssignStudents from "../Pages/Academics/AssignStudents";
import AddSubjects from "../Pages/Academics/AddSubjects";
import AddClass from "../Pages/Academics/AddClass";
import AddLessons from "../Pages/Academics/AddLessons";
import AddTopics from "../Pages/Academics/AddTopics";
import SyllabusStatus from "../Pages/Academics/SyllabusStatus";
import ManageLessonPlan from "../Pages/Academics/ManageLessonPlan";

/////////////////////////////// EMPLOYEE //////////////////////////////

import EmployeeLeaveApplication from "../Pages/Employee/Leave/Application";
import EmployeeLeaveEntitlement from "../Pages/Employee/Leave/Entitlement";
import EmployeeSchedule from "../Pages/Employee/Leave/Schedule";

import EmployeeProfile from "../Pages/Employee/Profile/EmployeeProfile";
import EmployeeTeamAnnouncement from "./../Pages/Employee/Team/Announcement/EmployeeTeamAnnouncement";
import EmployeeTeamDocument from "../Pages/Employee/Team/Document/EmployeeTeamDocument";
import EmployeeTeamDiscussion from "../Pages/Employee/Team/Discussion/EmployeeTeamDiscussion";
import EmployeeDocumentManagement from "../Pages/Employee/Document/EmployeeDocumentManagement";

import EmployeeReview from "./../Pages/Employee/Leave/Review";

import EmployeeAnnualStatement from "./../Pages/Employee/PayRoll/AnnualStatement/AnnualStatements";
// import Employeepayslip from './../Pages/Employee/PayRoll/PaySlip/Payslip'
import EmployerSalary from "./../Pages/Employee/PayRoll/Salary/Salary";
import EmployerAttendance from "./../Pages/Employee/Attendance/AttendanceManagement";
import { navbarDataRegistar } from "../Data/navbar/Registar/NavbarDataRegistar";
import { navbarDataPrincipal } from "../Data/navbar/Principal/navbarDataPrincipal";
import DashboardEmployee from "../Pages/Employee/Dashboard/DashboardEmployee";
import FeeCollectionFeeTypeAmount from "../Pages/Accounts/FeeCollection/FeeCollectionFeeTypeAmount";
import AddSemester from "../Pages/Academics/AddSemester";
import AddSection from "../Pages/Academics/AddSection";

///////////////////////////////////////////////////Admission/////////////////////////////////////////////////
import AdmssionStudentDetails from "./../Pages/Admission/admissionDetails/AdmissionDetails";
import AdmssionStudentEnquiry from "./../Pages/Admission/admissionEnquiry/AdmissionEnquirry";
import AdmissionNewAdmission from "./../Pages/Admission/StudentAdmission/StudentAdmission.jsx";
import AdmissionStudentProfile from "./../Pages/Admission/admissionProfile/AdmissionProfile";
import FeeCollectionAddFee from "../Pages/Accounts/FeeCollection/FeeCollectionAddFee";
import FeeCollectionAssignFee from "../Pages/Accounts/FeeCollection/FeeCollectionAssignFee";
import Invoice from "./../Pages/Admission/invoice/Invoice.jsx";
import InvoiceDetails from "./../Pages/Admission/invoice/InvoiceDetails.jsx";
import { ExamNavbar } from "../Data/navbar/Examination/ExamNavbar";

import Commitee from "../Pages/Examination/Exam_committee";
import AssignStaff from "../Pages/Examination/Create_Exams";
import CreateQuestionPaper from "../Pages/Examination/CreateQuestionPaper";
import CreateExamTimetable from "../Pages/Examination/CreateExamTimetable";
import ExamSchedule from "../Pages/Examination/ExamSchedule";
import ExamSeatingArrangements from "../Pages/Examination/ExamSeatingArrangements";
import PostExamination from "../Pages/Examination/PostExaminations";
import OtpVerification from "../Pages/Examination/OtpVerification";
import DownloadQuestionPaper from "../Pages/Examination/DownloadQuestionPaper";
import InvigilatorLogin from "../Pages/Examination/InvigilatorLogin";
import AssignAnswersheets from "../Pages/Examination/AssignAnswersheets";
import AnswersheetChecking from "../Pages/Examination/AnswersheetChecking";
import Studentslist from "../Pages/Examination/Studentslist";
import ExamEnrollment from "../Pages/Examination/ExamEnrollment";
import StudentApplicationForm from "../Pages/Examination/StudentApplicationForm";
import DownloadHallTicket from "../Pages/Examination/DownloadHallTicket";
import UserLogs from "../Pages/Library/UserLogs/UserLogs.jsx";

import AssignCommitteeStaff from "../Pages/Examination/CommitteeMembers";
import AddInvigilators from "../Pages/Examination/AddInvigilators";
import AddEvaluators from "../Pages/Examination/AddEvaluators";
import HallTickets from "../Pages/Examination/HallTickets";
import DownloadAttendanceList from "../Pages/Examination/DownloadAttendanceList";
import AttendanceList from "../Pages/Examination/AttendanceList";
import { navbarDataAccountant } from "../Data/navbar/Accountant/navbarDataAc";
import DashboardAccountant from "../Pages/Dashboard/DashboardAccount";
import PhdAdmissions from "../Pages/Admission/PhdAdmissions";
import PhdAdmitCard from "../Pages/Admission/PrintAdmitCard";
import ApproveStudentId from "../Pages/Students/ApproveStudentId/ApproveStudentId";

//PhdExam
import PhdList from "../Pages/Examination/PhdExam/PhdList";
import PhdExamProfile from "../Pages/Examination/PhdExam/PhdExamProfile";
import PhdExamHallTicket from "../Pages/Examination/PhdExam/PhdExamHallTicket";

import DeclarationForm1 from "../Pages/HR/Declaration_Forms/DeclarationForm1";
import IssueItem from "../Pages/Inventory/Issue/IssueItem";
import { navbarDataReceptionist } from "../Data/navbar/Reception/NavbarDataReception";
import ClassAttendance from "../Pages/Attendance/ClassAttendance";
import LabAttendance from "../Pages/Attendance/LabAttendance";
import ViewAssignedStudents from "../Pages/Academics/ViewAssignedStudents";

//Library

import Books from "../Pages/Library/Books/Books";
import LibrarySettings from "../Pages/Library/Settings/Setting/LibrarySettings";
import BorrowBook from "../Pages/Library/BorrowReturnedBooks/Borrow/BorrowBook";
import LibraryReport from "../Pages/Library/Reports/Reports";
import LibraryDashboard from "../Pages/Library/Dashboard/DashBoard";
import LibraryEbook from "../Pages/Library/Ebook/Ebook";

//LMS
import LMSCreate from "./../Pages/LMS/Create";
import LMSList from "./../Pages/LMS/List";

import PhdStudentProfile from "../Pages/Admission/PhdStudentProfile";
import FeeCollectionDummySearch from "../Pages/Accounts/FeeCollection/FeeCollectionDummySearch";
import { navbarDataLib } from "../Data/navbar/Library/navbarDataLib";
import FeeCollectionReports from "../Pages/Accounts/FeeCollection/FeeCollectionReports";
import AddQuestionBank from "../Pages/Academics/AddQuestionBank";
import { navbarDataSHR } from "../Data/navbar/SHR/navbarDataSHR";

//reports
import StudentAdmissionReport from "../Pages/Reports/Student/StudentAdmissionReport";
import Reports from "../Pages/Reports/Reports";
import ReportsFeeHome from "../Pages/Reports/Fees/ReportsFeeHome";
import AdvancePayment from "../Pages/Reports/Fees/AdvancePayment";
import AdvancePaymentHome from "../Pages/Reports/Fees/AdvancePaymentHome";
import ReportsBha1 from "../Pages/Reports/Fees/ReportsBha1";
import ReportsBha2 from "../Pages/Reports/Fees/ReportsBha2";
import ReportsBha3 from "../Pages/Reports/Fees/ReportsBha3";
import ReportsBha4 from "../Pages/Reports/Fees/ReportsBha4";
import ReportsBha6 from "../Pages/Reports/Fees/ReportsBha6";
import ReportsBha5 from "../Pages/Reports/Fees/ReportsBha5";
import hostelFeeCollectionReport from "../Pages/Reports/Fees/hostelFeeCollectionReport";
import FacultyWiseHostelReport from "../Pages/Reports/Fees/FacultyWiseHostelReport";
import CollegeWiseCollectionReport from "../Pages/Reports/Fees/CollegeWiseCollectionReport";
import DepartmentWiseCollectionReport from "../Pages/Reports/Fees/DepartmentWiseCollectionReport";
import ProgramWiseCollectionReport from "../Pages/Reports/Fees/ProgramWiseCollectionReport";
import AdmintoExamination from "../Pages/Navigator/AdmintoExamination";
import ForgotPassword from "../Pages/Register/ForgotPassword";
import ForgotPassword1 from "../Pages/Register/ForgotPassword1";
import DeanReports from "../Pages/Reports/DeanReports";
import StudentsExams from "../Pages/Students/Exams/StudentsExams";
import ReportsPendingClasswise from "../Pages/Reports/Fees/ReportsPendingClasswise";
import ReportFeePendingCollege from "../Pages/Reports/Fees/ReportFeePendingCollege";
import FeedbacksHome from "../Pages/Reports/Feedbacks/FeedbacksHome";
import StudentMidtermExam from "../Pages/Students/Exams/StudentMidtermExam";
import StudentsVivaMarks from "../Pages/Students/Exams/StudentVivaMarks";
import DashboardRegistrar from "../Pages/Dashboard/DashboardRegistrar";
import ReportStaffHome from "../Pages/Reports/Staff/ReportStaffHome";
import ReportStaffLeave from "../Pages/Reports/Staff/ReportStaffLeave";
import ReportStudentAttendance from "../Pages/Reports/Student/Attendance";

import transportFee from "../Pages/Transportation/TransportFee/transportFee";
import hostelFees from "../Pages/Hostel/HostelFee/hostelfee";
import AddHostelFee from "../Pages/Hostel/HostelFee/addhostelFee";
import AddTransportFee from "../Pages/Transportation/TransportFee/addTransportFee";
import Tickets from "../Pages/Tickets/Tickets";
import Complaints from "../Pages/Students/Complaints/Complaints";
import DevelopersCentre from "../Pages/Tickets/DevelopersCentre";
import DevelopersConversation from "../Pages/Tickets/DevelopersConversation";
import TicketConversation from "../Pages/Tickets/TicketConversation";
import MediaInfo from "../Pages/InfoUploading/MediaInfo";
import SearchBook from "../Pages/Library/Books/SearchBook.jsx";
import HomeoInfo from "../Pages/InfoUploading/HomeoInfo";

import { NavbarAdCon } from "../Data/navbar/AdmissionConsultant/NavbarAdCon";
import ReportStudentAttendanceSemWise from "../Pages/Reports/Student/ReportStudentAttendanceSemWise";
import ReportOneStudentStat from "../Pages/Reports/Student/ReportOneStudentStat";
import { navbarCashier } from "../Data/navbar/Cashier/navbarCashier.js";
import ReportOneStudentSubject from "../Pages/Reports/Student/ReportOneStudentSubject";
import AdmissionConsultanttoHR from "../Pages/Navigator/AdmissionConsultanttoHR";
import StudentUpdateAbc from "../Pages/Students/UpdateAbc/StudentUpdateAbc";

import StudentDetails1 from "../Pages/Students/StudentDetails/StudentDetails1";

import DateWiseTransportFees from "../Pages/Reports/Fees/TransportFeesReportDateWise";
import ViewStudentProfile from "../Pages/Students/StudentProfile/ViewStudentProfile";
import ResearchandPublication from "../Pages/InfoUploading/ResearchandPublication";
import HomeopathyStudentsList from "../Pages/InfoUploading/HomeopathyStudentsList";
import ViewHomeoStudentsList from "../Pages/InfoUploading/ViewHomeoStudentsList";
import CollegePermission from "../Pages/InfoUploading/CollegePermission";

import ViewCollegePermission from "../Pages/InfoUploading/ViewCollegePermission";
import StaffDairy from "../Pages/InfoUploading/StaffDairy";

import EntitlementDetaildReport from "../Pages/HR/Leave/Reports/EntitlementDetaildReport";
import ViewStaffDairy from "../Pages/InfoUploading/ViewStaffDairy";

import HomeopathyResults from "../Pages/InfoUploading/HomeopathyResults";

import LeaveDetailedReport from "../Pages/HR/Leave/Reports/LeaveDetailedReport";
import ViewTickets from "../Pages/Tickets/ViewTickets";
import ViewMediaInfo from "../Pages/InfoUploading/ViewMediaInfo";
import PickupPoints from "../Pages/Transportation/TransportPickupPoints/PickupPoints";
import TransportAssignPickupPoints from "../Pages/Transportation/TransportAssignPickupPoints/TransportAssignPickupPoints";
import TransportFees from "../Pages/Transportation/TransportFees/TransportFees";
import HostelFloors from "../Pages/Hostel/HostelFloors/HostelFloors";
import StaffDairyReport from "../Pages/InfoUploading/StaffDairyReport";
import ViewPostalDispatchRecieve from "../Pages/FrontOffice/ViewPostalDispatchRecieve/ViewPostalDispatchRecieve";
import StaffDairyReport2 from "../Pages/InfoUploading/StaffDairyReport2";
import ViewHomeopathyResults from "../Pages/InfoUploading/ViewHomeopathyResults";
import SyllabusUpload from "../Pages/InfoUploading/SyllabusUpload.jsx";
import OPDServices from "../Pages/InfoUploading/OPDServices.jsx";
import IPDServices from "../Pages/InfoUploading/IPDServices.jsx";
import CollegeAffiliation from "../Pages/InfoUploading/CollegeAffiliation.jsx";
import EventCalendar from "../Pages/InfoUploading/EventCalendar.jsx";
import CompanyDetails from "../Pages/InfoUploading/CompanyDetails.jsx";
import StudentsPlacements from "../Pages/InfoUploading/StudentsPlacements.jsx";
import Recruitment from "../Pages/InfoUploading/Recruitment.jsx";
import ViewRecruitment from "../Pages/InfoUploading/ViewRecruitment.jsx";
import IncomeReport from "../Pages/Reports/Income/IncomeReport.jsx";
import NewStaff from "../Pages/Employee/Team/newStaff.jsx";
import ExpenseReport from "../Pages/Reports/Expenses/ExpenseReport.jsx";
import LessonPlanReport from "../Pages/Reports/LessonPlan/LessonPlanReport.jsx";
import StaffAttendanceReport from "../Pages/Reports/StaffAttendance/StaffAttendanceReport.jsx";
import FeedbackTrigger from "../Components/HR/Feedback/FeedbackTrigger.jsx";
import ReportStaffDetails from "../Pages/Reports/Staff/ReportStaffDetails.jsx";
import HostelEditWarden from "../Pages/HostelEditWarden.jsx";
import AssignHostelStudents from "../Pages/Students/AssignHostelStudents.jsx";
import StudentProfile1 from "../modals/StudentProfile1.jsx";
import StudentDetailsHostel from "../Pages/Students/StudentDetails/StudentDetailsHostel.jsx";
import ModalHostelRooms from "../modals/ModalHostelRooms.jsx";
import ModalHostelRoomsAssign from "../modals/ModalHostelRoomsAssign.jsx";
import CancelledReceipts from "../Pages/Reports/Fees/CancelledReceipts.jsx";
import Sliders from "../Pages/InfoUploading/Sliders.jsx";
import AdmissionNotifications from "../Pages/InfoUploading/AdmissionNotifications.jsx";
import UniversityNotifications from "../Pages/InfoUploading/UniversityNotifications.jsx";
import Committees from "../Pages/InfoUploading/Committees.jsx";
import AcademicCalendar from "../Pages/InfoUploading/AcademicCalendar.jsx";
import PCI_SIF_Pharmacy from "../Pages/InfoUploading/PCI_SIF_Pharmacy.jsx";
import Achievements from "../Pages/InfoUploading/Achievements.jsx";
import PhotoGallery from "../Pages/InfoUploading/PhotoGallery.jsx";
import HospitalStaffAttendance from "../Pages/InfoUploading/HospitalStaffAttendance.jsx";
import Milestones from "../Pages/InfoUploading/Milestones.jsx";
import Approvals from "../Pages/InfoUploading/Approvals.jsx";
import ViewAluminiStudents from "../Pages/Academics/ViewAluminiStudents.jsx";
import StaffDetailsNew from "../Pages/InfoUploading/StaffDetailsNew.jsx";
import Achievements2 from "../Pages/InfoUploading/Achievements2.jsx";

function Router() {
  const [role, setRole] = useState("");
  const [colleges, setColleges] = useState();

  const getRoles = async () => {
    setRole(sessionStorage.getItem("role"));
  };

  const changeCollege = (id) => {
    sessionStorage.setItem(SESSION_COLLEGE_ID, id);
    setCollegeId(id);
  };

  const getCollegeId = () => {
    if (sessionStorage.getItem(SESSION_COLLEGE_ID) !== null) {
      return sessionStorage.getItem(SESSION_COLLEGE_ID);
    } else return null;
  };

  const [collegeId, setCollegeId] = useState(getCollegeId());

  const getAllData = async () => {
    var config = {
      method: "get",
      url: ALL_DATA,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res);
        localStorage.setItem("ALL_DATA", JSON.stringify(res.data));
        localStorage.setItem(
          LOCAL_USER_ROLES,
          JSON.stringify(res.data.userRoles)
        );
        localStorage.setItem(LOCAL_COLLEGE, JSON.stringify(res.data.college));
        localStorage.setItem(
          LOCAL_COLLEGE_SPECIALIZATION,
          JSON.stringify(res.data.collegeSpecialization)
        );
        localStorage.setItem(
          LOCAL_COLLEGE_TYPES,
          JSON.stringify(res.data.collegeType)
        );
        localStorage.setItem(
          LOCAL_DEPARTMENT,
          JSON.stringify(res.data.department)
        );
        localStorage.setItem(LOCAL_JOBROLES, JSON.stringify(res.data.jobRoles));
        localStorage.setItem(LOCAL_PROGRAM, JSON.stringify(res.data.program));
        localStorage.setItem(
          LOCAL_SPECIALIZATION,
          JSON.stringify(res.data.specialization)
        );
        localStorage.setItem(
          LOCAL_USER_ROLES,
          JSON.stringify(res.data.userRoles)
        );
        localStorage.setItem(LOCAL_EMPLOYEE, JSON.stringify(res.data.employee));
        setColleges(res.data.college);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const RouteWithHR = ({ Element }) => {
    const [loading, setLoading] = useState(0);

    const getAuth = () => {
      return sessionStorage.getItem(SESSION_AUTH) ? true : false;
    };

    const getRole = () => {
      return sessionStorage.getItem(SESSION_ROLE)
        ? sessionStorage.getItem(SESSION_ROLE)
        : false;
    };

    const [auth, setAuth] = useState(getAuth());
    const [role, setRole] = useState(getRole());

    useEffect(() => {
      setRole(getRole());
    }, [sessionStorage.getItem(SESSION_ROLE)]);

    const setupCollege = async () => {
      await getCollegeId()
        .then((data) => {
          if (data == "null") {
            setCollegeId(colleges[0]?.id);
          } else {
            setCollegeId(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    useEffect(() => {
      setupCollege();
    }, []);

    if (auth == false || collegeId == false) return <Navigate replace to="/" />;

    if (role == "SUPERADMIN") {
      navbarDataHR?.map((item, key) => {
        if (item.title == "Dean") {
          item.route = ROUTES.Registar.dashboard;
        }
      });
    }
    return (
      <>
        {/* {auth ? null : <Navigate replace to="/" />} */}
        <Loader loading={loading} />
        <Topbar changeCollege={changeCollege} />
        <Navbar data={role == "SHR" ? navbarDataSHR : navbarDataHR} />
        <Element setLoading={setLoading} collegeId={collegeId} />
        <Footer />
      </>
    );
  };

  const RouteWithDevelopers = ({ Element }) => {
    const [loading, setLoading] = useState(0);

    const getAuth = () => {
      return sessionStorage.getItem(SESSION_AUTH) ? true : false;
    };

    const getRole = () => {
      return sessionStorage.getItem(SESSION_ROLE)
        ? sessionStorage.getItem(SESSION_ROLE)
        : false;
    };
    const [role, setRole] = useState(getRole());

    useEffect(() => {
      setRole(getRole());
    }, [sessionStorage.getItem(SESSION_ROLE)]);

    return (
      <>
        {/* {auth ? null : <Navigate replace to="/" />} */}
        <Loader loading={loading} />
        <Topbar />
        <Element setLoading={setLoading} collegeId={collegeId} />
        <Footer />
      </>
    );
  };

  const RouteWithIT = ({ Element }) => {
    const [loading, setLoading] = useState(0);

    const getRole = () => {
      return sessionStorage.getItem(SESSION_ROLE)
        ? sessionStorage.getItem(SESSION_ROLE)
        : false;
    };
    const [role, setRole] = useState(getRole());

    useEffect(() => {
      setRole(getRole());
    }, [sessionStorage.getItem(SESSION_ROLE)]);

    return (
      <>
        {/* {auth ? null : <Navigate replace to="/" />} */}
        <Loader loading={loading} />
        <Topbar />
        <Navbar data={navbarDataIT} />
        <Element setLoading={setLoading} collegeId={collegeId} />
        <Footer />
      </>
    );
  };

  const RouteWithWarden = ({ Element }) => {
    const [loading, setLoading] = useState(0);

    const getAuth = () => {
      return sessionStorage.getItem(SESSION_AUTH) ? true : false;
    };

    const getRole = () => {
      return sessionStorage.getItem(SESSION_ROLE)
        ? sessionStorage.getItem(SESSION_ROLE)
        : false;
    };
    const [role, setRole] = useState(getRole());
    const [auth, setAuth] = useState(getAuth());

    useEffect(() => {
      setRole(getRole());
    }, [sessionStorage.getItem(SESSION_ROLE)]);

    const setupCollege = async () => {
      await getCollegeId()
        .then((data) => {
          if (data == "null") {
            setCollegeId(colleges[0]?.id);
          } else {
            setCollegeId(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    useEffect(() => {
      setupCollege();
    }, []);

    if (auth == false || collegeId == false) return <Navigate replace to="/" />;

    return (
      <>
        {/* <Topbar /> */}
        <Topbar changeCollege={changeCollege} />
        <Loader loading={loading} />
        <Navbar data={role == "WARDEN" ? InfoWarden : InfoWarden} />
        {/* <Element setLoading={setLoading} /> */}
        <Element setLoading={setLoading} collegeId={collegeId} />
        <Footer />
      </>
    );
  };

  const RouteWithEmployee = ({ Element }) => {
    const [loading, setLoading] = useState(0);

    const getAuth = () => {
      return sessionStorage.getItem(SESSION_AUTH) ? true : false;
    };

    const getReview = () => sessionStorage.getItem(SESSION_EMPLOYEE_REVIEW);

    const [review, setReiview] = useState(getReview());

    useEffect(() => {
      setReiview(getReview());
    }, [sessionStorage.getItem(SESSION_EMPLOYEE_REVIEW)]);

    const getRole = () => {
      return sessionStorage.getItem(SESSION_ROLE)
        ? sessionStorage.getItem(SESSION_ROLE)
        : false;
    };

    const [auth, setAuth] = useState(getAuth);
    const [role, setRole] = useState(getRole);

    let x = sessionStorage.getItem("role");

    const setupCollege = async () => {
      await getCollegeId()
        .then((data) => {
          setCollegeId(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    useEffect(() => {
      setupCollege();
    }, []);

    return (
      <>
        {auth ? null : <Navigate replace to="/" />}
        <Loader loading={loading} />
        <Topbar />
        {review == "true" ? (
          <Navbar data={navbarDataEmployeeReview} />
        ) : (
          <Navbar data={navbarDataEmployee} />
        )}
        <Element setLoading={setLoading} collegeId={collegeId} />
        <Footer />
      </>
    );
  };

  const RouteWithAdmin = ({ Element }) => {
    const [loading, setLoading] = useState(0);

    const getAuth = () => {
      return sessionStorage.getItem(SESSION_AUTH) ? true : false;
    };

    let x = sessionStorage.getItem("role");

    const [auth, setAuth] = useState(getAuth());

    const setupCollege = async () => {
      let data = await getCollegeId();
      if (data == "null") {
        console.log("init");
        console.log("hello");
        setCollegeId(colleges[0]?.id);
      } else {
        setCollegeId(data);
      }
    };

    useEffect(() => {
      setupCollege();
    }, []);

    if (auth == false || collegeId == false) return <Navigate replace to="/" />;

    return (
      <>
        <Loader loading={loading} />
        <Topbar changeCollege={changeCollege} />
        <Navbar data={navbarData} />
        <Element setLoading={setLoading} collegeId={collegeId} />
        <Footer />
      </>
    );
  };

  const RouteWithFrontOffice = ({ Element }) => {
    const [loading, setLoading] = useState(0);

    const getAuth = () => {
      return sessionStorage.getItem(SESSION_AUTH) ? true : false;
    };

    let x = sessionStorage.getItem("role");

    const [auth, setAuth] = useState(getAuth());

    const setupCollege = async () => {
      await getCollegeId()
        .then((data) => {
          console.log(`college Id data`, data);
          if (data == "null") {
            console.log("init");
            console.log("hello");
            setCollegeId(colleges[0]?.id);
          } else {
            setCollegeId(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    useEffect(() => {
      setupCollege();
    }, []);

    if (auth == false || collegeId == false) return <Navigate replace to="/" />;

    return (
      <>
        <Loader loading={loading} />
        <Topbar changeCollege={changeCollege} />
        <Navbar data={navbarDataFrontOffice} />
        <Element setLoading={setLoading} collegeId={collegeId} />
        <Footer />
      </>
    );
  };

  const RouteWithExam = ({ Element }) => {
    const [loading, setLoading] = useState(0);

    const getAuth = () => {
      return sessionStorage.getItem(SESSION_AUTH) ? true : false;
    };

    const [auth, setAuth] = useState(getAuth());

    const setupCollege = async () => {
      await getCollegeId()
        .then((data) => {
          setCollegeId(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    useEffect(() => {
      setupCollege();
    }, []);

    if (auth == false || collegeId == false) return <Navigate replace to="/" />;

    return (
      <>
        <Loader loading={loading} />
        <Topbar />
        <Navbar data={ExamNavbar} />
        <Element setLoading={setLoading} collegeId={collegeId} />
        <Footer />
      </>
    );
  };

  const RouteWithRegistar = ({ Element }) => {
    let x = sessionStorage.getItem("role");
    const [loading, setLoading] = useState(0);

    const getAuth = () => {
      return sessionStorage.getItem(SESSION_AUTH) ? true : false;
    };

    const [auth, setAuth] = useState(getAuth());

    const setupCollege = async () => {
      let data = await getCollegeId();
      console.log(`college Id data`, data);
      if (data == "null") {
        setCollegeId(colleges[0]?.id);
      } else {
        setCollegeId(data);
      }
    };

    useEffect(() => {
      setupCollege();
    }, []);

    if (x !== "SUPERADMIN") {
      toast.error("You are not authorized to access this page");
      console.log("bro");
      const logObj = {
        uid: sessionStorage.getItem(SESSION_EMPLOYEE_ID),
        route: window.location.href,
        routeof: "SUPERADMIN",
        time: getIndianTime(),
        date: new Date(),
      };
      Http.post(LOGS_ROUTES, logObj)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      return <Navigate replace to="/" />;
    } else {
      setRole(sessionStorage.getItem("role"));

      if (auth == false || collegeId == false)
        return <Navigate replace to="/" />;
      else
        return (
          <>
            {/* role == "SUPERADMIN" || x == "SUPERADMIN" ? null : (
          <Navigate replace to="/" />
        )*/}
            <Loader loading={loading} />
            <Topbar changeCollege={changeCollege} />
            <Navbar data={navbarDataRegistar} />
            <Element setLoading={setLoading} collegeId={collegeId} />
            <Footer />
          </>
        );
    }
  };

  const RouteWithPrincipal = ({ Element }) => {
    const [loading, setLoading] = useState(0);

    const getAuth = () => {
      return sessionStorage.getItem(SESSION_AUTH) ? true : false;
    };

    const [auth, setAuth] = useState(getAuth());

    const setupCollege = async () => {
      await getCollegeId()
        .then((data) => {
          setCollegeId(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    useEffect(() => {
      setupCollege();
    }, []);

    let collegeId = sessionStorage.getItem("college_id");

    if (auth == false || collegeId == false) return <Navigate replace to="/" />;

    const stat = "static";

    let studentdrop;

    if (collegeId != 1111000 && collegeId != 1111009) {
      studentdrop = [
        {
          title: "Student Details",
          type: stat,
          route: ROUTES.Principal.Student.StudentDetails,
        },
        {
          title: "Exams",
          type: stat,
          route: ROUTES.Principal.Student.Exam,
        },
        {
          title: "Update ABC",
          type: stat,
          route: ROUTES.Principal.Student.UpdateABC,
        },
      ];
    } else {
      studentdrop = [
        {
          title: "Student Details",
          type: stat,
          route: ROUTES.Principal.Student.StudentDetails,
        },
        {
          title: "Internal Exams",
          type: stat,
          route: ROUTES.Principal.Student.Exam,
        },
        {
          title: "Midterm Exams",
          type: stat,
          route: ROUTES.Principal.Student.Midterm,
        },
        {
          title: "Viva",
          type: stat,
          route: ROUTES.Principal.Student.Viva,
        },
        {
          title: "Update ABC",
          type: stat,
          route: ROUTES.Principal.Student.UpdateABC,
        },
      ];
    }

    navbarDataPrincipal?.map((s) => {
      if (s.title == "Students") {
        s.drop = studentdrop;
      }
    });

    return (
      <>
        <Loader loading={loading} />
        <Topbar />
        <Navbar data={navbarDataPrincipal} />
        <Element setLoading={setLoading} collegeId={collegeId} />
        <Footer />
      </>
    );
  };

  const RouteWithInfoUploadingTeam = ({ Element }) => {
    let role = sessionStorage.getItem("role");

    const [loading, setLoading] = useState(0);

    const getAuth = () => {
      return sessionStorage.getItem(SESSION_AUTH) ? true : false;
    };

    const [auth, setAuth] = useState(getAuth());

    const setupCollege = async () => {
      await getCollegeId()
        .then((data) => {
          setCollegeId(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    useEffect(() => {
      setupCollege();
    }, []);

    let collegeId = sessionStorage.getItem("college_id");

    if (auth == false || collegeId == false) {
      toast.error("You are not authorized to access this page");
      return <Navigate replace to="/" />;
    }

    var x;

    if (role == "ENGGWEB") {
      x = InfoUploading.filter(
        (s) =>
          s.title != "OPD Services" &&
          s.title != "IPD Services" &&
          s.title != "Media" &&
          s.title != "Admission Notifications" &&
          s.title != "University Notifications" &&
          s.title != "Event Calendar" &&
          // s.title != "Recruitment" &&
          s.title != "Add Staff" &&
          s.title != "PCI-SIF" &&
          s.title != "Hospital Staff Attendance" &&
          s.title != "Milestones" &&
          s.title != "Approvals" &&
          s.title != "Upload Files"
      );
    } else if (role == "PHAWEB") {
      x = InfoUploading.filter(
        (s) =>
          // s.title != "College Permission" &&
          s.title != "Committees" &&
          s.title != "OPD Services" &&
          s.title != "IPD Services" &&
          s.title != "Media" &&
          s.title != "Admission Notifications" &&
          s.title != "University Notifications" &&
          s.title != "Event Calendar" &&
          s.title != "Add Staff" &&
          s.title != "Student Lists" &&
          s.title != "Hospital Staff Attendance" &&
          s.title != "Milestones" &&
          s.title != "Approvals" &&
          s.title != "Upload Files"
      );
    } else if (role == "SCIWEB") {
      x = InfoUploading.filter(
        (s) =>
          s.title != "OPD Services" &&
          s.title != "IPD Services" &&
          s.title != "Media" &&
          s.title != "Admission Notifications" &&
          s.title != "University Notifications" &&
          s.title != "Event Calendar" &&
          s.title != "Approvals" &&
          s.title != "Milestones" &&
          s.title != "Company Details" &&
          s.title != "Campus Placements" &&
          s.title != "PCI-SIF" &&
          s.title != "Student Lists" &&
          s.title != "Committees" &&
          s.title != "Hospital Staff Attendance" &&
          s.title != "Add Staff" &&
          s.title != "Upload Files"
      );
    } else if (role == "AYUWEB") {
      x = InfoUploading.filter(
        (s) =>
          // s.title != "College Permission" &&
          // s.title != "College Affiliation" &&
          s.title != "Research and Publication" &&
          s.title != "Media" &&
          s.title != "Admission Notifications" &&
          s.title != "University Notifications" &&
          s.title != "Event Calendar" &&
          s.title != "Approvals" &&
          s.title != "Milestones" &&
          s.title != "Add Staff" &&
          s.title != "Company Details" &&
          s.title != "Campus Placements" &&
          s.title != "PCI-SIF" &&
          s.title != "Upload Files"
        // s.title != "Hospital Staff Attendance"
      );
    } else if (role == "MEDWEB") {
      x = InfoUploading.filter(
        (s) =>
          s.title != "Syllabus Upload" &&
          s.title != "Research and Publication" &&
          s.title != "Media" &&
          s.title != "Admission Notifications" &&
          s.title != "University Notifications" &&
          s.title != "Event Calendar" &&
          s.title != "Approvals" &&
          s.title != "Company Details" &&
          s.title != "Campus Placements" &&
          s.title != "PCI-SIF" &&
          s.title != "Milestones" &&
          s.title != "Add New Staff" &&
          s.title != "Achievements & Awards" &&
          s.title != "Student Results"
      );
    } else if (role == "EDUWEB") {
      x = InfoUploading.filter(
        (s) =>
          s.title != "OPD Services" &&
          s.title != "IPD Services" &&
          // s.title != "College Permission" &&
          s.title != "Add Staff" &&
          s.title != "Media" &&
          s.title != "Admission Notifications" &&
          s.title != "University Notifications" &&
          s.title != "Event Calendar" &&
          s.title != "Approvals" &&
          s.title != "Milestones" &&
          s.title != "PCI-SIF" &&
          s.title != "Hospital Staff Attendance" &&
          s.title != "Upload Files"
      );
    } else if (role == "LAWWEB") {
      x = InfoUploading.filter(
        (s) =>
          s.title != "OPD Services" &&
          s.title != "IPD Services" &&
          // s.title != "College Permission" &&
          s.title != "Add Staff" &&
          s.title != "Media" &&
          s.title != "Admission Notifications" &&
          s.title != "University Notifications" &&
          s.title != "Event Calendar" &&
          s.title != "Approvals" &&
          s.title != "Milestones" &&
          s.title != "Company Details" &&
          s.title != "Campus Placements" &&
          s.title != "PCI-SIF" &&
          s.title != "Achievements" &&
          s.title != "Committees" &&
          s.title != "Student Lists" &&
          s.title != "Hospital Staff Attendance" &&
          s.title != "Upload Files"
      );
    } else if (role == "ARTSWEB") {
      x = InfoUploading.filter(
        (s) =>
          s.title != "OPD Services" &&
          s.title != "IPD Services" &&
          // s.title != "College Permission" &&
          s.title != "Add Staff" &&
          s.title != "Media" &&
          s.title != "Admission Notifications" &&
          s.title != "University Notifications" &&
          s.title != "Event Calendar" &&
          s.title != "Approvals" &&
          s.title != "Milestones" &&
          s.title != "Company Details" &&
          s.title != "Campus Placements" &&
          s.title != "PCI-SIF" &&
          s.title != "Hospital Staff Attendance" &&
          s.title != "Upload Files"
      );
    } else if (role == "COMWEB") {
      x = InfoUploading.filter(
        (s) =>
          s.title != "OPD Services" &&
          s.title != "IPD Services" &&
          // s.title != "College Permission" &&
          s.title != "Add Staff" &&
          s.title != "Media" &&
          s.title != "Admission Notifications" &&
          s.title != "University Notifications" &&
          s.title != "Event Calendar" &&
          s.title != "Approvals" &&
          s.title != "Milestones" &&
          s.title != "Company Details" &&
          s.title != "Campus Placements" &&
          s.title != "PCI-SIF" &&
          s.title != "Hospital Staff Attendance" &&
          s.title != "Upload Files"
      );
    } else if (role == "ITWEB") {
      x = InfoUploading.filter(
        (s) =>
          s.title != "OPD Services" &&
          s.title != "IPD Services" &&
          // s.title != "College Permission" &&
          s.title != "Add Staff" &&
          s.title != "Media" &&
          s.title != "Admission Notifications" &&
          s.title != "University Notifications" &&
          s.title != "Event Calendar" &&
          s.title != "Approvals" &&
          s.title != "Milestones" &&
          s.title != "Company Details" &&
          s.title != "Campus Placements" &&
          s.title != "PCI-SIF" &&
          s.title != "Hospital Staff Attendance" &&
          s.title != "Upload Files"
      );
    } else if (role == "NURWEB") {
      x = InfoUploading.filter(
        (s) =>
          s.title != "Student Details" &&
          s.title != "Add Staff" &&
          s.title != "OPD Services" &&
          s.title != "IPD Services" &&
          s.title != "Media" &&
          s.title != "Admission Notifications" &&
          s.title != "University Notifications" &&
          s.title != "Event Calendar" &&
          s.title != "Approvals" &&
          s.title != "Milestones" &&
          s.title != "PCI-SIF" &&
          s.title != "Upload Files" &&
          s.title != "Company Details" &&
          s.title != "Campus Placements" &&
          s.title != "Hospital Staff Attendance"
      );
    } else if (role == "UNIWEBSITE") {
      var x = InfoUploading.filter(
        (s) =>
          s.title != "College Permission" &&
          s.title != "College Affiliation" &&
          s.title != "OPD Services" &&
          s.title != "IPD Services" &&
          s.title != "Events" &&
          s.title != "Syllabus Upload" &&
          s.title != "Research and Publication" &&
          s.title != "Student Lists" &&
          s.title != "Student Results" &&
          s.title != "Add New Staff" &&
          s.title != "Add Staff" &&
          s.title != "Academic Details" &&
          s.title != "Company Details" &&
          s.title != "Campus Placements" &&
          s.title != "PCI-SIF" &&
          s.title != "Achievements" &&
          s.title != "Gallery Photos" &&
          s.title != "Hospital Staff Attendance" &&
          s.title != "Student Details"
        // s.title != "Upload Files"
      );
    } else if (role == "HOMOWEB") {
      // x = InfoUploading;
      var x = InfoUploading.filter(
        (s) =>
          s.title != "Media" &&
          s.title != "Admission Notifications" &&
          s.title != "University Notifications" &&
          s.title != "Event Calendar" &&
          s.title != "Add Staff" &&
          s.title != "Milestones" &&
          s.title != "Company Details" &&
          s.title != "Campus Placements" &&
          s.title != "PCI-SIF" &&
          s.title != "Approvals" &&
          s.title != "Upload Files"
      );
    } else if (role == "PHYWEB") {
      x = InfoUploading.filter(
        (s) =>
          s.title != "OPD Services" &&
          s.title != "IPD Services" &&
          s.title != "Media" &&
          s.title != "Admission Notifications" &&
          s.title != "University Notifications" &&
          s.title != "Event Calendar" &&
          s.title != "Company Details" &&
          s.title != "Campus Placements" &&
          s.title != "PCI-SIF" &&
          s.title != "Hospital Staff Attendance" &&
          s.title != "Milestones" &&
          s.title != "Approvals" &&
          s.title != "Add Staff" &&
          s.title != "Upload Files"
      );
    } else if (role == "DESWEB") {
      x = InfoUploading.filter(
        (s) =>
          s.title != "OPD Services" &&
          s.title != "IPD Services" &&
          s.title != "Media" &&
          s.title != "Admission Notifications" &&
          s.title != "University Notifications" &&
          s.title != "Achievements & Awards" &&
          s.title != "Student Details" &&
          s.title != "Event Calendar" &&
          s.title != "Company Details" &&
          s.title != "Campus Placements" &&
          s.title != "PCI-SIF" &&
          s.title != "Hospital Staff Attendance" &&
          s.title != "Milestones" &&
          s.title != "Approvals" &&
          s.title != "Gallery Photos" &&
          s.title != "Add Staff" &&
          s.title != "Upload Files"
      );
    } else {
      x = InfoUploading;
    }

    console.log(x);

    // if (role == false) {
    //   toast.error("You are not authorized to access this page");
    //   return <Navigate replace to="/" />;
    // }

    return (
      <>
        {/* {auth ? null : <Navigate replace to="/" />} */}
        <Topbar />
        <Loader loading={loading} />
        <Navbar data={x} />
        <Element setLoading={setLoading} collegeId={collegeId} />
        <Footer />
      </>
    );
  };

  const RouteWithEvaluator = ({ Element }) => {
    return (
      <>
        <Topbar />
        <Element />
        <Footer />
      </>
    );
  };

  const RouteWithAccounts = ({ Element }) => {
    const getAuth = () => {
      return sessionStorage.getItem(SESSION_AUTH) ? true : false;
    };

    const [auth, setAuth] = useState(getAuth());

    const setupCollege = async () => {
      let clg = await getCollegeId();
      if (clg == "null") {
        setCollegeId(colleges[0]?.id);
      } else {
        setCollegeId(clg);
      }
    };

    useEffect(() => {
      setupCollege();
    }, []);

    const [loading, setLoading] = useState(0);

    if (auth == false || collegeId == false) return <Navigate replace to="/" />;

    return (
      <>
        <Loader loading={loading} />
        <Topbar changeCollege={changeCollege} />
        <Navbar data={navbarDataAccountant} />
        <Element setLoading={setLoading} collegeId={collegeId} />
        <Footer />
      </>
    );
  };

  const RouteWithCashier = ({ Element }) => {
    const getAuth = () => {
      return sessionStorage.getItem(SESSION_AUTH) ? true : false;
    };

    const [auth, setAuth] = useState(getAuth());

    const setupCollege = async () => {
      let clg = await getCollegeId();
      if (clg == "null") {
        setCollegeId(colleges[0]?.id);
      } else {
        setCollegeId(clg);
      }
    };

    useEffect(() => {
      setupCollege();
    }, []);

    const [loading, setLoading] = useState(0);

    return (
      <>
        <Loader loading={loading} />
        <Topbar changeCollege={changeCollege} />
        <Navbar data={navbarCashier} />
        <Element setLoading={setLoading} collegeId={collegeId} />
        <Footer />
      </>
    );
  };

  const RouteWithAdmissionConsultant = ({ Element }) => {
    const getAuth = () => {
      return sessionStorage.getItem(SESSION_AUTH) ? true : false;
    };

    const [auth, setAuth] = useState(getAuth());

    const setupCollege = async () => {
      await getCollegeId()
        .then((data) => {
          if (data == "null") {
            setCollegeId(colleges[0]?.id);
          } else {
            setCollegeId(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    useEffect(() => {
      setupCollege();
    }, []);

    const [loading, setLoading] = useState(0);

    if (auth == false || collegeId == false) return <Navigate replace to="/" />;

    return (
      <>
        <Loader loading={loading} />
        <Topbar changeCollege={changeCollege} />
        <Navbar data={NavbarAdCon} />
        <Element setLoading={setLoading} collegeId={collegeId} />
        <Footer />
      </>
    );
  };

  const RouteWithReceptionist = ({ Element }) => {
    const getAuth = () => {
      return sessionStorage.getItem(SESSION_AUTH) ? true : false;
    };

    const [auth, setAuth] = useState(getAuth());

    const [loading, setLoading] = useState(0);

    if (auth == false || collegeId == false) return <Navigate replace to="/" />;

    return (
      <>
        <>
          <Loader loading={loading} />
          <Topbar changeCollege={changeCollege} />
          <Navbar data={navbarDataReceptionist} />
          <Element setLoading={setLoading} collegeId={collegeId} />
          <Footer />
        </>
      </>
    );
  };

  const RouteWithLibrary = ({ Element }) => {
    const [loading, setLoading] = useState(0);

    if (sessionStorage.getItem("role") == "LIB") {
      var x = navbarDataLib.filter((s) => s.title != "UMS Dashboard");
    } else {
      x = navbarDataLib;
    }
    return (
      <>
        <>
          <Loader loading={loading} />
          <Topbar changeCollege={changeCollege} />
          <Navbar data={x} />
          <Element setLoading={setLoading} collegeId={collegeId} />
          <Footer />
        </>
      </>
    );
  };

  useEffect(() => {
    getRoles();
    getAllData();
  }, []);

  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={<Register changeCollege={setCollegeId} />}
        ></Route>
        <Route
          exact
          path="/password/:id"
          element={<ForgotPassword changeCollege={setCollegeId} />}
        ></Route>
        <Route
          exact
          path="/student-password"
          element={<ForgotPassword1 changeCollege={setCollegeId} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Examination.OtpVerification}
          element={<OtpVerification />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Examination.InvigilatorLogin}
          element={<InvigilatorLogin />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Examination.AnswersheetChecking}
          element={<RouteWithEvaluator Element={AnswersheetChecking} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Examination.StudentList}
          element={<RouteWithEvaluator Element={Studentslist} />}
        ></Route>
        /////////////////////////////////////////// /////////////// Admin Panel
        /////////////// ///////////////////////////////////////////
        <Route
          exact
          path={ROUTES.Admin.toexamination}
          element={<AdmintoExamination />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.Admin.Admission.AdmissionProfile}/:id`}
          element={<AdmissionStudentProfile />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.dashboard}
          element={<RouteWithAdmin Element={DashboardHR} />}
        ></Route>
        //Tickets
        <Route
          exact
          path={ROUTES.Admin.Ticket}
          element={<RouteWithAdmin Element={Tickets} />}
        ></Route>
        //TicketConversation
        <Route
          exact
          path={`${ROUTES.Admin.ticketConversation}/:id`}
          element={<RouteWithAdmin Element={TicketConversation} />}
        ></Route>
        // Front Office Routing
        <Route
          exact
          path={ROUTES.Admin.frontOffice.AdmissionEnquiry}
          element={<RouteWithAdmin Element={AdmissionEnquiry} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.frontOffice.VisitorsBook}
          element={<RouteWithAdmin Element={VisitorsBook} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.frontOffice.PhoneCallLog}
          element={<RouteWithAdmin Element={PhoneCallLog} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.frontOffice.PostalDispatch}
          element={<RouteWithAdmin Element={PostalDispatch} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.frontOffice.PostalRecieve}
          element={<RouteWithAdmin Element={PostalRecieve} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.frontOffice.Complain}
          element={<RouteWithAdmin Element={Complain} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.frontOffice.SetupOffice}
          element={<RouteWithAdmin Element={SetupOffice} />}
        ></Route>
        //Student Pages Routing
        <Route
          exact
          path={ROUTES.Admin.Student.StudentAdmission}
          element={<RouteWithAdmin Element={StudentAdmission} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Student.StudentDetails}
          element={<RouteWithAdmin Element={StudentDetails} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Student.DisableStudents}
          element={<RouteWithAdmin Element={DisableStudents} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Student.EditStudentDetails}
          element={<RouteWithAdmin Element={EditStudentDetails} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Student.StudentProfile}
          element={<RouteWithAdmin Element={StudentProfile} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Student.ViewStudentProfile}
          element={<RouteWithAdmin Element={StudentView} />}
        ></Route>
        //Income
        <Route
          exact
          path={ROUTES.Admin.Accounts.Income.View}
          element={<RouteWithAdmin Element={ViewIncome} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Accounts.Income.Add}
          element={<RouteWithAdmin Element={AddIncome} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Accounts.Income.AddSource}
          element={<RouteWithAdmin Element={AddIncomeSource} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Accounts.Expense.View}
          element={<RouteWithAdmin Element={ViewExpense} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Accounts.Expense.Add}
          element={<RouteWithAdmin Element={AddExpense} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Accounts.Expense.AddSource}
          element={<RouteWithAdmin Element={AddExpenseSource} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Accounts.FeeCollection.CollegeFee}
          element={<RouteWithAdmin Element={FeeCollectionCollectFee} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Accounts.FeeCollection.SearchFee}
          element={<RouteWithAdmin Element={FeeCollectionSearchFee} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Accounts.FeeCollection.SearchDue}
          element={<RouteWithAdmin Element={FeeCollectionSearchDue} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Accounts.FeeCollection.FeeMaster}
          element={<RouteWithAdmin Element={FeeCollectionFeeMaster} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Accounts.FeeCollection.FeeType}
          element={<RouteWithAdmin Element={FeeCollectionFeeType} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Accounts.FeeCollection.FeeGroup}
          element={<RouteWithAdmin Element={FeeCollectionFeeGroup} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Accounts.FeeCollection.FeeDiscount}
          element={<RouteWithAdmin Element={FeeCollectionFeeDiscount} />}
        ></Route>
        // Academics
        <Route
          exact
          path={ROUTES.Admin.Academics.ClassTimeTable}
          element={<RouteWithAdmin Element={ClassTimeTable} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Academics.CreateTimeTable}
          element={<RouteWithAdmin Element={CreateTimeTable} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Academics.TeacherTimeTable}
          element={<RouteWithAdmin Element={TeachersTimetable} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Academics.PromoteStudents}
          element={<RouteWithAdmin Element={PromoteStudents} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Academics.TransferStudents}
          element={<RouteWithAdmin Element={TransferStudents} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Academics.AddBatch}
          element={<RouteWithAdmin Element={AddBatch} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Academics.AssignStudents}
          element={<RouteWithAdmin Element={AssignStudents} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Academics.AddSubject}
          element={<RouteWithAdmin Element={AddSubjects} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Academics.AddClass}
          element={<RouteWithAdmin Element={AddClass} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Academics.ManageLessonPlan}
          element={<RouteWithAdmin Element={ManageLessonPlan} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Academics.SyllabusStatus}
          element={<RouteWithAdmin Element={SyllabusStatus} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Academics.AddTopic}
          element={<RouteWithAdmin Element={AddTopics} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Academics.AddLesson}
          element={<RouteWithAdmin Element={AddLessons} />}
        ></Route>
        //Front Office
        <Route
          exact
          path={ROUTES.FrontOffice.AdmissionEnquiry}
          element={<RouteWithFrontOffice Element={AdmissionEnquiry} />}
        ></Route>
        <Route
          exact
          path={ROUTES.FrontOffice.userCredentials}
          element={<RouteWithFrontOffice Element={UserCredentials} />}
        ></Route>
        <Route
          exact
          path={ROUTES.FrontOffice.PhoneCallLog}
          element={<RouteWithFrontOffice Element={PhoneCallLog} />}
        ></Route>
        <Route
          exact
          path={ROUTES.FrontOffice.VisitorsBook}
          element={<RouteWithFrontOffice Element={VisitorsBook} />}
        ></Route>
        <Route
          exact
          path={ROUTES.FrontOffice.PostalDispatch}
          element={<RouteWithFrontOffice Element={PostalDispatch} />}
        ></Route>
        <Route
          exact
          path={ROUTES.FrontOffice.PostalRecieve}
          element={<RouteWithFrontOffice Element={PostalRecieve} />}
        ></Route>
        {/* <Route
          exact
          path={ROUTES.FrontOffice.ViewPostalDispatchRecieve}
          element={<RouteWithFrontOffice Element={ViewPostalDispatchRecieve} />}
        ></Route> */}
        <Route
          exact
          path={ROUTES.FrontOffice.Complain}
          element={<RouteWithFrontOffice Element={Complain} />}
        ></Route>
        <Route
          exact
          path={ROUTES.FrontOffice.SetupOffice}
          element={<RouteWithFrontOffice Element={SetupOffice} />}
        ></Route>
        <Route
          exact
          path={ROUTES.FrontOffice.Document}
          element={
            <RouteWithFrontOffice Element={EmployeeDocumentManagement} />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.FrontOffice.Attendance}
          element={<RouteWithFrontOffice Element={EmployerAttendance} />}
        ></Route>
        <Route
          exact
          path={ROUTES.FrontOffice.Team.Discussion}
          element={<RouteWithFrontOffice Element={EmployeeTeamDiscussion} />}
        ></Route>
        <Route
          exact
          path={ROUTES.FrontOffice.Team.Documents}
          element={<RouteWithFrontOffice Element={EmployeeTeamDocument} />}
        ></Route>
        <Route
          exact
          path={ROUTES.FrontOffice.Team.Announcement}
          element={<RouteWithFrontOffice Element={TeamAnnouncement} />}
        ></Route>
        <Route
          exact
          path={ROUTES.FrontOffice.Leave.Entitlement}
          element={<RouteWithFrontOffice Element={EmployeeLeaveEntitlement} />}
        ></Route>
        <Route
          exact
          path={ROUTES.FrontOffice.Leave.Application}
          element={<RouteWithFrontOffice Element={EmployeeLeaveApplication} />}
        ></Route>
        <Route
          exact
          path={ROUTES.FrontOffice.Leave.Schedule}
          element={<RouteWithFrontOffice Element={EmployeeSchedule} />}
        ></Route>
        <Route
          exact
          path={ROUTES.FrontOffice.PayRoll.Salary}
          element={<RouteWithFrontOffice Element={EmployerSalary} />}
        ></Route>
        <Route
          exact
          path={ROUTES.FrontOffice.PayRoll.AnnualStatement}
          element={<RouteWithFrontOffice Element={EmployeeAnnualStatement} />}
        ></Route>
        //Examinations
        {/* 
        <Route exact path={ROUTES.Admin.Examination.Commitee} element={<RouteWithAdmin Element={Commitee} />}></Route>
        <Route exact path={ROUTES.Admin.Examination.CreateExams} element={<RouteWithAdmin Element={CreateExams} />}></Route>
        <Route exact path={ROUTES.Admin.Examination.CreateQuestionPaper} element={<RouteWithAdmin Element={CreateQuestionPaper} />}></Route>
        <Route exact path={ROUTES.Admin.Examination.CreateExamTimetable} element={<RouteWithAdmin Element={CreateExamTimetable} />}></Route>
        <Route exact path={ROUTES.Admin.Examination.ExamSchedules} element={<RouteWithAdmin Element={ExamSchedule} />}></Route>
        <Route exact path={ROUTES.Admin.Examination.ExamSeatingArrangements} element={<RouteWithAdmin Element={ExamSeatingArrangements} />}></Route>
        <Route exact path={ROUTES.Admin.Examination.PostExaminations} element={<RouteWithAdmin Element={PostExamination} />}></Route>
        <Route exact path={ROUTES.Admin.Examination.OtpVerification} element={<RouteWithAdmin Element={OtpVerification}/>}></Route>
        <Route exact path={ROUTES.Admin.Examination.DownloadQuestionPaper} element={<RouteWithAdmin Element={DownloadQuestionPaper}/>}></Route>

        <Route exact path={ROUTES.Admin.Examination.AssignAnswerSheets} element={<RouteWithAdmin Element={AssignAnswersheets  }/>}></Route>

    

        <Route exact path={ROUTES.Examination.OtpVerification} element={<RouteWithAdmin Element={OtpVerification} />}></Route> */}
        //Document
        <Route
          exact
          path={ROUTES.Admin.Document.UploadContent}
          element={<RouteWithAdmin Element={FeeCollectionFeeDiscount} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Document.DownloadContent.Assignment}
          element={<RouteWithAdmin Element={FeeCollectionFeeDiscount} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Document.DownloadContent.Syllabus}
          element={<RouteWithAdmin Element={FeeCollectionFeeDiscount} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Document.DownloadContent.Studymaterial}
          element={<RouteWithAdmin Element={FeeCollectionFeeDiscount} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Document.DownloadContent.OtherDownload}
          element={<RouteWithAdmin Element={FeeCollectionFeeDiscount} />}
        ></Route>
        //Transport
        <Route
          exact
          path={ROUTES.Admin.Transport.Route}
          element={<RouteWithAdmin Element={TransportRoute} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Transport.pickupPoints}
          element={<RouteWithAdmin Element={PickupPoints} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Transport.Vehicles}
          element={<RouteWithAdmin Element={TransportVehicle} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Transport.AssignVehicles}
          element={<RouteWithAdmin Element={TransportAssignVehicles} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Transport.transportFee}
          element={<RouteWithAdmin Element={transportFee} />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.Admin.Transport.addtransportFee}/:id`}
          element={<RouteWithAdmin Element={AddTransportFee} />}
        ></Route>
        //Hostel
        <Route
          exact
          path={ROUTES.Admin.Hostel.HostelRooms}
          element={<RouteWithAdmin Element={HostelRooms} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Hostel.Hostel}
          element={<RouteWithAdmin Element={HostelBeds} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Hostel.RoomType}
          element={<RouteWithAdmin Element={RoomType} />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.Admin.Hostel.addhostelFee}/:id`}
          element={<RouteWithAdmin Element={AddHostelFee} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Hostel.hostelFee}
          element={<RouteWithAdmin Element={hostelFees} />}
        ></Route>
        //Inventory
        <Route
          exact
          path={ROUTES.Admin.Inventory.IssueItems}
          element={<RouteWithAdmin Element={IssueItems} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Inventory.IssueItem}
          element={<RouteWithAdmin Element={IssueItem} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Inventory.AddItem}
          element={<RouteWithAdmin Element={AddItem} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Inventory.AddItemstock}
          element={<RouteWithAdmin Element={Additemstock} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Inventory.ItemCategory}
          element={<RouteWithAdmin Element={ItemCategory} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Inventory.ItemStore}
          element={<RouteWithAdmin Element={ItemStore} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Inventory.ItemSupplier}
          element={<RouteWithAdmin Element={Itemsupplier} />}
        ></Route>
        //Certificate
        <Route
          exact
          path={ROUTES.Admin.Certificates.DesignHallticket}
          element={<RouteWithAdmin Element={DesignHallticket} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Certificates.DesignMarkscard}
          element={<RouteWithAdmin Element={DesignMarkscard} />}
        ></Route>
        ////////////////////////////////////////Library//////////////////////////////////////////////
        <Route
          exact
          path={ROUTES.Admin.Library.Books}
          element={<RouteWithAdmin Element={Books} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Library.Library_Settings}
          element={<RouteWithAdmin Element={LibrarySettings} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Admin.Library.Borrow}
          element={<RouteWithAdmin Element={BorrowBook} />}
        ></Route>
        //////////////////// ///////////////////// /////Principal////////
        ///////////////////// //////////////////// //dashboard
        <Route
          exact
          path={ROUTES.Principal.dashboard}
          element={<RouteWithPrincipal Element={DashboardHR} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.StaffDairy.StaffDairy}
          element={<RouteWithPrincipal Element={StaffDairy} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.StaffDairy.ViewStaffDairy}
          element={<RouteWithPrincipal Element={ViewStaffDairy} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Student.Midterm}
          element={<RouteWithPrincipal Element={StudentMidtermExam} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Student.Viva}
          element={<RouteWithPrincipal Element={StudentsVivaMarks} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Reports.StudentStat}
          element={<RouteWithPrincipal Element={ReportOneStudentStat} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.PhdAdmissions}
          element={<RouteWithPrincipal Element={PhdAdmissions} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.PhdAdmissionsprofile}
          element={<RouteWithPrincipal Element={PhdStudentProfile} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.PhdAdmitCard + "/:id"}
          element={<RouteWithPrincipal Element={PhdAdmitCard} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.PhdExamList}
          element={<RouteWithPrincipal Element={PhdList} />}
        ></Route>
        <Route
          exact
          path={
            ROUTES.Principal.Reports.StudentSubStat + "/:student_id/:course_id"
          }
          element={<RouteWithPrincipal Element={ReportOneStudentSubject} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Reports.Home}
          element={<RouteWithPrincipal Element={DeanReports} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Reports.StudentDetails1}
          element={<RouteWithPrincipal Element={StudentDetails1} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Reports.AluminiStudents}
          element={<RouteWithPrincipal Element={ViewAluminiStudents} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Reports.StudentView}
          element={<RouteWithPrincipal Element={StudentView} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Reports.Attendance}
          element={<RouteWithPrincipal Element={ReportStudentAttendance} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Reports.onlineTransaction}
          element={<RouteWithPrincipal Element={OnlineTransactionReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Reports.MonthWise}
          element={<RouteWithPrincipal Element={MonthWiseAttendance} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Reports.AttendanceSemWise}
          element={
            <RouteWithPrincipal Element={ReportStudentAttendanceSemWise} />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Academics.ViewPracStudents}
          element={<RouteWithPrincipal Element={ViewAssignedStudents} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Student.AssignStudents}
          element={<RouteWithPrincipal Element={AssignStudents} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Student.UpdateABC}
          element={<RouteWithPrincipal Element={StudentUpdateAbc} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Student.Exam}
          element={<RouteWithPrincipal Element={StudentsExams} />}
        ></Route>
        //Tickets
        <Route
          exact
          path={ROUTES.Principal.Ticket}
          element={<RouteWithPrincipal Element={Tickets} />}
        ></Route>
        //TicketConversation
        <Route
          exact
          path={`${ROUTES.Principal.ticketConversation}/:id`}
          element={<RouteWithPrincipal Element={TicketConversation} />}
        ></Route>
        //Front Office
        <Route
          exact
          path={ROUTES.Principal.frontOffice.AdmissionEnquiry}
          element={<RouteWithPrincipal Element={AdmissionEnquiry} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.frontOffice.VisitorsBook}
          element={<RouteWithPrincipal Element={VisitorsBook} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.frontOffice.PhoneCallLog}
          element={<RouteWithPrincipal Element={PhoneCallLog} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.frontOffice.PostalDispatch}
          element={<RouteWithPrincipal Element={PostalDispatch} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.frontOffice.PostalRecieve}
          element={<RouteWithPrincipal Element={PostalRecieve} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.frontOffice.Complain}
          element={<RouteWithPrincipal Element={Complain} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.frontOffice.SetupOffice}
          element={<RouteWithPrincipal Element={SetupOffice} />}
        ></Route>
        //Students
        <Route
          exact
          path={ROUTES.Principal.Student.StudentAdmission}
          element={<RouteWithPrincipal Element={StudentAdmission} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Student.StudentDetails}
          element={<RouteWithPrincipal Element={StudentDetails} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Student.DisableStudents}
          element={<RouteWithPrincipal Element={DisableStudents} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Student.EditStudentDetails}
          element={<RouteWithPrincipal Element={EditStudentDetails} />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.Principal.Student.StudentProfile}/:id`}
          element={<RouteWithPrincipal Element={StudentProfile} />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.Principal.Student.ViewStudentProfile}/:id`}
          element={<RouteWithPrincipal Element={StudentView} />}
        ></Route>
        //Accounts
        <Route
          exact
          path={ROUTES.Principal.Accounts.Income.View}
          element={<RouteWithPrincipal Element={ViewIncome} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Accounts.Income.Add}
          element={<RouteWithPrincipal Element={AddIncome} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Accounts.Income.AddSource}
          element={<RouteWithPrincipal Element={AddIncomeSource} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Accounts.Expense.View}
          element={<RouteWithPrincipal Element={ViewExpense} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Accounts.Expense.Add}
          element={<RouteWithPrincipal Element={AddExpense} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Accounts.Expense.AddSource}
          element={<RouteWithPrincipal Element={AddExpenseSource} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Accounts.FeeCollection.CollegeFee}
          element={<RouteWithPrincipal Element={FeeCollectionCollectFee} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Accounts.FeeCollection.SearchFee}
          element={<RouteWithPrincipal Element={FeeCollectionSearchFee} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Accounts.FeeCollection.SearchDue}
          element={<RouteWithPrincipal Element={FeeCollectionSearchDue} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Accounts.FeeCollection.FeeMaster}
          element={<RouteWithPrincipal Element={FeeCollectionFeeMaster} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Accounts.FeeCollection.FeeType}
          element={<RouteWithPrincipal Element={FeeCollectionFeeType} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Accounts.FeeCollection.FeeGroup}
          element={<RouteWithPrincipal Element={FeeCollectionFeeGroup} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Accounts.FeeCollection.FeeDiscount}
          element={<RouteWithPrincipal Element={FeeCollectionFeeDiscount} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Accounts.FeeCollection.FeeTypeAmount}
          element={<RouteWithPrincipal Element={FeeCollectionFeeTypeAmount} />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.Principal.Accounts.FeeCollection.AddFee}/:id`}
          element={<RouteWithPrincipal Element={FeeCollectionAddFee} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Accounts.FeeCollection.assignFee}
          element={<RouteWithPrincipal Element={FeeCollectionAssignFee} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Accounts.FeeCollection.Reports}
          element={<RouteWithPrincipal Element={FeeCollectionReports} />}
        ></Route>
        //Academics
        <Route
          exact
          path={ROUTES.Principal.Academics.ClassTimeTable}
          element={<RouteWithPrincipal Element={ClassTimeTable} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Academics.CreateTimeTable}
          element={<RouteWithPrincipal Element={CreateTimeTable} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Academics.TeacherTimeTable}
          element={<RouteWithPrincipal Element={TeachersTimetable} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Academics.PromoteStudents}
          element={<RouteWithPrincipal Element={PromoteStudents} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Academics.TransferStudents}
          element={<RouteWithPrincipal Element={TransferStudents} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Academics.AddBatch}
          element={<RouteWithPrincipal Element={AddBatch} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Academics.AddSubject}
          element={<RouteWithPrincipal Element={AddSubjects} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Academics.AddClass}
          element={<RouteWithPrincipal Element={AddClass} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Academics.ManageLessonPlan}
          element={<RouteWithPrincipal Element={ManageLessonPlan} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Academics.SyllabusStatus}
          element={<RouteWithPrincipal Element={SyllabusStatus} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Academics.AddTopic}
          element={<RouteWithPrincipal Element={AddTopics} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Academics.AddQuestionBank}
          element={<RouteWithPrincipal Element={AddQuestionBank} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Academics.AddLesson}
          element={<RouteWithPrincipal Element={AddLessons} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Academics.AddSemester}
          element={<RouteWithPrincipal Element={AddSemester} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Academics.AddSection}
          element={<RouteWithPrincipal Element={AddSection} />}
        ></Route>
        //Admissions
        <Route
          exact
          path={ROUTES.Principal.Admission.AdmissionDetails}
          element={<RouteWithPrincipal Element={AdmssionStudentDetails} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Admission.AdmissionEnquiry}
          element={<RouteWithPrincipal Element={AdmssionStudentEnquiry} />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.Principal.Admission.AdmissionProfile}/:id`}
          element={<RouteWithPrincipal Element={AdmissionStudentProfile} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.Admission.NewAdmission}
          element={<RouteWithPrincipal Element={AdmissionNewAdmission} />}
        ></Route>
        ///Attendance
        <Route
          exact
          path={ROUTES.Principal.Attendance}
          element={<RouteWithPrincipal Element={ClassAttendance} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Principal.LabAttendance}
          element={<RouteWithPrincipal Element={LabAttendance} />}
        ></Route>
        ///////////////////// ///////////////////// //////Registar///////
        ///////////////////// ///////////////////// //Dashboard
        <Route
          exact
          path={ROUTES.Registar.dashboard}
          element={<RouteWithRegistar Element={DashboardRegistrar} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.StudentDetails1}
          element={<RouteWithRegistar Element={StudentDetails1} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.AluminiStudents}
          element={<RouteWithRegistar Element={ViewAluminiStudents} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Student.StudentAdmissionReport}
          element={<RouteWithRegistar Element={StudentAdmissionReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Student.assignStudents}
          element={<RouteWithRegistar Element={AssignStudents} />}
        ></Route>
        //
        <Route
          exact
          path={ROUTES.Registar.ApproveStudentId}
          element={<RouteWithRegistar Element={ApproveStudentId} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Student.ViewAluminiStudents}
          element={<RouteWithRegistar Element={ViewAluminiStudents} />}
        ></Route>
        //Front Office
        <Route
          exact
          path={ROUTES.Registar.frontOffice.AdmissionEnquiry}
          element={<RouteWithRegistar Element={AdmissionEnquiry} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.frontOffice.VisitorsBook}
          element={<RouteWithRegistar Element={VisitorsBook} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.frontOffice.PhoneCallLog}
          element={<RouteWithRegistar Element={PhoneCallLog} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.frontOffice.PostalDispatch}
          element={<RouteWithRegistar Element={PostalDispatch} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.frontOffice.PostalRecieve}
          element={<RouteWithRegistar Element={PostalRecieve} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.frontOffice.ViewPostalDispatchRecieve}
          element={<RouteWithRegistar Element={ViewPostalDispatchRecieve} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.frontOffice.Complain}
          element={<RouteWithRegistar Element={Complain} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.frontOffice.SetupOffice}
          element={<RouteWithRegistar Element={SetupOffice} />}
        ></Route>
        //Students
        <Route
          exact
          path={ROUTES.Registar.Student.StudentAdmission}
          element={<RouteWithRegistar Element={StudentAdmission} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Student.StudentView}
          element={<RouteWithRegistar Element={StudentView} />}
        ></Route>
        //StudentComplain
        <Route
          exact
          path={ROUTES.Registar.Student.NewComplaint}
          element={<RouteWithRegistar Element={Complaints} />}
        ></Route>
        //TicketsCenter
        <Route
          exact
          path={ROUTES.Registar.developersCentre}
          element={<RouteWithDevelopers Element={DevelopersCentre} />}
        ></Route>
        <Route
          exact
          path={ROUTES.IT.developersCentre}
          element={<RouteWithIT Element={DevelopersCentre} />}
        ></Route>
        <Route
          exact
          path={ROUTES.IT.leaveEntitlement}
          element={<RouteWithIT Element={EmployeeLeaveEntitlement} />}
        ></Route>
        <Route
          exact
          path={ROUTES.IT.leaveApplication}
          element={<RouteWithIT Element={EmployeeLeaveApplication} />}
        ></Route>
        <Route
          exact
          path={ROUTES.IT.leaveSchedule}
          element={<RouteWithIT Element={EmployeeSchedule} />}
        ></Route>
        <Route
          exact
          path={ROUTES.IT.PayRoll}
          element={<RouteWithIT Element={EmployerSalary} />}
        ></Route>
        <Route
          exact
          path={ROUTES.IT.AnnualStatement}
          element={<RouteWithIT Element={EmployeeAnnualStatement} />}
        ></Route>
        <Route
          exact
          path={ROUTES.IT.documentManagement}
          element={<RouteWithIT Element={EmployeeDocumentManagement} />}
        ></Route>
        <Route
          exact
          path={ROUTES.IT.teamDiscussion}
          element={<RouteWithIT Element={EmployeeTeamDiscussion} />}
        ></Route>
        <Route
          exact
          path={ROUTES.IT.teamDocuments}
          element={<RouteWithIT Element={EmployeeTeamDocument} />}
        ></Route>
        <Route
          exact
          path={ROUTES.IT.teamAnnouncement}
          element={<RouteWithIT Element={EmployeeTeamAnnouncement} />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.developersConversation}/:id`}
          element={<RouteWithDevelopers Element={DevelopersConversation} />}
        ></Route>
        //TicketConversation
        <Route
          exact
          path={`${ROUTES.Registar.ticketConversation}/:id`}
          element={<RouteWithDevelopers Element={TicketConversation} />}
        ></Route>
        //viewtickets
        <Route
          exact
          path={ROUTES.ViewTickets}
          element={<RouteWithDevelopers Element={ViewTickets} />}
        ></Route>
        //Info Uploading Page
        <Route
          exact
          path={ROUTES.mediaInfo}
          element={<RouteWithInfoUploadingTeam Element={MediaInfo} />}
        ></Route>
        <Route
          exact
          path={ROUTES.sliders}
          element={<RouteWithInfoUploadingTeam Element={Sliders} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Milestones}
          element={<RouteWithInfoUploadingTeam Element={Milestones} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Approvals}
          element={<RouteWithInfoUploadingTeam Element={Approvals} />}
        ></Route>
        <Route
          exact
          path={ROUTES.committees}
          element={<RouteWithInfoUploadingTeam Element={Committees} />}
        ></Route>
        <Route
          exact
          path={ROUTES.AdmissionNotifications}
          element={
            <RouteWithInfoUploadingTeam Element={AdmissionNotifications} />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.UniversityNotifications}
          element={
            <RouteWithInfoUploadingTeam Element={UniversityNotifications} />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.newStaff}
          element={<RouteWithInfoUploadingTeam Element={NewStaff} />}
        ></Route>
        <Route
          exact
          path={ROUTES.EventCalendar}
          element={<RouteWithInfoUploadingTeam Element={EventCalendar} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Recruitment}
          element={<RouteWithInfoUploadingTeam Element={Recruitment} />}
        ></Route>
        <Route
          exact
          path={ROUTES.ViewRecruitment}
          element={<RouteWithInfoUploadingTeam Element={ViewRecruitment} />}
        ></Route>
        <Route
          exact
          path={ROUTES.ViewMediaInfo}
          element={<RouteWithInfoUploadingTeam Element={ViewMediaInfo} />}
        ></Route>
        <Route
          exact
          path={ROUTES.homeoEvents}
          element={<RouteWithInfoUploadingTeam Element={HomeoInfo} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Achievements}
          element={<RouteWithInfoUploadingTeam Element={Achievements} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Achievements2}
          element={<RouteWithInfoUploadingTeam Element={Achievements2} />}
        ></Route>
        <Route
          exact
          path={ROUTES.PhotoGallery}
          element={<RouteWithInfoUploadingTeam Element={PhotoGallery} />}
        ></Route>
        <Route
          exact
          path={ROUTES.AcademicCalendar}
          element={<RouteWithInfoUploadingTeam Element={AcademicCalendar} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HospitalStaffAttendance}
          element={
            <RouteWithInfoUploadingTeam Element={HospitalStaffAttendance} />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.PCI_SIF}
          element={<RouteWithInfoUploadingTeam Element={PCI_SIF_Pharmacy} />}
        ></Route>
        <Route
          exact
          path={ROUTES.SyllabusUpload}
          element={<RouteWithInfoUploadingTeam Element={SyllabusUpload} />}
        ></Route>
        <Route
          exact
          path={ROUTES.OPDServices}
          element={<RouteWithInfoUploadingTeam Element={OPDServices} />}
        ></Route>
        <Route
          exact
          path={ROUTES.IPDServices}
          element={<RouteWithInfoUploadingTeam Element={IPDServices} />}
        ></Route>
        <Route
          exact
          path={ROUTES.CompanyDetails}
          element={<RouteWithInfoUploadingTeam Element={CompanyDetails} />}
        ></Route>
        <Route
          exact
          path={ROUTES.StaffDetailsNew}
          element={<RouteWithInfoUploadingTeam Element={StaffDetailsNew} />}
        ></Route>
        <Route
          exact
          path={ROUTES.StudentsPlacements}
          element={<RouteWithInfoUploadingTeam Element={StudentsPlacements} />}
        ></Route>
        <Route
          exact
          path={ROUTES.ResearchandPublication}
          element={
            <RouteWithInfoUploadingTeam Element={ResearchandPublication} />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.HomeopathyStudentsList}
          element={
            <RouteWithInfoUploadingTeam Element={HomeopathyStudentsList} />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.ViewHomeoStudentsList}
          element={
            <RouteWithInfoUploadingTeam Element={ViewHomeoStudentsList} />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.ViewHomeopathyResults}
          element={
            <RouteWithInfoUploadingTeam Element={ViewHomeopathyResults} />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.HomeopathyResults}
          element={<RouteWithInfoUploadingTeam Element={HomeopathyResults} />}
        ></Route>
        <Route
          exact
          path={ROUTES.CollegePermission}
          element={<RouteWithInfoUploadingTeam Element={CollegePermission} />}
        ></Route>
        <Route
          exact
          path={ROUTES.CollegeAffiliation}
          element={<RouteWithInfoUploadingTeam Element={CollegeAffiliation} />}
        ></Route>
        //Staff Dairy in Registar
        <Route
          exact
          path={ROUTES.Registar.StaffDairy.StaffDairy}
          element={<RouteWithRegistar Element={StaffDairy} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.StaffDairy.ViewStaffDairy}
          element={<RouteWithRegistar Element={ViewStaffDairy} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.StaffDairy.StaffDairyReport}
          element={<RouteWithRegistar Element={StaffDairyReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.StaffDairy.StaffDairyReport2}
          element={<RouteWithRegistar Element={StaffDairyReport2} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.StaffDairy.SyllabusUpload}
          element={<RouteWithRegistar Element={SyllabusUpload} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Recruitment.Recruitment}
          element={<RouteWithRegistar Element={Recruitment} />}
        ></Route>
        <Route
          exact
          path={ROUTES.ViewCollegePermission}
          element={
            <RouteWithInfoUploadingTeam Element={ViewCollegePermission} />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.StudentDetails1}
          element={<RouteWithInfoUploadingTeam Element={StudentDetails1} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Student.StudentDetails}
          element={<RouteWithRegistar Element={StudentDetails} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Student.StudentDetails1}
          element={<RouteWithRegistar Element={StudentDetails1} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Student.DisableStudents}
          element={<RouteWithRegistar Element={DisableStudents} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Student.EditStudentDetails}
          element={<RouteWithRegistar Element={EditStudentDetails} />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.Registar.Student.StudentProfile}/:id`}
          element={<RouteWithRegistar Element={StudentProfile} />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.Registar.Student.StudentProfile1}/:id`}
          element={<RouteWithRegistar Element={StudentProfile1} />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.Registar.Student.ViewStudentProfile}/:id`}
          element={<RouteWithRegistar Element={StudentView} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Student.AdmissionEnquiry}
          element={<RouteWithRegistar Element={StudentAdmissionEnquiry} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Student.AdmissionDetails}
          element={<RouteWithRegistar Element={StudentAdmissionDetails} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Student.Exam}
          element={<RouteWithRegistar Element={StudentsExams} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Student.Midterm}
          element={<RouteWithRegistar Element={StudentMidtermExam} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Student.Viva}
          element={<RouteWithRegistar Element={StudentsVivaMarks} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Student.ABCUpdate}
          element={<RouteWithRegistar Element={StudentUpdateAbc} />}
        ></Route>
        //Admissions
        <Route
          exact
          path={ROUTES.Registar.Admission.AdmissionDetails}
          element={<RouteWithRegistar Element={AdmssionStudentDetails} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Admission.Invoice}
          element={<RouteWithRegistar Element={Invoice} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Admission.InvoiceDetails}
          element={<RouteWithRegistar Element={InvoiceDetails} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Admission.AdmissionEnquiry}
          element={<RouteWithRegistar Element={AdmssionStudentEnquiry} />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.Registar.Admission.AdmissionProfile}/:id`}
          element={<RouteWithRegistar Element={AdmissionStudentProfile} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Admission.NewAdmission}
          element={<RouteWithRegistar Element={AdmissionNewAdmission} />}
        ></Route>
        //Admissions
        <Route
          exact
          path={ROUTES.Registar.Admission.PhdAdmissions}
          element={<RouteWithRegistar Element={PhdAdmissions} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Admission.PhdAdmissionsprofile}
          element={<RouteWithRegistar Element={PhdStudentProfile} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Admission.PhdAdmitCard + "/:id"}
          element={<RouteWithRegistar Element={PhdAdmitCard} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Admission.PhdExamAdmitCard + "/:id"}
          element={<RouteWithRegistar Element={PhdExamHallTicket} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Admission.PhdExamList}
          element={<RouteWithRegistar Element={PhdList} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Admission.PhdExamprofile + "/:id"}
          element={<RouteWithRegistar Element={PhdExamProfile} />}
        ></Route>
        //Accounts
        <Route
          exact
          path={ROUTES.Registar.Accounts.Income.View}
          element={<RouteWithRegistar Element={ViewIncome} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Accounts.Income.Add}
          element={<RouteWithRegistar Element={AddIncome} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Accounts.Income.AddSource}
          element={<RouteWithRegistar Element={AddIncomeSource} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Accounts.Expense.View}
          element={<RouteWithRegistar Element={ViewExpense} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Accounts.Expense.Add}
          element={<RouteWithRegistar Element={AddExpense} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Accounts.Expense.AddSource}
          element={<RouteWithRegistar Element={AddExpenseSource} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Accounts.FeeCollection.CollegeFee}
          element={<RouteWithRegistar Element={FeeCollectionCollectFee} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Accounts.FeeCollection.SearchFee}
          element={<RouteWithRegistar Element={FeeCollectionSearchFee} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Accounts.FeeCollection.SearchDue}
          element={<RouteWithRegistar Element={FeeCollectionSearchDue} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Accounts.FeeCollection.FeeMaster}
          element={<RouteWithRegistar Element={FeeCollectionFeeMaster} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Accounts.FeeCollection.FeeType}
          element={<RouteWithRegistar Element={FeeCollectionFeeType} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Accounts.FeeCollection.FeeGroup}
          element={<RouteWithRegistar Element={FeeCollectionFeeGroup} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Accounts.FeeCollection.FeeDiscount}
          element={<RouteWithRegistar Element={FeeCollectionFeeDiscount} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Accounts.FeeCollection.FeeTypeAmount}
          element={<RouteWithRegistar Element={FeeCollectionFeeTypeAmount} />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.Registar.Accounts.FeeCollection.AddFee}/:id`}
          element={<RouteWithRegistar Element={FeeCollectionAddFee} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Accounts.FeeCollection.assignFee}
          element={<RouteWithRegistar Element={FeeCollectionAssignFee} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Accounts.FeeCollection.Reports}
          element={<RouteWithRegistar Element={FeeCollectionReports} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Accounts.FeeCollection.filterForFees}
          element={<RouteWithRegistar Element={FeeCollectionDummySearch} />}
        ></Route>
        //Academics
        <Route
          exact
          path={ROUTES.Registar.Academics.ClassTimeTable}
          element={<RouteWithRegistar Element={ClassTimeTable} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Academics.CreateTimeTable}
          element={<RouteWithRegistar Element={CreateTimeTable} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Academics.TeacherTimeTable}
          element={<RouteWithRegistar Element={TeachersTimetable} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Academics.PromoteStudents}
          element={<RouteWithRegistar Element={PromoteStudents} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Academics.TransferStudents}
          element={<RouteWithRegistar Element={TransferStudents} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Academics.AddBatch}
          element={<RouteWithRegistar Element={AddBatch} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Academics.AddSubject}
          element={<RouteWithRegistar Element={AddSubjects} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Academics.AddClass}
          element={<RouteWithRegistar Element={AddClass} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Academics.ManageLessonPlan}
          element={<RouteWithRegistar Element={ManageLessonPlan} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Academics.SyllabusStatus}
          element={<RouteWithRegistar Element={SyllabusStatus} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Academics.AddTopic}
          element={<RouteWithRegistar Element={AddTopics} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Academics.AddQuestionBank}
          element={<RouteWithRegistar Element={AddQuestionBank} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Academics.AddLesson}
          element={<RouteWithRegistar Element={AddLessons} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Academics.AddSemester}
          element={<RouteWithRegistar Element={AddSemester} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Academics.AddSection}
          element={<RouteWithRegistar Element={AddSection} />}
        ></Route>
        //Transport
        <Route
          exact
          path={ROUTES.Registar.Transport.Route}
          element={<RouteWithRegistar Element={TransportRoute} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Transport.pickupPoints}
          element={<RouteWithRegistar Element={PickupPoints} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Transport.AssignPickupPoints}
          element={<RouteWithRegistar Element={TransportAssignPickupPoints} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Transport.TransportFees}
          element={<RouteWithRegistar Element={TransportFees} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Transport.Vehicles}
          element={<RouteWithRegistar Element={TransportVehicle} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Transport.AssignVehicles}
          element={<RouteWithRegistar Element={TransportAssignVehicles} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Transport.transportFee}
          element={<RouteWithRegistar Element={transportFee} />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.Registar.Transport.addtransportFee}/:id`}
          element={<RouteWithRegistar Element={AddTransportFee} />}
        ></Route>
        //Attendance
        <Route
          exact
          path={ROUTES.Registar.Attendance.ClassAttendance}
          element={<RouteWithRegistar Element={ClassAttendance} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Attendance.LabAttendance}
          element={<RouteWithRegistar Element={LabAttendance} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Academics.ViewPracStudents}
          element={<RouteWithRegistar Element={ViewAssignedStudents} />}
        ></Route>
        //Hostel
        <Route
          exact
          path={ROUTES.Registar.Hostel.HostelRooms}
          element={<RouteWithRegistar Element={HostelRooms} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Hostel.Hostel}
          element={<RouteWithRegistar Element={Hostel} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Hostel.HostelBeds}
          element={<RouteWithRegistar Element={HostelBeds} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Hostel.RoomType}
          element={<RouteWithRegistar Element={RoomType} />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.Registar.Hostel.addhostelFee}/:id`}
          element={<RouteWithRegistar Element={AddHostelFee} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Hostel.hostelFee}
          element={<RouteWithRegistar Element={hostelFees} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Hostel.HostelFloors}
          element={<RouteWithRegistar Element={HostelFloors} />}
        ></Route>
        //Inventory
        <Route
          exact
          path={ROUTES.Registar.Inventory.IssueItems}
          element={<RouteWithRegistar Element={IssueItems} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Inventory.IssueItem}
          element={<RouteWithRegistar Element={IssueItem} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Inventory.AddItem}
          element={<RouteWithRegistar Element={AddItem} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Inventory.AddItemstock}
          element={<RouteWithRegistar Element={Additemstock} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Inventory.ItemCategory}
          element={<RouteWithRegistar Element={ItemCategory} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Inventory.ItemStore}
          element={<RouteWithRegistar Element={ItemStore} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Inventory.ItemSupplier}
          element={<RouteWithRegistar Element={Itemsupplier} />}
        ></Route>
        //Certificate
        <Route
          exact
          path={ROUTES.Registar.Certificates.DesignHallticket}
          element={<RouteWithRegistar Element={DesignHallticket} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Certificates.DesignMarkscard}
          element={<RouteWithRegistar Element={DesignMarkscard} />}
        ></Route>
        //Reports //fee
        <Route
          exact
          path={ROUTES.Registar.Reports.Home}
          element={<RouteWithRegistar Element={Reports} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Income.IncomeReport}
          element={<RouteWithRegistar Element={IncomeReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Expense.ExpenseReport}
          element={<RouteWithRegistar Element={ExpenseReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.StaffAttendance.StaffAttendanceReport}
          element={<RouteWithRegistar Element={StaffAttendanceReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.LessonPlan.LessonPlanReport}
          element={<RouteWithRegistar Element={LessonPlanReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Fee.AdvancePayment}
          element={<RouteWithRegistar Element={AdvancePayment} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Fee.AdvancePaymentHome}
          element={<RouteWithRegistar Element={AdvancePaymentHome} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Fee.Home}
          element={<RouteWithRegistar Element={ReportsFeeHome} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Fee.BHA0}
          element={<RouteWithRegistar Element={FeeCollectionReports} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Fee.collegewiseCllection}
          element={<RouteWithRegistar Element={CollegeWiseCollectionReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Fee.BHA1}
          element={<RouteWithRegistar Element={ReportsBha1} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Fee.BHA7}
          element={<RouteWithRegistar Element={OnlineTransactionReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Fee.BHA2}
          element={<RouteWithRegistar Element={ReportsBha2} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Fee.BHA3}
          element={<RouteWithRegistar Element={ReportsBha3} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Fee.BHA4}
          element={<RouteWithRegistar Element={ReportsBha4} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Fee.BHA5}
          element={<RouteWithRegistar Element={ReportsBha5} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Fee.BHA6}
          element={<RouteWithRegistar Element={ReportsBha6} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Fee.Pending}
          element={<RouteWithRegistar Element={ReportsPendingClasswise} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Fee.PendingCollegewise}
          element={<RouteWithRegistar Element={ReportFeePendingCollege} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Fee.departmentwiseCllection}
          element={
            <RouteWithRegistar Element={DepartmentWiseCollectionReport} />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Fee.programwiseCllection}
          element={<RouteWithRegistar Element={ProgramWiseCollectionReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Fee.hostelfeeCollection}
          element={<RouteWithRegistar Element={hostelFeeCollectionReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Fee.hostelfeeFacultyWise}
          element={<RouteWithRegistar Element={FacultyWiseHostelReport} />}
        ></Route>
        //feedbacks
        <Route
          exact
          path={ROUTES.Registar.Reports.Feedbacks.FeedbacksHome}
          element={<RouteWithRegistar Element={FeedbacksHome} />}
        ></Route>
        //staff
        <Route
          exact
          path={ROUTES.Registar.Reports.Staff.Home}
          element={<RouteWithRegistar Element={ReportStaffHome} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Staff.Leave}
          element={<RouteWithRegistar Element={ReportStaffLeave} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Staff.StaffDetails}
          element={<RouteWithRegistar Element={ReportStaffDetails} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Fee.CancelledReceipts}
          element={<RouteWithRegistar Element={CancelledReceipts} />}
        ></Route>
        //student
        <Route
          exact
          path={ROUTES.Registar.Reports.Student.Home}
          element={<RouteWithRegistar Element={ReportStudentAttendance} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Student.MonthWise}
          element={<RouteWithRegistar Element={MonthWiseAttendance} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Fee.Transport}
          element={<RouteWithRegistar Element={DateWiseTransportFees} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Student.AttendanceSemWise}
          element={
            <RouteWithRegistar Element={ReportStudentAttendanceSemWise} />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.Reports.Student.StudentStat}
          element={<RouteWithRegistar Element={ReportOneStudentStat} />}
        ></Route>
        <Route
          exact
          path={
            ROUTES.Registar.Reports.Student.StudentSubStat +
            "/:student_id/:course_id"
          }
          element={<RouteWithRegistar Element={ReportOneStudentSubject} />}
        ></Route>
        //Ticket
        <Route
          exact
          path={ROUTES.Registar.Ticket}
          element={<RouteWithRegistar Element={Tickets} />}
        ></Route>
        //TicketConversation
        <Route
          exact
          path={`${ROUTES.Registar.ticketConversation}/:id`}
          element={<RouteWithRegistar Element={TicketConversation} />}
        ></Route>
        //LMS
        <Route
          exact
          path={ROUTES.Registar.LMS.Create}
          element={<RouteWithRegistar Element={LMSCreate} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Registar.LMS.View}
          element={<RouteWithRegistar Element={LMSList} />}
        ></Route>
        //////////////////////////////////////////////
        /////////////////////////////////////////// //////////////// //HR Pannel
        //////////////// /////////////////////////////////////////////
        ////////////////////////////////////////////// //Dashboard or Home
        <Route
          exact
          path={ROUTES.HR.Home}
          element={<RouteWithHR Element={DashboardHR} />}
        ></Route>
        //Tickets
        <Route
          exact
          path={ROUTES.HR.Ticket}
          element={<RouteWithHR Element={Tickets} />}
        ></Route>
        //Feedback Trigger
        <Route
          exact
          path={ROUTES.HR.Feedback.FeedbackTrigger}
          element={<RouteWithHR Element={FeedbackTrigger} />}
        ></Route>
        //TicketConversation
        <Route
          exact
          path={`${ROUTES.HR.ticketConversation}/:id`}
          element={<RouteWithHR Element={TicketConversation} />}
        ></Route>
        //Employee
        <Route
          exact
          path={ROUTES.HR.Employee.AddStaff}
          element={<RouteWithHR Element={AddNewStaff} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Employee.ViewStaff}
          element={<RouteWithHR Element={ViewStaff} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Employee.EditStaff}
          element={<RouteWithHR Element={EditStaff} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Employee.WebAccount}
          element={<RouteWithHR Element={WebAccount} />}
        ></Route>
        //////////////////Employer//////////////
        <Route
          exact
          path={ROUTES.HR.Employer.Information}
          element={<RouteWithHR Element={EmployerInformation} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Employer.CollegeType}
          element={<RouteWithHR Element={EmployeeCollegeType} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Employer.Program}
          element={<RouteWithHR Element={EmployeeProgram} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Employer.Specialization}
          element={<RouteWithHR Element={EmployeeSpecialization} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Employer.College}
          element={<RouteWithHR Element={EmployeeCollege} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Employer.CollegeSpecialization}
          element={<RouteWithHR Element={EmployeeCollegeSpecialization} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Employer.JobPosition}
          element={<RouteWithHR Element={JobPosition} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Employer.Department}
          element={<RouteWithHR Element={Department} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Employer.Branch}
          element={<RouteWithHR Element={EmployerBranch} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Employer.Level}
          element={<RouteWithHR Element={EmployerLevel} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Employer.Bank}
          element={<RouteWithHR Element={EmployerBank} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Employer.Course}
          element={<RouteWithHR Element={EmployerCourse} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Employer.Trainer}
          element={<RouteWithHR Element={EmployerTrainer} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Employer.Ethnicity}
          element={<RouteWithHR Element={EmployerEnthicity} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Employer.Religion}
          element={<RouteWithHR Element={EmployerReligion} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Employer.DocumentCategory}
          element={<RouteWithHR Element={EmployerDocs} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Employer.ApprovalWorkflow}
          element={<RouteWithHR Element={EmployerApprovalWorkflow} />}
        ></Route>
        //PayRoll
        <Route
          exact
          path={ROUTES.HR.PayRoll.EmployerSalary}
          element={<RouteWithHR Element={SalaryAdjustment} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.PayRoll.Earning}
          element={<RouteWithHR Element={PayRollEarning} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.PayRoll.Bonus}
          element={<RouteWithHR Element={PayRollBonus} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.PayRoll.Deduction}
          element={<RouteWithHR Element={PayRollDeduction} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.PayRoll.StationaryContribution}
          element={<RouteWithHR Element={PayRollStationaryContribution} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.PayRoll.Process}
          element={<RouteWithHR Element={PayRollProcess} />}
        ></Route>
        //Leave
        <Route
          exact
          path={ROUTES.HR.Leave.Management}
          element={<RouteWithHR Element={LeaveManagement} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Leave.Planner}
          element={<RouteWithHR Element={Planner} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Leave.Schedule}
          element={<RouteWithHR Element={Schedule} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Leave.Review}
          element={<RouteWithHR Element={LeaveReview} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Leave.TransactionReport}
          element={<RouteWithHR Element={LeaveTransactionReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Leave.EntitlementReport}
          element={<RouteWithHR Element={LeaveEntitlementReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Leave.Reports.Entitlement}
          element={<RouteWithHR Element={EntitlementDetaildReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Leave.Reports.Leave}
          element={<RouteWithHR Element={LeaveDetailedReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Leave.LeaveType}
          element={<RouteWithHR Element={LeaveLeaveType} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Leave.EarningPolicy}
          element={<RouteWithHR Element={EarningPolicy} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Leave.ApprovalWorkflow}
          element={<RouteWithHR Element={AppovalWorkflow} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Leave.CustomApprover}
          element={<RouteWithHR Element={LeaveCustomApprover} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Leave.Workday}
          element={<RouteWithHR Element={LeaveWorkDay} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Leave.Holiday}
          element={<RouteWithHR Element={LeaveHoliday} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Leave.Setting}
          element={<RouteWithHR Element={LeaveSetting} />}
        ></Route>
        //Attendance
        <Route
          exact
          path={ROUTES.HR.Attendance.Management}
          element={<RouteWithHR Element={AttendanceManagement} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Attendance.FieldCheckIn}
          element={<RouteWithHR Element={AttendanceFieldCheckIn} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Attendance.TimeClockReport}
          element={<RouteWithHR Element={AttendanceTimeClockReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Attendance.HoliDay}
          element={<RouteWithHR Element={LeaveHoliday} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Attendance.WorkDay}
          element={<RouteWithHR Element={LeaveWorkDay} />}
        ></Route>
        //Team
        <Route
          exact
          path={ROUTES.HR.Team.Discussion}
          element={<RouteWithHR Element={TeamDiscussion} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Team.Announcement}
          element={<RouteWithHR Element={TeamAnnouncement} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Team.documents}
          element={<RouteWithHR Element={TeamDocumentandForm} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Team.Chat}
          element={<RouteWithHR Element={TeamChat} />}
        ></Route>
        //Document Workflow
        <Route
          exact
          path={ROUTES.HR.Document.Management}
          element={<RouteWithHR Element={DocManagement} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Document.Review}
          element={<RouteWithHR Element={DocReview} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Document.ApprovalWorkFlow}
          element={<RouteWithHR Element={DocApprovalWorkflow} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Document.CustomApprover}
          element={<RouteWithHR Element={DocCustomApprover} />}
        ></Route>
        <Route
          exact
          path={ROUTES.HR.Declaration_Forms.DeclarationForm1}
          element={<RouteWithHR Element={DeclarationForm1} />}
        ></Route>
        //////////////////////////////////////////
        //////////////////////////////////////////
        /////////////Warden///////////////////////
        //////////////////////////////////////////
        //////////////////////////////////////////
        <Route
          exact
          path={ROUTES.Warden.HostelFees}
          element={<RouteWithWarden Element={hostelFees} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Warden.HostelRooms}
          element={<RouteWithWarden Element={HostelRooms} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Warden.HostelBeds}
          element={<RouteWithWarden Element={HostelBeds} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Warden.RoomType}
          element={<RouteWithWarden Element={RoomType} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Warden.Hostel}
          element={<RouteWithWarden Element={Hostel} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Warden.HostelFloors}
          element={<RouteWithWarden Element={HostelFloors} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Warden.AssignHostelStudents}
          element={<RouteWithWarden Element={AssignHostelStudents} />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.Warden.addhostelFee}/:id`}
          element={<RouteWithWarden Element={AddHostelFee} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Warden.StudentDetails}
          element={<RouteWithWarden Element={StudentDetailsHostel} />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.Warden.StudentProfile}/:id`}
          element={<RouteWithWarden Element={StudentProfile} />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.Warden.ViewStudentProfile}/:id`}
          element={<RouteWithWarden Element={StudentView} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Warden.HostelEditWarden}
          element={<RouteWithWarden Element={HostelEditWarden} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Warden.ModalHostelRooms}
          element={<RouteWithWarden Element={ModalHostelRooms} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Warden.ModalHostelRoomsAssign}
          element={<RouteWithWarden Element={ModalHostelRoomsAssign} />}
        ></Route>
        //////////////////////////////////////////
        //////////////////////////////////////////
        ////////////////////////////////////////
        //////////////Employee/////////////// ///////////////////////////////
        ////////////////////////////////
        <Route
          exact
          path={ROUTES.Employee.Home}
          element={<RouteWithEmployee Element={DashboardEmployee} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.StaffDairy.StaffDairy}
          element={<RouteWithEmployee Element={StaffDairy} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.StaffDairy.ViewStaffDairy}
          element={<RouteWithEmployee Element={ViewStaffDairy} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Reports.StudentStat}
          element={<RouteWithEmployee Element={ReportOneStudentStat} />}
        ></Route>
        <Route
          exact
          path={
            ROUTES.Employee.Reports.StudentSubStat + "/:student_id/:course_id"
          }
          element={<RouteWithEmployee Element={ReportOneStudentSubject} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Reports.Home}
          element={<RouteWithEmployee Element={DeanReports} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Reports.StudentDetails1}
          element={<RouteWithEmployee Element={StudentDetails1} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Reports.Attendance}
          element={<RouteWithEmployee Element={ReportStudentAttendance} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Reports.AttendanceSemWise}
          element={
            <RouteWithEmployee Element={ReportStudentAttendanceSemWise} />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Reports.MonthWise}
          element={<RouteWithEmployee Element={MonthWiseAttendance} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Academics.ViewPracStudents}
          element={<RouteWithEmployee Element={ViewAssignedStudents} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Student.AssignStudents}
          element={<RouteWithEmployee Element={AssignStudents} />}
        ></Route>
        //Staff Dairy in Employee
        <Route
          exact
          path={ROUTES.Employee.StaffDairy.StaffDairy}
          element={<RouteWithEmployee Element={StaffDairy} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.StaffDairy.ViewStaffDairy}
          element={<RouteWithEmployee Element={ViewStaffDairy} />}
        ></Route>
        //Tickets
        <Route
          exact
          path={ROUTES.Employee.Ticket}
          element={<RouteWithEmployee Element={Tickets} />}
        ></Route>
        //TicketConversation
        <Route
          exact
          path={`${ROUTES.Employee.ticketConversation}/:id`}
          element={<RouteWithEmployee Element={TicketConversation} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Profile}
          element={<RouteWithEmployee Element={EmployeeProfile} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Leave.Application}
          element={<RouteWithEmployee Element={EmployeeLeaveApplication} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Leave.Entitlement}
          element={<RouteWithEmployee Element={EmployeeLeaveEntitlement} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Leave.Schedule}
          element={<RouteWithEmployee Element={EmployeeSchedule} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Attendance}
          element={<RouteWithEmployee Element={EmployerAttendance} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Document}
          element={<RouteWithEmployee Element={EmployeeDocumentManagement} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Team.Announcement}
          element={<RouteWithEmployee Element={EmployeeTeamAnnouncement} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Team.Discussion}
          element={<RouteWithEmployee Element={EmployeeTeamDiscussion} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Team.Documents}
          element={<RouteWithEmployee Element={EmployeeTeamDocument} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Team.Chat}
          element={<RouteWithEmployee Element={TeamChat} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.PayRoll.AnnualStatement}
          element={<RouteWithEmployee Element={EmployeeAnnualStatement} />}
        ></Route>
        {/* <Route exact path={ROUTES.Employee.PayRoll.Payslip} element={<RouteWithEmployee Element={Employeepayslip} />}></Route> */}
        <Route
          exact
          path={ROUTES.Employee.PayRoll.Salary}
          element={<RouteWithEmployee Element={EmployerSalary} />}
        ></Route>
        //Academics
        <Route
          exact
          path={ROUTES.Employee.Academics.ClassTimeTable}
          element={<RouteWithEmployee Element={ClassTimeTable} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Academics.TeacherTimeTable}
          element={<RouteWithEmployee Element={TeachersTimetable} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Academics.PromoteStudents}
          element={<RouteWithEmployee Element={PromoteStudents} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Academics.TransferStudents}
          element={<RouteWithEmployee Element={TransferStudents} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Academics.AddSubject}
          element={<RouteWithEmployee Element={AddSubjects} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Academics.AddClass}
          element={<RouteWithEmployee Element={AddClass} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Academics.ManageLessonPlan}
          element={<RouteWithEmployee Element={ManageLessonPlan} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Academics.SyllabusStatus}
          element={<RouteWithEmployee Element={SyllabusStatus} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Academics.AddTopic}
          element={<RouteWithEmployee Element={AddTopics} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Academics.AddLesson}
          element={<RouteWithEmployee Element={AddLessons} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Academics.AddSemester}
          element={<RouteWithEmployee Element={AddSemester} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.Academics.AddQuestionBank}
          element={<RouteWithEmployee Element={AddQuestionBank} />}
        ></Route>
        //Review if Approver
        <Route
          exact
          path={ROUTES.Employee.Review}
          element={<RouteWithEmployee Element={EmployeeReview} />}
        ></Route>
        //Attendance
        <Route
          exact
          path={ROUTES.Employee.StudentAttendance.ClassAttendance}
          element={<RouteWithEmployee Element={ClassAttendance} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Employee.StudentAttendance.LabAttendance}
          element={<RouteWithEmployee Element={LabAttendance} />}
        ></Route>
        //Student Details
        <Route
          exact
          path={ROUTES.Employee.Student.AdmissionDetails}
          element={<RouteWithEmployee Element={StudentDetails} />}
        ></Route>
        /////////////////////////////////////////////////////
        /////////////////////////////////////////////////////
        /////////////////////////////////////////////////////
        ////////////////Examination//////////////////////////
        /////////////////////////////////////////////////////
        /////////////////////////////////////////////////////
        /////////////////////////////////////////////////////
        <Route
          exact
          path="/examinationportal"
          element={<RouteWithExam Element={DashboardHR} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Examination.Commitee}
          element={<RouteWithExam Element={Commitee} />}
        ></Route>
        {/* <Route exact path={ROUTES.Examination.CreateExams} element={<RouteWithExam Element={CreateExams} />}></Route> */}
        <Route
          exact
          path={ROUTES.Examination.AssignStaff}
          element={<RouteWithExam Element={AssignStaff} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Examination.CreateQuestionPaper}
          element={<RouteWithExam Element={CreateQuestionPaper} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Examination.CreateExamTimetable}
          element={<RouteWithExam Element={CreateExamTimetable} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Examination.ExamSchedules}
          element={<RouteWithExam Element={ExamSchedule} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Examination.ExamSeatingArrangements}
          element={<RouteWithExam Element={ExamSeatingArrangements} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Examination.PostExaminations}
          element={<RouteWithExam Element={PostExamination} />}
        ></Route>
        {/* <Route exact path={ROUTES.Examination.OtpVerification} element={<RouteWithExam Element={OtpVerification}/>}></Route> */}
        <Route
          exact
          path={ROUTES.Examination.DownloadQuestionPaper}
          element={<RouteWithExam Element={DownloadQuestionPaper} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Examination.AssignAnswerSheets}
          element={<RouteWithExam Element={AssignAnswersheets} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Examination.ExamEnrollment}
          element={<RouteWithExam Element={ExamEnrollment} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Examination.StudentApplicationForm}
          element={<RouteWithExam Element={StudentApplicationForm} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Examination.DownloadHallTickets}
          element={<RouteWithExam Element={DownloadHallTicket} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Examination.AssignCommitteeMembers}
          element={<RouteWithExam Element={AssignCommitteeStaff} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Examination.AddInvigilators}
          element={<RouteWithExam Element={AddInvigilators} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Examination.AddEvaluators}
          element={<RouteWithExam Element={AddEvaluators} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Examination.Hallticket}
          element={<RouteWithExam Element={HallTickets} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Examination.AttendanceList}
          element={<RouteWithExam Element={AttendanceList} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Examination.DownloadAttendanceList}
          element={<RouteWithExam Element={DownloadAttendanceList} />}
        ></Route>
        ///////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////
        ////////////////////////Accounts//////////////////////////
        //////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////
        <Route
          exact
          path={ROUTES.Accountant.StudentDetails}
          element={<RouteWithAccounts Element={StudentDetails} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.AssignHostelStudents}
          element={<RouteWithAccounts Element={AssignHostelStudents} />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.Accountant.StudentProfile}/:id`}
          element={<RouteWithAccounts Element={StudentProfile} />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.Accountant.StudentProfile1}/:id`}
          element={<RouteWithAccounts Element={StudentProfile1} />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.Accountant.ViewStudentProfile}/:id`}
          element={<RouteWithAccounts Element={StudentView} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.TransportDateWise}
          element={<RouteWithAccounts Element={DateWiseTransportFees} />}
        ></Route>
        //Tickets
        <Route
          exact
          path={ROUTES.Accountant.Ticket}
          element={<RouteWithAccounts Element={Tickets} />}
        ></Route>
        //TicketConversation
        <Route
          exact
          path={`${ROUTES.Accountant.ticketConversation}/:id`}
          element={<RouteWithAccounts Element={TicketConversation} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.collegewiseCollection}
          element={<RouteWithAccounts Element={CollegeWiseCollectionReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.hostelfeeCollection}
          element={<RouteWithAccounts Element={hostelFeeCollectionReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.hostelfeeFacultyWise}
          element={<RouteWithAccounts Element={FacultyWiseHostelReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.departmentwiseCollection}
          element={
            <RouteWithAccounts Element={DepartmentWiseCollectionReport} />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.programwiseCollection}
          element={<RouteWithAccounts Element={ProgramWiseCollectionReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.Dashboard}
          element={<RouteWithAccounts Element={DashboardAccountant} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.CollectFee}
          element={<RouteWithAccounts Element={FeeCollectionCollectFee} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.SearchDue}
          element={<RouteWithAccounts Element={FeeCollectionSearchDue} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.FeeMaster}
          element={<RouteWithAccounts Element={FeeCollectionFeeMaster} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.AssignFee}
          element={<RouteWithAccounts Element={FeeCollectionAssignFee} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.AddFee + "/:id"}
          element={<RouteWithAccounts Element={FeeCollectionAddFee} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.FeeType}
          element={<RouteWithAccounts Element={FeeCollectionFeeType} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.FeeGroup}
          element={<RouteWithAccounts Element={FeeCollectionFeeGroup} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.FeeDiscount}
          element={<RouteWithAccounts Element={FeeCollectionFeeDiscount} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.FeeTypeAmount}
          element={<RouteWithAccounts Element={FeeCollectionFeeTypeAmount} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.Reports}
          element={<RouteWithAccounts Element={ReportsFeeHome} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.report1}
          element={<RouteWithAccounts Element={FeeCollectionReports} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.report2}
          element={<RouteWithAccounts Element={ReportsBha1} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.onlineTransaction}
          element={<RouteWithAccounts Element={OnlineTransactionReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.report3}
          element={<RouteWithAccounts Element={ReportsBha4} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.report4}
          element={<RouteWithAccounts Element={ReportsPendingClasswise} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.onlineTransaction}
          element={<RouteWithAccounts Element={OnlineTransactionReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.PendingCollegewise}
          element={<RouteWithAccounts Element={ReportFeePendingCollege} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.CancelledReceipts}
          element={<RouteWithAccounts Element={CancelledReceipts} />}
        ></Route>
        //Transport
        <Route
          exact
          path={ROUTES.Accountant.Transport.Route}
          element={<RouteWithAccounts Element={TransportRoute} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.Transport.Vehicles}
          element={<RouteWithAccounts Element={TransportVehicle} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.Transport.AssignVehicles}
          element={<RouteWithAccounts Element={TransportAssignVehicles} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.Transport.transportFee}
          element={<RouteWithAccounts Element={transportFee} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.Transport.AssignPickupPoints}
          element={<RouteWithAccounts Element={TransportAssignPickupPoints} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.Transport.pickupPoints}
          element={<RouteWithAccounts Element={PickupPoints} />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.Accountant.Transport.addtransportFee}/:id`}
          element={<RouteWithAccounts Element={AddTransportFee} />}
        ></Route>
        //Hostel
        <Route
          exact
          path={ROUTES.Accountant.Hostel.HostelRooms}
          element={<RouteWithAccounts Element={HostelRooms} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.Hostel.Hostel}
          element={<RouteWithAccounts Element={Hostel} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.Hostel.RoomType}
          element={<RouteWithAccounts Element={RoomType} />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.Accountant.Hostel.addhostelFee}/:id`}
          element={<RouteWithAccounts Element={AddHostelFee} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.Hostel.hostelFee}
          element={<RouteWithAccounts Element={hostelFees} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Accountant.Hostel.HostelFloors}
          element={<RouteWithAccounts Element={HostelFloors} />}
        ></Route>
        //Cashier
        <Route
          exact
          path={`${ROUTES.Cashier.addhostelFee}/:id`}
          element={<RouteWithCashier Element={AddHostelFee} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Cashier.AddFee + "/:id"}
          element={<RouteWithCashier Element={FeeCollectionAddFee} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Cashier.hostelFee}
          element={<RouteWithCashier Element={hostelFees} />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.Cashier.addtransportFee}/:id`}
          element={<RouteWithCashier Element={AddTransportFee} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Cashier.transportFee}
          element={<RouteWithCashier Element={transportFee} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Cashier.Reports}
          element={<RouteWithCashier Element={ReportsFeeHome} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Cashier.report1}
          element={<RouteWithCashier Element={FeeCollectionReports} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Cashier.report2}
          element={<RouteWithCashier Element={ReportsBha1} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Cashier.onlineTransaction}
          element={<RouteWithRegistar Element={OnlineTransactionReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Cashier.report3}
          element={<RouteWithCashier Element={ReportsBha4} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Cashier.report4}
          element={<RouteWithCashier Element={ReportsPendingClasswise} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Cashier.PendingCollegewise}
          element={<RouteWithCashier Element={ReportFeePendingCollege} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Cashier.collegewiseCollection}
          element={<RouteWithCashier Element={CollegeWiseCollectionReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Cashier.hostelfeeCollection}
          element={<RouteWithCashier Element={hostelFeeCollectionReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Cashier.hostelfeeFacultyWise}
          element={<RouteWithCashier Element={FacultyWiseHostelReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Cashier.departmentwiseCollection}
          element={
            <RouteWithCashier Element={DepartmentWiseCollectionReport} />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.Cashier.programwiseCollection}
          element={<RouteWithCashier Element={ProgramWiseCollectionReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Cashier.Dashboard}
          element={<RouteWithCashier Element={DashboardAccountant} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Cashier.CollectFee}
          element={<RouteWithCashier Element={FeeCollectionCollectFee} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Cashier.SearchDue}
          element={<RouteWithCashier Element={FeeCollectionSearchDue} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Cashier.StudentDetails}
          element={<RouteWithCashier Element={StudentDetails} />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.Cashier.StudentProfile}/:id`}
          element={<RouteWithCashier Element={StudentProfile} />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.Cashier.ViewStudentProfile}/:id`}
          element={<RouteWithCashier Element={StudentView} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Cashier.TransportDateWise}
          element={<RouteWithCashier Element={DateWiseTransportFees} />}
        ></Route>
        {/* <Route exact path={ROUTES.Examination.OtpVerification} element={<RouteWithExam Element={OtpVerification} />}></Route> */}
        ////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////
        ////////////////////////// Receptionist ////////////////////////////
        ////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////
        <Route
          exact
          path={ROUTES.Reception.AdmissionEnquiry}
          element={<RouteWithReceptionist Element={AdmissionEnquiry} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Reception.VisitorsBook}
          element={<RouteWithReceptionist Element={VisitorsBook} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Reception.PhoneCallLog}
          element={<RouteWithReceptionist Element={PhoneCallLog} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Reception.PostalDispatch}
          element={<RouteWithReceptionist Element={PostalDispatch} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Reception.PostalRecieve}
          element={<RouteWithReceptionist Element={PostalRecieve} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Reception.Complain}
          element={<RouteWithReceptionist Element={Complain} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Reception.SetupOffice}
          element={<RouteWithReceptionist Element={SetupOffice} />}
        ></Route>
        ////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////
        ////////////////////////// AdmissionConsultant
        ////////////////////////////
        ////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////
        <Route
          exact
          path={ROUTES.AdConsult.AdmissionEnquiry}
          element={<RouteWithAdmissionConsultant Element={AdmissionEnquiry} />}
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.CollectFee}
          element={
            <RouteWithAdmissionConsultant Element={FeeCollectionCollectFee} />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.SearchDue}
          element={
            <RouteWithAdmissionConsultant Element={FeeCollectionSearchDue} />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.Reports.StudentAdmissionReport}
          element={
            <RouteWithAdmissionConsultant Element={StudentAdmissionReport} />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.Reports.BHA1}
          element={<RouteWithAdmissionConsultant Element={ReportsBha1} />}
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.Reports.departmentwiseCllection}
          element={
            <RouteWithAdmissionConsultant
              Element={DepartmentWiseCollectionReport}
            />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.StudentDetails}
          element={<RouteWithAdmissionConsultant Element={StudentDetails} />}
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.StaffDiary}
          element={<RouteWithAdmissionConsultant Element={StaffDairy} />}
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.ViewStaffDairy}
          element={<RouteWithAdmissionConsultant Element={ViewStaffDairy} />}
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.StaffDairyReport2}
          element={<RouteWithAdmissionConsultant Element={StaffDairyReport2} />}
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.Admission}
          element={
            <RouteWithAdmissionConsultant Element={AdmissionNewAdmission} />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.VisitorsBook}
          element={<RouteWithAdmissionConsultant Element={VisitorsBook} />}
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.PhoneCallLog}
          element={<RouteWithAdmissionConsultant Element={PhoneCallLog} />}
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.PostalDispatch}
          element={<RouteWithAdmissionConsultant Element={PostalDispatch} />}
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.PostalRecieve}
          element={<RouteWithAdmissionConsultant Element={PostalRecieve} />}
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.Complain}
          element={<RouteWithAdmissionConsultant Element={Complain} />}
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.SetupOffice}
          element={<RouteWithAdmissionConsultant Element={SetupOffice} />}
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.OnlineEnquiry}
          element={
            <RouteWithAdmissionConsultant Element={AdmssionStudentEnquiry} />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.HR.Document}
          element={
            <RouteWithAdmissionConsultant
              Element={EmployeeDocumentManagement}
            />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.HR.Leave.Application}
          element={
            <RouteWithAdmissionConsultant Element={EmployeeLeaveApplication} />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.HR.Leave.Entitlement}
          element={
            <RouteWithAdmissionConsultant Element={EmployeeLeaveEntitlement} />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.HR.Leave.Schedule}
          element={<RouteWithAdmissionConsultant Element={EmployeeSchedule} />}
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.HR.PayRoll.AnnualStatement}
          element={
            <RouteWithAdmissionConsultant Element={EmployeeAnnualStatement} />
          }
        ></Route>
        {/* <Route exact path={ROUTES.Employee.PayRoll.Payslip} element={<RouteWithAdmissionConsultant Element={Employeepayslip} />}></Route> */}
        <Route
          exact
          path={ROUTES.AdConsult.HR.PayRoll.Salary}
          element={<RouteWithAdmissionConsultant Element={EmployerSalary} />}
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.HR.Review}
          element={<RouteWithAdmissionConsultant Element={EmployeeReview} />}
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.HR.Team.Announcement}
          element={
            <RouteWithAdmissionConsultant Element={EmployeeTeamAnnouncement} />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.HR.Team.Discussion}
          element={
            <RouteWithAdmissionConsultant Element={EmployeeTeamDiscussion} />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.HR.Team.Documents}
          element={
            <RouteWithAdmissionConsultant Element={EmployeeTeamDocument} />
          }
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.HR.Team.Chat}
          element={<RouteWithAdmissionConsultant Element={TeamChat} />}
        ></Route>
        <Route
          exact
          path={ROUTES.AdConsult.HrNavigator}
          element={
            <RouteWithAdmissionConsultant Element={AdmissionConsultanttoHR} />
          }
        ></Route>
        /////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////
        //////////////////////////Library////////////////////////////
        /////////////////////////////////////////////////////////////
        <Route
          exact
          path={ROUTES.Library.Books}
          element={<RouteWithLibrary Element={Books} />}
        ></Route>
        <Route
          exact
          path={`${ROUTES.Library.ticketConversation}/:id`}
          element={<RouteWithLibrary Element={TicketConversation} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Library.ticket}
          element={<RouteWithLibrary Element={Tickets} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Library.UserLogs}
          element={<RouteWithLibrary Element={UserLogs} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Library.SearchBook}
          element={<RouteWithLibrary Element={SearchBook} />}
        ></Route>
        //Library HR
        <Route
          exact
          path={ROUTES.Library.leaveEntitlement}
          element={<RouteWithLibrary Element={EmployeeLeaveEntitlement} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Library.leaveApplication}
          element={<RouteWithLibrary Element={EmployeeLeaveApplication} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Library.leaveSchedule}
          element={<RouteWithLibrary Element={EmployeeSchedule} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Library.PayRoll}
          element={<RouteWithLibrary Element={EmployerSalary} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Library.AnnualStatement}
          element={<RouteWithLibrary Element={EmployeeAnnualStatement} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Library.documentManagement}
          element={<RouteWithLibrary Element={EmployeeDocumentManagement} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Library.teamDiscussion}
          element={<RouteWithLibrary Element={EmployeeTeamDiscussion} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Library.teamDocuments}
          element={<RouteWithLibrary Element={EmployeeTeamDocument} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Library.teamAnnouncement}
          element={<RouteWithLibrary Element={EmployeeTeamAnnouncement} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Library.Library_Settings}
          element={<RouteWithLibrary Element={LibrarySettings} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Library.Borrow}
          element={<RouteWithLibrary Element={BorrowBook} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Library.Reports}
          element={<RouteWithLibrary Element={LibraryReport} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Library.Dashboard}
          element={<RouteWithLibrary Element={LibraryDashboard} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Library.Ebook}
          element={<RouteWithLibrary Element={LibraryEbook} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default Router;
