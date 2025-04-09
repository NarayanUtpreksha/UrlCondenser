import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUrl } from "../../slices/urlSlice";
import "./ShortenUrl.css";
import { RootState } from "../../store";

const ShortenUrl: React.FC = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [message, setMessage] = useState("");
  const BACKEND_URL = process.env.REACT_APP_BACKEND_BASE_URL;
  const dispatch = useDispatch();


  const { user } = useSelector((state: RootState) => state.auth as { user: { email: string } });

  const handleShortenUrl = async () => {
    if (!longUrl) {
      setMessage("Please enter a valid URL.");
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/shorten`,
        { longUrl, email: user?.email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
          },
        }
      );

      const newUrl = response.data; // Backend should return the new shortened URL object
      setShortUrl(newUrl.shortUrl);
      setMessage("URL shortened successfully!");
        
      // Dispatch action to add the new URL to Redux state
      dispatch(addUrl({
        longUrl: longUrl,
        shortUrl: newUrl.shortUrl,
      }));
    } catch (error) {
      setMessage("Failed to shorten the URL. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center shorten-url-container">
      <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-4">Shorten Your URL</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter URL"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button className="btn btn-primary btn-lg" onClick={handleShortenUrl}>
            Shorten
          </button>
        </div>

        {shortUrl && (
          <div className="mt-4 text-center">
            <p className="mb-0">Shortened URL:</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-primary fw-bold">
              {shortUrl}
            </a>
          </div>
        )}
        {message && <p className="mt-3 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default ShortenUrl;