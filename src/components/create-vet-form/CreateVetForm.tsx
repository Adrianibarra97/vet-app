import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { FormControlModal } from '../form-control-modal/FormControlModal'
import { FormControlModalImageVet } from '../form-control-modal-image-vet/FormControlModalImageVet'
import { ButtonsModal } from '../buttons-modal/ButtonsModal'
import { Vet } from '../../domain/Vet'
import {
  formContainerIntern, formItem, sectionItem, sectionItemImage,
  sectionItems, sectionTitle
} from './CreateVetFormStyle'
import './CreateVetForm.css'
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager'
import VetServiceManager from '../../services/vet-service/VetServiceManager'
import { FormControlModalSelect } from '../form-control-modal-select/FormControlModalSelect'
import { VetSchema } from '../../util/ValidateFormByFields'

export const CreateVetForm = () => {

  const textFieldTypes: ['text', 'number', 'password', 'email'] = ['text', 'number', 'password', 'email']
  const userVetKeys: (keyof Vet)[] = [
    'id', 'username', 'password', 'name', 'surname',
    'dni', 'email', 'telephone', 'photo', 'address',
    'postalCode', 'locality', 'province', 'country',
    'licence', 'speciality', 'businessHours', 'professionalEmail',
    'professionalTelephone', 'professionalAddress', 'professionalLocality',
    'professionalPostalCode'
  ]
  const fieldVetKyes: (string)[] = [
    'Id', 'Usuario', 'Contraseña', 'Nombre', 'Apellido',
    'DNI', 'E-mail', 'Teléfono', 'Imagen', 'Dirección',
    'Código Postal', 'Localidad', 'Provincia', 'País',
    'Licencia', 'Especialidad', 'Horario', 'E-mail Profesional',
    'Teléfono Profesional', 'Dirección laboral', 'Localidad Laboral',
    'CP Loboral'
  ]
  const navigate = useNavigate()
  const [errorActive, setErrorActive] = useState(false)
  const [vet, setVet] = useState<Vet>(new Vet())
  const [provinces, setProvinces] = useState<string[]>([])
  const [localities, setLocalities] = useState<string[]>([])
  const [countries, setCountries] = useState<string[]>([])
  const [errors, setErrors] = useState<{
    [key: string]: string
  }>({})

  const handleLabelColor = (key: keyof Vet): 'success' | 'error' => vet[key] ? 'success' : 'error'

  const newStatusVet = (updatedVet: Vet) => {
    const newVet = Object.assign(new Vet(), updatedVet)
    setVet(newVet)
  }
  
  const handleInputChanges = (key: keyof Vet, value: string | number) => {
    (vet as unknown as Record<keyof Vet, string | number>)[key] = value
    newStatusVet(vet)
  }

  const handlePhotoChange = (newPhoto: string) => {
    const updated = Object.assign(
    Object.create(Object.getPrototypeOf(vet)),
      { ...vet, photo: newPhoto },
    )
    newStatusVet(updated)
  }

  const hasRequiredFields = (): boolean => {
    const requiredFields: (keyof Vet)[] = [
      'username', 'password', 'name', 'surname',
      'dni', 'email', 'telephone', 'photo', 'address',
      'postalCode', 'locality', 'province', 'country',
      'licence', 'speciality', 'businessHours', 'professionalEmail',
      'professionalTelephone', 'professionalAddress', 'professionalLocality',
      'professionalPostalCode'
    ]
    return requiredFields.some((field) => !vet[field])
  }

  const handleConfirm = () => {
    if(hasRequiredFields()) {
      setErrorActive(true)
    } else {
      setErrorActive(false)
      confirm()
    }
  }

  const confirm = async () => {
    const msg: string = `Ha creado el su usuario con éxito!`
    try {
      await VetSchema.validate(vet, {
        abortEarly: false,
        context: { localities },
      })
      setErrors({})
      await VetServiceManager.getInstance().create(vet)
      SnackbarUtilities.succes(msg)
      navigate('/auth/login')
    } catch (error: any) {
      const errors: { [key: string]: string } = {}
      if (error.inner) {
        error.inner.forEach((err: any) => {
          errors[err.path] = err.message
        })
      } else {
        errors.general = error.message
      }
      setErrors(errors)
    }
  }

  const handleCancel = () => {
    setErrorActive(false)
    setVet(new Vet())
    navigate('/auth/login')
  }

  useEffect(() => {
    setCountries(['Argentina'])
  }, [])

  useEffect(() => {
    fetch('https://apis.datos.gob.ar/georef/api/provincias')
      .then((res) => res.json())
      .then((data) => setProvinces(data.provincias.map((p: any) => p.nombre)))
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    if (vet.province) {
      fetch(
        `https://apis.datos.gob.ar/georef/api/localidades?provincia=${vet.province}&max=1500`,
      )
        .then((res) => res.json())
        .then((data) =>
          setLocalities(data.localidades.map((l: any) => l.nombre)),
        )
        .catch((err) => console.error(err))
    }
  }, [vet.province])

  useEffect(() => {
    setVet(new Vet())
  }, [])

  return (
    <Box sx={ formContainerIntern }>
      <Box sx={ formItem }>
        <Typography variant="h6" sx={ sectionTitle }>Datos generales</Typography>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModal errorHelper={ errors[userVetKeys[3]] }
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[3] } labelColor={ handleLabelColor(userVetKeys[3]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[3], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal errorHelper={ errors[userVetKeys[4]] }
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.surname } label={ fieldVetKyes[4] } labelColor={ handleLabelColor(userVetKeys[4]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[4], value) }
            />
          </Box>
        </Box>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModal errorHelper={ errors[userVetKeys[6]] }
              type={ textFieldTypes[3] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.email } label={ fieldVetKyes[6] } labelColor={ handleLabelColor(userVetKeys[6]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[6], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal errorHelper={ errors[userVetKeys[1]] }
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.username } label={ fieldVetKyes[1] } labelColor={ handleLabelColor(userVetKeys[1]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[1], value) }
            />
          </Box>
        </Box>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModal errorHelper={ errors[userVetKeys[5]] }
              type={ textFieldTypes[1] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.dni } label={ fieldVetKyes[5] } labelColor={ handleLabelColor(userVetKeys[5]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[5], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal errorHelper={ errors[userVetKeys[7]] }
              type={ textFieldTypes[1] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.telephone } label={ fieldVetKyes[7] } labelColor={ handleLabelColor(userVetKeys[7]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[7], value) }
            />
          </Box>
        </Box>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModal errorHelper={ errors[userVetKeys[9]] }
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.address } label={ fieldVetKyes[9] } labelColor={ handleLabelColor(userVetKeys[9]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[9], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal errorHelper={ errors[userVetKeys[10]] }
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.postalCode } label={ fieldVetKyes[10] } labelColor={ handleLabelColor(userVetKeys[10]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[10], value) }
            />
          </Box>
        </Box>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModalSelect
              isActive={ true } label={ fieldVetKyes[13] } defaultValue={ vet.country }
              options={ countries } labelColor={ handleLabelColor(userVetKeys[13]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[13], value) } />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal errorHelper={ errors[userVetKeys[2]] }
              type={ textFieldTypes[2] } errorActive={ errorActive } defaultValue={ vet.password }
              isActive={ true } label={ fieldVetKyes[2] } labelColor={ handleLabelColor(userVetKeys[2]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[2], value) }
            />
          </Box>
        </Box>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModalSelect
              isActive={ true } label={ fieldVetKyes[12] } defaultValue={ vet.province }
              options={ provinces } labelColor={ handleLabelColor(userVetKeys[12]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[12], value) } />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModalSelect
              isActive={ true } label={ fieldVetKyes[11] } defaultValue={ vet.locality }
              options={ localities } labelColor={ handleLabelColor(userVetKeys[11]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[11], value) } />
          </Box>
        </Box>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItemImage }>
            <FormControlModalImageVet
              isActive={ true } vet={ vet }
              onPhotoChange={ (value) => handlePhotoChange(value) }
            />
          </Box>
        </Box>
      </Box>
      <Box sx={ formItem }>
        <Typography variant="h6" sx={ sectionTitle }>Veterinario</Typography>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModal errorHelper={ errors[userVetKeys[14]] }
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.licence } label={ fieldVetKyes[14] } labelColor={ handleLabelColor(userVetKeys[14]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[14], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal errorHelper={ errors[userVetKeys[15]] }
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.speciality } label={ fieldVetKyes[15] } labelColor={ handleLabelColor(userVetKeys[15]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[15], value) }
            />
          </Box>
        </Box>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModal errorHelper={ errors[userVetKeys[17]] }
              type={ textFieldTypes[3] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.professionalEmail } label={ fieldVetKyes[17] } labelColor={ handleLabelColor(userVetKeys[17]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[17], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal errorHelper={ errors[userVetKeys[16]] }
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.businessHours } label={ fieldVetKyes[16] } labelColor={ handleLabelColor(userVetKeys[16]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[16], value) }
            />
          </Box>
        </Box>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModal errorHelper={ errors[userVetKeys[18]] }
              type={ textFieldTypes[1] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.professionalTelephone } label={ fieldVetKyes[18] } labelColor={ handleLabelColor(userVetKeys[18]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[18], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal errorHelper={ errors[userVetKeys[21]] }
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.professionalPostalCode } label={ fieldVetKyes[21] } labelColor={ handleLabelColor(userVetKeys[21]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[21], value) }
            />
          </Box>
        </Box>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModal errorHelper={ errors[userVetKeys[19]] }
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.professionalAddress } label={ fieldVetKyes[19] } labelColor={ handleLabelColor(userVetKeys[19]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[19], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModalSelect
            isActive={ true } label={ fieldVetKyes[20] } defaultValue={ vet.professionalLocality }
            options={ localities } labelColor={ handleLabelColor(userVetKeys[20]) }
            handleInputChanges={ (value) => handleInputChanges(userVetKeys[20], value) } />
          </Box>
        </Box>
      </Box>
      <Box sx={ formItem }>
        <ButtonsModal
          confirLabel={ 'Crear' } cancelLabel={ 'Cancelar' }
          confirm={ () => handleConfirm() } cancel={ () => handleCancel() }
        />
      </Box>
    </Box>
  )
}