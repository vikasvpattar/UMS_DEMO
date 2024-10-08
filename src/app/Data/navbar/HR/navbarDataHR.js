import { ROUTES } from "../../../Router/routerConfig";

const drop = "dropdown";
const stat = "static";
const sheet = "sheet";
let role = sessionStorage.getItem("role");
export const navbarDataHR = [
  {
    title: "Home",
    type: stat,
    route: ROUTES.HR.Home,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Dean",
    type: stat,
    route:
      role == "SUPERADMIN"
        ? ROUTES.Registar.dashboard
        : ROUTES.Principal.dashboard,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Employer",
    type: drop,
    icon: <i className="ri-user-star-fill mr-2" />,
    drop: [
      // {
      // title:'Information',
      // type:stat,
      // route:ROUTES.HR.Employer.Information
      // },
      {
        title: "College Types",
        type: stat,
        route: ROUTES.HR.Employer.CollegeType,
      },
      {
        title: "Programs",
        type: stat,
        route: ROUTES.HR.Employer.Program,
      },
      {
        title: "Specialization",
        type: stat,
        route: ROUTES.HR.Employer.Specialization,
      },
      {
        title: "College",
        type: stat,
        route: ROUTES.HR.Employer.College,
      },
      // {
      // title:'College Specialization',
      // type:stat,
      // route:ROUTES.HR.Employer.CollegeSpecialization
      // },
      {
        title: "Job Position",
        type: stat,
        route: ROUTES.HR.Employer.JobPosition,
      },
      {
        title: "Department",
        type: stat,
        route: ROUTES.HR.Employer.Department,
      },
      // {
      // title:'Approval Workflow',
      // type:stat,
      // route:ROUTES.HR.Employer.ApprovalWorkflow
      // },
      // {
      // title:'Branch',
      // type:stat,
      // route:ROUTES.HR.Employer.Branch
      // },
      // {
      // title:'Level',
      // type:stat,
      // route:ROUTES.HR.Employer.Level
      // },
      // {
      // title:'Course',
      // type:stat,
      // route:ROUTES.HR.Employer.Course
      // },
      {
        title: "Trainer",
        type: stat,
        route: ROUTES.HR.Employer.Trainer,
      },
      // {
      // title:'Enthicity',
      // type:stat,
      // route:ROUTES.HR.Employer.Ethnicity
      // },
      // {
      // title:'Religion',
      // type:stat,
      // route:ROUTES.HR.Employer.Religion
      // },
      {
        title: "Document Category",
        type: stat,
        route: ROUTES.HR.Employer.DocumentCategory,
      },
    ],
  },
  {
    title: "Employee",
    type: drop,
    icon: <i className="ri-user-fill mr-2"></i>,
    drop: [
      {
        title: "Add Staff",
        type: stat,
        route: ROUTES.HR.Employee.AddStaff,
      },
      {
        title: "View/Edit Staff",
        type: stat,
        route: ROUTES.HR.Employee.ViewStaff,
      },
      // {
      // title:'Web Account',
      // type:stat,
      // route:ROUTES.HR.Employee.WebAccount
      // },
    ],
  },
  {
    title: "Leave",
    type: drop,
    icon: <i className="ri-flight-takeoff-line mr-2" />,
    drop: [
      {
        title: "Management",
        type: stat,
        route: ROUTES.HR.Leave.Management,
      },
      // {
      // title:'Planner',
      // type:stat,
      // route:ROUTES.HR.Leave.Planner
      // },
      {
        title: "Review",
        type: stat,
        route: ROUTES.HR.Leave.Review,
      },
      {
        title: "Transaction Report",
        type: stat,
        route: ROUTES.HR.Leave.TransactionReport,
      },
      {
        title: "Entitlement Report",
        type: stat,
        route: ROUTES.HR.Leave.EntitlementReport,
      },
      {
        title: "Leave Type",
        type: stat,
        route: ROUTES.HR.Leave.LeaveType,
      },
      {
        title: "Earning Policy",
        type: stat,
        route: ROUTES.HR.Leave.EarningPolicy,
      },
      {
        title: "Custom Approver",
        type: stat,
        route: ROUTES.HR.Leave.CustomApprover,
      },
      {
        title: "Appoval Workflow",
        type: stat,
        route: ROUTES.HR.Leave.ApprovalWorkflow,
      },
      // {
      // title:'Custom Approver',
      // type:stat,
      // route:ROUTES.HR.Leave.CustomApprover
      // },
      // {
      // title:'Workday',
      // type:stat,
      // route:ROUTES.HR.Leave.Workday
      // },
      {
        title: "Holiday",
        type: stat,
        route: ROUTES.HR.Leave.Holiday,
      },
      // {
      // title:'Setting',
      // type:stat,
      // route:ROUTES.HR.Leave.Setting
      // },
      {
        title: "Detailed Entitlements",
        type: stat,
        route: ROUTES.HR.Leave.Reports.Entitlement,
      },
      {
        title: "Detailed Leave Report",
        type: stat,
        route: ROUTES.HR.Leave.Reports.Leave,
      },
    ],
  },
  {
    title: "Attendance",
    type: drop,
    icon: <i className="ri-edit-line mr-2" />,
    drop: [
      {
        title: "Management",
        type: stat,
        route: ROUTES.HR.Attendance.Management,
      },
      // {
      // title:'Field Check-In',
      // type:stat,
      // route:ROUTES.HR.Attendance.FieldCheckIn
      // },
      {
        title: "Report",
        type: stat,
        route: ROUTES.HR.Attendance.TimeClockReport,
      },
      // {
      // title:'Workday',
      // type:stat,
      // route:ROUTES.HR.Attendance.WorkDay
      // },
      // {
      // title:'Holiday',
      // type:stat,
      // route:ROUTES.HR.Attendance.HoliDay
      // },
    ],
  },
  {
    title: "PayRoll",
    type: drop,
    icon: <i className="ri-wallet-line mr-2" />,
    drop: [
      {
        title: "Salary Adjustment",
        type: stat,
        route: ROUTES.HR.PayRoll.EmployerSalary,
      },
      {
        title: "Process",
        type: stat,
        route: ROUTES.HR.PayRoll.Process,
      },
      {
        title: "Earning",
        type: stat,
        route: ROUTES.HR.PayRoll.Earning,
      },
      {
        title: "Deduction",
        type: stat,
        route: ROUTES.HR.PayRoll.Deduction,
      },
      {
        title: "Bonus",
        type: stat,
        route: ROUTES.HR.PayRoll.Bonus,
      },
      {
        title: "Statutory Contribution",
        type: stat,
        route: ROUTES.HR.PayRoll.StationaryContribution,
      },
    ],
  },
  {
    title: "Document Workflow",
    type: drop,
    icon: <i className="ri-file-line mr-2" />,
    drop: [
      {
        title: "Management",
        type: stat,
        route: ROUTES.HR.Document.Management,
      },
      {
        title: "Review",
        type: stat,
        route: ROUTES.HR.Document.Review,
      },
      {
        title: "Approval Workflow",
        type: stat,
        route: ROUTES.HR.Document.ApprovalWorkFlow,
      },
      // {
      // title:'Custom Approver',
      // type:stat,
      // route:ROUTES.HR.Document.CustomApprover
      // },
    ],
  },
  {
    title: "Team",
    type: drop,
    icon: <i className="ri-team-fill mr-2" />,
    drop: [
      {
        title: "Discussion",
        type: stat,
        route: ROUTES.HR.Team.Discussion,
      },
      {
        title: "Document & Form Sharing",
        type: stat,
        route: ROUTES.HR.Team.documents,
      },
      {
        title: "Announcement",
        type: stat,
        route: ROUTES.HR.Team.Announcement,
      },
    ],
  },
  {
    title: "Feedback",
    type: stat,
    route: ROUTES.HR.Feedback.FeedbackTrigger,
  },
];

export const navbarDataHRAdmision = [
  {
    title: "Home",
    type: stat,
    route: ROUTES.HR.Home,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Dean",
    type: stat,
    route: ROUTES.AdConsult.AdmissionEnquiry,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Employer",
    type: drop,
    icon: <i className="ri-user-star-fill mr-2" />,
    drop: [
      // {
      // title:'Information',
      // type:stat,
      // route:ROUTES.HR.Employer.Information
      // },
      {
        title: "College Types",
        type: stat,
        route: ROUTES.HR.Employer.CollegeType,
      },
      {
        title: "Programs",
        type: stat,
        route: ROUTES.HR.Employer.Program,
      },
      {
        title: "Specialization",
        type: stat,
        route: ROUTES.HR.Employer.Specialization,
      },
      {
        title: "College",
        type: stat,
        route: ROUTES.HR.Employer.College,
      },
      // {
      // title:'College Specialization',
      // type:stat,
      // route:ROUTES.HR.Employer.CollegeSpecialization
      // },
      {
        title: "Job Position",
        type: stat,
        route: ROUTES.HR.Employer.JobPosition,
      },
      {
        title: "Department",
        type: stat,
        route: ROUTES.HR.Employer.Department,
      },
      // {
      // title:'Approval Workflow',
      // type:stat,
      // route:ROUTES.HR.Employer.ApprovalWorkflow
      // },
      // {
      // title:'Branch',
      // type:stat,
      // route:ROUTES.HR.Employer.Branch
      // },
      // {
      // title:'Level',
      // type:stat,
      // route:ROUTES.HR.Employer.Level
      // },
      // {
      // title:'Course',
      // type:stat,
      // route:ROUTES.HR.Employer.Course
      // },
      {
        title: "Trainer",
        type: stat,
        route: ROUTES.HR.Employer.Trainer,
      },
      // {
      // title:'Enthicity',
      // type:stat,
      // route:ROUTES.HR.Employer.Ethnicity
      // },
      // {
      // title:'Religion',
      // type:stat,
      // route:ROUTES.HR.Employer.Religion
      // },
      {
        title: "Document Category",
        type: stat,
        route: ROUTES.HR.Employer.DocumentCategory,
      },
    ],
  },
  {
    title: "Employee",
    type: drop,
    icon: <i className="ri-user-fill mr-2"></i>,
    drop: [
      {
        title: "Add Staff",
        type: stat,
        route: ROUTES.HR.Employee.AddStaff,
      },
      {
        title: "View/Edit Staff",
        type: stat,
        route: ROUTES.HR.Employee.ViewStaff,
      },
      // {
      // title:'Web Account',
      // type:stat,
      // route:ROUTES.HR.Employee.WebAccount
      // },
    ],
  },
  {
    title: "Leave",
    type: drop,
    icon: <i className="ri-flight-takeoff-line mr-2" />,
    drop: [
      {
        title: "Management",
        type: stat,
        route: ROUTES.HR.Leave.Management,
      },
      // {
      // title:'Planner',
      // type:stat,
      // route:ROUTES.HR.Leave.Planner
      // },
      {
        title: "Review",
        type: stat,
        route: ROUTES.HR.Leave.Review,
      },
      {
        title: "Transaction Report",
        type: stat,
        route: ROUTES.HR.Leave.TransactionReport,
      },
      {
        title: "Entitlement Report",
        type: stat,
        route: ROUTES.HR.Leave.EntitlementReport,
      },
      {
        title: "Leave Type",
        type: stat,
        route: ROUTES.HR.Leave.LeaveType,
      },
      {
        title: "Earning Policy",
        type: stat,
        route: ROUTES.HR.Leave.EarningPolicy,
      },
      {
        title: "Custom Approver",
        type: stat,
        route: ROUTES.HR.Leave.CustomApprover,
      },
      {
        title: "Appoval Workflow",
        type: stat,
        route: ROUTES.HR.Leave.ApprovalWorkflow,
      },
      // {
      // title:'Custom Approver',
      // type:stat,
      // route:ROUTES.HR.Leave.CustomApprover
      // },
      // {
      // title:'Workday',
      // type:stat,
      // route:ROUTES.HR.Leave.Workday
      // },
      {
        title: "Holiday",
        type: stat,
        route: ROUTES.HR.Leave.Holiday,
      },
      // {
      // title:'Setting',
      // type:stat,
      // route:ROUTES.HR.Leave.Setting
      // },
    ],
  },
  {
    title: "Attendance",
    type: drop,
    icon: <i className="ri-edit-line mr-2" />,
    drop: [
      {
        title: "Management",
        type: stat,
        route: ROUTES.HR.Attendance.Management,
      },
      // {
      // title:'Field Check-In',
      // type:stat,
      // route:ROUTES.HR.Attendance.FieldCheckIn
      // },
      {
        title: "Report",
        type: stat,
        route: ROUTES.HR.Attendance.TimeClockReport,
      },
      // {
      // title:'Workday',
      // type:stat,
      // route:ROUTES.HR.Attendance.WorkDay
      // },
      // {
      // title:'Holiday',
      // type:stat,
      // route:ROUTES.HR.Attendance.HoliDay
      // },
    ],
  },
  {
    title: "PayRoll",
    type: drop,
    icon: <i className="ri-wallet-line mr-2" />,
    drop: [
      {
        title: "Salary Adjustment",
        type: stat,
        route: ROUTES.HR.PayRoll.EmployerSalary,
      },
      {
        title: "Process",
        type: stat,
        route: ROUTES.HR.PayRoll.Process,
      },
      {
        title: "Earning",
        type: stat,
        route: ROUTES.HR.PayRoll.Earning,
      },
      {
        title: "Deduction",
        type: stat,
        route: ROUTES.HR.PayRoll.Deduction,
      },
      {
        title: "Bonus",
        type: stat,
        route: ROUTES.HR.PayRoll.Bonus,
      },
      {
        title: "Statutory Contribution",
        type: stat,
        route: ROUTES.HR.PayRoll.StationaryContribution,
      },
    ],
  },
  {
    title: "Document Workflow",
    type: drop,
    icon: <i className="ri-file-line mr-2" />,
    drop: [
      {
        title: "Management",
        type: stat,
        route: ROUTES.HR.Document.Management,
      },
      {
        title: "Review",
        type: stat,
        route: ROUTES.HR.Document.Review,
      },
      {
        title: "Approval Workflow",
        type: stat,
        route: ROUTES.HR.Document.ApprovalWorkFlow,
      },
      // {
      // title:'Custom Approver',
      // type:stat,
      // route:ROUTES.HR.Document.CustomApprover
      // },
    ],
  },
  {
    title: "Team",
    type: drop,
    icon: <i className="ri-team-fill mr-2" />,
    drop: [
      {
        title: "Discussion",
        type: stat,
        route: ROUTES.HR.Team.Discussion,
      },
      {
        title: "Document & Form Sharing",
        type: stat,
        route: ROUTES.HR.Team.documents,
      },
      {
        title: "Announcement",
        type: stat,
        route: ROUTES.HR.Team.Announcement,
      },
    ],
  },
];
