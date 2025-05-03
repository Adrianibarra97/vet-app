import { PetCard } from '../pet-card/PetCard'

import { Pet } from '../../domain/Pet'
import { ErrorMessage } from '../error-message/ErrorMessage'

import './PetGrid.css'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import { useState } from 'react'
import { PetModal } from '../pet-modal/PetModal'

interface PropPets {
  pets: Array<Pet>,
  onCancel(id: number): void,
  onCreate(pet: Pet): void,
  onUpdate(pet: Pet): void
}

export const PetGrid = (propPets: PropPets) => {

  const [openModal, setOpenModal] = useState(false)

  const showNewPet = (): string => {
    return AuthServiceManager.getIntance().isVet()
      ? 'card__content card__content--none'
      : 'card__content'
  }

  return (
    <div id="content" className="content">
      <div className={ showNewPet() } onClick={ () => setOpenModal(true) }>
        <p className='card__content--add'>+ Nueva Mascota</p>
      </div>
      {
        propPets.pets.length > 0 ?
          propPets.pets.map((pet: Pet) => {
            return (<PetCard key={ pet.id.toString() } pet={ pet } />)
          })
        :
        <ErrorMessage errorMessage="No hay información para mostrar!" />
      }
      <PetModal 
        open={ openModal }
        id={ -1 }
        onClose={ () => setOpenModal(false) }
        onCreate={ propPets.onCreate }
        onUpdate={ propPets.onUpdate }
      />
    </div>
  )
}