import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Banner from "../components/Banner"

class Contact extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Banner background="bg-secondary" header="Contact" />
        <div className="container">
          <p className="border-bottom pb-3">
            If and only if you need to get in contact with the developers because you are experiencing problems with our site or service, need to report a bug, or 
            offer suggestions for improvement, you use the contact information provided below. 
          </p>
          <p className="pt-3">Email: deltacloudservices@protonmail.com</p>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Contact