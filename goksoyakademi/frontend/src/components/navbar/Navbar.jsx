import React, { useEffect, useState } from "react";
import Switch from "./Switch";
import "./navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
// import { Link } from "react-router-dom";
import { useMediaQuery, Text, Button, Flex } from "@chakra-ui/react";
import {
  MdShoppingCart,
  MdPerson2,
  MdSchool,
  MdHomeFilled,
} from "react-icons/md";
import { Box, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import Mobile from "./Mobile";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/user";

const Navbar = () => {
  const [isDesktop] = useMediaQuery("(min-width: 62em)");

  const navigate = useNavigate();
  const location = useLocation();

  const userLogin = useSelector((state) => state.user);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {}, [location.pathname]);

  return (
    // <nav class="navbar navbar-expand-lg navbar-dark navbar-bg mt-3 w-75 mx-auto rounded-5">
    <div>
      {isDesktop ? (
        <Box
          whiteSpace="nowrap"
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
            <Text
              onClick={() => {
                navigate("/");
              }}
              cursor="pointer"
              p={1}
              bg="black"
              borderRadius={{ base: "20px 0px 20px 0px" }}
              fontWeight={800}
              fontSize="xl"
              color="white"
              m={0}
              className="navbar-text"
              // display="inline-block" // this is the line to add
            >
              {/* <span class="spans">&#123;</span> */}
              &nbsp;Göksoy Akademi&nbsp;
              {/* <span class="spans">&#125;</span> */}
            </Text>
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
              {/* <span class="navbar-toggler-icon"></span> */}
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
                    Kurslar&ensp;
                    <MdSchool />
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
                    onClick={() => navigate("/quiz")}
                  >
                    Quiz
                    <span class="badge bg-warning text-dark p-1 badge-color ms-2">
                      plus
                    </span>
                  </a>
                </li>
                {/* {isDesktop ? (
                  <li class="nav-item">
                    <a class="nav-link " href="#">
                      <Switch />
                    </a>
                  </li>
                ) : ( 
                 <p></p>
                )} */}
                {isDesktop ? (
                  <li class="nav-item  me-4">
                    <a
                      class="nav-link navlink-hover"
                      onClick={() => navigate("/cart")}
                    >
                      Sepetim&ensp;
                      <MdShoppingCart />
                    </a>
                  </li>
                ) : (
                  <p></p>
                )}
                {!userInfo ? (
                  <li class="nav-item  me-4">
                    <a
                      class="nav-link navlink-hover"
                      onClick={() => navigate("/login")}
                    >
                      Giriş Yap&ensp;
                      <MdPerson2 />
                    </a>
                  </li>
                ) : (
                  <li class="nav-item  me-4">
                    {/* Profil&ensp;
                    <MdPerson2 /> */}

                    <Menu>
                      <MenuButton className="navlink-hover">
                        <div class="nav-link ">
                          {userInfo.first_name ? userInfo.first_name : "IDK"}
                          &ensp;
                          <MdPerson2 />
                        </div>
                      </MenuButton>
                      <MenuList>
                        <MenuItem
                          onClick={() => {
                            navigate("/profile");
                          }}
                        >
                          Profil
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            navigate("/protected");
                          }}
                        >
                          Öğretmen
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
                      </MenuList>
                    </Menu>

                    {/* {userInfo.name} */}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Box>
      ) : (
        <Mobile />
      )}
    </div>
  );
};

export default Navbar;
