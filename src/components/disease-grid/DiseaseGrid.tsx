import { useState } from 'react'
import { Disease } from '../../domain/Disease'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import { DiseaseCard } from '../disease-card/DiseaseCard'
import { DiseaseModal } from '../disease-modal/DiseaseModal'
import { ErrorMessage } from '../error-message/ErrorMessage'
import './DiseaseGrid.css'

interface PropsDiseaseGrid{
    diseases:Disease[]
    onEditOrCreateDisease:(disease:Disease) => void
    onClickDelete: (idDisease:number) => void
}

export function DiseaseGrid({diseases, onEditOrCreateDisease, onClickDelete}:PropsDiseaseGrid){
    const [modalCreateDiseaseOpen, setModalCreateDiseaseOpen] = useState<boolean>(false)
    
    const showNewDisease = (): string => {    
        return AuthServiceManager.getIntance().isVet()
            ? 'content__data--item'
            : 'card__content--none'
    }

    const handleOnCreateDisease = (disease:Disease) => {
        onEditOrCreateDisease(disease)
    }

    return(
        <div className="content--data scroll__detail--style">
            <div className={showNewDisease()} onClick={() => setModalCreateDiseaseOpen(true)}>
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
                        return (<DiseaseCard disease={disease} key={disease.id.toString()} onClickEdit={onEditOrCreateDisease} onClickDelete={onClickDelete}/>)})
                : <ErrorMessage errorMessage="No hay información para mostrar!" />
            }
            <DiseaseModal
                open={modalCreateDiseaseOpen}
                onClose={() => setModalCreateDiseaseOpen(false)}
                onConfirm={handleOnCreateDisease}
                idDisease={-1}
            />
        </div>
    )
}