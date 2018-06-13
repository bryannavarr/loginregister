import React, { Component } from "react";
import * as validationHelper from "../helpers/validation.helper";
import "./../css/login.css";

class LoginForm extends React.Component {
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

  render() {
    return (
      <React.Fragment>
        <div className="well" id="login">
          <form
            action="index.html#ajax/dashboard.html"
            id="login-form"
            className="smart-form client-form"
          >
            <header>Sign In</header>

            <fieldset>
              <section>
                <div
                  className={
                    !this.state.formData.email.valid &&
                    this.state.formData.email.touched
                      ? "form-group has-error"
                      : "form-group"
                  }
                >
                  <label htmlFor="email">E-mail</label>
                  <div className="input">
                    {" "}
                    <i className="icon-append fa fa-user" />
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="form-control"
                      value={this.state.formData.email.value}
                      onChange={this.onChange}
                      placeholder="Email"
                    />
                    <b className="tooltip tooltip-top-right">
                      <i className="fa fa-user txt-color-teal" /> Please enter
                      email address/username
                    </b>{" "}
                  </div>
                  {!this.state.formData.email.valid &&
                  this.state.formData.email.touched ? (
                    <p className="text-danger has-error">
                      An email is required
                    </p>
                  ) : null}
                </div>
              </section>

              <section>
                <div
                  className={
                    !this.state.formData.password.valid &&
                    this.state.formData.password.touched
                      ? "form-group has-error"
                      : "form-group"
                  }
                >
                  <label htmlFor="label">Password</label>
                  <div className="input">
                    {" "}
                    <i className="icon-append fa fa-lock" />
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      value={this.state.formData.password.value}
                      onChange={this.onChange}
                      placeholder="Password"
                    />
                    <b className="tooltip tooltip-top-right">
                      <i className="fa fa-lock txt-color-teal" /> Enter your
                      password
                    </b>{" "}
                  </div>
                  <div className="note">
                    <a href="forgotpassword.html">Forgot password?</a>
                  </div>
                  {!this.state.formData.password.valid &&
                  this.state.formData.password.touched ? (
                    <p className="text-danger has-error">
                      A password is required
                    </p>
                  ) : null}
                </div>
              </section>

              <section>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="remember"
                    onChange={this.staySignedIn}
                    checked={this.state.staySignedIn}
                  />
                  <i />Stay signed in
                </label>
              </section>
            </fieldset>

            <footer>
              <button
                type="button"
                onClick={this.onSignIn}
                className="btn btn-primary"
                disabled={!this.state.formValid}
              >
                Sign in
              </button>
            </footer>
          </form>
        </div>

        <h5 className="text-center"> - Or sign in using -</h5>

        <ul className="list-inline text-center">
          <li>
            <a
              href="https://localhost:8080/api/users/auth/facebook"
              className="btn btn-primary btn-circle"
            >
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a
              href="https://localhost:8080/api/users/auth/twitter"
              className="btn btn-info btn-circle"
            >
              <i className="fa fa-twitter" />
            </a>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default LoginForm;
