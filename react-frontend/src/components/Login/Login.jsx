import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Login.module.css"

const Login = () => {
    const { loginWithRedirect } = useAuth0();

    return <div className={styles.loginBtn} onClick={() => loginWithRedirect()}>
        Log In
    </div>;
};

export default Login;