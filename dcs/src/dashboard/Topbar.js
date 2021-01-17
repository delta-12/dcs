import React from "react"
import SidebarGroup from "./SidebarGroup"

class Topbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu() {
    this.setState({ menu: !this.state.menu })
  }

  render() {

    const show = (this.state.menu) ? "show" : ""

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mt-3" style={{ width: "100vw" }}>
        <div className="navbar-brand text-success">Available Services</div>
        <button className="navbar-toggler" type="button" onClick={this.toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={"collapse navbar-collapse " + show}>
          <div className="navbar-nav ml-auto">
            <SidebarGroup title="Minecraft Servers" items={this.props.minecraftServers} />
          </div>
        </div>
      </nav>
    )
  }
}

export default Topbar