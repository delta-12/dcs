import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import axios from "axios"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"
import Cards from "./Cards"
import AddServer from "./AddServer"

class Dashboard extends React.Component {

  intervalID

  constructor() {
    super()
    this.state = {
      data: null,
      error: null,
      key: null,
      windowWidth: window.innerWidth
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize)
    this.getData()
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID)
    window.addEventListener("resize", this.handleResize)
  }

  handleResize = (e) => {
    e.preventDefault()
    this.setState({
      windowWidth: window.innerWidth
    })
  }

  getData() {
    const reqData = {
      id: this.props.auth.user.id
    }
    axios
      .post("/api/minecraftServers/info", reqData)
      .then(res => {
        this.setState({
          data: res.data.data
        })
      })
      .catch(err =>
        this.setState({
          error: err.response.data.error
        })
      )
    this.intervalID = setTimeout(this.getData.bind(this), 5000)
  }

  onServerClick = e => {
    e.preventDefault()
    this.setState({
      key: e.target.id
    })
  }

  render() {

    const { windowWidth } = this.state

    if (this.state.data !== null) {
      let servers = this.state.data.map((d) => <li key={d._id} id={d._id} onClick={this.onServerClick} className="nav-item justify-content-between align-items-center px-2 mt-1 mb-1" style={{ cursor: "pointer" }}>{d.name}</li>)
      let addServer = <li key="addServer" id="addServer" onClick={this.onServerClick} className="nav-item justify-content-between align-items-center px-2 mt-1 mb-1" style={{ cursor: "pointer" }}>+ Add Server</li>
      servers.push(addServer)
      let serverData = this.state.data.map((d) => <Cards key={d._id} data={d} />)
      let addServerCard = <AddServer key="addServer" />
      serverData.push(addServerCard)
      return (
        <div>
          <Header />
          <div className="container-fluid">
            <div className="row">
              {
                (windowWidth > 900) ? <Sidebar minecraftServers={servers} /> : <Topbar minecraftServers={servers} />
              }
            </div>
            {
              (windowWidth > 900 || windowWidth <= 767) ?
              <main className="col-md-9 ml-sm-auto col-lg-10 px-4 mt-5">
                {serverData.find(el => el.key === this.state.key)}
              </main> :
              <main>
                {serverData.find(el => el.key === this.state.key)}
              </main>
            }
          </div>
          <hr className="my-5" style={{ visibility: "hidden" }}></hr>
          <hr className="my-5" style={{ visibility: "hidden" }}></hr>
          <Footer />
        </div>
      )
    }
    else {
      return (
        <div>
          {/* Add loading animation, wait for state change? */}
          <Header />
          <Footer />
        </div>
      )
    }
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})
export default connect(
  mapStateToProps,
)(Dashboard)