import React from "react";
import * as validationHelper from "../helpers/validation.helper";
import Register from "./Register";
import Vendor from "./Vendor";
import * as usersService from "../services/users.service";
import { Redirect } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    const formData = this.convertPropsToFormData(props);

    this.state = {
      formData: formData,
      formValid: false,
      staySignedIn: true,
      loginSuccess: false,
      registerHidden: true,
      loginHidden: false,
      vendorHidden: true
    };

    this.onChange = validationHelper.onChange.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.staySignedIn = this.staySignedIn.bind(this);
    this.showPanels = this.showPanels.bind(this);
    this.showVendorForm = this.showVendorForm.bind(this);
  }

  staySignedIn() {
    this.state.staySignedIn
      ? this.setState({ staySignedIn: false })
      : this.setState({ staySignedIn: true });
  }

  showVendorForm() {
    this.setState({ vendorHidden: false });
    this.setState({ loginHidden: !this.state.loginHidden });
  }

  showPanels(e) {
    e.preventDefault();
    this.setState({ registerHidden: false });
    this.setState({ loginHidden: !this.state.loginHidden });
  }
  componentWillReceiveProps(nextProps) {
    const formData = this.convertPropsToFormData(nextProps);
    this.setState({ formData: formData });
  }

  convertPropsToFormData(props) {
    const login = props.formData && props.formData._id ? props.formData : {};

    const initializedLogin = {
      email: login.email || "",
      password: login.password || ""
    };

    let formData = {
      email: {
        originalValue: initializedLogin.email,
        value: initializedLogin.email,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      password: {
        originalValue: initializedLogin.password,
        value: initializedLogin.password,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      }
    };

    for (let fieldName in formData) {
      const field = formData[fieldName];
      field.valid = validationHelper.validate(field.value, field.validation);
    }

    return formData;
  }

  onSignIn(event) {
    if (!this.state.formValid) {
      const formData = JSON.parse(JSON.stringify(this.state.formData));
      for (let fieldIdentifier in formData) {
        formData[fieldIdentifier].touched = false;
      }
      this.setState({ formData: formData });
    }
    let item = {
      email: this.state.formData.email.value,
      password: this.state.formData.password.value
    };
    usersService
      .login(item)
      .then(() => {
        this.setState({ loginSuccess: true });
      })
      .catch(error => {
        console.log("There was error");
      });
  }

// =======================LOGIN VERSION 2===========================
  // render() {
  //   return (
  //     <React.Fragment>
  //       <nav className="navbar navbar-inversee navbar-static-top">
  //         <div className="container">
  //           <div className="navbar-header">
  //             <button
  //               type="button"
  //               className="navbar-toggle collapsed"
  //               data-toggle="collapse"
  //               data-target="#navbar"
  //               aria-expanded="false"
  //               aria-controls="navbar"
  //             >
  //             <span className="sr-only">Toggle Navigation</span>
  //             <span className="icon-bar"></span>
  //             </button>
  //           </div>
  //         </div>
  //       </nav>
  //     </React.Fragment>
  //   );
  // }
  // =======================LOGIN VERSION 2===========================  

  render() {
    return (
      <React.Fragment>
        {this.state.loginSuccess ? (
          <React.Fragment>
            <Redirect to="/minipaint" />
          </React.Fragment>
        ) : (
          <React.Fragment>
            {!this.state.loginHidden && (
              <div className="" id="cardLogin">
                <div className="card">
                  <div className="card-block">
                    <div className="card-header">
                      <h2 className="text-center">Login</h2>
                    </div>
                    <ul className="list-inline text-center">
                      <li className="list-inline-item">
                        <a
                          className="btn btn-lg"
                          href="https://localhost:8080/api/users/auth/twitter"
                          title="Twitter"
                        >
                          <i className="fa fa-2x fa-twitter" />
                        </a>&nbsp;
                      </li>
                      <li className="list-inline-item">
                        <a
                          className="btn btn-lg"
                          href="https://localhost:8080/api/users/auth/facebook"
                          title="Google"
                        >
                          <i className="fa fa-2x fa-google-plus" />
                        </a>&nbsp;
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="https://localhost:8080/api/users/auth/facebook"
                          className="btn btn-lg"
                          title="Facebook"
                        >
                          <i className="fa fa-2x fa-facebook" />
                        </a>&nbsp;
                      </li>
                    </ul>
                    <form>
                      <div className="form-group row">
                        <label
                          htmlFor="inputEmailForm"
                          className="sr-only control-label"
                        >
                          Email
                        </label>
                        <div className="offset-sm-2 col-sm-8">
                          <input
                            type="text"
                            className="form-control"
                            name="email"
                            id="inputEmailForm"
                            placeholder="Email"
                            value={this.state.formData.email.value}
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPasswordForm"
                          className="sr-only control-label"
                        >
                          Passsword
                        </label>
                        <div className="offset-sm-2 col-sm-8">
                          <input
                            type="password"
                            className="form-control"
                            id="inputPasswordForm"
                            placeholder="Password"
                            name="password"
                            value={this.state.formData.password.value}
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="offset-sm-2 col-sm-8">
                          <div className="checkbox small">
                            <label>
                              <input type="checkbox" /> Remember Me
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="offset-sm-2 col-sm-8 pb-3 pt-2">
                          <button
                            type="button"
                            className="btn btn-dark btn-sm btn-block"
                            onClick={this.onSignIn}
                          >
                            Sign-in
                          </button>
                          <button
                            onClick={e => this.showPanels(e)}
                            type="button"
                            className="btn btn-secondary btn-sm btn-block"
                            data-toggle="collapse"
                            data-target="#cardRegister"
                            data-parent="#parent"
                          >
                            Register
                          </button>

                          <div style={{ paddingTop: "20px" }}>
                            <small>
                              <a href="">
                                <p className="text-center">Forgot Password?</p>
                              </a>
                            </small>
                          </div>
                          <div>
                            <small>
                              <a
                                href=""
                                onClick={this.showVendorForm}
                                className=""
                                data-toggle="collapse"
                                data-target="#cardRegister"
                                data-parent="#parent"
                              >
                                <p className="text-center">Become a partner</p>
                              </a>
                            </small>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {!this.state.vendorHidden && <Vendor />}
            {!this.state.registerHidden && <Register />}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default LoginForm;
