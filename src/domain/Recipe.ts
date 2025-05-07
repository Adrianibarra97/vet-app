export type RecipeJSON = {
	id: number,
	vet: string,
	description: string,
	date: string
}

export class Recipe {
	constructor(
		public id: number = -1,
		public vet: string = "",
		public description: string = "",
		public date: string = ""
	) {}

	static fromJSON(recipeJSON:RecipeJSON):Recipe{
		return new Recipe(
			recipeJSON.id,
			recipeJSON.vet,
			recipeJSON.description,
			recipeJSON.date
		)
	}

	toJSON(): RecipeJSON {
		return {
			id: this.id,
			vet: this.vet,
			description: this.description,
			date: this.date
		}
	}
}