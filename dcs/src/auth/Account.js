import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { updateAccountInfo } from "../actions/authActions"
import classnames from "classnames"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { LoadingIndicator } from "../components/LoadingIndicator"
import ServerResponse from "../components/ServerResponse"

class Account extends React.Component {
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
  
  // remove prior error messages if successfully update, i.e. this.props.auth.updated
  // use componentDidMount ?
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
    const updatedInfo = {
      id: this.props.auth.user.id,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }
    this.props.updateAccountInfo(updatedInfo)
  }

  render() {
    const { errors } = this.state

    return (
      <div>
        <Header />
        <hr className="my-5" style={{ visibility: "hidden" }}></hr>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="container">
            <div className="d-flex justify-content-center h-100 row align-items-center">
              <div className="col card p-3 m-3">
                <div className="card-header mb-3">Update Delta CS Account Information</div>
                <LoadingIndicator text="Updating Account Info..."/>
                {
                  (this.props.auth.updated) ? <ServerResponse color="mediumseagreen" text="Account Info Successfully Updated." /> : 
                    (Object.keys(this.state.errors).length === 0) ? null : <ServerResponse color="red" text="Failed to Update Account." />
                }
                <div className="form-group">
                  <label>Username</label>
                  <input className={classnames((errors.username !== undefined) ? "form-control is-invalid" : "form-control", { invalid: errors.username })} onChange={this.onChange} value={this.state.username} placeholder={this.props.auth.user.username} error={errors.username} id="username" type="text" />
                  <small className="form-text text-danger">{errors.username}</small>
                  <label>Email</label>
                  <input className={classnames((errors.email !== undefined) ? "form-control is-invalid" : "form-control", { invalid: errors.email })} onChange={this.onChange} value={this.state.email} placeholder={this.props.auth.user.email} error={errors.email} id="email" type="email" />
                  <small className="form-text text-danger">{errors.email}</small>
                  <label>Password</label>
                  <input className={classnames((errors.password !== undefined) ? "form-control is-invalid" : "form-control", { invalid: errors.password })} onChange={this.onChange} value={this.state.password} placeholder="Password" error={errors.password} id="password" type="password" />
                  <small className="form-text text-danger">{errors.password}</small>
                  <label>Confirm Password</label>
                  <input className={classnames((errors.password2 !== undefined) ? "form-control is-invalid" : "form-control", { invalid: errors.password2 })} onChange={this.onChange} value={this.state.password2} placeholder="Confirm Password" error={errors.password2} id="password2" type="password" />
                  <small className="form-text text-danger">{errors.password2}</small>
                </div>
                <button className="btn btn-success" type="submit">Update</button>
              </div>
            </div>
          </div>
        </form>
        <Footer />
      </div>
    )
  }
}

Account.propTypes = {
  updateAccountInfo: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})
export default connect(
  mapStateToProps,
  { updateAccountInfo }
)(Account)