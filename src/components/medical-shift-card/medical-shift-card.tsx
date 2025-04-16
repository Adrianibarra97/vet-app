import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Button,
} from '@mui/material'
import React from 'react'

export default function MedicalShiftCard() {
  return (
    <Card sx={{ maxWidth: '40rem', height: '20rem', margin: '2rem', borderRadius: '0.5rem', border: '1.5px solid var(--footer-color)',    boxShadow: '1.5px 1.5px 3px var(--footer-color)',
    }}>
      <CardHeader
        sx={{
          backgroundColor: 'var(--secondary-color)',
          Width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alingItems: 'center',
        }}
        title={
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
        }
      />

      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: ' center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.3em' }}>
              Veterinario
            </Typography>
            <Typography sx={{ fontSize: '0.8em' }}>Lucas Rodriguez</Typography>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '1.3em',
                marginTop: '0.7rem',
              }}
            >
              Fecha
            </Typography>
            <Typography sx={{ fontSize: '0.8em' }}>05/07/2025</Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.3em' }}>
              Paciente
            </Typography>
            <Typography sx={{ fontSize: '0.8em' }}> Morena </Typography>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '1.3em',
                marginTop: '0.7rem',
              }}
            >
              Hora
            </Typography>
            <Typography sx={{ fontSize: '0.8em' }}>13:00</Typography>
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
            ":hover": {
              backgroundColor: 'var(--primary-color)',
            }}}
          >
            Editar
          </Button>

          <Button
            sx={{
              backgroundColor: 'var(--footer-color)',
              color: 'var(--header-color)',
              padding: '0.8rem',
              width: '6rem',
              height:' 2.5rem',
           ":hover": {
              backgroundColor: 'var(--primary-color)',
            }}}
            >
            Cancelar
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
