import React from "react"

class Card extends React.Component {
  render() {
    return (
      <div className="col-xl-3 col-md-6 mb-4">
        <div className={"card text-white " + this.props.bg + " mb-3"} style={{ maxWidth: "20rem" }}>
          <div className="card-header">{this.props.header}</div>
          <div className="card-body">
            <p className="card-text">{this.props.text}</p>
            {
              (this.props.title) ? <h5 className="card-title border-bottom">{this.props.title}</h5> : null
            }
            {
              (this.props.subtext) ? <p className="card-text">{this.props.subtext}</p> : null
            }
          </div>
        </div>
      </div>      
    )
  }
}

export default Card