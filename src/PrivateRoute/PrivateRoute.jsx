import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from "react-redux";

const PrivateRoute = ({
    path,
    component: Component,
  	isAuthenticated,
}) => (
    isAuthenticated ? <Route path={path} component={Component} /> : <Redirect to="/connexion" />
);

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};

export default connect(mapStateToProps, null)(PrivateRoute);