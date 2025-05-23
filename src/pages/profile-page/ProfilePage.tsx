import { useOutletContext } from 'react-router-dom'
import { ProfileForm } from '../../components/user-form-component/User-form-component'
import { Vet } from '../../domain/Vet'
import { PetOwner } from '../../domain/PetOwner'
import PetOwnerServiceManager from '../../services/pet-owner-service/PetOwnerServiceManager'
import VetServiceManager from '../../services/vet-service/VetServiceManager'
import { Box } from '@mui/material'

export const ProfilePage = () => {
  const user = useOutletContext<Vet | PetOwner>()

  const handleSave = async (updated: Vet | PetOwner) => {
    if (updated instanceof Vet) {
      const vetService = VetServiceManager.getInstance()
      await vetService.update(updated)
    } else {
      const petOwnerService = PetOwnerServiceManager.getInstance()
      await petOwnerService.update(updated)
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        px: 3,
        py: 2,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <ProfileForm
        user={user}
        onSave={handleSave}
        showProfessionalInfo={user instanceof Vet}
      />
    </Box>
  )
}
