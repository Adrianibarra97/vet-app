export class User {
    
    constructor(
        public id: number,
        public dni: number,
        public name: string,
        public surname: string,
        public email: string,
        public telephone: number,
        public adress: string,
        public username: string,
        public password: string,
    ) {}
}