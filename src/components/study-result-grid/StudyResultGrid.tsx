import { Study } from "../../domain/Study";
import { ErrorMessage } from "../error-message/ErrorMessage";
import { StudyResultCard } from "../study-result-card/StudyResultCard";

import './StudyResultGrid.css'

interface PropsStudyResultGrid{
    studysResult:Study[]
}

export function StudyResultGrid({studysResult}:PropsStudyResultGrid){
    return(
        <div className="content--data scroll__detail--style">
            <div className="content__data--item">
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
                        return (<StudyResultCard study={study} key={study.id.toString()} />)})
                : <ErrorMessage errorMessage="No hay información para mostrar!" />
            }
        </div>
    )
}