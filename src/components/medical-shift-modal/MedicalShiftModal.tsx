import { useState } from "react"
import { MedicalShift } from "../../domain/MedicalShift"
import { Pet } from "../../domain/Pet"
import MedicalShiftServiceManager from "../../services/medical-shift-service/MedicalShiftServiceManager"
import PetServiceManager from "../../services/pet-service/PetServiceManager"
import { useOnInit } from "../../util/customHooks"
import dayjs, { Dayjs } from "dayjs"
import { SnackbarUtilities } from "../../util/snackbar/SnackbarManager"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Typography } from "@mui/material"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker'

interface MedicalShiftModalProps {
  open: boolean
  onClose: () => void
  onConfirm: (medicalShift: MedicalShift, idMedicalShift: number) => void
  idMedicalShift: number
}

export function MedicalShiftModal({open,onClose,onConfirm,idMedicalShift}: MedicalShiftModalProps) {
  const [medicalShift,setMedicalShift] = useState<MedicalShift>(new MedicalShift())
  const [vetPatients,setVetPatients] = useState<Pet[]>([])
  const [fromTouched, setFromTouched] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [date, setDate] = useState<Dayjs | null>(medicalShift.date?dayjs(medicalShift.date):null)
  const [time, setTime] = useState<Dayjs | null>(medicalShift.hour?dayjs(medicalShift.hour):null)

  const getMedicalShiftById = async () => {
    const medicalShiftToEdit = await  MedicalShiftServiceManager.getInstance().getMedicalShiftById(idMedicalShift)
    setMedicalShift(medicalShiftToEdit)
  }

  const getVetPatientsAll = async () => {
    const vetPatientsAll = await PetServiceManager.getIntance().getAll()
    setVetPatients(vetPatientsAll)
  }

  useOnInit(() => {
    if(idMedicalShift !== -1){
      getMedicalShiftById()
    }
    getVetPatientsAll()
  })

  const handleMedicalShiftCreationOrEdition = (name: keyof MedicalShift, value: string): void => {
    (medicalShift as unknown as Record<keyof MedicalShift, string | undefined>)[name] = value
    generateNewMedicalShift(medicalShift)
  }

  const handlePatientChange = (namePatient:string) =>{
    const newPatient = vetPatients.find((pet)=> `${pet.name}` === namePatient)
    medicalShift.assignPatient(newPatient!)
    generateNewMedicalShift(medicalShift)
  }

  const handleDateChange = (newDay:Dayjs | null) => {
    if(newDay && newDay.isValid()){
      setError(null)
      setDate(newDay)
      const dateFormat = newDay.format('YYYY-MM-DD')
      handleMedicalShiftCreationOrEdition('date',dateFormat)
    }else{
      setError('Por favor, seleccione un dia valido')
      setDate(dayjs(medicalShift.date))
    }
  }

  const handleTimeChange = (newTime: Dayjs | null) => {
    if (newTime && newTime.isValid()) {
      setError(null);
      const timeFormat = newTime.format('HH:mm')
      setTime(newTime);
      handleMedicalShiftCreationOrEdition('hour', timeFormat);
    } else {
      setError('Por favor, seleccione una hora válida');
      setTime(dayjs(medicalShift.hour));
    }
  };

  const generateNewMedicalShift = (medicalShift: MedicalShift) => {
    const newMedicalShift = Object.assign(new MedicalShift(), medicalShift)
    console.log(medicalShift.petMedicalShift)
    console.log(medicalShift.date)
    console.log(medicalShift.hour)
    setMedicalShift(newMedicalShift)
  }

  const handleOnConfirm = () => {
    setFromTouched(true)
    if (hasMissingRequiredFields()) {
      SnackbarUtilities.error('campos incompletos')
      return
    }
    onConfirm(medicalShift, medicalShift.id)
    setFromTouched(false)
    onClose()
  }

  const hasMissingRequiredFields = (): boolean => {
    const requiredFields: (keyof MedicalShift)[] = [
      'petMedicalShift',
      'date',
      'hour'
    ]
    return requiredFields.some((field) => !medicalShift[field])
  }

  const handleCancel = () => {
    setFromTouched(false)
    setError(null)
    setDate(null)
    onClose()
  }

  return(
    <Dialog onClose={handleCancel} open={open} fullWidth>
      <DialogTitle>
        <Typography variant="h6" sx={{color:'var(--footer-color)', fontWeight:'bold'}}>
          {idMedicalShift !== -1 ? 'Editar consulta' : 'Nueva consulta'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', flexWrap: 'wrap', width: '100%'}}>
          <FormControl fullWidth  margin="normal">
            <InputLabel>Paciente</InputLabel>
            <Select
              value={medicalShift.petMedicalShift ? medicalShift.petMedicalShift.name : ''}
              onChange={(event)=> handlePatientChange(event.target.value)}
              input={<OutlinedInput label="Paciente"/>}
            >
              {vetPatients.map(pet =>
                <MenuItem value={pet.name} key={pet.name}>{pet.name}</MenuItem>
              )}
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={date}
                label="Fecha"
                format="DD/MM/YYYY"
                onChange={handleDateChange}
                slotProps={{
                    textField: {
                        error: !!error,
                        helperText: error,
                        margin:'normal'
                    },
                }}
              />
              <TimePicker
                label="Hora"
                value={time}
                onChange={handleTimeChange}
                format="HH:mm" 
                slotProps={{
                  textField: {
                    error: !!error,
                    helperText: error,
                    margin:'normal'
                  },
                }}
              />
          </LocalizationProvider>
        </Box>
      </DialogContent>
      <DialogActions sx={{width:'100%', display:'flex',justifyContent:'space-around',alignItems:'center'}}>
          <Button
            variant="contained"
            onClick={handleCancel}
            sx={{ backgroundColor: 'var(--primary-color)' }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleOnConfirm}
            sx={{ backgroundColor: 'var(--footer-color)' }}
          >
            Confirmar
          </Button>
      </DialogActions>
    </Dialog>
  )
}
