import React from "react";
import NavBar from "./navbar";

function Header() {
    return (
        <section className="hero is-dark is-small">
            <NavBar />
            <div className="hero-body">
                <div className="container">
                    {/*<h1 className="title">*/}
                    {/*    My Playground*/}
                    {/*</h1>*/}
                </div>
            </div>

        </section>
    );
}

export default Header;