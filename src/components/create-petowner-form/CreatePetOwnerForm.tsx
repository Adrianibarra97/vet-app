import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { FormControlModal } from '../form-control-modal/FormControlModal'
import { FormControlModalImagePetOwner } from '../form-control-modal-image-petowner/FormControlModalImagePetOwner'
import { ButtonsModal } from '../buttons-modal/ButtonsModal'
import { PetOwner } from '../../domain/PetOwner'
import {
  formContainerInternOwner, formItem, sectionItem, sectionItemImage, sectionItems, sectionTitle
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

  const handlePhotoChange = (newPhoto: string) => {
    const updated = Object.assign(
    Object.create(Object.getPrototypeOf(petOwner)),
      { ...petOwner, photo: newPhoto },
    )
    setPetOwner(updated)
  }

  const handleConfirm = () => {
    alert('Creo un nuevo usuario')
  }

  const handleCancel = () => {
    navigate('/auth/login')
  }

  return (
    <main className="auth__main--create">
      <Box sx={ formContainerInternOwner }>
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
                isActive={ true } label={ fieldPetOwnerKeys[4] } labelColor={ handleLabelColor(userPetOwnerKeys[4]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[4], value) }
              />
            </Box>
          </Box>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
                isActive={ true } label={ fieldPetOwnerKeys[6] } labelColor={ handleLabelColor(userPetOwnerKeys[6]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[6], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
                isActive={ true } label={ fieldPetOwnerKeys[1] } labelColor={ handleLabelColor(userPetOwnerKeys[1]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[1], value) }
              />
            </Box>
          </Box>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
                isActive={ true } label={ fieldPetOwnerKeys[5] } labelColor={ handleLabelColor(userPetOwnerKeys[5]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[5], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
                isActive={ true } label={ fieldPetOwnerKeys[7] } labelColor={ handleLabelColor(userPetOwnerKeys[7]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[7], value) }
              />
            </Box>
          </Box>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
                isActive={ true } label={ fieldPetOwnerKeys[9] } labelColor={ handleLabelColor(userPetOwnerKeys[9]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[9], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
                isActive={ true } label={ fieldPetOwnerKeys[10] } labelColor={ handleLabelColor(userPetOwnerKeys[10]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[10], value) }
              />
            </Box>
          </Box>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
                isActive={ true } label={ fieldPetOwnerKeys[11] } labelColor={ handleLabelColor(userPetOwnerKeys[11]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[11], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
                isActive={ true } label={ fieldPetOwnerKeys[12] } labelColor={ handleLabelColor(userPetOwnerKeys[12]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[12], value) }
              />
            </Box>
          </Box>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
                isActive={ true } label={ fieldPetOwnerKeys[13] } labelColor={ handleLabelColor(userPetOwnerKeys[13]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[13], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
                isActive={ true } label={ fieldPetOwnerKeys[2] } labelColor={ handleLabelColor(userPetOwnerKeys[2]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[2], value) }
              />
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
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
                isActive={ true } label={ fieldPetOwnerKeys[14] } labelColor={ handleLabelColor(userPetOwnerKeys[14]) }
                handleInputChanges={ (value) => handleInputChanges(userPetOwnerKeys[14], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ petOwner.name }
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