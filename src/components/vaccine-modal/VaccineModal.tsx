import { useEffect, useState } from "react";
import { convertTypeOfVaccineToASpanishString, Vaccine, vaccineOptions } from "../../domain/Vaccine";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { SnackbarUtilities } from "../../util/snackbar/SnackbarManager";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import { formContainer } from "../medical-shift-modal/MedicalShiftModalStyle";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Textarea from "@mui/joy/Textarea";

interface VaccineModalProps{
    vaccine?:Vaccine
    open:boolean
    onClose:() => void
    onConfirm:(vaccine:Vaccine) => void
    idVaccine:number
    viewMode:boolean
}

export function VaccineModal({vaccine:initialVaccine,open,onClose,onConfirm,idVaccine,viewMode}:VaccineModalProps){
    const [vaccine, setVaccine] = useState<Vaccine>(new Vaccine())
    const [formTouched, setFromTouched] = useState<boolean>(false)
    const [applicationDate, setApplicationDate] = useState<Dayjs|null>(initialVaccine?.applicationDate ? dayjs(initialVaccine.applicationDate):null)
    const [expirationDate, setExpirationDate] = useState<Dayjs|null>(initialVaccine?.expirationDate ? dayjs(initialVaccine.expirationDate):null)
    const [errors, setErrors] = useState({
        applicationDate: null as string | null,
        expirationDate: null as string | null
    })

    dayjs.extend(customParseFormat)

    useEffect(() => {
        cleanStates()
        if(initialVaccine){
            setVaccine(Object.assign(new Vaccine(), initialVaccine))
            setApplicationDate(initialVaccine.applicationDate ? dayjs(initialVaccine.applicationDate,"YYYY-MM-DD"):null)
            setExpirationDate(initialVaccine.expirationDate? dayjs(initialVaccine.expirationDate,"YYYY-MM-DD"):null)
        }else if(idVaccine === -1){
            setVaccine(new Vaccine())
            setApplicationDate(null)
            setExpirationDate(null)
        }
    },[initialVaccine,idVaccine])

    const handleVaccineCreationOrEdition = (name: keyof Vaccine, value:string | undefined): void => {
        if (viewMode) return
        (vaccine as unknown as Record<keyof Vaccine, string | undefined>)[name] = value
        generateNewVaccine(vaccine)
    }

    const handleVaccineApplicationDateChange = (newVaccineDate:Dayjs | null) => {
        if (viewMode) return
        if(newVaccineDate && newVaccineDate.isValid()){
            setErrors({...errors, applicationDate:null})
            setApplicationDate(newVaccineDate)
            const vaccineDateFormat = newVaccineDate.format('YYYY-MM-DD')
            handleVaccineCreationOrEdition('applicationDate', vaccineDateFormat)
        }else{
            if(!newVaccineDate?.isValid()){
                setErrors({...errors,applicationDate:'Por favor, seleccione un dia valido'})
            }else{
                setErrors({...errors,applicationDate:'Por favor, ingrese una fecha de aplicacion'})
            }
            setApplicationDate(dayjs(vaccine.applicationDate))
        }
    }

    const handleVaccineExpirationDateChange = (newVaccineDate:Dayjs | null) => {
        if (viewMode) return
        if(newVaccineDate && newVaccineDate.isValid()){
            setErrors({...errors, expirationDate:null})
            setExpirationDate(newVaccineDate)
            const vaccineDateFormat = newVaccineDate.format('YYYY-MM-DD')
            handleVaccineCreationOrEdition('expirationDate', vaccineDateFormat)
        }else{
            if(!newVaccineDate?.isValid()){
                setErrors({...errors,expirationDate:'Por favor, seleccione un dia valido'})
            }else{
                setErrors({...errors,expirationDate:'Por favor, ingrese una fecha de expiracion'})
            }
            setApplicationDate(dayjs(vaccine.expirationDate))
        }
    }

    const generateNewVaccine = (vaccine:Vaccine) => {
        const newVaccine = Object.assign(new Vaccine(), vaccine)
        setVaccine(newVaccine)
    }

    const handleOnConfirm = () => {
        if (viewMode) {
            onClose();
            return;
        }

        setFromTouched(true)
        if(hasMissingRequiredFields()){
            SnackbarUtilities.error('Campos incompletos')
            return
        }
        onConfirm(vaccine)
        cleanStates()
        onClose()
    }

    const hasMissingRequiredFields = ():boolean => {
        const requiredFields: (keyof Vaccine)[] = ['applicationDate','description', 'type', 'expirationDate', 'batchNumber']

        return requiredFields.some((field)=> !vaccine[field])
    }

    const handleCancel = () => {
        cleanStates()
        onClose()
    }

    const cleanStates = () => {
        if(idVaccine === -1){
            setVaccine(new Vaccine())
            setApplicationDate(null)
            setExpirationDate(null)
        } else if (initialVaccine) {
            setVaccine(Object.assign(new Vaccine(), initialVaccine)) 
            setApplicationDate(initialVaccine.applicationDate ? dayjs(initialVaccine.applicationDate) : null)
            setExpirationDate(initialVaccine.expirationDate ? dayjs(initialVaccine.expirationDate):null)
        }
        setErrors({...errors, applicationDate:null, expirationDate:null})
        setFromTouched(false)
    }

    const getTitle = () => {
        if (viewMode) return 'Detalle de Vacuna';
        return idVaccine !== -1 ? 'Editar Vacuna' : 'Nueva Vacuna';
    }

    return(
        <Dialog onClose={handleCancel} open={open} fullWidth sx={{overflow:'auto'}}>
            <DialogTitle component='div'>
                <Typography variant="h6" sx={{color:'var(--footer-color)', fontWeight:'bold'}}>
                    {getTitle()}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box component='form' sx={formContainer}>
                    <FormControl fullWidth margin="normal" error={formTouched && !vaccine.type} required sx={{overflow:'visible'}} disabled={viewMode} >
                        <InputLabel color={formTouched && !vaccine.type ? "error" : "primary"}>
                            Vacuna contra
                        </InputLabel>
                        <Select
                            value={vaccine.type ? vaccine.type : ''}
                            onChange={(event) => handleVaccineCreationOrEdition('type', event.target.value)}
                            input={<OutlinedInput label="Vacuna contra"/>}
                        >
                            {vaccineOptions.map(vaccineOption =>
                                <MenuItem value={vaccineOption} key={vaccineOption}>
                                    {convertTypeOfVaccineToASpanishString(vaccineOption)}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Numero de lote"
                        fullWidth
                        margin="normal"
                        color="primary"
                        required
                        value={vaccine.batchNumber !== -1 ? vaccine.batchNumber : ''}
                        onChange={(event) =>
                            handleVaccineCreationOrEdition('batchNumber', event.target.value)
                        }
                        error={formTouched && !vaccine.batchNumber}
                        helperText={
                            formTouched && !vaccine.batchNumber ? (
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography color="red">
                                El numero de lote es obligatorio
                                </Typography>
                            </Box>
                            ) : (
                            ''
                            )
                        }
                        sx={{overflow:'visible'}}
                        disabled={viewMode}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={applicationDate}
                            label="Fecha de aplicacion"
                            format="DD/MM/YYYY"
                            onChange={handleVaccineApplicationDateChange}
                            disabled={viewMode}
                            slotProps={{
                                textField: {
                                    error: !!errors.applicationDate,
                                    helperText: errors.applicationDate,
                                    margin:'normal',
                                    required: true,
                                    fullWidth:true
                                },
                            }}
                            sx={{overflow:'visible'}}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={expirationDate}
                            label="Fecha de expiracion"
                            format="DD/MM/YYYY"
                            onChange={handleVaccineExpirationDateChange}
                            disabled={viewMode}
                            slotProps={{
                                textField: {
                                    error: !!errors.expirationDate,
                                    helperText: errors.expirationDate,
                                    margin:'normal',
                                    required: true,
                                    fullWidth:true
                                },
                            }}
                            sx={{overflow:'visible'}}
                        />
                    </LocalizationProvider>
                    <Textarea 
                        placeholder="Escribe tu descripcion aca..."
                        minRows={4}
                        value={vaccine.description}
                        onChange={event => handleVaccineCreationOrEdition('description',event.target.value)}
                        sx={{mt:2}}
                        variant="outlined"
                        disabled={viewMode}
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{width:'100%', display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                <Button
                    variant="contained"
                    onClick={handleCancel}
                    sx={{ backgroundColor: 'var(--primary-color)' }}
                >
                    {viewMode ? 'Cerrar':'Cancelar'}
                </Button>
                {!viewMode &&
                    <Button
                        variant="contained"
                        onClick={handleOnConfirm}
                        sx={{ backgroundColor: 'var(--footer-color)' }}
                    >
                        Confirmar
                    </Button>
                }
            </DialogActions>
        </Dialog>
    )
}