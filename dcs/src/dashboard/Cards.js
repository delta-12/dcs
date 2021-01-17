import React from "react"
import Card from "./Card"
import Charts from "./Charts"

class Cards extends React.Component {

  render() {

    // map data from props whilst ignoring promises
    // this.props.data.map((d) => console.log(d))

    return (
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h3>{this.props.data.name}</h3>
        </div>
        <div className="row">
          <Card header="Status" text={this.props.data.status} bg={
            (this.props.data.status === "Online") ? "bg-success" : "bg-danger"
          } />
          <Card header="Address" text={this.props.data.address + ":" + this.props.data.port} bg="bg-info" />
          <Card header="Software" text={this.props.data.software}
            title="Version"
            subtext={this.props.data.version}
            bg="bg-light"
          />
          <Card header="Gamemode" text={this.props.data.gamemode}
            title={
              (this.props.data.gamemode === "survival") ? "Difficulty" : null
            }
            subtext={
              (this.props.data.gamemode === "survival") ? this.props.data.difficulty : null
            }
            bg="bg-warning"
          />
        </div>
        {
          (this.props.data.status === "Online") ? <Charts onlinePlayers={parseInt(this.props.data.onlinePlayers)} maxPlayers={parseInt(this.props.data.maxPlayers)} /> : null
        }
        <table className="table table-hover">
          <tbody>
            <tr>
              <th scope="row">Seed</th>
              <td></td>
              <td></td>
              <td>{this.props.data.seed}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Cards