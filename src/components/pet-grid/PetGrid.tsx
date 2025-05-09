import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import { PetCard } from '../pet-card/PetCard'
import { ErrorMessage } from '../error-message/ErrorMessage'
import { Pet } from '../../domain/Pet'
import './PetGrid.css'

interface PropPets {
  pets: Array<Pet>,
  handlePetId(id: number): void,
  handleDelete(id:number): void
}

export const PetGrid = (propPets: PropPets) => {

  const showNewPet = (): string => {    
    return AuthServiceManager.getIntance().isVet()
      ? 'card__content card__content--none'
      : 'card__content'
  }

  return (
    <div id="content" className="content">
      <div className={ showNewPet() } onClick={ () => propPets.handlePetId(-1) }>
        <p className='card__content--add'>+ Nueva Mascota</p>
      </div>
      {
        propPets.pets.length > 0 ?
          propPets.pets.map((pet: Pet) => {
            return (
              <PetCard 
                key={ pet.id.toString() } startUpdate={ propPets.handlePetId }
                pet={ pet } handleDelete={ propPets.handleDelete }
              />
            )
          })
        :
        <ErrorMessage errorMessage="No hay información para mostrar!" />
      }
    </div>
  )
}