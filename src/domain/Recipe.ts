export type RecipeJSON = {
	id: number,
	vet: string,
	description: string,
	date: string,
	medicalHistoryId?:number//Lo agrego para poder utilizar el stub
}

export class Recipe {
	constructor(
		public id: number = -1,
		public vet: string = "",
		public description: string = "",
		public date: string = "",
		public medicalHistoryId?:number//Lo agrego para poder utilizar el stub
	) {}

	static fromJSON(recipeJSON:RecipeJSON):Recipe{
		return new Recipe(
			recipeJSON.id,
			recipeJSON.vet,
			recipeJSON.description,
			recipeJSON.date,
			recipeJSON.medicalHistoryId
		)
	}

	toJSON(): RecipeJSON {
		return {
			id: this.id,
			vet: this.vet,
			description: this.description,
			date: this.date,
			medicalHistoryId:this.medicalHistoryId
		}
	}
}