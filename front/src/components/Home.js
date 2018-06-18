import React, { Component } from "react";
import "./../css/videl.css";
import "../js/typewrite";
import video from "../js/files/Sunrise.mp4";
import logo from "../js/files/edwrd.io.png";
import Login from "./LoginForm";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <img src={logo} id="logo" alt="edwrd logo"/>

        <video autoPlay muted loop id="myVideo">
          <source src={video} type="video/mp4" />
        </video>
        <div className="content">
          <h1>
            <span>Tension-Free</span>{" "}
            <a
              className="typewrite"
              data-period="2000"
              data-type="[&quot;Birthday&quot;, &quot;Wedding&quot;, &quot;Graduation&quot;, &quot;Thanksgiving&quot;, &quot;Christmas&quot;]"
            >
              <span className="wrap" />
            </a>{" "}
            <span>Celebration</span>
          </h1>
          <span>
            Simply great design for you and your team <br />Get your team on
            brand. <br /> Unleash your creativity.
          </span>
        </div>
        <div className="container" id="panel">
          <div className="row justify-content-end">
            <Login />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
