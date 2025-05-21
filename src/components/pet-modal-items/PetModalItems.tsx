import { Box } from '@mui/material'
import { ChangeEvent } from 'react'
import { Pet } from '../../domain/Pet'
import { FormControlModal } from '../form-control-modal/FormControlModal'
import { modalItems } from './PetModalItemsStyle'

interface ModalItemsProps {
  firstIsActive: boolean,
  firstIndex: number,
  firstDefaultValue: string | number,
  firstType: 'text' | 'number',
  secondIsActive: boolean,
  secondIndex: number,
  secondDefaultValue: string | number,
  secondType: 'text' | 'number',
  errorActive: boolean,
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
        type={ modalItemsProps.firstType }
        errorActive={ modalItemsProps.errorActive }
        defaultValue={ modalItemsProps.firstDefaultValue }
        isActive={ modalItemsProps.firstIsActive }
        petKey={ petKeys[modalItemsProps.firstIndex] }
        label={ fieldKyes[modalItemsProps.firstIndex] }
        labelColor={ modalItemsProps.handleLabelColor(petKeys[modalItemsProps.firstIndex]) }
        handleInputChanges={ modalItemsProps.handleInputChanges }
      />
      <FormControlModal
        type={ modalItemsProps.secondType }
        errorActive={ modalItemsProps.errorActive }
        defaultValue={ modalItemsProps.secondDefaultValue }
        isActive={ modalItemsProps.secondIsActive }
        petKey={ petKeys[modalItemsProps.secondIndex] }
        label={ fieldKyes[modalItemsProps.secondIndex] }
        labelColor={ modalItemsProps.handleLabelColor(petKeys[modalItemsProps.secondIndex]) }
        handleInputChanges={ modalItemsProps.handleInputChanges }
      />
    </Box>
  )
}