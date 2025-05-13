import { Modal, Box, Button, Typography, SelectChangeEvent } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { PetModalItems } from '../pet-modal-items/PetModalItems'
import { PetModalItemsSelect } from '../pet-modal-items-select/PetModalItemsSelect'
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager'
import PetServiceManager from '../../services/pet-service/PetServiceManager'
import { Pet } from '../../domain/Pet'
import { 
  BkgCancelButton, BkgConfirmButton, button__Container,
  formContainer, modal, modalItems, modalTitle
} from './PetModalStyle'
import { FormControlModalDate } from '../form-control-modal-date/FormControlModalDate'
import { FormControlModalImage } from '../form-control-modal-image/FormControlModalImage'

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

  const confirm = () => {
    const action: string = pet.id >= 0 ? 'actualizado' : 'creado'
    const msg: string = `Ha ${action} el perfil de su mascota con éxito!`
    handleAction()
    petModalProp.onClose()
    SnackbarUtilities.succes(msg)
  }

  const handleAction = async () => {
    if(pet.id >= 0) PetServiceManager.getIntance().create(pet)
    else PetServiceManager.getIntance().update(pet)
    petModalProp.cleanFilter()
  }

  const handleCancel = () => {
    setErrorActive(false)
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

  const handleSelectChanges = (key: keyof Pet, e: SelectChangeEvent) => {
    if(sterilizedOptions.some((value: string) => value == e.target.value)) {
      (pet as unknown as Record<keyof Pet, boolean | undefined>)[key] = e.target.value == sterilizedOptions[0]
    }
    if(sexOptions.some((value: string) => value == e.target.value)) {
      (pet as unknown as Record<keyof Pet, string | undefined>)[key] = e.target.value
    }   
    newStatusPet(pet)
  }

  const handleDateInputChanges = (key: keyof Pet, date: Dayjs) => {
    (pet as unknown as Record<keyof Pet, string | undefined>)[key] = date.format('YYYY-MM-DD')
    newStatusPet(pet)
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

  const hasRequiredFields = (): boolean => {
    const requiredFields: (keyof Pet)[] = [
      'name', 'breed', 'age', 'weight',
      'photo', 'birth', 'specie'
    ]
    return requiredFields.some((field) => !pet[field])
  }

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
          <PetModalItemsSelect
            firstdefaultValue={ pet.sterilized ? sterilizedOptions[0] : sterilizedOptions[1] }
            seconddefaultValue={ pet.sex } firstArrayOptions={ sterilizedOptions }
            secondArrayOptions={ sexOptions } firstIsActive={ true } secondIsActive={ true }
            handleLabelColor={ handleLabelColor } firstIndex={ 5 } secondIndex={ 7 }
            handleSelectChanges={ handleSelectChanges }
          />
          <Box sx={ modalItems }>
            <FormControlModalDate
              errorActive={ errorActive } label={ fieldKyes[8] } defaultValue={ dayjs(pet.birth) }
              isActive={ true } petKey={ petKeys[8] } handleInputChanges={ handleDateInputChanges }
            />
            <FormControlModalImage isActive={ true } pet={pet} setPet={ setPet } onPhotoChange={ handlePhotoChange }/>
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