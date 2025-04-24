import { ChangeEvent, useState } from 'react'

import { FilterTurn, } from '../../domain/Filterturn'
import { Filter } from '../../domain/Filter'

import './TurnFilter.css'
import { FilterItem } from '../filter-item/FilterItem'

interface PropDateFilterValues {
    filter: Filter,
    filterFunction: (medicalShiftFilter: FilterTurn) => void
  }
  
  export const TurnFilter = ({ filter, filterFunction }: PropDateFilterValues) => {
    const [medicalShiftFilter, setMedicalShiftFilter] = useState(new FilterTurn('', false, false))
  
    const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
      const newFilter = new FilterTurn(e.currentTarget.value, medicalShiftFilter.isToday, medicalShiftFilter.isThisWeek)
      setMedicalShiftFilter(newFilter)
      filterFunction(newFilter)
    }
  
    const onChangeToday = (e: ChangeEvent<HTMLInputElement>) => {
      const newFilter = new FilterTurn(medicalShiftFilter.date, e.currentTarget.checked, medicalShiftFilter.isThisWeek)
      setMedicalShiftFilter(newFilter)
      filterFunction(newFilter)
    }
  
    const onChangeThisWeek = (e: ChangeEvent<HTMLInputElement>) => {
      const newFilter = new FilterTurn(medicalShiftFilter.date, medicalShiftFilter.isToday, e.currentTarget.checked)
      setMedicalShiftFilter(newFilter)
      filterFunction(newFilter)
    }
  
    return (
      <div className="content__filter">
        <h2>Filtros</h2>
        <div className="filter">
          <FilterItem
            label= { filter.firstLabel }
            inputType={ filter.firstType }
            onChangesFilter={ onChangeDate } 
          />
          <FilterItem
            label= { filter.secondtLabel }
            inputType={ filter.secondType }
            onChangesFilter={ onChangeToday }
          />
          <FilterItem
            label= { filter.thirdLabel }
            inputType={ filter.thirdType }
            onChangesFilter={ onChangeThisWeek }
          />
        </div>
      </div>
    )
  }