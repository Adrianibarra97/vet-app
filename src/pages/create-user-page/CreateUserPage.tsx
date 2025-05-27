import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { FormControlModalSelect } from '../../components/form-control-modal-select/FormControlModalSelect'
import { CreatePetOwnerForm } from '../../components/create-petowner-form/CreatePetOwnerForm'
import { CreateVetForm } from '../../components/create-vet-form/CreateVetForm'
import {
  formContainer, formItem, formItemNone, formItemTitle, sectionMainTitle, sectionType
} from './CreateUserPageStyle'
import './CreateUserPage.css'


export const CreateUserPage = () => {

  const typeUserMap: Map<string, string> = new Map<string, string>()
  typeUserMap.set('Veterinario', 'VET')
  typeUserMap.set('Dueño de Mascota', 'PETOWNER')
  const [typeOfUser, setTypeOfUser] = useState<string>('VET')

  const handleSelectChanges = (value: string) => {
    setTypeOfUser(value)
  }

  const defaultTypeValue = (): string => {
    const value: string | undefined = typeUserMap.keys().next().value
    return value != undefined ? value : ''
  }

  const optionsTypeValue = (): string[] => Array.from(typeUserMap.keys())

  return (
    <main className="auth__main--create">
      <Box sx={ formContainer }>
        <Box sx={ formItemTitle }>
          <Typography variant="h6" sx={ sectionMainTitle }>Tipo de usuario</Typography>
          <Box sx={ sectionType }>
            <FormControlModalSelect isActive={ true } label={ 'tipo de usuario' }
              options={ optionsTypeValue() } defaultValue={ defaultTypeValue() } labelColor={ 'success' }
              handleInputChanges={ (value) => handleSelectChanges(value) }            
            />
          </Box>
        </Box>
        <Box sx={ typeOfUser == 'PETOWNER' ? formItem : formItemNone }>
          <CreatePetOwnerForm />
        </Box>
        <Box sx={ typeOfUser == 'VET' ? formItem : formItemNone }>
          <CreateVetForm />
        </Box>
      </Box>
    </main>
  )
}