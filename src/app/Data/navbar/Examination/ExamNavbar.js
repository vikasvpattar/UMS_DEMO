import { ROUTES } from './../../../Router/routerConfig';


const drop = 'dropdown'
const stat = 'static'
const sheet = 'sheet'
export const ExamNavbar=[
    {
        title:'Dashboard',
        type:stat,
        route:ROUTES.Admin.dashboard,
        icon:<i className="ri-folder-chart-line mr-2" />
    },
    {
        title:'QPDS',
        type:sheet,
        icon:<i className="ri-file-list-3-line mr-2" />,
        drop:[
            {
                title:'Univesity',
                elements:[
                   
                    {
                        title:'Create Question Paper',
                        route:ROUTES.Examination.CreateQuestionPaper
                    },
                    {
                        title:'OTP Verification',
                        route:ROUTES.Examination.OtpVerification
                    },
                    {
                        title:'Download Question Paper',
                        route:ROUTES.Examination.DownloadQuestionPaper
                    },
                ]
            },
            {
                title:'Faculty',
                elements:[
                    {
                        title:'Set Paper',
                        route:ROUTES.dashboard
                    },
                    {
                        title:'Upload PDF',
                        route:ROUTES.dashboard
                    },
                ]
            },
            {
                title:'Center',
                elements:[
                    {
                        title:'Appointed Members',
                        route:ROUTES.dashboard
                    },
                    {
                        title:'Scholastic Grading',
                        route:ROUTES.dashboard
                    },
                    {
                        title:'College Grading',
                        route:ROUTES.dashboard
                    },
                    {
                        title:'Scholastic Sub Grading',
                        route:ROUTES.dashboard
                    },
                    {
                        title:'Grade Generator',
                        route:ROUTES.dashboard
                    },
                    {
                        title:'Grace Marks',
                        route:ROUTES.dashboard
                    },
                    {
                        title:'Consolidate Marks',
                        route:ROUTES.dashboard
                    },
                ]
            },
        ]
    },
    {
        title:'Digital Evaluation',
        type:sheet,
        icon:<i className="ri-file-list-3-line mr-2" />,
        drop:[
            {
                title:'Center',
                elements:[
                    {
                        title:'Creater Zone',
                        route:ROUTES.dashboard
                    },
                    {
                        title:'Supplimentary Recieve',
                        route:ROUTES.dashboard
                    },
                    {
                        title:'Upload on Web',
                        route:ROUTES.dashboard
                    },
                    {
                        title:'Appoint Faculty',
                        route:ROUTES.dashboard
                    },
                    {
                        title:'Appoint Faculty',
                        route:ROUTES.dashboard
                    },
                ]
            },
            {
                title:'Faculty Login',
                elements:[
                    {
                        title:'Recieve Papers',
                        route:ROUTES.dashboard
                    },
                    {
                        title:'Download',
                        route:ROUTES.dashboard
                    },
                    {
                        title:'Assign Marks',
                        route:ROUTES.dashboard
                    },
                    {
                        title:'Recieved Marks & Papers',
                        route:ROUTES.dashboard
                    },
                ]
            },
        ]
    },
    {
        title:'Pre Examination',
        type:sheet,
        icon:<i className="ri-file-list-3-line mr-2" />,
        drop:[
            {
                title:'Section 1',
                elements:[
                    {
                        title:'Create Exam Committee',
                        route:ROUTES.Examination.Commitee
                    },
                   
                   
                   
                    {
                        title:'Assign Staff',
                        route:ROUTES.Examination.AssignStaff
                    },
                    {
                        title:'Create Time-Table',
                        route:ROUTES.Examination.CreateExamTimetable
                    },
                  
                    {
                        title:'Exam Schedules',
                        route:ROUTES.Examination.ExamSchedules
                    },
                    {
                        title:'Add Invigilators',
                        route:ROUTES.Examination.AddInvigilators
                    },
                    {
                        title:'Add Evaluators',
                        route:ROUTES.Examination.AddEvaluators
                    },
                ]
            },
            {
                title:'Section 2',
                elements:[
                    {
                        title:'Enrollment',
                        route:ROUTES.Examination.ExamEnrollment
                    },
                   
                    {
                        title:'Download Hall Tickets',
                        route:ROUTES.Examination.DownloadHallTickets
                    },
                   
                    {
                        title:'Seating Arrangments',
                        route:ROUTES.Examination.ExamSeatingArrangements
                    },
                    
                ]
            },
            // {
            //     title:'Section 3',
            //     elements:[
            //         {
            //             title:'Enrollments',
            //             route:ROUTES.dashboard
            //         },
            //         {
            //             title:'Generate Regular Hall Ticket',
            //             route:ROUTES.dashboard
            //         },
            //         {
            //             title:'Generate Repeater Hall Ticket',
            //             route:ROUTES.dashboard
            //         },
            //         {
            //             title:'Generate Bar Code No',
            //             route:ROUTES.dashboard
            //         },
            //         {
            //             title:'Print Barcode No',
            //             route:ROUTES.dashboard
            //         },
            //         {
            //             title:'Download Pre Exam Report',
            //             route:ROUTES.dashboard
            //         },
            //     ]
            // },
        ]
    },
    {
        title:'During Examination',
        type:drop,
        icon:<i className="ri-store-2-line mr-2" />,
        drop:[
            {
                title:'Attendance',
                type:stat,
                route:ROUTES.Examination.AttendanceList
                },
            {
            title:'Add Withheld',
            type:stat,
            route:ROUTES.Admin.frontOffice.AdmissionEnquiry
            },
            {
            title:'Mark Absents',
            type:stat,
            route:ROUTES.Admin.frontOffice.VisitorsBook
            },
            {
            title:'Manage Withheld',
            type:stat,
            route:ROUTES.Admin.frontOffice.PhoneCallLog
            },
            
        ]
    },
    {
        title:'Post Examination',
        type:drop,
        icon:<i className="ri-store-2-line mr-2" />,
        drop:[
            {
            title:'ID No',
            type:stat,
            route:ROUTES.Admin.frontOffice.AdmissionEnquiry
            },
            {
            title:'Set Marks Lock',
            type:stat,
            route:ROUTES.Admin.frontOffice.VisitorsBook
            },
            {
            title:'Set Marks',
            type:stat,
            route:ROUTES.Admin.frontOffice.PhoneCallLog
            },
            {
            title:'Check List Report',
            type:stat,
            route:ROUTES.Admin.frontOffice.PostalDispatch
            },
            {
            title:'Condo Nation Marks',
            type:stat,
            route:ROUTES.Admin.frontOffice.PostalDispatch
            },
            {
            title:'Grace Marks',
            type:stat,
            route:ROUTES.Admin.frontOffice.PostalRecieve
            },
            {
            title:'Passing marks',
            type:stat,
            route:ROUTES.Admin.frontOffice.Complain
            },
        ]
    },
    {
        title:'Re-Assessment',
        type:drop,
        icon:<i className="ri-store-2-line mr-2" />,
        drop:[
            {
            title:'Fees',
            type:stat,
            route:ROUTES.Admin.frontOffice.AdmissionEnquiry
            },
            {
            title:'Appication',
            type:stat,
            route:ROUTES.Admin.frontOffice.VisitorsBook
            },
            {
            title:'Assign Faculty',
            type:stat,
            route:ROUTES.Admin.frontOffice.PhoneCallLog
            },
            {
            title:'Marks Entry',
            type:stat,
            route:ROUTES.Admin.frontOffice.PostalDispatch
            },
            {
            title:'Second Assessment',
            type:stat,
            route:ROUTES.Admin.frontOffice.PostalRecieve
            },
            {
            title:'Apply Nearest Marks',
            type:stat,
            route:ROUTES.Admin.frontOffice.Complain
            },
            {
            title:'Process',
            type:stat,
            route:ROUTES.Admin.frontOffice.SetupOffice
            },
            {
            title:'Report',
            type:stat,
            route:ROUTES.Admin.frontOffice.SetupOffice
            },
        ]
    },
    {
        title:'Results',
        type:drop,
        icon:<i className="ri-store-2-line mr-2" />,
        drop:[
            {
            title:'provisional Marks Sheet',
            type:stat,
            route:ROUTES.Admin.frontOffice.AdmissionEnquiry
            },
            {
            title:'Final Marks Sheet',
            type:stat,
            route:ROUTES.Admin.frontOffice.VisitorsBook
            },
            {
            title:'Web Marks Sheet',
            type:stat,
            route:ROUTES.Admin.frontOffice.PhoneCallLog
            },
            {
            title:'Top Student List',
            type:stat,
            route:ROUTES.Admin.frontOffice.PostalDispatch
            },
            {
            title:'Student Transcript',
            type:stat,
            route:ROUTES.Admin.frontOffice.PostalRecieve
            },
            {
            title:'Provisional Certificate',
            type:stat,
            route:ROUTES.Admin.frontOffice.Complain
            },
            {
            title:'Final Certificate',
            type:stat,
            route:ROUTES.Admin.frontOffice.SetupOffice
            },
            {
            title:'Reports',
            type:stat,
            route:ROUTES.Admin.frontOffice.SetupOffice
            },
        ]
    },
]