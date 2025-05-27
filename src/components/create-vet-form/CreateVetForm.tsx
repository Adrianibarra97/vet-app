import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { FormControlModal } from '../form-control-modal/FormControlModal'
import { ButtonsModal } from '../buttons-modal/ButtonsModal'
import { Vet } from '../../domain/Vet'
import {
  formContainerIntern, formItem, sectionItem, sectionItemImage,
  sectionItems, sectionTitle
} from './CreateVetFormStyle'
import './CreateVetForm.css'

export const CreateVetForm = () => {

  const textFieldTypes: ['text', 'number'] = ['text', 'number']
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

  const handleLabelColor = (key: keyof Vet): 'success' | 'error' => !vet[key] ? 'success' : 'error'
  
  const handleInputChanges = (key: keyof Vet, value: string | number) => {
    console.log(key, value)
  }

  // const handlePhotoChange = (newPhoto: string) => {
  //   const updated = Object.assign(
  //   Object.create(Object.getPrototypeOf(vet)),
  //     { ...vet, photo: newPhoto },
  //   )
  //   setVet(updated)
  // }

  const handleConfirm = () => {
    alert('Creo un nuevo usuario')
  }

  const handleCancel = () => {
    navigate('/auth/login')
  }

  return (
    <Box sx={ formContainerIntern }>
      <Box sx={ formItem }>
        <Typography variant="h6" sx={ sectionTitle }>Datos generales</Typography>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[3] } labelColor={ handleLabelColor(userVetKeys[3]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[3], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[3] } labelColor={ handleLabelColor(userVetKeys[3]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[3], value) }
            />
          </Box>
        </Box>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[3] } labelColor={ handleLabelColor(userVetKeys[3]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[3], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[3] } labelColor={ handleLabelColor(userVetKeys[3]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[3], value) }
            />
          </Box>
        </Box>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[3] } labelColor={ handleLabelColor(userVetKeys[3]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[3], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[3] } labelColor={ handleLabelColor(userVetKeys[3]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[3], value) }
            />
          </Box>
        </Box>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[3] } labelColor={ handleLabelColor(userVetKeys[3]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[3], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[3] } labelColor={ handleLabelColor(userVetKeys[3]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[3], value) }
            />
          </Box>
        </Box>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[3] } labelColor={ handleLabelColor(userVetKeys[3]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[3], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[3] } labelColor={ handleLabelColor(userVetKeys[3]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[3], value) }
            />
          </Box>
        </Box>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[3] } labelColor={ handleLabelColor(userVetKeys[3]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[3], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[3] } labelColor={ handleLabelColor(userVetKeys[3]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[3], value) }
            />
          </Box>
        </Box>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItemImage }>
            {/* <FormControlModalImage
              isActive={ true } pet={ vet }
              onPhotoChange={ (value) => handlePhotoChange(value) }
            /> */}
          </Box>
        </Box>
      </Box>
      <Box sx={ formItem }>
        <Typography variant="h6" sx={ sectionTitle }>Veterinario</Typography>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[3] } labelColor={ handleLabelColor(userVetKeys[3]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[3], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[3] } labelColor={ handleLabelColor(userVetKeys[3]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[3], value) }
            />
          </Box>
        </Box>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[3] } labelColor={ handleLabelColor(userVetKeys[3]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[3], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[3] } labelColor={ handleLabelColor(userVetKeys[3]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[3], value) }
            />
          </Box>
        </Box>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[3] } labelColor={ handleLabelColor(userVetKeys[3]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[3], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[3] } labelColor={ handleLabelColor(userVetKeys[3]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[3], value) }
            />
          </Box>
        </Box>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[3] } labelColor={ handleLabelColor(userVetKeys[3]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[3], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[3] } labelColor={ handleLabelColor(userVetKeys[3]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[3], value) }
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
  )
}