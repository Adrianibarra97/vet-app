import { Vet } from "../../domain/Vet"

export interface VetServiceInter {
  getAll(): Promise<Vet[]>
  getOneById(id: number): Promise<Vet>
  create(vet: Vet): Promise<void>
  update(vet: Vet): Promise<void>
  delete(id: number): Promise<void>
}
