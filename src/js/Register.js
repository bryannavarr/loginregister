import React from "react";

class Register extends React.Component {
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
            <form role="form">
              <div className="form-group row">
                <label
                  htmlFor="input2EmailForm"
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
                  htmlFor="input2PasswordForm"
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
                  htmlFor="input2Password2Form"
                  className="sr-only control-label"
                />
                <div className="offset-sm-2 col-sm-8">
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
                    className="btn btn-secondary btn-md btn-block"
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

export default Register;