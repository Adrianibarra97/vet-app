import dayjs from "dayjs"
import { Recipe } from "../../domain/Recipe"

import './RecipeCard.css'
import { useState } from "react"
import AuthServiceManager from "../../services/auth-service/AuthServiceManager"
import { RecipeModal } from "../recipe-modal/RecipeModal"
import { DeleteModalElement } from "../delete-modal-element/DeleteModalElement"

interface PropsRecipeCard{
    recipe:Recipe 
    onClickEdit:(recipe:Recipe) => void
    onClickDelete:(idRecipe:number) => void
}

export function RecipeCard({recipe, onClickEdit, onClickDelete}:PropsRecipeCard){
    const [modalEditOrViewRecipeOpen, setModalEditOrViewRecipeOpen] = useState<boolean>(false)
    const [modalDeleteRecipeState, setModalDeleteRecipeState] = useState<boolean>(false)
    const [viewMode, setViewMode] = useState<boolean>(false)
    const date = dayjs(recipe.dateRecipe).format('DD/MM/YYYY')

    const handleOnEdit = (recipe:Recipe) => {
        onClickEdit(recipe)
        setModalEditOrViewRecipeOpen(false)
    }

    return(
        <>
            <div className="content__data--item">
                <div className="recipe__item--title">
                    <h3 className="recipe--title">Receta</h3>
                    <i className="fa-solid fa-paw logo__image recipe--logo cursor_pointer" title="Detalle de receta" onClick={() => {setModalEditOrViewRecipeOpen(true); setViewMode(true)}}></i>
                </div>
                <div className="recipe__container">
                    <div className="recipe__items">
                        <div className="recipe__item recipe__item-date">
                            <label className="recipe__item--label">Fecha</label>
                            <p className="recipe__item--p">{date}</p>
                        </div>
                        <div className="recipe__item recipe__item-name">
                            <label className="recipe__item--label">Veterinario</label>
                            <p className="recipe__item--p">{recipe.nameVet}</p>
                        </div>
                    </div>
                    <div className="disease__item">
                        <div className="recipe__item--description__title">
                            <label className="recipe__item--label">Descripcion</label>
                        </div>
                        <p className="recipe__item--description recipe__item--p">{recipe.description}</p>
                    </div>
                    {AuthServiceManager.getIntance().isVet() &&
                        <div className="recipe__item--content__button">
                            <button className="fa-solid fa-pen recipe__item--button__icon" onClick={() => {setModalEditOrViewRecipeOpen(true); setViewMode(false)}}/>
                            <button className="fa-solid fa-trash recipe__item--button__icon" onClick={() => setModalDeleteRecipeState(true)}/>
                        </div>
                    }
                </div>
            </div>
            <RecipeModal 
                open={modalEditOrViewRecipeOpen}
                onClose={() => setModalEditOrViewRecipeOpen(false)}
                onConfirm={handleOnEdit}
                recipe={recipe}
                idRecipe={recipe.id}
                viewMode={viewMode}
            />
            <DeleteModalElement
                open={modalDeleteRecipeState}
                onClose={() => setModalDeleteRecipeState(false)}
                onConfirm={() => onClickDelete(recipe.id)}
                element="Receta"
            />
        </>
    )
}