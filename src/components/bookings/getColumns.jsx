import React from "react";

const getColumns = () => {
  const cols = [
    {
      accessor: "username",
      title: "Username",
    },
    {
      accessor: "email",
      title: "Email",
    },
    {
      accessor: "booked_show.name",
      title: "Show Name",
    },
    {
      accessor: "booked_show.genres",
      title: "Type",
      render: (row) => <p>{row.booked_show.genres.join(" ,")}</p>,
    },
    {
      accessor: "booked_show.schedule",
      title: "Time",
      render: (row) => <p>{row.booked_show.genres.join(" ,")}</p>,
    },
    {
      accessor: "booked_show.schedule.days",
      title: "Day",
      render: (row) => <p>{row.booked_show.schedule.days[0]}</p>,
    },
    {
      accessor: "booked_show.schedule.time",
      title: "Time",
      render: (row) => <p>{row.booked_show.schedule.time}</p>,
    },
  ];
  return cols;
};

export default getColumns;
