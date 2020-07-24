/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Favorites.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import axios from "axios";
import Footer from "./Footer";
import "./Looder.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Looder = (props) => {
    const { profil } = props;
    const useStyles = makeStyles(() => ({
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

    const looderId = props.match.params.id;
    const [looder, setLooder] = useState({});
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_LOCALHOST}/users/${looderId}`)
            .then((res) => res.data[0])
            .then((data) => setLooder(data));
        axios
            .get(`${process.env.REACT_APP_LOCALHOST}/users/${looderId}/foods`)
            .then((res) => res.data)
            .then((data) => setFoods(data));
    }, [looderId]);

    console.log(looder)
    return (
        <div className="looders-container">
            <Header />
            <div className="profile">
                {looder ? (
                    <>
                        {profil && (
                            <Link
                                to={{
                                    pathname: `/chat?pseudo=${
                                        profil.pseudo
                                    }&room=room${looder.id + profil.id}`,
                                    state: looder,
                                }}
                            >
                                <Button
                                    className={classes.Button}
                                    variant="contained"
                                    color="primary"
                                    href="/chat"
                                >
                                    Envoyer un message
                                </Button>
                            </Link>
                        )}
                        <img src={looder.image} alt={looder.pseudo} />
                        {looder.sexe === 1 ? <p>femme</p> : <p>homme</p>}
                        <p>{looder.description}</p>
                        {foods.length > 0 && (
                            <>
                                <h3>Ses plats favoris</h3>
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
            <Footer name={looder ? looder.pseudo : looder} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        profil:
            state.auth.user &&
            state.auth.user.authdata.result &&
            state.auth.user.authdata.result[0],
    };
};

export default connect(mapStateToProps, null)(Looder);
