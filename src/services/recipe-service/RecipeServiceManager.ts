import { RecipeService } from "./RecipeService";
import { RecipeServiceInter } from "./RecipeServiceInter";
import { RecipeServiceStub } from "./RecipeServiceStub";

export class RecipeServiceManager{
    private static instance:RecipeServiceInter
    static useStub:boolean = true

    public static getInstance():RecipeServiceInter{
        if(!RecipeServiceManager.instance){
            RecipeServiceManager.instance = this.useStub ? new RecipeServiceStub() : new RecipeService()
        }
        return RecipeServiceManager.instance
    }
}