import React from "react"
import { VictoryLine, VictoryChart, VictoryAxis, VictoryLabel, VictoryPie } from "victory"
import { getCurrentTime } from "./getCurrentTime"

class Charts extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentTime: getCurrentTime(),
      newPlayers: this.props.onlinePlayers,
      onlinePlayers: [],
      updateInterval: 30000
    }
  }

  componentDidMount() {
    this.getData()
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID)
  }

  getData() {
    this.setState(state => {
      const onlinePlayers = state.onlinePlayers.concat({ time: state.currentTime, players: state.newPlayers })
      return {
        onlinePlayers,
        newPlayers: this.props.onlinePlayers,
        currentTime: getCurrentTime()
      }
    })
    this.intervalID = setTimeout(this.getData.bind(this), this.state.updateInterval)
  }

  onChange = e => {
    if (e.target.value >= 5) {
      this.setState({
        [e.target.id]: e.target.value*1000
      })
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-xl-8 col-lg-7">
          <div className="card text-white bg-white mb-4">
            <div className="card-header">Activity</div>
            <div className="card-body">
              <VictoryChart domainPadding={20}>
                <VictoryAxis
                  style={{ tickLabels: { fontSize: 8 } }}
                  fixLabelOverlap={true}
                />
                <VictoryLabel text={"Time"} x={410} y={250} />
                <VictoryAxis
                  dependentAxis
                />
                <VictoryLabel text={"Players"} y={35} />
                <VictoryLine
                  data={this.state.onlinePlayers}
                  style={{ data: { stroke: "#3abc8b" } }}
                  domain={{
                    y: [0, this.props.maxPlayers]
                  }}
                  x="time"
                  y="players"
                />
              </VictoryChart>
              <fieldset className="form-group">
                <label className="text-success">Set the update interval of the graph between 5 and 300 seconds.</label>
                <input type="range" className="custom-range" min="5" max="300" onChange={this.onChange} id="updateInterval" />
                <label className="text-success">Update Interval: {this.state.updateInterval / 1000}s</label>
              </fieldset>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-5">
          <div className="card text-white border-danger mb-4">
            <div className="card-header">Players</div>
            <div className="card-body">
              <h5 className="card-title border-bottom">Capacity</h5>
              <VictoryPie
                colorScale={["#e74c3c", "#525252"]}
                style={{ labels: { fill: "#e74c3c" } }}
                innerRadius={90}
                data={[{ x: String((this.props.onlinePlayers / this.props.maxPlayers)*100)+"%", y: this.props.onlinePlayers/this.props.maxPlayers }, { x: " ", y: (this.props.maxPlayers-this.props.onlinePlayers)/this.props.maxPlayers }]}
              />
              <p className="card-text">
                Online: {this.props.onlinePlayers}
              </p>
              <p className="card-text">
                Max Players: {this.props.maxPlayers}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Charts