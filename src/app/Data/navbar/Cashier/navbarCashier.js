import { ROUTES } from "../../../Router/routerConfig";
import React from "react";

const stat = "static";
const drop = "dropdown";

export const navbarCashier = [
  {
    title: "Dashboard",
    type: stat,
    route: ROUTES.Cashier.Dashboard,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Student Details",
    type: stat,
    route: ROUTES.Cashier.StudentDetails,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Collect Fee",
    type: stat,
    route: ROUTES.Cashier.CollectFee,
    icon: <i className="ri-hand-coin-line mr-2" />,
  },
  {
    title: "Search Due Fees",
    type: stat,
    route: ROUTES.Cashier.SearchDue,
    icon: <i className="ri-search-2-line mr-2" />,
  },
  {
    title: "Reports",
    type: stat,
    route: ROUTES.Cashier.Reports,
    icon: <i className="ri-currency-fill mr-2" />,
  },
  {
    title: "Transport Fees",
    type: stat,
    icon: <i className="ri-bus-line mr-2" />,
    route: ROUTES.Cashier.transportFee,
  },
  {
    title: "Hostel Fees",
    type: stat,
    icon: <i className="ri-hotel-bed-line mr-2" />,
    route: ROUTES.Cashier.hostelFee,
  },
];
