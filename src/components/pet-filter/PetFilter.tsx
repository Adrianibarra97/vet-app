import { ChangeEvent, useState } from 'react'

import { FilterItem } from '../filter-item/FilterItem'

import { PetFilterValues } from '../../domain/PetFilterValues'
import { Filter } from '../../domain/Filter'

import './PetFilter.css'

interface PropFilterValues {
  filter: Filter,
  filterFunction: (petFilter: PetFilterValues) => void;
}

export const PetFilter = (filterValues: PropFilterValues)  => {

  const [petFilter, setPetFilter] = useState(new PetFilterValues('', false, false))

  const onChangeFilterName = (e: ChangeEvent<HTMLInputElement>) => {
    const newPetFilter: PetFilterValues = new PetFilterValues(
      e.currentTarget.value,
      petFilter.withMedicalShift,
      petFilter.pendingVaccine
    )
    setPetFilter(newPetFilter)
    filterValues.filterFunction(newPetFilter)
  }

  const onChangeFilterMedicalShift = (e: ChangeEvent<HTMLInputElement>) => {
    const newPetFilter: PetFilterValues = new PetFilterValues(
      petFilter.name,
      e.currentTarget.checked,
      petFilter.pendingVaccine
    )
    setPetFilter(newPetFilter)
    filterValues.filterFunction(newPetFilter)
  }

  const onChangeFilterpendingVaccine = (e: ChangeEvent<HTMLInputElement>) => {
    const newPetFilter: PetFilterValues = new PetFilterValues(
      petFilter.name,
      petFilter.withMedicalShift,
      e.currentTarget.checked
    )
    setPetFilter(newPetFilter)
    filterValues.filterFunction(newPetFilter)
  }

  return (
    <div className="content__filter">
      <h2>Filtros</h2>
      <div className="filter">
        <FilterItem
          label= { filterValues.filter.firstLabel }
          inputType={ filterValues.filter.firstType }
          onChangesFilter={ onChangeFilterName } 
        />
        <FilterItem
          label= { filterValues.filter.secondtLabel }
          inputType={ filterValues.filter.secondType }
          onChangesFilter={ onChangeFilterMedicalShift }
        />
        <FilterItem
          label= { filterValues.filter.thirdLabel }
          inputType={ filterValues.filter.thirdType }
          onChangesFilter={ onChangeFilterpendingVaccine }
        />
      </div>
    </div>
  )
}