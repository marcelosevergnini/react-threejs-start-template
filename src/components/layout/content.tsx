import React from "react";
import {Engine} from "../engine/engine";
import  "./content.css";

function Content() {
    return (
        <div className="container is-fluid content-spaces ">
            <div className="box box-color">
                <Engine backgroundColor={0xF2F2F2} lights={[{color: 0xffffff, position: { x: 1, y: 0.75, z: 0.5 }}]} grid={{ size: 100000, dimensions: 500 }}/>
            </div>
        </div>
    );
}

export default Content;
