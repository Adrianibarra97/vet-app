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
import { PetSchema } from '../../util/ValidateFormByFields'

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
  const speciesMap: Map<string, string> = new Map<string, string>()
  speciesMap.set('Gato', 'CAT')
  speciesMap.set('Perro', 'DOG')
  speciesMap.set('Ave', 'BIRD')
  speciesMap.set('Pez', 'FISH')
  speciesMap.set('Granja', 'FARM')
  speciesMap.set('Caballo', 'HORSE')
  speciesMap.set('Roedor', 'RODENT')
  speciesMap.set('Reptil', 'REPTILE')
  
  const [pet, setPet] = useState(petModalProp.pet)
  const [errorActive, setErrorActive] = useState(false)
  const [errors, setErrors] = useState<{
    [key: string]: string
  }>({})

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
    try {
      await PetSchema.validate(pet, {
        abortEarly: false,
      })
      setErrors({})
      await handleAction()
      petModalProp.onClose()
      petModalProp.cleanFilter()
      SnackbarUtilities.succes(msg)
    } catch (error: any) {
      const errors: { [key: string]: string } = {}
      if (error.inner) {
        error.inner.forEach((err: any) => {
          errors[err.path] = err.message
        })
      } else {
        errors.general = error.message
      }
      setErrors(errors)
    }
    console.log(errors)
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
    } else if(optionsSpecieValue().some((OldValue: string) => OldValue === value)) {
      (pet as unknown as Record<keyof Pet, string | undefined>)[key] = speciesMap.get(value.toString())
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

  const defaultSpecieValue = (): string => {
    const value: string | undefined = speciesMap.get(pet.specie)
    return value != undefined ? value : '' 
  }

  const optionsSpecieValue = (): string[] => {
    return Array.from(speciesMap.keys())
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
            <FormControlModalSelect
              defaultValue={ defaultSpecieValue() } options={ optionsSpecieValue() } isActive={ true }
              label={ fieldKyes[9] } labelColor={ handleLabelColor(petKeys[9]) }
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