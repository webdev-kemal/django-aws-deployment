import React, { useEffect, useState } from "react";

import { register, getUserDetails, updateUser } from "../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Container from "../../components/containers/container";
import { useToast } from "@chakra-ui/react";
import { logout } from "../../actions/user";
import {
  Box,
  Text,
  Button,
  Input,
  Tab,
  TabList,
  TabPanel,
  Checkbox,
  VStack,
  TabPanels,
  Tabs,
  Grid,
  GridItem,
  HStack,
  Image,
  Spacer,
  SimpleGrid,
} from "@chakra-ui/react";
import Footer from "../../components/footer/Footer";

const Profile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [oldPassword, setOldPass] = useState("");
  const [password, setPass] = useState("");
  const [confirmPass, setPass2] = useState("");

  const dispatch = useDispatch();
  const history = useNavigate();

  const userLogin = useSelector((state) => state.user);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success } = userUpdate;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const [tabIndex, setTabIndex] = useState(0);

  const toast = useToast();

  useEffect(() => {
    if (!userInfo) {
      history("/login");
    } else {
      console.log(userInfo);
      dispatch(getUserDetails("profile"));
    }
  }, [dispatch, userInfo]);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleSurname = (e) => {
    setSurname(e.target.value);
  };
  const handleOldPass = (e) => {
    setOldPass(e.target.value);
  };
  const handlePass = (e) => {
    setPass(e.target.value);
  };
  const handlePass2 = (e) => {
    setPass2(e.target.value);
  };

  const handleSubmit = (e) => {
    setIsUpdating(true);
    dispatch(updateUser({ name: name, surname: surname }));
    if (success) {
      toast({
        title: "Güncelleme başarılı",
        description: `Lütfen tekrar giriş yapın.`,
        status: "success",
        duration: 1400,
        isClosable: true,
      });
      setTimeout(() => {
        dispatch(logout());
        history("/login");
      }, 1500);
    } else {
      toast({
        title: "Güncelleme başarısız",
        description: `Lütfen yeniden giriş yapın.`,
        status: "error",
        duration: 1400,
        isClosable: true,
      });
      setTimeout(() => {
        dispatch(logout());
        history("/login");
        setIsUpdating(false);
      }, 1500);
    }
    // if (password != confirmPass) {
    //   console.log("parolar uyusmuyo");
    // } else {
    //   // dispatch(updateUser({ id: user._id, name: name, password: password }));
    //   console.log(userInfo.access);
    // }
  };

  return (
    <div>
      <div className="mh-100vh w-100 position-relative">
        <Navbar />
        <Container>
          {/* {userInfo.name} lmaooo {userInfo.email} */}
          <Grid templateColumns="1fr 3fr" gap={4}>
            <Box>
              <Tabs
                variant="soft-rounded"
                index={tabIndex}
                onChange={(index) => setTabIndex(index)}
              >
                <TabList flexDirection="column">
                  <Tab>Hesap Bilgileri</Tab>
                  <Tab>Şifre Değiştirme</Tab>
                  <Tab>Tercihlerim</Tab>
                </TabList>
              </Tabs>
            </Box>

            <Box>
              <Tabs
                variant="soft-rounded"
                index={tabIndex}
                onChange={(index) => setTabIndex(index)}
              >
                <TabPanels>
                  <TabPanel>
                    <Text mb={0}>İsim Değişikliği</Text>
                    <Input
                      onChange={handleName}
                      mb={3}
                      placeholder={
                        userInfo.first_name ? userInfo.first_name : "İsim"
                      }
                    />
                    <Input
                      onChange={handleSurname}
                      mb={3}
                      placeholder={
                        userInfo.last_name ? userInfo.last_name : "Soy isim"
                      }
                    />
                    <Text mb={0}>E-posta Adresi Değişikliği</Text>
                    <Input
                      disabled
                      mb={3}
                      placeholder={
                        userInfo.email ? userInfo.email : "E-posta Adresi Girin"
                      }
                    />
                    <Button onClick={handleSubmit} disabled={isUpdating}>
                      Kaydet
                    </Button>
                  </TabPanel>
                  <TabPanel>
                    <Text mb={0}>Eski Şifreniz</Text>
                    <Input
                      mb={3}
                      onChange={handleOldPass}
                      type="password"
                      placeholder="Eski Şifre"
                    />
                    <Text mb={0}>Yeni Şifre</Text>
                    <Input
                      mb={3}
                      onChange={handlePass}
                      type="password"
                      placeholder="Yeni Şifre"
                    />
                    <Text mb={0}>Yeni Şifre Tekrar</Text>
                    <Input
                      mb={3}
                      onChange={handlePass2}
                      type="password"
                      placeholder="Yeni Şifre"
                    />
                  </TabPanel>
                  <TabPanel>
                    {/* Add other options form elements here */}
                    <Box>
                      {" "}
                      <VStack align="start" spacing={3}>
                        <Checkbox defaultIsChecked>
                          PLUS üyelik indirime girdiğinde beni uyar
                        </Checkbox>
                        <Checkbox>Gece modunu aktif et</Checkbox>
                      </VStack>
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Grid>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
