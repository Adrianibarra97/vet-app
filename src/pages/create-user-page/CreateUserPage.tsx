import { ChangeEvent, useState } from 'react'
import { Box, Button, SelectChangeEvent, Typography } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { FormControlModalDate } from '../../components/form-control-modal-date/FormControlModalDate'
import { FormControlModalSelect } from '../../components/form-control-modal-select/FormControlModalSelect'
import { FormControlModalImage } from '../../components/form-control-modal-image/FormControlModalImage'
import { PetModalItems } from '../../components/pet-modal-items/PetModalItems'
import { Vet } from '../../domain/Vet'
import { PetOwner } from '../../domain/PetOwner'
import { Pet } from '../../domain/Pet'
import { BkgButton, button__Container, formContainer, formItem, formItemTitle, modalItems, modalTitle } from './CreateUserPageStyle'
import './CreateUserPage.css'
import { FormControlModal } from '../../components/form-control-modal/FormControlModal'

export const CreateUserPage = () => {

  const textFieldTypes: ['text', 'number'] = ['text', 'number']
  const userTypes: ['VET', 'PETOWNER'] = ['VET', 'PETOWNER']
  
  const [errorActive, setErrorActive] = useState(false)
  const [user, setUser] = useState<Vet | PetOwner | null>(null)

  const [pet, setPet] = useState(new Pet())
  const sexOptions: string[] = ['Macho', 'Hembra']
  const sterilizedOptions: string[] = ['SI', 'NO']
  const petKeys: (keyof Pet)[] = [
    'id', 'name', 'breed', 'age', 'weight',
    'sterilized', 'photo', 'sex', 'birth', 'specie'
  ]
  const fieldKyes: (string)[] = [
    'Id', 'Nombre', 'Raza', 'Edad', 'Peso',
    'Castrado', 'Image', 'Sexo', 'Nacimiento', 'Especie'
  ]


  const handleInputChanges = (key: keyof Pet, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  }

  const handleSelectChanges = (value: string) => {
    console.log(value)
  }

  const handleDateInputChanges = (key: keyof Pet, date: Dayjs) => {
   
  }

  const handlePhotoChange = (newPhoto: string) => {
    const updated = Object.assign(
      Object.create(Object.getPrototypeOf(pet)),
      { ...pet, photo: newPhoto },
    )
    setPet(updated)
  }

  const handleLabelColor = (key: keyof Pet): 'primary' | 'error' => {
    return pet[key] ? 'primary' : 'error'
  }

  const handleCancel = () => {}
  const handleConfirm = () => {}

  return (
    <main className="auth__main">
      <Box sx={ formContainer }>


        <Box sx={ formItemTitle }>
          <Typography variant="h6" sx={ modalTitle }>Tipo de usuario</Typography>

          <FormControlModalSelect isActive={ true } label={ 'tipo de usuario' }
            options={ userTypes } defaultValue={ userTypes[0] } labelColor={ 'success' }
            handleInputChanges={ (value) => handleSelectChanges(value) }            
          />
        </Box>

        <Box sx={ formItem }>
          <Typography variant="h6" sx={ modalTitle }>USER</Typography>
          <Box sx={ modalItems }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.name }
              isActive={ true } label={ fieldKyes[1] } labelColor={ handleLabelColor(petKeys[1]) }
              handleInputChanges={ (value) => handleInputChanges(petKeys[1], value) }
            />
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.name }
              isActive={ false } label={ fieldKyes[1] } labelColor={ handleLabelColor(petKeys[1]) }
              handleInputChanges={ (value) => handleInputChanges(petKeys[1], value) }
            />
          </Box>
        </Box>


        <Box sx={ formItem }>
          <Typography variant="h6" sx={ modalTitle }>PETOWNER</Typography>
          <Box sx={ modalItems }>
            <FormControlModalSelect
              defaultValue={ pet.sterilized ? sterilizedOptions[0] : sterilizedOptions[1] }
              options={ sterilizedOptions } isActive={ true } label={ fieldKyes[5] }
              labelColor={ handleLabelColor(petKeys[5]) }
              handleInputChanges={ (value) => handleInputChanges(petKeys[5], value) }
            />
            <FormControlModalSelect
              defaultValue={ pet.sex } options={ sexOptions } isActive={ true }
              label={ fieldKyes[7] } labelColor={ handleLabelColor(petKeys[7]) }
              handleInputChanges={ (value) => handleInputChanges(petKeys[7], value) }
            />
          </Box>
        </Box>

        <Box sx={ formItem }>
          <Typography variant="h6" sx={ modalTitle }>VET</Typography>
          <Box sx={ modalItems }>
            <FormControlModalSelect
              defaultValue={ pet.sterilized ? sterilizedOptions[0] : sterilizedOptions[1] }
              options={ sterilizedOptions } isActive={ true } label={ fieldKyes[5] }
              labelColor={ handleLabelColor(petKeys[5]) }
              handleInputChanges={ (value) => handleInputChanges(petKeys[5], value) }
            />
            <FormControlModalSelect
              defaultValue={ pet.sex } options={ sexOptions } isActive={ true }
              label={ fieldKyes[7] } labelColor={ handleLabelColor(petKeys[7]) }
              handleInputChanges={ (value) => handleInputChanges(petKeys[7], value) }
            />
          </Box>
        </Box>

        <Box sx={ button__Container }>
          <Button variant="contained" sx={ BkgButton } onClick={ handleCancel }>Cancelar</Button>
          <Button variant="contained" sx={ BkgButton } onClick={ handleConfirm }>Confirmar</Button>
        </Box>
      </Box>
    </main>
  )
}