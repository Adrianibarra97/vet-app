import { Vaccine } from "../../domain/Vaccine";
import "./VaccineGrid.css"

interface PropVaccineGrid{
    vaccines:Vaccine[]
}

export function VaccineGrid({vaccines}:PropVaccineGrid){
    return(
        <div className="content__data--item">
            <div className="vaccine__item--title">
                <h3 className="vaccine--title">Vacuna</h3>
                <i className="fa-solid fa-paw vaccine--logo"></i>
            </div>
            <div className="vaccine__container">
                <p className="content--item--add">+ Añadir Vacuna</p>
            </div>
        </div>
    )
}