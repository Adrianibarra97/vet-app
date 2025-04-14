import { PetCard } from '../pet-card/PetCard'

import { Pet } from '../../domain/Pet'
import { ErrorMessage } from '../error-message/ErrorMessage'

import './PetGrid.css'

interface PropPets {
  pets: Array<Pet>
}

export const PetGrid = (propPets: PropPets) => {

  return (
    <div id="content" className="content">
      {
        propPets.pets.length > 0 ?
          propPets.pets.map((pet: Pet) => {
            return (<PetCard pet = { pet } />)
          })
        :
        <ErrorMessage errorMessage="No hay información para mostrar!" />
      }
    </div>
  )
}