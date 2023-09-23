import { Heading, HStack, Image, Text, VStack, Box } from "@chakra-ui/react";
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { FaUnity } from "react-icons/fa";

const DefaultCard = ({ title, description }) => {
  const { theme } = useTheme();
  // Fixing image to one as images in images folder are returning 404 errors
  // Adding fixed image here, because provided images are not found even when opened in new tab
  return (
    <VStack spacing="0">
      <Box
        // maxW="sm"
        w={{ base: "330px", sm: "330px", md: "330px", lg: "450px" }}
        h="210px"
        mx="auto"
        bg="rgba(255, 255, 255, 0.1)"
        shadow="md"
        rounded="lg"
        overflow="hidden"
        backdropFilter="blur(20px)"
        border="1px solid rgba(255, 255, 255, 0.3)"
        p={4}
        display="flex"
        // alignItems="flex-start"
        justifyContent="flex-start"
      >
        <Box
          w="44px" // Set fixed width
          h="44px" // Set fixed height
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          mr={4}
          my="auto"
        >
          <Box
            as={FaUnity}
            size="34px"
            color="white"
            mr={4}
            style={{ filter: "drop-shadow(0 0 1px #4fd1c5)" }} // Add sketchy effect
          />
        </Box>

        <Box>
          <Heading size="md" fontWeight="bold" color="white" mb={2}>
            {title}
          </Heading>

          <Text fontSize="lg" color="white">
            {description}
          </Text>
        </Box>
      </Box>
      {/* <Box bg="white" w="100%" borderTopRadius="10px">
        <Image src={imageSrc} alt={title} boxSize="100%" borderRadius="10px" />
      </Box>
      <Box bg="white" w="100%" borderBottomRadius="10px" padding="10px">
        <VStack align="left">
          <Heading size="xs" color="black">
            {title}
          </Heading>
          <Text fontSize="xs" color="gray">
            {description}
          </Text>
          <HStack>
            <Text fontSize="xs" color="black">
              Detaylar
            </Text>
            <FontAwesomeIcon icon={faArrowRight} size="xs" color="black" />
          </HStack>
        </VStack>
      </Box> */}
    </VStack>
  );
};

export default DefaultCard;
