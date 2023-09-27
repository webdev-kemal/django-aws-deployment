import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

// const verifyTokenValidity = async (token) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       //   Authorization: `Bearer ${token}`,
//     },
//   };

//   try {
//     const response = await axios.post(
//       "http://127.0.0.1:8000/api/user/verify/token",
//       { token: token }, // Send the token in the body
//       config
//     );
//     return response.data.valid;
//   } catch (error) {
//     return false;
//   }
// };

const ProtectedRoute = () => {
  const userLogin = useSelector((state) => state.user);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    const checkAndNavigate = async () => {
      // If there's no user info or token, redirect

      if (!userInfo || !userInfo.token) {
        navigate("/login");
        return;
      }

      // Check token validity.
      //   const isValid = await verifyTokenValidity(userInfo.token);
      //   console.log(`token validity is ${isValid}`);

      // If the token is not valid, redirect
    };

    checkAndNavigate();
  }, [userInfo, navigate]);

  // If no user info is present, avoid rendering the Outlet (or show a loader)
  if (!userInfo) {
    return null;
  }

  return <Outlet />;
};

export default ProtectedRoute;
