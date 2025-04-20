


import { useEffect, useState } from "react"
import { Filter } from "../../domain/Filter"
import { MedicalShift } from "../../domain/MedicalShift"
import { MedicalShiftGrid } from "../../components/medical-shift-grid/MedicalShiftGrid"
import { FilterTurn } from "../../domain/Filterturn"
import UserServiceManager from "../../services/user-service/UserServiceManager"
import { TurnFilter } from "../../components/turn-filter/TurnFilter"
const filterValues = new Filter(
  'Por fecha',
  'text',
  'Hoy',
  'checkbox',
  'Este semana',
  'checkbox',
)

export const MedicalShiftPage = () => {


   const[medicalShifts, setMedicalShifts] = useState(new Array<MedicalShift>())
   const [filter, setFilter] = useState<FilterTurn>(new FilterTurn('', false, false))

   const handleChangesFilter = (filter: FilterTurn) => {
    setFilter(filter)
  }
  const getAllMedicalShiftsByFilter = async (filter: FilterTurn) => {
    const shifts = await UserServiceManager.getInstance().getAllByFilter(filter)
    setMedicalShifts(shifts)
  }
  useEffect(() => {
    getAllMedicalShiftsByFilter(filter)
  }, [filter])
   return (
    <main className="main">
      <h2 className="main__title">Turnos </h2>
      <div className="main__content">
        <div className="main__content--filter">
        <TurnFilter filter={filterValues} filterFunction={handleChangesFilter} />
        </div>
        <div className="main__content--data">
                  <MedicalShiftGrid  medicalShifts={ medicalShifts } />
                </div>
        </div>

       
   

    </main>
  )
}