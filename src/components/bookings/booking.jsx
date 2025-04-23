import React, { useEffect, useState } from "react";
import { DEFAULT_QUERY, Table } from "./table";
import axios from "axios";
import { commonRoute } from "../../../constants";
import { useUser } from "@/contexts/user.context";
import getColumns from "./getColumns";
import { useNavigate } from "react-router";

const Booking = () => {
  const { user } = useUser();
  const [queryData, setQueryData] = useState(DEFAULT_QUERY);
  const navigate = useNavigate();
  // const [selectedRows, setSelectedRows] = useState([]);
  const [tickets, setTickets] = useState({ data: [], count: 0 });
  const getAllBookings = async () => {
    const data = await axios.get(`${commonRoute}/show/all-booked`, {
      headers: {
        Authorization: user.token,
        "Content-Type": "application/json",
      },
    });
    if (data.data.data.length > 0) {
      const convertedUsers = data.data.data.flatMap((user) =>
        user.booked_shows.map((show) => ({
          ...user,
          booked_show: show,
        }))
      );
      setTickets({
        data: convertedUsers,
        count: convertedUsers.length,
      });
      console.log("data.data.data :>> ", convertedUsers);
    }
  };
  useEffect(() => {
    if (user.token) {
      getAllBookings();
    }
  }, [user]);
  const handlePageChange = (filters) => {
    setQueryData(filters);
  };

  useEffect(() => {
    if (user.role !== "ADMIN") {
      navigate("/");
    }
  }, []);

  // const handleRowSelection = (rows) => {
  //   if (rows?.length) {
  //     setSelectedRows(rows.map((row) => row.id));
  //   } else {
  //     setSelectedRows([]);
  //   }
  // };

  return (
    <div>
      <Table
        records={tickets.data}
        columns={getColumns()}
        totalRecords={tickets?.count || 0}
        onPageChange={handlePageChange}
        filters={queryData}
        // onRowSelection={handleRowSelection}
      />
    </div>
  );
};

export default Booking;
