import { render, screen } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import { PetCard } from './PetCard'
import { PetServiceStub } from '../../services/pet-service/PetServiceStub'
import userEvent from '@testing-library/user-event'

// Services
const service = new PetServiceStub()

// Pets
const pet = await service.getPetById(1)

// Mocks
const mockOnStartUpdate = vi.fn()
const mockOnHandleDelete = vi.fn()

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn().mockReturnValue(vi.fn())
}))

describe('Pet Card', () => {
  it('We tested the update button for a pet.', async () => {
    render(
      <PetCard
        pet={ pet }
        startUpdate={ mockOnStartUpdate }
        handleDelete={ mockOnHandleDelete } 
      />
    )
    const updateButtons = screen.getByTestId('update')
    await userEvent.click(updateButtons)
    expect(mockOnStartUpdate).toHaveBeenCalledWith(1)
  })
})