import { ROUTES } from "../../../Router/routerConfig";
import React from "react";

const stat = "static";
const drop = "dropdown";

function calculate(role) {
  let navbarDataLib = [
    // ... other options ...
    {
      title: "Library Dashboard",
      type: stat,
      route: ROUTES.Library.Dashboard,
      icon: <i className="ri-folder-chart-line mr-2" />,
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
              route: ROUTES.Library.leaveEntitlement,
            },
            {
              title: "Application",
              type: stat,
              route: ROUTES.Library.leaveApplication,
            },
            {
              title: "Schedule",
              type: stat,
              route: ROUTES.Library.leaveSchedule,
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
              route: ROUTES.Library.PayRoll,
            },
            {
              title: "Annual Statement",
              type: stat,
              route: ROUTES.Library.AnnualStatement,
            },
          ],
        },
        {
          title: "Document",
          type: stat,
          route: ROUTES.Library.documentManagement,
        },
        {
          title: "Team",
          type: drop,
          drop: [
            {
              title: "Discussion",
              type: stat,
              route: ROUTES.Library.teamDiscussion,
            },
            {
              title: "Document & Form Sharing",
              type: stat,
              route: ROUTES.Library.teamDocuments,
            },
            {
              title: "Announcement",
              type: stat,
              route: ROUTES.Library.teamAnnouncement,
            },
          ],
        },
      ],
    },
    {
      title: "Books",
      type: stat,
      route: ROUTES.Library.Books,
      icon: <i className="ri-book-3-line mr-2" />,
    },
    {
      title: "Search Book",
      type: stat,
      route: ROUTES.Library.SearchBook,
      icon: <i className="ri-book-3-line mr-2" />,
    },
    {
      title: "Borrow/Return",
      type: stat,
      route: ROUTES.Library.Borrow,
      icon: <i className="ri-book-2-line mr-2" />,
    },
    {
      title: "Reports",
      type: stat,
      route: ROUTES.Library.Reports,
      icon: <i className="ri-book-open-line mr-2" />,
    },
    {
      title: "Settings",
      type: stat,
      route: ROUTES.Library.Library_Settings,
      icon: <i className="ri-tools-fill mr-2" />,
    },
    {
      title: "Ebook",
      type: stat,
      route: ROUTES.Library.Ebook,
      icon: <i className="ri-smartphone-line mr-2" />,
    },
    {
      title: "User's Log",
      type: stat,
      route: ROUTES.Library.UserLogs,
      icon: <i className="ri-user-add-fill mr-2" />,
    },
  ];

  if (role != "LIB") {
    navbarDataLib = [
      ...navbarDataLib,
      {
        title: "UMS Dashboard",
        type: stat,
        route:
          sessionStorage.getItem("role") == "ADMIN"
            ? ROUTES.Principal.dashboard
            : sessionStorage.getItem("role") == "SUPERADMIN"
            ? ROUTES.Registar.dashboard
            : null,
        icon: <i className="ri-folder-chart-line mr-2" />,
      },
    ];
  }
  return navbarDataLib;
}

export const navbarDataLib = calculate(sessionStorage.getItem("role"));
