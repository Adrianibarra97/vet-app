import { useState } from 'react'
import { PetModal } from '../pet-modal/PetModal'
import { PetCard } from '../pet-card/PetCard'
import { ErrorMessage } from '../error-message/ErrorMessage'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import { Pet } from '../../domain/Pet'
import './PetGrid.css'

interface PropPets {
  pets: Array<Pet>,
  clearFilter(): void
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
    // const newPet: Pet = await PetServiceManager.getIntance().getPetById(id)
    await setPet(Pet.fromJSON(
      {
			"id": id,
			"photo": '/src/assets/' + "nala.jfif",
			"name": "Nala",
			"age": 9,
			"breed": "Mestizo",
			"sex": "Hembra",
			"weight": 17,
			"sterilized": true,
			"specie": "Perro",
			"birth": "2025-04-25"
		}
    ))
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
              pet={ pet } handleDelete={ propPets.clearFilter }
              startUpdate={ (id) => handleAction(id) }
            />)
          })
          : <ErrorMessage errorMessage="No hay información para mostrar!" />
        }
      </div>
      <PetModal
        open={ openModal } onClose={ () => setOpenModal(false) }
        pet={ pet } cleanFilter={ () => propPets.clearFilter }
      />
    </>
  )
}