import { Disease } from "../../domain/Disease";

import './DiseaseCard.css'

interface PropsDiseaseCard{
    disease:Disease
}

export function DiseaseCard({disease}:PropsDiseaseCard){
    return(
        <div className="content__data--item">
            <div className="disease__item--title">
                <h3 className="disease--title">Enfermedad</h3>
                <i className="fa-solid fa-paw logo__image disease--logo"></i>
            </div>
            <div className="existence__disease--container">
                <div className="disease__item disease__item--name">
                    <label className="disease__item--label">Nombre</label>
                    <p>{disease.name}</p>
                </div>
                <div className="disease__item disease__item-description">
                    <label className="disease__item--label">Descripcion</label>
                    <p className="disease__item--p">{disease.description}</p>
                </div>
            </div>
        </div>
    )
}

