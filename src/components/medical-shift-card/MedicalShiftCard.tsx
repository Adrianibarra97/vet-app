import { Card, CardContent, Typography, Box, Button } from '@mui/material'
import { MedicalShift } from '../../domain/MedicalShift'
import dayjs from 'dayjs'
import './MedicalShiftCard.css'
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
      <h4 className="content__items--title" >
        CONSULTA
      </h4>

      <CardContent className="content__items--data">
        <Box className="content__item">
          <Box className="content__item--data">
            <Typography className="item--label">Veterinario</Typography>
            <Typography className="item-data">
              {medicalShift.vetName}
            </Typography>
          </Box>
          <Box className="content__item--data">
            <Typography className="item--label">Paciente</Typography>
            <Typography className="item-data">
              {medicalShift.petName}
            </Typography>
          </Box>
        </Box>

        <Box className="content__item">
          <Box className="content__item--data">
            <Typography className="item--label">Fecha</Typography>
            <Typography className="item-data">{fecha}</Typography>
          </Box>
          <Box className="content__item--data">
            <Typography className="item--label">Hora</Typography>
            <Typography className="item-data">
              {convertirHora(medicalShift.date)}
            </Typography>
          </Box>
        </Box>

        <Box className="content__item--button">
          <Button className="content__button content__button--edit">
            Editar
          </Button>

          <Button className="content__button content__button--cancel">
            Cancelar
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
