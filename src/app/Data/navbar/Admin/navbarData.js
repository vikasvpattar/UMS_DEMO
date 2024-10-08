import { ROUTES } from "./../../../Router/routerConfig";

const drop = "dropdown";
const stat = "static";
const sheet = "sheet";
let empid = sessionStorage.getItem("employee_id")

let studentdrop;

studentdrop = [
  {
    title: "Student Admission",
    type: stat,
    route: ROUTES.Admin.Student.StudentAdmission,
  },
  {
    title: "Student Details",
    type: stat,
    route: ROUTES.Admin.Student.StudentDetails,
  },
  {
    title: "Disable Students",
    type: stat,
    route: ROUTES.Admin.Student.DisableStudents,
  },
]

export const navbarData = [
  {
    title: "Dashboard",
    type: stat,
    route: ROUTES.Admin.dashboard,
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
        route: ROUTES.Admin.frontOffice.AdmissionEnquiry,
      },
      {
        title: "Visitors Book",
        type: stat,
        route: ROUTES.Admin.frontOffice.VisitorsBook,
      },
      {
        title: "Phone Call Log",
        type: stat,
        route: ROUTES.Admin.frontOffice.PhoneCallLog,
      },
      {
        title: "Postal Dispatch",
        type: stat,
        route: ROUTES.Admin.frontOffice.PostalDispatch,
      },
      {
        title: "Postal Receive",
        type: stat,
        route: ROUTES.Admin.frontOffice.PostalRecieve,
      },
      {
        title: "Complaints",
        type: stat,
        route: ROUTES.Admin.frontOffice.Complain,
      },
      {
        title: "Setup Front Office",
        type: stat,
        route: ROUTES.Admin.frontOffice.SetupOffice,
      },
    ],
  },
  {
    title: "Students",
    type: drop,
    icon: <i className="ri-user-add-fill mr-2" />,
    drop: studentdrop
  },
  {
    title: "HR",
    type: drop,
    icon: <i className="ri-layout-3-line mr-2" />,
    drop: [
      {
        title: "Add New Staff",
        type: stat,
        route: ROUTES.Admin.HR.AddNewStaff,
      },
      {
        title: "View Staff",
        type: stat,
        route: ROUTES.Admin.HR.ViewStaff,
      },
      {
        title: "Staff Attendance",
        type: stat,
        route: ROUTES.Admin.HR.StaffAttendance,
      },
      {
        title: "Add Designation",
        type: stat,
        route: ROUTES.Admin.HR.AddDesignation,
      },
      {
        title: "Pay Roll",
        type: stat,
        route: ROUTES.Admin.HR.StaffAttendance,
      },
      {
        title: "Leave Management",
        type: stat,
        route: ROUTES.Admin.HR.AddDesignation,
      },
      {
        title: "Add Department",
        type: stat,
        route: ROUTES.Admin.HR.AddDepartment,
      },
      {
        title: "Feedback",
        type: stat,
        route: ROUTES.Admin.HR.Feedback,
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
            route: ROUTES.Admin.Accounts.Income.View,
          },
          {
            title: "Add Income",
            type: stat,
            route: ROUTES.Admin.Accounts.Income.Add,
          },
          {
            title: "Add Income Source",
            type: stat,
            route: ROUTES.Admin.Accounts.Income.AddSource,
          },
        ],
      },
      {
        title: "Expense",
        type: drop,
        drop: [
          {
            title: "View Expense",
            type: stat,
            route: ROUTES.Admin.Accounts.Expense.View,
          },
          {
            title: "Add Expense",
            type: stat,
            route: ROUTES.Admin.Accounts.Expense.Add,
          },
          {
            title: "Add Expense Source",
            type: stat,
            route: ROUTES.Admin.Accounts.Expense.AddSource,
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
            route: ROUTES.Admin.Accounts.FeeCollection.CollegeFee,
          },
          {
            title: "Search Fee Payment",
            type: stat,
            route: ROUTES.Admin.Accounts.FeeCollection.SearchFee,
          },
          {
            title: "Search Due Fees",
            type: stat,
            route: ROUTES.Admin.Accounts.FeeCollection.SearchDue,
          },
          {
            title: "Fee Master",
            type: stat,
            route: ROUTES.Admin.Accounts.FeeCollection.FeeMaster,
          },
          {
            title: "Fee Group",
            type: stat,
            route: ROUTES.Admin.Accounts.FeeCollection.FeeGroup,
          },
          {
            title: "Fee Type",
            type: stat,
            route: ROUTES.Admin.Accounts.FeeCollection.FeeType,
          },
          {
            title: "Fee Discount",
            type: stat,
            route: ROUTES.Admin.Accounts.FeeCollection.FeeDiscount,
          },
        ],
      },
    ],
  },
  {
    title: "Academics",
    type: sheet,
    icon: <i className="ri-pencil-ruler-2-line mr-2" />,
    drop: [
      {
        title: "Cirriculum",
        elements: [
          {
            title: "Class Time Table",
            route: ROUTES.Admin.Academics.ClassTimeTable,
          },
          {
            title: "Teacher Time Table",
            route: ROUTES.Admin.Academics.TeacherTimeTable,
          },
          {
            title: "Promote Student",
            route: ROUTES.Admin.Academics.PromoteStudents,
          },
          {
            title: "Add Batch",
            route: ROUTES.Admin.Academics.AddBatch,
          },
          {
            title: "Add Subject",
            route: ROUTES.Admin.Academics.AddSubject,
          },
          {
            title: "Add Class",
            route: ROUTES.Admin.Academics.AddClass,
          },
        ],
      },
      {
        title: "Lesson Plan",
        elements: [
          {
            title: "Manage Lesson Plan",
            route: ROUTES.Admin.Academics.ManageLessonPlan,
          },
          {
            title: "Syllabus Status",
            route: ROUTES.Admin.Academics.SyllabusStatus,
          },
          {
            title: "Add Topic",
            route: ROUTES.Admin.Academics.AddTopic,
          },
          {
            title: "Add Lesson",
            route: ROUTES.Admin.Academics.AddLesson,
          },
        ],
      },
    ],
  },
  {
    title: "Attendance",
    type: drop,
    icon: <i className="ri-pen-nib-line mr-2" />,
    drop: [
      {
        title: "Class Attendance",
        type: stat,
        route: ROUTES.dashboard,
      },
      {
        title: 'Lab Attendance',
        type: stat,
        route: ROUTES.Admin.Registar.Attendance.LabAttendance
      },
    ],
  },
  {
    title: "Documents",
    type: drop,
    icon: <i className="ri-file-copy-2-line mr-2" />,
    drop: [
      {
        title: "Upload Content",
        type: stat,
        route: ROUTES.Admin.Document.UploadContent,
      },
      {
        title: "Download Content",
        type: drop,
        drop: [
          {
            title: "Assignment",
            type: stat,
            route: ROUTES.Admin.Document.DownloadContent.Assignment,
          },
          {
            title: "Syllabus",
            type: stat,
            route: ROUTES.Admin.Document.DownloadContent.Syllabus,
          },
          {
            title: "Study Material",
            type: stat,
            route: ROUTES.Admin.Document.DownloadContent.Studymaterial,
          },
          {
            title: "Other download",
            type: stat,
            route: ROUTES.Admin.Document.DownloadContent.OtherDownload,
          },
        ],
      },
    ],
  },
  {
    title: "Communicate",
    type: drop,
    icon: <i className="ri-chat-1-line mr-2" />,
    drop: [
      {
        title: "Notice Board",
        type: stat,
        route: ROUTES.dashboard,
      },
      {
        title: "Send Mail",
        type: stat,
        route: ROUTES.dashboard,
      },
      {
        title: "Send Whatsapp",
        type: stat,
        route: ROUTES.dashboard,
      },
    ],
  },
  {
    title: "Exam Management",
    type: sheet,
    icon: <i className="ri-file-list-3-line mr-2" />,
    drop: [
      {
        title: "Exams",
        elements: [
          {
            title: "Assessment Group",
            route: ROUTES.dashboard,
          },
          {
            title: "Exam Schedules",
            route: ROUTES.dashboard,
          },
          {
            title: "Exam Results",
            route: ROUTES.dashboard,
          },
          {
            title: "Answersheet Evaluation",
            route: ROUTES.Admin.Examination.AnswersheetChecking,
          },
          {
            title: "Evaluater Login",
            route: ROUTES.Admin.Examination.InvigilatorLogin,
          },
          {
            title: "Assign Answersheets",
            route: ROUTES.Admin.Examination.AssignAnswerSheets,
          },

          {
            title: "Post Examinations",
            route: ROUTES.Admin.Examination.PostExaminations,
          },

          {
            title: "Create Seating Arrangements",
            route: ROUTES.Admin.Examination.ExamSeatingArrangements,
          },
          {
            title: "Create Time Table",
            route: ROUTES.Admin.Examination.CreateExamTimetable,
          },
          {
            title: "Create Question Paper",
            route: ROUTES.Admin.Examination.CreateQuestionPaper,
          },
          {
            title: "Create Exams",
            route: ROUTES.Admin.Examination.CreateExams,
          },
          {
            title: "Exam Committee",
            route: ROUTES.Admin.Examination.Commitee,
          },
        ],
      },
      {
        title: "Re Exam",
        elements: [
          {
            title: "Re Examination",
            route: ROUTES.dashboard,
          },
          {
            title: "Re Exam Enrollment",
            route: ROUTES.dashboard,
          },
          {
            title: "Re Exam Results",
            route: ROUTES.dashboard,
          },
        ],
      },
      {
        title: "Grading",
        elements: [
          {
            title: "Grading System",
            route: ROUTES.dashboard,
          },
          {
            title: "Scholastic Grading",
            route: ROUTES.dashboard,
          },
          {
            title: "College Grading",
            route: ROUTES.dashboard,
          },
          {
            title: "Scholastic Sub Grading",
            route: ROUTES.dashboard,
          },
          {
            title: "Grade Generator",
            route: ROUTES.dashboard,
          },
          {
            title: "Grace Marks",
            route: ROUTES.dashboard,
          },
          {
            title: "Consolidate Marks",
            route: ROUTES.dashboard,
          },
        ],
      },
    ],
  },
  {
    title: "Transport",
    type: drop,
    icon: <i className="ri-bus-line mr-2" />,
    drop: [
      {
        title: "Transport Fees",
        type: stat,
        route: ROUTES.Admin.Transport.transportFee,
      },
      {
        title: "Routes",
        type: stat,
        route: ROUTES.Admin.Transport.Route,
      },
      {
        title: "Vehicles",
        type: stat,
        route: ROUTES.Admin.Transport.Vehicles,
      },
      {
        title: "Assign Vehicles",
        type: stat,
        route: ROUTES.Admin.Transport.AssignVehicles,
      },
    ],
  },
  {
    title: "Library",
    type: stat,
    route: ROUTES.Admin.Library.Books,
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
        route: ROUTES.Admin.Hostel.hostelFee,
      },
      {
        title: "Hostel Rooms",
        type: stat,
        route: ROUTES.Admin.Hostel.HostelRooms,
      },
      {
        title: "Room Type",
        type: stat,
        route: ROUTES.Admin.Hostel.RoomType,
      },
      {
        title: "Hostel",
        type: stat,
        route: ROUTES.Admin.Hostel.Hostel,
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
        route: ROUTES.Admin.Inventory.IssueItems,
      },
      {
        title: "Add Item Stock",
        type: stat,
        route: ROUTES.Admin.Inventory.AddItemstock,
      },
      {
        title: "Add Item",
        type: stat,
        route: ROUTES.Admin.Inventory.AddItem,
      },
      {
        title: "Item Category",
        type: stat,
        route: ROUTES.Admin.Inventory.ItemCategory,
      },
      {
        title: "Item Store",
        type: stat,
        route: ROUTES.Admin.Inventory.ItemStore,
      },
      {
        title: "Item Supplier",
        type: stat,
        route: ROUTES.Admin.Inventory.ItemSupplier,
      },
    ],
  },
  {
    title: "Certificate",
    type: drop,
    icon: <i className="ri-profile-line mr-2" />,
    drop: [
      {
        title: "Design Hall-Tickets",
        type: stat,
        route: ROUTES.Admin.Certificates.DesignHallticket,
      },
      {
        title: "Design Marks Card",
        type: stat,
        route: ROUTES.Admin.Certificates.DesignMarkscard,
      },
    ],
  },
  {
    title: "LMS",
    type: drop,
    icon: <i className="ri-macbook-line mr-2" />,
    drop: [
      {
        title: "Create Course",
        type: stat,
        route: ROUTES.dashboard,
      },
      {
        title: "Courses",
        type: stat,
        route: ROUTES.dashboard,
      },
    ],
  },
  {
    title: "e-Books",
    type: drop,
    icon: <i className="ri-book-3-line mr-2" />,
    drop: [
      {
        title: "BAMS",
        type: drop,
        drop: [
          {
            title: "1st Year",
            type: stat,
            route: ROUTES.dashboard,
          },
          {
            title: "2nd Year",
            type: stat,
            route: ROUTES.dashboard,
          },
          {
            title: "3rd Year",
            type: stat,
            route: ROUTES.dashboard,
          },
          {
            title: "4th Year",
            type: stat,
            route: ROUTES.dashboard,
          },
        ],
      },
      {
        title: "Engineering",
        type: drop,
        drop: [
          {
            title: "1st Year",
            type: stat,
            route: ROUTES.dashboard,
          },
          {
            title: "2nd Year",
            type: stat,
            route: ROUTES.dashboard,
          },
          {
            title: "3rd Year",
            type: stat,
            route: ROUTES.dashboard,
          },
          {
            title: "4th Year",
            type: stat,
            route: ROUTES.dashboard,
          },
        ],
      },
      {
        title: "LLB",
        type: drop,
        drop: [
          {
            title: "1st Year",
            type: stat,
            route: ROUTES.dashboard,
          },
          {
            title: "2nd Year",
            type: stat,
            route: ROUTES.dashboard,
          },
          {
            title: "3rd Year",
            type: stat,
            route: ROUTES.dashboard,
          },
          {
            title: "4th Year",
            type: stat,
            route: ROUTES.dashboard,
          },
        ],
      },
    ],
  },
  {
    title: "Reports",
    type: stat,
    route: ROUTES.dashboard,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
];
