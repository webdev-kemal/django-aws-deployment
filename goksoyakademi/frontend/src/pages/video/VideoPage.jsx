import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Container from "../../components/containers/container";
import Footer from "../../components/footer/Footer";
import {
  Text,
  Grid,
  GridItem,
  Box,
  Stack,
  Button,
  ButtonGroup,
  AspectRatio,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";
import { FaFolder } from "react-icons/fa";

const VideoPage = () => {
  return (
    <div>
      <div className="mh-100vh">
        <Navbar />
        <Container>
          <Text fontWeight="bold" fontSize="3xl">
            Video Başlığı:
            {/* {videoTitle} */}
          </Text>
          <Grid w="100%" templateColumns="repeat(5, 1fr)" gap={10}>
            <GridItem colSpan={3}>
              <AspectRatio ratio={16 / 9} width="100%">
                <ReactPlayer
                  // ratio={16 / 9}
                  // width="100%"
                  controls={true}
                  url="https://www.youtube.com/watch?v=iu-LBY7NXD4"
                />
                {/* <Box
                  bg="black"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  _hover={{ boxShadow: "2xl", cursor: "pointer" }}
                >
                  <Text color="white">Play</Text>
                </Box> */}
              </AspectRatio>
            </GridItem>
            <GridItem colSpan={2}>
              <Button
                rounded="none"
                border="2px solid black"
                background="transparent"
                py="3px"
                px="7px"
              >
                <FaFolder /> &nbsp;Ders Materyalini İndir
              </Button>
              <Button>Next Video</Button>
              <Button>Prev Video</Button>
            </GridItem>
          </Grid>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default VideoPage;
