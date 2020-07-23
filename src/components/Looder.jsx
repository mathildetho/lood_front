/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Favorites.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import axios from "axios";
import Footer from "./Footer";
import "./Looder.css";

const Looder = (props) => {
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

    const looderId = props.match.params.id;
    const [looder, setLooder] = useState({});
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/users/${looderId}`)
            .then((res) => res.data[0])
            .then((data) => setLooder(data));
        axios
            .get(`http://localhost:5000/api/users/${looderId}/foods`)
            .then((res) => res.data)
            .then((data) => setFoods(data));
    }, [looderId]);

    return (
        <div className="looders-container">
            <Header />
            <div className="profile">
                {looder ? (
                    <>
                        <Button
                            className={classes.Button}
                            variant="contained"
                            color="primary"
                        >
                            Envoyer un message
                        </Button>
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

export default Looder;
