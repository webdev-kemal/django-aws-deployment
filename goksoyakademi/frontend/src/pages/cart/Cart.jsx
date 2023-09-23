import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import {
  Box,
  Badge,
  Grid,
  GridItem,
  Text,
  Image,
  useMediaQuery,
  Button,
  Table,
  Thead,
  Tbody,
  CloseButton,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartReducer } from "../../reducers/cart";
import { addToCart, removeFromCart } from "../../actions/cart";
import Container from "../../components/containers/container";

const steps = [
  { title: "Sepet", description: "Sepeti Düzenle" },
  { title: "Adres", description: "Adresi Kaydet" },
  { title: "Ödeme", description: "Kart Bilgileri" },
];

const Cart = () => {
  const { id } = useParams();
  const useQty = useLocation();
  //this will always return 1 but however - you cant buy a course twice
  const qty = useQty.search ? Number(useQty.search.split("=")[1]) : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const { activeStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
    console.log(`SEPETTE: ${cartItems}`);
    console.log(cartItems);
  }, [dispatch, id, qty]);

  return (
    <div>
      <div className="mh-100vh">
        <Navbar />
        <Container overflow={{ base: "scroll", md: "hidden" }}>
          <Grid templateColumns="12fr">
            <GridItem w="100%"> 
              {cartItems.length === 0 ? (
                <Text fontWeight="bold" fontSize="lg" textAlign="center">
                  Sepetiniz boş, kurslarımızı keşfetmek için{" "}
                  <Link to="/courses">buraya tıklayın.</Link>
                </Text>
              ) : (
                <TableContainer mx="auto">
                  <Table variant="simple"  >
                    <TableCaption></TableCaption>
                    <Thead>
                      <Tr >
                        <Th >Kurs</Th>
                        <Th >Ücret</Th>
                        <Th >Kaldır</Th>
                      </Tr>
                    </Thead>
                    <Tbody >
                      {cartItems.map((item) => {
                        return (
                          <Tr  key={item.product}>
                            <Td minW="300px" maxW="300px">  
                              <strong>{item.title}</strong> ({item.author})
                            </Td>
                            <Td >{item.price} TL</Td>
                            <Td >
                              <CloseButton
                                onClick={() => {
                                  handleRemoveFromCart(item.product);
                                }}
                              />
                            </Td>
                          </Tr>
                        );
                      })}
                      <Tr>
                        <Td>
                          <strong>Total:</strong>
                        </Td>
                        <Td>
                          <Badge
                            variant="solid"
                            // fontSize="0.8em"
                            colorScheme="green"
                          >
                            {Number(
                              cartItems.reduce(
                                (acc, item) => acc + Number(item.price),
                                0
                              )
                            ).toFixed(2)}{" "}
                            TL
                          </Badge>
                        </Td>
                        <Td></Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              )}
            </GridItem>
            <GridItem>
              <Stepper
                index={activeStep}
                w={{ base: "90%", md: "75%" }}
                mx="auto"
                mt={5}
              >
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>

                    <Box flexShrink="0">
                      <StepTitle>{step.title}</StepTitle>
                      <StepDescription>{step.description}</StepDescription>
                    </Box>

                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>
            </GridItem>
          </Grid>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
