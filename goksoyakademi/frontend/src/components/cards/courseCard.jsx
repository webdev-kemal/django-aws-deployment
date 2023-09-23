import React from "react";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Image,
  Button,
  useMediaQuery,
  Avatar,
  VStack,
  HStack,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import { useNavigate } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
const CourseCard = ({
  courseId,
  courseTitle,
  authorName,
  courseImage,
  courseDescription,
  courseStars,
  courseLength,
  coursePrice,
  hasSertificate,
  authorProfile,
}) => {
  const navigate = useNavigate();

  const isPurchased = null;

  const courseClickHandle = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <VStack
      border="1px"
      borderColor="gray.300"
      p={2}
      rounded="md"
      // maxHeight="150px"
      minHeight="260px"
      maxHeight="260px"
      _hover={{ padding: 0, cursor: "pointer" }}
      transition="all 0.2s ease"
      onClick={() => courseClickHandle(courseId)}
      overflow="hidden"
    >
      <Box height="150px" width="100%" pos="relative">
        {courseImage ? (
          <Image
            className="inner-shadow"
            src={courseImage}
            w="100%"
            h="100%"
            objectFit="cover"
            rounded="md"
          ></Image>
        ) : (
          <Box
            bg="black"
            color="white"
            fontSize="2xl"
            textAlign="center"
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontWeight="bold"
            w="100%"
            h="100%"
            rounded="md"
          >
            Akademi Plus
          </Box>
        )}
        <Tag
          size="lg"
          colorScheme="gray"
          borderRadius="full"
          pos="absolute"
          bottom="5px"
          left="5px"
          boxShadow="2xl"
        >
          <Avatar
            src={authorProfile}
            size="xs"
            name={authorName}
            ml={-1}
            mr={2}
          />
          <TagLabel>{authorName}</TagLabel>
        </Tag>
      </Box>
      {/* <HStack
        w="95%"
        display="flex"
        justifyContent="flex-start"
        alignContent="center"
      >
      </HStack> */}
      <HStack display="flex" justifyContent="flex-start" w="95%">
        <Text fontSize="2xl" fontWeight="bold" mb="0">
          {courseTitle}
        </Text>
      </HStack>
      <HStack display="flex" justifyContent="flex-start" w="95%">
        <Text fontSize="md">{courseDescription}</Text>
      </HStack>
    </VStack>

    // <Grid templateRows="repeat(9, 1fr)">
    //   <GridItem rowSpan={2}>
    //     <Image src={courseImage} w="100%" h="60%" objectFit="cover"></Image>
    //   </GridItem>
    //   <GridItem rowSpan={2}>
    //     <Grid templateColumns="repeat(5, 1fr)">
    //       <GridItem colSpan={1}>
    //         <Avatar
    //           src={authorProfile}
    //           fontSize="2xl"
    //           fontWeight="bold"
    //         ></Avatar>
    //       </GridItem>
    //       <GridItem colSpan={4}>
    //         <Text fontSize="2xl" fontWeight="bold">
    //           {authorName}
    //         </Text>
    //       </GridItem>
    //     </Grid>
    //   </GridItem>
    //   <GridItem rowSpan={1}>
    //     <Text fontSize="2xl" fontWeight="bold">
    //       {courseTitle}
    //     </Text>
    //   </GridItem>
    //   <GridItem rowSpan={2}>
    //     <Text fontSize="md">{courseDescription}</Text>
    //   </GridItem>
    //   <GridItem rowSpan={1}>
    //     <Text fontSize="md" fontWeight="Thin">
    //       Details
    //     </Text>
    //   </GridItem>
    // </Grid>
  );
};

export default CourseCard;
