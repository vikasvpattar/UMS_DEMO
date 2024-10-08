import axios from 'axios'
import React , {useState} from 'react'
import { toast } from 'react-toastify'
import Loader from '../../../../Components/Loader/Loader'
import { EMPLOYEE_ATTENDANCE } from '../../../../utils/apiConstants'
import { LOCAL_JOBROLES } from '../../../../utils/LocalStorageConstants'

function AttendanceTabelRow({sl, data , setLoading,reloadData,day, collegeId }) {


    const [remark,setRemark] = useState('')

    const jobPositionOpt = JSON.parse(localStorage.getItem(LOCAL_JOBROLES))
    
    
    const CallIntime = async() =>{
        var d = new Date().toLocaleTimeString()
        const requestData = {
            "employee_id": data.employee_id,
            "role" : data.role,
            "date": day.year+'-'+day.month+'-'+day.day,
            "in_time": d.split(':')[0]+':'+d.split(':')[1],
            "out_time": "",
            "present": 1,
            "remark" : remark,
            "absent": 0,
            "college_id": collegeId
        }
        console.log(requestData);

        const config={
            method:'post',
            url:EMPLOYEE_ATTENDANCE,
            headers: { 
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`, 
                'Content-Type': 'application/json'
              },
              data : requestData
        }

        await axios(config)
        .then((res)=>{
            console.log(res);
            toast.success("Marked In Time Successfully")
            setLoading(0)
            setRemark('')
            reloadData();
        })
        .catch(err=>{
            setLoading(0)
            toast.error("Something Went Wrong")
            console.log(err);
            setRemark('')
        })
    }
    
    const CallOutTime = async() =>{
        setLoading(1)
        var d = new Date().toLocaleTimeString()
        const requestData = {
            "employee_id": data.employee_id,
            "role" : data.role,
            "date": day.year+'-'+day.month+'-'+day.day,
            "in_time": data.in_time,
            "out_time": d.split(':')[0]+':'+d.split(':')[1],
            "present": 1,
            "remark" : remark,
            "absent": 0,
            "college_id": collegeId
        }
        
        
        const config={
            method:'put',
            url:`${EMPLOYEE_ATTENDANCE}/${data.id}`,
            headers: { 
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`, 
                'Content-Type': 'application/json'
            },
            data : requestData
        }
        
        console.log(config);
        await axios(config)
        .then((res)=>{
            console.log(res);
            toast.success("Marked Out TIme Successfully")
            setLoading(0)
            reloadData();
            setRemark('')
        })
        .catch(err=>{
            setLoading(0)
            toast.error("Something Went Wrong")
            console.log(err);
            setRemark('')
        })
    }
    
    const callAbsent = async() =>{
        if(!remark) return toast.error("Remark is Required to mark as absent")
        setLoading(1)

        const requestData = {
            "employee_id": data.employee_id,
            "role" : data.role,
            "date": day.year+'-'+day.month+'-'+day.day,
            "in_time": "",
            "out_time": "",
            "present": 0,
            "remark" : remark,
            "absent": 1,
            "college_id": collegeId
        }
        const config={
            method:'post',
            url:EMPLOYEE_ATTENDANCE,
            headers: { 
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`, 
                'Content-Type': 'application/json'
            },
            data : requestData
        }

        setRemark()

        console.log(config);
        // setLoading(0)
        await axios(config)
        .then((res)=>{
            console.log(res);
            toast.success("Marked Absent Successfully")
            setLoading(0)
            setRemark('')
            reloadData();
        })
        .catch(err=>{
            setLoading(0)
            toast.error("Something Went Wrong")
            console.log(err);
            setRemark('')
        })
    }


    return (
        // <tr>
        //     <td>
        //         Data Found
        //     </td>
        // </tr>
        <tr>
            <td>{sl + 1 }</td>
            <td>{data?.employee_id}</td>
            <td>{data?.name}</td>
            {

                data.absent
                
                ?

                <td className="text-center text-danger">
                    <h3 className="text-center text-danger">
                        ABSENT
                    </h3>

                </td>            
            :
                <td className="text-center">
                    <button type="button" className="btn btn-success btn-sm rounded mr-5 ml-5" onClick={()=>{!data.in_time&&CallIntime()}}>{data.in_time ? data.in_time : 'In Time'}</button>
                    {
                        data.in_time
                        ?
                        <button type="button" className="btn btn-primary btn-sm rounded mr-5 ml-5" onClick={()=>{CallOutTime()}}>{data.out_time ? data.out_time : 'Out Time'}</button>
                        :
                        <button type="button" className="btn btn-danger btn-sm rounded mr-5 ml-5" onClick={callAbsent}>Absent</button>
                    }
                </td>
                
                    
                        
            }
            <td>
                <input 
                type="text"
                id="note" 
                placeholder="Add Note" 
                className="form-control"
                value={remark}
                onChange={(e)=>{setRemark(e.target.value)}}
                />
            </td>
        </tr>
    )
    // return(
    //     <tr>
    //         <td colSpan={10}>

    //         Present
    //         </td>
    //     </tr>
    // )
}

export default AttendanceTabelRow