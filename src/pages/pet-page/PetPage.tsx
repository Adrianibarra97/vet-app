import { useEffect, useState } from 'react'
import { PetGrid } from '../../components/pet-grid/PetGrid'
import { PetFilter } from '../../components/pet-filter/PetFilter'
import PetServiceManager from '../../services/pet-service/PetServiceManager'
import { PetFilterValues } from '../../domain/PetFilterValues'
import { Filter } from '../../domain/Filter'
import { Pet } from '../../domain/Pet'
import './PetPage.css'

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

  const getAllPetsByFilter = async (petFilter: PetFilterValues) => {
    const pets: Array<Pet> = await PetServiceManager.getIntance().getAllByFilter(petFilter)
    setPets(pets)
  }

  useEffect(() => {
    getAllPetsByFilter(filter)
  }, [filter])

  return (
    <main className="main">
      <h1 className="main__title">{ titleProp.name }</h1>
      <div className="main__content">
        <div className="main__content--filter">
          <PetFilter filter={ filterValues } filterFunction={ setFilter }/>
        </div>
        <div className="main__content--data">
          <PetGrid pets={ pets } cleanFilter={ () => setFilter(new PetFilterValues('', false, false)) }/>
        </div>
      </div>
    </main>
  )
}