import { Vaccine } from "../../domain/Vaccine";
import AuthServiceManager from "../../services/auth-service/AuthServiceManager";
import { ErrorMessage } from "../error-message/ErrorMessage";
import { VaccineCard } from "../vaccine-card/VaccineCard";
import "./VaccineGrid.css"

interface PropVaccineGrid{
    vaccines:Vaccine[]
}

export function VaccineGrid({vaccines}:PropVaccineGrid){
    const showNewVaccine = (): string => {    
        return AuthServiceManager.getIntance().isVet()
            ? 'content__data--item'
            : 'card__content--none'
    }

    return(
        <div className="content--data scroll__detail--style">
            <div className={showNewVaccine()}>
                <div className="vaccine__item--title">
                    <h3 className="vaccine--title">Vacuna</h3>
                    <i className="fa-solid fa-paw vaccine--logo"></i>
                </div>
                <div className="vaccine__container">
                    <p className="content--item--add">+ Añadir Vacuna</p>
                </div>
            </div>
            {
                vaccines.length > 0 ?
                    vaccines.map((vaccine: Vaccine) => {
                        return (<VaccineCard vaccine={vaccine} key={vaccine.id.toString()} />)})
                : <ErrorMessage errorMessage="No hay información para mostrar!" />
            }
        </div>
    )
}