import React from "react";
// @ts-ignore
import app_logo from '../../images/app-logo.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from '@fortawesome/free-brands-svg-icons';


function NavBar() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="arch-bricker">
          <img alt={"brand_logo"} src={app_logo}/>
        </a>
      </div>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a href="/arch-bricker" className="navbar-item">
            Home
          </a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a rel="noopener noreferrer" className="button" href={"https://github.com/marcelosevergnini/react-three-tests"} target={"_blank"}>
                <span className="icon">
                    <FontAwesomeIcon icon={faGithub} />
                </span>
                <span>GitHub</span>
              </a>
              <button className="button is-light is-outlined">
                <strong>SignUp</strong>
              </button>
              <button className="button is-light is-outlined">
                <strong>Login</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
