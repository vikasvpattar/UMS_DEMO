import { ROUTES } from "../../../Router/routerConfig";

const stat = "static";

let role = sessionStorage.getItem("role");

var InfoUploading;

InfoUploading = [
  {
    title: "Media",
    type: stat,
    route: ROUTES.mediaInfo,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Admission Notifications",
    type: stat,
    route: ROUTES.AdmissionNotifications,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "University Notifications",
    type: stat,
    route: ROUTES.UniversityNotifications,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Event Calendar",
    type: stat,
    route: ROUTES.EventCalendar,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Events",
    type: stat,
    route: ROUTES.homeoEvents,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Sliders",
    type: stat,
    route: ROUTES.sliders,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Academic Details",
    type: stat,
    route: ROUTES.AcademicCalendar,
    icon:  <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Achievements & Awards",
    type: stat,
    route: ROUTES.Achievements,
    icon:  <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Upload Files",
    type: stat,
    route: ROUTES.Achievements2,
    icon:  <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Gallery Photos",
    type: stat,
    route: ROUTES.PhotoGallery,
    icon:  <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Research and Publication",
    type: stat,
    route: ROUTES.ResearchandPublication,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Permission Letters",
    type: stat,
    route: ROUTES.CollegePermission,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  // {
  //   title: "College Affiliation",
  //   type: stat,
  //   route: ROUTES.CollegeAffiliation,
  //   icon: <i className="ri-folder-chart-line mr-2" />,
  // },
  {
    title: "Recruitment",
    type: stat,
    route: ROUTES.Recruitment,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Syllabus Upload",
    type: stat,
    route: ROUTES.SyllabusUpload,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Hospital Staff Attendance",
    type: stat,
    route: ROUTES.HospitalStaffAttendance,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Student Lists",
    type: stat,
    route: ROUTES.HomeopathyStudentsList,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Student Results",
    type: stat,
    route: ROUTES.HomeopathyResults,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "OPD Services",
    type: stat,
    route: ROUTES.OPDServices,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "IPD Services",
    type: stat,
    route: ROUTES.IPDServices,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Add Staff",
    type: stat,
    route: ROUTES.newStaff,
    icon: <i className="ri-folder-chart-line mr-2" />,
  }, 
  {
    title: "Add New Staff",
    type: stat,
    route: ROUTES.StaffDetailsNew,
    icon: <i className="ri-folder-chart-line mr-2" />,
  }, 
  {
    title: "Committees",
    type: stat,
    route: ROUTES.committees,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Company Details",
    type: stat,
    route: ROUTES.CompanyDetails,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Campus Placements",
    type: stat,
    route: ROUTES.StudentsPlacements,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "PCI-SIF",
    type: stat,
    route: ROUTES.PCI_SIF,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Student Details",
    type: stat,
    route: ROUTES.StudentDetails1,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
  {
    title: "Milestones",
    type: stat,
    route: ROUTES.Milestones,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },

  {
    title: "Approvals",
    type: stat,
    route: ROUTES.Approvals,
    icon: <i className="ri-folder-chart-line mr-2" />,
  },
];

let a = new Set();
InfoUploading = InfoUploading.filter((s) => {
  if (!a.has(s.title)) {
    a.add(s.title);
    return true;
  } else {
    return false;
  }
});

console.log(InfoUploading);

export { InfoUploading };
