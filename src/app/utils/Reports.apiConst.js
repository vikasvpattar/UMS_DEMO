import { BASE_URL } from "./apiConstants";

///fee
export const REPORT_FEE_DETAILS = `${BASE_URL}/api/payment/details`;

export const REPORT_FEE_DETAILS_SQL = `${BASE_URL}/api/payment/detailsDatewiseSql`;

export const REPORT_CANCELLED_RECEIPTS_DETAILS = `${BASE_URL}/api/payment/getcancelledreceiptsinfo`;

export const REPORT_ONLINE_TRANSACTION_DETAILS = `${BASE_URL}/api/payment/onlineTransaction`;

export const TRANSPORT_DATE_WISE = `${BASE_URL}/api/fee/transportPaymentData`;

export const REPORT_COLLEGE_WISE_FEE_DETAILS = `${BASE_URL}/api/payment/details-college-wise`;

export const PAYMENT_SQL = `${BASE_URL}/api/payment/paymentDetailsSQL`;

export const PAYMENT_COLLEGE_WISE_SQL = `${BASE_URL}/api/payment/college-wise-paymentdetails-SQL`;

export const PAYMENT_PROGRAM_WISE_SQL = `${BASE_URL}/api/payment/program-wise-paymentdetails-SQL`;

export const PAYMENT_DEPARTMENT_WISE_SQL = `${BASE_URL}/api/payment/department-wise-paymentdetails-SQL`;

// staff

//staffleave
export const REPORT_STAFF_DETAILS = `${BASE_URL}/api/reports/staff-details`;

//staffleave
export const REPORT_STAFF_LEAVE = `${BASE_URL}/api/reports/leave-from-to`;

//Student
//attendance
export const REPORT_STUDENT_ATTENDANCE = `${BASE_URL}/api/reports/student-attendance`;
export const REPORT_STUDENT_ATTENDANCE_STAT = `${BASE_URL}/api/reports/student-attendance/stat`;
export const REPORT_STUDENT_ATTENDANCE_STAT_STU_SUB = `${BASE_URL}/api/reports/student-attendance/stat-sub`;
export const REPORT_STUDENT_ATTENDANCE_MONTHWISE = `${BASE_URL}/api/reports/student-attendance/month-wise`;
export const REPORT_STUDENT_ATTENDANCE_ALL = `${BASE_URL}/api/reports/student-attendance/all`;

//feedback
export const REPORT_FEEDBACK_FECTH = `${BASE_URL}/api/student/portal/feedbackReport`;
export const REPORT_FEEDBACK_QUESTIONS_FECTH = `${BASE_URL}/api/student/portal/getFeedbackQuestions`;
export const REPORT_TEACHERS_FECTH = `${BASE_URL}/api/student/portal/getTeachers`;
export const REPORT_TRIGGER_FETCH = `${BASE_URL}/api/student/portal/getFeedbackTriggerData`;
export const REPORT_TRIGGER_UPDATE = `${BASE_URL}/api/student/portal/trigger_feedback_type`;
