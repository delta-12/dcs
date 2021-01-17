import React from "react"
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { registerUser } from "../actions/authActions"
import classnames from "classnames"
import {Link} from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

class Register extends React.Component {

  constructor() {
    super()
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
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
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }
    this.props.registerUser(newUser, this.props.history)
  }

  render() {
    const {errors} = this.state

    return (
      <div>
        <Header />
        <hr className="my-5" style={{ visibility: "hidden" }}></hr>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="container">
            <div className="d-flex justify-content-center h-100 row align-items-center">
              <div className="col card p-3 m-3">
                <div className="card-header mb-3">Delta CS Registeration</div>
                <div className="form-group">
                  <label>Username</label>
                  <input className={classnames((errors.username !== undefined) ? "form-control is-invalid" : "form-control", { invalid: errors.username })} onChange={this.onChange} value={this.state.username} placeholder="Username" error={errors.username} id="username" type="text" />
                  <small className="form-text text-danger">{errors.username}</small>
                  <label>Email</label>
                  <input className={classnames((errors.email !== undefined) ? "form-control is-invalid" : "form-control", { invalid: errors.email })} onChange={this.onChange} value={this.state.email} placeholder="Email" error={errors.email} id="email" type="email" />
                  <small className="form-text text-danger">{errors.email}</small>
                  <label>Password</label>
                  <input className={classnames((errors.password !== undefined) ? "form-control is-invalid" : "form-control", { invalid: errors.password })} onChange={this.onChange} value={this.state.password} placeholder="Password" error={errors.password} id="password" type="password" />
                  <small className="form-text text-danger">{errors.password}</small>
                  <label>Confirm Password</label>
                  <input className={classnames((errors.password2 !== undefined) ? "form-control is-invalid" : "form-control", { invalid: errors.password2 })} onChange={this.onChange} value={this.state.password2} placeholder="Confirm Password" error={errors.password2} id="password2" type="password" />
                  <small className="form-text text-danger">{errors.password2}</small>
                </div>
                <p>Already have an account? <Link className="link" to="/login">Login</Link></p>
                <p>Return to <Link className="link" to="/">Home</Link></p>
                <button className="btn btn-success" type="submit">Register</button>
              </div>
            </div>
          </div>
        </form>
        <Footer />
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register))
