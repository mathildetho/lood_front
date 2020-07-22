import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Home from "./components/Home";
import Connexion from "./components/Connexion";
import Welcome from "./components/Welcome";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Profile from "./components/Profile";
import Favorites from "./components/Favorites";
import Looders from "./components/Looders";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/inscription" component={Register} exact />
                <Route path="/connexion" component={Connexion} exact />
                <PrivateRoute path="/home" component={Welcome} />
                <PrivateRoute path="/profil" component={Profile} />
                <PrivateRoute path="/looders" component={Looders} />
                <PrivateRoute path="/questions/:id" component={Favorites} />
            </Switch>
        </div>
    );
}

export default App;
