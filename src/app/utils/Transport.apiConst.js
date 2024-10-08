import { BASE_URL } from "./apiConstants";

//Academics

//Add Subject
export const TRANSPORT_ROUTE = `${BASE_URL}/api/transport/transport-route`
export const TRANSPORT_VEHICLE = `${BASE_URL}/api/transport/vehicle`
export const TRANSPORT_ASSIGN_VEHICLE = `${BASE_URL}/api/transport/vehicle-route`

export const PICKUP_POINTS = `${BASE_URL}/api/transport/pickupPoints`  //post,get,put

export const TRANSPORT_FEES = `${BASE_URL}/api/transport/transportFees` //post

export const GET_TRANSPORT_FEES = `${BASE_URL}/api/fee/transportFees` //post

//assign pickuppoints
export const ASSIGN_PICKUPPOINTS = `${BASE_URL}/api/transport/createPickupPoints` //post

export const GET_ASSIGNED_PICKUPPOINTS = `${BASE_URL}/api/transport/getPickupPoints`

export const UPDATE_ASSIGNED_PICKUPPOINTS = `${BASE_URL}/api/transport/updatePickupPoints` 


//sql queries
export const STUDENT_TRANSPORT_FEES = `${BASE_URL}/api/transport/get-trnasport-student-data`;
export const TRANSPORT_ASSIGN = `${BASE_URL}/api/transport/assign-transport`;  //post request
