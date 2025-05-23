import { useState } from "react";
import { Recipe } from "../../domain/Recipe";
import AuthServiceManager from "../../services/auth-service/AuthServiceManager";
import { ErrorMessage } from "../error-message/ErrorMessage";
import { RecipeCard } from "../recipe-card/RecipeCard";
import { RecipeModal } from "../recipe-modal/RecipeModal";

import './RecipeGrid.css'

interface PropsRecipeGrid{
    recipes:Array<Recipe>
    onEditOrCreateRecipe:(recipe:Recipe) => void
    onClickDelete:(idRecipe:number) => void
}

export function RecipeGrid({recipes, onEditOrCreateRecipe, onClickDelete}:PropsRecipeGrid){
    const [modalCreateRecipeOpen, setModalCreateRecipeOpen] = useState<boolean>(false)

    const showNewRecipe = (): string => {    
        return AuthServiceManager.getIntance().isVet()
            ? 'content__data--item cursor_pointer'
            : 'card__content--none'
    }

    return(
        <div className="content--data scroll__detail--style">
            <div className={showNewRecipe()} onClick={() => setModalCreateRecipeOpen(true)}>
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
                        return (<RecipeCard recipe={recipe} key={recipe.id.toString()} onClickEdit={onEditOrCreateRecipe} onClickDelete={onClickDelete} />)})
                : <ErrorMessage errorMessage="No hay información para mostrar!" />
            }
            <RecipeModal
                open = {modalCreateRecipeOpen}
                onClose={() => setModalCreateRecipeOpen(false)}
                onConfirm={onEditOrCreateRecipe}
                idRecipe={-1}
                viewMode={false}
            />
        </div>
    )
}