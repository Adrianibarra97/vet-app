import { Recipe } from "../../domain/Recipe";

export interface RecipeServiceInter{
    getAll():Promise<Recipe[]>
    getRecipeById(idRecipe:number):Promise<Recipe>
    getRecipesByMedicalHistoryId(idMedicalHistory:number):Promise<Recipe[]>
    createNewRecipe(recipe:Recipe,idMedicalHistory:number):Promise<void>
    editExistRecipe(recipe:Recipe,idMedicalHistory:number):Promise<void>
    deleteExistRecipe(idRecipe:number):Promise<void>
}