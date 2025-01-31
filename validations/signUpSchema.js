import { object,string,ref } from 'yup'

export const signupSchema = object({
    confirmPassword:string()
    .oneOf([ref("password")],"Las contraseñas no coinciden")
    .required("Confirmar contraseña es requerido"),
    password:string()
    .min(8,"La contraseña debe tener al menos 8 caracteres")
    .required("Contraseña es requerida")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, "La contraseña debe tener al menos una letra mayuscula, una minuscula, un numero y un caracter especial"),
    email:string()
        .email("El Email no es valido")
        .required("Email es requerido"),
    
})

/*
Existe un usuario de prueba
mail : nicotole@gmail.com
pass: 123456
*/