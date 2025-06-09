import { useState } from "react";
import { Vaccine } from "../../domain/Vaccine";
import AuthServiceManager from "../../services/auth-service/AuthServiceManager";
import { ErrorMessage } from "../error-message/ErrorMessage";
import { VaccineCard } from "../vaccine-card/VaccineCard";
import "./VaccineGrid.css"
import { VaccineModal } from "../vaccine-modal/VaccineModal";

interface PropVaccineGrid{
    vaccines:Vaccine[]
    onEditOrCreateVaccine:(vaccine:Vaccine) => void
    onClickDelete:(idVaccine:number) => void
}

export function VaccineGrid({vaccines, onEditOrCreateVaccine, onClickDelete}:PropVaccineGrid){
    const [modalCreateVaccineOpen, setModalCreateVaccineOpen] = useState<boolean>(false)

    const showNewVaccine = (): string => {    
        return AuthServiceManager.getIntance().isVet()
            ? 'content__data--item cursor_pointer'
            : 'card__content--none'
    }

    return(
        <div className="content--data scroll__detail--style">
            <div className={showNewVaccine()} onClick={() => setModalCreateVaccineOpen(true)}>
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
                        return (<VaccineCard vaccine={vaccine} key={vaccine.id.toString()} onClickEdit={onEditOrCreateVaccine} onClickDelete={onClickDelete}/>)})
                : <ErrorMessage errorMessage="No hay información para mostrar!" />
            }
            <VaccineModal
                open={modalCreateVaccineOpen}
                onClose={() => setModalCreateVaccineOpen(false)}
                onConfirm={onEditOrCreateVaccine}
                idVaccine={-1}
                viewMode={false}
            />
        </div>
    )
}