import { Pet } from "./Pet";
import { User } from "./User";

export class MedicalHistory {

    constructor(
        public id: number,
        public pet: Pet,
        public vet: User,
        public notes: string
    ) {}
}