import React from "react";

class Users extends React.Component  {
  constructor() {
    super();
    this.state = {
      data: [],
    }
  };
  componentDidMount() {
    fetch('/users').then((Response) => Response.json()).
      then((users) => {
        console.log(users)
        this.setState({
          data: users
        })
      })
  };

  render() {
    return (
      <div>
        <h1>Users</h1>
      <table className="tat">
        <tr><th>name</th></tr>
        {
          this.state.data.map((user) =>
            <tr className="trow"> <td>{user.name}</td></tr>
          )}
      </table>
      </div>
    )
  }
}

export default Users;