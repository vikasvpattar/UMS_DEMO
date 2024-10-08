import { ROUTES } from "./../../../Router/routerConfig";

const drop = "dropdown";
const stat = "static";
const sheet = "sheet";
export const navbarDataAccountant = [
  {
    title: "Dashboard",
    type: stat,
    route: ROUTES.Accountant.Dashboard,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  // {
  //   title: "Student Details",
  //   type: stat,
  //   route: ROUTES.Accountant.StudentDetails,
  //   icon: <i className="ri-folder-chart-line mr-2" />,
  // },
  {
    title: "Student Details",
    type: stat,
    route: ROUTES.Accountant.AssignHostelStudents,
    icon: <i className="ri-folder-chart-line mr-2" />,
},
  {
    title: "Collect Fee",
    type: stat,
    route: ROUTES.Accountant.CollectFee,
    icon: <i className="ri-hand-coin-line mr-2" />,
  },
  {
    title: "Search Due Fees",
    type: stat,
    route: ROUTES.Accountant.SearchDue,
    icon: <i className="ri-search-2-line mr-2" />,
  },
  {
    title: "Fee Master",
    type: stat,
    route: ROUTES.Accountant.FeeMaster,
    icon: <i className="ri-vip-crown-line mr-2" />,
  },
  {
    title: "Fee Amount",
    type: stat,
    route: ROUTES.Accountant.FeeTypeAmount,
    icon: <i className="ri-price-tag-3-line mr-2" />,
  },
  {
    title: "Fee Discount",
    type: stat,
    route: ROUTES.Accountant.FeeDiscount,
    icon: <i className="ri-percent-line mr-2" />,
  },
  {
    title: "Fee Type",
    type: stat,
    route: ROUTES.Accountant.FeeType,
    icon: <i className="ri-copper-coin-line mr-2" />,
  },
  {
    title: "Fee Group",
    type: stat,
    route: ROUTES.Accountant.FeeGroup,
    icon: <i className="ri-currency-fill mr-2" />,
  },
  {
    title: "Reports",
    type: stat,
    route: ROUTES.Accountant.Reports,
    icon: <i className="ri-currency-fill mr-2" />,
  },
  {
    title: "Transport",
    type: drop,
    icon: <i className="ri-bus-line mr-2" />,
    drop: [
      {
        title: "Transport Fees",
        type: stat,
        route: ROUTES.Accountant.Transport.transportFee,
      },
        
   
      {
        title: " Assign Pickup Points",
        type: stat,
        route: ROUTES.Accountant.Transport.AssignPickupPoints,
      },
      {
        title: "Pickup Points",
        type: stat,
        route: ROUTES.Accountant.Transport.pickupPoints,
      },
      {
        title: "Assign Vehicles",
        type: stat,
        route: ROUTES.Accountant.Transport.AssignVehicles,
      },
      {
        title: "Routes",
        type: stat,
        route: ROUTES.Accountant.Transport.Route,
      },
      
      {
        title: "Vehicles",
        type: stat,
        route: ROUTES.Accountant.Transport.Vehicles,
      },
    ],
  },
  {
    title: "Hostel",
    type: drop,
    icon: <i className="ri-hotel-bed-line mr-2" />,
    drop: [
      {
        title: "Hostel Rooms",
        type: stat,
        route: ROUTES.Accountant.Hostel.HostelRooms,
      },
      {
        title: "Room Type",
        type: stat,
        route: ROUTES.Accountant.Hostel.RoomType,
      },
      {
        title: "Hostel",
        type: stat,
        route: ROUTES.Accountant.Hostel.Hostel,
      },
      {
        title: "Hostel Fees",
        type: stat,
        route: ROUTES.Accountant.Hostel.hostelFee,
      },
      {
        title: "Hostel Floors",
        type: stat,
        route: ROUTES.Accountant.Hostel.HostelFloors,
      },
    ],
  },
];
