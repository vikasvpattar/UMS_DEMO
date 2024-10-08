import { ROUTES } from "../../Router/routerConfig";

const drop = 'dropdown'
const stat = 'static'
const sheet = 'sheet'
export const navbarDataExam = [
    {
        title: 'Dashboard',
        type: stat,
        route: ROUTES.dashboard,
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
                route: ROUTES.Admin.frontOffice.AdmissionEnquiry
            },
            {
                title: 'Visitors Book',
                type: stat,
                route: ROUTES.Admin.frontOffice.VisitorsBook
            },
            {
                title: 'Phone Call Log',
                type: stat,
                route: ROUTES.Admin.frontOffice.PhoneCallLog
            },
            {
                title: 'Postal Dispatch',
                type: stat,
                route: ROUTES.Admin.frontOffice.PostalDispatch
            },
            {
                title: 'Postal Receive',
                type: stat,
                route: ROUTES.Admin.frontOffice.PostalRecieve
            },
            {
                title: 'Complaints',
                type: stat,
                route: ROUTES.Admin.frontOffice.Complain
            },
            {
                title: 'Setup Front Office',
                type: stat,
                route: ROUTES.Admin.frontOffice.SetupOffice
            },
        ]
    },
    {
        title: 'Students',
        type: drop,
        icon: <i className="ri-user-add-fill mr-2" />,
        drop: [
            {
                title: 'Student Admission',
                type: stat,
                route: ROUTES.Admin.Student.StudentAdmission
            },
            {
                title: 'Student Details',
                type: stat,
                route: ROUTES.Admin.Student.StudentDetails
            },
            {
                title: 'Disable Students',
                type: stat,
                route: ROUTES.Admin.Student.DisableStudents
            },
        ]
    },
    {
        title: 'HR',
        type: drop,
        icon: <i className="ri-layout-3-line mr-2" />,
        drop: [
            {
                title: 'Add New Staff',
                type: stat,
                route: ROUTES.Admin.HR.AddNewStaff
            },
            {
                title: 'View Staff',
                type: stat,
                route: ROUTES.Admin.HR.ViewStaff
            },
            {
                title: 'Staff Attendance',
                type: stat,
                route: ROUTES.Admin.HR.StaffAttendance
            },
            {
                title: 'Add Designation',
                type: stat,
                route: ROUTES.Admin.HR.AddDesignation
            },
            {
                title: 'Pay Roll',
                type: stat,
                route: ROUTES.Admin.HR.StaffAttendance
            },
            {
                title: 'Leave Management',
                type: stat,
                route: ROUTES.Admin.HR.AddDesignation
            },
            {
                title: 'Add Department',
                type: stat,
                route: ROUTES.Admin.HR.AddDepartment
            },
            {
                title: 'Feedback',
                type: stat,
                route: ROUTES.Admin.HR.Feedback
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
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Add Income',
                        type: stat,
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Add Income Source',
                        type: stat,
                        route: ROUTES.dashboard
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
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Add Expense',
                        type: stat,
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Add Expense Source',
                        type: stat,
                        route: ROUTES.dashboard
                    },
                ]
            },
            {
                title: 'Fee Collection',
                type: drop,
                drop: [
                    {
                        title: 'Collect Fee',
                        type: stat,
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Search Fee Payment',
                        type: stat,
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Search Due Fees',
                        type: stat,
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Fee Master',
                        type: stat,
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Fee Group',
                        type: stat,
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Fee Type',
                        type: stat,
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Fee Discount',
                        type: stat,
                        route: ROUTES.dashboard
                    },
                ]
            },
        ]
    },
    {
        title: 'Academics',
        type: sheet,
        icon: <i className="ri-pencil-ruler-2-line mr-2" />,
        drop: [
            {
                title: 'Cirriculum',
                elements: [
                    {
                        title: 'Class Time Table',
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Teacher Time Table',
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Promote Student',
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Add Batch',
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Add Subject',
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Add Class',
                        route: ROUTES.dashboard
                    },
                ]
            },
            {
                title: 'Lesson Plan',
                elements: [
                    {
                        title: 'Manage Lesson Plan',
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Syllabus Status',
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Add Topic',
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Add Lesson',
                        route: ROUTES.dashboard
                    },
                ]
            }
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
                route: ROUTES.dashboard
            },
            {
                title: 'Lab Attendance',
                type: stat,
                route: ROUTES.dashboard
            },
        ]
    },
    {
        title: 'Documents',
        type: drop,
        icon: <i className="ri-file-copy-2-line mr-2" />,
        drop: [
            {
                title: 'Upload Content',
                type: stat,
                route: ROUTES.dashboard
            },
            {
                title: 'Download Content',
                type: drop,
                drop: [
                    {
                        title: 'Assignment',
                        type: stat,
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Syllabus',
                        type: stat,
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Study Material',
                        type: stat,
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Other download',
                        type: stat,
                        route: ROUTES.dashboard
                    },
                ]
            },
        ]
    },
    {
        title: 'Communicate',
        type: drop,
        icon: <i className="ri-chat-1-line mr-2" />,
        drop: [
            {
                title: 'Notice Board',
                type: stat,
                route: ROUTES.dashboard
            },
            {
                title: 'Send Mail',
                type: stat,
                route: ROUTES.dashboard
            },
            {
                title: 'Send Whatsapp',
                type: stat,
                route: ROUTES.dashboard
            },
        ]
    },
    {
        title: 'Exam Management',
        type: sheet,
        icon: <i className="ri-file-list-3-line mr-2" />,
        drop: [
            {
                title: 'Exams',
                elements: [
                    {
                        title: 'Assessment Group',
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Exam Schedules',
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Exam Results',
                        route: ROUTES.dashboard
                    },
                ]
            },
            {
                title: 'Re Exam',
                elements: [
                    {
                        title: 'Re Examination',
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Re Exam Enrollment',
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Re Exam Results',
                        route: ROUTES.dashboard
                    },
                ]
            },
            {
                title: 'Grading',
                elements: [
                    {
                        title: 'Grading System',
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Scholastic Grading',
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'College Grading',
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Scholastic Sub Grading',
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Grade Generator',
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Grace Marks',
                        route: ROUTES.dashboard
                    },
                    {
                        title: 'Consolidate Marks',
                        route: ROUTES.dashboard
                    },
                ]
            },
        ]
    },
    {
        title: 'Transport',
        type: drop,
        icon: <i className="ri-bus-line mr-2" />,
        drop: [
            {
                title: 'Routes',
                type: stat,
                route: ROUTES.dashboard
            },
            {
                title: 'Vehicles',
                type: stat,
                route: ROUTES.dashboard
            },
            {
                title: 'Assign Vehicles',
                type: stat,
                route: ROUTES.dashboard
            },
        ]
    },
    {
        title: 'Library',
        type: stat,
        route: ROUTES.dashboard,
        icon: <i className="ri-book-2-line mr-2" />
    },
    {
        title: 'Hostel',
        type: drop,
        icon: <i className="ri-hotel-bed-line mr-2" />,
        drop: [
            {
                title: 'Hostel Rooms',
                type: stat,
                route: ROUTES.dashboard
            },
            {
                title: 'Room Type',
                type: stat,
                route: ROUTES.dashboard
            },
            {
                title: 'Hostel',
                type: stat,
                route: ROUTES.dashboard
            },
        ]
    },
    {
        title: 'Inventory',
        type: drop,
        icon: <i className="ri-shopping-bag-line mr-2" />,
        drop: [
            {
                title: 'Issue Items',
                type: stat,
                route: ROUTES.dashboard
            },
            {
                title: 'Add Item Stock',
                type: stat,
                route: ROUTES.dashboard
            },
            {
                title: 'Add Item',
                type: stat,
                route: ROUTES.dashboard
            },
            {
                title: 'Item Category',
                type: stat,
                route: ROUTES.dashboard
            },
            {
                title: 'Item Store',
                type: stat,
                route: ROUTES.dashboard
            },
            {
                title: 'Item Supplier',
                type: stat,
                route: ROUTES.dashboard
            },
        ]
    },
    {
        title: 'Certificate',
        type: drop,
        icon: <i className="ri-profile-line mr-2" />,
        drop: [
            {
                title: 'Design Hall-Tickets',
                type: stat,
                route: ROUTES.dashboard
            },
            {
                title: 'Design Marks Card',
                type: stat,
                route: ROUTES.dashboard
            },
        ]
    },
    {
        title: 'LMS',
        type: drop,
        icon: <i className="ri-macbook-line mr-2" />,
        drop: [
            {
                title: 'Create Course',
                type: stat,
                route: ROUTES.dashboard
            },
            {
                title: 'Courses',
                type: stat,
                route: ROUTES.dashboard
            },
        ]
    },
    {
        title: 'e-Books',
        type: drop,
        icon: <i className="ri-book-3-line mr-2" />,
        drop: [
            {
                title: 'BAMS',
                type: drop,
                drop: [
                    {
                        title: '1st Year',
                        type: stat,
                        route: ROUTES.dashboard
                    },
                    {
                        title: '2nd Year',
                        type: stat,
                        route: ROUTES.dashboard
                    },
                    {
                        title: '3rd Year',
                        type: stat,
                        route: ROUTES.dashboard
                    },
                    {
                        title: '4th Year',
                        type: stat,
                        route: ROUTES.dashboard
                    },
                ]
            },
            {
                title: 'Engineering',
                type: drop,
                drop: [
                    {
                        title: '1st Year',
                        type: stat,
                        route: ROUTES.dashboard
                    },
                    {
                        title: '2nd Year',
                        type: stat,
                        route: ROUTES.dashboard
                    },
                    {
                        title: '3rd Year',
                        type: stat,
                        route: ROUTES.dashboard
                    },
                    {
                        title: '4th Year',
                        type: stat,
                        route: ROUTES.dashboard
                    },
                ]
            },
            {
                title: 'LLB',
                type: drop,
                drop: [
                    {
                        title: '1st Year',
                        type: stat,
                        route: ROUTES.dashboard
                    },
                    {
                        title: '2nd Year',
                        type: stat,
                        route: ROUTES.dashboard
                    },
                    {
                        title: '3rd Year',
                        type: stat,
                        route: ROUTES.dashboard
                    },
                    {
                        title: '4th Year',
                        type: stat,
                        route: ROUTES.dashboard
                    },
                ]
            },
        ]
    },
    {
        title: 'Reports',
        type: stat,
        route: ROUTES.dashboard,
        icon: <i className="ri-folder-chart-line mr-2" />
    },
]