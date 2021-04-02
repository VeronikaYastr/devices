import React from 'react';
import {Navbar} from "react-bootstrap";
import {observer} from "mobx-react";
import {devicesStore} from "./devices/DevicesStore"
import DevicesList from "./devices/DevicesList";

const App = observer(() =>
  <>
    <Navbar bg="light" variant="light" expand="lg">
      <Navbar.Brand title={"Device list application"}>
        Device list
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Total in cart: {devicesStore.devicesCart.length ?
          devicesStore.devicesCart.map(i => i.quantity).reduce((x, y) => x + y) : 0} item(s)
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
    <DevicesList/>
  </>);

export default App;
