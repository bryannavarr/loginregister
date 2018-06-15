import React from "react";
import * as validationHelper from "../helpers/validation.helper";
import * as usersService from "../services/users.service";
import { Redirect } from "react-router-dom";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    const formData = this.initializeValidation();

    this.state = {
      formData: formData,
      formValid: false
    };
    this.onChange = validationHelper.onChange.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.confirmPasswordsMatch = this.confirmPasswordsMatch.bind(this);
  }

  initializeValidation() {
    const initializedUser = {
      name: "",
      email: "",
      password: "",
      passwordConfirm: ""
    };

    let formData = {
      name: {
        originalValue: initializedUser.name,
        value: initializedUser.name,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      email: {
        originalValue: initializedUser.email,
        value: initializedUser.email,
        valid: true,
        validation: {
          email: true
        },
        touched: false
      },
      password: {
        originalValue: initializedUser.password,
        value: initializedUser.password,
        valid: true,
        validation: {},
        touched: false
      },
      passwordConfirm: {
        originalValue: initializedUser.passwordConfirm,
        value: initializedUser.passwordConfirm,
        valid: true,
        validation: {},
        touched: false
      }
    };

    for (let fieldName in formData) {
      const field = formData[fieldName];
      field.valid = validationHelper.validate(field.value, field.validation);
    }

    return formData;
  }

  confirmPasswordsMatch(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState(prevState => {
      const field = { ...prevState.formData[name] };
      field.value = value;
      field.touched = true;
      field.valid = this.state.formData.password.value === value;
      const formData = { ...prevState.formData, [name]: field };
      let formValid = true;
      for (let inputIdentifier in formData) {
        formValid = formValid && formData[inputIdentifier].valid;
      }
      return { formData: formData, formValid: formValid };
    });
  }

  registerUser() {
    if (!this.state.formValid) {
      const formData = JSON.parse(JSON.stringify(this.state.formData));
      for (let fieldIdentifier in formData) {
        formData[fieldIdentifier].touched = false;
      }
      this.setState({ formData: formData });
    }
    let item = {
      name: this.state.formData.name.value,
      email: this.state.formData.email.value,
      password: this.state.formData.password.value
    };
    usersService
      .register(item)
      .then(data => {
        console.log(data);

        this.setState(prevState => {
          return {
            ...prevState,
            formData: {
              ...prevState.formData,
              name: { ...prevState.formData.name, value: "" },
              email: { ...prevState.formData.email, value: "" },
              password: { ...prevState.formData.password, value: "" },
              passwordConfirm: {
                ...prevState.formData.passwordConfirm,
                value: ""
              }
            }
          };
        });
      })
      .catch(err => {
        console.log(err);
        console.log(err.response);
      });
    // if (err.response.status === 400 && typeof err.response.data === "string") {
    //   this.props.alert({ alreadyRegistered: true });
    // }
  }

  render() {
    return (
      <div className="collapse py-2" id="cardRegister">
        <div className="card">
          <div className="card-block">
            <div className="card-header">
              <h2 className="text-center">Register</h2>
            </div>
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
            <form>
              <div className="form-group row">
                <label
                  htmlFor="input2EmailForm"
                  className="sr-only control-label"
                >
                  name
                </label>
                <div className="offset-sm-2 col-sm-8">
                  <input
                    type="text"
                    name="name"
                    value={this.state.formData.name.value}
                    className="form-control"
                    placeholder="name"
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="input2EmailForm"
                  className="sr-only control-label"
                >
                  email
                </label>
                <div className="offset-sm-2 col-sm-8">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="email"
                    value={this.state.formData.email.value}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="sr-only control-label" />
                <div className="offset-sm-2 col-sm-8">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="password"
                    value={this.state.formData.password.value}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="sr-only control-label" />
                <div className="offset-sm-2 col-sm-8">
                  <input
                    type="password"
                    className="form-control"
                    name="passwordConfirm"
                    placeholder="confirm password"
                    value={this.state.formData.passwordConfirm.value}
                    onChange={this.confirmPasswordsMatch}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="offset-sm-2 col-sm-8 pb-3 pt-2">
                  <button
                    type="button"
                    className="btn btn-secondary btn-md btn-block"
                    onClick={this.registerUser}
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
