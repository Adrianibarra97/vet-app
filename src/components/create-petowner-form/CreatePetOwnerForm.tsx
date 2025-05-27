import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { FormControlModal } from '../form-control-modal/FormControlModal'
import { ButtonsModal } from '../buttons-modal/ButtonsModal'
import { PetOwner } from '../../domain/PetOwner'
import {
  formContainer, formItem, sectionItem, sectionItems, sectionTitle
} from './CreatePetOwnerFormStyle'
import './CreatePetOwnerForm.css'

export const CreatePetOwnerForm = () => {

  const textFieldTypes: ['text', 'number'] = ['text', 'number']
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

  const handleLabelColor = (key: keyof PetOwner): 'success' | 'error' => !petOwner[key] ? 'success' : 'error'
  
  const handleInputChanges = (key: keyof PetOwner, value: string | number) => {
    console.log(key, value)
  }

  // const handlePhotoChange = (newPhoto: string) => {
  //   const updated = Object.assign(
  //   Object.create(Object.getPrototypeOf(petOwner)),
  //     { ...petOwner, photo: newPhoto },
  //   )
  //   setPetOwner(updated)
  // }

  const handleConfirm = () => {
    alert('Creo un nuevo usuario')
  }

  const handleCancel = () => {
    navigate('/auth/login')
  }

  return (
    <main className="auth__main--create">
      <Box sx={ formContainer }>
        <Box sx={ formItem }>
          <Typography variant="h6" sx={ sectionTitle }>Datos generales</Typography>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
                isActive={ true } label={ fieldPetOwnerKeys[3] } labelColor={ handleLabelColor(userPetOwnerKeys[3]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[3], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
                isActive={ true } label={ fieldPetOwnerKeys[3] } labelColor={ handleLabelColor(userPetOwnerKeys[3]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[3], value) }
              />
            </Box>
          </Box>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
                isActive={ true } label={ fieldPetOwnerKeys[3] } labelColor={ handleLabelColor(userPetOwnerKeys[3]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[3], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
                isActive={ true } label={ fieldPetOwnerKeys[3] } labelColor={ handleLabelColor(userPetOwnerKeys[3]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[3], value) }
              />
            </Box>
          </Box>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
                isActive={ true } label={ fieldPetOwnerKeys[3] } labelColor={ handleLabelColor(userPetOwnerKeys[3]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[3], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
                isActive={ true } label={ fieldPetOwnerKeys[3] } labelColor={ handleLabelColor(userPetOwnerKeys[3]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[3], value) }
              />
            </Box>
          </Box>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
                isActive={ true } label={ fieldPetOwnerKeys[3] } labelColor={ handleLabelColor(userPetOwnerKeys[3]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[3], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
                isActive={ true } label={ fieldPetOwnerKeys[3] } labelColor={ handleLabelColor(userPetOwnerKeys[3]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[3], value) }
              />
            </Box>
          </Box>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
                isActive={ true } label={ fieldPetOwnerKeys[3] } labelColor={ handleLabelColor(userPetOwnerKeys[3]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[3], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
                isActive={ true } label={ fieldPetOwnerKeys[3] } labelColor={ handleLabelColor(userPetOwnerKeys[3]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[3], value) }
              />
            </Box>
          </Box>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
                isActive={ true } label={ fieldPetOwnerKeys[3] } labelColor={ handleLabelColor(userPetOwnerKeys[3]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[3], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
                isActive={ true } label={ fieldPetOwnerKeys[3] } labelColor={ handleLabelColor(userPetOwnerKeys[3]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[3], value) }
              />
            </Box>
          </Box>
          <Box sx={ sectionItems }>
            {/* <Box sx={ sectionItemImage }>
              <FormControlModalImage
                isActive={ true } pet={ pet }
                onPhotoChange={ (value) => handlePhotoChange(value) }
              />
            </Box> */}
          </Box>
        </Box>
        <Box sx={ formItem }>
          <Typography variant="h6" sx={ sectionTitle }>Dueño de Mascota</Typography>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
                isActive={ true } label={ fieldPetOwnerKeys[3] } labelColor={ handleLabelColor(userPetOwnerKeys[3]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[3], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
                isActive={ true } label={ fieldPetOwnerKeys[3] } labelColor={ handleLabelColor(userPetOwnerKeys[3]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[3], value) }
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