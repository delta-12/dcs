import React from "react"

class Card extends React.Component {
  render() {
    return (
      <div className={"card text-white m-3 " + this.props.background} style={{ maxWidth: "55rem", border: "0" }}>
        <div className="card-body">
          <h4 className="card-title">{this.props.header}</h4>
          {
            (this.props.image) ? <img className="card-image" src={this.props.image} alt={this.props.altText} /> : null
          }
          {
            (this.props.text) ? <p className="card-text">{this.props.text}</p> : null
          }
        </div>
      </div>
    )
  }
}

export default Card