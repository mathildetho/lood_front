import React from "react";

import "./InfoBar.css";

const InfoBar = ({ pseudoLooder, room }) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <h3>{pseudoLooder}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/looders">
                <p>close</p>
            </a>
        </div>
    </div>
);

export default InfoBar;
