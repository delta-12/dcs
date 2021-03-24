import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { logoutUser } from "../actions/authActions"
import { Link } from "react-router-dom"

class TopNav extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      menu: false,
      loggedIn: Boolean
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu() {
    this.setState({ menu: !this.state.menu })
  }

  // trying to check if user is logged in
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.setState({
        loggedIn: true
      })
    }
  }

  onLogoutClick = e => {
    e.preventDefault()
    this.props.logoutUser()
    this.setState({
      loggedIn: false
    })
  }

  render() {

    const show = (this.state.menu) ? "show" : ""
    const { user } = this.props.auth

    if (this.state.loggedIn === true) {
      return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          <Link style={{ textDecoration: "none" }} to="/"><div className="navbar-brand">Delta Cloud Services</div></Link>
          <button className="navbar-toggler" type="button" onClick={this.toggleMenu}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={"collapse navbar-collapse " + show}>
            <div className="navbar-nav ml-auto">
              <div className="btn-toolbar">
                <div className="btn-group m-1">
                  <Link style={{ textDecoration: "none" }} to="/dashboard"><button className="btn btn-outline-info">Dashboard</button></Link>
                </div>
                <div className="btn-group m-1">
                  <Link style={{ textDecoration: "none" }} to="/account"><button className="btn btn-outline-warning"><i className="fas fa-user-circle"></i>{user.username}</button></Link>
                </div>
                <div className="btn-group m-1">
                  <button className="btn btn-outline-danger" onClick={this.onLogoutClick}><i className="fas fa-sign-out-alt"></i>Logout</button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )
    }

    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <Link style={{ textDecoration: "none" }} to="/"><div className="navbar-brand">Delta Cloud Services</div></Link>
        <button className="navbar-toggler" type="button" onClick={this.toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={"collapse navbar-collapse " + show}>
          <div className="navbar-nav ml-auto">
            <div className="btn-toolbar">
              <div className="btn-group m-1">
                <Link style={{ textDecoration: "none" }} to="/register"><button className="btn btn-block btn-outline-success">Register</button></Link>
              </div>
              <div className="btn-group m-1">
                <Link style={{ textDecoration: "none" }} to="/login"><button className="btn btn-block btn-success">Login</button></Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )

  }
}

TopNav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})
export default connect(
  mapStateToProps,
  { logoutUser }
)(TopNav)