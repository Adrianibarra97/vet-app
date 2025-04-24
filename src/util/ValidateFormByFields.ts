import * as yup from 'yup'

export const ValidateFormByFields = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, 'El nombre no puede tener números ni símbolos')
    .required('Por favor, ingresá tu nombre'),

  surname: yup
    .string()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, 'El apellido no puede tener números ni símbolos')
    .required('Por favor, ingresá tu apellido'),

  dni: yup
    .string()
    .matches(/^\d+$/, 'El DNI solo debe contener números')
    .min(7, 'El DNI debe tener al menos 7 dígitos')
    .max(8, 'El DNI no puede tener más de 8 dígitos')
    .required('Por favor, ingresá tu DNI'),

  adress: yup
    .string()
    .required('Ingresá una dirección válida'),

  email: yup
    .string()
    .email('Ingresá un email válido, por ejemplo usuario@ejemplo.com')
    .required('El email es obligatorio'),

  username: yup
    .string()
    .required('El nombre de usuario no puede estar vacío'),

  telephone: yup
    .string()
    .matches(/^11\d{8}$/, 'Debe comenzar con 11 y tener 10 dígitos en total (ej. 11xxxxxxxx)')
    .required('El celular es obligatorio'),

  landline: yup
    .string()
    .matches(/^[1-9]\d{6,7}$/, 'Debe contener entre 7 y 8 dígitos. Ej: 43211234')
    .notRequired(),
})

export const professionalSchema = yup.object().shape({
  license: yup
    .string()
    .matches(/^[A-Z0-9]{5,10}$/, 'Debe ser un número/matrícula válido')
    .required('Por favor, ingresá la matrícula profesional'),

  workPhone: yup
    .string()
    .matches(/^15\d{8}$/, 'Debe comenzar con 15 y tener 10 dígitos (ej. 15xxxxxxxx)')
    .required('El teléfono laboral es obligatorio'),

  specialty: yup
    .string()
    .required('Ingresá tu especialidad profesional'),

  workAdress: yup
    .string()
    .required('La dirección del trabajo es obligatoria'),

  professionalEmail: yup
    .string()
    .email('Ingresá un email profesional válido')
    .required('El email profesional es obligatorio'),

  attentionSchedule: yup
    .string()
    .required('Indicá los días y horarios de atención (ej. Lunes a Viernes de 9 a 18 hs)'),
})
