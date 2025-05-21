import { RECIPE_SERVICE_USE_STUB } from "../config";
import { RecipeService } from "./RecipeService";
import { RecipeServiceInter } from "./RecipeServiceInter";
import { RecipeServiceStub } from "./RecipeServiceStub";

export class RecipeServiceManager{
    private static instance:RecipeServiceInter

    public static getInstance():RecipeServiceInter{
        if(!RecipeServiceManager.instance){
            RecipeServiceManager.instance = RECIPE_SERVICE_USE_STUB ? new RecipeServiceStub() : new RecipeService()
        }
        return RecipeServiceManager.instance
    }
}