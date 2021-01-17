import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Banner from "../components/Banner"

class Privacy extends React.Component {
  render() {

    return (
      <div>
        <Header />
        <Banner background="bg-secondary" header="Privacy Policy" />
        <div className="container">
          <p>
            We require new users register with an email address for contact pruposes only.  
            We do not collect any other information on our users, nor do we share any user information with third parties.
          </p>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Privacy