import React, { useEffect , useState} from "react";
import { useFormik } from "formik";
import "./loginform.css";
import { basicSchema } from "../../schemas";
import useSubmit from "../../hooks/useSubmit";
import { useAlertContext } from "../../context/AlertContext";
import { useTheme } from "../../context/ThemeContext";
import { Text, Button, Box } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

import {register} from '../../actions/user'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation, useNavigate, useParams, Link} from 'react-router-dom'

const RegisterForm = ( {toggleHasAccount}) => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();
  const { theme } = useTheme();

  const dispatch = useDispatch()
  const history = useNavigate()

  const location = useLocation()
  const redirect = location.search ? location.search.split('=')[1] : '/register'

  const userRegister = useSelector(state=> state.register)
  const {loading, error, userInfo} = userRegister


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
      name: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: basicSchema,
    // onSubmit,
    onSubmit: (values, actions) => {
      // submit("/api/submit", values);
      // actions.resetForm();
      dispatch(register(values.name, values.email, values.password))

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
            Hemen üye ol
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
            <label htmlFor="name">İsim</label>
            <input
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              name="name"
              id="name"
              type="name"
              placeholder="İsminizi girin"
            />
            {errors.name && touched.name ? (
              <p className="FieldError">{errors.name}</p>
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
          <div className="Field">
            <label htmlFor="confirmPassword">Şifre Tekrar</label>
            <input
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Şifrenizi tekrar girin"
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <p className="FieldError">{errors.confirmPassword}</p>
            ) : (
              ""
            )}
          </div>
          <button
            className="submit-button mt-2"
            type="submit"
            disabled={isSubmitting}
          >
            ÜYE OL
          </button>
          <Text mt={3} cursor="pointer" textDecoration="underline" onClick={()=>{toggleHasAccount(); history('/login')}}>Zaten hesabınız var mı?</Text >
        </fieldset>
      </form>
    </div>
  );
};

export default RegisterForm;
