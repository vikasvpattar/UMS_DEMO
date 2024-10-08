import { BASE_URL } from "./apiConstants";
// export const BASE_URL = "http://localhost:4000"

export const FEE_DETAILS = `${BASE_URL}/api/fee/details`;

export const FEE_DETAILS_SQL = `${BASE_URL}/api/fee/details-sql`;

export const FEE_REPORT_DEPT = `${BASE_URL}/api/fee/department-wise-report`;

export const FEE_REPORT_CLG = `${BASE_URL}/api/fee/college-wise-report`;

export const FEE_TYPE_AMOUNT = `${BASE_URL}/api/fee/amount`;

export const FEE_STUDENT = `${BASE_URL}/api/fee/student`;

//Previous Year Due Fees

export const PREVIOUS_YEAR_DUE_FEES = `${BASE_URL}/api/fee/getpreviousdueFees`;

//Add Income

export const FEE_INCOME = `${BASE_URL}/api/fee/income`;

export const FEE_INCOME_SOURCE = `${BASE_URL}/api/fee/income-source`;

export const FEE_EXPENSE = `${BASE_URL}/api/fee/expense`;

export const FEE_EXPENSE_SOURCE = `${BASE_URL}/api/fee/expense-source`;

///////////////STUDENT REPORTS

export const FEE_DETAILS_BY_STUDENT_ID = `${BASE_URL}/api/fee/student-fee`;

export const FEE_DETAILS_BY_STUDENT_ID_VIEW = `${BASE_URL}/api/fee/student-fee-view`;

export const FEE_PENDING_COLLEGE_WISE = `${BASE_URL}/api/fee/college-reports`;

export const ADDHOSTELFEE = `${BASE_URL}/api/fee/hostelfees`;

export const UPDATE_HOSTEL_FEE_AMOUNT = `${BASE_URL}/api/payment/update-hostel-fee`;

export const UPDATE_HOSTEL_FEE_STATUS = `${BASE_URL}/api/payment/update-hostel-fee-status`;

export const ADDHOSTELFEE1 = `${BASE_URL}/api/fee/sqlhostelfees`;

export const ADDTRANSPORTFEE = `${BASE_URL}/api/fee/transportFees`;

export const ADDTRANSPORTFEE1 = `${BASE_URL}/api/fee/newtransportFees1`;

export const HOSTELPAYMENTDATA = `${BASE_URL}/api/fee/hostelpaymentdata`;

//Student Complaint Api

export const STUDENT_COMPLAINT_GET = `${BASE_URL}/api/student/complaint/all`;

export const ADD_OTHER_FEES = `${BASE_URL}/api/fee/addOtherFees`;

// invoice

export const INVOICE_DATA_FETCH = `${BASE_URL}/api/fee/invoiceDataFetch`;

export const INVOICE_TABLE_FETCH = `${BASE_URL}/api/fee/invoiceTableFetch`;

export const INVOICE_CREATE = `${BASE_URL}/api/fee/createInvoice`;

export const INVOIE_UPDATE_DUEDAYS = `${BASE_URL}/api/fee/invoiceUpdateDueDays`;
