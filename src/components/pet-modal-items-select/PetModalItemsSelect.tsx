import { Box, SelectChangeEvent } from '@mui/material'
import { Pet } from '../../domain/Pet'
import { modalItems } from './PetModalItemsSelectStyle'
import { FormControlModalSelect } from '../form-control-modal-select/FormControlModalSelect'

interface ModalItemsProps {
  firstIsActive: boolean,
  firstIndex: number,
  firstdefaultValue: string,
  firstArrayOptions: string[],
  secondIsActive: boolean,
  secondIndex: number,
  seconddefaultValue: string,
  secondArrayOptions: string[],
  handleLabelColor(key: keyof Pet): 'primary' | 'error'
  handleSelectChanges(key: keyof Pet, e: SelectChangeEvent): void
}

export const PetModalItemsSelect = (modalItemsProps: ModalItemsProps) => {

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
      <FormControlModalSelect
        defaultValue={ modalItemsProps.firstdefaultValue }
        options={ modalItemsProps.firstArrayOptions }
        isActive={ modalItemsProps.firstIsActive }
        petKey={ petKeys[modalItemsProps.firstIndex] }
        label={ fieldKyes[modalItemsProps.firstIndex] }
        labelColor={ modalItemsProps.handleLabelColor(petKeys[modalItemsProps.firstIndex]) }
        handleInputChanges={ modalItemsProps.handleSelectChanges }
      />
      <FormControlModalSelect
        defaultValue={ modalItemsProps.seconddefaultValue }
        options={ modalItemsProps.secondArrayOptions }
        isActive={ modalItemsProps.secondIsActive }
        petKey={ petKeys[modalItemsProps.secondIndex] }
        label={ fieldKyes[modalItemsProps.secondIndex] }
        labelColor={ modalItemsProps.handleLabelColor(petKeys[modalItemsProps.secondIndex]) }
        handleInputChanges={ modalItemsProps.handleSelectChanges }
      />
    </Box>
  )
}