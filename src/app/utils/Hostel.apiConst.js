import { BASE_URL } from "./apiConstants";

//Academics

//Add Subject
export const HOSTEL = `${BASE_URL}/api/hostel/hostel`
export const HOSTEL_TYPE = `${BASE_URL}/api/hostel/room-type`
export const HOSTEL_ROOMS = `${BASE_URL}/api/hostel/hostel-room`
export const HOSTEL_ROOMS_SQL = `${BASE_URL}/api/hostel/hostel-room-sql`
export const HOSTEL_ROOMS_SQL_2 = `${BASE_URL}/api/hostel/hostel-room-sql-2`

export const HOSTEL_FLOORS = `${BASE_URL}/api/hostel/hostel-floor`
export const HOSTEL_BEDS = `${BASE_URL}/api/hostel/hostel-bed`
export const GET_HOSTELFEES_FACULTY_WISE = `${BASE_URL}/api/payment/hostelfeeFacultyWise`

//SQL queries api to get hostel details
export const HOSTEL_DETAILS = `${BASE_URL}/api/hostel/get-hostel-sql`;
export const HOSTEL_FLOOR_DETAILS = `${BASE_URL}/api/hostel/get-hostel-floors-sql`;
export const HOSTEL_ROOM_TYPE_DETAILS = `${BASE_URL}/api/hostel/get-hostel-room-type-sql`;
export const HOSTEL_ROOMS_DETAILS = `${BASE_URL}/api/hostel/get-hostel-rooms-sql`;
export const HOSTEL_ASSIGN = `${BASE_URL}/api/hostel/assign-hostel`;  //post request
export const HOSTEL_STUDENT_DATA = `${BASE_URL}/api/hostel/get-hostel-student-data`;
export const HOSTEL_FEE_YEAR = `${BASE_URL}/api/hostel/get-hostel-fee-year-wise`;
export const HOSTEL_BED_DETAILS = `${BASE_URL}/api/hostel/get-hostel-beds`;


