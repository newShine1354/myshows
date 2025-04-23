// import useState, useEffect, useContext, and TvMazeContext
import React, { useContext, useEffect, useState } from "react";
import { TvMazeContext } from "./contexts/tv-maze-api.context";
import { useNavigate, useSearchParams } from "react-router";

import ShowCard from "./components/show-card/show-card.component";

import "./App.scss";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import TvMazeApi from "./api/tv-maze.api";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUser } from "./contexts/user.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faVideo } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { commonRoute } from "../constants";

function App() {
  const { shows, bookedTickets } = useContext(TvMazeContext);
  const { user, logout } = useUser();
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("search") || "";
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const bookedTab = searchParams.get("booked") === "true";

  const handleSearchChange = (event) => {
    setSearchParams({ search: event.target.value });
  };

  useEffect(() => {
    if (!searchParams.get("booked")) {
      setSearchParams({ booked: "false" }); // default to All
    }
  }, []);

  const getAllShows = async () => {
    const data = await axios.get(`${commonRoute}/show`, {
      headers: {
        Authorization: user.token,
        "Content-Type": "application/json",
      },
    });
    setSearchResults(data?.data?.data || []);
  };

  useEffect(() => {
    if (bookedTab) {
      setSearchResults(bookedTickets);
    } else if (user.token) {
      getAllShows();
    }
  }, [searchParams, user.token]);

  useEffect(() => {
    if (!user.isLoggedIn) {
      logout();
    }
  }, []);

  return (
    <div className="App position-relative">
      <div className="container-fluid main-hero">
        <div className="row">
          <div className="col-md-12 hero-text">
            <button
              className="position-absolute btn btn-warning"
              style={{ top: -130, right: 30 }}
              onClick={logout}
            >
              Logout <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
            </button>
            {user.role === "ADMIN" && (
              <button
                className="position-absolute btn btn-warning"
                style={{ top: -130, left: 30 }}
                onClick={() => navigate("/tickets")}
              >
                Tickets 🎟️
              </button>
            )}
            <h1 className="text-center">Book Your SHOWS</h1>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="btn-group btn-group-toggle ">
          <Link
            to="?booked=false"
            className={`btn btn-dark ${!bookedTab ? "active" : ""}`}
          >
            All Shows
          </Link>
          <Link
            to="?booked=true"
            className={`btn btn-dark ${bookedTab ? "active" : ""}`}
          >
            Booked
          </Link>
        </div>
      </div>
      <div className="search-filter">
        <div className="input-box">
          <input
            type="text"
            placeholder="Search For Movie...."
            value={searchTerm}
            onChange={(event) => handleSearchChange(event)}
          />
        </div>
      </div>
      <div className="show-card-div">
        <>
          {searchResults.length === 0 ? (
            <div className="text-center">
              <h2>{false ? "Loading..." : "No Shows Found"}</h2>
            </div>
          ) : (
            searchResults.map((show, index) => (
              <ShowCard key={show._id} show={show} index={index} />
            ))
          )}
        </>
      </div>
    </div>
  );
}

export default App;
