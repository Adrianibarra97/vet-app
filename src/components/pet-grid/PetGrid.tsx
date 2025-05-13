import { useState } from 'react'
import { PetModal } from '../pet-modal/PetModal'
import { PetCard } from '../pet-card/PetCard'
import { ErrorMessage } from '../error-message/ErrorMessage'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import { Pet } from '../../domain/Pet'
import './PetGrid.css'
import PetServiceManager from '../../services/pet-service/PetServiceManager'

interface PropPets {
  pets: Array<Pet>,
  cleanFilter(): void
}

export const PetGrid = (propPets: PropPets) => {

  const [openModal, setOpenModal] = useState(false)
  const [pet, setPet] = useState(new Pet())

  const showNewPet = (): string => {    
    return AuthServiceManager.getIntance().isVet()
      ? 'card__content card__content--none'
      : 'card__content'
  }

  const handleAction = async (id: number) => {
    const newPet: Pet = id >= 0
      ? await PetServiceManager.getIntance().getPetById(id)
      : new Pet()
    setPet(newPet)
    setOpenModal(true)
  }

  return (
    <>
      <div id="content" className="content">
        <div className={ showNewPet() } onClick={ () => handleAction(-1) }>
          <p className='card__content--add'>+ Nueva Mascota</p>
        </div>
        {
          propPets.pets.length > 0
          ? propPets.pets.map((pet: Pet) => {
            return (<PetCard key={ pet.id.toString() }
              pet={ pet } handleDelete={ propPets.cleanFilter }
              startUpdate={ (id) => handleAction(id) }
            />)
          })
          : <ErrorMessage errorMessage="No hay información para mostrar!" />
        }
      </div>
      <PetModal
        open={ openModal } onClose={ () => setOpenModal(false) }
        pet={ pet } cleanFilter={ propPets.cleanFilter }
      />
    </>
  )
}