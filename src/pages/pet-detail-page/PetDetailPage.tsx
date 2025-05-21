import { useEffect, useState } from "react";
import { Recipe } from "../../domain/Recipe";
import { convertTypeOfPetToASpanishString, Pet } from "../../domain/Pet";
import { Vaccine } from "../../domain/Vaccine";
import { Disease } from "../../domain/Disease";
import { Study } from "../../domain/Study";
import { useNavigate, useParams } from "react-router-dom";
import PetServiceManager from "../../services/pet-service/PetServiceManager";
import { RecipeServiceManager } from "../../services/recipe-service/RecipeServiceManager";
import { VaccineServiceManager } from "../../services/vaccine-service/VaccineServiceManager";
import { DiseaseServiceManager } from "../../services/disease-service/DiseaseServiceManager";
import { StudyResultServiceManager } from "../../services/study-result-service/StudyResultServiceManager";
import { useOnInit } from "../../util/customHooks";

import './PetDetailPage.css'
import { VaccineGrid } from "../../components/vaccine-grid/VaccineGrid";
import { RecipeGrid } from "../../components/recipe-grid/RecipeGrid";
import { DiseaseGrid } from "../../components/disease-grid/DiseaseGrid";
import { StudyResultGrid } from "../../components/study-result-grid/StudyResultGrid";
import dayjs from "dayjs";
import { SnackbarUtilities } from "../../util/snackbar/SnackbarManager";

export function PetDetail(){
    const [pet,setPet] = useState<Pet>(new Pet())
    const [recipesPet,setRecipesPet] = useState<Recipe[]>(Array<Recipe>)
    const [vaccinesPet,setVaccinesPet] = useState<Vaccine[]>(Array<Vaccine>)
    const [diseasePet,setDiseasePet] = useState<Disease[]>(Array<Disease>)
    const [studyResultsPet,setStudyResultsPet] = useState<Study[]>(Array<Study>)
    const [selectedOption, setSelectedOption] = useState('one');
    const {petID} = useParams()
    const navigate = useNavigate()

    const birthDate = dayjs(pet.birth).format('DD/MM/YYYY')

    const getPetDetail = async() => {
        const petDetail = await PetServiceManager.getIntance().getPetById(+petID!)
        setPet(petDetail)
    }

    useOnInit(()=>{
        getPetDetail()
    })

    const getRecipesPet = async() => {
        const recipes = await RecipeServiceManager.getInstance().getRecipesByMedicalHistoryId(pet.idMedicalHistory)
        setRecipesPet(recipes)
    }

    const getVaccinesPet = async() => {
        const vaccines = await VaccineServiceManager.getInstance().getVaccineByMedicalHistoryId(pet.idMedicalHistory)
        setVaccinesPet(vaccines)
    }

    const getDiseasesPet = async() => {
        const diseases = await DiseaseServiceManager.getInstance().getDiseasesByMedicalHistoryId(pet.idMedicalHistory)
        setDiseasePet(diseases)
    }

    const getStudysPet = async() => {
        const studys = await StudyResultServiceManager.getInstace().getStudyResultByMedicalHistoryId(pet.idMedicalHistory)
        setStudyResultsPet(studys)
    }


    useEffect(() => {
        if (pet && pet.id !== -1) { 
            getRecipesPet();
            getVaccinesPet();
            getDiseasesPet();
            getStudysPet();
        }
    }, [pet])

    const handleEditOrCreateDisease = async (disease:Disease) => {
        if (disease.id > -1) {
            DiseaseServiceManager.getInstance().editExistDisease(disease,pet.idMedicalHistory)
            await getDiseasesPet()
            SnackbarUtilities.succes(`Se edito con exito la enfermedad.`)
        }else{
            DiseaseServiceManager.getInstance().createNewDisease(disease,pet.idMedicalHistory)
            await getDiseasesPet()
            SnackbarUtilities.succes(`Se creo con exito la enfermedad.`)
        }
    }

    const handleDiseaseDelete = async (idDisease:number) => {
        DiseaseServiceManager.getInstance().deleteExistDiseaseById(idDisease)
        await getDiseasesPet()
        SnackbarUtilities.succes(`Se elimino con exito la enfermedad.`)
    }

    const handleEditOrCreateRecipe = async (recipe:Recipe) => {
        if(recipe.id > -1) {
            RecipeServiceManager.getInstance().editExistRecipe(recipe,pet.idMedicalHistory)
            await getRecipesPet()
            SnackbarUtilities.succes(`Se edito con exito la receta.`)
        }else{
            RecipeServiceManager.getInstance().createNewRecipe(recipe,pet.idMedicalHistory)
            await getRecipesPet()
            SnackbarUtilities.succes(`Se creo con exito la receta.`)
        }
    }

    const handleRecipeDelete = async (idRecipe:number) => {
        RecipeServiceManager.getInstance().deleteExistRecipe(idRecipe)
        await getRecipesPet()
        SnackbarUtilities.succes(`Se elimino con exito la receta.`)
    }

    const handleEditOrCreateStudy = async(study:Study) => {
        if(study.id > -1){
            StudyResultServiceManager.getInstace().editExistStudyResult(study,pet.idMedicalHistory)
            await getStudysPet()
            SnackbarUtilities.succes(`Se edito con exito el resultado de estudio.`)
        }else{
            StudyResultServiceManager.getInstace().createNewStudyResult(study, pet.idMedicalHistory)
            await getStudysPet()
            SnackbarUtilities.succes(`Se creo con exito el resultado de estudio.`)
        }
    }

    const handleStudyDelete = async(idStudy:number) => {
        StudyResultServiceManager.getInstace().deleteExistStudyResult(idStudy)
        await getStudysPet()
        SnackbarUtilities.succes(`Se elimino con exito el resultado de estudio.`)
    }

    const handleEditOrCreateVaccine = async(vaccine:Vaccine) => {
        if(vaccine.id > -1){
            VaccineServiceManager.getInstance().editExistVaccine(vaccine, pet.idMedicalHistory)
            await getVaccinesPet()
            SnackbarUtilities.succes(`Se edito con exito la vacuna.`)
        }else{
            VaccineServiceManager.getInstance().createNewVaccine(vaccine, pet.idMedicalHistory)
            await getVaccinesPet()
            SnackbarUtilities.succes(`Se creo con exito la vacuna.`)
        }
    }

    const handleVaccineDelete = async(idVaccine:number) => {
        VaccineServiceManager.getInstance().deleteExistVaccine(idVaccine)
        await getVaccinesPet()
        SnackbarUtilities.succes(`Se elimino con exito la vacuna.`)
    }

    const handleSelectChange = (option:string) => {
        setSelectedOption(option);
    }

    const returnPage = () => {
        navigate('/pets')
    }

    return(
        <main className="main-detail">
            <div className="detail--title">
                <p className="title__item">{pet.name}</p>
                <p className="title__item">{pet.age} Años</p>
            </div>
            <div className="detail-content">
                <div className="content__data__info">
                    <div className="content__image">
                        <figure className="card__image__detail">
                            <img className="card__image__detail--size" src={pet.photo} alt=""/>
                        </figure>
                    </div>
                    <div className="data__detail">
                        <div className="detail--data">
                            <p className="data__item--title">Información general</p>
                        </div>
                        <div className="detail--data">
                            <p className="data__pet__item"><span className="data__label">Especie:</span>{convertTypeOfPetToASpanishString(pet.specie)}</p>
                            <p className="data__pet__item"><span className="data__label">Raza:</span>{pet.breed}</p>
                        </div>
                        <div className="detail--data">
                            <p className="data__pet__item"><span className="data__label">Castracion:</span>{pet.sterilized?'Castrado':'No castrado'}</p>
                            <p className="data__pet__item"><span className="data__label">Peso:</span>{pet.weight} Kg</p>
                        </div>
                        <div className="detail--data">
                            <p className="data__pet__item"><span className="data__label">Sexo:</span>{pet.sex}</p>
                            <p className="data__pet__item"><span className="data__label">Nacimiento:</span>{birthDate}</p>
                        </div>
                    </div>
                </div>
                <div className="content__data__history">
                    <h2 className="content__data__history--title">Historial Médico</h2>
                    <div className="content__data__history--section">
                        <div className="content--title">
                            <select className="content--selection" value={selectedOption} onChange={(event)=>handleSelectChange(event.target.value)}>
                                <option value="one">Vacunas</option>
                                <option value="two">Recetas</option>
                                <option value="three">Enfermedades Pre-existentes</option>
                                <option value="four">Resultado de estudios</option>
                            </select>
                        </div>
                        <div className="content__history--data">
                            {selectedOption === 'one' && <VaccineGrid vaccines={vaccinesPet} onEditOrCreateVaccine={handleEditOrCreateVaccine} onClickDelete={handleVaccineDelete}/>}
                            {selectedOption === 'two' && <RecipeGrid recipes={recipesPet} onEditOrCreateRecipe={handleEditOrCreateRecipe} onClickDelete={handleRecipeDelete}/>}
                            {selectedOption === 'three' && <DiseaseGrid diseases={diseasePet} onEditOrCreateDisease={handleEditOrCreateDisease} onClickDelete={handleDiseaseDelete}/>}
                            {selectedOption === 'four' && <StudyResultGrid studysResult={studyResultsPet} onEditOrCreateStudy={handleEditOrCreateStudy} onClickDelete={handleStudyDelete}/>}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button className="content_button" onClick={returnPage}>Volver</button>
            </div>
        </main>
    )
}