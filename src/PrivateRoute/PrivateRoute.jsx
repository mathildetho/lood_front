import React, {useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';
import { loadUser } from "../actions/generalActions";
import { connect } from "react-redux";

const PrivateRoute = ({
    path,
    component: Component,
    isAuthenticated,
    loadUser
}) => {
    useEffect(() => {
        loadUser(localStorage.getItem('token'));
    }, [loadUser]);

    if(!isAuthenticated && isAuthenticated !== null) {
        return <Redirect to="/connexion" />
    }

    return (
    <Route path={path} component={Component} />
)};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};

export default connect(mapStateToProps, {loadUser})(PrivateRoute);