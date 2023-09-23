import React from "react";
import {
  Box,
  HStack,
  useMediaQuery,
  Text,
  Card,
  Header,
  Spacer,
} from "@chakra-ui/react";
import DefaultCard from "../cards/default";
import { useTheme } from "../../context/ThemeContext";

const Container = ({ children, ...boxProps }) => {
  const [isLargerThanMobile] = useMediaQuery("(min-width: 768px)");
  const { theme } = useTheme();
  return (
    <Box
      display="grid"
      width={{
        base: "100%",
        md: "75%",
      }}
      mt={5}
      p={{
        base: 3,
        sm: 3,
        md: 5,
        xl: 10,
      }}
      shadow="2xl"
      borderRadius={{ base: "0px", md: "30px" }}
      mx="auto"
      //OLD ORANGE SCHEME
      // backgroundColor={theme === "dark" ? "#1a1e50" : "#ffc26a"}
      backgroundColor={theme === "dark" ? "#1a1e50" : "#F4F9F9"}
      color={theme === "dark" ? "white" : "black"}
      // gridTemplateColumns={{
      //   base: "repeat(1, 1fr)",
      //   sm: "repeat(3, 4fr 1fr 7fr)",
      // }}
      transition=".5s"
      {...boxProps}
    >
      {children}
      {/* <Text w="100%" bgColor="green">
          Content
        </Text>
        <Text w="100%" bgColor="blue">
          Content
        </Text>
        <Text w="100%" bgColor="red">
          Content
        </Text>
        <Text w="100%" bgColor="red">
          Content
        </Text> */}
      {/* {isLargerThanMobile ? "lmfao" : "lmfao2"} */}
    </Box>

    //   <Box color="white" maxWidth="1280px" margin="0 auto" id="header">
    //     <HStack
    //       px={16}
    //       py={4}
    //       justifyContent="space-between"
    //       alignItems="center"
    //     >
    //       {!isLargerThanMobile &&
    //         // Only show the bars (hamburger) icon when the screen size is mobile
    //         "text"}
    //       {isLargerThanMobile &&
    //         // Show the social icons when the screen size is larger than mobile
    //         "text"}
    //     </HStack>
    //   </Box>
  );
};

export default Container;

// gridTemplateColumns={{
//     base: "1fr",
//     sm: "1fr 1fr 1fr",
//     lg: "1fr 1fr 1fr 1fr",
//   }}
//   gridTemplateRows="1fr"
//   gridGap={{ base: "8", sm: "6", md: "6", lg: "8" }}
