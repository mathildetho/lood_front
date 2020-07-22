import React from "react";
import './Footer.css';

const Footer = ({name}) => {
    return (
        <div className="footer">
            <h2>{name}</h2>
        </div>
    );
};

export default Footer;
