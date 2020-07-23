import React, { useEffect, useState } from "react";
import "./Connexion.css";
import { connect } from "react-redux";
import "./Welcome.css";
import Header from "./Header";
import "./Profile.css";
import Footer from "./Footer";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const Profil = ({ profil }) => {
    const useStyles = makeStyles((theme) => ({
        Button: {
            fontFamily: "Comfortaa",
            borderRadius: "10px",
            marginTop: "1rem",
            marginBottom: "1rem",
            backgroundColor: "#252525",
            width: "100%",
            "&:hover": {
                background: "#252525",
            },
        },
    }));

    const classes = useStyles();

    const [foods, setFoods] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/users/${profil && profil.id}/foods`)
            .then((res) => res.data)
            .then((data) => setFoods(data));
    }, [profil]);

    return (
        <>
            <Header />
            <div className="profile">
                {profil ? (
                    <>
                        <Button
                            className={classes.Button}
                            variant="contained"
                            color="primary"
                            href='/profil/modify'
                        >
                            Modifier
                        </Button>
                        <img src={profil.image} alt={profil.pseudo} />
                        <p>{profil.pseudo}</p>
                        {profil.sexe === 1 ? <p>femme</p> : <p>homme</p>}
                        <p>{profil.description}</p>
                        {foods.length > 0 && (
                            <>
                                <h3>Tes plats favoris</h3>
                                <div className="favorites-food">
                                    {foods.map((food) => (
                                        <img
                                            className="imgfood"
                                            key={food.id}
                                            src={food.image}
                                            alt={food.name}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <p>loading</p>
                )}
            </div>
            <Footer name="ton profil" />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        profil:
            state.auth.user.authdata &&
            state.auth.user.authdata.result &&
            state.auth.user.authdata.result[0],
    };
};

export default connect(mapStateToProps, null)(Profil);
