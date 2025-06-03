import { render, screen } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import { PetServiceStub } from '../../services/pet-service/PetServiceStub'
import { PetModal } from './PetModal'
import userEvent from '@testing-library/user-event'


// Services
const service = new PetServiceStub()

// Pets
const pet = await service.getPetById(1)

// Mocks
const mockOnClose= vi.fn()
const mockOnCleanFilter = vi.fn()

vi.mock('@mui/material/Button', () => ({
  default: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>
}))

vi.mock('@mui/material/styles', () => ({
  styled: () => (props: any) => <div {...props} />,
  ThemeProvider: ({ children }: any) => <>{children}</>,
  createTheme: () => ({}),
}))

vi.mock('../form-control-modal-date/FormControlModalDate', () => ({
  FormControlModalDate: ({ open }: any) => (
    open ? <input value={ 'fecha' }/> : null
  ),
}))

describe('Pet Modal', () => {
  it('App smoke pet modal', async () => {
    render(
      <PetModal
        open={ true }
        pet={ pet }
        onClose={ mockOnClose }
        cleanFilter={ mockOnCleanFilter }
      />
    )
    await userEvent.click(screen.getByTestId('cancel'))
    expect(mockOnClose).toHaveBeenCalledWith()
  })
})