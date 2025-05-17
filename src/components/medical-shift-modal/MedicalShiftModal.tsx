import { useEffect, useState } from "react"
import { MedicalShift } from "../../domain/MedicalShift"
import { Pet } from "../../domain/Pet"
import PetServiceManager from "../../services/pet-service/PetServiceManager"
import { useOnInit } from "../../util/customHooks"
import dayjs, { Dayjs } from "dayjs"
import { SnackbarUtilities } from "../../util/snackbar/SnackbarManager"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { formContainer } from "./MedicalShiftModalStyle"
import { PetFilterValues } from "../../domain/PetFilterValues"
import customParseFormat from 'dayjs/plugin/customParseFormat'
import MedicalShiftServiceManager from "../../services/medical-shift-service/MedicalShiftServiceManager"

interface MedicalShiftModalProps {
  open: boolean
  onClose: () => void
  onConfirm: (medicalShift: MedicalShift, idMedicalShift: number) => void
  medicalShift?:MedicalShift
  idMedicalShift: number
}

export function MedicalShiftModal({open,onClose,onConfirm,medicalShift:initialMedicalShift,idMedicalShift}: MedicalShiftModalProps) {
  const [medicalShift,setMedicalShift] = useState<MedicalShift>(initialMedicalShift || new MedicalShift())
  const [vetPatients,setVetPatients] = useState<Pet[]>([])
  const [fromTouched, setFromTouched] = useState(false)
  const [errors, setErrors] = useState({
    date: null as string | null,
    hour: null as string | null
  })
  const [date, setDate] = useState<Dayjs | null>(initialMedicalShift?.date ? dayjs(initialMedicalShift.date) : null)
  const [time, setTime] = useState<Dayjs | null>(initialMedicalShift?.hour ? dayjs(initialMedicalShift.hour) : null)

  const getVetPatientsAll = async () => {
    const filterPetBlanck = new PetFilterValues("",false,false)
    const vetPatientsAll = await PetServiceManager.getIntance().getAllByFilter(filterPetBlanck)
    setVetPatients(vetPatientsAll)
  }

  useOnInit(() => {
    cleanStates()
    getVetPatientsAll()
  })

  dayjs.extend(customParseFormat)

  useEffect(() => {
    if (initialMedicalShift) {
      setMedicalShift(Object.assign(new MedicalShift(),initialMedicalShift))
      setDate(initialMedicalShift.date ? dayjs(initialMedicalShift.date, "YYYY-MM-DD") : null)
      setTime(initialMedicalShift.hour ? dayjs(initialMedicalShift.hour, "HH:mm") : null)
    } else if (idMedicalShift === -1) { 
      setMedicalShift(new MedicalShift())
      setDate(null)
      setTime(null)
    }
  }, [initialMedicalShift, open,idMedicalShift])

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
      setErrors({...errors, date:null})
      setDate(newDay)
      const dateFormat = newDay.format('YYYY-MM-DD')
      handleMedicalShiftCreationOrEdition('date',dateFormat)
    }else{
      if(!newDay?.isValid()){
        setErrors({...errors, date: 'Por favor, seleccione un dia valido'})
      }else{
        setErrors({...errors, date: 'Por favor, ingrese un dia de consulta'})
      }
      setDate(dayjs(medicalShift.date))
    }
  }

  const handleTimeChange = (newTime: Dayjs | null) => {
    if (newTime && newTime.isValid()) {
      setErrors({...errors, hour:null})
      setTime(newTime)
      const timeFormat = newTime.format('HH:mm')
      handleMedicalShiftCreationOrEdition('hour', timeFormat)
    } else {
      if(!newTime?.isValid()){
        setErrors({...errors, hour: 'Por favor, seleccione una hora valida'})
      }else{
        setErrors({...errors, hour: 'Por favor, ingrese una hora de consulta'})
      }
      setTime(dayjs(medicalShift.hour))
    }
  }

  const generateNewMedicalShift = (medicalShift: MedicalShift) => {
    const newMedicalShift = Object.assign(new MedicalShift(), medicalShift)
    setMedicalShift(newMedicalShift)
  }

  const handleOnConfirm = () => {
    setFromTouched(true)
    if (hasMissingRequiredFields()) {
      SnackbarUtilities.error('campos incompletos')
      return
    }
    onConfirm(medicalShift, medicalShift.id)
    cleanStates()
    onClose()
  }

  const hasMissingRequiredFields = (): boolean => {
    const requiredFields: (keyof MedicalShift)[] = ['petMedicalShift','date','hour']

    if(MedicalShiftServiceManager.useStub){
      requiredFields.unshift('nameVet')
    }

    return requiredFields.some((field) => !medicalShift[field])
  }

  const handleCancel = () => {
    cleanStates()
    onClose()
  }

  const cleanStates = () => {
    if (idMedicalShift === -1) {
      setMedicalShift(new MedicalShift())
      setDate(null)
      setTime(null)
    } else if (initialMedicalShift){
      setMedicalShift(Object.assign(new MedicalShift(),initialMedicalShift))
      setDate(initialMedicalShift.date ? dayjs(initialMedicalShift.date, "YYYY-MM-DD") : null)
      setTime(initialMedicalShift.hour ? dayjs(initialMedicalShift.hour, "HH:mm") : null)
    }
    setErrors({...errors, hour:null, date:null})
    setFromTouched(false)
  }

  return(
    <Dialog onClose={handleCancel} open={open} fullWidth sx={{maxHeight:'90vh', overflow:'auto'}}>
      <DialogTitle component="div">
        <Typography variant="h6" sx={{color:'var(--footer-color)', fontWeight:'bold'}}>
          {idMedicalShift !== -1 ? 'Editar consulta' : 'Nueva consulta'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box component='form' sx={formContainer}>
          {MedicalShiftServiceManager.useStub && idMedicalShift === -1 && (
              <TextField
                label="Nombre de Veterinario"
                fullWidth
                margin="normal"
                color="primary"
                name="vetName"
                required
                value={medicalShift.nameVet}
                onChange={(event) =>
                  handleMedicalShiftCreationOrEdition('nameVet', event.target.value)
                }
                error={fromTouched && !medicalShift.nameVet}
                helperText={
                  fromTouched && !medicalShift.nameVet ? (
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography color="red">
                        El veterinario es obligatorio
                      </Typography>
                    </Box>
                  ) : (
                    ''
                  )
                }
                sx={{overflow:'visible'}}
              />
            )
          }
          <FormControl fullWidth  margin="normal" error={fromTouched && !medicalShift.petMedicalShift} required sx={{overflow:'visible'}}>
            <InputLabel color={fromTouched && !medicalShift.petMedicalShift ? "error" : "primary"}>Paciente</InputLabel>
            <Select
              value={medicalShift.petMedicalShift ? medicalShift.petMedicalShift.name : ''}
              onChange={(event)=> handlePatientChange(event.target.value)}
              input={<OutlinedInput label="Paciente"/>}
            >
              {vetPatients.map(pet =>
                <MenuItem value={pet.name} key={pet.name}>{pet.name}</MenuItem>
              )}
            </Select>
            {fromTouched && !medicalShift.petMedicalShift && (
              <Box display="flex" alignItems="center" gap={1}  >
                <Typography color="red">El paciente es obligatorio</Typography>
              </Box>
            )}
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={date}
              label="Fecha"
              format="DD/MM/YYYY"
              onChange={handleDateChange}
              slotProps={{
                  textField: {
                      error: !!errors.date,
                      helperText: errors.date,
                      margin:'normal',
                      required: true,
                      fullWidth:true,
                  },
              }}
              sx={{overflow:'visible'}}
            />
            <TimePicker
              label="Hora"
              value={time}
              onChange={handleTimeChange}
              format="HH:mm" 
              slotProps={{
                textField: {
                  error: !!errors.hour,
                  helperText: errors.hour,
                  margin:'normal',
                  required: true,
                  fullWidth:true
                },
              }}
              sx={{overflow:'visible'}}
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
