/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Favorites.css";
import Header from "./Header";
import axios from "axios";
import Footer from "./Footer";
import { connect } from "react-redux";
import "./looders.css";
import { Link } from "react-router-dom";

const Looders = ({ profil }) => {
    const [foods, setFoods] = useState([]);
    const [sames, setSames] = useState([]);
    const [allUsers, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/users/${profil && profil.id}/foods`)
            .then((res) => res.data)
            .then((data) => setFoods(data));
    }, [profil]);

    useEffect(() => {
        handleFoodCommon(foods);
    }, [foods]);

    const handleFoodCommon = (foods) => {
        foods.map((food) =>
            axios
                .get(`http://localhost:5000/api/foods/${food.id}/users`)
                .then((res) => res.data)
                .then((data) => handleSameFood(data))
        );
    };

    useEffect(() => {
        const listUsers = [];
        allUsers.map(userId => axios
            .get(`http://localhost:5000/api/users/${userId}`)
            .then((res) => res.data[0])
            .then((data) => listUsers.push(data) && setSames(listUsers))
        )
    }, [allUsers])


    const handleSameFood = (data) => {
        data.filter(
            (user) => user.id !== profil.id 
        ).map((user) => allUsers.push(user.id));

        let sameUsers = [...new Set(allUsers)];
        setUsers(sameUsers);
    };

    return (
        <div className="looders-container">
            <Header />
            {sames ? (
                <div className="looders-content">
                    <p>
                        Ces looders aiment au moins 1 plat en commun avec toi !
                    </p>
                    <div className="looders">
                        {sames.length > 0 &&
                            sames.map((user) => (
                                <Link to={`/looders/${user.id}`} key={user.id} className="looder_img">
                                    <img src={user.image} alt={user.pseudo} />
                                    <p>{user.pseudo}</p>
                                </Link>
                            ))}
                    </div>
                </div>
            ) : (
                <p className="nothing">
                    Vous n'avez pas de favoris en commun avec des looders.
                </p>
            )}
            <Footer name="tes looders" />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        profil: state.auth.user.authdata && state.auth.user.authdata.result && state.auth.user.authdata.result[0],
    };
};

export default connect(mapStateToProps, null)(Looders);
