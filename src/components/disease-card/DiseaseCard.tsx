import dayjs from "dayjs";
import { convertTypeOfPreExistinceDiseaseToASpanishString, convertTypeOfSeverityToASpanishString, Disease } from "../../domain/Disease";

import './DiseaseCard.css'

interface PropsDiseaseCard{
    disease:Disease
}

export function DiseaseCard({disease}:PropsDiseaseCard){
    const date = dayjs(disease.diagnosisDate).format('DD/MM/YYYY')
    
    return(
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
                <div className="disease__item disease__item-description">
                    <label className="disease__item--label">Observacion</label>
                    <p className="disease__item--p">{disease.observation}</p>
                </div>
            </div>
        </div>
    )
}

