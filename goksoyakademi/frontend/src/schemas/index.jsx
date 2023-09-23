//yupSchema
import * as yup from "yup";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
export const basicSchema = yup.object().shape({
  email: yup.string().email("E-posta bulunamadı").required("Zorunlu alan"),
  name: yup.string().min(3, "En az 3 karakter").required("Zorunlu alan"),
  password: yup
    .string()
    .min(6, "En az 6 karakter")
    .matches(passwordRegex, { message: "Güçlü bir şifre oluşturun" })
    .required("Zorunlu alan"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Şifreler eşleşmeli")
    .required("Zorunlu alan"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("E-posta bulunamadı").required("Zorunlu alan"),
  password: yup
    .string()
    .min(4, "En az 4 karakter")
    .required("Zorunlu alan"),
});

//oneOf = ilk parametresi dizi. is of the same value as the pass
// age: yup
//   .number("Please enter a valid number")
//   .positive("Please enter a valid number")
//   .integer("Please enter a valid number")
//   .required("Required"),
