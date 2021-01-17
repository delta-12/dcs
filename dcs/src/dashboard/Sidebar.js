import React from "react"
import SidebarGroup from "./SidebarGroup.js"

class Sidebar extends React.Component {
  render() {
    return (
      <nav className="col-md-2 d-none d-md-block bg-primary sidebar" style={{ height: "100vh", position: "fixed" }}>
        <div className="sidebar-sticky mt-4">
          <ul className="nav flex-column">
            <h4 className="sidebar-heading d-flex justify-content-between align-items-center px-2 mt-4 mb-2 text-success">
              <span>Available Services</span>
            </h4>
          </ul>
          <SidebarGroup title="Minecraft Servers" items={this.props.minecraftServers} />
        </div>
      </nav>
    )
  }
}

export default Sidebar