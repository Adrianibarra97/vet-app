import { Pet } from "./Pet";
import { User } from "./User";

export class MedicalShift {
    
    constructor(
        public id: number,
        public vet: User,
        public patient: Pet,
        public date: Date,
        public hour: Date
    ) {}
}