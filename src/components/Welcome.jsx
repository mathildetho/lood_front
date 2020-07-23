import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "./Connexion.css";
import { connect } from "react-redux";
import { loadUser, logout } from "../actions/generalActions";
import "./Welcome.css";
import Header from "./Header";

const Welcome = ({ loadUser, logout, profil }) => {
    const useStyles = makeStyles(() => ({
        Button: {
            fontFamily: "Comfortaa",
            borderRadius: "10px",
            margin: "auto",
            marginBottom: "1rem",
            backgroundColor: "#4B4B4B",
            width: "80%",
            "&:hover": {
                background: "#4B4B4B",
            },
        },
        Button2: {
            fontFamily: "Comfortaa",
            borderRadius: "10px",
            margin: "0 auto",
            marginBottom: "1rem",
            backgroundColor: "#4B4B4B",
            "&:hover": {
                background: "#4B4B4B",
            },
        },
    }));

    useEffect(() => {
        loadUser(localStorage.getItem('token'));
    }, [loadUser]);

    const classes = useStyles();

    let profilInfo;
    if (profil) {
        profilInfo = profil.authdata.result[0];
    }

    return (
        <>
            <Header />
            <div className="welcome">
                {profil ? (
                    <>
                        <div className="welcome-intro">
                            <h3>Bonjour {profilInfo.pseudo} !</h3>
                            <Button
                                className={classes.Button2}
                                variant="contained"
                                color="primary"
                                onClick={logout}
                            >
                                Se déconnecter
                            </Button>
                        </div>
                        <div className="welcome-text">
                            <p>
                                Commençons par voir quels sont vos plats
                                favoris.
                            </p>
                            <Link
                                to={{
                                    pathname: "/questions/1",
                                    state: profil,
                                }}
                            >
                                <Button
                                    className={classes.Button}
                                    variant="contained"
                                    color="primary"
                                >
                                    Continuer
                                </Button>
                            </Link>
                        </div>
                    </>
                ) : (
                    <p>loading</p>
                )}
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        profil: state.auth.user,
    };
};

export default connect(mapStateToProps, { loadUser, logout })(Welcome);
