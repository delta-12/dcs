import React from "react"

class SidebarGroup extends React.Component {
  render() {
    return (
      <ul className="nav flex-column">
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-2 mt-4 mb-2 text-dark">
          <span className="border-bottom border-dark">{this.props.title}</span>
        </h6>
        {this.props.items}
      </ul>
    )
  }
}

export default SidebarGroup