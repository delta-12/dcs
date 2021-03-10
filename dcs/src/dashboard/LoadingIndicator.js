import React from "react"
import { usePromiseTracker } from "react-promise-tracker"
import Loader from "react-loader-spinner"

export const LoadingIndicator = () => {
    const { promiseInProgress } = usePromiseTracker()
    const style = {
      height: 40,
      width: "100%",
      display: "flex",
      justifyContent: "left",
      alignItems: "left",
      verticalAlign: "middle",
      paddingTop: 10,
      borderRadius: 5,
      backgroundColor: "orange"
    }
    return (
      promiseInProgress &&
      <div style={style}>
        <Loader type="Bars" width="100" height="20" color="white" />
        <p>Creating new server.  This may take some time.</p>
      </div>
    )
}