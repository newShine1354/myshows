import React, { useContext, useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router";
import { TvMazeContext } from "../../contexts/tv-maze-api.context";
import ShowInfo from "../show-info/show-info.component";
import BookTicket from "../book-ticket/book-ticket.component";
import "./about-show.styles.scss";
import axios from "axios";
import { commonRoute } from "../../../constants";
import { useUser } from "@/contexts/user.context";



const AboutShow = () => {
  const { id } = useParams();
  const { shows, isBooked } = useContext(TvMazeContext);
  const {user} = useUser()
  const [searchParams, setSearchParams] = useSearchParams();
  const bookingFormOpen = searchParams.get("booking") === "true";
  const [details, setDetails] = useState({})
  const getShow = async ()=> {
    const data  = await axios.get(`${commonRoute}/show/${id}`, {
      headers: {
        Authorization: user.token,
        'Content-Type': 'application/json',
      },
    })
    setDetails(data?.data?.data)
  }

  useEffect(() => {
    getShow()
  }, [id])
  


  const handleProcessToBookTicket = () => {
    setSearchParams({ booking: "true" });
  };
  const handleBackToDetails = () => {
    // remove booking query param
    setSearchParams({});
  };
  if (!details) return null;

    if (details._id === (id)) {
    return (
      <>
        <div className="container-fluid about-container-top bg-black py-5 mb-3">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-white text-center">{bookingFormOpen ? "BOOK TICKET" : "SHOW DETAILS"}</h1>
            </div>
          </div>
        </div>

        <div className="container-fluid about-container">
          <div className="row p-4">
            <div className="col-md-4">
              <img src={details.image.original} className="img-fluid rounded" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="show-name mb-4 p-4 rounded">
                <h1>{details.name}</h1>
                <p>{details.summary.replace(/(<([^>]+)>)/gi, "")}</p>
              </div>
              <div className="row w-100 mx-auto small-details">
                {!bookingFormOpen ? (
                  <ShowInfo {...{ handleProcessToBookTicket, details }} />
                ) : (
                  <BookTicket details={details} handleBackToDetails={handleBackToDetails} />
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default AboutShow;
