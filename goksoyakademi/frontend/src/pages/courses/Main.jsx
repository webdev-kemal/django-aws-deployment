import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Container from "../../components/containers/container";

import CourseCard from "../../components/cards/courseCard";
import ImageCard from "../../components/cards/imageCard";
import { FaSearch } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Grid,
  GridItem,
  Button,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  CheckboxGroup,
  Checkbox,
  Stack,
  Spinner,
} from "@chakra-ui/react";

import { StarIcon } from "@chakra-ui/icons";
import TuneIcon from "@mui/icons-material/Tune";
import AppsIcon from "@mui/icons-material/Apps";
import GradeIcon from "@mui/icons-material/Grade";
import Footer from "../../components/footer/Footer";

// alert context
import { useAlertContext } from "../../context/AlertContext";

// import axios from "axios";
import { ListCourses } from "../../actions/courses";
import { useDispatch, useSelector } from "react-redux";

const Main = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  // const [coursesData, setCoursesData] = useState([]);
  const { onOpen } = useAlertContext();

  const dispatch = useDispatch();
  const coursesList = useSelector((store) => store.courseStore);
  const { loading, error, courses } = coursesList;

  // const getCourses = () => {
  //   axios
  //     .get("http://127.0.0.1:8000/api/courses/")
  //     .then((response) => {
  //       setCoursesData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error fetching the courses:", error);
  //     });
  // };

  useEffect(() => {
    dispatch(ListCourses());
    // async function getCourses() {
    //   const response = await axios.get("http://127.0.0.1:8000/api/courses/");
    //   setCoursesData(response.data);
    // }
    // getCourses();
  }, []);

  useEffect(() => {
    if (error) {
      onOpen("error", error);
    }
  }, [error]);

  const handleSearch = (event) => {
    // Handle search here
    event.preventDefault(); // prevent form submission
    // Handle search here
    // console.log(searchTerm);
    setSearchTerm(""); // reset search term
  };

  return (
    <div>
      <div className="mh-100vh">
        <Navbar />
        <Container mb={5}>
          <Grid templateColumns="repeat(6, 1fr)">
            <GridItem as="aside" colSpan={{ base: 6, lg: 2, xl: 1 }}>
              <Button
                display="flex"
                alignItems="center"
                justifyContent="center"
                variant="link"
                colorScheme="whiteAlpha.900"
              >
                <AppsIcon />
                <Text mt="15px" ms="5px">
                  Tümü
                </Text>
              </Button>
              <Button
                display="flex"
                alignItems="center"
                justifyContent="center"
                variant="link"
                colorScheme="whiteAlpha.900"
                mt="-10px"
              >
                <GradeIcon />
                <Text mt="15px" ms="5px">
                  Sertifikalı
                </Text>
              </Button>

              {/* <Button
                display="flex"
                alignItems="center"
                justifyContent="center"
                variant="link"
                colorScheme="whiteAlpha.900"
              >
                <TuneIcon />
                <Text mt="15px" ms="5px">
                  Filtrele
                </Text>
              </Button> */}

              <Accordion defaultIndex={[0]} allowMultiple width="90%">
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        Dile Göre
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Checkbox w="100%" value="ingilizce" defaultChecked>
                      İngilizce
                    </Checkbox>
                    <Checkbox w="100%" value="fransizca">
                      Fransızca
                    </Checkbox>
                    <Checkbox w="100%" value="almanca">
                      Almanca
                    </Checkbox>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        Seviyeye Göre
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Checkbox defaultChecked>Başlangıç Seviye</Checkbox>
                    <Checkbox defaultChecked>Orta Seviye</Checkbox>
                    <Checkbox defaultChecked>İleri Seviye</Checkbox>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        Puana Göre
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Checkbox defaultChecked>
                      <StarIcon color="orange" />
                      <StarIcon color="orange" />
                      <StarIcon color="orange" />
                      <StarIcon color="orange" />
                      <StarIcon
                        // clipPath="polygon(0 0, 50% 0, 50% 100%, 0% 100%)"
                        color="orange"
                      />
                    </Checkbox>
                    <Checkbox defaultChecked w="100%">
                      {" "}
                      <StarIcon color="orange" />
                      <StarIcon color="orange" />
                      <StarIcon color="orange" />
                      <StarIcon color="orange" />
                    </Checkbox>
                    <Checkbox defaultChecked w="100%">
                      <StarIcon color="orange" />
                      <StarIcon color="orange" />
                      <StarIcon color="orange" />
                    </Checkbox>
                    <Checkbox w="100%" defaultChecked>
                      <StarIcon color="orange" />
                      <StarIcon color="orange" />
                    </Checkbox>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </GridItem>
            <GridItem
              colSpan={{ base: 6, lg: 4, xl: 5 }}
              p={0}
              pos="relative"
              minH="250px"
            >
              {loading && (
                <Spinner
                  pos="absolute"
                  left="50%"
                  top="60%"
                  transform="translate(-50%, -50%)"
                  thickness="4px"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                  className="translateXY"
                />
              )}
              <InputGroup
                mt={{
                  base: 2,
                  lg: 0,
                }}
                mb={{
                  base: 2,
                  lg: 5,
                }}
                width={{
                  base: "92%",
                  md: "75%",
                }}
              >
                <InputLeftElement pointerEvents="none">
                  <FaSearch color="gray.300" />
                </InputLeftElement>
                <Input rounded="30px" type="tel" placeholder="Kurs arayın" />
              </InputGroup>

              <CheckboxGroup colorScheme="blue" defaultValue={["videoegitim"]}>
                <Stack spacing={[1, 5]} direction={["column", "row"]}>
                  <Checkbox value="videoegitim">Video Eğitim</Checkbox>
                  <Checkbox value="canliegitim">Canlı Eğitim</Checkbox>
                </Stack>
              </CheckboxGroup>

              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  lg: "repeat(2, 1fr)",
                  xl: "repeat(3, 1fr)",
                  // "2xl": "repeat(3, 1fr)",
                }}
                gap={4}
              >
                {loading ? null : error ? (
                  <h2>{error}</h2>
                ) : (
                  courses?.map((item) => {
                    return (
                      <CourseCard
                        key={item._id}
                        courseId={item._id}
                        courseTitle={item.title}
                        courseDescription={item.description}
                        courseImage="https://picsum.photos/1920/1080"
                        authorName={item.author}
                        authorProfile="https://fastly.picsum.photos/id/48/5000/3333.jpg?hmac=y3_1VDNbhii0vM_FN6wxMlvK27vFefflbUSH06z98so"
                        courseDate={item.date}
                      />
                    );
                  })
                )}
                {/* ekstra fake kartlar */}
                {/* {/* <CourseCard
                  courseId="124"
                  courseTitle="A1 İngilizce"
                  courseImage="https://picsum.photos/1920/1080"
                  authorName="Ali Haydar Göksoy"
                  authorProfile="https://picsum.photos/1920/1080"
                  courseDescription="lmfwqdwqd qweqwe dqw q w ao"
                /> */}
                <CourseCard
                  courseId="121"
                  courseTitle="Plus Üyelik"
                  // courseImage="teacher1.jpg"
                  authorName="Yoğurt Akademi"
                  authorProfile="https://picsum.photos/1920/1080"
                  courseDescription="Tüm kurslara ve quizlere erişim sağlayın!"
                />
                {/* <ImageCard
                  videoTitle="Past Tense"
                  videoImage="url('teacher1.jpg')"
                  videoProgress={30}
                /> */}
              </Grid>
            </GridItem>
          </Grid>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Main;

{
  /* Material UI Hatıram xDD
                <Button
                  endIcon={<AppsIcon />}
                  sx={{
                    justifyContent: "flex-start",
                  }}
                >
                  Tümü
                </Button> */
}
