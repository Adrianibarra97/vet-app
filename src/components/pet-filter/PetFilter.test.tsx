import { render } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import { PetFilter } from './PetFilter'
import { Filter } from '../../domain/Filter'


// Mocks
const filterFunction = vi.fn()

const filter: Filter = new Filter(
		'Nombre',
		'text',
		'Con turno',
		'checkbox',
		'Vac. Pen',
		'checkbox',
	)

describe('Pet Filter', () => {
	it('App smoke pet filter', () => {
		render(
			<PetFilter
				filter={ filter }
				filterFunction={ filterFunction } 
			/>
		)
	})
})