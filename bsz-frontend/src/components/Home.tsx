import React from "react";
import HelloWorld from "./HelloWorld";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
            <img src={`${process.env.PUBLIC_URL}/hattyu_feher.svg`} className="App-logo" alt="logo" />
            <HelloWorld />
            <Link to="/hello">Hello!</Link>
            <Link to="/register">Register here</Link>
            </header>
        </div>
    );
};

export default Home;
