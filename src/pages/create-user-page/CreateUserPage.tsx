import { ChangeEvent, useState } from 'react'
import { Box, Button, SelectChangeEvent, Typography } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { FormControlModalDate } from '../../components/form-control-modal-date/FormControlModalDate'
import { FormControlModalSelect } from '../../components/form-control-modal-select/FormControlModalSelect'
import { FormControlModalImage } from '../../components/form-control-modal-image/FormControlModalImage'
import { PetModalItemsSelect } from '../../components/pet-modal-items-select/PetModalItemsSelect'
import { PetModalItems } from '../../components/pet-modal-items/PetModalItems'
import { Vet } from '../../domain/Vet'
import { PetOwner } from '../../domain/PetOwner'
import { Pet } from '../../domain/Pet'
import { BkgButton, button__Container, formContainer, formItem, formItemTitle, modalItems, modalTitle } from './CreateUserPageStyle'
import './CreateUserPage.css'

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

  const handleSelectChanges = (key: keyof Pet, e: SelectChangeEvent) => {
    
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
            petKey={ 'id' } handleInputChanges={ handleSelectChanges }            
          />
        </Box>

        <Box sx={ formItem }>
          <Typography variant="h6" sx={ modalTitle }>USER</Typography>
          <PetModalItems
            errorActive={ errorActive }
            firstType={ textFieldTypes[0] } secondType={ textFieldTypes[0] }
            firstDefaultValue={ pet.name } secondDefaultValue={ pet.name }
            firstIsActive={ true } secondIsActive={ false } handleLabelColor={ handleLabelColor }
            firstIndex={ 1 } secondIndex={ 0 } handleInputChanges={ handleInputChanges }
          />
          <PetModalItemsSelect
            firstdefaultValue={ pet.sterilized ? sterilizedOptions[0] : sterilizedOptions[1] }
            seconddefaultValue={ pet.sex } firstArrayOptions={ sterilizedOptions }
            secondArrayOptions={ sexOptions } firstIsActive={ true } secondIsActive={ true }
            handleLabelColor={ handleLabelColor } firstIndex={ 5 } secondIndex={ 7 }
            handleSelectChanges={ handleSelectChanges }
          />
          <Box sx={ modalItems }>
            <FormControlModalDate
              label={ fieldKyes[8] } defaultValue={ dayjs(pet.birth) } errorActive={ errorActive }
              isActive={ true } petKey={ petKeys[8] } handleInputChanges={ handleDateInputChanges }
            />
            <FormControlModalImage isActive={ true } pet={pet} setPet={ setPet } onPhotoChange={ handlePhotoChange }/>
          </Box>
        </Box>


        <Box sx={ formItem }>
          <Typography variant="h6" sx={ modalTitle }>PETOWNER</Typography>
          <PetModalItemsSelect
            firstdefaultValue={ pet.sterilized ? sterilizedOptions[0] : sterilizedOptions[1] }
            seconddefaultValue={ pet.sex } firstArrayOptions={ sterilizedOptions }
            secondArrayOptions={ sexOptions } firstIsActive={ true } secondIsActive={ true }
            handleLabelColor={ handleLabelColor } firstIndex={ 5 } secondIndex={ 7 }
            handleSelectChanges={ handleSelectChanges }
          />
        </Box>

        <Box sx={ formItem }>
          <Typography variant="h6" sx={ modalTitle }>VET</Typography>
          <PetModalItems
            errorActive={ errorActive }
            firstType={ textFieldTypes[0] } secondType={ textFieldTypes[0] }
            firstDefaultValue={ pet.name } secondDefaultValue={ pet.name }
            firstIsActive={ true } secondIsActive={ false } handleLabelColor={ handleLabelColor }
            firstIndex={ 1 } secondIndex={ 0 } handleInputChanges={ handleInputChanges }
          />
          <PetModalItems
            errorActive={ errorActive }
            firstType={ textFieldTypes[0] } secondType={ textFieldTypes[0] }
            firstDefaultValue={ pet.specie } secondDefaultValue={ pet.breed }
            firstIsActive={ true } secondIsActive={ true } handleLabelColor={ handleLabelColor }
            firstIndex={ 9 } secondIndex={ 2 } handleInputChanges={ handleInputChanges }
          />
          <PetModalItems
            errorActive={ errorActive }
            firstType={ textFieldTypes[1] } secondType={ textFieldTypes[1] }
            firstDefaultValue={ pet.age } secondDefaultValue={ pet.weight }
            firstIsActive={ true } secondIsActive={ true } handleLabelColor={ handleLabelColor }
            firstIndex={ 3 } secondIndex={ 4 } handleInputChanges={ handleInputChanges }
          />
        </Box>

        <Box sx={ button__Container }>
          <Button variant="contained" sx={ BkgButton } onClick={ handleCancel }>Cancelar</Button>
          <Button variant="contained" sx={ BkgButton } onClick={ handleConfirm }>Confirmar</Button>
        </Box>

      </Box>
    </main>
  )
}