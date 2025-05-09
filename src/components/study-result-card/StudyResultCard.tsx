import { Study } from "../../domain/Study";

import './StudyResultCard.css'

interface PropsStudyResultCard{
    study:Study
}

export function StudyResultCard({study}:PropsStudyResultCard){
    return(
        <div className="content__data--item">
            <div className="study__item--title">
                <h3 className="study--title">Estudios</h3>
                <i className="fa-solid fa-paw logo__image study--logo"></i>
            </div>
            <div className="existence__study--container">
                <div className="study__item study__item--name">
                    <label className="study__item--label">Nombre</label>
                    <p>{study.name}</p>
                </div>
                <div className="study__item study__item-description">
                    <label className="study__item--label">Descripcion</label>
                    <p className="study__item--p">{study.description}</p>
                </div>
            </div>
        </div>
    )
}