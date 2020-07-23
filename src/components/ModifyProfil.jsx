import React, { useState, useEffect } from "react";
import "./Connexion.css";
import { connect } from "react-redux";
import "./Welcome.css";
import Header from "./Header";
import "./Profile.css";
import Footer from "./Footer";
import { updateUser, login } from "../actions/generalActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";

const ModifyProfil = ({ updateUser, login, profil, history }) => {
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

    const [newInfo, setNewInfo] = useState({
        pseudo: "",
        description: "",
        sexe: 1,
        image: "",
        password: "",
    });
    const [identity, setIdentity] = useState({
        pseudo: '',
        password: '',
    });

    useEffect(() => {
        if (profil) {
            setNewInfo({
                pseudo: profil.pseudo,
                description: profil.description,
                sexe: profil.sexe,
                image: profil.image,
                password: profil.password,
            });
        }
    }, [profil]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        updateUser(profil.id, newInfo);
        setIdentity({
            pseudo: newInfo.pseudo,
            password: newInfo.password
        })
        login(identity);
        history.push('/home');
    };

    return (
        <>
            <Header />
            <div className="profile">
                {profil ? (
                    <>
                        <img src={profil.image} alt={profil.pseudo} />

                        <TextField
                            id="pseudo"
                            label="pseudo"
                            value={newInfo.pseudo}
                            onChange={(e) => {
                                const { value } = e.target;
                                setNewInfo((prevState) => {
                                    return { ...prevState, pseudo: value };
                                });
                            }}
                            variant="filled"
                            className={classes.root}
                        />
                        <FormLabel className={classes.radio} component="legend">
                            Sexe
                        </FormLabel>
                        <RadioGroup
                            row
                            className={classes.radio}
                            aria-label="sexe"
                            name="sexe"
                            value={String(profil.sexe)}
                            onChange={(e) => {
                                const { value } = e.target;
                                setNewInfo((prevState) => {
                                    return { ...prevState, sexe: value };
                                });
                            }}
                            variant="filled"
                        >
                            <FormControlLabel
                                value="1"
                                control={<Radio />}
                                label="femme"
                            />
                            <FormControlLabel
                                value="0"
                                control={<Radio />}
                                label="homme"
                            />
                        </RadioGroup>
                        <TextField
                            id="description"
                            label="description"
                            multiline
                            rows={4}
                            value={newInfo.description}
                            onChange={(e) => {
                                const { value } = e.target;
                                setNewInfo((prevState) => {
                                    return { ...prevState, description: value };
                                });
                            }}
                            variant="filled"
                            className={classes.root}
                        />
                        <TextField
                            id="login-password"
                            label="mot de passe"
                            type="password"
                            onChange={(e) => {
                                const { value } = e.target;
                                setNewInfo((prevState) => {
                                    return { ...prevState, password: value };
                                });
                            }}
                            autoComplete="current-password"
                            variant="filled"
                            className={classes.root}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.Button}
                            onClick={(e) => handleOnSubmit(e)}
                        >
                            Modifier
                        </Button>
                    </>
                ) : (
                    <p>loading</p>
                )}
            </div>
            <Footer name="Modifier ton profil" />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        profil:
            state.auth.user &&
            state.auth.user.authdata.result &&
            state.auth.user.authdata.result[0],
    };
};

export default connect(mapStateToProps, { updateUser, login })(ModifyProfil);
