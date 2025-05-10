import { useNavigate } from 'react-router-dom'
import { Pet } from '../../domain/Pet'

import './PetCard.css'

interface PropPetCard {
  pet: Pet,
  startUpdate(id: number): void,
  handleDelete(id:number): void
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
        <div className="card__item card__item--button">
          <button
            className="fa-solid fa-pen button__icon"
            onClick={ () => propPet.startUpdate(propPet.pet.id) }
          ></button>
          <button 
            className="fa-solid fa-trash button__icon"
            onClick={ () => propPet.handleDelete(propPet.pet.id) }
          ></button>
        </div>
      </div>     
    </div>
  )
}