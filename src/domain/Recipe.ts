import { Pet } from "./Pet";

export class Recipe {
    
    constructor(
        public id: number,
        public vet: Pet,
        public description: string,
        public date: Date
    ) {}
}