import { useEffect, useState } from "react";
import { Recipe } from "../../domain/Recipe";
import { Pet } from "../../domain/Pet";
import { Vaccine } from "../../domain/Vaccine";
import { Disease } from "../../domain/Disease";
import { Study } from "../../domain/Study";
import { useParams } from "react-router-dom";
import PetServiceManager from "../../services/pet-service/PetServiceManager";
import { RecipeServiceManager } from "../../services/recipe-service/RecipeServiceManager";
import { VaccineServiceManager } from "../../services/vaccine-service/VaccineServiceManager";
import { DiseaseServiceManager } from "../../services/disease-service/DiseaseServiceManager";
import { StudyResultServiceManager } from "../../services/study-result-service/StudyResultServiceManager";
import { useOnInit } from "../../util/customHooks";

import './PetDetail.css'
import { VaccineGrid } from "../../components/vaccine-grid/VaccineGrid";
import { RecipeGrid } from "../../components/recipe-grid/RecipeGrid";
import { DiseaseGrid } from "../../components/disease-grid/DiseaseGrid";
import { StudyResultGrid } from "../../components/study-result-grid/StudyResultGrid";

export function PetDetail(){
    const [pet,setPet] = useState<Pet>(new Pet())
    const [recipesPet,setRecipesPet] = useState<Recipe[]>(Array<Recipe>)
    const [vaccinesPet,setVaccinesPet] = useState<Vaccine[]>(Array<Vaccine>)
    const [diseasePet,setDiseasePet] = useState<Disease[]>(Array<Disease>)
    const [studyResultsPet,setStudyResultsPet] = useState<Study[]>(Array<Study>)
    const [selectedOption, setSelectedOption] = useState('one');
    const {petID} = useParams()

    const getPetDetail = async() => {
        const petDetail = await PetServiceManager.getIntance().getPetById(+petID!)
        setPet(petDetail)
    }

    const getRecipesPet = async() => {
        const recipes = await RecipeServiceManager.getInstance().getRecipesByMedicalHistoryId(pet.medicalHistoryId)
        console.log(recipes)
        setRecipesPet(recipes)
    }

    const getVaccinesPet = async() => {
        const vaccines = await VaccineServiceManager.getInstance().getVaccineByMedicalHistoryId(pet.medicalHistoryId)
        console.log(vaccines)
        setVaccinesPet(vaccines)
    }

    const getDiseasesPet = async() => {
        const diseases = await DiseaseServiceManager.getInstance().getDiseasesByMedicalHistoryId(pet.medicalHistoryId)
        setDiseasePet(diseases)
    }

    const getStudysPet = async() => {
        const studys = await StudyResultServiceManager.getInstace().getStudyResultByMedicalHistoryId(pet.medicalHistoryId)
        setStudyResultsPet(studys)
    }

    useOnInit(()=>{
        getPetDetail()
    })

    useEffect(() => {
    if (pet) { 
        getRecipesPet();
        getVaccinesPet();
        getDiseasesPet();
        getStudysPet();
    }
}, [pet])

    const handleSelectChange = (option:string) => {
        setSelectedOption(option);
    }

    return(
        <main className="main-detail">
            <div className="detail--title">
                <p className="title__item">{pet.name}</p>
                <p className="title__item">{pet.age} Años</p>
            </div>
            <div className="detail-content">
                <div className="content__data">
                    <div className="content__image">
                        <figure className="data__image">
                            <img className="data_image--size" src={pet.photo} alt=""/>
                        </figure>
                    </div>
                    <div className="data__detail">
                        <div className="detail--data">
                            <p className="data__item--title">Información general</p>
                        </div>
                        <div className="detail--data">
                            <p className="data__pet__item">Especie:{pet.specie}</p>
                            <p className="data__pet__item">Raza:{pet.breed}</p>
                        </div>
                        <div className="detail--data">
                            <p className="data__pet__item">Castracion:{pet.sterilized?'Castrado':'No castrado'}</p>
                            <p className="data__pet__item">Peso:{pet.weight} Kg</p>
                        </div>
                        <div className="detail--data">
                            <p className="data__pet__item">Sexo:{pet.sex}</p>
                            <p className="data__pet__item">Nacimiento:{pet.birth}</p>
                        </div>
                    </div>
                </div>
                <div className="content__data2">
                    <h2 className="content__data2--title">Historial Médico</h2>
                    <div className="content__data2--section">
                        <div className="content--title">
                            <select className="content--selection" value={selectedOption} onChange={(event)=>handleSelectChange(event.target.value)}>
                                <option value="one">Vacunas</option>
                                <option value="two">Recetas</option>
                                <option value="three">Enfermedades Pre-existentes</option>
                                <option value="four">Resultado de estudios</option>
                            </select>
                        </div>
                        <div className="content__history--data">
                            {selectedOption === 'one' && <VaccineGrid vaccines={vaccinesPet} />}
                            {selectedOption === 'two' && <RecipeGrid recipes={recipesPet}/>}
                            {selectedOption === 'three' && <DiseaseGrid diseases={diseasePet}/>}
                            {selectedOption === 'four' && <StudyResultGrid studysResult={studyResultsPet}/>}
                        </div>
                    </div>
                </div>
            </div>
    </main>
    )
}