import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import {Auth0Provider} from "@auth0/auth0-react";

ReactDOM.render(
    <Auth0Provider
        domain="dev-o6i1q2fq.us.auth0.com"
        clientId="PgD6IHUmWBDPKKefnIOmKmZz0F0XUDwT"
        redirectUri={window.location.origin}
    >
        <App />
    </Auth0Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
