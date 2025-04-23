import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../error-message/error-message.component";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import "./book-ticket.styles.scss";
import ShowTicket from "../show-ticket/show-ticket.component";
import { useContext } from "react";
import { TvMazeContext } from "../../contexts/tv-maze-api.context";
import axios from "axios";
import { commonRoute } from "../../../constants";
import { useUser } from "@/contexts/user.context";

const schema = z.object({
  name: z.string().min(3, "Name is too short"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number is too short"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
  time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time"),
  seats: z.string().regex(/^\d+$/, "Invalid seats"),
});

const BookTicket = ({ details, handleBackToDetails }) => {
  const { isBooked, bookedTickets, setBookedTickets } =
    useContext(TvMazeContext);
  4;
  const bookedShow = isBooked(details._id);
  const [searchParams, setSearchParams] = useSearchParams();
  const editTicket = searchParams.get("edit") === "true";
  const { user } = useUser();
  const handleBookTicket = async () => {
    const data = await axios.put(
      `${commonRoute}/show`,
      { id: details._id },
      {
        headers: {
          Authorization: user.token,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("data", data);
  };
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data) => {
    const newTicket = {
      ...details,
      ticketDetails: data,
    };
    if (bookedShow) {
      const existingTicketIndex = bookedTickets.findIndex(
        (ticket) => ticket._id === details._id
      );
      const updatedTickets = [...bookedTickets];
      updatedTickets[existingTicketIndex] = newTicket;
      setBookedTickets(updatedTickets);
    } else {
      setBookedTickets([...bookedTickets, newTicket]);
      handleBookTicket();
    }
    setSearchParams({ booking: "true", edit: "false" });
  };
  useEffect(() => {
    if (bookedShow) {
      const { ticketDetails } = bookedShow;
      Object.keys(ticketDetails).forEach((key) => {
        setValue(key, ticketDetails[key]);
      });
    }
  }, [bookedShow]);
  if (bookedShow && !editTicket) {
    return <ShowTicket ticket={bookedShow} />;
  }
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];
  return (
    <form className="ticket-book-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="row mx-auto">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              {...register("name")}
            />
            <ErrorMessage message={errors.name?.message} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              {...register("email")}
            />
            <ErrorMessage message={errors.email?.message} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              {...register("phone")}
            />
            <ErrorMessage message={errors.phone?.message} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              min={minDate}
              name="date"
              {...register("date")}
            />
            <ErrorMessage message={errors.date?.message} />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <select
              name="time"
              id="time"
              {...register("time")}
              className="form-control"
            >
              <option value="10:00">10 am</option>
              <option value="13:00">1 pm</option>
              <option value="16:00">4 pm</option>
              <option value="21:00">9 pm</option>
              <option value="13:30">11:30 pm</option>
            </select>
            <ErrorMessage message={errors.time?.message} />
          </div>
          <div className="form-group">
            <label htmlFor="seats">Seats</label>
            <input
              type="number"
              className="form-control"
              id="seats"
              name="seats"
              {...register("seats")}
            />
            <ErrorMessage message={errors.seats?.message} />
          </div>
        </div>
        <div className="row w-100 mobile-screen-btn p-0 m-0">
          <div className="col-md-4 mt-4">
            <button
              type="button"
              className="show-btn"
              onClick={handleBackToDetails}
            >
              Back to Details
            </button>
          </div>
          <div className="col-md-8 mt-4">
            <button type="submit" className="show-btn dark">
              {bookedShow ? "Update Ticket" : "Book Ticket"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default BookTicket;
