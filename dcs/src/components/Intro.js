import React from "react"

class Intro extends React.Component {
  render() {
    return (
      <div className="jumbotron bg-success mt-4">
        <hr className="my-5" style={{ visibility: "hidden" }}></hr>
        <h1 className="display-4">{this.props.header}</h1>
        <p className="lead">{this.props.text}</p>
        <hr className="my-5" style={{ visibility: "hidden" }}></hr>
      </div>
    )
  }
}

export default Intro