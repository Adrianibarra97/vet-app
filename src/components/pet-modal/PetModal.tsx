import { Modal, Box, Button, Typography, SelectChangeEvent } from '@mui/material'
import { Pet } from '../../domain/Pet'
import { 
  BkgCancelButton, BkgConfirmButton, button__Container, formContainer, modal, modalItems, modalTitle
} from './PetModalStyle'
import { ChangeEvent, useState } from 'react'
import { PetModalItems } from '../pet-modal-items/PetModalItems'
import { PetModalItemsSelect } from '../pet-modal-items-select/PetModalItemsSelect'
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager'
import { FormControlModalDate } from '../form-control-modal-date/FormControlModalDate'
import dayjs, { Dayjs } from 'dayjs'
interface PetModalProps {
  open: boolean,
  id: number,
  pet: Pet,
  setPet: (pet: Pet) => void,
  onClose: () => void,
  onCreate: (pet: Pet) => void,
  onUpdate: (pet: Pet) => void
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
  const [errorActive, setErrorActive] = useState(false)

  const handleCancel = () => {
    setErrorActive(false)
    petModalProp.onClose()
  }

  const hasRequiredFields = (): boolean => {
    const requiredFields: (keyof Pet)[] = [
      'name', 'breed', 'age', 'weight',
      'photo', 'birth', 'specie'
    ]
    return requiredFields.some((field) => !petModalProp.pet[field])
  }

  const handleConfirm = () => {
    if(hasRequiredFields()) {
      setErrorActive(true)
    } else {
      setErrorActive(false)
      confirm()
    }
  }

  const confirm = () => {
    let msg: string = ''
    if(petModalProp.id >= 0) {
      petModalProp.onUpdate(petModalProp.pet)
      msg = 'Ha actualizado el perfil de su mascota con éxito!' 
    }
    if(petModalProp.id < 0) {
      petModalProp.onCreate(petModalProp.pet)
      msg = 'Ha creado el perfil de su mascota con éxito!'
    }
    petModalProp.onClose()
    SnackbarUtilities.succes(msg)
  }

  const newStatusPet = (updatedPet: Pet) => {
    const newPet = Object.assign(new Pet(), updatedPet)
    petModalProp.setPet(newPet)
  } 

  const handleInputChanges = (key: keyof Pet, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    (petModalProp.pet as unknown as Record<keyof Pet, string | undefined>)[key] = e.target.value
    newStatusPet(petModalProp.pet)
  }

  const handleDateInputChanges = (key: keyof Pet, date: Dayjs) => {
    (petModalProp.pet as unknown as Record<keyof Pet, string | undefined>)[key] = date.format('YYYY-MM-DD')
    newStatusPet(petModalProp.pet)
  }

  const handleImageChanges = (key: keyof Pet, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        const imageData = reader.result as string
        (petModalProp.pet as unknown as Record<keyof Pet, string | undefined>)[key] = imageData
        newStatusPet(petModalProp.pet)
      }
    }
  }

  const handleSelectChanges = (key: keyof Pet, e: SelectChangeEvent) => {
    if(sterilizedOptions.some((value: string) => value == e.target.value)) {
      (petModalProp.pet as unknown as Record<keyof Pet, boolean | undefined>)[key] = e.target.value == sterilizedOptions[0]
    }
    if(sexOptions.some((value: string) => value == e.target.value)) {
      (petModalProp.pet as unknown as Record<keyof Pet, string | undefined>)[key] = e.target.value
    }   
    const newPet = Object.assign(new Pet(), petModalProp.pet)
    petModalProp.setPet(newPet)
  }

  const handleLabelColor = (key: keyof Pet): 'primary' | 'error' => {
    return petModalProp.pet[key] ? 'primary' : 'error'
  }

  return (
    <Modal open={ petModalProp.open } onClose={ petModalProp.onClose } sx={ modal }>
      <Box sx={ formContainer }>
        <Typography variant="h6" sx={ modalTitle }>
          { petModalProp.pet.id > -1 ? 'Editar Consulta' : 'Crear Consulta' }
        </Typography>
        <PetModalItems
          errorActive={ errorActive }
          firstType={ textFieldTypes[0] } secondType={ textFieldTypes[0] }
          firstDefaultValue={ petModalProp.pet.name } secondDefaultValue={ petModalProp.pet.name }
          firstIsActive={ true } secondIsActive={ false } handleLabelColor={ handleLabelColor }
          firstIndex={ 1 } secondIndex={ 0 } handleInputChanges={ handleInputChanges }
        />
        <PetModalItems
          errorActive={ errorActive }
          firstType={ textFieldTypes[0] } secondType={ textFieldTypes[0] }
          firstDefaultValue={ petModalProp.pet.specie } secondDefaultValue={ petModalProp.pet.breed }
          firstIsActive={ true } secondIsActive={ true } handleLabelColor={ handleLabelColor }
          firstIndex={ 9 } secondIndex={ 2 } handleInputChanges={ handleInputChanges }
        />
        <PetModalItems
          errorActive={ errorActive }
          firstType={ textFieldTypes[1] } secondType={ textFieldTypes[1] }
          firstDefaultValue={ petModalProp.pet.age } secondDefaultValue={ petModalProp.pet.weight }
          firstIsActive={ true } secondIsActive={ true } handleLabelColor={ handleLabelColor }
          firstIndex={ 3 } secondIndex={ 4 } handleInputChanges={ handleInputChanges }
        />
        <PetModalItemsSelect
          firstdefaultValue={ petModalProp.pet.sterilized ? sterilizedOptions[0] : sterilizedOptions[1] }
          seconddefaultValue={ petModalProp.pet.sex } firstArrayOptions={ sterilizedOptions }
          secondArrayOptions={ sexOptions } firstIsActive={ true } secondIsActive={ true }
          handleLabelColor={ handleLabelColor } firstIndex={ 5 } secondIndex={ 7 }
          handleSelectChanges={ handleSelectChanges }
        />
        <Box sx={ modalItems }>
          <FormControlModalDate
            errorActive={ errorActive } label={ fieldKyes[8] } defaultValue={ dayjs(petModalProp.pet.birth) }
            isActive={ true } petKey={ petKeys[8] } handleInputChanges={ handleDateInputChanges }
          />
          {/* <FormControlModalImage
            inputProp={ imageInputProp } isActive={ true } petKey={ petKeys[6] }
            label={ fieldKyes[6] } labelColor={ handleLabelColor(petKeys[6]) }
            handleInputChanges={ handleImageChanges }
          /> */}
        </Box>
        <Box sx={ button__Container }>
          <Button variant="contained" sx={ BkgCancelButton } onClick={ handleCancel }>Cancelar</Button>
          <Button variant="contained" sx={ BkgConfirmButton } onClick={ handleConfirm }>Confirmar</Button>
        </Box>
      </Box>
    </Modal>
  )
}