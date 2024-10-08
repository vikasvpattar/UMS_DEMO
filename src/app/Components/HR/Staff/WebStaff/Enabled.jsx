import React from 'react'

function Enabled(props) {
    const enabledArray=[
        {
            name:'Manju',
            job:'Developer',
            email:'manju@nexenstial.com',
        },
        {
            name:'Venkatesh',
            job:'DevOps',
            email:'venkatesh@nexenstial.com',
        },
        {
            name:'Abhishek',
            job:'Designer',
            email:'abhishek@nexenstial.com',
        },
    ]

  return (
    <div className='Enabled'>
        <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                {" "}
                                <div className="col-4">
                                    <h4 className="card-title">{props.tab}</h4>
                                </div>
                            </div>

                            <hr />
                            <br />

                            <div className="row">
                                <div className="row px-5 w-100 gap-5">
                                        {
                                            enabledArray.map((i,key)=>(
                                                <div
                                                className="col-12 crd rowData"
                                                key={key}
                                                >
                                                    <div className="rounded border card-default card cursor-pointer">
                                                        <div className="row p-3">
                                                            <div className="col-10 row">
                                                                <div className="col-12">
                                                                    {i.name}
                                                                </div>
                                                                <div className="col-12">
                                                                    {i.job}
                                                                </div>
                                                                <div className="col-12">
                                                                    {i.email}
                                                                </div>
                                                            </div>
                                                            <div className="col-2">
                                                                <button
                                                                className='btn btn-danger btn-rounded btn-outline float-right'
                                                                >
                                                                    Disable
                                                                </button>
                                                            </div>
                                                        </div>  
                                                    </div>
                                                </div>
                                            ))
                                        }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Enabled