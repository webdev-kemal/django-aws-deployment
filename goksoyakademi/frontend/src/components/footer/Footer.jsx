import React from "react";
import "./footer.css";
import { Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <footer className="w-100 custom-footer shadow-lg">
      <div className="container w-75 m-auto d-flex justify-content-center">
        <Text
          p={1}
          bg="black"
          borderRadius={{ base: "20px 0px 20px 0px" }}
          fontWeight={700}
          fontSize="xl"
          color="white"
          m={0}
        >
          {/* <span class="spans">&#123;</span> */}
          &nbsp;Yoğurt Akademi&nbsp;
          {/* <span class="spans">&#125;</span> */}
        </Text>
        {/* <div className="row">
          <div className="col text-start">webdev-kemal/react-quiz-app/</div>
          <div className="col text-center">Made with ❤️ by mkod.</div>
          <div className="col text-end">
            <a href="https://www.instagram.com/dev.kemal/" target="_blank">
              instagram
            </a>{" "}
            |{" "}
            <a href="https://github.com/webdev-kemal" target="_blank">
              github
            </a>{" "}
            | linkedin{" "}
          </div> */}
        {/* </div> */}
        {/* <div className="row">
          <div className="col text-start">One of three columns</div>
          <div className="col text-center">One of three columns</div>
          <div className="col text-end">One of three columns</div>
        </div>
        <div className="row">
          <div className="col text-start">One of three columns</div>
          <div className="col text-center">One of three columns</div>
          <div className="col text-end">One of three columns</div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
