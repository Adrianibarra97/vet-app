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

  const handleCancel = () => navigate('/auth/login')

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
              defaultValue={ vet.name } label={ fieldVetKyes[4] } labelColor={ handleLabelColor(userVetKeys[4]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[4], value) }
            />
          </Box>
        </Box>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[6] } labelColor={ handleLabelColor(userVetKeys[6]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[6], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[1] } labelColor={ handleLabelColor(userVetKeys[1]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[1], value) }
            />
          </Box>
        </Box>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[5] } labelColor={ handleLabelColor(userVetKeys[5]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[5], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[7] } labelColor={ handleLabelColor(userVetKeys[7]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[7], value) }
            />
          </Box>
        </Box>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[9] } labelColor={ handleLabelColor(userVetKeys[9]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[9], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[10] } labelColor={ handleLabelColor(userVetKeys[10]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[10], value) }
            />
          </Box>
        </Box>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[11] } labelColor={ handleLabelColor(userVetKeys[11]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[11], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[12] } labelColor={ handleLabelColor(userVetKeys[12]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[12], value) }
            />
          </Box>
        </Box>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[13] } labelColor={ handleLabelColor(userVetKeys[13]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[13], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[2] } labelColor={ handleLabelColor(userVetKeys[2]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[2], value) }
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
              defaultValue={ vet.name } label={ fieldVetKyes[14] } labelColor={ handleLabelColor(userVetKeys[14]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[14], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[15] } labelColor={ handleLabelColor(userVetKeys[15]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[15], value) }
            />
          </Box>
        </Box>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[17] } labelColor={ handleLabelColor(userVetKeys[17]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[17], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[16] } labelColor={ handleLabelColor(userVetKeys[16]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[16], value) }
            />
          </Box>
        </Box>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[18] } labelColor={ handleLabelColor(userVetKeys[18]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[18], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[21] } labelColor={ handleLabelColor(userVetKeys[21]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[21], value) }
            />
          </Box>
        </Box>
        <Box sx={ sectionItems }>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[19] } labelColor={ handleLabelColor(userVetKeys[19]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[19], value) }
            />
          </Box>
          <Box sx={ sectionItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } isActive={ true }
              defaultValue={ vet.name } label={ fieldVetKyes[20] } labelColor={ handleLabelColor(userVetKeys[20]) }
              handleInputChanges={ (value) => handleInputChanges(userVetKeys[20], value) }
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