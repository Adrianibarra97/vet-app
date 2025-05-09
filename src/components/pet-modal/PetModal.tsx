import { Modal, Box, Button, Typography, SelectChangeEvent, InputBaseComponentProps } from '@mui/material'
import { Pet } from '../../domain/Pet'
import { 
  BkgCancelButton, BkgConfirmButton, button__Container, formContainer, modal, modalItems, modalTitle
} from './PetModalStyle'
import { ChangeEvent, useEffect, useState } from 'react'
import { PetModalItems } from '../pet-modal-items/PetModalItems'
import { PetModalItemsSelect } from '../pet-modal-items-select/PetModalItemsSelect'
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager'
import { FormControlModalDate } from '../form-control-modal-date/FormControlModalDate'
import { FormControlModalImage } from '../form-control-modal-image/FormControlModalImage'
import PetServiceManager from '../../services/pet-service/PetServiceManager'
interface PetModalProps {
  open: boolean,
  id: number,
  onClose: () => void,
  onCreate: (pet: Pet) => void,
  onUpdate: (pet: Pet) => void
}

export const PetModal = (petModalProp: PetModalProps) => {

  const inputTypeText: string = 'text'
  const inputTypeNumber: string = 'number'
  const baseInputProp: InputBaseComponentProps = JSON.parse('{}')
  const ageInputProp: InputBaseComponentProps = {
    min: 0,
    max: 500,
    step: 1 // allows only natural numbers.
  }
  const weightInputProp: InputBaseComponentProps = {
    min: 0,
    max: 500,
    step: 'any', // allows only integers.
  }
  const imageInputProp: InputBaseComponentProps = {

  }
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
  const [pet, setPet] = useState(new Pet())

  const handleCancel = () => {
    setPet(new Pet())
    petModalProp.onClose()
  }

  const handleConfirm = () => {
    let msg: string = ''
    if(petModalProp.id >= 0) {
      petModalProp.onUpdate(pet)
      msg = 'Ha actualizado el perfil de su mascota con éxito!' 
    }
    if(petModalProp.id < 0) {
      petModalProp.onCreate(pet)
      msg = 'Ha creado el perfil de su mascota con éxito!'
    }
    petModalProp.onClose()
    SnackbarUtilities.succes(msg)
  }

  const newStatusPet = (updatedPet: Pet) => {
    const newPet = Object.assign(new Pet(), updatedPet)
    setPet(newPet)
  } 

  const handleInputChanges = (key: keyof Pet, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    (pet as unknown as Record<keyof Pet, string | undefined>)[key] = e.target.value
    newStatusPet(pet)
  }

  const handleImageChanges = (key: keyof Pet, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        const imageData = reader.result as string
        (pet as unknown as Record<keyof Pet, string | undefined>)[key] = imageData
        newStatusPet(pet)
      }
    }
  }

  const handleSelectChanges = (key: keyof Pet, e: SelectChangeEvent) => {
    if(sterilizedOptions.some((value: string) => value == e.target.value)) {
      (pet as unknown as Record<keyof Pet, boolean | undefined>)[key] = e.target.value == sterilizedOptions[0]
    }
    if(sexOptions.some((value: string) => value == e.target.value)) {
      (pet as unknown as Record<keyof Pet, string | undefined>)[key] = e.target.value
    }   
    const newPet = Object.assign(new Pet(), pet)
    setPet(newPet)
  }

  const handleLabelColor = (key: keyof Pet): 'primary' | 'error' => {
    return pet[key] ? 'primary' : 'error'
  }

  const initModal = async () => {
    if(petModalProp.id >= 0) {
      const updatePet = PetServiceManager.getIntance().getPetById(petModalProp.id)
      setPet(await updatePet)
    }
  }

  // const [error, setError] = useState<string | null>(null)

  // const hasMissingRequiredFields = (): boolean => {
  //   const requiredFields: (keyof MedicalShift)[] = [
  //     'vetName',
  //     'petName',
  //     'date',
  //   ]
  //   return requiredFields.some((field) => !medicalShift[field])
  // }

  useEffect(() => {
    initModal()
  }, [])

  return (
    <Modal open={ petModalProp.open } onClose={ petModalProp.onClose } sx={ modal }>
      <Box sx={ formContainer }>
        <Typography variant="h6" sx={ modalTitle }>
          { pet.id > -1 ? 'Editar Consulta' : 'Crear Consulta' }
        </Typography>
        <PetModalItems
          firstDefaultValue={ pet.name } secondDefaultValue={ pet.name }
          firstType={ inputTypeText } secondType={ inputTypeText }
          firstInputProp={ baseInputProp } secondInputProp={ baseInputProp }
          firstIsActive={ true } secondIsActive={ false } handleLabelColor={ handleLabelColor }
          firstIndex={ 1 } secondIndex={ 0 } handleInputChanges={ handleInputChanges }
        />
        <PetModalItems
          firstDefaultValue={ pet.specie } secondDefaultValue={ pet.breed }
          firstType={ inputTypeText } secondType={ inputTypeText }
          firstInputProp={ baseInputProp } secondInputProp={ baseInputProp }
          firstIsActive={ true } secondIsActive={ true } handleLabelColor={ handleLabelColor }
          firstIndex={ 9 } secondIndex={ 2 } handleInputChanges={ handleInputChanges }
        />
        <PetModalItems
          firstDefaultValue={ pet.age } secondDefaultValue={ pet.weight }
          firstType={ inputTypeNumber } secondType={ inputTypeNumber }
          firstInputProp={ ageInputProp } secondInputProp={ weightInputProp }
          firstIsActive={ true } secondIsActive={ true } handleLabelColor={ handleLabelColor }
          firstIndex={ 3 } secondIndex={ 4 } handleInputChanges={ handleInputChanges }
        />
        <PetModalItemsSelect
          firstArrayOptions={ sterilizedOptions } secondArrayOptions={ sexOptions }
          firstIsActive={ true } secondIsActive={ true } handleLabelColor={ handleLabelColor }
          firstIndex={ 5 } secondIndex={ 7 } handleSelectChanges={ handleSelectChanges }
        />
        <Box sx={ modalItems }>
          <FormControlModalImage
            inputProp={ imageInputProp } isActive={ true } petKey={ petKeys[6] }
            label={ fieldKyes[6] } labelColor={ handleLabelColor(petKeys[6]) }
            handleInputChanges={ handleImageChanges }
          />
          <FormControlModalDate
            defaultValue={ pet.birth }
            inputProp={ baseInputProp } isActive={ true } petKey={ petKeys[8] }
            label={ fieldKyes[8] } labelColor={ handleLabelColor(petKeys[8]) }
            handleInputChanges={ handleInputChanges }
          />
        </Box>
        <Box sx={ button__Container }>
          <Button variant="contained" sx={ BkgCancelButton } onClick={ handleCancel }>Cancelar</Button>
          <Button variant="contained" sx={ BkgConfirmButton } onClick={ handleConfirm }>Confirmar</Button>
        </Box>
      </Box>
    </Modal>
  )
}