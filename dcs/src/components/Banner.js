import React from "react"

class Banner extends React.Component {
  render() {
    return (
      <div className={"jumbotron " + this.props.background}>
        <h1 align="center" className="display-4">{this.props.header}</h1>
        <div className="row justify-content-center">
          {
            (this.props.text) ? <p>{this.props.text}</p> : null
          }
          {
            (this.props.cards) ? this.props.cards : null
          }
        </div>
      </div>
    )
  }
}

export default Banner