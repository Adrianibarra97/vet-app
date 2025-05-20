
import { useEffect, useState } from 'react'
import { Modal, Box, Typography } from '@mui/material'
import { FormControlModalDate } from '../form-control-modal-date/FormControlModalDate'
import { FormControlModalImage } from '../form-control-modal-image/FormControlModalImage'
import { FormControlModalSelect } from '../form-control-modal-select/FormControlModalSelect'
import { FormControlModal } from '../form-control-modal/FormControlModal'
import { ButtonsModal } from '../buttons-modal/ButtonsModal'
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager'
import PetServiceManager from '../../services/pet-service/PetServiceManager'
import { Pet } from '../../domain/Pet'
import dayjs, { Dayjs } from 'dayjs'
import { formContainer, modal, modalItems, modalTitle, modalItem, buttonContent } from './PetModalStyle'

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

  const handleLabelColor = (key: keyof Pet): 'success' | 'error' => pet[key] ? 'success' : 'error'

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
    if(petModalProp.pet.id >= 0) PetServiceManager.getIntance().update(pet)
    else PetServiceManager.getIntance().create(pet)
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

  const handleInputChanges = (key: keyof Pet, value: string | number) => {
    if(sterilizedOptions.some((OldValue: string) => OldValue == value)) {
      (pet as unknown as Record<keyof Pet, boolean>)[key] = value === sterilizedOptions[0]
    } else if(sexOptions.some((OldValue: string) => OldValue === value)) {
      (pet as unknown as Record<keyof Pet, string>)[key] = value.toString()
    } else {
      (pet as unknown as Record<keyof Pet, string | number>)[key] = value
    }
    newStatusPet(pet)
  }

  const handleDateInputChanges = (key: keyof Pet, date: Dayjs) => {
    (pet as unknown as Record<keyof Pet, string | undefined>)[key] = date.format('YYYY-MM-DD')
    newStatusPet(pet)
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
    <Modal open={ petModalProp.open } onClose={ petModalProp.onClose } sx={ modal }>
      <Box sx={ formContainer }>
        <Typography variant="h6" sx={ modalTitle }>
          { pet.id > -1 ? 'Editar Consulta' : 'Crear Consulta' }
        </Typography>
        <Box sx={ modalItems }>
          <Box sx={ modalItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.name }
              isActive={ true } label={ fieldKyes[1] } labelColor={ handleLabelColor(petKeys[1]) }
              handleInputChanges={ (value) => handleInputChanges(petKeys[1], value) }
            />
          </Box>
          <Box sx={ modalItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.name }
              isActive={ false } label={ fieldKyes[1] } labelColor={ handleLabelColor(petKeys[1]) }
              handleInputChanges={ (value) => handleInputChanges(petKeys[1], value) }
            />
          </Box>
        </Box>
        <Box sx={ modalItems }>
          <Box sx={ modalItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.specie }
              isActive={ true } label={ fieldKyes[9] } labelColor={ handleLabelColor(petKeys[9]) }
              handleInputChanges={ (value) => handleInputChanges(petKeys[9], value) }
            />
          </Box>
          <Box sx={ modalItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.breed }
              isActive={ true } label={ fieldKyes[2] } labelColor={ handleLabelColor(petKeys[2]) }
              handleInputChanges={ (value) => handleInputChanges(petKeys[2], value) }
            />
          </Box>
        </Box>
        <Box sx={ modalItems }>
          <Box sx={ modalItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.age }
              isActive={ true } label={ fieldKyes[3] } labelColor={ handleLabelColor(petKeys[3]) }
              handleInputChanges={ (value) => handleInputChanges(petKeys[3], value) }
            />
          </Box>
          <Box sx={ modalItem }>
            <FormControlModal
              type={ textFieldTypes[0] } errorActive={ errorActive } defaultValue={ pet.weight }
              isActive={ true } label={ fieldKyes[4] } labelColor={ handleLabelColor(petKeys[4]) }
              handleInputChanges={ (value) => handleInputChanges(petKeys[4], value) }
            />
          </Box>
        </Box>
        <Box sx={ modalItems }>
          <Box sx={ modalItem }>
            <FormControlModalSelect
              defaultValue={ pet.sterilized ? sterilizedOptions[0] : sterilizedOptions[1] }
              options={ sterilizedOptions } isActive={ true } label={ fieldKyes[5] }
              labelColor={ 'success' }
              handleInputChanges={ (value) => handleInputChanges(petKeys[5], value) }
            />
          </Box>
          <Box sx={ modalItem }>
            <FormControlModalSelect
              defaultValue={ pet.sex } options={ sexOptions } isActive={ true }
              label={ fieldKyes[7] } labelColor={ handleLabelColor(petKeys[7]) }
              handleInputChanges={ (value) => handleInputChanges(petKeys[7], value) }
            />
          </Box>
        </Box>
        <Box sx={ modalItems }>
          <Box sx={ modalItem }>
            <FormControlModalDate
              label={ fieldKyes[8] } defaultValue={ dayjs(pet.birth) } errorActive={ errorActive }
              isActive={ true } handleInputChanges={ (value) => handleDateInputChanges(petKeys[8], value) }
            />
          </Box>
          <Box sx={ modalItem }>
            <FormControlModalImage
              isActive={ true } pet={ pet }
              onPhotoChange={ (value) => handleInputChanges(petKeys[6], value) }
            />
          </Box>
        </Box>
        <Box sx={ buttonContent }>
          <ButtonsModal
            confirLabel={ 'Confirmar' } cancelLabel={ 'Cancelar' }
            confirm={ handleConfirm } cancel={ handleCancel }
          />
        </Box>
      </Box>
    </Modal>
  )
}