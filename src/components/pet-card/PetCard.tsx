import { useState } from 'react'
import { ConfirmModal } from '../confirm-modal/ConfirmModal'
import PetServiceManager from '../../services/pet-service/PetServiceManager'
import { Pet } from '../../domain/Pet'
import './PetCard.css'
import { useNavigate } from 'react-router-dom'

interface PropPetCard {
  pet: Pet,
  startUpdate(id: number): void,
  handleDelete(): void
}

export const PetCard = (propPet: PropPetCard) => {

  const [openConfirm, setOpenConfirm] = useState(false)
  const navigate = useNavigate()

  const handleDelete = async () => {
    PetServiceManager.getIntance().delete(propPet.pet.id)
    propPet.handleDelete()
    setOpenConfirm(false)
  }

  const goToPetDetail = () => {
    navigate(`/pet-detail/${propPet.pet.id}`)
  }

  return (
  <>
    <div className="card__content">
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
            className="fa-solid fa-paw button__icon"
            onClick={goToPetDetail}
          ></button>
          <button 
            className="fa-solid fa-trash button__icon"
            onClick={ () => setOpenConfirm(true) }
          ></button>
        </div>
      </div>     
    </div>
    <ConfirmModal 
      open={ openConfirm } text={ 'Seguro que desea eliminar?' }
      onClose={ () => setOpenConfirm(false) }
      handleDelete={ handleDelete } 
    />
  </>
  )
}