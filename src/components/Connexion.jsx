import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import "./Connexion.css";

import { connect } from "react-redux";
import { login } from "../actions/generalActions";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";


const Connexion = ({ login, isAuthenticated }) => {
    const useStyles = makeStyles((theme) => ({
        Button: {
            fontFamily: "Comfortaa",
            borderRadius: "10px",
            backgroundColor: "#252525",
            "&:hover": {
                background: "#252525",
            },
        },
        root: {
            display: "flex",
            flexDirection: "column",
            "& > *": {
                margin: theme.spacing(1),
            },
            "& label.Mui-focused": {
                color: "#fff",
            },
            "& .MuiFilledInput-underline:after": {
                display: "none",
            },
            "& .MuiFilledInput-underline:before": {
                display: "none",
            },
            "& .MuiFilledInput-input": {
                backgroundColor: "#4B4B4B",
                borderRadius: "10px",
            },
            "& .MuiFilledInput-multiline": {
                backgroundColor: "#4B4B4B",
                borderRadius: "10px",
            },
            "& .MuiFormLabel-root": {
                color: "#fff",
            },
            "& .MuiInputBase-root": {
                color: "#fff",
            },
        },
        radio: {
            color: "rgba(0, 0, 0, 0.54)",
            width: "100%",
            margin: "8px",
            "& label.Mui-focused": {
                color: "#4B4B4B",
            },
            "& .MuiFormControl-root": {
                margin: "0.6rem",
                width: "100%",
            },
            "& .MuiFormControlLabel-root": {
                marginRight: "1rem",
                width: "auto",
            },
            "& .MuiRadio-root": {
                color: "#4B4B4B",
            },
        },
    }));

    const classes = useStyles();

    const [user, setUser] = useState({
        pseudo: "",
        password: "",
    });

    const loginUser = (e) => {
        e.preventDefault();
        login(user);
    };

    return (
        <>
            {isAuthenticated ? (
                <Redirect to="/home" user={user} />
            ) : (
                <div className="register">
                    <Link to="/">
                        <h1>lood</h1>
                    </Link>
                    <TextField
                        id="pseudo"
                        label="pseudo"
                        onChange={(e) => {
                            const { value } = e.target;
                            setUser((prevState) => {
                                return { ...prevState, pseudo: value };
                            });
                        }}
                        variant="filled"
                        className={classes.root}
                    />
                    <TextField
                        id="login-password"
                        label="Mot de passe"
                        type="password"
                        onChange={(e) => {
                            const { value } = e.target;
                            setUser((prevState) => {
                                return { ...prevState, password: value };
                            });
                        }}
                        autoComplete="current-password"
                        variant="filled"
                        className={classes.root}
                    />
                    <Button
                        className={classes.Button}
                        variant="contained"
                        color="primary"
                        onClick={loginUser}
                    >
                        Se connecter
                    </Button>
                </div>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};

export default connect(mapStateToProps, { login })(Connexion);
