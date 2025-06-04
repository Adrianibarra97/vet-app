import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { ProfileMenu } from './Profile-menu'
import { User } from '../../domain/User'
import { MemoryRouter } from 'react-router-dom'

const mockIsVet = vi.fn()
vi.mock('../../services/auth-service/AuthServiceManager', () => ({
  default: {
    getIntance: () => ({
      isVet: mockIsVet,
    }),
  },
}))

vi.mock('../profile-photo-modal/ProfilePhotoModal', () => ({
  ProfilePhotoModal: ({ open, onClose, onPhotoChange }: any) => (
    open ? (
      <div role="dialog">
        <button onClick={() => onPhotoChange('new-photo.jpg')}>Cambiar foto</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    ) : null
  )
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
      <a href={to}>{children}</a>
    ),
  }
})

describe('ProfileMenu', () => {
  const mockUser = new User(
    1,
    'testuser', 
    'password123', 
    'Test', 
    'User', 
    12345678, 
    'test@example.com', 
    '1234567890', 
    'test-photo.jpg', 
    'Test Address', 
    '1234', 
    'Test City', 
    'Test Province', 
    'Test Country', 
    'PETOWNER', 
    1, 
    1 
  )

  const mockOnPhotoChange = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    mockIsVet.mockReturnValue(false)
  })

  test('renders user avatar with photo', () => {
    render(
      <MemoryRouter>
        <ProfileMenu user={mockUser} onPhotoChange={mockOnPhotoChange} />
      </MemoryRouter>
    )

    const avatar = screen.getByAltText('Foto de perfil')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', 'test-photo.jpg')
  })

  test('renders photo change button', () => {
    render(
      <MemoryRouter>
        <ProfileMenu user={mockUser} onPhotoChange={mockOnPhotoChange} />
      </MemoryRouter>
    )

    const photoButton = screen.getByRole('button')
    expect(photoButton).toBeInTheDocument()
  })

  test('renders navigation links', () => {
    render(
      <MemoryRouter>
        <ProfileMenu user={mockUser} onPhotoChange={mockOnPhotoChange} />
      </MemoryRouter>
    )

    expect(screen.getByText('Perfil')).toBeInTheDocument()
    expect(screen.getByText('Notificaciones')).toBeInTheDocument()
  })

  test('opens photo modal when clicking photo button', async () => {
    render(
      <MemoryRouter>
        <ProfileMenu user={mockUser} onPhotoChange={mockOnPhotoChange} />
      </MemoryRouter>
    )

    const photoButton = screen.getByRole('button')
    await userEvent.click(photoButton)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  test('calls onPhotoChange when changing photo in modal', async () => {
    render(
      <MemoryRouter>
        <ProfileMenu user={mockUser} onPhotoChange={mockOnPhotoChange} />
      </MemoryRouter>
    )

    const photoButton = screen.getByRole('button')
    await userEvent.click(photoButton)

    const changePhotoButton = screen.getByText('Cambiar foto')
    await userEvent.click(changePhotoButton)

    expect(mockOnPhotoChange).toHaveBeenCalledWith('new-photo.jpg')
  })

  test('closes modal when clicking close button', async () => {
    render(
      <MemoryRouter>
        <ProfileMenu user={mockUser} onPhotoChange={mockOnPhotoChange} />
      </MemoryRouter>
    )

    const photoButton = screen.getByRole('button')
    await userEvent.click(photoButton)

    expect(screen.getByRole('dialog')).toBeInTheDocument()

    const closeButton = screen.getByText('Cerrar')
    await userEvent.click(closeButton)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('renders navigation links with correct paths', () => {
    render(
      <MemoryRouter>
        <ProfileMenu user={mockUser} onPhotoChange={mockOnPhotoChange} />
      </MemoryRouter>
    )

    const profileLink = screen.getByText('Perfil')
    const notificationsLink = screen.getByText('Notificaciones')

    expect(profileLink).toHaveAttribute('href', '/profile')
    expect(notificationsLink).toHaveAttribute('href', '/profile/notifications')
  })
})   
