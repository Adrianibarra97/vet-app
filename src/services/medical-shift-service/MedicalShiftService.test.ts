import dayjs from "dayjs"
import { FilterTurn } from "../../domain/Filterturn"
import { MedicalShiftServiceStub } from "./MedicalShiftServiceStub"
import { PetMedicalShiftDTO } from "../../domain/Pet"
import { MedicalShift } from "../../domain/MedicalShift"

describe('Medical Shift Service', () => {
	let service: MedicalShiftServiceStub

	beforeEach(()=> {
		service = new MedicalShiftServiceStub()
	})

	it('It should return all medical shifts when there is no active filter', async()=>{
		const resultMedicalShift = await service.getAllByFilter(new FilterTurn('',false,false))
		expect(resultMedicalShift.length).toBe(5)
	})

	it('You must filter the medical shifts by a specific date.',async()=>{
		const date = '2025-04-25'
		const resultMedicalShift = await service.getAllByFilter(new FilterTurn(date,false,false))
		expect(resultMedicalShift.length).toBe(1)
		expect(resultMedicalShift[0].date).toBe(date)
	})

	it("You must filter today's medical shifts if the filter is active.", async()=>{
		const today = dayjs().format('YYYY-MM-DD')

		const resultMedicalShift = await service.getAllByFilter(new FilterTurn("",true,false))
		expect(resultMedicalShift.length).toBe(1)
		expect(resultMedicalShift[0].date).toBe(today)
	})

	it("You must filter this week's medical shifts if the filter is active.",async()=>{
		const resultMedicalShift = await service.getAllByFilter(new FilterTurn('',false,true))
		expect(resultMedicalShift.length).toBe(2)
	})

	it("It should return medical shifts if all 3 filter fields are active.", async()=>{
		const today = dayjs().format('YYYY-MM-DD')

		const resultMedicalShift = await service.getAllByFilter(new FilterTurn(today,true,true))
		expect(resultMedicalShift.length).toBe(0)
	})

	it("It should return shifts if today's and this week's filter is active.", async()=>{
		const resultMedicalShift = await service.getAllByFilter(new FilterTurn('',true,true))
		expect(resultMedicalShift.length).toBe(0)
	})

	it("It should return medical shifts if the specific day and today filter is active.",async()=>{
		const today = dayjs().format("YYYY-MM-DD")

		const resultMedicalShift = await service.getAllByFilter(new FilterTurn(today,true,false))
		expect(resultMedicalShift.length).toBe(1)
	})

	it("It should return shifts if the specific day and this week filter is active",async()=>{
		const today = dayjs().format("YYYY-MM-DD")

		const resultMedicalShift = await service.getAllByFilter(new FilterTurn(today,false,true))
		expect(resultMedicalShift.length).toBe(0)
	})

	it("I should cancel an appointment when it is requested.", async()=>{
		await service.cancelMedicalShift(1)
		const resultMedicalShift = await service.getAll()
		expect(resultMedicalShift.length).toBe(4)
		expect(resultMedicalShift.some(shift => shift.id === 1)).toBe(false)
	})

	it("I should edit an existing medical shift.", async()=>{
		const updateMedicalShift = new MedicalShift(
			1,
			"Dr.Pedro Benitez",
			new PetMedicalShiftDTO(1,'Nala'),
			"2025-06-20",
			"20:00"
		)
		await service.editExistMedicalShift(updateMedicalShift)
		const resultMedicalShift = await service.getMedicalShiftById(1)
		expect(resultMedicalShift.nameVet).toBe('Dr.Pedro Benitez')
	})

	it("It should throw an error if a non-existent ID is entered when trying to edit a medical shift.", async()=>{
		const nonExistentMedicalShift = new MedicalShift(
			99,
			"Dr.Pedro Benitez",
			new PetMedicalShiftDTO(1,'Nala'),
			"2025-06-20",
			"20:00"
		)

		await expect(service.editExistMedicalShift(nonExistentMedicalShift)).rejects.toThrowError(`No se encontró un turno con el ID ${nonExistentMedicalShift.id}`)
	})

	it("I should create a new medical shift.", async()=>{
		const newMedicalShift = new MedicalShift(
			-1,
			"Dr.Fabio Dominguez",
			new PetMedicalShiftDTO(2,'Morena'),
			"2025-06-22",
			"15:30"
		)
		await service.createNewMedicalShift(newMedicalShift)
		const resultMedicalShift = await service.getAll()
		expect(resultMedicalShift.length).toBe(6)
		expect(resultMedicalShift[5].nameVet).toBe("Dr.Fabio Dominguez")
	})

})