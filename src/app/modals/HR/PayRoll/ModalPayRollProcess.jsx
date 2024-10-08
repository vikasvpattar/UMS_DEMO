import axios from 'axios'
import React, { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import Toggler from '../../../Components/Toggler/Toggler'
import { PAYROLL_PAY_SLIP } from '../../../utils/apiConstants'
import ReactToPrint from 'react-to-print';
import './ModalPayRoll.scss'
import { useEffect } from 'react'

function ModalPayRollProcess({ data, id, month, year, employeeData, allData , reloadData , setLoading, collegeId}) {

    const componentRef = useRef();

    const [payment, setPayment] = useState(0)

    //object for all input values
    const [user, setUser] = useState({
        month: month,
        year: year,
        present: data.present,
        leave_without_pay: data.leave_without_pay,
        week_off: data.week_off,
        paid_holiday: data.paid_holiday,
        casual_leave: data.casual_leave,
        sick_leave: data.sick_leave,
        earning: data.earning,
        deduction: data.deduction,
        bonus: data.bonus,
        statutory_contribution: data.statutory_contribution,
        basic_salary: data.basic_salary,
        bonus_amount: data.bonus_amount,
        statutory_contribution_amount: data.statutory_contribution_amount,
        earning_amount: data.earning_amount,
        deduction_amount: data.deduction_amount,
        net_salary: data.net_salary,
        // payment_method: data.payment_method,
        // status: data.status
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
    const clearData = () => {
        setUser({
            month: '',
            year: '',
            present: '',
            leave_without_pay: '',
            week_off: '',
            paid_holiday: '',
            casual_leave: '',
            sick_leave: '',
            earning: '',
            deduction: '',
            bonus: '',
            statutory_contribution: '',
            basic_salary: '',
            bonus_amount: '',
            statutory_contribution_amount: '',
            earning_amount: '',
            deduction_amount: '',
            net_salary: '',
        })
    }

    useEffect(() => {
        setUser(
            {
                month: month,
                year: year,
                present: data.present,
                leave_without_pay: data.leave_without_pay,
                week_off: data.week_off,
                paid_holiday: data.paid_holiday,
                casual_leave: data.casual_leave,
                sick_leave: data.sick_leave,
                earning: data.earning,
                deduction: data.deduction,
                bonus: data.bonus,
                statutory_contribution: data.statutory_contribution,
                basic_salary: data.basic_salary,
                bonus_amount: data.bonus_amount,
                statutory_contribution_amount: data.statutory_contribution_amount,
                earning_amount: data.earning_amount,
                deduction_amount: data.deduction_amount,
                net_salary: data.net_salary,
            }
        )
    }, [data, month, year])

    //fuction to call after post or put
    const handleSubmit = async (d) => {

        setLoading(1)
        //config for axios
        const config = {
            method: 'post',
            url: `${PAYROLL_PAY_SLIP}/${data.employee_id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
            },
            data: {
                month: month,
                year: year,
                present: user.present,
                leave_without_pay: user.leave_without_pay,
                week_off: user.week_off,
                paid_holiday: user.paid_holiday,
                casual_leave: user.casual_leave,
                sick_leave: user.sick_leave,
                earning: user.earning,
                deduction: user.deduction,
                bonus: user.bonus,
                statutory_contribution: user.statutory_contribution,
                basic_salary: user.basic_salary,
                bonus_amount: user.bonus_amount,
                statutory_contribution_amount: user.statutory_contribution_amount,
                earning_amount: user.earning_amount,
                deduction_amount: user.deduction_amount,
                net_salary: user.net_salary,
                payment_method: d,
                college_id:collegeId
            }
        };
        console.log(config);


        // setLoading(1)
        await axios(config)
            .then((res) => {
                toast.success(res.data.message)
                console.log(res);
                reloadData()
                setLoading(0)
                reloadData()
            })
            .catch(err => {
                console.log(err);
                toast.error("Something went wrong")
                setLoading(0)
            })
    }



    return (
        <div className='ModalPayRollProcess' >
            <div
                className="modal fade"
                id={`ModalPayRollProcess-${id}`}
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered mw-100 modal-lg"
                    role="document"
                >
                    <div className="modal-content ModalPayRollProcess p-3"  >
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                                Pay Slip
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setPayment(0)}
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="page-break"></div>
                        <div className="modal-body px-5 " ref={componentRef}>
                            <div className="row">
                                <div className="col-md-4">
                                    <img src="/assets/images/favicon.png" width={200} alt="" srcset="" />

                                </div>

                                <div className="col-md-6 mb-2 ml-5 d-flex align-items-center ">
                                    <div className=" ">
                                        <h1 className='text-danger'>Swaminarayan University</h1> <br />
                                        <h3 className=''>Swaminarayan Ayurvedic College</h3>
                                    </div>


                                </div>

                                <div className="col-md-12 mb-3">
                                    <h4 className='text-center text-danger'>Salary Slip for August-2022</h4>
                                    <hr />
                                </div>

                                <div className="col-md-6">
                                    <div className="d-flex">
                                        <h5 className='mr-5'><b>Name.: </b> </h5>
                                        <h5> {employeeData?.first_name + " " + employeeData?.last_name}  </h5>

                                    </div>
                                    <div className="d-flex">
                                        <h5 className='mr-1'><b>Department.: &nbsp;</b> </h5>
                                        <h5> Computer Science</h5>

                                    </div>
                                    <div className="d-flex mt-2">
                                        <h5 className=''><b>Designation.: &nbsp;</b> </h5>
                                        <h5> Teacher</h5>

                                    </div>
                                    <div className="d-flex mt-2">
                                        <h5 className='mr-4'><b>Location.: &nbsp;</b> </h5>
                                        <h5> Hubli</h5>

                                    </div>

                                </div>
                                <div className="col-md-6">

                                    <div className="d-flex mt-2">
                                        <h5 className='mr-2'><b>Bank Name.: &nbsp;</b> </h5>
                                        <h5> State Bank of India</h5>

                                    </div>
                                    <div className="d-flex mt-2">
                                        <h5 className='mr-1'><b>Account No.: &nbsp;</b> </h5>
                                        <h5> 12072200076856</h5>

                                    </div>
                                    <div className="d-flex mt-2">
                                        <h5 className='mr-1'><b>IFSC.: &nbsp;</b> </h5>
                                        <h5> SBIN001054</h5>

                                    </div>
                                </div>


                            </div>
                            <div className="row mt-3">
                                <div className="col-12">
                                    <table className='table table-bordered'>
                                        <tr className='text-center'>
                                            <th colSpan={7}>
                                                Working Days
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>Present</th>
                                            <th>Week Off</th>
                                            <th>Paid Holiday</th>
                                            <th>C.L</th>
                                            <th>L.W.P</th>
                                            <th>S.L</th>
                                            <th>TOTAL</th>
                                        </tr>
                                        <tr>
                                            <th>
                                                <input
                                                    type="text"
                                                    name='present'
                                                    className='payInput'
                                                    value={user?.present}
                                                    onChange={handleChange}
                                                />
                                            </th>
                                            <th>
                                                <input
                                                    type="text"
                                                    name='week_off'
                                                    className='payInput'
                                                    value={user?.week_off}
                                                    onChange={handleChange}
                                                />
                                            </th>
                                            <th>
                                                <input
                                                    type="text"
                                                    name='paid_holiday'
                                                    className='payInput'
                                                    value={user?.paid_holiday}
                                                    onChange={handleChange}
                                                />
                                            </th>
                                            <th>
                                                <input
                                                    type="text"
                                                    name='casual_leave'
                                                    className='payInput'
                                                    value={user?.casual_leave}
                                                    onChange={handleChange}
                                                />
                                            </th>
                                            <th>
                                                <input
                                                    type="text"
                                                    name='leave_without_pay'
                                                    className='payInput'
                                                    value={user?.leave_without_pay}
                                                    onChange={handleChange}
                                                />
                                            </th>
                                            <th>
                                                <input
                                                    type="text"
                                                    name='sick_leave'
                                                    className='payInput'
                                                    value={user?.sick_leave}
                                                    onChange={handleChange}
                                                />
                                            </th>
                                            <th>
                                                <input
                                                    type="text"
                                                    name='total_leave'
                                                    className='payInput'
                                                    value={parseInt(user?.present) - parseInt(user?.week_off) - parseInt(user?.paid_holiday) - parseInt(user?.casual_leave) - parseInt(user?.leave_without_pay) - parseInt(user?.sick_leave)}
                                                    onChange={handleChange}
                                                />
                                            </th>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div className="row mt-3">

                                <div className="col-md-6">
                                    <table className='table table-bordered'>
                                        <tr className='text-center'>
                                            <th colSpan={3}>Earnings</th>
                                        </tr>
                                        <tr>
                                            <th>Sl. No.</th>

                                            <th>Salary Head</th>
                                            <th> Amount (Rs.)</th>
                                        </tr>

                                        <tr>
                                            <td> 1</td>
                                            <td>Basic Salary</td>
                                            <td className='text-right'>
                                                <input
                                                    type="text"
                                                    name='basic_salary'
                                                    className='payInput text-right'
                                                    value={data?.basic_salary}
                                                    onChange={handleChange}
                                                />
                                            </td>
                                        </tr>

                                        {
                                            data && data?.earning?.split(',')?.map((i, key) => (


                                                <tr>
                                                    <td>{key + 2}</td>
                                                    <td>{allData?.earning?.find(item => item.id == i)?.description}</td>
                                                    <td className='text-right'>
                                                        <input
                                                            type="text"
                                                            name='basic_salary'
                                                            className='payInput text-right'
                                                            value={allData?.earning?.find(item => item.id == i)?.amount}
                                                            onChange={handleChange}
                                                        />
                                                    </td>
                                                </tr>



                                            ))
                                        }

                                        {
                                            data && data?.bonus?.split(',')?.map((i, key) => (
                                                <tr>
                                                    <td>{data?.earning?.split(',').length + key + 2}</td>
                                                    <td>{allData?.bonus?.find(item => item.id == i)?.description}</td>
                                                    <td className='text-right'>
                                                        <input
                                                            type="text"
                                                            name='basic_salary'
                                                            className='payInput text-right'
                                                            value={allData?.bonus?.find(item => item.id == i)?.amount}
                                                            onChange={handleChange}
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                        {/* <tr>
                                            <td>{data?.earning?.split(',').length + data?.bonus?.split(',').length + 2}</td>
                                            <td>Total Addition</td>
                                            <td className='text-right'>
                                                <input
                                                    type="text"
                                                    name='basic_salary'
                                                    className='payInput text-right'
                                                    value={data?.basic_salary + data?.bonus_amount + data?.earning_amount}
                                                    onChange={handleChange}
                                                />
                                            </td>
                                        </tr> */}

                                    </table>
                                </div>

                                <div className="col-md-6">
                                    <table className='table table-bordered'>
                                        <tr className='text-center'>
                                            <th colSpan={3}>Deduction</th>
                                        </tr>
                                        <tr>
                                            <th>Sl. No.</th>

                                            <th>Salary Head</th>
                                            <th> Amount (Rs.)</th>
                                        </tr>
                                        {
                                            data && data?.deduction?.split(',')?.map((i, key) => (
                                                <tr>
                                                    <td>{key + 1}</td>
                                                    <td>{allData?.deduction?.find(item => item.id == i)?.description}</td>
                                                    <td className='text-right'>
                                                        <input
                                                            type="text"
                                                            name='basic_salary'
                                                            className='payInput text-right'
                                                            value={allData?.deduction?.find(item => item.id == i)?.amount}
                                                            onChange={handleChange}
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        {
                                            data && data?.statutory_contribution?.split(',')?.map((i, key) => (
                                                <tr>
                                                    <td>{data?.deduction?.split(',').length + key + 1}</td>
                                                    <td>{allData?.statutoryContribution?.find(item => item.id == i)?.title}</td>
                                                    <td className='text-right'>
                                                        <input
                                                            type="text"
                                                            name='basic_salary'
                                                            className='payInput text-right'
                                                            value={allData?.statutoryContribution?.find(item => item.id == i)?.employee_portion}
                                                            onChange={handleChange}
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        {/* <tr>
                                                    <td>{data?.deduction?.split(',').length + data?.statutory_contribution?.split(',').length + 1}</td>
                                                    <td>Total Deduction</td>
                                                    <td className='text-right'>
                                                        <input
                                                            type="text"
                                                            name='basic_salary'
                                                            className='payInput text-right'
                                                            value={data?.deduction_amount + data?.statutory_contribution_amount}
                                                            onChange={handleChange}
                                                        />
                                                    </td>
                                                </tr> */}
                                        
                                    </table>
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <table className='table table-bordered'>
                                        <tr>
                                            <th>TOTAL ADDITION</th>
                                            <th className="text-right">
                                                <input
                                                    type="text"
                                                    name='net_salary'
                                                    className='payInput text-right'
                                                    value={data?.basic_salary + data?.bonus_amount + data?.earning_amount}
                                                    onChange={handleChange}
                                                />
                                            </th>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <table className='table table-bordered'>
                                        <tr>
                                            <th>TOTAL DEDUCTION</th>
                                            <th className="text-right">
                                                <input
                                                    type="text"
                                                    name='net_salary'
                                                    className='payInput text-right'
                                                    value={data?.deduction_amount + data?.statutory_contribution_amount}
                                                    onChange={handleChange}
                                                />
                                            </th>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <table className='table table-bordered'>
                                        <tr>
                                            <th>NET SALARY</th>
                                            <th className="text-right">
                                                <input
                                                    type="text"
                                                    name='net_salary'
                                                    className='payInput text-right'
                                                    value={user.net_salary}
                                                    onChange={handleChange}
                                                />
                                            </th>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div className="row mt-5 text-center">
                                <div className="col-md-4 d-flex align-items-end justify-content-center">
                                    Employee Signature
                                </div>
                                <div className="col-md-8 row d-flex justify-content-center">
                                    <div className="">
                                        <div className="col-12">For, Shree Swami Narayan Vishvamangal Gurukul</div>
                                        <img src="/assets/images/signature/praveen.png" alt="" width={80} />
                                        <div className="col-12">DIGITAL SIGNATURE</div>
                                    </div>
                                </div>
                            </div>
                            <hr />

                        </div>
                        <div className={`row d-flex justify-content-end px-2`}>


                            <ReactToPrint
                                documentTitle={' '}
                                trigger={() => <button
                                    className='btn btn-success  btn-outline px-4  mr-3'
                                // data-dismiss="modal"
                                // aria-label="Close"
                                > <span className='mr-2'><i class="ri-printer-line"></i></span>
                                    Print
                                </button>}
                                content={() => componentRef.current}
                            />



                            {
                                data.status === 'PENDING'
                                    ?

                                    !payment
                                        ?
                                        <button
                                            className='btn btn-danger  btn-outline px-4'
                                            onClick={() => { setPayment(1) }}
                                        > <span className='mr-2'> + </span>
                                            Add Payment
                                        </button>
                                        :
                                        <div className='d-flex justify-content-center'>
                                            {/* <button className='btn btn-primary mr-3'>
                                                BANK
                                            </button> */}
                                            <button
                                                className='btn btn-primary mr-3'
                                                data-dismiss="modal"
                                                aria-label="Close"
                                                onClick={() => { handleSubmit("CASH") }}
                                            >
                                                CASH
                                            </button>
                                            <button
                                                className='btn btn-primary'
                                                data-dismiss="modal"
                                                aria-label="Close"
                                                onClick={() => { handleSubmit("ONLINE") }}
                                            >
                                                ONLINE
                                            </button>
                                        </div>
                                    : null


                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalPayRollProcess