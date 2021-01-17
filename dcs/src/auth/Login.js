import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { loginUser } from "../actions/authActions"
import classnames from "classnames"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      username: "",
      password: "",
      errors: {}
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard")
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard") // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()
    const userData = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.loginUser(userData) // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  }

  render() {
    const { errors } = this.state
    const validity = (
      errors.usernamenotfound !== undefined ||
      errors.passwordincorrect !== undefined
    ) ? "form-control is-invalid" : "form-control"

    return (
      <div>
        <Header />
        <hr className="my-5" style={{ visibility: "hidden" }}></hr>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="container">
            <div className="d-flex justify-content-center h-100 row align-items-center">
              <div className="col card p-3 m-3">
                <div className="card-header mb-3">Delta CS Login</div>
                <span className="form-text text-danger">
                  {errors.usernamenotfound}
                  {errors.passwordincorrect}
                </span>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.username}
                    error={errors.username}
                    id="username"
                    type="text"
                    placeholder="Username"
                    className={classnames((errors.username !== undefined) ? "form-control is-invalid" : validity, {
                      invalid: errors.username || errors.usernamenotfound
                    })}
                  />
                  <small className="form-text text-danger">
                    {errors.username}
                  </small>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    placeholder="Password"
                    className={classnames((errors.password !== undefined) ? "form-control is-invalid" : validity, {
                      invalid: errors.password || errors.passwordincorrect
                    })}
                  />
                  <small className="form-text text-danger">
                    {errors.password}
                  </small>
                </div>
                <p>Don't have an account? <Link className="link" to="/register">Register</Link></p>
                <p>Return to <Link className="link" to="/">Home</Link></p>
                <button className="btn btn-success" type="submit">Login</button>
              </div>
            </div>
          </div>
        </form>
        <Footer />
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})
export default connect(
  mapStateToProps,
  { loginUser }
)(Login)