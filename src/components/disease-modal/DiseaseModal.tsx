import { useState } from "react";
import { convertTypeOfPreExistinceDiseaseToASpanishString, convertTypeOfSeverityToASpanishString, Disease, preExistinceDiseaseOptions, severityTypeOptions } from "../../domain/Disease";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useOnInit } from "../../util/customHooks";
import { SnackbarUtilities } from "../../util/snackbar/SnackbarManager";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import { formContainer } from "../medical-shift-modal/MedicalShiftModalStyle";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Textarea from '@mui/joy/Textarea'

interface propsDiseaseModal{
    open:boolean
    onClose:() => void
    onConfirm:(disease:Disease) => void
    idDisease:number
    disease?:Disease
}

export function DiseaseModal({disease:initialDisease,open, onClose, onConfirm, idDisease}:propsDiseaseModal){
    const [disease,setDisease] = useState<Disease>(new Disease)
    const [fromTouched,setFromTouched] = useState<boolean>(false)
    const [diagnosisDate,setDiagnosisDate] = useState<Dayjs|null>(initialDisease?.diagnosisDate ? dayjs(initialDisease.diagnosisDate) : null )
    const [errorDate,setErrorDate] = useState<string|null>(null)

    dayjs.extend(customParseFormat)

    useOnInit(() => {
        cleanStates()
        if(initialDisease){
            setDisease(initialDisease)
            setDiagnosisDate(initialDisease.diagnosisDate ? dayjs(initialDisease.diagnosisDate, "YYYY-MM-DD") : null)
        } else if(idDisease === -1){
            setDisease(new Disease())
            setDiagnosisDate(null)
        }
    })

    const handleDiseaseCreationOrEdition = (name: keyof Disease, value:string | boolean | undefined): void => {
        (disease as unknown as Record<keyof Disease, string | boolean | undefined>)[name] = value
        generateNewDisease(disease)
    }

    const handleDiagnosisDateChange = (newDiagnosisDate:Dayjs | null) => {
        if(newDiagnosisDate && newDiagnosisDate.isValid()){
            setErrorDate(null)
            setDiagnosisDate(newDiagnosisDate)
            const diagnosisDateFormat = newDiagnosisDate.format('YYYY-MM-DD')
            handleDiseaseCreationOrEdition('diagnosisDate', diagnosisDateFormat)
        }else{
            if(!newDiagnosisDate?.isValid()){
                setErrorDate('Por favor, seleccione un dia valido')
            }else{
                setErrorDate('Por favor, ingrese una fecha de diagnostico')
            }
            setDiagnosisDate(dayjs(disease.diagnosisDate))
        }
    }

    const generateNewDisease = (disease:Disease) => {
        const newDisease = Object.assign(new Disease(), disease)
        setDisease(newDisease)
        console.log("Creacion enfermedad:",disease)
    }

    const handleOnConfirm = () => {
        setFromTouched(true)
        if(hasMissingRequiredFields()){
            SnackbarUtilities.error('Campos incompletos')
            return
        }
        onConfirm(disease)
        cleanStates()
        onClose()
    }

    const hasMissingRequiredFields = ():boolean => {
        const requiredFields: (keyof Disease)[] = ['diagnosisDate','observation','type','severity']

        if(idDisease !== -1){
            requiredFields.unshift('isActive')
        }

        return requiredFields.some((field)=> !disease[field])
    }

    const handleCancel = () => {
        cleanStates()
        onClose()
    }

    const cleanStates = () => {
        if(idDisease === -1){
            setDisease(new Disease())
            setDiagnosisDate(null)
        }
        setErrorDate(null)
        setFromTouched(false)
    }

    return(
        <Dialog onClose={handleCancel} open={open} fullWidth sx={{maxHeight:'90vh', overflow:'auto'}}>
            <DialogTitle component="div">
                <Typography variant="h6" sx={{color:'var(--footer-color)', fontWeight:'bold'}}>
                    Nueva Enfermedad
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box component={'form'} sx={formContainer}>
                    <FormControl fullWidth margin="normal" error={fromTouched && !disease.type} required sx={{overflow:'visible'}}>
                        <InputLabel color={fromTouched && !disease.type ? "error" : "primary"}>
                            Tipo Enfermedad
                        </InputLabel>
                        <Select
                            value={disease.type ? disease.type : ''}
                            onChange={(event) => handleDiseaseCreationOrEdition('type', event.target.value)}
                            input={<OutlinedInput label="Tipo Enfermedad" />}
                        >
                            {preExistinceDiseaseOptions.map(diseaseOption => (
                                <MenuItem value={diseaseOption} key={diseaseOption}>
                                    {convertTypeOfPreExistinceDiseaseToASpanishString(diseaseOption)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal" error={fromTouched && !disease.severity} required sx={{overflow:'visible'}}>
                        <InputLabel color={fromTouched && !disease.severity ? "error" : "primary"}>Severidad</InputLabel>
                        <Select 
                            value={disease.severity ? disease.severity : ''}
                            onChange={(event) => handleDiseaseCreationOrEdition('severity',event.target.value)}
                            input={<OutlinedInput label="Severidad"/>}
                        >
                            {severityTypeOptions.map(severityOptions => (
                                <MenuItem value={severityOptions} key={severityOptions}>
                                    {convertTypeOfSeverityToASpanishString(severityOptions)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={diagnosisDate}
                            label="Fecha"
                            format="DD/MM/YYYY"
                            onChange={handleDiagnosisDateChange}
                            slotProps={{
                                textField: {
                                    error: !!errorDate,
                                    helperText: errorDate,
                                    margin:'normal',
                                    required: true,
                                    fullWidth:true
                                },
                            }}
                            sx={{overflow:'visible'}}
                        />
                    </LocalizationProvider>
                    <Textarea 
                        placeholder="Escribe tu observacion aca..."
                        minRows={4}
                        value={disease.observation}
                        onChange={event => handleDiseaseCreationOrEdition('observation',event.target.value)}
                        sx={{mt:2}}
                        variant="outlined"
                    />
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