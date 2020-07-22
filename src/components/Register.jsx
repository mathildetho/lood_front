import React, { useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import "./Connexion.css";
import axios from "axios";
import { connect } from "react-redux";
import { register } from "../actions/generalActions";
import { Link } from "react-router-dom";

const Register = ({ register }) => {
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

    // storing the uploaded file
    const [file, setFile] = useState("");
    // storing the received file from back
    const [, getFile] = useState({ name: "", path: "" });
    // accesing input element
    const el = useRef();

    const handleChange = (e) => {
        // accesing file
        const file = e.target.files[0];
        // storing file
        setFile(file);
        setUser((prevState) => {
            return {
                ...prevState,
                image: "http://localhost:5000/" + file.name,
            };
        });
    };

    const [user, setUser] = useState({
        pseudo: "",
        description: "",
        image: "",
        sexe: 1,
        password: "",
    });

    const createUser = (e) => {
        e.preventDefault();
        register(user);

        const uploadImage = new FormData();
        // appending file
        uploadImage.append("file", file);
        axios
            .post("http://localhost:5000/upload", uploadImage)
            .then((res) =>
                getFile({
                    name: res.data.name,
                    path: "http://localhost:5000" + res.data.path,
                })
            )
            .catch((err) => console.log(err));
    };

    return (
        <div className="register">
            <Link to="/"><h1>lood</h1></Link>
            <label htmlFor="file" className="label-file">
                Choisir une image
            </label>
            <input
                id="file"
                className="input-file"
                type="file"
                ref={el}
                onChange={handleChange}
            />
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
            <FormLabel className={classes.radio} component="legend">
                Sexe
            </FormLabel>
            <RadioGroup
                row
                className={classes.radio}
                aria-label="sexe"
                name="sexe"
                value={String(user.sexe)}
                onChange={(e) => {
                    const { value } = e.target;
                    setUser((prevState) => {
                        return { ...prevState, sexe: value };
                    });
                }}
                variant="filled"
            >
                <FormControlLabel value="1" control={<Radio />} label="femme" />
                <FormControlLabel value="0" control={<Radio />} label="homme" />
            </RadioGroup>
            <TextField
                id="description"
                label="description"
                multiline
                rows={4}
                onChange={(e) => {
                    const { value } = e.target;
                    setUser((prevState) => {
                        return { ...prevState, description: value };
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
            <Link to="/connexion">
                <Button
                    className={classes.Button}
                    variant="contained"
                    color="primary"
                    onClick={createUser}
                >
                    Créer
                </Button>
            </Link>
        </div>
    );
};

export default connect(null, { register })(Register);
