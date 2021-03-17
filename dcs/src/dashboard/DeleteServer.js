import React from "react"
import axios from "axios"
import { useAlert } from "react-alert"

const DeleteServer = (props) => {
  const alert = useAlert()

  const deleteServer = e => {
    e.preventDefault()
    alert.show("Deleting server...", { timeout: 5000 })
    const reqData = {
      user_id: props.user,
      server_id: props.server_id,
      address: props.address
    }
    axios
      .post("/api/minecraftServers/deleteServer", reqData)
      .then(res => {
        alert.show("Successfully deleted server.", { type: "success", timeout: 5000 })
      })
      .catch(err => {
        alert.show("Failed to delete server.  Error: "+err, { type: "error", timeout: 5000 })
      })
  }

  return (
    <button className="btn btn-outline-danger m-1" onClick={deleteServer}>Confirm</button>
  )
}

export default DeleteServer