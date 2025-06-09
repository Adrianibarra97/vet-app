import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { MedicalShiftGrid } from './MedicalShiftGrid';
import { MedicalShiftServiceStub } from '../../services/medical-shift-service/MedicalShiftServiceStub';

// Crear una instancia del stub
const medicalShiftServiceStub = new MedicalShiftServiceStub();

// Mock de las funciones de callback
const mockOnClickCancel = vi.fn();
const mockOnEditOrCreate = vi.fn();

// Obtener los datos del stub (puedes hacerlo async o sync dependiendo de tu necesidad)
const mockMedicalShifts = await medicalShiftServiceStub.getAll();

vi.mock('@mui/material/IconButton', () => ({
  default: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>
}));

vi.mock('@mui/material/styles', () => ({
  styled: () => (props: any) => <div {...props} />,
  ThemeProvider: ({ children }: any) => <>{children}</>,
  createTheme: () => ({}),
}));

vi.mock('../../services/auth-service/AuthServiceManager', () => ({
  default: {
    getIntance: () => ({
      isVet: () => true,
    }),
  },
}));

vi.mock('../medical-shift-modal/MedicalShiftModal', () => ({
  MedicalShiftModal: ({ open }: any) => (
    open ? <div role="dialog">Modal Content</div> : null
  ),
}));

vi.mock('../medical-shift-card/MedicalShiftCard', () => ({
  default: ({ medicalShift, onClickCancel, onClickEdit }: any) => (
    <div>
      <div>{medicalShift.nameVet}</div>
      <div>{medicalShift.petMedicalShift.name}</div>
      <button onClick={() => onClickCancel(medicalShift.id)}>Cancelar</button>
      <button onClick={() => onClickEdit(medicalShift, medicalShift.id)}>Editar</button>
    </div>
  ),
}));

describe('MedicalShiftGrid', () => {
  test('renders medical shifts from stub data', async () => {
    render(
      <MedicalShiftGrid 
        medicalShifts={mockMedicalShifts}
        onClickCancel={mockOnClickCancel}
        onEditOrCreateMedicalShift={mockOnEditOrCreate}
      />
    );

    expect(screen.getByText('Nala')).toBeInTheDocument();
    expect(screen.getByText('Dr. Juan Perez')).toBeInTheDocument();
    expect(screen.getByText('Morena')).toBeInTheDocument();
    expect(screen.getByText('Dr. Maria Lopez')).toBeInTheDocument();
  });

  test('shows empty state message when no shifts available', async () => {
    render(
      <MedicalShiftGrid 
        medicalShifts={[]}
        onClickCancel={mockOnClickCancel}
        onEditOrCreateMedicalShift={mockOnEditOrCreate}
      />
    );
    expect(screen.getByText('No hay información para mostrar!')).toBeInTheDocument();
  });

  test('opens modal when clicking new consultation button', async () => {
    render(
      <MedicalShiftGrid 
        medicalShifts={mockMedicalShifts}
        onClickCancel={mockOnClickCancel}
        onEditOrCreateMedicalShift={mockOnEditOrCreate}
      />
    );

    await userEvent.click(screen.getByText('+ Nueva Consulta'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('cancels an existing shift', async () => {
    render(
      <MedicalShiftGrid 
        medicalShifts={mockMedicalShifts}
        onClickCancel={mockOnClickCancel}
        onEditOrCreateMedicalShift={mockOnEditOrCreate}
      />
    );

    const cancelButtons = screen.getAllByRole('button', { name: /cancelar/i });
    await userEvent.click(cancelButtons[0]);
    expect(mockOnClickCancel).toHaveBeenCalledWith(1);
  });
});