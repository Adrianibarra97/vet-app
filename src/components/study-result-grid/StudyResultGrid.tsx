import { useState } from "react";
import { Study } from "../../domain/Study";
import AuthServiceManager from "../../services/auth-service/AuthServiceManager";
import { ErrorMessage } from "../error-message/ErrorMessage";
import { StudyResultCard } from "../study-result-card/StudyResultCard";

import './StudyResultGrid.css'
import { StudyResultModal } from "../study-result-modal/StudyResultModal";

interface PropsStudyResultGrid{
    studysResult:Study[]
    onEditOrCreateStudy:(study:Study) => void
    onClickDelete:(idStudy:number) => void
}

export function StudyResultGrid({studysResult, onEditOrCreateStudy, onClickDelete}:PropsStudyResultGrid){
    const [modalCreateStudyOpen, setModalCreateStudyOpen] = useState<boolean>(false)

    const showNewStudy = (): string => {    
        return AuthServiceManager.getIntance().isVet()
            ? 'content__data--item cursor_pointer'
            : 'card__content--none'
    }

    return(
        <div className="content--data scroll__detail--style">
            <div className={showNewStudy()} onClick={() => setModalCreateStudyOpen(true)}>
                <div className="study__item--title">
                    <h3 className="study--title">Estudios</h3>
                    <i className="fa-solid fa-paw study--logo"></i>
                </div>
                <div className="study__container">
                    <p className="content--item--add">+ Añadir Estudio</p>
                </div>
            </div>
            {
                studysResult.length > 0 ?
                    studysResult.map((study: Study) => {
                        return (<StudyResultCard study={study} key={study.id.toString()} onClickEdit={onEditOrCreateStudy} onClickDelete={onClickDelete}/>)})
                : <ErrorMessage errorMessage="No hay información para mostrar!" />
            }
            <StudyResultModal
                open={modalCreateStudyOpen}
                onClose={() => setModalCreateStudyOpen(false)}
                onConfirm={onEditOrCreateStudy}
                idStudy={-1}
                viewMode={false}
            />
        </div>
    )
}