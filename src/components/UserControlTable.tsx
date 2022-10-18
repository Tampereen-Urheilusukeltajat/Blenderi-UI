import React, { useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'

// TODO: sync types with backend
type User = {
  id: string,
  email: string,
  forename: string,
  surname: string,
  isAdmin: boolean,
  isBlender: boolean
};

export const UserControlTable = () => {
  const [ users, setUsers ] = useState([
    {
      id: "esimerkkiID",
      email: "seppo.sukeltaja@sukeltajat.fi",
      forename: "Seppo",
      surname: "Sukeltaja",
      isAdmin: false,
      isBlender: true
    },
    {
      id: "esimerkkiID2",
      email: "hilma62@sukeltajat.fi",
      forename: "Hilma",
      surname: "Happi",
      isAdmin: true,
      isBlender: true
    },
    {
      id: "esimerkkiID3",
      email: "dan.dyy@sukeltajat.fi",
      forename: "Dan",
      surname: "Dyykkaaja",
      isAdmin: true,
      isBlender: false
    },
  ]);

  return (
    <div id="userControlTable">
      <Table borderless id="userTable">
        <thead id="userTableHead">
          <tr>
            <th>Nimi</th>
            <th>Sähköposti</th>
            <th>Blenderioikeudet</th>
            <th>Täyttöhistoria</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody id="userTableBody">
          {
          users.map(user => 
            <tr>
              <td>{user.forename} {user.surname}</td>
              <td>{user.email}</td>
              <td>{user.isBlender ? "Kyllä" : "Ei"}</td>
              <td><a href="">Näytä historia</a></td>
              <Button className="userTableBtn">Muokkaa</Button>
              <Button className="userTableBtn">Poista</Button>
            </tr>) }
        </tbody>
      </Table>
    </div>
  )
};
