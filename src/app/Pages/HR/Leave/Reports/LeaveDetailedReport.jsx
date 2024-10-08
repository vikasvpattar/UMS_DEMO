import React, { useEffect, useState } from 'react'
import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import { Http } from '../../../../Services/Services'
import { LEAVE_LEAVE_REPORT } from '../../../../utils/apiConstants'
import { toast } from 'react-toastify'
import moment from 'moment'

const LeaveDetailedReport = ({setLoading, collegeId}) => {

    // const groups = [{ id: 1, title: 'group 1' }, { id: 2, title: 'group 2' }]

    // const items = [
    //     {
    //         id: 1,
    //         group: 1,
    //         title: 'item 1',
    //         start_time: moment(),
    //         end_time: moment().add(1, 'hour')
    //     },
    //     {
    //         id: 2,
    //         group: 2,
    //         title: 'item 2',
    //         start_time: moment().add(-0.5, 'hour'),
    //         end_time: moment().add(0.5, 'hour')
    //     },
    //     {
    //         id: 3,
    //         group: 1,
    //         title: 'item 3',
    //         start_time: moment().add(2, 'hour'),
    //         end_time: moment().add(3, 'hour')
    //     }
    // ]

    const [groups, setGroups] = useState([])
    const [items, setItems] = useState([])

    const getData = async() => {
        setLoading(true)
        await Http.get(`${LEAVE_LEAVE_REPORT}?college_id=${collegeId}`)
        .then(res=>{
            const d = res.data.data
            const empSet = new Set();
            for (const i of d) {
                empSet.add(i.employee_id)
            }
            const gps = Array.from(empSet).map((i,key)=>({id:i, title:d.find(s=>s.employee_id==i)?.first_name+" "+d.find(s=>s.employee_id==i)?.last_name}))
            const itms = d.map((i,key)=>({
                id:i.leave_application_id,
                group:i.employee_id,
                title:i.leave_type+" - "+i.from_date?.split("T")[0]+" to "+i.to_date?.split("T")[0]+ " (" + (i?.reason?i?.reason:"reason not mentioned")+")",
                start_time:moment(i.from_date?.split("T")[0]),
                end_time:i.from_date==i.to_date?moment(i.to_date?.split("T")[0]).add(24, "hours"):moment(i.to_date?.split("T")[0]),
                tip: i?.reason?i?.reason:"reason not mentioned"
            }))

            setGroups(gps)
            setItems(itms)

        })
        .catch(err=>{
            toast.error(err.message || "Error while fetching reports")
        })
        setLoading(false)
    }


    useEffect(()=>{
        getData()
    },[])

    return (
        <div>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <h6 className="card-header">
                                    Leave Detailed Report
                                </h6>
                            </div>
                        </div>
                        <div className="mt-5 row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body">
                                        <Timeline
                                            groups={groups}
                                            items={items}
                                            defaultTimeStart={moment()}
                                            defaultTimeEnd={moment()}
                                            canMove={false}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeaveDetailedReport