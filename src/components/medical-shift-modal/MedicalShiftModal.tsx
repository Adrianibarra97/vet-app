import { useEffect, useState } from "react";
import { MedicalShift } from "../../domain/MedicalShift";
import { Modal, Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { Pet } from "../../domain/Pet";
import PetServiceManager from "../../services/pet-service/PetServiceManager";
import MedicalShiftServiceManager from "../../services/medical-shift-service/MedicalShiftServiceManager";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface MedicalShiftModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (medicalShift: MedicalShift, idMedicalShift?:number) => void;
  idMedicalShift?: number;
}

export function MedicalShiftModal({ open, onClose, onConfirm, idMedicalShift }: MedicalShiftModalProps) {
  const [petPacients, setPetPacients] = useState<Pet[]>([])
  const [medicalShift, setMedicalShift] = useState<MedicalShift>(new MedicalShift())
  const [fromTouched,setFromTouched] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [date, setDate] = useState<Dayjs | null>(dayjs(medicalShift.date))
  
  const handleMedicalShiftCreationOrEdition = (name: keyof MedicalShift, value: string): void => {
    (medicalShift as unknown as Record<keyof MedicalShift, string | undefined>)[name] = value;
    console.log(name, value)
    generateNewMedicalShift(medicalShift);
  }

  const generateNewMedicalShift = (medicalShift: MedicalShift) => {
    const newMedicalShift = Object.assign(new MedicalShift(), medicalShift);
    setMedicalShift(newMedicalShift);
  }

  const getPetPacients = async () => {
    const newPetPacients = PetServiceManager.getIntance().getAll()
    setPetPacients(await newPetPacients)
  }

  const getMedicalShift = async () => {
    const newMedicalShift = MedicalShiftServiceManager.getInstance().getMedicalShiftById(+idMedicalShift!)
    setMedicalShift(await newMedicalShift)
  }
  
  useEffect(() => {
    if(idMedicalShift) {
      getMedicalShift();
    }
    getPetPacients();
  }, [])

  const handleOnConfirm = () => {
    setFromTouched(true)
    if(hasMissingRequiredFields()){
      console.error('campos incompletos')
      return
    }
    onConfirm(medicalShift, medicalShift.id)
    onClose()
  }

  const hasMissingRequiredFields = (): boolean => {
    const requiredFields: (keyof MedicalShift)[] = ['vetName', 'petName', 'date'];
    return requiredFields.some(field => !medicalShift[field]);
  }
  
  return(
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: 300, margin: "auto", mt: "20%", p: 3, backgroundColor: "white", borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, color: "var(--primary-color)" }}>
          {idMedicalShift ? "Editar Consulta" : "Crear Consulta"}
        </Typography>
        {!idMedicalShift && 
          <TextField
            label="Nombre de Veterinario" fullWidth margin="normal"
            color="primary" name="vetName" required
            value={medicalShift.vetName}
            onChange={(event) => handleMedicalShiftCreationOrEdition('vetName', event.target.value)}
            error={fromTouched && !medicalShift.vetName}
            helperText={ fromTouched && !medicalShift.vetName ? (
              <Box display="flex" alignItems="center" gap={1}>
                <Typography color="red">El veterinario es obligatorio</Typography>
              </Box>
            ) : "" }
          />
        }
        <FormControl fullWidth margin="normal" error={fromTouched && !medicalShift.petName}>
          <InputLabel color={fromTouched && !medicalShift.petName ? "error" : "primary"}>
            Paciente
          </InputLabel>
          <Select
            value={medicalShift.petName ? `${medicalShift.petName} ` : ''}
            onChange={(event) => handleMedicalShiftCreationOrEdition('petName', event.target.value)}
            label="Paciente" fullWidth color="primary"
          >
            <MenuItem value=""><em>Seleccionar Paciente</em></MenuItem>
            {
              petPacients.map(pet => (
                <MenuItem value={`${pet.name}`} key={pet.name}>{pet.name}</MenuItem>
              ))
            }
          </Select>
          {fromTouched && !medicalShift.petName && (
          <Box display="flex" alignItems="center" gap={1} >
            <Typography color="red">El paciente es obligatorio</Typography>
          </Box>
          )}
        </FormControl>
        <LocalizationProvider dateAdapter={ AdapterDayjs }>
          <DateTimePicker format="DD/MM/YYYY hh:mm A" label="Fecha y hora"
            name="fechaInicio" value={date} defaultValue={dayjs()}
            minDateTime={dayjs()}
            onChange={(newDate) => {
              if (newDate && newDate.isValid()) {
                setError(null);
                setDate(newDate);
                handleMedicalShiftCreationOrEdition('date', newDate.toISOString());
              } else {
                setError('Por favor, selecciona una fecha válida.');
                setDate(dayjs(medicalShift.date));
              }
            }}
            slotProps={{
              textField: {
                error: !!error,
                helperText: error,
              },
            }}
          />
        </LocalizationProvider>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button 
            variant="outlined"
            onClick={onClose}
          >Cancelar</Button>
          <Button
            variant="contained"
            onClick={handleOnConfirm}
            sx={{color:'var(--primary-color)'}}
          >Confirmar</Button>
        </Box>
      </Box>
    </Modal>
  )
}