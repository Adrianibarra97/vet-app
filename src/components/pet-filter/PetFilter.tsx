import { Filter } from '../../domain/Filter'
import { FilterItem } from '../filter-item/FilterItem'

import './PetFilter.css'

interface PropFilterValues {
  filter: Filter
}

export const PetFilter = (filterValues: PropFilterValues) => {

  return (
    <div className="content__filter">
      <h2>Filtros</h2>
      <div className="filter">
        <FilterItem label= { filterValues.filter.firstLabel } inputType={ filterValues.filter.firstType }/>
        <FilterItem label= { filterValues.filter.secondtLabel } inputType={ filterValues.filter.secondType }/>
        <FilterItem label= { filterValues.filter.thirdLabel } inputType={ filterValues.filter.thirdType }/>
      </div>
    </div>
  )
}