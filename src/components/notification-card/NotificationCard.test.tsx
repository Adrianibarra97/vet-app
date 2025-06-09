import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { NotificationCard } from './NotificationCard'
import { NotificationModel } from '../../domain/Notification'
import { MemoryRouter } from 'react-router-dom'

const mockOnToggleExpand = vi.fn()

const mockIsVet = vi.fn()
vi.mock('../../services/auth-service/AuthServiceManager', () => ({
  default: {
    getIntance: () => ({
      isVet: mockIsVet,
    }),
  },
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    MemoryRouter: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  }
})

describe('NotificationCard', () => {
  const baseNotification = new NotificationModel(
    1,
    'SHIFT_REMINDER',
    'Reminder for Owie',
    new Date().toISOString(),
    true,
    'Owie',
    'Tamara',
    'Lucas Cejas',
    '2025-06-06',
    '12:00',
    'Shift reminder'
  )

  beforeEach(() => {
    vi.clearAllMocks()
    mockIsVet.mockReturnValue(true)
  })

  test('renders notification with correct content', () => {
    render(
      <MemoryRouter>
        <NotificationCard notification={baseNotification} />
      </MemoryRouter>
    )

    expect(screen.getByText(/Recordatorio de turno para Owie/i)).toBeInTheDocument()
    expect(screen.getByText(/Owie/i)).toBeInTheDocument()
  })

  test('renders system notification with correct content', () => {
    const systemNotification = new NotificationModel(
      2,
      'system',
      'System notification',
      new Date().toISOString(),
      false,
      'N/A',
      'Tamara',
      'System',
      new Date().toISOString().split('T')[0],
      '',
      'System message'
    )

    render(
      <MemoryRouter>
        <NotificationCard notification={systemNotification} />
      </MemoryRouter>
    )

    expect(screen.getByText(/Tenés turnos para hoy/i)).toBeInTheDocument()
    expect(screen.getByText(/Ver turnos/i)).toBeInTheDocument()
  })

  test('expands and collapses notification details', async () => {
    render(
      <MemoryRouter>
        <NotificationCard 
          notification={baseNotification} 
          onToggleExpand={mockOnToggleExpand}
          expanded={false}
        />
      </MemoryRouter>
    )

    const expandButton = screen.getByRole('button')
    await userEvent.click(expandButton)
    expect(mockOnToggleExpand).toHaveBeenCalled()
  })

  test('does not render for unallowed vet type', () => {
    const vaccineNotification = new NotificationModel(
      3,
      'vaccine',
      'Vaccine alert',
      new Date().toISOString(),
      false,
      'Burpee',
      'Tamara',
      'Lucas Cejas',
      '2025-06-10',
      '10:00',
      'Vaccination reminder'
    )

    const { container } = render(
      <MemoryRouter>
        <NotificationCard notification={vaccineNotification} />
      </MemoryRouter>
    )

    expect(container.firstChild).toBeNull()
  })
})
