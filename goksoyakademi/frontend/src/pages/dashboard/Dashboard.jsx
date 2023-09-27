import React, { useEffect, useState } from "react";
import "./dashboard.css";
import Navbar from "../../components/navbar/Navbar";
import ExtendedNavbar from "../../components/navbar/ExtendedNavbar";
import {
  SimpleGrid,
  Box,
  Grid,
  GridItem,
  VStack,
  Button,
  Text,
  Heading,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  BsUpload,
  BsAsterisk,
  BsGrid1X2Fill,
  BsPlusSquare,
  BsPlus,
  BsSave2,
} from "react-icons/bs";
import { useTheme } from "../../context/ThemeContext";
import CourseCard from "../../components/cards/courseCard";

const Dashboard = () => {
  const userLogin = useSelector((state) => state.user);
  const { userInfo } = userLogin;
  const { theme } = useTheme();

  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${userInfo.token}`,
  //     },
  //   };

  //   try {
  //     const response = await axios.get(
  //       "http://127.0.0.1:8000/api/user/verify/teacher",
  //       config
  //     );
  //     return response.data.isTeacher;
  //   } catch (error) {
  //     console.error("Error verifying isTeacher status:", error);
  //     return false;
  //   }
  // };

  // const checkIsTeacher = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://127.0.0.1:8000/api/user/verify/teacher"
  //     );
  //     return response.data.isTeacher;
  //   } catch (error) {
  //     console.error("Error verifying isTeacher status:", error);
  //     return false;
  //   }
  // };

  // useEffect(() => {
  //   const fetchIsTeacher = async () => {
  //     const result = await checkIsTeacher();
  //     console.log(`is teacher : ${result}`);
  //   };

  //   fetchIsTeacher();
  // }, [userInfo]);

  const MyCourses = () => {
    return (
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          // lg: "repeat(2, 1fr)",
          // xl: "repeat(3, 1fr)",
          // "2xl": "repeat(4, 1fr)",
        }}
        rowGap={"50px"}
        columnGap={"150px"}
      >
        <CourseCard
          courseId="121"
          courseTitle="Plus Üyelik"
          // courseImage="teacher1.jpg"
          authorName="Göksoy Akademi"
          authorProfile="https://picsum.photos/1920/1080"
          courseDescription="Tüm kurslara ve quizlere erişim sağlayın!"
        />
      </Grid>
    );
  };

  useEffect(() => {
    console.log(userInfo.isTeacher);
  }, []);

  // Table function
  const [activeDash, setActiveDash] = useState("dash1");

  const renderDash = (dashId) => {
    switch (dashId) {
      case "dash1":
        return (
          <Box>
            <MyCourses />
          </Box>
        );
      case "dash2":
        return <Box>Dashboard 2 Content</Box>;
      case "dash3":
        return <Box>Dashboard 3 Content</Box>;
      case "dash4":
        return <Box>Dashboard 4 Content</Box>;
      case "dash5":
        return <Box>Dashboard 5 Content</Box>;
      default:
        return null;
    }
  };

  const NavLink = ({ dashId, children }) => {
    const isActive = activeDash === dashId;
    return (
      <Box
        as={Flex}
        w="100%"
        h="100%"
        py={4}
        px={4}
        bg={isActive ? "rgba(0,0,0,0.2)" : "transparent"}
        borderRadius="md"
        fontSize={"lg"}
        alignItems="center"
        _hover={{
          bg: isActive ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.1)",
          cursor: "pointer",
        }}
        onClick={() => setActiveDash(dashId)}
        color={"white"}
      >
        {children}
      </Box>
    );
  };

  const iconStyles = { color: "white", fontSize: "1.5em" };

  return (
    <div className="mh-100vh ">
      <ExtendedNavbar />
      {/* Sidebar */}
      <Grid
        my={25}
        mx={{ base: 0, md: 55, xl: 100 }}
        templateColumns="repeat(10, 1fr)"
        bg="gray.50"
        minH={{ md: "1000px" }}
        rounded="lg"
        overflow="hidden"
      >
        {/* Assuming ExtendedNavbar is another component you have */}

        <GridItem
          as="aside"
          colSpan={{ base: 10, md: 3, xl: 2 }}
          bg={theme === "light" ? "green.300" : "purple.300"}
          p={4}
        >
          <VStack align="start" spacing={2}>
            <NavLink dashId="dash1">
              <Flex align="center">
                {/* <Box as={BsGrid1X2Fill} size={"20px"} color="white" /> */}
                <BsGrid1X2Fill size={26} color="white" />
                &nbsp;&nbsp;Kurslarım
              </Flex>
            </NavLink>
            <NavLink dashId="dash2">
              <BsPlusSquare size={28} color="white" />
              &nbsp;&nbsp;Kurs Ekle
            </NavLink>
            <NavLink dashId="dash3">
              <Flex align="center">
                <BsAsterisk size={28} color="white" />
                &nbsp;&nbsp;Yönetim
              </Flex>
            </NavLink>
            <NavLink dashId="dash4">
              <Flex align="center">
                <BsUpload size={28} color="white" />
                &nbsp;&nbsp;Ayarlar
              </Flex>
            </NavLink>
            <NavLink mt={5} dashId="dash5">
              <Flex align="center">
                <BsSave2 size={26} color="white" />
                &nbsp;&nbsp;Çıkış Yap
              </Flex>
            </NavLink>
          </VStack>
        </GridItem>

        <GridItem as="dash" colSpan={{ base: 10, md: 7, xl: 8 }} p={5}>
          {renderDash(activeDash)}
        </GridItem>
      </Grid>
      <div
        class="ldBar"
        style={{ width: "100%", height: "60px" }}
        data-stroke="data:ldbar/res,gradient(0,1,#9df,#9fd,#df9,#fd9)"
        data-path="M10 20Q20 15 30 20Q40 25 50 20Q60 15 70 20Q80 25 90 20"
        data-value="50"
      ></div>
    </div>
  );
};

const Dash = () => {
  return (
    <SimpleGrid columns={4} spacing={10} minChildWidth={250}>
      <Box bg="white" h="200px" border="1px solid"></Box>
      <Box bg="white" h="200px" border="1px solid"></Box>
      <Box bg="white" h="200px" border="1px solid"></Box>
      <Box bg="white" h="200px" border="1px solid"></Box>

      <Box bg="white" h="200px" border="1px solid"></Box>
      <Box bg="white" h="200px" border="1px solid"></Box>
      <Box bg="white" h="200px" border="1px solid"></Box>
    </SimpleGrid>
  );
};

export default Dashboard;
