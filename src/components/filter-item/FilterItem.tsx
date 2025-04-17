import './FilterItem.css'

interface PropFilterValue {
  label: string,
  inputType: string
}

export const FilterItem = (filter: PropFilterValue) => {

  return (
    <div className="filter__item">
      <label className="filter__item--size filter__item--font">{ filter.label }</label>
      <input className="filter__item--color" type={ filter.inputType } />
    </div>
  )
}