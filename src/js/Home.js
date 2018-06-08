import React, { Component } from "react";
import "./../css/videl.css";

import video from "./files/home.mp4";
import Login from "./LoginForm1";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        {/* <video autoPlay muted loop id="myVideo">
          <source src={video} type="video/mp4" />
        </video> */}

        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-offset-3">
              <Login />
            </div>
          </div>
        </div>

        
      </React.Fragment>
    );
  }
}

export default Home;
