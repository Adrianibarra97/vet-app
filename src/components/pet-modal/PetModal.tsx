import { Modal, Box, Button, Typography } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { PetModalItems } from '../pet-modal-items/PetModalItems'
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager'
import PetServiceManager from '../../services/pet-service/PetServiceManager'
import { Pet } from '../../domain/Pet'
import { 
  BkgCancelButton, BkgConfirmButton, button__Container,
  formContainer, modal, modalItems, modalTitle
} from './PetModalStyle'
import { FormControlModalDate } from '../form-control-modal-date/FormControlModalDate'
import { FormControlModalImage } from '../form-control-modal-image/FormControlModalImage'
import { FormControlModalSelect } from '../form-control-modal-select/FormControlModalSelect'

interface PetModalProps {
  open: boolean
  pet: Pet
  onClose: () => void
  cleanFilter: () => void
}

export const PetModal = (petModalProp: PetModalProps) => {

  const sexOptions: string[] = ['Macho', 'Hembra']
  const sterilizedOptions: string[] = ['SI', 'NO']
  const textFieldTypes: ['text', 'number'] = ['text', 'number']
  const petKeys: (keyof Pet)[] = [
    'id', 'name', 'breed', 'age', 'weight',
    'sterilized', 'photo', 'sex', 'birth', 'specie'
  ]
  const fieldKyes: (string)[] = [
    'Id', 'Nombre', 'Raza', 'Edad', 'Peso',
    'Castrado', 'Image', 'Sexo', 'Nacimiento', 'Especie'
  ]

  const [pet, setPet] = useState(petModalProp.pet)
  const [errorActive, setErrorActive] = useState(false)

  const handleConfirm = () => {
    if(hasRequiredFields()) {
      setErrorActive(true)
    } else {
      setErrorActive(false)
      confirm()
    }
  }

  const confirm = async () => {
    const action: string = petModalProp.pet.id >= 0 ? 'actualizado' : 'creado'
    const msg: string = `Ha ${action} el perfil de su mascota con éxito!`
    await handleAction()
    petModalProp.onClose()
    petModalProp.cleanFilter()
    SnackbarUtilities.succes(msg)
  }

  const handleAction = async () => {
    if(petModalProp.pet.id >= 0) {
      PetServiceManager.getIntance().update(pet)
    } else {
      PetServiceManager.getIntance().create(pet)
    }
    setPet(new Pet())
  }

  const handleCancel = () => {
    setErrorActive(false)
    setPet(new Pet())
    petModalProp.onClose()
    petModalProp.cleanFilter()
  }

  const newStatusPet = (updatedPet: Pet) => {
    const newPet = Object.assign(new Pet(), updatedPet)
    setPet(newPet)
  }

  const handleInputChanges = (key: keyof Pet, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    (pet as unknown as Record<keyof Pet, string | undefined>)[key] = e.target.value
    newStatusPet(pet)
  }

  const handleSelectChanges = (key: keyof Pet, value: string) => {
    if(sterilizedOptions.some((OldValue: string) => OldValue == value)) {
      (pet as unknown as Record<keyof Pet, boolean | undefined>)[key] = value === sterilizedOptions[0]
    }
    if(sexOptions.some((OldValue: string) => OldValue === value)) {
      (pet as unknown as Record<keyof Pet, string | undefined>)[key] = value
    }
    newStatusPet(pet)
  }

  const handleDateInputChanges = (key: keyof Pet, date: Dayjs) => {
    (pet as unknown as Record<keyof Pet, string | undefined>)[key] = date.format('YYYY-MM-DD')
    newStatusPet(pet)
  }

  const handlePhotoChange = (value: string) => {
    (pet as unknown as Record<keyof Pet, string | undefined>)['photo'] = value
    newStatusPet(pet)
  }

  const handleLabelColor = (key: keyof Pet): 'success' | 'error' => {
    return pet[key] ? 'success' : 'error'
  }

  const hasRequiredFields = (): boolean => {
    const requiredFields: (keyof Pet)[] = [
      'name', 'breed', 'age', 'weight',
      'photo', 'birth', 'specie'
    ]
    return requiredFields.some((field) => !pet[field])
  }

  useEffect(() => {
    setPet(petModalProp.pet)
  }, [petModalProp.pet])

  return (
    <>
      <Modal open={ petModalProp.open } onClose={ petModalProp.onClose } sx={ modal }>
        <Box sx={ formContainer }>
          <Typography variant="h6" sx={ modalTitle }>
            { pet.id > -1 ? 'Editar Consulta' : 'Crear Consulta' }
          </Typography>
          
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

          <Box sx={ modalItems }>
            <FormControlModalSelect
              defaultValue={ pet.sterilized ? sterilizedOptions[0] : sterilizedOptions[1] }
              options={ sterilizedOptions } isActive={ true } label={ fieldKyes[5] }
              labelColor={ handleLabelColor(petKeys[5]) }
              handleInputChanges={ (value) => handleSelectChanges(petKeys[5], value) }
            />
            <FormControlModalSelect
              defaultValue={ pet.sex } options={ sexOptions } isActive={ true }
              label={ fieldKyes[7] } labelColor={ handleLabelColor(petKeys[7]) }
              handleInputChanges={ (value) => handleSelectChanges(petKeys[7], value) }
            />
          </Box>
          <Box sx={ modalItems }>
            <FormControlModalDate
              label={ fieldKyes[8] } defaultValue={ dayjs(pet.birth) } errorActive={ errorActive }
              isActive={ true } handleInputChanges={ (value) => handleDateInputChanges(petKeys[8], value) }
            />
            <FormControlModalImage isActive={ true } pet={ pet } onPhotoChange={ handlePhotoChange }/>
          </Box>
          <Box sx={ button__Container }>
            <Button variant="contained" sx={ BkgCancelButton } onClick={ handleCancel }>Cancelar</Button>
            <Button variant="contained" sx={ BkgConfirmButton } onClick={ handleConfirm }>Confirmar</Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}