import React from 'react'
import {useLocation} from 'react-router-dom'
import { college_footer_title, company_footer_href, company_footer_title } from '../../Data/main';

function Footer() {

    const location = useLocation();

    return (location.pathname!=='/login'&&
        <footer className="footer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">© {college_footer_title}</div>
                    <div className="col-sm-6">
                        <div className="text-sm-right d-none d-sm-block">
                            Crafted with <i className="mdi mdi-heart text-danger" /> by{" "}
                            <a href={company_footer_href} target="_blank">
                                {company_footer_title}.
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer