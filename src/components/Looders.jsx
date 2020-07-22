import React, { useEffect, useState } from "react";
import "./Favorites.css";
import Header from "./Header";
import axios from "axios";
import Footer from "./Footer";
import { connect } from "react-redux";
import './looders.css';

const Looders = ({profil }) => {

    let profilInfo;
    if (profil) {
        profilInfo = profil.authdata.result[0];
    };

    return (
        <>
            <Header />
            {profil? (
                <div className="looders-content">
                    <p>Ces looders aiment au moins 3 plats en commun avec toi !</p>
                    <div className="looders">
                        <div className="looder_img" >
                            <img src="#" alt='looder name' />
                            <p>looder name</p>
                        </div>
                        <div className="looder_img" >
                            <img src="#" alt='looder name' />
                            <p>looder name</p>
                        </div>
                        <div className="looder_img" >
                            <img src="#" alt='looder name' />
                            <p>looder name</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>loading</p>
            )}
            <Footer name='Tes looders' />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        profil: state.auth.user,
    };
};

export default connect(mapStateToProps, null)(Looders);
