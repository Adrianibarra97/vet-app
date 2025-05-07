import { Disease, DiseaseJSON } from "../../domain/Disease";
import { DiseaseServiceInter } from "./DiseaseServiceInter";

export class DiseaseServiceStub implements DiseaseServiceInter{

    private object:DiseaseJSON[] = [
        {
            id:0,
            name:'Rabia',
            description:'Se noto que le agarro rabica',
            petId:0
        },
        {
            id:1,
            name:'Moquillo',
            description:'Se noto que le agarro moquillo',
            petId:1
        },
        {
            id:2,
            name:'Parasitos',
            description:'Se noto que le agarro parasitos',
            petId:2
        },
        {
            id:3,
            name:'Hepatitis infecciosa canina',
            description:'Se noto que le agarro hepatitis infecciosa canina',
            petId:3
        },
        {
            id:4,
            name:'Leptospirosis',
            description:'Se noto que le agarro leptospirosis',
            petId:4
        },
        {
            id:5,
            name:'Parvovirosis',
            description:'Se noto que le agarro parvovirosis',
            petId:5
        },
        {
            id:6,
            name:'Parainfluenza',
            description:'Se noto que le agarro parainfluenza',
            petId:6
        },
        {
            id:7,
            name:'Adenovirus',
            description:'Se noto que le agarro adenovirus',
            petId:7
        },
        {
            id:8,
            name:'Leishmaniosis',
            description:'Se noto que le agarro leishmaniosis',
            petId:8
        },
        {
            id:9,
            name:'Bordetelosis',
            description:'Se noto que le agarro bordetelosis',
            petId:9
        },
        {
            id:10,
            name:'Sarna',
            description:'Se noto que le agarro sarna',
            petId:10
        }
    ]

    async getAll(): Promise<Disease[]> {
        return this.object.map((diseaseJSON:DiseaseJSON)=> Disease.fromJSON(diseaseJSON))
    }

    async getDiseaseById(idDisease: number): Promise<Disease> {
        const diseaseJSON: DiseaseJSON = this.object[idDisease - 1]
        return Disease.fromJSON(diseaseJSON)
    }

    async getDiseaseByPetId(idPet: number): Promise<Disease[]> {
        const diseasesJSON:DiseaseJSON[] = this.object.filter((disease)=> disease.petId === idPet)
        return diseasesJSON.map((diseaseJSON:DiseaseJSON)=>Disease.fromJSON(diseaseJSON))
    }

    async createNewDisease(disease:Disease): Promise<void> {
        const newId = this.object.length > 0 ?
            Math.max(...this.object.map(disease => disease.id)) + 1 
            : 1

        const newDiseaseJSON : DiseaseJSON = {
            ...disease,
            id:newId
        }

        this.object.push(newDiseaseJSON)
    }

    async editExistDisease(disease: Disease): Promise<void> {
        const index = this.object.findIndex(diseaseJSON => diseaseJSON.id === disease.id)
        if (index === -1){
            throw new Error(`No se encontro la enfermedad con el id:${disease.id}`)
        }

        this.object[index] = {
            ...this.object[index],
            ...disease,
            id:disease.id
        }
    }

    async deleteExistDiseaseById(idDisease: number): Promise<void> {
        this.object = this.object.filter(disease => disease.id !== idDisease)
    }
}