import * as actionTypes from "./actionTypes";
import axios from "axios";

/* authentification USER*/
// Check token & load client
export const loadUser = (token) => (dispatch) => {
    // User loading
    dispatch({ type: actionTypes.USER_LOADING });

    axios
        .post(`${process.env.REACT_APP_LOCALHOST}/users/profile`, null, {
            headers: {
                Authorization: `Basic ${token}`,
            },
        })
        .then((res) =>
            dispatch({
                type: actionTypes.USER_LOADED,
                payload: res.data,
            })
        )
        .catch((err) => {
            console.log(err);
        });
};

// Register User (creation)
export const register = (pseudo, image, description, password, sexe) => (
    dispatch
) => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    // Request body
    const body = JSON.stringify(pseudo, image, description, password, sexe);
    axios
        .post(`${process.env.REACT_APP_LOCALHOST}/users`, body, config)
        .then((res) =>
            dispatch({
                type: actionTypes.REGISTER_SUCCESS,
                payload: res.data,
            })
        )
        .catch((err) => {
            console.log(err);
        });
};

// Login User
export const login = (pseudo, password) => (dispatch) => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    // Request body
    const body = JSON.stringify(pseudo, password);
    axios
        .post(`${process.env.REACT_APP_LOCALHOST}/users/login`, body, config)
        .then((res) =>
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                payload: res.data,
            })
        )
        .catch((err) => {
            console.log(err);
        });
};

// Logout User
export const logout = () => {
    return {
        type: actionTypes.LOGOUT_SUCCESS,
    };
};

// update data client
export const updateUser = (id, clientNewInfo) => (dispatch) => {
    // body
    axios
        .put(`${process.env.REACT_APP_LOCALHOST}/users/${id}`, clientNewInfo)
        .then(() => {
            dispatch({
                type: actionTypes.USER_MODIFY,
                clientNewInfo,
            });
        })
        .catch((err) => {
            dispatch({
                type: actionTypes.AUTH_ERROR,
            });
        });
};
