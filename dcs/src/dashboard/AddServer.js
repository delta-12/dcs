import React from "react"
import TableRow from "./TableRow"
import classnames from "classnames"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import axios from "axios"
import { trackPromise } from "react-promise-tracker"
import { LoadingIndicator } from "./LoadingIndicator"
import AddServerResponse from "./AddServerResponse"

class AddServer extends React.Component {

constructor() {
    super()
    this.state = {
      address: "d3lta12.ddns.net",
      name: "",
      gamemode: "survival",
      difficulty: "peaceful",
      seed: "",
      software: "Java",
      version: "16.5",
      public: true,
      data: null,
      hosts: null,
      errors: {}
    }
  }

  componentDidMount() {
    axios
      .post("/api/minecraftServers/hosts", { id: this.props.auth.user.id })
      .then(res => {
        this.setState({
          hosts: res.data.hosts
        })
        console.log(res.data)
      })
      .catch(err =>
        this.setState({
          errors: err.response.error
        })
      )
  }

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  onSubmit = e => {
    e.preventDefault()
    const newServer = {
      id: this.props.auth.user.id,
      address: this.state.address,
      name: this.state.name,
      gamemode: this.state.gamemode,
      difficulty: this.state.difficulty,
      seed: this.state.seed,
      software: this.state.software,
      version: this.state.version,
      public: this.state.public
    }
    console.log(newServer)
    trackPromise(
      axios
        .post("/api/minecraftServers/createServer", newServer)
        .then(res => {
          this.setState({
            data: res.data.data
          })
          console.log(res.data)
        })
        .catch(err =>
          this.setState({
            errors: err.response.data
          })
        )
    )
  }

  render() {
    const {errors} = this.state
    console.log(errors)
    let hosts
    (this.state.hosts !== null) ? hosts = this.state.hosts.map((host) => <option key={host._id} value={host.address}>{host.address}</option>) : hosts = ""
    return(
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h3>Add New Minecraft Server</h3>
        </div>
        <LoadingIndicator />
        { 
          (errors.success !== undefined) ? 
            (errors.success) ? <AddServerResponse color="green" text={this.state.data} /> : <AddServerResponse color="red" text={errors.error} /> :
            null
        }
        <form onSubmit={this.onSubmit}>
          <table className="table table-hover">
            <tbody>
              <TableRow title="Name" data={<div><input type="text" className={classnames((errors.name !== undefined) ? "form-control is-invalid" : "form-control", { invalid: errors.name })} onChange={this.onChange} value={this.state.name} error={errors.name} placeholder="Name" id="name"></input><small className="form-text text-danger">{errors.name}</small></div>} />
              <TableRow title="Game mode" data={<select className="form-control" onChange={this.onChange} value={this.state.gamemode} id="gamemode">
                <option value="survival">Survival</option>
                <option value="creative">Creative</option>
              </select>} />
              <TableRow title="Difficulty" data={<select className="form-control" onChange={this.onChange} value={this.state.difficulty} id="difficulty">
                <option value="peaceful">Peaceful</option>
                <option value="easy">Easy</option>
                <option value="normal">Normal</option>
                <option value="hard">Hard</option>
                <option value="hardcore">Hardcore</option>
              </select>} />
              <TableRow title="Seed" data={<input type="text" className="form-control" onChange={this.onChange} value={this.state.seed} placeholder="Seed" id="seed"></input>} />
              <TableRow title="Software" data={<select className="form-control" onChange={this.onChange} value={this.state.software} id="software">
                <option value="Java">Java</option>
              </select>} />
              <TableRow title="Version" data={<select className="form-control" onChange={this.onChange} value={this.state.version} id="version">
                <option value="16.5">16.5</option>
              </select>} />
              <TableRow title="Visibility" data={<select className="form-control" onChange={this.onChange} id="public">
                <option value={true}>Public</option>
                {/* <option value={false}>Private</option> */}
              </select>} />
              <TableRow title="Hosting Provider" data={<select className="form-control" onChange={this.onChange} value={this.state.address} id="address">
                { hosts }
              </select>} />
            </tbody>
          </table>
          <button className="btn btn-success" type="submit">Create Server</button>
        </form>
      </div>
    )
  }
}

AddServer.propTypes = {
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})
export default connect(
  mapStateToProps,
)(AddServer)