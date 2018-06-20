import React from "react";
import * as validationHelper from "../helpers/validation.helper";
// import * vendorsService from "../services/users.service"
import Login from "./Login";

class VendorForm extends React.Component {
  constructor(props) {
    super(props);

    const formData = this.initializeValidation();

    this.state = {
      formData: formData,
      formValid: false,
      loginHidden: true,
      vendorHidden: false
    };
    this.onChange = validationHelper.onChange.bind(this);
    this.contactVendor = this.contactVendor.bind(this);
    this.showLogin = this.showLogin.bind(this);
  }

  showLogin() {
    this.setState({ vendorHidden: true });
    this.setState({ loginHidden: !this.state.loginHidden });
  }

  initializeValidation() {
    const initializedVendor = {
      storeName: "",
      storeAddress: "",
      fullName: "",
      mobile: "",
      email: ""
    };

    let formData = {
      storeName: {
        originalValue: initializedVendor.storeName,
        value: initializedVendor.storeName,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      storeAddress: {
        originalValue: initializedVendor.storeAddress,
        value: initializedVendor.storeAdress,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      fullName: {
        originalValue: initializedVendor.fullName,
        value: initializedVendor.fullName,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      mobile: {
        originalValue: initializedVendor.mobile,
        value: initializedVendor.mobile,
        valid: true,
        validation: {
          required: true
        },
        touched: true
      },
      email: {
        originalValue: initializedVendor.email,
        value: initializedVendor.email,
        valid: true,
        validation: {
          email: true
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

  contactVendor() {
    console.log("send vendor email with further instructions");
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.loginHidden && <Login />}
        {!this.state.vendorHidden && (
          <div className="collapse py-2" id="cardRegister">
            <div className="card">
              <div className="card-block">
                <div className="card-header">
                  <h2 className="text-center">Register Vendor</h2>
                </div>

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
                        name="storeName"
                        value={this.state.formData.storeName.value}
                        className="form-control"
                        placeholder="Full Name"
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="input2EmailForm"
                      className="sr-only control-label"
                    />
                    <div className="offset-sm-2 col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        name="storeAddress"
                        placeholder="Store Address"
                        value={this.state.formData.storeAddress.value}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="sr-only control-label" />
                    <div className="offset-sm-2 col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        placeholder="Full Name"
                        value={this.state.formData.fullName.value}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="sr-only control-label" />
                    <div className="offset-sm-2 col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        name="mobile"
                        placeholder="Mobile"
                        value={this.state.formData.mobile.value}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="sr-only control-label" />
                    <div className="offset-sm-2 col-sm-8">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        value={this.state.formData.email.value}
                        onChange={this.onChange}
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
                      <div style={{ paddingTop: "20px" }}>
                        <small>
                          <a
                            href=""
                            onClick={this.showLogin}
                            className=""
                            data-toggle="collapse"
                            data-target="#cardRegister"
                            data-parent="#parent"
                          >
                            <p className="text-center">Back to Login</p>
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
      </React.Fragment>
    );
  }
}

export default VendorForm;
