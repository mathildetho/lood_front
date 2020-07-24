import React, { useEffect, useState } from "react";
import "./Favorites.css";
import Header from "./Header";
import like from "../img/like.svg";
import dislike from "../img/dislike.svg";
import Axios from "axios";
import { connect } from "react-redux";

const Favorites = (props) => {
    const [food, setFood] = useState({});
    const [foods, setFoods] = useState([]);
    const [lengthFood, setLength] = useState(1);
    const [foodUser, setFoodUser] = useState([]);
    const [noFoodUser, setNoFoodUser] = useState([]);

    const idfood = props.match.params.id;

    let user = props.user;
    let userInfo;
    if (user) {
        userInfo = user.authdata.result[0];
    }

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_LOCALHOST}/foods`)
            .then((res) => res.data)
            .then((data) => setFoods(data));
    }, []);

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_LOCALHOST}/foods/${idfood}`)
            .then((res) => res.data[0])
            .then((data) => setFood(data));
    }, [idfood]);

    useEffect(() => {
        setLength(foods.length);
    }, [foods]);

    useEffect(() => {
        // if jointure favorite food-user exist
        Axios.get(
            `${process.env.REACT_APP_LOCALHOST}/users/${userInfo.id}/foods`
        ).then((res) => setFoodUser(res.data));
        // if jointure non favorite food-user exist
        Axios.get(
            `${process.env.REACT_APP_LOCALHOST}/users/${userInfo.id}/foods/no`
        ).then((res) => setNoFoodUser(res.data));
    }, [userInfo]);

    const handleClickNo = () => {
        if (foodUser.id === idfood) {
            //delete jointure favorite food-user if exist
            Axios.delete(
                `${process.env.REACT_APP_LOCALHOST}/foods/${idfood}/${userInfo.id}`
            ).then((res) => res.data);
        }
        // create jointure no favorite food - user
        Axios.post(
            `${process.env.REACT_APP_LOCALHOST}/foods/${idfood}/${userInfo.id}/no`
        ).then((res) => res.data);

        Number(idfood) === lengthFood
            ? props.history.push("/looders")
            : props.history.push(`/questions/${Number(idfood) + 1}`);
    };

    const handleClickYes = () => {
        if (noFoodUser.id === idfood) {
            //delete jointure no favorite food-user if exist
            Axios.delete(
                `${process.env.REACT_APP_LOCALHOST}/foods/${idfood}/${userInfo.id}/no`
            ).then((res) => res.data);
        }
        // create jointure favorite food - user
        Axios.post(
            `${process.env.REACT_APP_LOCALHOST}/foods/${idfood}/${userInfo.id}`
        ).then((res) => res.data);
        Number(idfood) === lengthFood
            ? props.history.push("/looders")
            : props.history.push(`/questions/${Number(idfood) + 1}`);
    };

    return (
        <>
            <Header />
            {food ? (
                <div className="favorites-content">
                    <div className="fooditem">
                        <img src={food.image} alt={food.name} />
                        <div className="food-description">
                            <div className="food-title">
                                <h3>{food.name}</h3>
                                <img src={food.origine} alt="origine" />
                            </div>
                            <p>{food.description}</p>
                        </div>
                    </div>
                    <div className="favorite_choices">
                        <img
                            className="favorite_choice"
                            src={dislike}
                            alt="dislike"
                            onClick={() => handleClickNo()}
                        />
                        <img
                            className="favorite_choice"
                            src={like}
                            alt="like"
                            onClick={() => handleClickYes()}
                        />
                    </div>
                </div>
            ) : (
                <p>loading</p>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
    };
};

export default connect(mapStateToProps, null)(Favorites);
