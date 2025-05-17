import dayjs from "dayjs";
import { convertTypeOfPreExistinceDiseaseToASpanishString, convertTypeOfSeverityToASpanishString, Disease } from "../../domain/Disease";

import './DiseaseCard.css'
import { DiseaseModal } from "../disease-modal/DiseaseModal";
import { useState } from "react";
import { DeleteModalElement } from "../delete-modal-element/DeleteModalElement";

interface PropsDiseaseCard{
    disease:Disease
    onClickEdit:(disease:Disease) => void
    onClickDelete:(idDisease:number) => void
}

export function DiseaseCard({disease, onClickEdit, onClickDelete}:PropsDiseaseCard){
    const [modalEditDiseaseOpen, setModalEditDiseaseOpen] = useState<boolean>(false)
    const [modalDeleteDiseaseState, setModalDeleteDiseaseState] = useState<boolean>(false)
    const date = dayjs(disease.diagnosisDate).format('DD/MM/YYYY')
    
    const handleOnEdit = (disease:Disease) => {
        onClickEdit(disease)
        setModalEditDiseaseOpen(false)
    }

    return(
        <>
            <div className="content__data--item">
                <div className="disease__item--title">
                    <h3 className="disease--title">Enfermedad</h3>
                    <i className="fa-solid fa-paw logo__image disease--logo"></i>
                </div>
                <div className="disease__container">
                    <div className="disease__data">
                        <div className="disease__item">
                            <label className="disease__item--label">Tipo</label>
                            <p className="disease__item--p ">{convertTypeOfPreExistinceDiseaseToASpanishString(disease.type)}</p>
                        </div>
                        <div className="disease__item">
                            <label className="disease__item--label">Fecha</label>
                            <p className="disease__item--p ">{date}</p>
                        </div>
                    </div>
                    <div className="disease__data">
                        <div className="disease__item">
                            <label className="disease__item--label">Activa</label>
                            <p className="disease__item--p ">{disease.isActive ? 'Si': 'No'}</p>
                        </div>
                        <div className="disease__item">
                            <label className="disease__item--label">Severidad</label>
                            <p className="disease__item--p ">{convertTypeOfSeverityToASpanishString(disease.severity)}</p>
                        </div>
                    </div>
                    <div className="disease__item">
                        <div className="disease__item--description__title">
                            <label className="disease__item--label">Observacion</label>
                        </div>
                        <p className="disease__item-description disease__item--p">{disease.observation}</p>
                    </div>
                    <div className="disease_item disease__item--button">
                        <button className="fa-solid fa-pen button__icon" onClick={() => setModalEditDiseaseOpen(true)}/>
                        <button className="fa-solid fa-trash button__icon" onClick={() => setModalDeleteDiseaseState(true)}/>
                    </div>
                </div>
            </div>
            <DiseaseModal 
                open={modalEditDiseaseOpen}
                onClose={() => setModalEditDiseaseOpen(false)}
                onConfirm={handleOnEdit}
                disease={disease}
                idDisease={disease.id}
            />
            <DeleteModalElement
                open={modalDeleteDiseaseState}
                onClose={() => setModalDeleteDiseaseState(false)}
                onConfirm={() => onClickDelete(disease.id)}
                element="Enfermedad Pre-existente"
            />
        </>
    )
}

