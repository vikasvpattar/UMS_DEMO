import { ROUTES } from "../../../Router/routerConfig";


const drop = 'dropdown'
const stat = 'static'
const sheet = 'sheet'
export const navbarDataEmployee = [
    {
        title: 'Home',
        type: stat,
        route: ROUTES.Employee.Home,
        icon: <i className="ri-folder-chart-line mr-2" />
    },
    {
        title: 'HR',
        type: drop,
        icon: <i className="ri-user-fill mr-2"></i>,
        drop: [
            {
                title: 'Leave',
                type: drop,
                drop: [
                    {
                        title: 'Entitlement',
                        type: stat,
                        route: ROUTES.Employee.Leave.Entitlement
                    },
                    {
                        title: 'Application',
                        type: stat,
                        route: ROUTES.Employee.Leave.Application
                    },
                    {
                        title: 'Schedule',
                        type: stat,
                        route: ROUTES.Employee.Leave.Schedule
                    },
                ]
            },
            {
                title: 'PayRoll',
                type: drop,
                drop: [
                    {
                        title: 'Salary',
                        type: stat,
                        route: ROUTES.Employee.PayRoll.Salary
                    },
                    {
                        title: 'Annual Statement',
                        type: stat,
                        route: ROUTES.Employee.PayRoll.AnnualStatement
                    },
                ]
            },
            {
                title: 'Document',
                type: stat,
                route: ROUTES.Employee.Document
            },
            {
                title: 'Team',
                type: drop,
                drop: [
                    {
                        title: 'Discussion',
                        type: stat,
                        route: ROUTES.Employee.Team.Discussion
                    },
                    {
                        title: 'Document & Form Sharing',
                        type: stat,
                        route: ROUTES.Employee.Team.Documents
                    },
                    {
                        title: 'Announcement',
                        type: stat,
                        route: ROUTES.Employee.Team.Announcement
                    },
                ]
            },

        ]
    },
    // {
    //     title:'Profile',
    //     type:stat,
    //     icon:<i className="ri-user-fill mr-2"></i>,
    //     route:ROUTES.Employee.Profile
    // },
    // {
    //     title:'Leave',
    //     type:drop,
    //     icon:<i className="ri-flight-takeoff-line mr-2" />,
    //     drop:[
    //         {
    //         title:'Entitlements',
    //         type:stat,
    //         route:ROUTES.Employee.Leave.Entitlement
    //         },
    //         {
    //         title:'Application',
    //         type:stat,
    //         route:ROUTES.Employee.Leave.Application
    //         },
    //         // {
    //         // title:'Planner',
    //         // type:stat,
    //         // route:ROUTES.HR.Leave.Planner
    //         // },
    //         {
    //         title:'Schedule',
    //         type:stat,
    //         route:ROUTES.Employee.Leave.Schedule
    //         },
    //         // {
    //         // title:'Review',
    //         // type:stat,
    //         // route:ROUTES.HR.Leave.Review
    //         // },
    //         // {
    //         // title:'Transaction Report',
    //         // type:stat,
    //         // route:ROUTES.HR.Leave.TransactionReport
    //         // },
    //         // {
    //         // title:'Entitlement Report',
    //         // type:stat,
    //         // route:ROUTES.HR.Leave.EntitlementReport
    //         // },
    //         // {
    //         // title:'Leave Type',
    //         // type:stat,
    //         // route:ROUTES.HR.Leave.LeaveType
    //         // },
    //         // {
    //         // title:'Earning Policy',
    //         // type:stat,
    //         // route:ROUTES.HR.Leave.EarningPolicy
    //         // },
    //         // {
    //         // title:'Appoval Workflow',
    //         // type:stat,
    //         // route:ROUTES.HR.Leave.ApprovalWorkflow
    //         // },
    //         // {
    //         // title:'Custom Approver',
    //         // type:stat,
    //         // route:ROUTES.HR.Leave.CustomApprover
    //         // },
    //         // {
    //         // title:'Workday',
    //         // type:stat,
    //         // route:ROUTES.HR.Leave.Workday
    //         // },
    //         // {
    //         // title:'Holiday',
    //         // type:stat,
    //         // route:ROUTES.HR.Leave.Holiday
    //         // },
    //         // {
    //         // title:'Setting',
    //         // type:stat,
    //         // route:ROUTES.HR.Leave.Setting
    //         // },
    //     ]
    // },
    // {
    //     title:'Attendance',
    //     type:stat,
    //     icon:<i className="ri-edit-line mr-2" />,
    //     route:ROUTES.Employee.Attendance
    // },
    // {
    //     title:'PayRoll',
    //     type:drop,
    //     icon:<i className="ri-wallet-line mr-2" />,
    //     drop:[
    //         {
    //         title:'Salary',
    //         type:stat,
    //         route:ROUTES.Employee.PayRoll.Salary
    //         },
    //         {
    //         title:'Annual Statement',
    //         type:stat,
    //         route:ROUTES.Employee.PayRoll.AnnualStatement
    //         },
    //         // {
    //         // title:'paySlip',
    //         // type:stat,
    //         // route:ROUTES.Employee.PayRoll.Payslip
    //         // },
    //         // {
    //         // title:'Earning',
    //         // type:stat,
    //         // route:ROUTES.HR.PayRoll.Earning
    //         // },
    //         // {
    //         // title:'Deduction',
    //         // type:stat,
    //         // route:ROUTES.HR.PayRoll.Deduction
    //         // },
    //         // {
    //         // title:'Bonus',
    //         // type:stat,
    //         // route:ROUTES.HR.PayRoll.Bonus
    //         // },
    //         // {
    //         // title:'Statutory Contribution',
    //         // type:stat,
    //         // route:ROUTES.HR.PayRoll.StationaryContribution
    //         // },
    //     ]
    // },
    // {
    //     title:'Document Management',
    //     type:stat,
    //     icon:<i className="ri-file-line mr-2" />,
    //     route:ROUTES.Employee.Document
    // },
    // {
    //     title:'Team',
    //     type:drop,
    //     icon:<i className="ri-team-fill mr-2" />,
    //     drop:[
    //         {
    //         title:'Discussion',
    //         type:stat,
    //         route:ROUTES.Employee.Team.Discussion
    //         },
    //         {
    //         title:'Document & Form Sharing',
    //         type:stat,
    //         route:ROUTES.Employee.Team.Documents
    //         },
    //         {
    //         title:'Announcement',
    //         type:stat,
    //         route:ROUTES.Employee.Team.Announcement
    //         },
    //     ]
    // },
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
                        route: ROUTES.Employee.Academics.ClassTimeTable
                    },
                    {
                        title: 'Teacher Time Table',
                        route: ROUTES.Employee.Academics.TeacherTimeTable
                    },
                    // {
                    //     title: 'Promote Student',
                    //     route: ROUTES.Principal.Academics.PromoteStudents
                    // },
                    // {
                    //     title: 'Add Batch',
                    //     route: ROUTES.Registar.Academics.AddBatch
                    // },
                    // {
                    //     title: 'Add Class',
                    //     route: ROUTES.Principal.Academics.AddClass
                    // },
                    // {
                    //     title: 'Add Semester',
                    //     route: ROUTES.Principal.Academics.AddSemester
                    // },
                    // {
                    //     title: 'Add Section',
                    //     route: ROUTES.Principal.Academics.AddSection
                    // },
                    // {
                    //     title: 'Add Subject',
                    //     route: ROUTES.Principal.Academics.AddSubject
                    // },

                ]
            },
            {
                title: 'Lesson Plan',
                elements: [
                    {
                        title: 'Manage Lesson Plan',
                        route: ROUTES.Employee.Academics.ManageLessonPlan
                    },
                    {
                        title: 'Syllabus Status',
                        route: ROUTES.Employee.Academics.SyllabusStatus
                    },
                    {
                        title: 'Add Lesson',
                        route: ROUTES.Employee.Academics.AddLesson
                    },
                    {
                        title: 'Add Topic',
                        route: ROUTES.Employee.Academics.AddTopic
                    },
                    {
                        title: 'Add Question Bank',
                        route: ROUTES.Employee.Academics.AddQuestionBank
                    },

                ]
            }
        ]
    },
    {
        title: 'Students',
        type: drop,
        icon: <i className="ri-user-add-fill mr-2" />,
        drop: [
            // {
            //     title: 'Student Admission',
            //     type: stat,
            //     route: ROUTES.Principal.Student.StudentAdmission
            // },
            {
                title: 'Student Details',
                type: stat,
                route: ROUTES.Employee.Student.AdmissionDetails
            },
            // {
            //     title: 'Disable Students',
            //     type: stat,
            //     route: ROUTES.Principal.Student.DisableStudents
            // },
        ]
    },
    {
        title: 'Attendance',
        type: drop,
        icon: <i className="ri-pen-nib-line mr-2" />,
        drop: [
            {
                title: 'Class Attendance',
                type: stat,
                route: ROUTES.Employee.StudentAttendance.ClassAttendance
            },
            {
                title: 'Lab Attendance',
                type: stat,
                route: ROUTES.Employee.StudentAttendance.LabAttendance
            },
        ]
    },
    {
        title: 'Staff Diary',
        type: drop,
        icon: <i className="ri-user-add-fill mr-2" />,
        drop: [

            {
                title: 'Add Diary',
                type: stat,
                route: ROUTES.Employee.StaffDairy.StaffDairy
            },
            {
                title: 'View Diary',
                type: stat,
                route: ROUTES.Employee.StaffDairy.ViewStaffDairy
            },

        ]
    },
    {
        title: 'Reports',
        type: stat,
        route: ROUTES.Employee.Reports.Home,
        icon: <i className="ri-folder-chart-line mr-2" />
    }
]
export const navbarDataEmployeeReview = [
    {
        title: 'Home',
        type: stat,
        route: ROUTES.Employee.Home,
        icon: <i className="ri-folder-chart-line mr-2" />
    },

    {
        title: 'HR',
        type: drop,
        icon: <i className="ri-user-fill mr-2"></i>,
        drop: [

            {
                title: 'Staff Attendance',
                type: stat,
                route: ROUTES.Employee.Attendance
            },

            {
                title: 'Document',
                type: stat,
                route: ROUTES.Employee.Document
            },
            {
                title: 'Team',
                type: drop,
                drop: [
                    {
                        title: 'Discussion',
                        type: stat,
                        route: ROUTES.Employee.Team.Discussion
                    },
                    {
                        title: 'Document & Form Sharing',
                        type: stat,
                        route: ROUTES.Employee.Team.Documents
                    },
                    {
                        title: 'Announcement',
                        type: stat,
                        route: ROUTES.Employee.Team.Announcement
                    },
                ]
            },

        ]
    },
    {
        title: 'Leave',
        type: drop,
        drop: [
            {
                title: 'Entitlement',
                type: stat,
                route: ROUTES.Employee.Leave.Entitlement
            },
            {
                title: 'Application',
                type: stat,
                route: ROUTES.Employee.Leave.Application
            },
            {
                title: 'Schedule',
                type: stat,
                route: ROUTES.Employee.Leave.Schedule
            },
        ]
    },
    {
        title: 'PayRoll',
        type: drop,
        drop: [
            {
                title: 'Salary',
                type: stat,
                route: ROUTES.Employee.PayRoll.Salary
            },
            {
                title: 'Annual Statement',
                type: stat,
                route: ROUTES.Employee.PayRoll.AnnualStatement
            },
        ]
    },
    // {
    //     title:'Profile',
    //     type:stat,
    //     icon:<i className="ri-user-fill mr-2"></i>,
    //     route:ROUTES.Employee.Profile
    // },
    // {
    //     title:'Leave',
    //     type:drop,
    //     icon:<i className="ri-flight-takeoff-line mr-2" />,
    //     drop:[
    //         {
    //         title:'Entitlements',
    //         type:stat,
    //         route:ROUTES.Employee.Leave.Entitlement
    //         },
    //         {
    //         title:'Application',
    //         type:stat,
    //         route:ROUTES.Employee.Leave.Application
    //         },
    //         // {
    //         // title:'Planner',
    //         // type:stat,
    //         // route:ROUTES.HR.Leave.Planner
    //         // },
    //         {
    //         title:'Schedule',
    //         type:stat,
    //         route:ROUTES.Employee.Leave.Schedule
    //         },
    //         // {
    //         // title:'Review',
    //         // type:stat,
    //         // route:ROUTES.HR.Leave.Review
    //         // },
    //         // {
    //         // title:'Transaction Report',
    //         // type:stat,
    //         // route:ROUTES.HR.Leave.TransactionReport
    //         // },
    //         // {
    //         // title:'Entitlement Report',
    //         // type:stat,
    //         // route:ROUTES.HR.Leave.EntitlementReport
    //         // },
    //         // {
    //         // title:'Leave Type',
    //         // type:stat,
    //         // route:ROUTES.HR.Leave.LeaveType
    //         // },
    //         // {
    //         // title:'Earning Policy',
    //         // type:stat,
    //         // route:ROUTES.HR.Leave.EarningPolicy
    //         // },
    //         // {
    //         // title:'Appoval Workflow',
    //         // type:stat,
    //         // route:ROUTES.HR.Leave.ApprovalWorkflow
    //         // },
    //         // {
    //         // title:'Custom Approver',
    //         // type:stat,
    //         // route:ROUTES.HR.Leave.CustomApprover
    //         // },
    //         // {
    //         // title:'Workday',
    //         // type:stat,
    //         // route:ROUTES.HR.Leave.Workday
    //         // },
    //         // {
    //         // title:'Holiday',
    //         // type:stat,
    //         // route:ROUTES.HR.Leave.Holiday
    //         // },
    //         // {
    //         // title:'Setting',
    //         // type:stat,
    //         // route:ROUTES.HR.Leave.Setting
    //         // },
    //     ]
    // },
    // {
    //     title:'Attendance',
    //     type:stat,
    //     icon:<i className="ri-edit-line mr-2" />,
    //     route:ROUTES.Employee.Attendance
    // },
    // {
    //     title:'PayRoll',
    //     type:drop,
    //     icon:<i className="ri-wallet-line mr-2" />,
    //     drop:[
    //         {
    //         title:'Salary',
    //         type:stat,
    //         route:ROUTES.Employee.PayRoll.Salary
    //         },
    //         {
    //         title:'Annual Statement',
    //         type:stat,
    //         route:ROUTES.Employee.PayRoll.AnnualStatement
    //         },
    //         // {
    //         // title:'paySlip',
    //         // type:stat,
    //         // route:ROUTES.Employee.PayRoll.Payslip
    //         // },
    //         // {
    //         // title:'Earning',
    //         // type:stat,
    //         // route:ROUTES.HR.PayRoll.Earning
    //         // },
    //         // {
    //         // title:'Deduction',
    //         // type:stat,
    //         // route:ROUTES.HR.PayRoll.Deduction
    //         // },
    //         // {
    //         // title:'Bonus',
    //         // type:stat,
    //         // route:ROUTES.HR.PayRoll.Bonus
    //         // },
    //         // {
    //         // title:'Statutory Contribution',
    //         // type:stat,
    //         // route:ROUTES.HR.PayRoll.StationaryContribution
    //         // },
    //     ]
    // },
    // {
    //     title:'Document Management',
    //     type:stat,
    //     icon:<i className="ri-file-line mr-2" />,
    //     route:ROUTES.Employee.Document
    // },
    // {
    //     title:'Team',
    //     type:drop,
    //     icon:<i className="ri-team-fill mr-2" />,
    //     drop:[
    //         {
    //         title:'Discussion',
    //         type:stat,
    //         route:ROUTES.Employee.Team.Discussion
    //         },
    //         {
    //         title:'Document & Form Sharing',
    //         type:stat,
    //         route:ROUTES.Employee.Team.Documents
    //         },
    //         {
    //         title:'Announcement',
    //         type:stat,
    //         route:ROUTES.Employee.Team.Announcement
    //         },
    //     ]
    // },
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
                        route: ROUTES.Employee.Academics.ClassTimeTable
                    },
                    {
                        title: 'Teacher Time Table',
                        route: ROUTES.Employee.Academics.TeacherTimeTable
                    },
                    // {
                    //     title: 'Promote Student',
                    //     route: ROUTES.Principal.Academics.PromoteStudents
                    // },
                    // {
                    //     title: 'Add Batch',
                    //     route: ROUTES.Registar.Academics.AddBatch
                    // },
                    // {
                    //     title: 'Add Class',
                    //     route: ROUTES.Principal.Academics.AddClass
                    // },
                    // {
                    //     title: 'Add Semester',
                    //     route: ROUTES.Principal.Academics.AddSemester
                    // },
                    // {
                    //     title: 'Add Section',
                    //     route: ROUTES.Principal.Academics.AddSection
                    // },
                    // {
                    //     title: 'Add Subject',
                    //     route: ROUTES.Principal.Academics.AddSubject
                    // },

                ]
            },
            {
                title: 'Lesson Plan',
                elements: [
                    {
                        title: 'Manage Lesson Plan',
                        route: ROUTES.Employee.Academics.ManageLessonPlan
                    },
                    {
                        title: 'Syllabus Status',
                        route: ROUTES.Employee.Academics.SyllabusStatus
                    },
                    {
                        title: 'Add Lesson',
                        route: ROUTES.Employee.Academics.AddLesson
                    },
                    {
                        title: 'Add Topic',
                        route: ROUTES.Employee.Academics.AddTopic
                    },
                    {
                        title: 'Add Question Bank',
                        route: ROUTES.Employee.Academics.AddQuestionBank
                    },

                ]
            }
        ]
    },

    {
        title: 'Students',
        type: drop,
        icon: <i className="ri-user-add-fill mr-2" />,
        drop: [
            // {
            //     title: 'Student Admission',
            //     type: stat,
            //     route: ROUTES.Principal.Student.StudentAdmission
            // },
            {
                title: 'Student Details',
                type: stat,
                route: ROUTES.Employee.Student.AdmissionDetails
            },
            // {
            //     title: 'Disable Students',
            //     type: stat,
            //     route: ROUTES.Principal.Student.DisableStudents
            // },
        ]
    },
    {
        title: 'Attendance',
        type: drop,
        icon: <i className="ri-pen-nib-line mr-2" />,
        drop: [
            {
                title: 'Class Attendance',
                type: stat,
                route: ROUTES.Employee.StudentAttendance.ClassAttendance
            },
            {
                title: 'Lab Attendance',
                type: stat,
                route: ROUTES.Employee.StudentAttendance.LabAttendance
            },
        ]
    },


    // {
    //     title: 'Staff Dairy',
    //     type: drop,
    //     icon: <i className="ri-user-add-fill mr-2" />,
    //     drop: [

    //         {
    //             title: 'Add Dairy',
    //             type: stat,
    //             route: ROUTES.Employee.StaffDairy.StaffDairy
    //         },
    //         {
    //             title: 'View Dairy',
    //             type: stat,
    //             route: ROUTES.Employee.StaffDairy.ViewStaffDairy
    //         },

    //     ]
    // },
    {
        title: 'Staff Diary',
        type: drop,
        icon: <i className="ri-user-add-fill mr-2" />,
        drop: [

            {
                title: 'Add Diary',
                type: stat,
                route: ROUTES.Employee.StaffDairy.StaffDairy
            },
            {
                title: 'View Diary',
                type: stat,
                route: ROUTES.Employee.StaffDairy.ViewStaffDairy
            },

        ]
    },
    {
        title: 'Review',
        type: stat,
        route: ROUTES.Employee.Review
    },
    {
        title: 'Reports',
        type: stat,
        route: ROUTES.Employee.Reports.Home,
        icon: <i className="ri-folder-chart-line mr-2" />
    }
]