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
        <img src={logo} id="logo" alt="edwrd logo" />

        <video autoPlay muted loop id="myVideo">
          <source src={video} type="video/mp4" />
        </video>
        <div className="content">
          <div>
            <span>Tension-Free</span>{" "}
            <a
              className="typewrite"
              data-period="2000"
              data-type="[&quot;Birthday&quot;, &quot;Wedding&quot;, &quot;Graduation&quot;, &quot;Thanksgiving&quot;, &quot;Christmas&quot;]"
            >
              <span className="wrap" />
            </a>{" "}
            <span>Celebration</span>
          </div>
          <p>
            Simply great design for you and your team <br />Get your team on
            brand. <br /> Unleash your creativity.
          </p>
        </div>
        <div className="container" id="panel">
          <div className="row justify-content-end">
            <div className="col-md-4 d-block border-0 py-2">
              <Login />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
