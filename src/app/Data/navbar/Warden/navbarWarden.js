import { ROUTES } from "../../../Router/routerConfig";

const stat = "static";

let role = sessionStorage.getItem("role");

var InfoWarden;

InfoWarden = [
    {
        title: "Student Details",
        type: stat,
        route: ROUTES.Warden.AssignHostelStudents,
        icon: <i className="ri-folder-chart-line mr-2" />,
    },
    {
      title: "Hostel Rooms",
      type: stat,
      route: ROUTES.Warden.HostelRooms,
      icon: <i className="ri-folder-chart-line mr-2" />,
    },
    {
      title: "Hostel Fees",
      type: stat,
      route: ROUTES.Warden.HostelFees,
      icon: <i className="ri-folder-chart-line mr-2" />,
    },
    {
        title: "Room Type",
        type: stat,
        route: ROUTES.Warden.RoomType,
        icon: <i className="ri-folder-chart-line mr-2" />,
      },
      {
        title: "Hostel",
        type: stat,
        route: ROUTES.Warden.Hostel,
        icon: <i className="ri-folder-chart-line mr-2" />,
      },
      {
        title: "Hostel Floors",
        type: stat,
        route: ROUTES.Warden.HostelFloors,
        icon: <i className="ri-folder-chart-line mr-2" />,
      },
      {
        title: "Bed List",
        type: stat,
        route: ROUTES.Warden.HostelBeds,
        icon: <i className="ri-folder-chart-line mr-2" />,
      }
];

let a = new Set();
InfoWarden = InfoWarden.filter((s) => {
  if (!a.has(s.title)) {
    a.add(s.title);
    return true;
  } else {
    return false;
  }
});

console.log(InfoWarden);

export { InfoWarden };

// export const InfoWarden = role == "WARDEN" ? [
//     {
//         title: "Student Details",
//         type: stat,
//         route: ROUTES.Warden.StudentDetails,
//         icon: <i className="ri-folder-chart-line mr-2" />,
//     },
//     {
//       title: "Hostel Rooms",
//       type: stat,
//       route: ROUTES.Warden.HostelRooms,
//       icon: <i className="ri-folder-chart-line mr-2" />,
//     },
//     {
//       title: "Hostel Fees",
//       type: stat,
//       route: ROUTES.Warden.HostelFees,
//       icon: <i className="ri-folder-chart-line mr-2" />,
//     },
//     {
//         title: "Room Type",
//         type: stat,
//         route: ROUTES.Warden.RoomType,
//         icon: <i className="ri-folder-chart-line mr-2" />,
//       },
//       {
//         title: "Hostel",
//         type: stat,
//         route: ROUTES.Warden.Hostel,
//         icon: <i className="ri-folder-chart-line mr-2" />,
//       },
//       {
//         title: "Hostel Floors",
//         type: stat,
//         route: ROUTES.Warden.HostelFloors,
//         icon: <i className="ri-folder-chart-line mr-2" />,
//       },
      
//   ] : [];