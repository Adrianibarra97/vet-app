import { MedicalShiftGrid } from '../../components/medical-shift-grid/MedicalShiftGrid'
import { PetFilter } from '../../components/pet-filter/PetFilter'

import { Filter } from '../../domain/Filter'

const filterValues = new Filter(
  'Por Fecha',
  'date',
  'Hoy',
  'checkbox',
  'Esta Sem',
  'checkbox',
)

export const MedicalShiftPage = () => {

  return (
    <main className="main">
      <h1 className="main__title">TURNOS</h1>
      <div className="main__content">
        <div className="main__content--filter">
          <PetFilter filter={ filterValues }/>
        </div>
        <div className="main__content--data">
          <MedicalShiftGrid medicalShifts={ [] } />
        </div>
      </div>
    </main>
  )
}