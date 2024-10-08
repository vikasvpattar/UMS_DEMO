// Base Url

// export const BASE_URL = "http://localhost:4000";
export const BASE_URL = "https://server.swaminarayanuniversity.ac.in";

// export const BASE_URL =
//   process.env.REACT_APP_MODE == "development"
//     ? "http://localhost:4000"y
//     : process.env.REACT_APP_BASE_URL;

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
///////////////////AWS FILE UPLOADER CONSTANTS//////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

export const AWS_URL_GENERATOR = `${BASE_URL}/api/asset/url`; //post Request

export const PREV_EXAM_RESULT = `${BASE_URL}/api/exam/prevresult`;
export const PREV_ENGG_EXAM_RESULT = `${BASE_URL}/api/exam/prevgetResultsEng`;
export const PREV_PHARM_EXAM_RESULT = `${BASE_URL}/api/exam/prevgetResultsPharm`;

////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
///////////////////AWS FILE UPLOADER CONSTANTS///////////////
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

//Login
export const LOGIN = `${BASE_URL}/api/user/`;

export const RESET_PASSWORD = `${BASE_URL}/api/user/forgot`;

export const CONFIRM_PASSWORD = `${BASE_URL}/api/user/password`;

export const STUDENT_CONFIRM_PASSWORD = `${BASE_URL}/api/student/reset-password`;

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
////////////////////////////////HR////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

//////////////////
//////////////////
/////Dashboard////
//////////////////
//////////////////
export const DASHBOARD_HR = `${BASE_URL}/api/dashboard/hr`; //get put and post

export const DASHBOARD_REGISTRAR = `${BASE_URL}/api/dashboard/registrar`;
/////////////////
/////////////////
//employee//////
////////////////
////////////////

//Staff CRUD
export const EMPLOYEE = `${BASE_URL}/api/hr/employee`; //get put and post

export const EMPLOYEE_CREDENTIALS = `${BASE_URL}/api/employee/employeeCredentials`; //get

export const EMPLOYEE1 = `${BASE_URL}/api/employee`; //get put and post

//Staff Placement
export const EMPLOYEE_PLACEMENT = `${BASE_URL}/api/employee/placement`; //CRU

//Staff Employment Terms
export const EMPLOYEE_EMPLOYEMENT_TERMS = `${BASE_URL}/api/employee/employment-terms`; //CRU

//Staff Experience
export const EMPLOYEE_EXPERIENCE = `${BASE_URL}/api/employee/experience`; //CRU

//Staff Experience
export const EMPLOYEE_EDUCATION = `${BASE_URL}/api/employee/education`; //CRU

//Staff Experience
export const EMPLOYEE_LEGAL_DOCUMENTS = `${BASE_URL}/api/employee/legal-document`; //CRU

//Staff Training
export const EMPLOYEE_TRAINING = `${BASE_URL}/api/employee/training`; //CRU

//Staff Training
export const EMPLOYEE_PUBLICATION = `${BASE_URL}/api/employee/publication`; //CRU

//Delete Employee
export const EMPLOYEE_DELETE = `${BASE_URL}/api/employee/delete-employee`; //CRU

/////////////////
/////////////////
//employer//////
////////////////
////////////////

//all Data

export const ALL_DATA = `${BASE_URL}/api/hr/data/getall`; //get

//COLLEGE Type
export const COLLEGE_TYPE = `${BASE_URL}/api/hr/collegetype`; //get , put and post

//Program
export const PROGRAM = `${BASE_URL}/api/hr/program`; //get , put and post

//Specialization
export const SPECIALIZATION = `${BASE_URL}/api/hr/specialization`; //get , put and post

//COLLEGEs
export const COLLEGES = `${BASE_URL}/api/hr/college`; //get , put and post

//COLLEGE Specialization
export const COLLEGE_SPECIALIZATION = `${BASE_URL}/api/hr/collegespecialization`; //get , put and post

//job Roles
export const JOB_POSITIONS = `${BASE_URL}/api/hr/jobroles`; //get, put and post

//Department
export const DEPARTMENTS = `${BASE_URL}/api/hr/department`; //get , put and post

//Trainer
export const TRAINER = `${BASE_URL}/api/hr/trainer`; //get , put and post

//Documetn Category
export const DOCUMENT_CATEGORY = `${BASE_URL}/api/hr/document-category`;

//custom approver
export const CUSTOM_APPROVER = `${BASE_URL}/api/hr/approver`;

/////////////////
/////////////////
//Attendance/////
/////////////////
/////////////////

//get and add Attendance
export const EMPLOYEE_ATTENDANCE = `${BASE_URL}/api/employee/attendance`; //CRU

//////////////////////////
//////////////////////////
//Documeny Management/////
//////////////////////////
//////////////////////////

//Document Workfolw
export const EMPLOYEE_DOCUMENT_APPROVAL_WORKFLOW = `${BASE_URL}/api/hr/document-workflow`; //CRU

//Document Workfolw
export const EMPLOYEE_DOCUMENT_MANAGEMENT = `${BASE_URL}/api/employee/document`; //CRU

//////////////////////////
//////////////////////////
// //Leave Management/////
//////////////////////////
//////////////////////////

//Leave Get All
export const LEAVE_GET_ALL = `${BASE_URL}/api/hr/leavemanagement`;

//Earning Poolicy
export const LEAVE_EARNING_POLICY = `${BASE_URL}/api/hr/earning-policy`;

//Earning Poolicy
export const LEAVE_LEAVE_TYPE = `${BASE_URL}/api/hr/leave-type`;

//Holiday Type
export const LEAVE_HOLIDAY_TYPE = `${BASE_URL}/api/hr/holiday-type`;

//Holiday List
export const LEAVE_HOLIDAY_LIST = `${BASE_URL}/api/hr/holiday`;

export const HOLIDAY_CALENDER = `${BASE_URL}/api/hr/calender`;

//Entitlements
export const LEAVE_ENTITLEMENT = `${BASE_URL}/api/employee/entitlement`;

//Entitlements report
export const LEAVE_ENTITLEMENT_REPORT = `${BASE_URL}/api/employee/entitlement-report`;
export const LEAVE_ENTITLEMENT_REPORT2 = `${BASE_URL}/api/employee/entitlement-report2`;

//Entitlements report
export const LEAVE_LEAVE_REPORT = `${BASE_URL}/api/employee/leave-detail-report`;

//Entitlements Employee
export const LEAVE_REVIEW_EMPLOYEE = `${BASE_URL}/api/employee/review-application`;

//Applications
export const LEAVE_APPLICATION = `${BASE_URL}/api/employee/leave-application`;

//Approver applications
export const LEAVE_APPROVER_APPLICATION = `${BASE_URL}/api/employee/leave-approvals`;

//////////////////////////
//////////////////////////
// //Leave Management/////
//////////////////////////
//////////////////////////

//Team Discussions
export const TEAM_DISCUSSION = `${BASE_URL}/api/hr/team-discussion`;

export const TEAM_CHATS = `${BASE_URL}/api/hr/discussion-reply`;

//Team Announcements
export const TEAM_ANNOUNCEMENTS = `${BASE_URL}/api/hr/team-announcement`;

//Document Sharing
export const TEAM_DOC_SHARING = `${BASE_URL}/api/hr/team-document`;

//////////////////////////
//////////////////////////
///Pay Roll Management////
//////////////////////////
//////////////////////////

//Pay ROll Get ALl
export const PAYROLL_GETALL = `${BASE_URL}/api/hr/payroll/getAll`;

//Pay ROll Salary Adjustment
export const PAYROLL_SALARY_ADJUST = `${BASE_URL}/api/employee/salary-adjustment`;

//Pay ROll Pay Slip
export const PAYROLL_PAY_SLIP = `${BASE_URL}/api/employee/payslip`;

//Pay ROll Bonus
export const PAYROLL_BONUS = `${BASE_URL}/api/hr/payroll/bonus`;

//Pay ROll Earning
export const PAYROLL_EARNING = `${BASE_URL}/api/hr/payroll/earning`;

//Pay ROll Deduction
export const PAYROLL_DEDUCTION = `${BASE_URL}/api/hr/payroll/deduction`;

//Pay ROll Statutory Contribution
export const PAYROLL_STATUTORY_CONTRIBUTION = `${BASE_URL}/api/hr/payroll/statutorycontribution`;

//Pay ROll EMPLOYEE PAYSLIP
export const PAYROLL_EMPLOYEE_PAYSLIP = `${BASE_URL}/api/employee/getpayslip`;

//Workflow
export const HR_WORKFLOW = `${BASE_URL}/api/hr/approval-workflow`;

///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
/////////////Employee/////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////

//Basic Data
export const EMPLOYEE_DETAILS_BASIC = `${BASE_URL}/api/employee/details`;

export const EMPLOYEE_ALL = `${BASE_URL}/api/employee/getAll`;

export const EMPLOYEE_ALL2 = `${BASE_URL}/api/employee/`;

export const NEW_WEB_STAFF = `${BASE_URL}/api/employee/newStaff`;

////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
///////////Student//////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////

//Admission Enquirry
export const STUDENT_ADMISSION_ENQUIRRY = `${BASE_URL}/api/frontOffice/admission-enquiry`;

export const STUDENT_ADMISSION_REPORT = `${BASE_URL}/api/student/admissions/getStudentAdmissions`;

//STUDENTS
export const STUDENT_ADMISSION_DETAILS = `${BASE_URL}/api/admission`;

export const STUDENT_ADMISSION = `${BASE_URL}/api/student`;

export const STUDENT_GENDER = `${BASE_URL}/api/student/updategender`;

export const STUDENT_SESSION_UPDATE = `${BASE_URL}/api/student/session/x/newUpdate`;

export const STUDENT_SESSION_UPDATE_STATUS = `${BASE_URL}/api/student/updatestudentsessionstatus`;

export const STUDENT_INFO_UPDATE_STATUS = `${BASE_URL}/api/student/updatestudentInfostatus`;

export const STUDENT_ADMISSION_BULK = `${BASE_URL}/api/student/bulkadd`;

export const STUDENT_QUESTION_UPLOAD_BULK = `${BASE_URL}/api/academics/bulkquestionsUpload`;

export const STUDENT_SESSION = `${BASE_URL}/api/student/session/all`;

export const STUDENT_SESSION2 = `${BASE_URL}/api/student/session/all2`;

export const GET_STUDENT_SESSION = `${BASE_URL}/api/student/session/getall`;

export const STUDENT_ADVANCE_PAY = `${BASE_URL}/api/student/getAdvancePay`;

export const STUDENTS_LIST = `${BASE_URL}/api/student`;

export const STUDENT_DETAILS = `${BASE_URL}/api/student`;

export const STUDENT_DETAIL4 = `${BASE_URL}/api/student/details`;

export const STUDENT_DETAILS2 = `${BASE_URL}/api/student/getStudent/BySequelize2`;

export const STUDENT_DETAILS3 = `${BASE_URL}/api/student/getStudent/BySequelize3`;

export const STUDENT_DETAILS1 = `${BASE_URL}/api/student/getStudent/BySequelize`;

///////////////////////////////////////////
///////////////////////////////////////////
/////////////PHD Admission////////////////
///////////////////////////////////////////
///////////////////////////////////////////

export const PHD_ADMISSIONS = `${BASE_URL}/api/admission/phdadmissions`;

export const PHD_ADMISSIONS_SQL = `${BASE_URL}/api/admission/phdadmissions-sql`;

//Get Student Id's
export const GET_STUDENT_BY_ID = `${BASE_URL}/api/admission/StudentIds`;

export const GET_STUDENT_BY_ID1 = `${BASE_URL}/api/admission/StudentIds1`;

export const UPDATE_STUDENT_BY_ID = `${BASE_URL}/api/admission/updateStudentIds`;

export const GET_STUDENT_ABC_INFO = `${BASE_URL}/api/student/abc/info`;

export const ADVANCE_PAYMENT_DATE_WISE = `${BASE_URL}/api/student/fee/getadvancePayDatewise`;
