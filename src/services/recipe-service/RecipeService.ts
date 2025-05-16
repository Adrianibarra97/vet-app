import axios from "axios";
import { Recipe, RecipeJSON } from "../../domain/Recipe";
import { URL_BE } from "../config";
import { RecipeServiceInter } from "./RecipeServiceInter";
import { getUserID } from "../auth-service/AuthService";

export class RecipeService implements RecipeServiceInter{
    async getAll(): Promise<Recipe[]> {
        const response = await axios.get<RecipeJSON[]>(`${URL_BE}/recipe/get-all`)
        return response.data.map((recipeJSON:RecipeJSON)=>Recipe.fromJSON(recipeJSON))
    }

    async getRecipeById(idRecipe:number):Promise<Recipe>{
        const response = await axios.get<RecipeJSON>(`${URL_BE}/recipe/get-one-by-id?idRecipe=${idRecipe}`)
        return Recipe.fromJSON(response.data)
    }

    async getRecipesByMedicalHistoryId(idMedicalHistory: number): Promise<Recipe[]> {
        const response = await axios.get<RecipeJSON[]>(`${URL_BE}/medical-history/get-all-pet-recipes?idMedicalHistory=${idMedicalHistory}`)
        return response.data.map((recipeJSON:RecipeJSON)=>Recipe.fromJSON(recipeJSON))
    }

    async createNewRecipe(recipe: Recipe, idMedicalHistory: number): Promise<void> {
        const newRecipeDTO = {
            vet:getUserID(),
            description:recipe.description,
            date:new Date().toISOString().split('T')[0],
            medicalHistoryId:idMedicalHistory
        }
        await axios.post(`${URL_BE}/recipe/create`,newRecipeDTO)
    }

    async editExistRecipe(recipe: Recipe, idMedicalHistory: number): Promise<void> {
        const newRecipeDTO = {
            vet:getUserID(),
            description:recipe.description,
            date:new Date().toISOString().split('T')[0],//Consultar si cuando se edita una receta tambien se tendria que editar la fecha en la que se hizo esta misma
            medicalHistoryId:idMedicalHistory
        }
        await axios.put(`${URL_BE}/recipe/update`,newRecipeDTO)
    }

    async deleteExistRecipe(idRecipe: number): Promise<void> {
        await axios.delete(`${URL_BE}/recipe/delete?idRecipe=${idRecipe}`)
    }
}