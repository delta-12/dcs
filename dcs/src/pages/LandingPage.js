import React from 'react'
// import {Link} from "react-router-dom"
import mcJava from '../images/mcJava.png'
import Header from '../components/Header'
import Intro from '../components/Intro'
import Banner from '../components/Banner'
import Card from '../components/Card'
import Footer from '../components/Footer'

class LandingPage extends React.Component {
  render() {

    const servicesBg = "bg-transparent"
    const services = [
      <Card key="mcJava" background={servicesBg} image={mcJava} />
    ]

    const comingSoonBg = "bg-primary"
    const comingSoon = [
      <Card background={comingSoonBg} key="Code Server" header="Code Server" text="VS code deployment in the cloud." />,
      <Card background={comingSoonBg} key="VPS" header="VPS" text="Entry level virtual private servers." />,
      <Card background={comingSoonBg} key="Cloud Browsers" header="Cloud Browsers" text="Connect to Chrome or Firefox in the cloud with noVNC or Chrome Remote Desktop." />,
      <Card background={comingSoonBg} key="Gimkit Bot" header="Gimkit Bot" text="Play the education game Gimkit with a bot." />
    ]
      
    return (
      <div>
        <Header />
        <Intro header="Welcome to Delta Cloud Services." text="Currently, we are only hosting a limited number of Java Minecraft Servers with more services coming soon." />
        <Banner background={servicesBg} header="Services" cards={services} />
        <Banner background={comingSoonBg} header="Coming Soon!" cards={comingSoon} />
        <hr className="my-5" style={{ visibility: "hidden" }}></hr>
        <hr className="my-5" style={{ visibility: "hidden" }}></hr>
        <Footer />
      </div>
    )
  }
}

export default LandingPage
