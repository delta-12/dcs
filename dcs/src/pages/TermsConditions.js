import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Banner from "../components/Banner"

class TermsConditions extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Banner background="bg-secondary" header="Terms &amp; Conditions" />
        <div className="container">
          <p>
            Anyone is welcome to create an account and use our services.  
            We ask that you refrain from abusing our services, and we reserve the right to terminate any user's account at any time with or without cause.            
          </p>
        </div>
        <Footer />
      </div>
    )
  }
}

export default TermsConditions