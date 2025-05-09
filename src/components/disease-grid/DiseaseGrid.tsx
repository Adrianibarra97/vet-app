import { Disease } from '../../domain/Disease'
import { DiseaseCard } from '../disease-card/DiseaseCard'
import { ErrorMessage } from '../error-message/ErrorMessage'
import './DiseaseGrid.css'

interface PropsDiseaseGrid{
    diseases:Disease[]
}

export function DiseaseGrid({diseases}:PropsDiseaseGrid){
    return(
        <div className="content--data scroll__detail--style">
            <div className="content__data--item">
                <div className="disease__item--title">
                    <h3 className="disease--title">Enfermedad</h3>
                    <i className="fa-solid fa-paw disease--logo"></i>
                </div>
                <div className="disease__container">
                    <p className="content--item--add">+ Añadir Enfermedad</p>
                </div>
            </div>
            {
                diseases.length > 0 ?
                    diseases.map((disease: Disease) => {
                        return (<DiseaseCard disease={disease} key={disease.id.toString()} />)})
                : <ErrorMessage errorMessage="No hay información para mostrar!" />
            }
        </div>
    )
}