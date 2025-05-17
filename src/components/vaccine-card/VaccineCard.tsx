import dayjs from "dayjs";
import { convertTypeOfVaccineToASpanishString, Vaccine } from "../../domain/Vaccine";

import './VaccineCard.css'
import { useState } from "react";
import AuthServiceManager from "../../services/auth-service/AuthServiceManager";
import { VaccineModal } from "../vaccine-modal/VaccineModal";
import { DeleteModalElement } from "../delete-modal-element/DeleteModalElement";

interface PropsVaccineCard{
    vaccine:Vaccine,
    onClickEdit:(vaccine:Vaccine) => void
    onClickDelete:(idVaccine:number) => void
}

export function VaccineCard({vaccine, onClickEdit, onClickDelete}:PropsVaccineCard){
    const [modalEditOrViewVaccineOpen, setModalEditOrViewVaccineOpen] = useState<boolean>(false)
    const [modalDeleteVaccineState, setModalDeleteVaccineState] = useState<boolean>(false)
    const [viewMode, setViewMode] = useState<boolean>(false)
    const aplicationDate = dayjs(vaccine.applicationDate).format('DD/MM/YYYY')
    const expirationDate = dayjs(vaccine.expirationDate).format('DD/MM/YYYY')

    const handleOnEdit = (vaccine:Vaccine) => {
        onClickEdit(vaccine)
        setModalEditOrViewVaccineOpen(false)
    }

    return(
        <>
            <div className="content__data--item">
                <div className="vaccine__item--title">
                    <h3 className="vaccine--title">Vacuna</h3>
                    <i className="fa-solid fa-paw logo__image vaccine--logo cursor_pointer" onClick={() => {setModalEditOrViewVaccineOpen(true);setViewMode(true)}}></i>
                </div>
                <div className="vaccine__container">
                    <div className="vaccine__data">
                        <div className="vaccine__item">
                            <label className="vaccine__item--label">Lote</label>
                            <p className="vaccine__item--p">{vaccine.batchNumber}</p>
                        </div>
                        <div className="vaccine__item">
                            <label className="vaccine__item--label">Contra</label>
                            <p className="vaccine__item--p">{convertTypeOfVaccineToASpanishString(vaccine.type)}</p>
                        </div>
                    </div>
                    <div className="vaccine__data">
                        <div className="vaccine__item">
                            <label className="vaccine__item--label">Aplicacion</label>
                            <p className="vaccine__item--p">{aplicationDate}</p>
                        </div>
                        <div className="vaccine__item">
                            <label className="vaccine__item--label">Vencimiento</label>
                            <p className="vaccine__item--p">{expirationDate}</p>
                        </div>
                    </div>
                    <div className="vaccine__item--conteiner_description">
                        <div className="vaccine__item--description__title">
                            <label className="vaccine__item--label">Descripcion</label>
                        </div>
                        <p className="vaccine__item--description vaccine__item--p">{vaccine.description}</p>
                    </div>
                    {AuthServiceManager.getIntance().isVet() &&
                        <div className="vaccine__item--content__button">
                            <button className="fa-solid fa-pen vaccine__item--button__icon" onClick={() => {setModalEditOrViewVaccineOpen(true); setViewMode(false)}}/>
                            <button className="fa-solid fa-trash vaccine__item--button__icon" onClick={() => setModalDeleteVaccineState(true)}/>
                        </div>
                    }
                </div>
            </div>
            <VaccineModal
                open={modalEditOrViewVaccineOpen}
                onClose={() => setModalEditOrViewVaccineOpen(false)}
                onConfirm={handleOnEdit}
                vaccine={vaccine}
                idVaccine={vaccine.id}
                viewMode={viewMode}
            />
            <DeleteModalElement
                open={modalDeleteVaccineState}
                onClose={() => setModalDeleteVaccineState(false)}
                onConfirm={() => onClickDelete(vaccine.id)}
                element="Vacuna"
            />
        </>
    )
}