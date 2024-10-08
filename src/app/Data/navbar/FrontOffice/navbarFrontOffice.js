import { ROUTES } from "../../../Router/routerConfig";
const drop = "dropdown";
const stat = "static";
const sheet = "sheet";

export const navbarDataFrontOffice = [
  {
    title: "Admission Enquiry",
    type: stat,
    route: ROUTES.FrontOffice.AdmissionEnquiry,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "HR",
    type: drop,
    icon: <i className="ri-user-fill mr-2"></i>,
    drop: [
      {
        title: "Staff Attendance",
        type: stat,
        route: ROUTES.FrontOffice.Attendance,
      },

      {
        title: "Document",
        type: stat,
        route: ROUTES.FrontOffice.Document,
      },
      {
        title: "Team",
        type: drop,
        drop: [
          {
            title: "Discussion",
            type: stat,
            route: ROUTES.FrontOffice.Team.Discussion,
          },
          {
            title: "Document & Form Sharing",
            type: stat,
            route: ROUTES.FrontOffice.Team.Documents,
          },
          {
            title: "Announcement",
            type: stat,
            route: ROUTES.FrontOffice.Team.Announcement,
          },
        ],
      },
    ],
  },
  {
    title: "Leave",
    type: drop,
    drop: [
      {
        title: "Entitlement",
        type: stat,
        route: ROUTES.FrontOffice.Leave.Entitlement,
      },
      {
        title: "Application",
        type: stat,
        route: ROUTES.FrontOffice.Leave.Application,
      },
      {
        title: "Schedule",
        type: stat,
        route: ROUTES.FrontOffice.Leave.Schedule,
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
        route: ROUTES.FrontOffice.PayRoll.Salary,
      },
      {
        title: "Annual Statement",
        type: stat,
        route: ROUTES.FrontOffice.PayRoll.AnnualStatement,
      },
    ],
  },
  {
    title: "Visitor Book",
    type: stat,
    route: ROUTES.FrontOffice.VisitorsBook,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Phone Call Log",
    type: stat,
    route: ROUTES.FrontOffice.PhoneCallLog,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Postal Dispatch",
    type: stat,
    route: ROUTES.FrontOffice.PostalDispatch,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Postal Receive",
    type: stat,
    route: ROUTES.FrontOffice.PostalRecieve,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Complaints",
    type: stat,
    route: ROUTES.FrontOffice.Complain,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "SetUp Front Office",
    type: stat,
    route: ROUTES.FrontOffice.SetupOffice,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Employee Credentials",
    type: stat,
    route: ROUTES.FrontOffice.userCredentials,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
];
