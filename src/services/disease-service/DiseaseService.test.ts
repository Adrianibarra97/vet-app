import { describe, it, expect, beforeEach } from 'vitest'
import { DiseaseServiceStub } from './DiseaseServiceStub'
import { Disease } from '../../domain/Disease'

describe('DiseaseServiceStub', () => {
    let service: DiseaseServiceStub

    beforeEach(() => {
        service = new DiseaseServiceStub()
    })

    it('Should return all diseases', async () => {
        const diseases = await service.getAll()
        expect(diseases.length).toBe(11)
        expect(diseases[0]).toBeInstanceOf(Disease)
        expect(diseases[0].type).toBe('ASTHMA')
        expect(diseases[1].type).toBe('DIABETES')
    })

    it('Should return disease by id', async () => {
        const disease = await service.getDiseaseById(2)
        expect(disease).toBeInstanceOf(Disease)
        expect(disease.type).toBe('DIABETES')
        expect(disease.id).toBe(1)
    })

    it('Should return diseases by medicalHistoryId', async () => {
        const diseases = await service.getDiseasesByMedicalHistoryId(3)
        expect(diseases.length).toBe(1)
        expect(diseases[0].type).toBe('PARVOVIRUS')
        expect(diseases[0].medicalHistoryId).toBe(3)
    })

	it('Should return empty array when no diseases for medicalHistoryId', async () => {
		const diseases = await service.getDiseasesByMedicalHistoryId(999)
		expect(diseases.length).toBe(0)
	})

    it('Should create a new disease', async () => {
        const newDisease = new Disease(
            -1, 
            'RABIES',
            'Observación de rabia',
            false,
            '2025-06-01',
            'Critical',
            3
        )
        await service.createNewDisease(newDisease, 3)
        const diseases = await service.getAll()
        expect(diseases.length).toBe(12)
        const created = diseases.find(d => d.id === 11)
        expect(created).toBeDefined()
        expect(created?.medicalHistoryId).toBe(3)
        expect(created?.isActive).toBe(true)
    })

    it('Should edit an existing disease', async () => {
        const disease = await service.getDiseaseById(1)
        disease.observation = 'Updated observation'
        await service.editExistDisease(disease, 0)
        const updated = await service.getDiseaseById(1)
        expect(updated.observation).toBe('Updated observation')
    })

    it('Should throw when editing non-existent disease', async () => {
        const fakeDisease = new Disease(
            999, 'FAKE', 'none', false, '2025-01-01', 'Stable', 0
        )
        await expect(service.editExistDisease(fakeDisease, 0)).rejects.toThrow(/No se encontro la enfermedad/)
    })

    it('Should delete an existing disease', async () => {
        await service.deleteExistDiseaseById(1)
        const diseases = await service.getAll()
        expect(diseases.length).toBe(10)
        expect(diseases.find(d => d.id === 1)).toBeUndefined()
    })

    it('Should do nothing when deleting non-existent disease', async () => {
        await service.deleteExistDiseaseById(999)
        const diseases = await service.getAll()
        expect(diseases.length).toBe(11)
    })
})