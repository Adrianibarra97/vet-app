import { Modal, Box, Button, Typography, SelectChangeEvent, InputBaseComponentProps } from '@mui/material'
import { Pet } from '../../domain/Pet'
import { 
  BkgCancelButton, BkgConfirmButton, button__Container, formContainer, modal, modalTitle
} from './PetModalStyle'
import { ChangeEvent, useState } from 'react'
import { PetModalItems } from '../pet-modal-items/PetModalItems'
import { PetModalItemsSelect } from '../pet-modal-items-select/PetModalItemsSelect'

interface PetModalProps {
  open: boolean,
  id: number,
  onClose: () => void,
  onCreate: (pet: Pet) => void,
  onUpdate: (pet: Pet) => void
}

export const PetModal = ({ open, id, onClose, onCreate, onUpdate }: PetModalProps) => {

  const inputTypeText: string = 'text'
  const inputTypeNumber: string = 'number'
  const baseInputProp: InputBaseComponentProps = JSON.parse('{}')
  const ageInputProp: InputBaseComponentProps = {
    min: 0,
    max: 500,
    step: 1 // Solo valores enteros positivos
  }
  const weightInputProp: InputBaseComponentProps = {
    min: 0,
    max: 500,
    step: 'any' // Permite tanto enteros como decimales
  }
  const sexOptions: string[] = ['Macho', 'Hembra']
  const sterilizedOptions: string[] = ['SI', 'NO']
  const [pet, setPet] = useState(new Pet())


  const handleCancel = () => {
    setPet(new Pet())
    onClose()
  }

  const handleConfirm = () => {
    if(id >= 0) onUpdate(pet)
    if(id < 0) onCreate(pet)
    onClose()
  }

  const handleInputChanges = (key: keyof Pet, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    (pet as unknown as Record<keyof Pet, string | undefined>)[key] = e.target.value
    const newPet = Object.assign(new Pet(), pet)
    setPet(newPet)
  }

  const handleSelectChanges = (key: keyof Pet, e: SelectChangeEvent) => {
    if(sterilizedOptions.some((value: string) => value == e.target.value)) {
      (pet as unknown as Record<keyof Pet, boolean | undefined>)[key] = e.target.value == sterilizedOptions[0]

      console.log(e.target.value == sterilizedOptions[0])
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
  
  // const [petPacients, setPetPacients] = useState<Pet[]>([])
  // const [medicalShift, setMedicalShift] = useState<MedicalShift>(
  //   new MedicalShift(),
  // )
  // const [fromTouched, setFromTouched] = useState(false)
  // const [error, setError] = useState<string | null>(null)
  // const [date, setDate] = useState<Dayjs | null>(null)

  // const handleMedicalShiftCreationOrEdition = (
  //   name: keyof MedicalShift,
  //   value: string,
  // ): void => {
  //   ;(
  //     medicalShift as unknown as Record<keyof MedicalShift, string | undefined>
  //   )[name] = value
  //   generateNewMedicalShift(medicalShift)
  // }

  // const generateNewMedicalShift = (medicalShift: MedicalShift) => {
  //   const newMedicalShift = Object.assign(new MedicalShift(), medicalShift)
  //   setMedicalShift(newMedicalShift)
  // }

  // const getPetPacients = async () => {
  //   const newPetPacients = PetServiceManager.getIntance().getAll()
  //   setPetPacients(await newPetPacients)
  // }

  // const getMedicalShift = async () => {
  //   const newMedicalShift =
  //     MedicalShiftServiceManager.getInstance().getMedicalShiftById(
  //       +idMedicalShift!,
  //     )
  //   setMedicalShift(await newMedicalShift)
  // }

  // useEffect(() => {
  //   setMedicalShift(new MedicalShift())
  //   setFromTouched(false)
  //   setError(null)
  //   setDate(null)
  //   if (idMedicalShift > -1) {
  //     getMedicalShift()
  //   } else {
  //     setMedicalShift(new MedicalShift())
  //   }
  //   getPetPacients()
  //   setFromTouched(false)
  // }, [idMedicalShift, setFromTouched])

  // useEffect(() => {
  //   if (medicalShift?.date) {
  //     setDate(dayjs(medicalShift.date))
  //   } else {
  //     setDate(null)
  //   }
  // }, [medicalShift])

  // const handleOnConfirm = () => {
  //   setFromTouched(true)
  //   if (hasMissingRequiredFields()) {
  //     SnackbarUtilities.error('campos incompletos')
  //     return
  //   }
  //   onConfirm(medicalShift, medicalShift.id)
  //   setMedicalShift(new MedicalShift())
  //   setFromTouched(false)
  //   onClose()

  // }
  // const handleCancel = () => {
  //   setMedicalShift(new MedicalShift())
  //   setFromTouched(false)
  //   setError(null)
  //   setDate(null)
  //   onClose()
  // }

  // const hasMissingRequiredFields = (): boolean => {
  //   const requiredFields: (keyof MedicalShift)[] = [
  //     'vetName',
  //     'petName',
  //     'date',
  //   ]
  //   return requiredFields.some((field) => !medicalShift[field])
  // }

  return (
    <Modal open={ open } onClose={ onClose } sx={ modal }>
      <Box sx={ formContainer }>
        <Typography variant="h6" sx={ modalTitle }>{id > -1 ? 'Editar Consulta' : 'Crear Consulta'}</Typography>
        <PetModalItems
          firstType={ inputTypeText } secondType={ inputTypeText }
          firstInputProp={ baseInputProp } secondInputProp={ baseInputProp }
          firstIsActive={ true } secondIsActive={ false } handleLabelColor={ handleLabelColor }
          firstIndex={ 1 } secondIndex={ 0 } handleInputChanges={ handleInputChanges }
        />
        <PetModalItems
          firstType={ inputTypeText } secondType={ inputTypeText }
          firstInputProp={ baseInputProp } secondInputProp={ baseInputProp }
          firstIsActive={ true } secondIsActive={ true } handleLabelColor={ handleLabelColor }
          firstIndex={ 9 } secondIndex={ 2 } handleInputChanges={ handleInputChanges }
        />
        <PetModalItems
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
        <PetModalItems
          firstType={ inputTypeText } secondType={ inputTypeText }
          firstInputProp={ baseInputProp } secondInputProp={ baseInputProp }
          firstIsActive={ true } secondIsActive={ true } handleLabelColor={ handleLabelColor }
          firstIndex={ 6 } secondIndex={ 8 } handleInputChanges={ handleInputChanges }
        />
        <Box sx={ button__Container }>
          <Button variant="contained" sx={ BkgCancelButton } onClick={ handleCancel }>Cancelar</Button>
          <Button variant="contained" sx={ BkgConfirmButton } onClick={ handleConfirm }>Confirmar</Button>
        </Box>
      </Box>
    </Modal>
  )
}
