import React from "react";
import "./Connexion.css";
import { connect } from "react-redux";
import './Welcome.css';
import Header from "./Header";
import './Profile.css';
import Footer from "./Footer";

const Profil = ({profil }) => {

    let profilInfo;
    if (profil) {
        profilInfo = profil.authdata.result[0];
    };

    return (
        <>
        <Header />
        <div className="profile">
            {profil ? (
                <>
                    <img src={profilInfo.image} alt={profilInfo.pseudo} />
                    <p>{profilInfo.pseudo}</p>
                    {profilInfo.sexe === 1 ? <p>femme</p> : <p>homme</p>}
                    <p>{profilInfo.description}</p>
                    <h3>Tes plats favoris</h3>
                    <div className='favorites-food'>
                        <div className='imgfood'/>
                        <div className='imgfood'/>
                        <div className='imgfood'/>
                        <div className='imgfood'/>
                        <div className='imgfood'/>
                    </div>
                </>
            ) : (
                <p>loading</p>
            )}
        </div>
        <Footer name='Ton profil' />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        profil: state.auth.user,
    };
};

export default connect(mapStateToProps, null )(Profil);
