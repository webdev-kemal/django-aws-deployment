import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { IconButton, Grid, Text, Link, VStack } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Divider,
  Box,
  Spacer,
  Badge,
} from "@chakra-ui/react";
import {
  MdShoppingCart,
  MdPerson2,
  MdSchool,
  MdHomeFilled,
} from "react-icons/md";

const socials = [
  {
    name: "Yoğurt Akademi",
    url: "lmfao",
  },
];

const Mobile = ({ handleClick }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { theme, toggleTheme } = useTheme();

  return (
    <Grid
      bg={theme === "light" ? "#FFC26A" : "#131746"}
      templateColumns="6fr 3fr 1fr"
      gap={6}
      px={8}
      py={4}
      alignItems="center"
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
      shadow="lg"
    >
      {/* Centered Text logo */}
      {/* <Text
        as="a"
        fontSize="2xl"
        textAlign="center"
        color={theme === "light" ? "#ffffff" : "#ffffff"}
        className="navbar-brand"
        href="/"
      >
        <span class="spans">&#123;</span>
        Göksoy Akademi
        <span class="spans">&#125;</span>
      </Text> */}
      <Box>
        <Text
          onClick={() => {
            navigate("/");
          }}
          p={1}
          bg="black"
          borderRadius={{ base: "20px 0px 20px 0px" }}
          fontWeight={700}
          fontSize="xl"
          color="white"
          m={0}
          display="inline-block"
          whiteSpace="nowrap"
          // display="flex" // this is the line to add
        >
          {/* <span class="spans">&#123;</span> */}
          &nbsp;Yoğurt Akademi&nbsp;
          {/* <span class="spans">&#125;</span> */}
        </Text>
      </Box>
      {/* Empty column */}
      <div></div>
      <Drawer
        placement="left"
        onClose={onClose}
        isOpen={isOpen}
        backgroundColor={"green"}
        size="50%"
        w="50%"
      >
        <DrawerOverlay>
          <DrawerContent
            // transition=".3s"
            // bg={theme === "light" ? "#FFC26A" : "#323AB7"}
            bg={theme === "light" ? "#F1F6F9" : "#323AB7"}
            p={3}
            spacing={2}
          >
            <DrawerCloseButton
              // color={theme === "light" ? "#323AB7" : "#FFC26A"}
              color={theme === "light" ? "#000000" : "#FFC26A"}
              p={5}
              size="2xl"
            />

            <DrawerBody
              fontSize="2xl"
              color={theme === "light" ? "#000000" : "#FFFFFF"}
            >
              <VStack py={10} spacing={4} h="100%">
                {socials.map((item) => (
                  <>
                    <Link
                      key={item.url}
                      href={item.url}
                      isExternal
                      w="100%"
                      fontSize="26px"
                      fontWeight="bold"
                      _focus={{ backgroundColor: "white", color: "black" }}
                    >
                      {item.name}
                    </Link>
                  </>
                ))}
                <Divider orientation="horizontal" />
                <Text
                  as="a"
                  w="100%"
                  textalign="left"
                  onClick={(e) => navigate("/")}
                  fontSize="28px"
                  mb={5}
                  cursor="pointer"
                >
                  Ana Sayfa
                </Text>
                <Text
                  as="a"
                  w="100%"
                  textalign="left"
                  onClick={(e) => navigate("/courses")}
                  fontSize="28px"
                  mb={5}
                  cursor="pointer"
                  display="flex"
                  flexWrap="wrap"
                  alignItems="center"
                >
                  Kurslar&ensp;
                  <MdSchool />
                </Text>
                {/* <Text
                  as="a"
                  w="100%"
                  textalign="left"
                  onClick={(e) => navigate("/dashboard")}
                  fontSize="28px"
                  mb={5}
                  cursor="pointer"
                >
                  Öğretmen
                </Text> */}
                <Text
                  as="a"
                  w="100%"
                  textalign="left"
                  onClick={(e) => navigate("/quiz")}
                  fontSize="28px"
                  mb={5}
                  cursor="pointer"
                >
                  Quiz
                  <Badge
                    ms={3}
                    rounded="lg"
                    // p={1}
                    fontSize="md"
                    color="white"
                    bg="gray.800"
                  >
                    plus
                  </Badge>
                </Text>
                <Text
                  as="a"
                  w="100%"
                  textalign="left"
                  onClick={(e) => navigate("/cart")}
                  fontSize="28px"
                  mb={5}
                  cursor="pointer"
                  display="flex"
                  flexWrap="wrap"
                  alignItems="center"
                >
                  Sepetim&ensp;
                  <MdShoppingCart />
                </Text>
                <Text
                  as="a"
                  w="100%"
                  textalign="left"
                  onClick={(e) => navigate("/login")}
                  fontSize="28px"
                  mb={5}
                  cursor="pointer"
                  display="flex"
                  flexWrap="wrap"
                  alignItems="center"
                >
                  Giriş Yap&ensp;
                  <MdPerson2 />
                </Text>
                {/* <Text
                  as="a"
                  w="100%"
                  textalign="left"
                  fontSize="23px"
                  onClick={() => {
                    toggleTheme();
                  }}
                  cursor="pointer"
                >
                  Karanlık Mod
                </Text> */}
                <Spacer />
                {/* <Text
                  mb="0px"
                  textalign="left"
                  w="100%"
                  mt="50px"
                  fontSize="18px"
                >
                  ReactLingot
                </Text> */}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      {/* IconButton on the left */}
      <IconButton
        icon={
          <FontAwesomeIcon
            icon={faBars}
            size="2x"
            color={theme === "light" ? "#000000" : "#ffffff"}
          />
        }
        aria-label="Toggle navigation"
        onClick={onOpen}
        backgroundColor="transparent"
      />
    </Grid>
  );
};

export default Mobile;
