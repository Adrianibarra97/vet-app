import { Filter } from '../../domain/Filter'

import './PetFilter.css'

interface PropFilterValues {
  filter: Filter
}

export const PetFilter = (filterValues: PropFilterValues) => {

  return (
    <div className="content__filter">
      <h2>Filtros</h2>
      <div className="filter">
        <div className="filter__item">
          <label className="filter__item--size filter__item--font">{ filterValues.filter.firstLabel }</label>
          <input className="filter__item--color" type={ filterValues.filter.firstType } />
        </div>
        <div className="filter__item">
          <label className="filter__item--size filter__item--font">{ filterValues.filter.secondtLabel }</label>
          <input className="filter__item--color" type={ filterValues.filter.secondType } />
        </div>
        <div className="filter__item">
          <label className="filter__item--size filter__item--font">{ filterValues.filter.thirdLabel }</label>
          <input className="filter__item--color" type={ filterValues.filter.thirdType } />
        </div>
      </div>
    </div>
  )
}