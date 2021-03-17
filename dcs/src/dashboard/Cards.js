import React from "react"
import Card from "./Card"
import Charts from "./Charts"
import TableRow from "./TableRow"
import DeleteServer from "./DeleteServer"

class Cards extends React.Component {

  constructor() {
    super()
    this.state = {
      confirmDelete: false
    }
  }

  showConfirmMsg = e => {
    e.preventDefault()
    this.setState({
      confirmDelete: true
    })
  }

  hideConfirmMsg = e => {
    e.preventDefault()
    this.setState({
      confirmDelete: false
    })
  }

  render() {

    // map data from props whilst ignoring promises
    // this.props.data.map((d) => console.log(d))

    return (
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h3>{this.props.data.name}</h3>
          {
            (this.props.user === this.props.data.owner) ? <button className="btn btn-danger" onClick={this.showConfirmMsg}>Delete</button> : null
          }
        </div>
        {
          (this.state.confirmDelete) ?
            <div className="alert alert-dismissible alert-light">
              <h4 className="alert-heading">Warning!</h4>
              <p className="mb-0">Are you sure you want to permanently delete this minecraft server?</p>
              <button className="btn btn-danger mr-1 mt-1 mb-1" onClick={this.hideConfirmMsg}>Cancel</button>
              <DeleteServer user={this.props.user} server_id={this.props.data._id} address={this.props.data.address} />
            </div> :
            null
        }
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
            <TableRow title="Seed" data={this.props.data.seed} />
            <TableRow title="Visibility" data={(this.props.data.public) ? "Public" : "Private"} />
          </tbody>
        </table>
      </div>
    )
  }
}

export default Cards