import React from "react";
import "./dashboard.css";
import Navbar from "../../components/navbar/Navbar";
import ExtendedNavbar from "../../components/navbar/ExtendedNavbar";
import { SimpleGrid, Box, Grid, GridItem } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <div className="mh-100vh ">
      <ExtendedNavbar />
      <Grid
        my={25}
        mx={{ base: 0, md: 55, xl: 100 }}
        templateColumns="repeat(6, 1fr)"
        bg="gray.50"
      >
        <GridItem
          as="aside"
          colSpan={{ base: 6, lg: 2, xl: 1 }}
          bg="purple.300"
        >
          <span>sidebar</span>
        </GridItem>
        <GridItem as="dash" colSpan={{ base: 6, lg: 4, xl: 5 }} p={5}>
          <Dash />
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

    // <div className="dashboard mh-100vh ">
    //   <div className="text-center mt-4 shadow-lg ">
    //     <div class="row">
    //       <div class="col-lg-3 col-md-4 col-sm-6">One of four columns</div>
    //       <div class="col-lg-3 col-md-4 col-sm-6">One of four columns</div>
    //       <div class="col-lg-3 col-md-4 col-sm-6">One of four columns</div>
    //       <div class="col-lg-3 col-md-4 col-sm-6">One of four columns</div>
    //     </div>
    //   </div>
    // </div>
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
