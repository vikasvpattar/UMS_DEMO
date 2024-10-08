import React, { useState } from "react";

import FeedbackSwitches from "./FeedbacksSwitches";
import FeedbacksTeacher from "../Feedbacks/FeedbacksTeacher";
import FeedbacksCampus from "./FeedbacksCampus";
import FeedbacksCurriculum from "./FeedbacksCurriculum";


const FeedbacksHome = ({ setLoading, collegeId }) => {
    const [tab, setTab] = useState("Teachers");
    return (<>
        <div>
            <div className="main-content">
                <div className="page-content">
                <div className="container-fluid"></div>

                <FeedbackSwitches tab={tab} setTab={setTab} />
                {tab === "Teachers" && (
                    <FeedbacksTeacher
                    setLoading={setLoading}
                    collegeId={collegeId}
                    />
                )}
                {tab === "Campus" && (
                    <FeedbacksCampus
                    setLoading={setLoading}
                    collegeId={collegeId}
                    />
                )}
                {tab === "Curriculum" && (
                    <FeedbacksCurriculum
                    setLoading={setLoading}
                    collegeId={collegeId}
                    />
                )}
                </div>
            </div>
        </div>
    </>)
}

export default FeedbacksHome;