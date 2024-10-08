import { ROUTES } from "./../../../Router/routerConfig";

const drop = "dropdown";
const stat = "static";
const sheet = "sheet";

export const NavbarAdCon = [
  {
    title: "Admission Enquiry",
    type: stat,
    route: ROUTES.AdConsult.AdmissionEnquiry,
    icon: <i className="ri-chat-smile-3-line mr-2" />,
  },
  {
    title: "HR",
    type: drop,
    icon: <i className="ri-user-fill mr-2"></i>,
    drop: [
      {
        title: "Leave",
        type: drop,
        drop: [
          {
            title: "Entitlement",
            type: stat,
            route: ROUTES.AdConsult.HR.Leave.Entitlement,
          },
          {
            title: "Application",
            type: stat,
            route: ROUTES.AdConsult.HR.Leave.Application,
          },
          {
            title: "Schedule",
            type: stat,
            route: ROUTES.AdConsult.HR.Leave.Schedule,
          },
        ],
      },
      {
        title: "PayRoll",
        type: drop,
        drop: [
          {
            title: "Salary",
            type: stat,
            route: ROUTES.AdConsult.HR.PayRoll.Salary,
          },
          {
            title: "Annual Statement",
            type: stat,
            route: ROUTES.AdConsult.HR.PayRoll.AnnualStatement,
          },
        ],
      },
      {
        title: "Document",
        type: stat,
        route: ROUTES.AdConsult.HR.Document,
      },
      {
        title: "Team",
        type: drop,
        drop: [
          {
            title: "Discussion",
            type: stat,
            route: ROUTES.AdConsult.HR.Team.Discussion,
          },
          {
            title: "Document & Form Sharing",
            type: stat,
            route: ROUTES.AdConsult.HR.Team.Documents,
          },
          {
            title: "Announcement",
            type: stat,
            route: ROUTES.AdConsult.HR.Team.Announcement,
          },
        ],
      },
    ],
  },
  {
    title: "Collect Fee",
    type: stat,
    route: ROUTES.AdConsult.CollectFee,
    icon: <i className="ri-hand-coin-line mr-2" />,
  },
  {
    title: "Search Due Fees",
    type: stat,
    route: ROUTES.AdConsult.SearchDue,
    icon: <i className="ri-search-2-line mr-2" />,
  },
  {
    title: "Students",
    type: drop,
    icon: <i className="ri-user-fill mr-2"></i>,
    drop: [
      {
        title: "Student Details",
        type: stat,
        route: ROUTES.AdConsult.StudentDetails,
      },
      {
        title: "New Admission",
        type: stat,
        route: ROUTES.AdConsult.Admission,
      },
    ],
  },
  {
    title: 'Staff Diary',
    type: drop,
    icon: <i className="ri-user-add-fill mr-2" />,
    drop: [

      {
        title: 'Add Diary',
        type: stat,
        route: ROUTES.AdConsult.StaffDiary
      },
      {
        title: 'View Diary',
        type: stat,
        route: ROUTES.AdConsult.ViewStaffDairy
      },
      {
        title: 'Staff Diary Report',
        type: stat,
        route: ROUTES.AdConsult.StaffDairyReport2
      },

    ]
  },
  {
    title: "Online Enquiry",
    type: stat,
    route: ROUTES.AdConsult.OnlineEnquiry,
    icon: <i className="ri-macbook-line mr-2" />,
  },
  {
    title: "Phone Call Log",
    type: stat,
    route: ROUTES.AdConsult.PhoneCallLog,
    icon: <i className="ri-phone-line mr-2" />,
  },
  {
    title: "Setup Office",
    type: stat,
    route: ROUTES.AdConsult.SetupOffice,
    icon: <i className="fa fa-tasks mr-2" />,
  },
  {
    title: "Reports",
    type: drop,
    icon: <i className="ri-book-line mr-2"></i>,
    drop: [
      {
        title: "Date Wise Fee Report",
        type: stat,
        route: ROUTES.AdConsult.Reports.BHA1,
      },
      {
        title: "Department Wise Fee Report",
        type: stat,
        route: ROUTES.AdConsult.Reports.departmentwiseCllection,
      },
      {
        title: "Student Admission Report",
        type: stat,
        route: ROUTES.AdConsult.Reports.StudentAdmissionReport,
      },
    ],
  },
];
