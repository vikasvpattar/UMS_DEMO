import React, { useState } from 'react'
import ContentSetupOffice from './ContentSetupOffice'
import './SetupOffice.scss'
import SwitcherSetupOffice from './SwitcherSetupOffice'

function SetupOffice({setLoading}) {

    const [tab,setTab] = useState(1)
    const contentData = {
        pupose:{
            title:'Purpose',
            listTitle:'PurposeList',
            inputFormPlaceHolder:'Add purpose',
            listData:[

            ]
        },
        complainType:{
            title:'Complain Type',
            listTitle:'Complain Type',
            inputFormPlaceHolder:'Add Complain Type',
            listData:[
                {
                    name:'Complain Type',
                    description:'Description1'
                },
                {
                    name:'Complain Type',
                    description:'Description2'
                },
                {
                    name:'Complain Type',
                    description:'Description3'
                },
            ]
        },
        source:{
            title:'Source',
            listTitle:'Source List',
            inputFormPlaceHolder:'Add Sources',
            listData:[
                {
                    name:'Source',
                    description:'Description1'
                },
                {
                    name:'Source',
                    description:'Description2'
                },
                {
                    name:'Source',
                    description:'Description3'
                },
            ]
        },
        references:{
            title:'References',
            listTitle:'References List',
            inputFormPlaceHolder:'Add References Name',
            listData:[
                {
                    name:'References1',
                    description:'Description1'
                },
                {
                    name:'References2',
                    description:'Description2'
                },
                {
                    name:'References3',
                    description:'Description3'
                },
            ]
        },
    }
    return (
        <div className='SetupOffice'>
            <div class="main-content">

                <div class="page-content">
                    <div class="container-fluid">
                        {/* start page title */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Setup Office</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">
                                                <a href="javascript: void(0);">Setup Office</a>
                                            </li>
                                            {/* <li class="breadcrumb-item active">Checkout</li> */}
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* end page title */}

                        <SwitcherSetupOffice setTab={setTab}/>
                        {tab===1&&<ContentSetupOffice contentData={contentData.pupose} setLoading={setLoading}/>}
                        {tab===2&&<ContentSetupOffice contentData={contentData.complainType} setLoading={setLoading}/>}
                        {tab===3&&<ContentSetupOffice contentData={contentData.source} setLoading={setLoading}/>}
                        {tab===4&&<ContentSetupOffice contentData={contentData.references} setLoading={setLoading}/>}
                        

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SetupOffice