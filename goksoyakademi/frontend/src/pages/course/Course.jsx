import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Container from "../../components/containers/container";
import { Grid, GridItem, HStack, Image, Spacer } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Badge,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  ListIcon,
  Divider,
  useMediaQuery,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import { FcAssistant, FcDonate, FcInTransit } from "react-icons/fc";
import Feature from "../../components/features/Features";
import ImageCard from "../../components/cards/imageCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ListCourseDetail } from "../../actions/courses";
import { courseDetailReducer } from "../../reducers/courses";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const Course = ({ courses }) => {
  //kurs idsi kurs isminin alt tirelerle ayrılmış hali olacak python
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [isLargerThan400] = useMediaQuery("(min-width: 400px)");
  const [isLargerThan540] = useMediaQuery("(min-width: 540px)");
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const dispatch = useDispatch();
  const courseDetails = useSelector((store) => store.courseDetailStore);
  const [qty] = useState(1);
  const navigate = useNavigate();
  const { loading, error, course } = courseDetails;
  const toast = useToast();

  // async function getCourse() {
  //   const course = await axios.get(`http://127.0.0.1:8000/api/courses/${id}`);
  //   setCourseData(course);
  // }
  // const getCourse = () => {
  //   axios
  //     .get(`http://127.0.0.1:8000/api/courses/${id}`)
  //     .then((response) => {
  //       const course = response.data;
  //       setCourseData(course);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error fetching the courses:", error);
  //     });
  // };

  // useEffect(() => {
  //   getCourse();
  // }, []);

  useEffect(() => {
    dispatch(ListCourseDetail(id));
  }, []);

  const handleAddToCart = () => {
    toast({
      title: "Kurs sepete eklendi.",
      description: "Sepetim'e basıp görebilirsiniz!",
      status: "success",
      duration: 2500,
      isClosable: true,
    });
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div className="mh-100vh w-100 position-relative">
      <Navbar />
      <Container
        p={{
          base: 3,
          md: 4,
          lg: 8,
        }}
        pos="fixed"
        left="50%"
        bottom="0%"
        // bg="#FF6347"
        borderRadius={{ base: "20px 20px 0px 0px", lg: "30px 30px 0px 0px" }}
        zIndex="10"
        // color="white"
        width={{
          base: "90%",
          md: "70%",
          xl: "50%",
        }}
        animation="slideUp 1s forwards"
        transition="transform 1s ease-out"
      >
        <Grid templateColumns="repeat(12, 1fr)">
          {isLargerThan768 && (
            <GridItem
              mx="auto"
              w="90%"
              textAlign="start"
              colSpan={4}
              bg="red.100"
              px="20px"
              py="10px"
              rounded="2xl"
            >
              <Text fontSize="xl" mb={0}>
                Eski Fiyat
              </Text>
              <Divider
                orientation="horizontal"
                m={0}
                borderColor="red.300"
                mt={2}
              />
              <Text
                as="s"
                color="gray.400"
                fontSize="2xl"
                fontWeight="bold"
                mb={0}
              >
                {(course?.price * 1.99996).toFixed(2)} TL
              </Text>
            </GridItem>
          )}
          <GridItem
            w="90%"
            mx="auto"
            textAlign="start"
            bg="#C6F6D5"
            px="20px"
            py="10px"
            rounded="2xl"
            colSpan={{ base: 6, md: 4 }}
          >
            <Text fontSize="xl" mb={0}>
              Özel Fiyat
            </Text>
            <Divider
              orientation="horizontal"
              m={0}
              borderColor="green.400"
              mt={2}
            />
            <Text fontSize="2xl" fontWeight="bold" mb={0}>
              {isLargerThan400
                ? (course?.price * 1).toFixed(2)
                : (course?.price * 1).toFixed(0)}{" "}
              TL
            </Text>
          </GridItem>

          <GridItem
            colSpan={{ base: 6, md: 4 }}
            w="90%"
            mx="auto"
            display="flex"
            alignItems="center"
          >
            <Box w="100%">
              <Button
                w="100%"
                size="lg"
                // rounded="none"
                borderRadius={{ base: "20px 0px 20px 0px" }}
                bg="#FF6347"
                color="white"
                fontWeight="bold"
                _hover={{ bg: "#000000" }}
                onClick={handleAddToCart}
              >
                SEPETE EKLE
              </Button>
              <Text
                mt={1}
                textAlign="center"
                fontSize={{ base: "md", md: "xl" }}
                mb={0}
              >
                <span class="badge text-dark p-1 badge-color">plus</span>{" "}
                <span class="underlined">ile ücretsiz*</span>
              </Text>
            </Box>
          </GridItem>
        </Grid>
      </Container>

      <Container mb={20}>
        {/* kurs badgeleri detayları yapanı sertifika bilgisi gerekli bilgi öğrenilecek bilgi ortalama bitirme süresi memnuniyet*/}
        <Grid templateColumns={{ base: "repeat(10, 1fr)" }}>
          {/* LEFT GRID */}
          <GridItem colSpan={{ base: 10, md: 5 }}>
            {/* COURSE TITLE */}
            <Text fontWeight="bold" fontSize="3xl">
              {course?.title}
            </Text>
            {/* COURSE DETAILS */}
            <Box>
              <Text mb={1}>Açıklama</Text>
              <Box
                background="#D6E8DB"
                rounded="lg"
                // boxShadow="inner"
                width={{ base: "100%", lg: "70%" }}
                p={2}
                mb={3}
                color="black"
              >
                {course?.description}
              </Box>

              <List spacing={3} p={0}>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Ortalama Bitirme Süresi <strong>2 Hafta</strong>
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  <strong>{course?.videosIds?.length}</strong>Video İçerik
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  <strong>{course?.quizIds?.length}</strong>Adet Quiz
                </ListItem>
                {/* You can also use custom icons from react-icons */}
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  <strong>{course?.students}</strong>Aktif Öğrenci
                </ListItem>
              </List>

              {/* TAGS */}
              <Box
                mb={{ base: 5, md: 10 }}
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                flexWrap="wrap"
              >
                <Text fontWeight="thin" my={0} mr={2}>
                  ETİKETLER
                </Text>
                <Badge mr={2} colorScheme="blue" maxH="18px">
                  {course?.dil}
                </Badge>
                <Badge mr={2} colorScheme="blue" maxH="18px">
                  Başlangıç
                </Badge>
                <Badge mr={2} colorScheme="green" maxH="18px">
                  Video Eğitim
                </Badge>
                <Badge mr={2} colorScheme="orange" maxH="18px">
                  10 Saat+
                </Badge>
              </Box>
              <Box p={0} w={{ base: "100%", md: "70%" }}>
                <Box fontWeight={700} mb={2}>
                  Kurs Müfredatı
                </Box>

                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton
                        _expanded={{ bg: "tomato", color: "white" }}
                      >
                        <Box as="span" flex="1" textAlign="left">
                          Kendini Tanıtma
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <h2>
                      <AccordionButton
                        _expanded={{ bg: "tomato", color: "white" }}
                      >
                        <Box as="span" flex="1" textAlign="left">
                          Şimdiki Zaman
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h2>
                      <AccordionButton
                        _expanded={{ bg: "tomato", color: "white" }}
                      >
                        <Box as="span" flex="1" textAlign="left">
                          Gelecek Zaman
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 10, lg: 5 }}>
            {/* <Text mb={0}>Gereksinimler</Text> */}
            <ImageCard
              videoCap="Kursu Önizle"
              videoImage="https://picsum.photos/1920/1080"
              mt={0}
              customOnClick={true}
              isCoursePage={isLargerThan540 ? true : false}
            ></ImageCard>
            <Text mt={4} fontSize="xl">
              {/* Eğitmen: <strong>{course?.author}</strong> */}
              Eğitmen: <strong>Ali Haydar Göksoy</strong>
            </Text>
            <Text>Kurs Yükleme Tarihi {course?.date} </Text>
            <Text>Kurs Uzunluğu</Text>
            <Text>
              Kurs Ücreti {course?.price} <strong>TL</strong>
            </Text>
          </GridItem>
        </Grid>
        <SimpleGrid
          w="80%"
          mx="auto"
          mt={5}
          columns={{ base: 1, md: 3 }}
          spacing={10}
        >
          <Feature
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            title={"Soru Cevap"}
            text={
              "Öğretmen, sorulara 48 saat içinde cevap verme garantisi veriyor."
            }
          />
          <Feature
            icon={<Icon as={FcDonate} w={10} h={10} />}
            title={"Paranız İade"}
            text={
              "Kurstan memnun kalmadıysanız 30 gün içinde iade alabilirsiniz."
            }
          />
          <Feature
            icon={<Icon as={FcInTransit} w={10} h={10} />}
            title={"Ödev Teslimi"}
            text={"Quizleriniz kontrol edilir ve öğretmen puanlama yapar."}
          />
        </SimpleGrid>
      </Container>

      {/* <Footer /> */}
    </div>
  );
};

export default Course;
