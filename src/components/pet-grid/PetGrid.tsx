import { PetCard } from '../pet-card/PetCard'

import { Pet } from '../../domain/Pet'
import { ErrorMessage } from '../error-message/ErrorMessage'

import './PetGrid.css'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'

interface PropPets {
  pets: Array<Pet>,
  onCancel(): void,
  onCreate(): void,
  onEdit(): void
}

export const PetGrid = (propPets: PropPets) => {

  const handleNewPet = () => {
    alert('nueva mascota')
  }

  const showNewPet = (): string => {
    return AuthServiceManager.getIntance().isVet()
      ? 'card__content card__content--none'
      : 'card__content'
  }

  return (
    <div id="content" className="content">
      <div className={ showNewPet() } onClick={ () => handleNewPet() }>
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
      
    </div>
  )
}