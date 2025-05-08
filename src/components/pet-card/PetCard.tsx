import { useNavigate } from 'react-router-dom'
import { Pet } from '../../domain/Pet'

import './PetCard.css'

interface PropPetCard {
  pet: Pet
}

export const PetCard = (propPet: PropPetCard) => {

  const navigate = useNavigate()

  const goToPetDetail = () => {
    navigate(`/pet-detail/${propPet.pet.id}`)
  }

  return (
    <div className="card__content" onClick={goToPetDetail}>
      <figure className="card__image">
        <img className="card__image--size" src= { propPet.pet.photo } alt={ "Foto de " + propPet.pet.name } />
      </figure>
      <div className="card__content--data">
        <div className="card__item">
          <label className="card__item--label">Nombre</label>
          <p className="card__item--p">{ propPet.pet.name }</p>
        </div>
        <div className="card__item">
          <label className="card__item--label">Edad</label>
          <p className="card__item--p">{ propPet.pet.age } años</p>
        </div>
        <div className="card__item">
          <label className="card__item--label">Raza</label>
          <p className="card__item--p">{ propPet.pet.breed }</p>
        </div>
        <div className="card__item">
          <label className="card__item--label">Sexo</label>
          <p className="card__item--p">{ propPet.pet.sex }</p>
        </div>
      </div>     
    </div>
  )
}