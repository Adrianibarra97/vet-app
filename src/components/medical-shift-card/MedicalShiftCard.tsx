import { Card, CardContent, Typography, Box, Button } from '@mui/material'
import { MedicalShift } from '../../domain/MedicalShift'
import dayjs from 'dayjs'

interface MedicalShiftCardProps {
  medicalShift: MedicalShift
}

export default function MedicalShiftCard({
  medicalShift,
}: MedicalShiftCardProps) {
  const fecha = dayjs(medicalShift.date).format('DD/MM/YYYY')
  const convertirHora = (fechaString: string) => {
    return dayjs(fechaString).format('HH:mm')
  }
  return (
    <Card className="content__items">
      <Typography
        variant="h5"
        sx={{
          color: 'var(--footer-color)',
          textAlign: 'center',
          fontWeight: 'bold',
          WebkitTextStrokeColor: 'var(--font-color)',
          WebkitTextStrokeWidth: '0.5px',
        }}
      >
        CONSULTA
      </Typography>

      <CardContent>
        <Box sx={{  display: 'flex', justifyContent: 'space-around', alignItems: ' center',  }}
        >
          <Box
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, }}
          >
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.3em' }}>
              Veterinario
            </Typography>
            <Typography sx={{ fontSize: '0.8em' }}>
              {medicalShift.vetName}
            </Typography>
            <Typography  sx={{ fontWeight: 'bold', fontSize: '1.3em', marginTop: '0.7rem', }}
            >
              Fecha
            </Typography>
            <Typography sx={{ fontSize: '0.8em' }}>{fecha}</Typography>
          </Box>

          <Box
            sx={{ display: 'flex',flexDirection: 'column', alignItems: 'center', gap: 0.5,
            }}
          >
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.3em' }}>
              Paciente
            </Typography>
            <Typography sx={{ fontSize: '0.8em' }}>
              {' '}
              {medicalShift.petName}{' '}
            </Typography>
            <Typography
              sx={{ fontWeight: 'bold', fontSize: '1.3em', marginTop: '0.7rem',}}>
              Hora
            </Typography>
            <Typography sx={{ fontSize: '0.8em' }}>
              {convertirHora(medicalShift.date)}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            mt: 3,
          }}
        >
          <Button
            sx={{
              backgroundColor: 'var(--footer-color)',
              color: 'var(--header-color)',
              padding: '0.8rem',
              width: '6rem',
              height: '2.5rem',
              ':hover': {
                backgroundColor: 'var(--primary-color)',
              },
            }}
          >
            Editar
          </Button>

          <Button
            sx={{
              backgroundColor: 'var(--footer-color)',
              color: 'var(--header-color)',
              padding: '0.8rem',
              width: '6rem',
              height: ' 2.5rem',
              ':hover': {
                backgroundColor: 'var(--primary-color)',
              },
            }}
          >
            Cancelar
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
