import React, { useState } from "react";
import LoginForm from "../../components/forms/LoginForm";
import RegisterForm from "../../components/forms/RegisterForm";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Image,
  useMediaQuery,
} from "@chakra-ui/react";

const Login = () => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const [hasAccount, setHasAccount] = useState(true);

  const toggleHasAccount = () => {
    setHasAccount(!hasAccount);
  };

  return (
    <div className="mh-100vh">
      <Grid templateColumns="repeat(10, 1fr)">
        {isLargerThan768 && (
          <GridItem
            colSpan={{ base: 0, md: 3, lg: 4, xl: 6 }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            className="relative"
          >
            {/* <Box>Image Comes Here</Box> */}
            <Image
              src="https://picsum.photos/1920/1080"
              w="100%"
              h="100%"
              objectFit="cover"
            ></Image>
            {isLargerThan1280 && (
              <Text
                className="floatingLoginIntro"
                p={4}
                bg="black"
                borderRadius={{ base: "20px 0px 20px 0px" }}
                fontWeight={700}
                fontSize="50px"
                color="white"
                m={0}
                fontFamily="Red Hat Display"
              >
                {/* <span class="spans">&#123;</span> */}
                &nbsp;Göksoy Akademi&nbsp;
                {/* <span class="spans">&#125;</span> */}
              </Text>
            )}
          </GridItem>
        )}
        <GridItem
          colSpan={{ base: 10, md: 7, lg: 6, xl: 4 }}
          background="white"
        >
          {hasAccount ? (
            <LoginForm toggleHasAccount={toggleHasAccount} />
          ) : (
            <RegisterForm toggleHasAccount={toggleHasAccount} />
          )}
        </GridItem>
      </Grid>
    </div>
  );
};

export default Login;
