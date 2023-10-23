import React, { useEffect, useState } from "react";
import "./dashboard.css";
import Navbar from "../../components/navbar/Navbar";
import ExtendedNavbar from "../../components/navbar/ExtendedNavbar";
import {
  SimpleGrid,
  Box,
  Grid,
  GridItem,
  IconButton,
  VStack,
  Button,
  Text,
  Heading,
  Flex,
  useMediaQuery,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
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
import AddCourse from "../../components/addcourse/AddCourse";
import { useNavigate, useParams } from "react-router-dom";
import EditCourse from "../../components/addcourse/EditCourse";
import { useAlertContext } from "../../context/AlertContext";

const Dashboard = () => {
  const userLogin = useSelector((state) => state.user);
  const { userInfo } = userLogin;
  const { theme } = useTheme();

  const navigate = useNavigate();
  const { id } = useParams();

  const { onOpen } = useAlertContext();

  const MyCourses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
      // Load courses from localStorage when component mounts
      const savedCourses = localStorage.getItem("courses");
      if (savedCourses) {
        console.log(`${savedCourses} ve sayısı toplam ${savedCourses.length}`);
        setCourses(JSON.parse(savedCourses));
      }
    }, []);

    const handleRemoveCourse = (courseId) => {
      onOpen(
        "delete",
        "Bu kursu silmek istediğinizden emin misiniz?",
        () => {
          // Filter out the course with the given ID
          const updatedCourses = courses.filter(course => course.id !== courseId);
          
          // Update the localStorage
          localStorage.setItem("courses", JSON.stringify(updatedCourses));
    
          // Update the state directly with the filtered list
          setCourses(updatedCourses);
        }
      );
    };
    
    


    return (
      <>
        <Heading fontSize="xl" w="100%" mb={3}>
          {courses.length >= 1
            ? `${courses.length} adet kursunuzdan${" "}
          ${courses.filter((course) => course.isDraft === true).length} tanesi
          taslak modda.`
            : "Hiç kursunuz yok. Kurs oluşturmak için aşağıdaki butona basın."}
        </Heading>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            // lg: "repeat(2, 1fr)",
            // xl: "repeat(3, 1fr)",
            // "2xl": "repeat(4, 1fr)",
          }}
          rowGap={"15px"}
          columnGap={"20px"}
        >
          {courses?.map((course, index) => (
            <Box
              key={course.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              transition="0.3s"
              _hover={{
                cursor: "pointer",
                transform: "scale(1.03)",
                transition: "0.3s",
              }}
              onClick={() => {
                navigate(`${course.id}`);
              }}
              pos={"relative"}
              h={"160px"}
            >
              <Heading fontSize="xl">{course.courseName}</Heading>
              <Text mt={2}>{course.desc}</Text>
              <Badge mt={2} colorScheme="teal">
                {course.parts.length}{" "}
                {course.parts.length === 1 ? "ÜNİTE" : "ÜNİTE"}
              </Badge>

              <Menu placement="left-start">
                <MenuButton
                  as={IconButton}
                  pos={"absolute"}
                  right={"10px"}
                  top={"10px"}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  aria-label="Settings"
                  icon={<SettingsIcon />}
                />
                <MenuList >
                  <MenuItem  onClick={() => {return;}}>
                    Kursu Düzenle
                  </MenuItem>
                  <MenuItem onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveCourse(course.id)
                  }} >
                    Kursu Sil
                  </MenuItem>
                </MenuList>
              </Menu>
              {course.isDraft ? (
                <Text
                  pos={"absolute"}
                  right={"10px"}
                  bottom={"0px"}
                  color="orange"
                  fontWeight={"bold"}
                >
                  Taslak Kurs
                </Text>
              ) : (
                <Text
                  pos={"absolute"}
                  right={"10px"}
                  bottom={"0px"}
                  color="green"
                  fontWeight={"bold"}
                >
                  Yayında!
                </Text>
              )}
                <Text
                  pos={"absolute"}
                  left={"10px"}
                  bottom={"0px"}
                
                  fontSize="sm" color="gray.500" mt={2}
                >
            
        Son güncelleme: {new Date(course.lastUpdated).toLocaleDateString()} {new Date(course.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
     
                </Text>
            </Box>
          ))}

<Box  
  borderWidth="1px"
  borderRadius="lg"
  p={4}
  transition="0.3s"
  _hover={{
    cursor: "pointer",
    transform: "scale(1.03)",
    transition: "0.3s",
  }}
  onClick={() => {
    setActiveDash("dash2");
  }}
  pos={"relative"}
  h={"160px"}
>
  <Heading fontSize="xl"  pos={"absolute"} top="50%" left="50%" transform={"translate(-50%, -50%)"}>Yeni Kurs Oluştur</Heading>
</Box>

         
          {/* <Button
            variation="outline"
            onClick={() => {
              localStorage.removeItem("courses");
            }}
          >
            Delete Courses
          </Button> */} 
        </Grid>
      </>
    );
  };

  useEffect(() => {
    // console.log(userInfo.isTeacher);
    if (id) {
      // renderDash(2)
    }
  }, []);

  // Table function
  const [activeDash, setActiveDash] = useState("dash1");

  const renderDash = () => {
    switch (activeDash) {
      case "dash1":
        return <Box>{id ? <EditCourse switchDash={()=>{setActiveDash("dash1")}}/> : <MyCourses />}</Box>;
      case "dash2":
        return (
          <Box>
            <AddCourse />
          </Box>
        );

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
        onClick={() => {
          if (id) {
            onOpen(
              "continue",
              "Kaydedilmemiş değişiklikler olabilir, yine de devam edilsin mi?",
              () => {
                setActiveDash(dashId);
                navigate("/protected");
              }
            );
          } else {
            setActiveDash(dashId);
          }
        }}
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
            {/* <NavLink dashId="dash3">
              <Flex align="center">
                <BsAsterisk size={28} color="white" />
                &nbsp;&nbsp;Yönetim
              </Flex>
            </NavLink> */}
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
