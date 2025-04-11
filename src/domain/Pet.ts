export class Pet {
    
    constructor(
        public id: number,
        public name: string,
        public breed: string,
        public age: number,
        public weight: number,
        public sterilized: boolean,
        public photo: string,
        public sex: string,
        public birth: Date,
        public specie: string,
    ) {}
}