import { Recipe } from "../../domain/Recipe"

import './RecipeCard.css'

interface PropsRecipeCard{
    recipe:Recipe 
}

export function RecipeCard({recipe}:PropsRecipeCard){
    return(
        <div className="content__data--item">
            <div className="recipe__item--title">
                <h3 className="recipe--title">Receta</h3>
                <i className="fa-solid fa-paw logo__image recipe--logo"></i>
            </div>
            <div className="recipe__container">
                <div className="recipe__items">
                    <div className="recipe__item recipe__item-date">
                        <label className="recipe__item--label">Fecha</label>
                        <p className="recipe__item--p">{recipe.date}</p>
                    </div>
                    <div className="recipe__item recipe__item-name">
                        <label className="recipe__item--label">Veterinario</label>
                        <p className="recipe__item--p">{recipe.vet}</p>
                    </div>
                </div>
                <div className="recipe__item recipe__item--description">
                    <label className="recipe__item--label">Descripcion</label>
                    <p>{recipe.description}</p>
                </div>
            </div>
        </div>
    )
}