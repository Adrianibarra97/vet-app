import { ChangeEvent, useState } from 'react'

import { FilterTurn, } from '../../domain/Filterturn'
import { Filter } from '../../domain/Filter'

import './TurnFilter.css'

interface PropDateFilterValues {
    filter: Filter,
    filterFunction: (values: FilterTurn) => void
  }
  
  export const TurnFilter = ({ filter, filterFunction }: PropDateFilterValues) => {
    const [dateFilter, setDateFilter] = useState(new FilterTurn('', false, false))
  
    const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
      const newFilter = new FilterTurn(e.currentTarget.value, false, false)
      setDateFilter(newFilter)
      filterFunction(newFilter)
    }
  
    const onChangeToday = (e: ChangeEvent<HTMLInputElement>) => {
      const newFilter = new FilterTurn('', e.currentTarget.checked, false)
      setDateFilter(newFilter)
      filterFunction(newFilter)
    }
  
    const onChangeThisWeek = (e: ChangeEvent<HTMLInputElement>) => {
      const newFilter = new FilterTurn('', false, e.currentTarget.checked)
      setDateFilter(newFilter)
      filterFunction(newFilter)
    }
  
    return (
      <div className="content__filter">
        <h2>Filtros</h2>
        <div className="filter">
          <div className="filter-item">
            <label>{filter.firstLabel}</label>
            <input type={filter.firstType} onChange={onChangeDate} />
          </div>
          <div className="filter-item">
            <label>{filter.secondtLabel}</label>
            <input type={filter.secondType} onChange={onChangeToday} />
          </div>
          <div className="filter-item">
            <label>{filter.thirdLabel}</label>
            <input type={filter.thirdType} onChange={onChangeThisWeek} />
          </div>
        </div>
      </div>
    )
  }