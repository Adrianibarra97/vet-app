import { describe, it, expect, beforeEach } from 'vitest'
import { RecipeServiceStub } from './RecipeServiceStub'
import { Recipe } from '../../domain/Recipe'

describe('RecipeServiceStub', () => {
	let service: RecipeServiceStub

	beforeEach(() => {
		service = new RecipeServiceStub()
	})

	it('Should return all recipes', async () => {
		const recipes = await service.getAll()
		expect(recipes.length).toBe(6)
		expect(recipes[0]).toBeInstanceOf(Recipe)
		expect(recipes[0].nameVet).toBe('Ezequiel')
		expect(recipes[1].nameVet).toBe('Adrian')
	})

	it('Should return recipe by id', async () => {
		const recipe = await service.getRecipeById(2)
		expect(recipe).toBeInstanceOf(Recipe)
		expect(recipe.nameVet).toBe('Adrian')
		expect(recipe.id).toBe(1)
	})

	it('Should return recipes by medicalHistoryId', async () => {
		const recipes = await service.getRecipesByMedicalHistoryId(3)
		expect(recipes.length).toBe(1)
		expect(recipes[0].nameVet).toBe('Carolina')
		expect(recipes[0].medicalHistoryId).toBe(3)
	})

	it('Should return empty array when no recipes for medicalHistoryId', async () => {
		const recipes = await service.getRecipesByMedicalHistoryId(999)
		expect(recipes.length).toBe(0)
	})

	it('Should create a new recipe', async () => {
		const newRecipe = new Recipe(
			-1, 
			'Juan',
			'Nueva receta para la mascota',
			'2025-06-10',
			2
		)
		await service.createNewRecipe(newRecipe, 2)
		const recipes = await service.getAll()
		expect(recipes.length).toBe(7)
		const created = recipes.find(r => r.id === 6)
		expect(created).toBeDefined()
		expect(created?.medicalHistoryId).toBe(2)
	})

	it('Should edit an existing recipe', async () => {
		const recipe = await service.getRecipeById(1)
		recipe.description = 'Descripción actualizada'
		await service.editExistRecipe(recipe, 0)
		const updated = await service.getRecipeById(1)
		expect(updated.description).toBe('Descripción actualizada')
	})

	it('Should throw when editing non-existent recipe', async () => {
		const fakeRecipe = new Recipe(
			999, 'FakeVet', 'none', '2025-01-01', 0
		)
		await expect(service.editExistRecipe(fakeRecipe, 0)).rejects.toThrow(/No se encontro la receta/)
	})

	it('Should delete an existing recipe', async () => {
		await service.deleteExistRecipe(1)
		const recipes = await service.getAll()
		expect(recipes.length).toBe(5)
		expect(recipes.find(r => r.id === 1)).toBeUndefined()
	})

	it('Should do nothing when deleting non-existent recipe', async () => {
		await service.deleteExistRecipe(999)
		const recipes = await service.getAll()
		expect(recipes.length).toBe(6)
	})
})