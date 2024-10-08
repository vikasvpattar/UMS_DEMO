import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { toast } from 'react-toastify';
import { PAYROLL_SALARY_ADJUST } from '../../../utils/apiConstants';
import Multiselect from 'multiselect-react-dropdown';

function ModalPayRollSalaryAdjust({ type, id, data, reloadData ,setLoading , allData, collegeId}) {

    //multiselect variables
    const [earningArray,setEarningArray] = useState([])
    const [deductionArray,setDeductionArray] = useState([])
    const [bonusArray,setBonusArray] = useState([])
    const [contributionArray,setContributionArray] = useState([])



    // console.log('datas',allData);
    //object for all input values
    const [user, setUser] = useState({
        month: '',
        year: '',
        effective_date: '',
        basic_salary: '',
        remark: '',
        earning: '',
        deduction: '',
        bonus: '',
        statutory_contribution: '',
        status: '',
    })

    //handleChange for all input fields
    const handleChange = (e) => {
        const { name, value } = e.target

        setUser(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    }

    //fuction to clear the input fields after completion of any operation
    const clearData = () =>{
        setUser({
            month: '',
            year: '',
            effective_date: '',
            basic_salary: '',
            remark: '',
            earning: '',
            deduction: '',
            bonus: '',
            statutory_contribution: '',
            status: '',
        })
        setEarningArray([])
        setBonusArray([])
        setDeductionArray([])
        setContributionArray([])
    }


    //fuction to call after post or put
    const handleSubmit = async(d) =>{


        //config for axios
        const config = {
            method: type==='edit'?'put':'post',
            url: `${PAYROLL_SALARY_ADJUST}${type==='edit'?'/'+data.id:''}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
            },
            data: {
                "employee_id": id,
                "month":user.month,
                "year":user.year,
                "effective_date":user.effective_date,
                "basic_salary":user.basic_salary,
                "remark":user.remark,
                "earning":earningArray,
                "deduction":deductionArray,
                "bonus":bonusArray,
                "statutory_contribution":contributionArray,
                "status":user.status,
                "college_id":collegeId
            }
        };
        console.log(config);
    
    
            // setLoading(1)
            await axios(config)
            .then((res)=>{
                toast.success("Success")
                console.log(res);
                // setLoading(0)
                reloadData(id)
            })
            .catch(err=>{
                console.log(err);
                toast.error("Something went wrong")
                // setLoading(0)
            })
        }

    useEffect(() => {

        if(type==='edit'){
            if(data){
                setUser({
                    month:data.month,
                    year:data.year,
                    effective_date:data.effective_date,
                    basic_salary:data.basic_salary,
                    remark:data.remark,
                    earning:data.earning,
                    deduction:data.deduction,
                    bonus:data.bonus,
                    statutory_contribution:data.statutory_contribution,
                    status:data.status,
                })
                setEarningArray(data.earning.split(','))
                setBonusArray(data.bonus.split(','))
                setDeductionArray(data.deduction.split(','))
                setContributionArray(data.statutory_contribution.split(','))
            }
        }

        if(type==='add'){
            clearData()
        }

    }, [data,type])


  return (
    <div className='ModalPayRollSalaryAdjust'>
        <div
                className="modal fade"
                id="ModalPayRollSalaryAdjust"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered mw-100 w-75"
                    role="document"
                >
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                                Add New Salary Adjustment
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Effective Date <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="effective_date"
                                            value={user.effective_date.split("T")[0]}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Basic Salary <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="basic_salary"
                                            value={user.basic_salary}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                {/* <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Currency <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <select name="" id="" className='form-control'>
                                            <option value="inr">INR</option>
                                        </select>
                                    </div>
                                </div> */}
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Remark
                                        </lable>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            name="remark"
                                            value={user.remark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Earning
                                        </lable>
                                        <Multiselect
                                        options={allData?.earning}
                                        selectedValues={allData?.earning?.filter(data => earningArray?.includes(data.id) )}
                                        onSelect={(p)=>{setEarningArray(p.map(it => it.id))}}
                                        onRemove={(p)=>{setEarningArray(p.map(it => it.id))}}
                                        displayValue={"description"}
                                        closeIcon={"cancel"}
                                        />
                                        {/* <select 
                                        name="earning" 
                                        id="" 
                                        className='form-control'
                                        value={user.earning}
                                        onChange={handleChange}
                                        >
                                            <option value="">select earning</option>
                                            {
                                                allData?.earning?.map((i,key)=>(
                                                    <option value={i.id}>{i.title}</option>
                                                ))
                                            }
                                        </select> */}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Deduction
                                        </lable>
                                        <Multiselect
                                        options={allData?.deduction}
                                        selectedValues={allData?.deduction?.filter(data => deductionArray?.includes(data.id) )}
                                        onSelect={(p)=>{setDeductionArray(p.map(it => it.id))}}
                                        onRemove={(p)=>{setDeductionArray(p.map(it => it.id))}}
                                        displayValue={"description"}
                                        closeIcon={"cancel"}
                                        />
                                        {/* <select 
                                        name="deduction"
                                        className='form-control'
                                        value={user.deduction}
                                        onChange={handleChange}
                                        >
                                            <option value="">select Deduction</option>
                                            {
                                                allData?.deduction?.map((i,key)=>(
                                                    <option value={i.id}>{i.description}</option>
                                                ))
                                            }
                                        </select> */}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Bonus
                                        </lable>
                                        <Multiselect
                                        options={allData?.bonus}
                                        selectedValues={allData?.bonus?.filter(data => bonusArray?.includes(data.id) )}
                                        onSelect={(p)=>{setBonusArray(p.map(it => it.id))}}
                                        onRemove={(p)=>{setBonusArray(p.map(it => it.id))}}
                                        displayValue={"description"}
                                        closeIcon={"cancel"}
                                        />
                                        {/* <select 
                                        name="bonus"
                                        className='form-control'
                                        value={user.bonus}
                                        onChange={handleChange}
                                        >
                                            <option value="">select Bonus</option>
                                            {
                                                allData?.bonus?.map((i,key)=>(
                                                    <option value={i.id}>{i.title}</option>
                                                ))
                                            }
                                        </select> */}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Statutory Contribution
                                        </lable>
                                        <Multiselect
                                        options={allData?.statutoryContribution}
                                        selectedValues={allData?.statutoryContribution?.filter(data => contributionArray?.includes(data.id) )}
                                        onSelect={(p)=>{setContributionArray(p.map(it => it.id))}}
                                        onRemove={(p)=>{setContributionArray(p.map(it => it.id))}}
                                        displayValue={"title"}
                                        closeIcon={"cancel"}
                                        />
                                        {/* <select 
                                        name="statutory_contribution"
                                        className='form-control'
                                        value={user.statutory_contribution}
                                        onChange={handleChange}
                                        >
                                            <option value="">select Statutory Contribution</option>
                                            {
                                                allData?.statutoryContribution?.map((i,key)=>(
                                                    <option value={i.id}>{i.title}</option>
                                                ))
                                            }
                                        </select> */}
                                    </div>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-between px-2">
                                <button 
                                className='btn btn-danger btn-rounded btn-outline'
                                data-dismiss="modal"
                                aria-label="Close"
                                >
                                    Cancel
                                </button>
                                <button 
                                className='btn btn-success btn-rounded btn-outline'
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={handleSubmit}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default ModalPayRollSalaryAdjust