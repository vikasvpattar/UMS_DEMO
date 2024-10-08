import { ROUTES } from '../../../Router/routerConfig';


const drop = 'dropdown'
const stat = 'static'
const sheet = 'sheet'

let studentdrop;
let collegeId = sessionStorage.getItem("college_id")
if (collegeId != 1111000 && collegeId != 1111009) {
    studentdrop = [{
        title: 'Student Details',
        type: stat,
        route: ROUTES.Principal.Student.StudentDetails
    },
    {
        title: 'Exams',
        type: stat,
        route: ROUTES.Principal.Student.Exam
    },
    {
        title: 'Update ABC',
        type: stat,
        route: ROUTES.Principal.Student.UpdateABC
    }]
}
else {
    studentdrop = [{
        title: 'Student Details',
        type: stat,
        route: ROUTES.Principal.Student.StudentDetails
    },
    {
        title: 'Internal Exams',
        type: stat,
        route: ROUTES.Principal.Student.Exam
    },
    {
        title: 'Midterm Exams',
        type: stat,
        route: ROUTES.Principal.Student.Midterm
    }, {
        title: 'Viva',
        type: stat,
        route: ROUTES.Principal.Student.Viva
    },
    {
        title: 'Update ABC',
        type: stat,
        route: ROUTES.Principal.Student.UpdateABC
    }]
}

export const navbarDataPrincipal = [
    {
        title: 'Dashboard',
        type: stat,
        route: ROUTES.Principal.dashboard,
        icon: <i className="ri-folder-chart-line mr-2" />
    },
    {
        title: 'HR',
        type: stat,
        route: ROUTES.HR.Home,
        icon: <i className="ri-folder-chart-line mr-2" />
    },
    {
        title: 'Front Office',
        type: drop,
        icon: <i className="ri-store-2-line mr-2" />,
        drop: [
            {
                title: 'Admission Enquiry',
                type: stat,
                route: ROUTES.Principal.frontOffice.AdmissionEnquiry
            },
            {
                title: 'Visitors Book',
                type: stat,
                route: ROUTES.Principal.frontOffice.VisitorsBook
            },
            {
                title: 'Phone Call Log',
                type: stat,
                route: ROUTES.Principal.frontOffice.PhoneCallLog
            },
            {
                title: 'Postal Dispatch',
                type: stat,
                route: ROUTES.Principal.frontOffice.PostalDispatch
            },
            {
                title: 'Postal Receive',
                type: stat,
                route: ROUTES.Principal.frontOffice.PostalRecieve
            },
            {
                title: 'Complaints',
                type: stat,
                route: ROUTES.Principal.frontOffice.Complain
            },
            {
                title: 'Setup Front Office',
                type: stat,
                route: ROUTES.Principal.frontOffice.SetupOffice
            },
        ]
    },
    {
        title: 'Accounts',
        type: drop,
        icon: <i className="ri-stack-line mr-2" />,
        drop: [
            {
                title: 'Income',
                type: drop,
                drop: [
                    {
                        title: 'View Income',
                        type: stat,
                        route: ROUTES.Principal.Accounts.Income.View
                    },
                    {
                        title: 'Add Income',
                        type: stat,
                        route: ROUTES.Principal.Accounts.Income.Add
                    },
                    {
                        title: 'Add Income Source',
                        type: stat,
                        route: ROUTES.Principal.Accounts.Income.AddSource
                    },
                ]
            },
            {
                title: 'Expense',
                type: drop,
                drop: [
                    {
                        title: 'View Expense',
                        type: stat,
                        route: ROUTES.Principal.Accounts.Expense.View
                    },
                    {
                        title: 'Add Expense',
                        type: stat,
                        route: ROUTES.Principal.Accounts.Expense.Add
                    },
                    {
                        title: 'Add Expense Source',
                        type: stat,
                        route: ROUTES.Principal.Accounts.Expense.AddSource
                    },
                ]
            },
            {
                title: 'Fee Collection',
                type: drop,
                drop: [
                    {
                        title: 'Search Due Fees',
                        type: stat,
                        route: ROUTES.Principal.Accounts.FeeCollection.SearchDue
                    },
                    {
                        title: 'Reports',
                        type: stat,
                        route: ROUTES.Principal.Accounts.FeeCollection.Reports
                    },
                ]
            },
        ]
    },
    // told by Praksha Bhai
    {
        title: 'Academics',
        type: sheet,
        icon: <i className="ri-pencil-ruler-2-line mr-2" />,
        drop: [
            {
                title: 'Curriculum',
                elements: [
                    {
                        title: 'Class Time Table',
                        route: ROUTES.Principal.Academics.ClassTimeTable
                    },
                    {
                        title: 'Teacher Time Table',
                        route: ROUTES.Principal.Academics.TeacherTimeTable
                    },
                    {
                        title: 'Promote Student',
                        route: ROUTES.Principal.Academics.PromoteStudents
                    },
                    {
                        title: 'Add Class',
                        route: ROUTES.Principal.Academics.AddClass
                    },
                    {
                        title: 'Add Semester',
                        route: ROUTES.Principal.Academics.AddSemester
                    },
                    {
                        title: 'Add Section',
                        route: ROUTES.Principal.Academics.AddSection
                    },
                    {
                        title: 'Add Subject',
                        route: ROUTES.Principal.Academics.AddSubject
                    },
                    {
                        title: "Add Batch",
                        route: ROUTES.Principal.Academics.AddBatch,
                    },
                ]
            },
            {
                title: 'Lesson Plan',
                elements: [
                    {
                        title: 'Manage Lesson Plan',
                        route: ROUTES.Principal.Academics.ManageLessonPlan
                    },
                    {
                        title: 'Syllabus Status',
                        route: ROUTES.Principal.Academics.SyllabusStatus
                    },
                    {
                        title: 'Add Lesson',
                        route: ROUTES.Principal.Academics.AddLesson
                    },
                    {
                        title: 'Add Topic',
                        route: ROUTES.Principal.Academics.AddTopic
                    },
                    {
                        title: 'Add Question Bank',
                        route: ROUTES.Principal.Academics.AddQuestionBank
                    },

                ]
            }
        ]
    },
    {
        title: 'Admissions',
        type: drop,
        icon: <i className="ri-add-circle-line mr-2" />,
        drop: [
            {
                title: 'New Admission',
                type: stat,
                route: ROUTES.Principal.Admission.NewAdmission
            },
            {
                title: 'Online Enquiry',
                type: stat,
                route: ROUTES.Principal.Admission.AdmissionEnquiry
            },
            {
                title: 'Admission Form',
                type: stat,
                route: ROUTES.Principal.Admission.AdmissionDetails
            },
        ]
    },
    {
        title: 'Students',
        type: drop,
        icon: <i className="ri-user-add-fill mr-2" />,
        drop: studentdrop
    },


    // {
    //     title:'HR',
    //     type:drop,
    //     icon:<i className="ri-layout-3-line mr-2" />,
    //     drop:[
    //         {
    //         title:'Add New Staff',
    //         type:stat,
    //         route:ROUTES.Admin.HR.AddNewStaff
    //         },
    //         {
    //         title:'View Staff',
    //         type:stat,
    //         route:ROUTES.Admin.HR.ViewStaff
    //         },
    //         {
    //         title:'Staff Attendance',
    //         type:stat,
    //         route:ROUTES.Admin.HR.StaffAttendance
    //         },
    //         {
    //         title:'Add Designation',
    //         type:stat,
    //         route:ROUTES.Admin.HR.AddDesignation
    //         },
    //         {
    //         title:'Pay Roll',
    //         type:stat,
    //         route:ROUTES.Admin.HR.StaffAttendance
    //         },
    //         {
    //         title:'Leave Management',
    //         type:stat,
    //         route:ROUTES.Admin.HR.AddDesignation
    //         },
    //         {
    //         title:'Add Department',
    //         type:stat,
    //         route:ROUTES.Admin.HR.AddDepartment
    //         },
    //         {
    //         title:'Feedback',
    //         type:stat,
    //         route:ROUTES.Admin.HR.Feedback
    //         },
    //     ]
    // },
    {
        title: 'Attendance',
        type: drop,
        icon: <i className="ri-pen-nib-line mr-2" />,
        drop: [
            {
                title: 'Class Attendance',
                type: stat,
                route: ROUTES.Principal.Attendance
            },
            {
                title: 'Lab Attendance',
                type: stat,
                route: ROUTES.Principal.LabAttendance
            },
        ]
    },
    // {
    //     title:'Documents',
    //     type:drop,
    //     icon:<i className="ri-file-copy-2-line mr-2" />,
    //     drop:[
    //         {
    //             title:'Upload Content',
    //             type:stat,
    //             route:ROUTES.Admin.Document.UploadContent
    //         },
    //         {
    //             title:'Download Content',
    //             type:drop,
    //             drop:[
    //                 {
    //                     title:'Assignment',
    //                     type:stat,
    //                     route:ROUTES.Admin.Document.DownloadContent.Assignment
    //                 },
    //                 {
    //                     title:'Syllabus',
    //                     type:stat,
    //                     route:ROUTES.Admin.Document.DownloadContent.Syllabus
    //                 },
    //                 {
    //                     title:'Study Material',
    //                     type:stat,
    //                     route:ROUTES.Admin.Document.DownloadContent.Studymaterial
    //                 },
    //                 {
    //                     title:'Other download',
    //                     type:stat,
    //                     route:ROUTES.Admin.Document.DownloadContent.OtherDownload
    //                 },
    //             ]
    //         },
    //     ]
    // },
    // {
    //     title:'Communicate',
    //     type:drop,
    //     icon:<i className="ri-chat-1-line mr-2" />,
    //     drop:[
    //         {
    //             title:'Notice Board',
    //             type:stat,
    //             route:ROUTES.dashboard
    //         },
    //         {
    //             title:'Send Mail',
    //             type:stat,
    //             route:ROUTES.dashboard
    //         },
    //         {
    //             title:'Send Whatsapp',
    //             type:stat,
    //             route:ROUTES.dashboard
    //         },
    //     ]
    // },
    // {
    //     title:'Exam Management',
    //     type:sheet,
    //     icon:<i className="ri-file-list-3-line mr-2" />,
    //     drop:[
    //         {
    //             title:'Exams',
    //             elements:[
    //                 {
    //                     title:'Assessment Group',
    //                     route:ROUTES.dashboard
    //                 },
    //                 {
    //                     title:'Exam Schedules',
    //                     route:ROUTES.dashboard
    //                 },
    //                 {
    //                     title:'Exam Results',
    //                     route:ROUTES.dashboard
    //                 },
    //             ]
    //         },
    //         {
    //             title:'Re Exam',
    //             elements:[
    //                 {
    //                     title:'Re Examination',
    //                     route:ROUTES.dashboard
    //                 },
    //                 {
    //                     title:'Re Exam Enrollment',
    //                     route:ROUTES.dashboard
    //                 },
    //                 {
    //                     title:'Re Exam Results',
    //                     route:ROUTES.dashboard
    //                 },
    //             ]
    //         },
    //         {
    //             title:'Grading',
    //             elements:[
    //                 {
    //                     title:'Grading System',
    //                     route:ROUTES.dashboard
    //                 },
    //                 {
    //                     title:'Scholastic Grading',
    //                     route:ROUTES.dashboard
    //                 },
    //                 {
    //                     title:'College Grading',
    //                     route:ROUTES.dashboard
    //                 },
    //                 {
    //                     title:'Scholastic Sub Grading',
    //                     route:ROUTES.dashboard
    //                 },
    //                 {
    //                     title:'Grade Generator',
    //                     route:ROUTES.dashboard
    //                 },
    //                 {
    //                     title:'Grace Marks',
    //                     route:ROUTES.dashboard
    //                 },
    //                 {
    //                     title:'Consolidate Marks',
    //                     route:ROUTES.dashboard
    //                 },
    //             ]
    //         },
    //     ]
    // },
    // {
    //     title:'Transport',
    //     type:drop,
    //     icon:<i className="ri-bus-line mr-2" />,
    //     drop:[
    //         {
    //             title:'Routes',
    //             type:stat,
    //             route:ROUTES.Admin.Transport.Route
    //         },
    //         {
    //             title:'Vehicles',
    //             type:stat,
    //             route:ROUTES.Admin.Transport.Vehicles
    //         },
    //         {
    //             title:'Assign Vehicles',
    //             type:stat,
    //             route:ROUTES.Admin.Transport.AssignVehicles
    //         },
    //     ]
    // },
    {
        title: 'Library',
        type: stat,
        route: ROUTES.Library.Dashboard,
        icon: <i className="ri-book-2-line mr-2" />
    },
    // {
    //     title:'Hostel',
    //     type:drop,
    //     icon:<i className="ri-hotel-bed-line mr-2" />,
    //     drop:[
    //         {
    //             title:'Hostel Rooms',
    //             type:stat,
    //             route:ROUTES.Admin.Hostel.HostelRooms
    //         },
    //         {
    //             title:'Room Type',
    //             type:stat,
    //             route:ROUTES.Admin.Hostel.RoomType
    //         },
    //         {
    //             title:'Hostel',
    //             type:stat,
    //             route:ROUTES.Admin.Hostel.Hostel
    //         },
    //     ]
    // },
    // {
    //     title:'Inventory',
    //     type:drop,
    //     icon:<i className="ri-shopping-bag-line mr-2" />,
    //     drop:[
    //         {
    //             title:'Issue Items',
    //             type:stat,
    //             route:ROUTES.Admin.Inventory.IssueItems
    //         },
    //         {
    //             title:'Add Item Stock',
    //             type:stat,
    //             route:ROUTES.Admin.Inventory.AddItemstock
    //         },
    //         {
    //             title:'Add Item',
    //             type:stat,
    //             route:ROUTES.Admin.Inventory.AddItem
    //         },
    //         {
    //             title:'Item Category',
    //             type:stat,
    //             route:ROUTES.Admin.Inventory.ItemCategory
    //         },
    //         {
    //             title:'Item Store',
    //             type:stat,
    //             route:ROUTES.Admin.Inventory.ItemStore
    //         },
    //         {
    //             title:'Item Supplier',
    //             type:stat,
    //             route:ROUTES.Admin.Inventory.ItemSupplier
    //         },
    //     ]
    // },
    // {
    //     title:'Certificate',
    //     type:drop,
    //     icon:<i className="ri-profile-line mr-2" />,
    //     drop:[
    //         {
    //             title:'Design Hall-Tickets',
    //             type:stat,
    //             route:ROUTES.Admin.Certificates.DesignHallticket
    //         },
    //         {
    //             title:'Design Marks Card',
    //             type:stat,
    //             route:ROUTES.Admin.Certificates.DesignMarkscard
    //         },
    //     ]
    // },
    // {
    //     title:'e-Books',
    //     type:drop,
    //     icon:<i className="ri-book-3-line mr-2" />,
    //     drop:[
    //             {
    //                 title:'BAMS',
    //                 type:drop,
    //                 drop:[
    //                     {
    //                         title:'1st Year',
    //                         type:stat,
    //                         route:ROUTES.dashboard
    //                     },
    //                     {
    //                         title:'2nd Year',
    //                         type:stat,
    //                         route:ROUTES.dashboard
    //                     },
    //                     {
    //                         title:'3rd Year',
    //                         type:stat,
    //                         route:ROUTES.dashboard
    //                     },
    //                     {
    //                         title:'4th Year',
    //                         type:stat,
    //                         route:ROUTES.dashboard
    //                     },
    //                 ]
    //             },
    //             {
    //                 title:'Engineering',
    //                 type:drop,
    //                 drop:[
    //                     {
    //                         title:'1st Year',
    //                         type:stat,
    //                         route:ROUTES.dashboard
    //                     },
    //                     {
    //                         title:'2nd Year',
    //                         type:stat,
    //                         route:ROUTES.dashboard
    //                     },
    //                     {
    //                         title:'3rd Year',
    //                         type:stat,
    //                         route:ROUTES.dashboard
    //                     },
    //                     {
    //                         title:'4th Year',
    //                         type:stat,
    //                         route:ROUTES.dashboard
    //                     },
    //                 ]
    //             },
    //                 {
    //                 title:'LLB',
    //                 type:drop,
    //                 drop:[
    //                     {
    //                         title:'1st Year',
    //                         type:stat,
    //                         route:ROUTES.dashboard
    //                     },
    //                     {
    //                         title:'2nd Year',
    //                         type:stat,
    //                         route:ROUTES.dashboard
    //                     },
    //                     {
    //                         title:'3rd Year',
    //                         type:stat,
    //                         route:ROUTES.dashboard
    //                     },
    //                     {
    //                         title:'4th Year',
    //                         type:stat,
    //                         route:ROUTES.dashboard
    //                     },
    //                 ]
    //             },
    //     ]
    // },

    {
        title: 'Reports',
        type: stat,
        route: ROUTES.Principal.Reports.Home,
        icon: <i className="ri-folder-chart-line mr-2" />
    },
    {
        title: 'Staff Diary',
        type: drop,
        icon: <i className="ri-profile-line mr-2" />,
        drop: [
            {
                title: 'Create Staff Diary',
                type: stat,
                route: ROUTES.Principal.StaffDairy.StaffDairy
            },
            {
                title: 'View Staff Diary',
                type: stat,
                route: ROUTES.Principal.StaffDairy.ViewStaffDairy
            },
        ]
    },
]