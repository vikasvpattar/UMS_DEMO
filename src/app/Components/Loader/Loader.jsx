import React, { useState } from 'react'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import "./Loader.scss"
import SyncLoader from "react-spinners/SyncLoader";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: var(--green);
  left: calc(50% - 75px);
  position: fixed;
`;

function Loader({ loading }) {


    let [color, setColor] = useState("#364277");

    return (
        <div>
            {loading ? <div className='loader'>
                <SyncLoader color={color} loading={true} size={30}/>
            </div> : null }

        </div>
    )
}

export default Loader