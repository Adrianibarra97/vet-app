import { Recipe } from "../../domain/Recipe";
import { ErrorMessage } from "../error-message/ErrorMessage";
import { RecipeCard } from "../recipe-card/RecipeCard";

import './RecipeGrid.css'

interface PropsRecipeGrid{
    recipes:Array<Recipe>
}

export function RecipeGrid({recipes}:PropsRecipeGrid){
    return(
        <div className="content--data scroll__detail--style">
            <div className="content__data--item">
                <div className="recipe__item--title">
                    <h3 className="recipe--title">Receta</h3>
                    <i className="fa-solid fa-paw recipe--logo"></i>
                </div>
                <div className="recipe__container">
                    <p className="content--item--add">+ Añadir Receta</p>
                </div>
            </div>
            {
                recipes.length > 0 ?
                    recipes.map((recipe: Recipe) => {
                        return (<RecipeCard recipe={recipe} key={recipe.id.toString()} />)})
                : <ErrorMessage errorMessage="No hay información para mostrar!" />
            }
        </div>
    )
}