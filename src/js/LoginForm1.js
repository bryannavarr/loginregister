import React, { Component } from "react";
import * as validationHelper from "../helpers/validation.helper";
import "./../css/login.css";

class LoginForm1 extends React.Component {
  constructor(props) {
    super(props);

    const formData = this.convertPropsToFormData(props);

    this.state = {
      formData: formData,
      formValid: false,
      staySignedIn: true,
      loginSuccess: false
    };

    this.onChange = validationHelper.onChange.bind(this);
    // this.onSignIn = this.onSignIn.bind(this);
    this.staySignedIn = this.staySignedIn.bind(this);
  }

  componentDidMount() {
    $(this.refs.toggleInput.getDOMNode()).bootstrapToggle();
  }

  staySignedIn() {
    this.state.staySignedIn
      ? this.setState({ staySignedIn: false })
      : this.setState({ staySignedIn: true });
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

  // onSignIn(event) {
  //   if (!this.state.formValid) {
  //     const formData = JSON.parse(JSON.stringify(this.state.formData));
  //     for (let fieldIdentifier in formData) {
  //       formData[fieldIdentifier].touched = false;
  //     }
  //     this.setState({ formData: formData });
  //   }
  //   let item = {
  //     email: this.state.formData.email.value,
  //     password: this.state.formData.password.value
  //   };
  //   usersService
  //     .login(item)
  //     .then(() => {
  //       this.setState({ loginSuccess: true });
  //     })
  //     .catch(error => {
  //       console.log("There was error");
  //     });
  // }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <h4 className="pb-2 pt-3"> Login To Your Account</h4>
          <div className="row" id="parent">
            <div className="col-md-6 col-12 card d-block border-0 py-2">
              <a
                href=""
                className="btn btn-outline-secondary"
                data-toggle="collapse"
                data-target="#cardLogin"
                data-parent="#parent"
              >
                Login
              </a>
              <a
                href=""
                className="btn btn-outline-secondary"
                data-toggle="collapse"
                data-target="#cardRegister"
                data-parent="#parent"
              >
                Register
              </a>
              <div className="collapse show py-2" id="cardLogin">
                <div className="card">
                  <div className="card-block">
                    <h2 className="text-xs-center">Login</h2>
                    <ul className="list-inline text-center">
                      <li className="list-inline-item">
                        <a className="btn btn-lg" href="" title="Twitter">
                          <i className="fa fa-2x fa-twitter" />
                        </a>&nbsp;
                      </li>
                      <li className="list-inline-item">
                        <a className="btn btn-lg" href="" title="">
                          <i className="fa fa-2x fa-google-plus" />
                        </a>&nbsp;
                      </li>
                      <li className="list-inline-item">
                        <a className="btn btn-lg" href="" title="Facebook">
                          <i className="fa fa-2x fa-facebook" />
                        </a>&nbsp;
                      </li>
                    </ul>
                    <form role="form">
                      <div className="form-group row">
                        <label
                          for="inputEmailForm"
                          className="sr-only control-label"
                        >
                          Email
                        </label>
                        <div className="offset-sm-2 col-sm-8">
                          <input
                            type="text"
                            className="form-control"
                            id="inputEmailForm"
                            placeholder="email"
                            required=""
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          for="inputPasswordForm"
                          className="sr-only control-label"
                        >
                          Passsword
                        </label>
                        <div className="offset-sm-2 col-sm-8">
                          <input
                            type="text"
                            className="form-control"
                            id="inputPasswordForm"
                            placeholder="password"
                            required=""
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
                            type="submit"
                            className="btn btn-secondary-outline btn-lg btn-block"
                          >
                            Sign-in
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="collapse py-2" id="cardRegister">
                <div className="card">
                  <div className="card-block">
                    <h2 className="text-center">Register</h2>
                    <ul className="list-inline text-center">
                      <li className="list-inline-item">
                        <a className="btn btn-lg" href="" title="Twitter">
                          <i className="fa fa-2x fa-twitter" />
                        </a>&nbsp;
                      </li>
                      <li className="list-inline-item">
                        <a className="btn btn-lg" href="" title="">
                          <i className="fa fa-2x fa-google-plus" />
                        </a>&nbsp;
                      </li>
                      <li className="list-inline-item">
                        <a className="btn btn-lg" href="" title="Facebook">
                          <i className="fa fa-2x fa-google-plus" />
                        </a>&nbsp;
                      </li>
                    </ul>
                    <form role="form">
                      <div className="form-group row">
                        <label
                          for="input2EmailForm"
                          className="sr-only control-label"
                        >
                          email
                        </label>
                        <div className="offset-sm-2 col-sm-8">
                          <input
                            type="text"
                            className="form-control"
                            id="input2EmailForm"
                            placeholder="email"
                            required=""
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          for="input2PasswordForm"
                          className="sr-only control-label"
                        >
                          password
                        </label>
                        <div className="offset-sm-2 col-sm-8">
                          <input
                            type="text"
                            className="form-control"
                            id="input2Password2Form"
                            placeholder="password"
                            required=""
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          for="input2Password2Form"
                          className="sr-only control-label"
                        >
                          verify
                        </label>
                        <div className="offfset-sm-2 col-sm-8">
                          <input
                            type="text"
                            className="form-control"
                            id="input2Password2Form"
                            placeholder="verify password"
                            required=""
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="offset-sm-2 col-sm-8 pb-3 pt-2">
                          <button
                            type="submit"
                            className="btn btn-secondary-outline btn-lg btn-block"
                          >
                            Register
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm1;
