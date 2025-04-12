import { parseISO } from 'date-fns'

//"Castea" el date a yyyy-MM-dd
export function castDate(date: Date) {
	const formatedDate = date.toISOString().split("T")[0]
	return formatedDate
}

//Instancia Date con libreria para luego acceder con metodos
export function calculateDate(date: string){
	const format = parseISO(date)
	return new Date(format)
}