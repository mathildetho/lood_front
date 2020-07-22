import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "./Connexion.css";

const Home = () => {
    const useStyles = makeStyles((theme) => ({
        Button: {
            fontFamily: "Comfortaa",
            borderRadius: "10px",
            marginBottom: "1rem",
            backgroundColor: "#252525",
            width: "100%",
            "&:hover": {
                background: "#252525",
            },
        },
    }));

    const classes = useStyles();

    return (
        <div className="home">
            <div className="home-intro">
                <p>
                    <strong>Bienvenue sur lood.</strong>
                </p>
                <p>Ici, vous pouvez trouver votre âme soeur de la food.</p>
            </div>
            <div className="register homechoice">
                <h1>lood</h1>
                <Link to="/connexion">
                    <Button
                        className={classes.Button}
                        variant="contained"
                        color="primary"
                    >
                        Se connecter
                    </Button>
                </Link>
                <Link to="/inscription">
                    <Button
                        className={classes.Button}
                        variant="contained"
                        color="primary"
                    >
                        S'inscrire
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
