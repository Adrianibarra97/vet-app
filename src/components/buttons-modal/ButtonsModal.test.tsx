import { render, screen } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import { ButtonsModal } from './ButtonsModal'
import userEvent from '@testing-library/user-event'

// Mocks
const mockOnClickCancel = vi.fn()
const mockOnConfirm = vi.fn()

vi.mock('@mui/material/Button', () => ({
  default: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>
}))

vi.mock('@mui/material/styles', () => ({
  styled: () => (props: any) => <div {...props} />,
  ThemeProvider: ({ children }: any) => <>{children}</>,
  createTheme: () => ({}),
}))

describe('Buttons Modal', () => {
  it('App smoke buttons modal', async () => {
    render(
      <ButtonsModal
        confirLabel={''}
        cancelLabel={''}
        confirm={ mockOnConfirm }
        cancel={ mockOnClickCancel }
      />
    )
    const button = screen.getByTestId('cancel')
    await userEvent.click(button)
    expect(mockOnClickCancel)
  })
})