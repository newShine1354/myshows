import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";
import { TvMazeProvider } from "./contexts/tv-maze-api.context";
import { createBrowserRouter, RouterProvider, Route } from "react-router";

import AboutShow from "./components/about-show/about-show.component";
import BookTicket from "./components/book-ticket/book-ticket.component";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./contexts/user.context";
import Booking from "./components/bookings/booking";
import { MantineProvider } from "@mantine/core";

const router = createBrowserRouter([
  // root route
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/shows/:id",
    element: <AboutShow />,
  },
  {
    path: "/shows/:id/book-ticket",
    element: <BookTicket />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/tickets",
    element: <Booking />,
  },
]);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <UserProvider>
          <TvMazeProvider>
            <Toaster position="top-center" reverseOrder={false} />
            <RouterProvider router={router} />
          </TvMazeProvider>
        </UserProvider>
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
