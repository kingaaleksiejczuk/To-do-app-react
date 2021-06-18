import React from "react";
import { Redirect } from "react-router-dom";

function LoginPage({ login, isAuth }) {

    if (isAuth) {
        return <Redirect to={{ pathname: "/todo" }} />;
    }

    return (
        <div className='todo-app'>
            <h1>To enter, click the login button</h1>
            <button onClick={() => login()} className='todo-button edit'>Login</button>
        </div>
    );
}
export default LoginPage;