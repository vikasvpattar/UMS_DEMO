import { BASE_URL } from "./apiConstants";


//pre examination
export const PRE_EXAM_COMMITTEE = `${BASE_URL}/api/exam/pre/exam-committee`  //CRUD

export const PRE_CLASS_EXAM = `${BASE_URL}/api/exam/pre/class-exam` //CRUD

export const PRE_EXAM_TIMETABLE = `${BASE_URL}/api/exam/pre/timetable` //CRUD

export const PRE_EXAM_INVALIGATOR = `${BASE_URL}/api/exam/pre/invigilator` //CRUD

export const PRE_EXAM_EVALUATOR = `${BASE_URL}/api/exam/pre/evaluator` //CRUD


// Internals
export const INTERNALS = `${BASE_URL}/api/exam/student/internal`

// Midterm
export const STUDENT_MIDTERM = `${BASE_URL}/api/exam/student/mid-term`

// Internals
export const STUDENT_VIVA = `${BASE_URL}/api/exam/student/viva`

//PhdExamForm
export const GET_EXAM_FORM = `${BASE_URL}/api/exam/phd/getAll`;
