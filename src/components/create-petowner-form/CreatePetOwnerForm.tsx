import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { FormControlModal } from '../form-control-modal/FormControlModal'
import { FormControlModalImagePetOwner } from '../form-control-modal-image-petowner/FormControlModalImagePetOwner'
import { ButtonsModal } from '../buttons-modal/ButtonsModal'
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager'
import PetOwnerServiceManager from '../../services/pet-owner-service/PetOwnerServiceManager'
import { PetOwner } from '../../domain/PetOwner'
import {
  formContainerInternOwner, formItem, sectionItem, sectionItemImage, sectionItems, sectionTitle
} from './CreatePetOwnerFormStyle'
import './CreatePetOwnerForm.css'
import { FormControlModalSelect } from '../form-control-modal-select/FormControlModalSelect'
import { PetOwnerSchema } from '../../util/ValidateFormByFields'

export const CreatePetOwnerForm = () => {

  const textFieldTypes: ['text', 'number', 'password', 'email'] = ['text', 'number', 'password', 'email']
  const userPetOwnerKeys: (keyof PetOwner)[] = [
    'id', 'username', 'password', 'name', 'surname',
    'dni', 'email', 'telephone', 'photo', 'address',
    'postalCode', 'locality', 'province', 'country',
    'emergencyContactName', 'emergencyContactPhone'
  ]
  const fieldPetOwnerKeys: (string)[] = [
    'Id', 'Usuario', 'Contraseña', 'Nombre', 'Apellido',
    'DNI', 'E-mail', 'Teléfono', 'Imagen', 'Dirección',
    'Código Postal', 'Localidad', 'Provincia', 'País',
    'Nombre del contacto', 'Contacto de Emergencia'
  ]

  const navigate = useNavigate()
  const [errorActive, setErrorActive] = useState(false)
  const [petOwner, setPetOwner] = useState<PetOwner>(new PetOwner())
  const [provinces, setProvinces] = useState<string[]>([])
  const [localities, setLocalities] = useState<string[]>([])
  const [countries, setCountries] = useState<string[]>([])
  const [errors, setErrors] = useState<{
    [key: string]: string
  }>({})

  const handleLabelColor = (key: keyof PetOwner): 'success' | 'error' => petOwner[key] ? 'success' : 'error'

  const newStatusPetOwner = (updatedVet: PetOwner) => {
    const newPetOwner = Object.assign(new PetOwner(), updatedVet)
    setPetOwner(newPetOwner)
  }
  
  const handleInputChanges = (key: keyof PetOwner, value: string | number) => {
    (petOwner as unknown as Record<keyof PetOwner, string | number>)[key] = value
    newStatusPetOwner(petOwner)
  }

  const handlePhotoChange = (newPhoto: string) => {
    const updated = Object.assign(
    Object.create(Object.getPrototypeOf(petOwner)),
      { ...petOwner, photo: newPhoto },
    )
    newStatusPetOwner(updated)
  }

  const hasRequiredFields = (): boolean => {
    const requiredFields: (keyof PetOwner)[] = [
      'username', 'password', 'name', 'surname',
      'dni', 'email', 'telephone', 'photo', 'address',
      'postalCode', 'locality', 'province', 'country',
      'emergencyContactName', 'emergencyContactPhone'
    ]
    return requiredFields.some((field) => !petOwner[field])
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
      await PetOwnerSchema.validate(petOwner, {
        abortEarly: false,
        context: { localities },
      })
      setErrors({})
      await PetOwnerServiceManager.getInstance().create(petOwner)
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
    setPetOwner(new PetOwner())
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
    if (petOwner.province) {
      fetch(
        `https://apis.datos.gob.ar/georef/api/localidades?provincia=${petOwner.province}&max=1500`,
      )
        .then((res) => res.json())
        .then((data) =>
          setLocalities(data.localidades.map((l: any) => l.nombre)),
        )
        .catch((err) => console.error(err))
    }
  }, [petOwner.province])

  useEffect(() => {
    setPetOwner(new PetOwner())
  }, [])

  return (
    <main className="auth__main--create">
      <Box sx={ formContainerInternOwner }>
        <Box sx={ formItem }>
          <Typography variant="h6" sx={ sectionTitle }>Datos generales</Typography>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal errorHelper={ errors[userPetOwnerKeys[3]] }
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
                isActive={ true } label={ fieldPetOwnerKeys[3] } labelColor={ handleLabelColor(userPetOwnerKeys[3]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[3], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal errorHelper={ errors[userPetOwnerKeys[4]] }
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.surname }
                isActive={ true } label={ fieldPetOwnerKeys[4] } labelColor={ handleLabelColor(userPetOwnerKeys[4]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[4], value) }
              />
            </Box>
          </Box>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal errorHelper={ errors[userPetOwnerKeys[6]] }
                type={ textFieldTypes[3] } errorActive={ errorActive } defaultValue={ petOwner.email }
                isActive={ true } label={ fieldPetOwnerKeys[6] } labelColor={ handleLabelColor(userPetOwnerKeys[6]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[6], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal errorHelper={ errors[userPetOwnerKeys[1]] }
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.username }
                isActive={ true } label={ fieldPetOwnerKeys[1] } labelColor={ handleLabelColor(userPetOwnerKeys[1]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[1], value) }
              />
            </Box>
          </Box>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal errorHelper={ errors[userPetOwnerKeys[5]] }
                type={ textFieldTypes[1] } errorActive={ errorActive } defaultValue={ petOwner.dni }
                isActive={ true } label={ fieldPetOwnerKeys[5] } labelColor={ handleLabelColor(userPetOwnerKeys[5]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[5], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal errorHelper={ errors[userPetOwnerKeys[7]] }
                type={ textFieldTypes[1] } errorActive={ errorActive } defaultValue={ petOwner.telephone }
                isActive={ true } label={ fieldPetOwnerKeys[7] } labelColor={ handleLabelColor(userPetOwnerKeys[7]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[7], value) }
              />
            </Box>
          </Box>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal errorHelper={ errors[userPetOwnerKeys[9]] }
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.address }
                isActive={ true } label={ fieldPetOwnerKeys[9] } labelColor={ handleLabelColor(userPetOwnerKeys[9]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[9], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal errorHelper={ errors[userPetOwnerKeys[10]] }
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.postalCode }
                isActive={ true } label={ fieldPetOwnerKeys[10] } labelColor={ handleLabelColor(userPetOwnerKeys[10]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[10], value) }
              />
            </Box>
          </Box>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModalSelect
                isActive={ true } label={ fieldPetOwnerKeys[13] } defaultValue={ petOwner.country }
                options={ countries } labelColor={ handleLabelColor(userPetOwnerKeys[13]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[13], value) } />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal errorHelper={ errors[userPetOwnerKeys[2]] }
                type={ textFieldTypes[2] } errorActive={ errorActive } defaultValue={ petOwner.password }
                isActive={ true } label={ fieldPetOwnerKeys[2] } labelColor={ handleLabelColor(userPetOwnerKeys[2]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[2], value) }
              />
            </Box>
          </Box>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModalSelect
                isActive={ true } label={ fieldPetOwnerKeys[12] } defaultValue={ petOwner.province }
                options={ provinces } labelColor={ handleLabelColor(userPetOwnerKeys[12]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[12], value) } />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModalSelect
                isActive={ true } label={ fieldPetOwnerKeys[11] } defaultValue={ petOwner.locality }
                options={ localities } labelColor={ handleLabelColor(userPetOwnerKeys[11]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[11], value) } />
            </Box>
          </Box>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItemImage }>
              <FormControlModalImagePetOwner
                isActive={ true } petOwner={ petOwner }
                onPhotoChange={ (value) => handlePhotoChange(value) }
              />
            </Box>
          </Box>
        </Box>
        <Box sx={ formItem }>
          <Typography variant="h6" sx={ sectionTitle }>Dueño de Mascota</Typography>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal errorHelper={ errors[userPetOwnerKeys[14]] }
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.emergencyContactName }
                isActive={ true } label={ fieldPetOwnerKeys[14] } labelColor={ handleLabelColor(userPetOwnerKeys[14]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[14], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal errorHelper={ errors[userPetOwnerKeys[15]] }
                type={ textFieldTypes[1] } errorActive={ errorActive } defaultValue={ petOwner.emergencyContactPhone }
                isActive={ true } label={ fieldPetOwnerKeys[15] } labelColor={ handleLabelColor(userPetOwnerKeys[15]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[15], value) }
              />
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
    </main>
  )
}