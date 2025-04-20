<<<<<<< HEAD
import { MedicalShiftGrid } from '../../components/medical-shift-grid/MedicalShiftGrid'
import { PetFilter } from '../../components/pet-filter/PetFilter'

import { Filter } from '../../domain/Filter'

const filterValues = new Filter(
  'Por Fecha',
  'date',
  'Hoy',
  'checkbox',
  'Esta Sem',
=======
import { useState } from "react"
import MedicalShiftCard from "../../components/medical-shift-card/MedicalShiftCard"
import { Filter } from "../../domain/Filter"
import { MedicalShift } from "../../domain/MedicalShift"
import { MedicalShiftGrid } from "../../components/medical-shift-grid/MedicalShiftGrid"


const filterValues = new Filter(
  'Nombre',
  'text',
  'Con turno',
  'checkbox',
  'Vac. Pen',
>>>>>>> d04bd06 (we work on the shift view)
  'checkbox',
)

export const MedicalShiftPage = () => {

<<<<<<< HEAD
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
=======
   const[medicalShifts, setMedicalShifts] = useState(new Array<MedicalShift>())
  return (
    <main className="main">
      <h2 className="main__title">Turnos </h2>
      <div className="main__content">
        <div className="main__content--filter">
          <TurnFilter filter={ filterValues } /> 
        </div>
        <div className="main__content--data">
                  <MedicalShiftGrid  medicalShifts={ medicalShifts } />
                </div>
        </div>

       
    <MedicalShiftCard />
   
>>>>>>> d04bd06 (we work on the shift view)
    </main>
  )
}