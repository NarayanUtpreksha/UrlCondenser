import React, { Component } from "react";
import ShortenUrl from "./components/ShortenUrl";
import Navbar from "./components/NavBar";
import "./App.css";
class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <ShortenUrl />
      </div>
    );
  }
}

export default App;
