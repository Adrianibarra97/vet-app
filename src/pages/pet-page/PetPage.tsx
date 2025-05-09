import { useEffect, useState } from 'react'

import { PetGrid } from '../../components/pet-grid/PetGrid'
import { PetFilter } from '../../components/pet-filter/PetFilter'

import { Pet } from '../../domain/Pet'
import { Filter } from '../../domain/Filter'

import './PetPage.css'
import PetServiceManager from '../../services/pet-service/PetServiceManager'
import { PetFilterValues } from '../../domain/PetFilterValues'
import { PetModal } from '../../components/pet-modal/PetModal'
import { ConfirmModal } from '../../components/confirm-modal/ConfirmModal'

interface TitleProp {
  name: string
}

const filterValues = new Filter(
  'Nombre',
  'text',
  'Con turno',
  'checkbox',
  'Vac. Pen',
  'checkbox',
)

export const PetPage = (titleProp: TitleProp) => {

  const [pets, setPets] = useState(new Array<Pet>())
  const [filter, setFilter] = useState(new PetFilterValues('', false, false))
  const [openModal, setOpenModal] = useState(false)
  const [petId, setPetId] = useState(-1)
  const [openConfirm, setOpenConfirm] = useState(true)

  const cleanFilter = () => setFilter(new PetFilterValues('', false, false))

  const getAllPetsByFilter = async (petFilter: PetFilterValues) => {
    const pets: Array<Pet> = await PetServiceManager.getIntance().getAllByFilter(petFilter)
    setPets(pets)
  }

  const handleChangesFilter = (petFilter: PetFilterValues) => {
    setFilter(petFilter)
  }

  const handleAction = (id: number) => {
    setPetId(id)
    setOpenModal(true)
  }

  const handleCreate = async (pet: Pet) => {
    PetServiceManager.getIntance().create(pet)
    cleanFilter()
  }
  
  const handleUpdate = async (pet: Pet) => {
    PetServiceManager.getIntance().update(pet)
    cleanFilter()
  }

  const confirmDelete = (id: number) => {
    setPetId(id)
    setOpenConfirm(true)
  }

  const handleDelete = async () => {
    PetServiceManager.getIntance().delete(petId)
    setPetId(-1)
    cleanFilter()
    setOpenConfirm(false)
  }

  useEffect(() => {
    getAllPetsByFilter(filter)
  }, [filter])

  return (
    <main className="main">
      <h1 className="main__title">{ titleProp.name }</h1>
      <div className="main__content">
        <div className="main__content--filter">
          <PetFilter filter={ filterValues } filterFunction={ handleChangesFilter }/>
        </div>
        <div className="main__content--data">
          <PetGrid 
            pets={ pets }
            handlePetId={ handleAction }
            handleDelete={ confirmDelete }
          />
        </div>
      </div>
      <PetModal 
        open={ openModal } onCreate={ handleCreate }
        id={ petId } onUpdate={ handleUpdate }
        onClose={ () => setOpenModal(false) }
      />
      <ConfirmModal 
        open={ openConfirm } text={ 'Seguro que desea eliminar?' }
        onClose={ () => setOpenConfirm(false) }
        handleDelete={ handleDelete } 
      />
    </main>
  )
}