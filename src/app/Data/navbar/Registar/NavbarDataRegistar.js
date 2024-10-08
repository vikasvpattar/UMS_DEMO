import { ROUTES } from "./../../../Router/routerConfig";

const drop = "dropdown";
const stat = "static";
const sheet = "sheet";
// let college_id = sessionStorage.getItem("college_id");

export const navbarDataRegistar = [
  {
    title: "Dashboard",
    type: stat,
    route: ROUTES.Registar.dashboard,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "HR",
    type: stat,
    route: ROUTES.HR.Home,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Examination",
    type: stat,
    route: ROUTES.Admin.toexamination,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Front Office",
    type: drop,
    icon: <i className="ri-store-2-line mr-2" />,
    drop: [
      {
        title: "Admission Enquiry",
        type: stat,
        route: ROUTES.Registar.frontOffice.AdmissionEnquiry,
      },
      {
        title: "Visitors Book",
        type: stat,
        route: ROUTES.Registar.frontOffice.VisitorsBook,
      },
      {
        title: "Phone Call Log",
        type: stat,
        route: ROUTES.Registar.frontOffice.PhoneCallLog,
      },
      {
        title: "Postal Dispatch",
        type: stat,
        route: ROUTES.Registar.frontOffice.PostalDispatch,
      },
      {
        title: "Postal Receive",
        type: stat,
        route: ROUTES.Registar.frontOffice.PostalRecieve,
      },
      {
        title: "Complaints",
        type: stat,
        route: ROUTES.Registar.frontOffice.Complain,
      },
      {
        title: "Setup Front Office",
        type: stat,
        route: ROUTES.Registar.frontOffice.SetupOffice,
      },
    ],
  },
  {
    title: "Accounts",
    type: drop,
    icon: <i className="ri-stack-line mr-2" />,
    drop: [
      {
        title: "Income",
        type: drop,
        drop: [
          {
            title: "View Income",
            type: stat,
            route: ROUTES.Registar.Accounts.Income.View,
          },
          {
            title: "Add Income",
            type: stat,
            route: ROUTES.Registar.Accounts.Income.Add,
          },
          {
            title: "Add Income Source",
            type: stat,
            route: ROUTES.Registar.Accounts.Income.AddSource,
          },
          // {
          //     title: 'Add Semester',
          //     route: ROUTES.Registar.Academics.AddSemester
          // },
          // {
          //     title: 'Add Section',
          //     route: ROUTES.Registar.Academics.AddSection
          // }
        ],
      },
      {
        title: "Expense",
        type: drop,
        drop: [
          {
            title: "View Expense",
            type: stat,
            route: ROUTES.Registar.Accounts.Expense.View,
          },
          {
            title: "Add Expense",
            type: stat,
            route: ROUTES.Registar.Accounts.Expense.Add,
          },
          {
            title: "Add Expense Source",
            type: stat,
            route: ROUTES.Registar.Accounts.Expense.AddSource,
          },
        ],
      },
      {
        title: "Fee Collection",
        type: drop,
        drop: [
          {
            title: "Collect Fee",
            type: stat,
            route: ROUTES.Registar.Accounts.FeeCollection.CollegeFee,
          },
          // {
          //     title: 'Search Fee Payment',
          //     type: stat,
          //     route: ROUTES.Registar.Accounts.FeeCollection.SearchFee
          // },
          {
            title: "Search Due Fees",
            type: stat,
            route: ROUTES.Registar.Accounts.FeeCollection.SearchDue,
          },
          {
            title: "Fee Master",
            type: stat,
            route: ROUTES.Registar.Accounts.FeeCollection.FeeMaster,
          },
          {
            title: "Fee Type Amount",
            type: stat,
            route: ROUTES.Registar.Accounts.FeeCollection.FeeTypeAmount,
          },
          {
            title: "Fee Type",
            type: stat,
            route: ROUTES.Registar.Accounts.FeeCollection.FeeType,
          },
          {
            title: "Fee Discount",
            type: stat,
            route: ROUTES.Registar.Accounts.FeeCollection.FeeDiscount,
          },
          {
            title: "Fee Group",
            type: stat,
            route: ROUTES.Registar.Accounts.FeeCollection.FeeGroup,
          },
          {
            title: "Reports",
            type: stat,
            route: ROUTES.Registar.Accounts.FeeCollection.Reports,
          },
        ],
      },
      {
        title: "Invoice Generation",
        type: stat,
        route: ROUTES.Registar.Admission.InvoiceDetails,
      }
    ],
    
  },
  {
    title: "Academics",
    type: sheet,
    icon: <i className="ri-pencil-ruler-2-line mr-2" />,
    drop: [
      {
        title: "Curriculum",
        elements: [
          {
            title: "Class Time Table",
            route: ROUTES.Registar.Academics.ClassTimeTable,
          },
          {
            title: "Teacher Time Table",
            route: ROUTES.Registar.Academics.TeacherTimeTable,
          },
          {
            title: "Promote Student",
            route: ROUTES.Registar.Academics.PromoteStudents,
          },
          // {
          //   title: "Transfer Student",
          //   route: ROUTES.Registar.Academics.TransferStudents,
          // },
          {
            title: "Add Class",
            route: ROUTES.Registar.Academics.AddClass,
          },
          {
            title: "Add Semester",
            route: ROUTES.Registar.Academics.AddSemester,
          },
          {
            title: "Add Section",
            route: ROUTES.Registar.Academics.AddSection,
          },
          {
            title: "Add Subject",
            route: ROUTES.Registar.Academics.AddSubject,
          },
          {
            title: "Add Batch",
            route: ROUTES.Registar.Academics.AddBatch,
          },
        ],
      },
      {
        title: "Lesson Plan",
        elements: [
          {
            title: "Manage Lesson Plan",
            route: ROUTES.Registar.Academics.ManageLessonPlan,
          },
          {
            title: "Syllabus Status",
            route: ROUTES.Registar.Academics.SyllabusStatus,
          },
          {
            title: "Add Lesson",
            route: ROUTES.Registar.Academics.AddLesson,
          },
          {
            title: "Add Topic",
            route: ROUTES.Registar.Academics.AddTopic,
          },

          {
            title: "Add Question Bank",
            route: ROUTES.Registar.Academics.AddQuestionBank,
          },
        ],
      },
    ],
  },
  {
    title: "Admissions",
    type: drop,
    icon: <i className="ri-add-circle-line mr-2" />,
    drop: [
      {
        title: "New Admission",
        type: stat,
        route: ROUTES.Registar.Admission.NewAdmission,
      },
      {
        title: "Online Enquiry",
        type: stat,
        route: ROUTES.Registar.Admission.AdmissionEnquiry,
      },
      {
        title: "Admission Form",
        type: stat,
        route: ROUTES.Registar.Admission.AdmissionDetails,
      },
    ],
  },
  {
    title: "Students",
    type: drop,
    icon: <i className="ri-user-2-line mr-2" />,
    drop: [
      {
        title: "Approve Students",
        type: stat,
        route: ROUTES.Registar.ApproveStudentId,
      },
      {
        title: "Student Details",
        type: stat,
        route: ROUTES.Registar.Student.StudentDetails,
      },
      {
        title: "Internal Exams",
        type: stat,
        route: ROUTES.Registar.Student.Exam,
      },
      {
        title: "Midterm Exams",
        type: stat,
        route: ROUTES.Registar.Student.Midterm,
      },
      {
        title: "Viva",
        type: stat,
        route: ROUTES.Registar.Student.Viva,
      },
      ,
      {
        title: "Student Complaints",
        type: stat,
        route: ROUTES.Registar.Student.NewComplaint,
      },
      {
        title: "Update ABC",
        type: stat,
        route: ROUTES.Registar.Student.ABCUpdate
      }
      // {
      //     title: 'Disable Students',
      //     type: stat,
      //     route: ROUTES.Registar.Student.DisableStudents
      // },
    ],
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
    title: "Attendance",
    type: drop,
    icon: <i className="ri-pen-nib-line mr-2" />,
    drop: [
      {
        title: "Class Attendance",
        type: stat,
        route: ROUTES.Registar.Attendance.ClassAttendance,
      },
      {
        title: 'Lab Attendance',
        type: stat,
        route: ROUTES.Registar.Attendance.LabAttendance
      },
    ],
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
  {
    title: "Transport",
    type: drop,
    icon: <i className="ri-bus-line mr-2" />,
    drop: [
      {
        title: "Transport Fees",
        type: stat,
        route: ROUTES.Registar.Transport.transportFee,
      },
      {
        title: "Routes",
        type: stat,
        route: ROUTES.Registar.Transport.Route,
      },
      {
        title: "Vehicles",
        type: stat,
        route: ROUTES.Registar.Transport.Vehicles,
      },
      {
        title: "Assign Vehicles",
        type: stat,
        route: ROUTES.Registar.Transport.AssignVehicles,
      },
      {
        title: "Pickup Points",
        type: stat,
        route: ROUTES.Registar.Transport.pickupPoints,
      },
      {
        title: " Assign Pickup Points",
        type: stat,
        route: ROUTES.Registar.Transport.AssignPickupPoints,
      },
    ],
  },
  {
    title: "Library",
    type: stat,
    route: ROUTES.Registar.Library.Dashboard,
    icon: <i className="ri-book-2-line mr-2" />,
  },

  // {
  //   title: "Staff Dairy",
  //   type: stat,
  //   route: ROUTES.Registar.StaffDairy.StaffDairy,
  //   icon: <i className="ri-book-2-line mr-2" />,
  // },

  {
    title: 'Staff Diary',
    type: drop,
    icon: <i className="ri-user-add-fill mr-2" />,
    drop: [

      {
        title: 'Add Diary',
        type: stat,
        route: ROUTES.Registar.StaffDairy.StaffDairy
      },
      {
        title: 'View Diary',
        type: stat,
        route: ROUTES.Registar.StaffDairy.ViewStaffDairy
      },
      {
        title: 'Staff Diary Report',
        type: stat,
        route: ROUTES.Registar.StaffDairy.StaffDairyReport2
      },

    ]
  },

  {
    title: "Recruitment",
    type: stat,
    route: ROUTES.Registar.Recruitment.Recruitment,
    icon: <i className="ri-book-2-line mr-2" />,
  },

  {
    title: "Hostel",
    type: drop,
    icon: <i className="ri-hotel-bed-line mr-2" />,
    drop: [
      {
        title: "Hostel Fees",
        type: stat,
        route: ROUTES.Registar.Hostel.hostelFee,
      },
      {
        title: "Hostel Rooms",
        type: stat,
        route: ROUTES.Registar.Hostel.HostelRooms,
      },
      {
        title: "Bed List",
        type: stat,
        route: ROUTES.Registar.Hostel.HostelBeds,
        icon: <i className="fas fa-bed mr-2" />,
      },
      {
        title: "Room Type",
        type: stat,
        route: ROUTES.Registar.Hostel.RoomType,
      },
      {
        title: "Hostel",
        type: stat,
        route: ROUTES.Registar.Hostel.Hostel,
      },
      {
        title: "Hostel Floors",
        type: stat,
        route: ROUTES.Registar.Hostel.HostelFloors,
      },
    ],
  },
  {
    title: "Inventory",
    type: drop,
    icon: <i className="ri-shopping-bag-line mr-2" />,
    drop: [
      {
        title: "Issue Items",
        type: stat,
        route: ROUTES.Registar.Inventory.IssueItems,
      },
      {
        title: "Add Item Stock",
        type: stat,
        route: ROUTES.Registar.Inventory.AddItemstock,
      },
      {
        title: "Add Item",
        type: stat,
        route: ROUTES.Registar.Inventory.AddItem,
      },
      {
        title: "Item Category",
        type: stat,
        route: ROUTES.Registar.Inventory.ItemCategory,
      },
      {
        title: "Item Store",
        type: stat,
        route: ROUTES.Registar.Inventory.ItemStore,
      },
      {
        title: "Item Supplier",
        type: stat,
        route: ROUTES.Registar.Inventory.ItemSupplier,
      },
    ],
  },
  {
    title: "Reports",
    type: stat,
    icon: <i className="ri-git-repository-line mr-2" />,
    route: ROUTES.Registar.Reports.Home,
  },
  
  // {
  //   title: "Website",
  //   type: drop,
  //   icon: <i className="ri-macbook-line mr-2" />,
  //   drop: [
  //     {
  //       title: "Engineering",
  //       type: stat,
  //       route: ROUTES.homeoEvents || ROUTES.ResearchandPublication,        
  //     },
  //     {
  //       title: "Engineering",
  //       type: stat,
  //       route: 
  //       [
  //         {
  //           title: "Events",
  //           type: stat,
  //           route: ROUTES.homeoEvents,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Research and Publication",
  //           type: stat,
  //           route: ROUTES.ResearchandPublication,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         }
  //       ] ,
  //       icon: <i className="ri-folder-chart-line mr-2" />,
  //     },
  //     // {
  //     //   title: "Engineering",
  //     //   type: drop, 
  //     //   icon: <i className="ri-folder-chart-line mr-2" />,
  //     //   drop: [
  //     //     {
  //     //       title: "Events",
  //     //       type: stat,
  //     //       route: ROUTES.homeoEvents,
  //     //       icon: <i className="ri-folder-chart-line mr-2" />,
  //     //     },
  //     //     {
  //     //       title: "Research and Publication",
  //     //       type: stat,
  //     //       route: ROUTES.ResearchandPublication,
  //     //       icon: <i className="ri-folder-chart-line mr-2" />,
  //     //     },
  //     //     {
  //     //       title: "College Permission",
  //     //       type: stat,
  //     //       route: ROUTES.CollegePermission,
  //     //       icon: <i className="ri-folder-chart-line mr-2" />,
  //     //     },
  //     //     {
  //     //       title: "College Affiliation",
  //     //       type: stat,
  //     //       route: ROUTES.CollegeAffiliation,
  //     //       icon: <i className="ri-folder-chart-line mr-2" />,
  //     //     },
  //     //     {
  //     //       title: "Syllabus Upload",
  //     //       type: stat,
  //     //       route: ROUTES.SyllabusUpload,
  //     //       icon: <i className="ri-folder-chart-line mr-2" />,
  //     //     },
  //     //     {
  //     //       title: "Student Lists",
  //     //       type: stat,
  //     //       route: ROUTES.HomeopathyStudentsList,
  //     //       icon: <i className="ri-folder-chart-line mr-2" />,
  //     //     },
  //     //     {
  //     //       title: "Student Results",
  //     //       type: stat,
  //     //       route: ROUTES.HomeopathyResults,
  //     //       icon: <i className="ri-folder-chart-line mr-2" />,
  //     //     },
  //     //   ],
  //     // },
  //     {
  //       title: "Medicine",
  //       type: drop,
  //       route: ROUTES.HomeopathyResults,
  //       drop: [
  //         {
  //           title: "Student Lists",
  //           type: stat,
  //           route: ROUTES.HomeopathyStudentsList,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //           {
  //             title: "Student Results",
  //             type: stat,
  //             route: ROUTES.HomeopathyResults,
  //             icon: <i className="ri-folder-chart-line mr-2" />,
  //           },
  //           {
  //           title: "College Permission",
  //           type: stat,
  //           route: ROUTES.CollegePermission,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //           {
  //             title: "College Affiliation",
  //             type: stat,
  //             route: ROUTES.CollegeAffiliation,
  //             icon: <i className="ri-folder-chart-line mr-2" />,
  //           },
  //           {
  //             title: "OPD Services",
  //             type: stat,
  //             route: ROUTES.OPDServices,
  //             icon: <i className="ri-folder-chart-line mr-2" />,
  //           },
  //           {
  //             title: "IPD Services",
  //             type: stat,
  //             route: ROUTES.IPDServices,
  //             icon: <i className="ri-folder-chart-line mr-2" />,
  //           },  
  //       ],
  //     },
  //     {
  //       title: "Ayurveda",
  //       type: drop,
  //       route: ROUTES.homeoEvents,
  //       drop: [
  //         {
  //           title: "Events",
  //           type: stat,
  //           route: ROUTES.homeoEvents,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },   
  //         {
  //           title: "Syllabus Upload",
  //           type: stat,
  //           route: ROUTES.SyllabusUpload,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Student Lists",
  //           type: stat,
  //           route: ROUTES.HomeopathyStudentsList,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //       {
  //         title: "Student Results",
  //         type: stat,
  //         route: ROUTES.HomeopathyResults,
  //         icon: <i className="ri-folder-chart-line mr-2" />,
  //       },
  //         {
  //           title: "OPD Services",
  //           type: stat,
  //           route: ROUTES.OPDServices,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "IPD Services",
  //           type: stat,
  //           route: ROUTES.IPDServices,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         }, 
  //       ],
  //     },
  //     {
  //       title: "Law",
  //       type: drop,
  //       route: ROUTES.homeoEvents,
  //       drop: [
  //         {
  //           title: "Events",
  //           type: stat,
  //           route: ROUTES.homeoEvents,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Research and Publication",
  //           type: stat,
  //           route: ROUTES.ResearchandPublication,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Syllabus Upload",
  //           type: stat,
  //           route: ROUTES.SyllabusUpload,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Student Lists",
  //           type: stat,
  //           route: ROUTES.HomeopathyStudentsList,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Student Results",
  //           type: stat,
  //           route: ROUTES.HomeopathyResults,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Nursing",
  //       type: drop,
  //       route: ROUTES.homeoEvents,
  //       drop: [
  //         {
  //           title: "Events",
  //           type: stat,
  //           route: ROUTES.homeoEvents,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Research and Publication",
  //           type: stat,
  //           route: ROUTES.ResearchandPublication,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Syllabus Upload",
  //           type: stat,
  //           route: ROUTES.SyllabusUpload,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Student Lists",
  //           type: stat,
  //           route: ROUTES.HomeopathyStudentsList,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Student Results",
  //           type: stat,
  //           route: ROUTES.HomeopathyResults,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //       ]
  //     },
  //     {
  //       title: "Commerce",
  //       type: drop,
  //       route: ROUTES.ResearchandPublication,
  //       drop: [
  //         {
  //           title: "Research and Publication",
  //           type: stat,
  //           route: ROUTES.ResearchandPublication,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Syllabus Upload",
  //           type: stat,
  //           route: ROUTES.SyllabusUpload,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Student Lists",
  //           type: stat,
  //           route: ROUTES.HomeopathyStudentsList,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Student Results",
  //           type: stat,
  //           route: ROUTES.HomeopathyResults,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //       ]
  //     },
  //     {
  //       title: "Homoeopathy",
  //       type: drop,
  //       route: ROUTES.homeoEvents,
  //       drop: [
  //         {
  //           title: "Events",
  //           type: stat,
  //           route: ROUTES.homeoEvents,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Research and Publication",
  //           type: stat,
  //           route: ROUTES.ResearchandPublication,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "College Permission",
  //           type: stat,
  //           route: ROUTES.CollegePermission,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "College Affiliation",
  //           type: stat,
  //           route: ROUTES.CollegeAffiliation,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Syllabus Upload",
  //           type: stat,
  //           route: ROUTES.SyllabusUpload,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Student Lists",
  //           type: stat,
  //           route: ROUTES.HomeopathyStudentsList,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Student Results",
  //           type: stat,
  //           route: ROUTES.HomeopathyResults,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "OPD Services",
  //           type: stat,
  //           route: ROUTES.OPDServices,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "IPD Services",
  //           type: stat,
  //           route: ROUTES.IPDServices,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //       ]
  //     },
  //     {
  //       title: "Pharmacy",
  //       type: drop,
  //       route: ROUTES.homeoEvents,
  //       drop: [
  //         {
  //           title: "Events",
  //           type: stat,
  //           route: ROUTES.homeoEvents,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Research and Publication",
  //           type: stat,
  //           route: ROUTES.ResearchandPublication,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },   
  //         {
  //           title: "Syllabus Upload",
  //           type: stat,
  //           route: ROUTES.SyllabusUpload,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Student Lists",
  //           type: stat,
  //           route: ROUTES.HomeopathyStudentsList,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Student Results",
  //           type: stat,
  //           route: ROUTES.HomeopathyResults,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //       ]
  //     },
  //     {
  //       title: "IT & Computer Science",
  //       type: drop,
  //       route: ROUTES.ResearchandPublication,
  //       drop: [
  //         {
  //           title: "Research and Publication",
  //           type: stat,
  //           route: ROUTES.ResearchandPublication,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Syllabus Upload",
  //           type: stat,
  //           route: ROUTES.SyllabusUpload,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Student Lists",
  //           type: stat,
  //           route: ROUTES.HomeopathyStudentsList,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Student Results",
  //           type: stat,
  //           route: ROUTES.HomeopathyResults,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //       ]
  //     },
  //     {
  //       title: "Education",
  //       type: drop,
  //       route: ROUTES.homeoEvents,
  //       drop: [
  //         {
  //           title: "Events",
  //           type: stat,
  //           route: ROUTES.homeoEvents,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Research and Publication",
  //           type: stat,
  //           route: ROUTES.ResearchandPublication,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Syllabus Upload",
  //           type: stat,
  //           route: ROUTES.SyllabusUpload,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Student Lists",
  //           type: stat,
  //           route: ROUTES.HomeopathyStudentsList,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Student Results",
  //           type: stat,
  //           route: ROUTES.HomeopathyResults,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //       ]
  //     },
  //     {
  //       title: "Science",
  //       type: drop,
  //       route: ROUTES.homeoEvents,
  //       drop: [
  //         {
  //           title: "Events",
  //           type: stat,
  //           route: ROUTES.homeoEvents,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Research and Publication",
  //           type: stat,
  //           route: ROUTES.ResearchandPublication,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "College Permission",
  //           type: stat,
  //           route: ROUTES.CollegePermission,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "College Affiliation",
  //           type: stat,
  //           route: ROUTES.CollegeAffiliation,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },     
  //         {
  //           title: "Syllabus Upload",
  //           type: stat,
  //           route: ROUTES.SyllabusUpload,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Student Lists",
  //           type: stat,
  //           route: ROUTES.HomeopathyStudentsList,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //         {
  //           title: "Student Results",
  //           type: stat,
  //           route: ROUTES.HomeopathyResults,
  //           icon: <i className="ri-folder-chart-line mr-2" />,
  //         },
  //       ]
  //     },
  //   ],
    
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
  {
    title: "LMS",
    type: drop,
    icon: <i className="ri-macbook-line mr-2" />,
    drop: [
      {
        title: "Create Course",
        type: stat,
        route: ROUTES.Registar.LMS.Create,
      },
      {
        title: "Courses",
        type: stat,
        route: ROUTES.Registar.LMS.View,
      },
    ],
  },
  // {
  //   title: "Tickets",
  //   type: stat,
  //   icon: <i className="ri-ticket-line mr-2" />,
  //   route: ROUTES.Registar.Ticket,
  // }
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
  // {
  //     title:'Reports',
  //     type:stat,
  //     route:ROUTES.dashboard,
  //     icon:<i className="ri-folder-chart-line mr-2" />
  // },
];
