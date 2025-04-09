import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUrls } from "../slices/urlSlice";
import axios from "axios";
import ShortenUrl from "./shortenurl/ShortenUrl";
import UserHistory from "./UserHistory";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_BASE_URL;
  const urls = useSelector((state: RootState) => state.urls.urls);

  useEffect(() => {
    const fetchUserUrls = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/urls`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
          },
        });
        dispatch(setUrls(response.data)); // Update Redux state with fetched URLs
      } catch (error) {
        console.error("Error fetching user URLs:", error);
      }
    };

    fetchUserUrls();
  }, [dispatch, BACKEND_URL]);

  return (
    <div className="container mt-5">
      <ShortenUrl />
      <UserHistory urls={urls} />
    </div>
  );
};

export default Dashboard;