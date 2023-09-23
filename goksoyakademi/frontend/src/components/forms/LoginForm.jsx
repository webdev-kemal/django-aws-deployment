import React, { useEffect , useState} from "react";
import { useFormik } from "formik";
import "./loginform.css";
import { loginSchema } from "../../schemas";
import useSubmit from "../../hooks/useSubmit";
import { useAlertContext } from "../../context/AlertContext";
import { useTheme } from "../../context/ThemeContext";
import { Text, Button, Box } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

import {login} from '../../actions/user'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation, useNavigate, useParams, Link} from 'react-router-dom'

const LoginForm = ({toggleHasAccount}) => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();
  const { theme } = useTheme();

  const dispatch = useDispatch()
  const history = useNavigate()

  const location = useLocation()
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userLogin = useSelector(state=> state.user)
  const {loading, error, userInfo} = userLogin

  useEffect(()=>{

    if(userInfo){
      console.log("lmfao")
      console.log(userInfo)
      history(redirect)
    }

  }, [history, userInfo, redirect])



  const onSubmitDemo = (values) => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // submit("/api/submit", values);
    // actions.resetForm();
  };

  const {
    handleBlur,
    errors,
    isSubmitting,
    touched,
    handleChange,
    handleSubmit,
    values,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    // onSubmit,
    onSubmit: (values, actions) => {
      // submit("/api/submit", values);
      // actions.resetForm();
      dispatch(login(values.email, values.password))
    
    },
  });

  useEffect(() => {
    if (response) {
      //calling onOpen for the only time here
      onOpen(response.type, response.message);
    }
  }, [response]);
  
  useEffect(() => {
    if (error) {
      //calling onOpen for the only time here
      onOpen('response.type', error);
    }
  }, [error]);

  const handleHasNoAcc = () => {

    toggleHasAccount(); 
    if(redirect){history(`/register?redirect=${redirect}`)}else{history(`/register`)}

  }

  return (
    <div className="basicform mb-3">
      <form onSubmit={handleSubmit} autoComplete="off">
        <Button variant="link" colorScheme="gray">
          <Box as={ArrowBackIcon} />
          <Text as="a" href="/" fontWeight="thin" ml="2">
            Geri dön
          </Text>
        </Button>
        <fieldset>
          <Text fontSize="4xl" fontWeight="bold" mb={2}>
            Giriş yap
          </Text>
          <Text fontSize="2xl" color="red" mb={2}>
            {error }
          </Text>


          <div className="Field">
            <label htmlFor="email ">
              E-Posta
              {/* <sup>*</sup> */}
            </label>
            <input
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
              id="email"
              type="email"
              placeholder="E-postanızı girin"
            />
            {errors.email && touched.email ? (
              <p className="FieldError">{errors.email}</p>
            ) : (
              ""
            )}
          </div>
          <div className="Field">
            <label htmlFor="password">Şifre</label>
            <input
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              id="password"
              type="password"
              name="password"
              placeholder="Şifrenizi girin"
            />
            {errors.password && touched.password ? (
              <p className="FieldError">{errors.password}</p>
            ) : (
              ""
            )}
          </div>

          <button
            className="submit-button mt-2"
            type="submit"
            disabled={isSubmitting}
          >
            GİRİŞ YAP
          </button>
          <Text mt={3} cursor="pointer" textDecoration="underline" onClick={handleHasNoAcc}>Hesabınız yok mu?</Text>
        </fieldset>
      </form>
    </div>
  );
};

export default LoginForm;
