import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Switch, useMediaQuery } from "@chakra-ui/react";
import Mobile from "./Mobile";

const Desktop = () => {
  const navigate = useNavigate();
  const [isLargerThanMobile] = useMediaQuery("(min-width: 768px)");
  return (
    <Box
      as="nav"
      shadow="xl"
      mt={{
        base: "0px",
        md: "20px",
      }}
      className="navbar navbar-expand-lg navbar-dark navbar-bg"
      w={{
        base: "100%",
        md: "75%",
      }}
      rounded={{
        base: "0px",
        md: "30px",
      }}
      mx="auto"
    >
      <div class="container-fluid custom-navbar">
        <a class="navbar-brand" href="/">
          <span class="spans">&#123;</span>
          ReactLingrrt
          <span class="spans">&#125;</span>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          color="#323AB7"
        >
          <span class="navbar-toggler-icon "></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item me-4">
              <a
                class="nav-link navlink-hover active"
                aria-current="page"
                onClick={() => navigate("/")}
              >
                Ana Sayfa
              </a>
            </li>
            <li className="nav-item me-4">
              <a
                class="nav-link navlink-hover"
                onClick={() => navigate("/courses")}
              >
                Dersler
              </a>
            </li>
            {/* <li class="nav-item">
                <a class="nav-link disabled position-relative" href="#">
                  Analysis
                  <span class="badge bg-warning ms-1 text-dark p-1">Pro</span>
                </a>
              </li>*/}
            <li class="nav-item me-4">
              <a
                class="nav-link navlink-hover position-relative"
                onClick={() => navigate("/dashboard")}
              >
                Öğretmen
                <span class="badge bg-warning ms-1 text-dark p-1 badge-color">
                  admin
                </span>
              </a>
            </li>
            <li class="nav-item  me-5">
              <a
                class="nav-link navlink-hover"
                onClick={() => navigate("/login")}
              >
                Giriş Yap
              </a>
            </li>
            {isLargerThanMobile ? (
              <li class="nav-item">
                <a class="nav-link " href="#">
                  <Switch />
                </a>
              </li>
            ) : (
              <p>empty</p>
            )}
          </ul>
        </div>
      </div>
    </Box>
  );
};

export default Desktop;
