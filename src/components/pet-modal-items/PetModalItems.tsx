import { Box, InputBaseComponentProps } from '@mui/material'
import { ChangeEvent } from 'react'
import { Pet } from '../../domain/Pet'
import { FormControlModal } from '../form-control-modal/FormControlModal'
import { modalItems } from './PetModalItemsStyle'

interface ModalItemsProps {
  firstIsActive: boolean,
  firstIndex: number,
  firstType: string,
  firstDefaultValue: string | number,
  firstInputProp: InputBaseComponentProps,
  secondIsActive: boolean,
  secondIndex: number,
  secondType: string,
  secondDefaultValue: string | number,
  secondInputProp: InputBaseComponentProps,
  handleLabelColor(key: keyof Pet): 'primary' | 'error'
  handleInputChanges(key: keyof Pet, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
}

export const PetModalItems = (modalItemsProps: ModalItemsProps) => {

  const petKeys: (keyof Pet)[] = [
    'id', 'name', 'breed', 'age', 'weight',
    'sterilized', 'photo', 'sex', 'birth', 'specie'
  ]
  const fieldKyes: (string)[] = [
    'Id', 'Nombre', 'Raza', 'Edad', 'Peso',
    'Castrado', 'Image', 'Sexo', 'Nacimiento', 'Especie'
  ]

  return (
    <Box sx={ modalItems }>
      <FormControlModal
        defaultValue={ modalItemsProps.firstDefaultValue }
        type={ modalItemsProps.firstType }
        inputProp={ modalItemsProps.firstInputProp }
        isActive={ modalItemsProps.firstIsActive }
        petKey={ petKeys[modalItemsProps.firstIndex] }
        label={ fieldKyes[modalItemsProps.firstIndex] }
        labelColor={ modalItemsProps.handleLabelColor(petKeys[modalItemsProps.firstIndex]) }
        handleInputChanges={ modalItemsProps.handleInputChanges }
      />
      <FormControlModal
        defaultValue={ modalItemsProps.secondDefaultValue }
        type={ modalItemsProps.secondType }
        inputProp={ modalItemsProps.secondInputProp }
        isActive={ modalItemsProps.secondIsActive }
        petKey={ petKeys[modalItemsProps.secondIndex] }
        label={ fieldKyes[modalItemsProps.secondIndex] }
        labelColor={ modalItemsProps.handleLabelColor(petKeys[modalItemsProps.secondIndex]) }
        handleInputChanges={ modalItemsProps.handleInputChanges }
      />
    </Box>
  )
}