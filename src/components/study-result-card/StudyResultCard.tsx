import dayjs from "dayjs";
import { convertTypeOfStudyResultToASpanishString, Study } from "../../domain/Study";

import './StudyResultCard.css'
import { useState } from "react";
import AuthServiceManager from "../../services/auth-service/AuthServiceManager";
import { StudyResultModal } from "../study-result-modal/StudyResultModal";
import { DeleteModalElement } from "../delete-modal-element/DeleteModalElement";

interface PropsStudyResultCard{
    study:Study
    onClickEdit:(study:Study) => void
    onClickDelete:(idStudy:number) => void
}

export function StudyResultCard({study, onClickEdit, onClickDelete}:PropsStudyResultCard){
    const [modalEditOrViewStudyResultOpen, setModalEditOrViewStudyResultOpen] = useState<boolean>(false)
    const [modalDeleteStudyResultState, setModalDeleteStudyResultState] = useState<boolean>(false)
    const [viewMode, setViewMode] = useState<boolean>(false)
    const date = dayjs(study.date).format('DD/MM/YYYY')

    const handleOnEdit = (study:Study) => {
        onClickEdit(study)
        setModalEditOrViewStudyResultOpen(false)
    }

    return(
        <>
            <div className="content__data--item">
                <div className="study__item--title">
                    <h3 className="study--title">Estudios</h3>
                    <i className="fa-solid fa-paw logo__image study--logo cursor_pointer" onClick={() => {setModalEditOrViewStudyResultOpen(true);setViewMode(true)}}></i>
                </div>
                <div className="existence__study--container">
                    <div className="study__data">
                        <div className="study__item">
                            <label className="study__item--label">Tipo</label>
                            <p className="study__item--p">{convertTypeOfStudyResultToASpanishString(study.type)}</p>
                        </div>
                        <div className="study__item">
                            <label className="study__item--label">Fecha</label>
                            <p className="study__item--p">{date}</p>
                        </div>
                    </div>
                    <div className="study__item">
                        <div className="study__item--description__title">
                            <label className="study__item--label">Descripcion</label>
                        </div>
                        <p className="study__item--description study__item--p">{study.description}</p>
                    </div>
                    {AuthServiceManager.getIntance().isVet() &&
                        <div className="study__item--content__button">
                            <button className="fa-solid fa-pen study__item--button__icon" onClick={() => {setModalEditOrViewStudyResultOpen(true); setViewMode(false)}}/>
                            <button className="fa-solid fa-trash study__item--button__icon" onClick={() => setModalDeleteStudyResultState(true)}/>
                        </div>
                    }
                </div>
            </div>
            <StudyResultModal
                open={modalEditOrViewStudyResultOpen}
                onClose={() => setModalEditOrViewStudyResultOpen(false)}
                onConfirm={handleOnEdit}
                study={study}
                idStudy={study.id}
                viewMode={viewMode}
            />
            <DeleteModalElement
                open={modalDeleteStudyResultState}
                onClose={() => setModalDeleteStudyResultState(false)}
                onConfirm={() => onClickDelete(study.id)}
                element="Resultado de estudio"
            />
        </>
    )
}