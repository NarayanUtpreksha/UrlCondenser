import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./ShortenUrl.css"; // Custom CSS for additional styling

class ShortenUrl extends Component {
  state = {
    longUrl: "",
    shortUrl: "",
  };

  BACKEND_URL = process.env.REACT_APP_BACKEND_BASE_URL

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
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
          <h2 className="text-center mb-4">Shorten Your URL</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter URL"
              value={this.state.longUrl}
              onChange={this.handleChange}
            />
          </div>
          <div className="d-grid">
            <button
              className="btn btn-primary btn-lg"
              onClick={this.handleShorten}
            >
              Shorten
            </button>
          </div>

          {this.state.shortUrl && (
            <div className="mt-4 text-center">
              <p className="mb-0">Shortened URL:</p>
              <a
                href={this.state.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary fw-bold"
              >
                {this.state.shortUrl}
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ShortenUrl;