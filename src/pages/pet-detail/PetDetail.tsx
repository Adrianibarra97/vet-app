import { useState } from "react";
import { Recipe } from "../../domain/Recipe";
import { Pet } from "../../domain/Pet";
import { Vaccine } from "../../domain/Vaccine";
import { Disease } from "../../domain/Disease";
import { Study } from "../../domain/Study";
import { useParams } from "react-router-dom";
import PetServiceManager from "../../services/pet-service/PetServiceManager";

export function PetDetail(){
    const [pet,setPet] = useState<Pet>(new Pet())
    const [recipesPet,setRecipesPet] = useState<Recipe>(new Recipe())
    const [vaccinesPet,setVaccinesPet] = useState<Vaccine>(new Vaccine())
    const [diseasePet,setDiseasePet] = useState<Disease>(new Disease())
    const [studyResultsPet,setStudyResultsPet] = useState<Study>(new Study())
    const {petID} = useParams()

    const getPetDetail = async() => {
        const petDetail = await PetServiceManager.getIntance().getPetById(+petID!)
        setPet(petDetail)
    }

    const getRecipesPet = async() = {
        
    }
}