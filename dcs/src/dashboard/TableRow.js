import React from "react"

class TableRow extends React.Component {
  render() {
    return (
      <tr>
        <th scope="row">{this.props.title}</th>
        <td></td>
        <td></td>
        <td>{this.props.data}</td>
      </tr>
    )
  }
}

export default TableRow