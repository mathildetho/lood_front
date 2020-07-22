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

    const idfood = props.match.params.id;

    let user = props.user;
    let userInfo;
    if (user) {
        userInfo = user.authdata.result[0];
    }

    useEffect(() => {
        Axios.get(`http://localhost:5000/api/foods`)
            .then((res) => res.data)
            .then((data) => setFoods(data));
    }, []);

    useEffect(() => {
        Axios.get(`http://localhost:5000/api/foods/${idfood}`)
            .then((res) => res.data[0])
            .then((data) => setFood(data));
    }, [idfood]);

    useEffect(() => {
        setLength(foods.length);
    }, [foods]);

    const handleClickNo = () => {
        Number(idfood) === lengthFood
            ? props.history.push("/home")
            : props.history.push(`/questions/${Number(idfood) + 1}`);
    };

    const handleClickYes = () => {
        Axios.post(
            `http://localhost:5000/api/foods/${idfood}/${userInfo.id}`
        ).then((res) => res.data);
        Number(idfood) === lengthFood
            ? props.history.push("/home")
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
