import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import woman from "../img/woman.svg";
import man from "../img/man.svg";
import looders from '../img/looders.svg';
import './Header.css';

const Header = ({ profil }) => {
    let profilInfo;
    if (profil) {
        profilInfo = profil.authdata.result[0];
    }

    return (
        <div className="header">
            {profil ? (
                <Link to="/profil">
                    <img
                        src={profilInfo.sexe === 1 ? woman : man}
                        alt="profil"
                    />
                </Link>
            ) : (
                <img src={man} alt="profil" />
            )}
            <Link to="/home">
                <h1>lood</h1>
            </Link>
            <Link to="/looders">
                <img src={looders} alt='looders' />
            </Link>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        profil: state.auth.user,
    };
};

export default connect(mapStateToProps, null)(Header);
