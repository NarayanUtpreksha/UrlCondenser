import React from "react";
import "./UserHistory.css";

interface ShortenedUrl {
  id: number;
  longUrl: string;
  shortUrl: string;
}

interface UserHistoryProps {
  urls: ShortenedUrl[];
}

const UserHistory: React.FC<UserHistoryProps> = ({ urls }) => {
  return (
    <div className="user-history mt-5">
      <h3 className="text-center mb-4">Your Shortened URLs</h3>
      {urls.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Long URL</th>
                <th>Short URL</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url, index) => (
                <tr key={url.id}>
                  <td>{index + 1}</td>
                  <td className="text-truncate" style={{ maxWidth: "300px" }}>
                    <a href={url.longUrl} target="_blank" rel="noopener noreferrer">
                      {url.longUrl}
                    </a>
                  </td>
                  <td>
                    <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                      {url.shortUrl}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No URLs found.</p>
      )}
    </div>
  );
};

export default UserHistory;