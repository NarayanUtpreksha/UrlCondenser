import React, { Component } from "react";
import ShortenUrl from "./components/ShortenUrl";

class App extends Component {
  render() {
    return (
      <div>
        <h1>URL Shortener</h1>
        <ShortenUrl />
      </div>
    );
  }
}

export default App;
