import { Recipe, RecipeJSON } from "../../domain/Recipe";
import { RecipeServiceInter } from "./RecipeServiceInter";

export class RecipeServiceStub implements RecipeServiceInter{
    private object:RecipeJSON[] = [
        {
            "id":0,
            "nameVet":"Ezequiel",
            "description":"El perro debera comer arroz hervido con zanahoria durante unos dias.",
            "dateRecipe":"2025-02-05",
            "medicalHistoryId":0
        },
        {
            "id":1,
            "nameVet":"Adrian",
            "description":"El perro tiene que hacerse una radiografia.",
            "dateRecipe":"2025-04-05",
            "medicalHistoryId":1
        },
        {
            "id":2,
            "nameVet":"Tamara",
            "description":"La mascota necesita un mes de reposo.",
            "dateRecipe":"2025-03-01",
            "medicalHistoryId":2
        },
        {
            "id":3,
            "nameVet":"Carolina",
            "description":"La mascota tiene que usar collar anti-pulgas durante 30 dias.",
            "dateRecipe":"2025-05-01",
            "medicalHistoryId":3
        },
        {
            "id":4,
            "nameVet":"Lucas C",
            "description":"La mascota tiene que tomar pastillas anti-garrapatas durante 3 meses.",
            "dateRecipe":"2025-04-10",
            "medicalHistoryId": 4
        },
        {
            "id":5,
            "nameVet":"Lucas R",
            "description":"La mascota tiene que ponerse un cono durante 30 dias para que no  se rasque.",
            "dateRecipe":"2025-01-12",
            "medicalHistoryId":5
        }
    ]

    async getAll(): Promise<Recipe[]> {
        return this.object.map((recipeJSON:RecipeJSON)=>Recipe.fromJSON(recipeJSON))
    }

    async getRecipeById(idRecipe: number): Promise<Recipe> {
        const recipeJSON:RecipeJSON = this.object[idRecipe - 1]
        return Recipe.fromJSON(recipeJSON)
    }

    async getRecipesByMedicalHistoryId(idMedicalHistory: number): Promise<Recipe[]> {
        const recipesJSON:RecipeJSON[] = this.object.filter(recipe => recipe.medicalHistoryId === idMedicalHistory)
        return recipesJSON.map((recipeJSON:RecipeJSON)=>Recipe.fromJSON(recipeJSON))
    }

    async createNewRecipe(recipe: Recipe, idMedicalHistory: number): Promise<void> {
        const newId = this.object.length > 0 ?
            Math.max(...this.object.map(recipe => recipe.id)) + 1
            : 1

        const newRecipeJSON : RecipeJSON = {
            ...recipe,
            medicalHistoryId:idMedicalHistory,
            id:newId
        }

        this.object.push(newRecipeJSON)
    }

    async editExistRecipe(recipe: Recipe, idMedicalHistory: number): Promise<void> {
        const index = this.object.findIndex(recipeJSON => recipeJSON.id === recipe.id )
        if(index === -1){
            throw new Error(`No se encontro la receta con el id:${recipe.id}`)
        }

        this.object[index] = {
            ...this.object[index],
            ...recipe,
            medicalHistoryId:idMedicalHistory,
            id:recipe.id
        }
    }

    async deleteExistRecipe(idRecipe: number): Promise<void> {
        this.object = this.object.filter(recipe => recipe.id !== idRecipe)
    }

}