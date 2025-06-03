import { render } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import { ButtonsModal } from './ButtonsModal'

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
  it('App smoke buttons modal', () => {
    render(
      <ButtonsModal
        confirLabel={''}
        cancelLabel={''}
        confirm={ mockOnConfirm }
        cancel={ mockOnClickCancel }
      />
    )
  })
})