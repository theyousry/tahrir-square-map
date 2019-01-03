import React, { Component } from "react";
import Sidebar from "react-sidebar";
import { Button, Glyphicon } from "react-bootstrap";
import scriptLoader from 'react-async-script-loader'
import "./App.css";
import Map from "./components/Map";

const mql = window.matchMedia(`(min-width: 800px)`);
let map = {};

class App extends Component {
  state = {
    sidebarDocked: mql.matches,
  sidebarOpen: true
};

mediaQueryChanged = this.mediaQueryChanged.bind(this);
 onSetSidebarOpen = this.onSetSidebarOpen.bind(this);

 componentWillMount() {
   mql.addListener(this.mediaQueryChanged);
 }

  componentWillUnmount() {
   this.state.mql.removeListener(this.mediaQueryChanged);
 }

 onSetSidebarOpen(open) {
  this.setState({ sidebarOpen: open });
}

mediaQueryChanged() {
  this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
}

componentWillReceiveProps({ isScriptLoadSucceed }) {
  if(isScriptLoadSucceed) {
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 30.043456, lng: 31.227104},
      zoom: 16,
      mapTypeControl: false
    });
  }
}

  render() {
    return (
      <div className="app">
      <Sidebar
        sidebar={<p>Sidebar content</p>}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        docked={this.state.sidebarDocked}
        sidebarClassName={'sidebar'}
        styles={{ sidebar: { background: "#1e2129" } }}
      >
      <Button className="sidebar-button" onClick={() => this.onSetSidebarOpen(true)}>
        <Glyphicon glyph="align-justify" />
      </Button>
      </Sidebar>
      <Map />
      </div>
    );
  }
}

export default scriptLoader(
  ['https://maps.googleapis.com/maps/api/js?key=AIzaSyDOs2tzna3TMd0EqQmzzGWhICt5RisWX6A']
)(App)
