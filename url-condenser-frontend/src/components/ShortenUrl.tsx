import React, { Component } from "react";
import axios from "axios";

class ShortenUrl extends Component {
  state = {
    longUrl: "",
    shortUrl: "",
  };

  BACKEND_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ longUrl: event.target.value });
  };

  handleShorten = async () => {
    try {
        const response = await axios.post(`${this.BACKEND_URL}/shorten`, {
            longUrl: this.state.longUrl,
        });


        this.setState({ shortUrl: response.data });
    } catch (error) {
        console.error("Error shortening URL:", error);
    }
};

  render() {
    return (
      <div>
        <h2>Shorten Your URL</h2>
        <input
          type="text"
          placeholder="Enter URL"
          value={this.state.longUrl}
          onChange={this.handleChange}
        />
        <button onClick={this.handleShorten}>Shorten</button>

        {this.state.shortUrl && (
          <p>
            Shortened URL: <a href={this.state.shortUrl}>{this.state.shortUrl}</a>
          </p>
        )}
      </div>
    );
  }
}

export default ShortenUrl;
