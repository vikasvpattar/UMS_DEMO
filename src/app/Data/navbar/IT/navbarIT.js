import { ROUTES } from "../../../Router/routerConfig";
import React from "react";

const stat = "static";
const drop = "dropdown";
export const navbarDataIT = [
  {
    title: "Tickets Center",
    type: stat,
    route: ROUTES.Registar.developersCentre,
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
            route: ROUTES.IT.leaveEntitlement,
          },
          {
            title: "Application",
            type: stat,
            route: ROUTES.IT.leaveApplication,
          },
          {
            title: "Schedule",
            type: stat,
            route: ROUTES.IT.leaveSchedule,
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
            route: ROUTES.IT.PayRoll,
          },
          {
            title: "Annual Statement",
            type: stat,
            route: ROUTES.IT.AnnualStatement,
          },
        ],
      },
      {
        title: "Document",
        type: stat,
        route: ROUTES.IT.documentManagement,
      },
      {
        title: "Team",
        type: drop,
        drop: [
          {
            title: "Discussion",
            type: stat,
            route: ROUTES.IT.teamDiscussion,
          },
          {
            title: "Document & Form Sharing",
            type: stat,
            route: ROUTES.IT.teamDocuments,
          },
          {
            title: "Announcement",
            type: stat,
            route: ROUTES.IT.teamAnnouncement,
          },
        ],
      },
    ],
  },
];
