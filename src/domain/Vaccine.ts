export class Vaccine {
    
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public batchNumber: number,
        public expirationDate: Date,
        public aplicationDate: Date,
    ) {}
}