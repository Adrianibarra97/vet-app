import * as yup from 'yup'

export const ValidateFormByFields = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
      'El nombre no puede tener números ni símbolos',
    )
    .required('Por favor, ingresá tu nombre'),
  surname: yup
    .string()
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
      'El apellido no puede tener números ni símbolos',
    )
    .required('Por favor, ingresá tu apellido'),
  dni: yup
    .string()
    .matches(/^\d+$/, 'El DNI solo debe contener números')
    .min(7, 'El DNI debe tener al menos 7 dígitos')
    .max(8, 'El DNI no puede tener más de 8 dígitos')
    .required('Por favor, ingresá tu DNI'),
  username: yup.string().required('Por favor, ingresá un nombre de usuario'),
  password: yup
    .string()
    .min(3, 'La contraseña debe tener al menos 3 caracteres')
    .notRequired(),
  telephone: yup
    .string()
    .matches(
      /^\d{10}$/,
      'Debe contener el código de área seguido del número, sin 0 ni 15, con un total de 10 dígitos',
    )
    .required('El celular es obligatorio'),
  email: yup
    .string()
    .email('Ingresá un email válido')
    .required('El email es obligatorio'),
  address: yup.string().required('La dirección es obligatoria'),
locality: yup
  .string()
  .required('La localidad es obligatoria')
  .test(
    'locality-in-list',
    'Debés seleccionar una localidad válida de la lista',
    function (value) {
      const { localities } = this.options.context || {}
      return !value || (Array.isArray(localities) && localities.includes(value))
    }
  ),
  postalCode: yup
    .string()
    .matches(/^\d{4,5}$/, 'El código postal debe tener 4 o 5 dígitos')
    .required('El código postal es obligatorio'),
  province: yup.string().required('La provincia es obligatoria'),
  country: yup.string().required('El país es obligatorio'),
  emergencyContactName: yup.string().notRequired(),
  emergencyContactPhone: yup
    .string()
    .matches(
      /^\d{10}$/,
      'Debe contener el código de área seguido del número, sin 0 ni 15, con un total de 10 dígitos',
    )
    .notRequired(),
})

export const professionalSchema = yup.object().shape({
  licence: yup
    .string()
    .matches(
      /^[A-Z0-9]{5,10}$/,
      'La matrícula debe tener entre 5 y 10 caracteres, usando solo letras mayúsculas y números',
    )
    .required('La matrícula es obligatoria'),

  professionalTelephone: yup
    .string()
    .matches(
      /^\d{10}$/,
      'Debe contener el código de área seguido del número, sin 0 ni 15, con un total de 10 dígitos',
    )
    .required('El teléfono laboral es obligatorio'),

  speciality: yup.string().required('La especialidad es obligatoria'),

  professionalAddress: yup
    .string()
    .required('La dirección laboral es obligatoria'),

  professionalEmail: yup
    .string()
    .email('Ingresá un email profesional válido')
    .required('El email profesional es obligatorio'),

  businessHours: yup
    .string()
    .required('Indicá el horario de atención (ej. 7 a 14 hs)'),

  professionalLocality: yup
    .string()
    .required('La localidad laboral es obligatoria'),

  professionalPostalCode: yup
    .string()
    .matches(/^\d{4,5}$/, 'El código postal debe tener 4 o 5 dígitos')
    .required('El código postal laboral es obligatorio'),
})

export const VetSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
      'El nombre no puede tener números ni símbolos',
    )
    .required('Por favor, ingresá tu nombre'),
  
  surname: yup
    .string()
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
      'El apellido no puede tener números ni símbolos',
    )
    .required('Por favor, ingresá tu apellido'),
  
  dni: yup
    .string()
    .matches(/^\d+$/, 'El DNI solo debe contener números')
    .min(7, 'El DNI debe tener al menos 7 dígitos')
    .max(8, 'El DNI no puede tener más de 8 dígitos')
    .required('Por favor, ingresá tu DNI'),
  
  username: yup.string().required('Por favor, ingresá un nombre de usuario'),

  password: yup
    .string()
    .min(3, 'La contraseña debe tener al menos 3 caracteres')
    .notRequired(),
  
  telephone: yup
    .string()
    .matches(
      /^\d{10}$/,
      'Debe contener el código de área seguido del número, sin 0 ni 15, con un total de 10 dígitos',
    )
    .required('El celular es obligatorio'),
  
  email: yup
    .string()
    .email('Ingresá un email válido')
    .required('El email es obligatorio'),
  address: yup.string().required('La dirección es obligatoria'),

  locality: yup
    .string()
    .required('La localidad es obligatoria')
    .test(
      'locality-in-list',
      'Debés seleccionar una localidad válida de la lista',
      function (value) {
        const { localities } = this.options.context || {}
        return !value || (Array.isArray(localities) && localities.includes(value))
      }
    ),

  postalCode: yup
    .string()
    .matches(/^\d{4,5}$/, 'El código postal debe tener 4 o 5 dígitos')
    .required('El código postal es obligatorio'),
  
  province: yup.string().required('La provincia es obligatoria'),

  country: yup.string().required('El país es obligatorio'),

  licence: yup
    .string()
    .matches(
      /^[A-Z0-9]{5,10}$/,
      'La matrícula debe tener entre 5 y 10 caracteres, usando solo letras mayúsculas y números',
    )
    .required('La matrícula es obligatoria'),

  professionalTelephone: yup
    .string()
    .matches(
      /^\d{10}$/,
      'Debe contener el código de área seguido del número, sin 0 ni 15, con un total de 10 dígitos',
    )
    .required('El teléfono laboral es obligatorio'),

  speciality: yup.string().required('La especialidad es obligatoria'),

  professionalAddress: yup
    .string()
    .required('La dirección laboral es obligatoria'),

  professionalEmail: yup
    .string()
    .email('Ingresá un email profesional válido')
    .required('El email profesional es obligatorio'),

  businessHours: yup
    .string()
    .required('Indicá el horario de atención (ej. 7 a 14 hs)'),

  professionalLocality: yup
    .string()
    .required('La localidad laboral es obligatoria'),

  professionalPostalCode: yup
    .string()
    .matches(/^\d{4,5}$/, 'El código postal debe tener 4 o 5 dígitos')
    .required('El código postal laboral es obligatorio'),
})

export const PetOwnerSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
      'El nombre no puede tener números ni símbolos',
    )
    .required('Por favor, ingresá tu nombre'),
  
  surname: yup
    .string()
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
      'El apellido no puede tener números ni símbolos',
    )
    .required('Por favor, ingresá tu apellido'),
  
  dni: yup
    .string()
    .matches(/^\d+$/, 'El DNI solo debe contener números')
    .min(7, 'El DNI debe tener al menos 7 dígitos')
    .max(8, 'El DNI no puede tener más de 8 dígitos')
    .required('Por favor, ingresá tu DNI'),
  
  username: yup.string().required('Por favor, ingresá un nombre de usuario'),

  password: yup
    .string()
    .min(3, 'La contraseña debe tener al menos 3 caracteres')
    .notRequired(),
  
  telephone: yup
    .string()
    .matches(
      /^\d{10}$/,
      'Debe contener el código de área seguido del número, sin 0 ni 15, con un total de 10 dígitos',
    )
    .required('El celular es obligatorio'),
  
  email: yup
    .string()
    .email('Ingresá un email válido')
    .required('El email es obligatorio'),
  address: yup.string().required('La dirección es obligatoria'),

  locality: yup
    .string()
    .required('La localidad es obligatoria')
    .test(
      'locality-in-list',
      'Debés seleccionar una localidad válida de la lista',
      function (value) {
        const { localities } = this.options.context || {}
        return !value || (Array.isArray(localities) && localities.includes(value))
      }
    ),

  postalCode: yup
    .string()
    .matches(/^\d{4,5}$/, 'El código postal debe tener 4 o 5 dígitos')
    .required('El código postal es obligatorio'),
  
  province: yup.string().required('La provincia es obligatoria'),

  country: yup.string().required('El país es obligatorio'),

  emergencyContactName: yup.string().notRequired(),
  
  emergencyContactPhone: yup
    .string()
    .matches(
      /^\d{10}$/,
      'Debe contener el código de área seguido del número, sin 0 ni 15, con un total de 10 dígitos',
    )
    .notRequired(),
})

export const PetSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
      'El nombre no puede tener números ni símbolos',
    )
    .required('Por favor, ingresá tu nombre'),
  
  breed: yup
    .string()
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
      'La raza no puede tener números ni símbolos.',
    )
    .required('Por favor, ingresá la raza.'),
  
  age: yup
    .string()
    .matches(/^\d{1,2}$/, 'La edad debe tener un número entero.')
    .required('La edad es obligatorio'),
  
  weight: yup
    .string()
    .matches(/^\d{1,2}$/, 'El peso debe tener un número.')
    .required('El peso es obligatorio'),

  specie: yup
    .string()
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
      'La especie no puede tener números ni símbolos.',
    )
    .required('Por favor, ingresá la especie.'),
})