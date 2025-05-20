import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { Dayjs } from 'dayjs'
import { FormControlModalSelect } from '../../components/form-control-modal-select/FormControlModalSelect'
import { FormControlModalImage } from '../../components/form-control-modal-image/FormControlModalImage'
import { FormControlModal } from '../../components/form-control-modal/FormControlModal'
import { Vet } from '../../domain/Vet'
import { PetOwner } from '../../domain/PetOwner'
import { Pet } from '../../domain/Pet'
import {
  formContainer, formItem, formItemNone, formItemTitle, sectionItem, sectionItemImage, sectionItems, sectionMainTitle, sectionTitle,
  sectionType
} from './CreateUserPageStyle'
import './CreateUserPage.css'
import { User } from '../../domain/User'
import { ButtonsModal } from '../../components/buttons-modal/ButtonsModal'
import { useNavigate } from 'react-router-dom'

export const CreateUserPage = () => {

  const textFieldTypes: ['text', 'number'] = ['text', 'number']
  const userTypes: ['VET', 'PETOWNER'] = ['VET', 'PETOWNER']
  const userKeys: (keyof User)[] = [
    'id', 'username', 'password', 'name', 'surname',
    'dni', 'email', 'telephone', 'photo', 'address',
    'postalCode', 'locality', 'province', 'country'
  ]
  const fieldKyes: (string)[] = [
    'Id', 'Usuario', 'Contraseña', 'Nombre', 'Apellido',
    'DNI', 'E-mail', 'Teléfono', 'Imagen', 'Dirección',
    'Código Postal', 'Localidad', 'Provincia', 'País'
  ]
  const userPetOwnerKeys: (keyof PetOwner)[] = [
    'emergencyContactName', 'emergencyContactPhone'
  ]
  const fieldPetOwnerKeys: (string)[] = [
    'Nombre del contacto', 'Contacto de Emergencia'
  ]
  const userVetKeys: (keyof Vet)[] = [
    'licence', 'speciality', 'businessHours', 'professionalEmail', 'professionalTelephone',
    'professionalAddress', 'professionalLocality', 'professionalPostalCode'
  ]
  const fieldVetKyes: (string)[] = [
    'Licencia', 'Especialidad', 'Horario', 'E-mail Profesional', 'Teléfono Profesional',
    'Dirección laboral', 'Localidad Laboral', 'CP Loboral'
  ]
  const navigate = useNavigate()
  const [errorActive, setErrorActive] = useState(false)
  const [user, setUser] = useState<Vet | PetOwner | null>(
    new Vet(-1, '', '', '', '', -1, '', '', '', '', '', '', '', '', -1, '', '', '', '', '', '', '', '')
  )
  const [pet, setPet] = useState(new Pet())

  const handleUserLabelColor = (key: keyof User): 'success' | 'error' => {
    console.log(key)
    return user ? 'success' : 'error'
  }

  const handleVetLabelColor = (key: keyof Vet): 'success' | 'error' => {
    console.log(key)
    return user ? 'success' : 'error'
  }

  const handlePetOwnerLabelColor = (key: keyof PetOwner): 'success' | 'error' => {
    console.log(key)
    return user ? 'success' : 'error'
  }
  
  const handleInputUserChanges = (key: keyof User, value: string | number) => {
    console.log(key, value)
  }

  const handleInputVetChanges = (key: keyof Vet, value: string | number) => {
    console.log(key, value)
  }

  const handleInputPetOwnerChanges = (key: keyof PetOwner, value: string | number) => {
    console.log(key, value)
  }

  const handleSelectChanges = (value: string) => {
    const vet: Vet = new Vet(-1, '', '', '', '', -1, '', '', '', '', '', '', '', '', -1, '', '', '', '', '', '', '', '')
    const petOwner: PetOwner = new PetOwner(-1, '', '', '', '', -1, '', '', '', '', '', '', '', '', -1, '', '')
    
    if(value === 'VET') {
      setUser(vet)
    } else {
      setUser(petOwner)
    }
  }

  const handlePhotoChange = (newPhoto: string) => {
    const updated = Object.assign(
      Object.create(Object.getPrototypeOf(user)),
      { ...user, photo: newPhoto },
    )
    setPet(updated)
  }

  const handleConfirm = () => {
    alert('Creo un nuevo usuario')
  }

  const handleCancel = () => {
    navigate('/auth/login')
  }

  return (
    <main className="auth__main--create">
      <Box sx={ formContainer }>
        <Box sx={ formItemTitle }>
          <Typography variant="h6" sx={ sectionMainTitle }>Tipo de usuario</Typography>
          <Box sx={ sectionType }>
            <FormControlModalSelect isActive={ true } label={ 'tipo de usuario' }
              options={ userTypes } defaultValue={ userTypes[0] } labelColor={ 'success' }
              handleInputChanges={ (value) => handleSelectChanges(value) }            
            />
          </Box>
        </Box>
        <Box sx={ formItem }>
          <Typography variant="h6" sx={ sectionTitle }>Datos generales</Typography>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItemImage }>
              <FormControlModalImage
                isActive={ true } pet={ pet }
                onPhotoChange={ (value) => handlePhotoChange(value) }
              />
            </Box>
          </Box>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.name }
                isActive={ true } label={ fieldKyes[3] } labelColor={ handleUserLabelColor(userKeys[3]) }
                handleInputChanges={ (value) => handleInputUserChanges(userKeys[3], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.name }
                isActive={ true } label={ fieldKyes[4] } labelColor={ handleUserLabelColor(userKeys[4]) }
                handleInputChanges={ (value) => handleInputUserChanges(userKeys[4], value) }
              />
            </Box>
          </Box>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.name }
                isActive={ true } label={ fieldKyes[1] } labelColor={ handleUserLabelColor(userKeys[1]) }
                handleInputChanges={ (value) => handleInputUserChanges(userKeys[1], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.name }
                isActive={ true } label={ fieldKyes[2] } labelColor={ handleUserLabelColor(userKeys[2]) }
                handleInputChanges={ (value) => handleInputUserChanges(userKeys[2], value) }
              />
            </Box>
          </Box>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.name }
                isActive={ true } label={ fieldKyes[5] } labelColor={ handleUserLabelColor(userKeys[5]) }
                handleInputChanges={ (value) => handleInputUserChanges(userKeys[5], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.name }
                isActive={ true } label={ fieldKyes[6] } labelColor={ handleUserLabelColor(userKeys[6]) }
                handleInputChanges={ (value) => handleInputUserChanges(userKeys[6], value) }
              />
            </Box>
          </Box>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.name }
                isActive={ true } label={ fieldKyes[7] } labelColor={ handleUserLabelColor(userKeys[7]) }
                handleInputChanges={ (value) => handleInputUserChanges(userKeys[7], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.name }
                isActive={ true } label={ fieldKyes[10] } labelColor={ handleUserLabelColor(userKeys[10]) }
                handleInputChanges={ (value) => handleInputUserChanges(userKeys[10], value) }
              />
            </Box>
          </Box>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.name }
                isActive={ true } label={ fieldKyes[9] } labelColor={ handleUserLabelColor(userKeys[9]) }
                handleInputChanges={ (value) => handleInputUserChanges(userKeys[9], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.name }
                isActive={ true } label={ fieldKyes[11] } labelColor={ handleUserLabelColor(userKeys[11]) }
                handleInputChanges={ (value) => handleInputUserChanges(userKeys[11], value) }
              />
            </Box>
          </Box>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.name }
                isActive={ true } label={ fieldKyes[12] } labelColor={ handleUserLabelColor(userKeys[12]) }
                handleInputChanges={ (value) => handleInputUserChanges(userKeys[12], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.name }
                isActive={ true } label={ fieldKyes[13] } labelColor={ handleUserLabelColor(userKeys[13]) }
                handleInputChanges={ (value) => handleInputUserChanges(userKeys[13], value) }
              />
            </Box>
          </Box>
        </Box>
        <Box sx={ user?.typeOfUser === 'petOwner' ? formItem : formItemNone }>
          <Typography variant="h6" sx={ sectionTitle }>Dueño de Mascota</Typography>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.name }
                isActive={ true } label={ fieldPetOwnerKeys[1] } labelColor={ handlePetOwnerLabelColor(userPetOwnerKeys[1]) }
                handleInputChanges={ (value) => handleInputPetOwnerChanges(userPetOwnerKeys[1], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.name }
                isActive={ true } label={ fieldPetOwnerKeys[0] } labelColor={ handlePetOwnerLabelColor(userPetOwnerKeys[0]) }
                handleInputChanges={ (value) => handleInputPetOwnerChanges(userPetOwnerKeys[0], value) }
              />
            </Box>
          </Box>
        </Box>
        <Box sx={ user?.typeOfUser === 'vet' ? formItem : formItemNone }>
          <Typography variant="h6" sx={ sectionTitle }>Veterinario</Typography>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.name }
                isActive={ true } label={ fieldVetKyes[0] } labelColor={ handleVetLabelColor(userVetKeys[0]) }
                handleInputChanges={ (value) => handleInputVetChanges(userVetKeys[0], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.name }
                isActive={ true } label={ fieldVetKyes[1] } labelColor={ handleVetLabelColor(userVetKeys[1]) }
                handleInputChanges={ (value) => handleInputVetChanges(userVetKeys[1], value) }
              />
            </Box>
          </Box>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.name }
                isActive={ true } label={ fieldVetKyes[2] } labelColor={ handleVetLabelColor(userVetKeys[2]) }
                handleInputChanges={ (value) => handleInputVetChanges(userVetKeys[2], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.name }
                isActive={ true } label={ fieldVetKyes[3] } labelColor={ handleVetLabelColor(userVetKeys[3]) }
                handleInputChanges={ (value) => handleInputVetChanges(userVetKeys[3], value) }
              />
            </Box>
          </Box>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.name }
                isActive={ true } label={ fieldVetKyes[5] } labelColor={ handleVetLabelColor(userVetKeys[5]) }
                handleInputChanges={ (value) => handleInputVetChanges(userVetKeys[5], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.name }
                isActive={ true } label={ fieldVetKyes[7] } labelColor={ handleVetLabelColor(userVetKeys[7]) }
                handleInputChanges={ (value) => handleInputVetChanges(userVetKeys[7], value) }
              />
            </Box>
          </Box>
          <Box sx={ sectionItems }>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.name }
                isActive={ true } label={ fieldVetKyes[6] } labelColor={ handleVetLabelColor(userVetKeys[6]) }
                handleInputChanges={ (value) => handleInputVetChanges(userVetKeys[6], value) }
              />
            </Box>
            <Box sx={ sectionItem }>
              <FormControlModal
                type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.name }
                isActive={ true } label={ fieldVetKyes[4] } labelColor={ handleVetLabelColor(userVetKeys[4]) }
                handleInputChanges={ (value) => handleInputVetChanges(userVetKeys[4], value) }
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