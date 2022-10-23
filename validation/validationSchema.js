import * as yup from 'yup';
export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Escriba un email válido")
    .required("El email es obligatorio"),
  password: yup
    .string()
    .trim("No debe comenzar ni terminar con espacios en blanco")
    .min(6, ({ min }) => `Debe tener un mínimo de ${min} caracteres`)
    .required("La contraseña es obligatoria")
})