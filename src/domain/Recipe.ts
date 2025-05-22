export type RecipeJSON = {
	id: number,
	nameVet: string,
	description: string,
	dateRecipe: string,
	medicalHistoryId?:number//Lo agrego para poder utilizar el stub
}

export class Recipe {
	constructor(
		public id: number = -1,
		public nameVet: string = "",
		public description: string = "",
		public dateRecipe: string = "",
		public medicalHistoryId?:number//Lo agrego para poder utilizar el stub
	) {}

	static fromJSON(recipeJSON:RecipeJSON):Recipe{
		return new Recipe(
			recipeJSON.id,
			recipeJSON.nameVet,
			recipeJSON.description,
			recipeJSON.dateRecipe,
			recipeJSON.medicalHistoryId
		)
	}

	toJSON(): RecipeJSON {
		return {
			id: this.id,
			nameVet: this.nameVet,
			description: this.description,
			dateRecipe: this.dateRecipe,
			medicalHistoryId:this.medicalHistoryId
		}
	}
}