import React from "react"
import { Link } from "react-router-dom"

class Footer extends React.Component {

  render() {
    return (
      <div className="navbar fixed-bottom navbar-dark bg-dark">
        <div className="navbar-nav">
          <p>Copyright &copy; deltacs.sytes.net 2021</p>
          <p><Link to="/terms_and_conditions" style={{ textDecoration: "none" }}>Terms &amp; Conditions</Link> | <Link to="/privacy" style={{ textDecoration: "none" }}>Privacy Policy</Link> | <Link to="/contact" style={{ textDecoration: "none" }}>Contact</Link></p>
        </div>
      </div>
    )
  }

}

export default Footer