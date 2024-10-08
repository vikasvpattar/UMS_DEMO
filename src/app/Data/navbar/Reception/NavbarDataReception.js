import { ROUTES } from './../../../Router/routerConfig'


const drop = 'dropdown'
const stat = 'static'
const sheet = 'sheet'
export const navbarDataReceptionist=[
    {
        title:'Admission Enquiry',
        type:stat,
        route:ROUTES.Reception.AdmissionEnquiry,
        icon:<i className="ri-chat-smile-3-line mr-2" />
        },
        {
        title:'Visitors Book',
        type:stat,
        route:ROUTES.Reception.VisitorsBook,
        icon:<i className="ri-book-line mr-2" />
        },
        {
        title:'Phone Call Log',
        type:stat,
        route:ROUTES.Reception.PhoneCallLog,
        icon:<i className="ri-phone-line mr-2" />
        },
        {
        title:'Postal Dispatch',
        type:stat,
        route:ROUTES.Reception.PostalDispatch,
        icon:<i className="ri-mail-send-fill mr-2" />
        },
        {
        title:'Postal Receive',
        type:stat,
        route:ROUTES.Reception.PostalRecieve,
        icon:<i className="ri-mail-download-line mr-2" />
        },
        {
        title:'Complaints',
        type:stat,
        route:ROUTES.Reception.Complain,
        icon:<i className="fa fa-exclamation-triangle mr-2" />
        },
        {
        title:'Setup Office',
        type:stat,
        route:ROUTES.Reception.SetupOffice,
        icon:<i className="fa fa-tasks mr-2" />
        },
    
]