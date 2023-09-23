import React from "react";
import Switch from "./Switch";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@chakra-ui/react";

const ExtendedNavbar = () => {
  const [isLargerThanMobile] = useMediaQuery("(min-width: 768px)");
  return (
    <nav class="navbar navbar-expand-lg navbar-dark navbar-bg w-100 mx-auto ">
      <div class="container-fluid custom-navbar">
        <a class="navbar-brand" href="/">
          <i class="fa-solid fa-gears white"></i>
          The Workshop
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {/* <span class="navbar-toggler-icon"></span> */}
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item me-4">
              <a
                class="nav-link navlink-hover  active"
                aria-current="page"
                href="/"
              >
                Exit Dashboard
                <span class="badge bg-success ms-1 p-1">Saved!</span>
              </a>
            </li>

            <li class="nav-item me-5">
              <a class="nav-link navlink-hover" href="/login">
                Log out
              </a>
            </li>
            {isLargerThanMobile ? (
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <Switch />
                </a>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default ExtendedNavbar;
