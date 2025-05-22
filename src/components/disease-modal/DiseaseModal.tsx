import { useEffect, useState } from "react"
import { convertTypeOfPreExistinceDiseaseToASpanishString, convertTypeOfSeverityToASpanishString, Disease, preExistinceDiseaseOptions, severityTypeOptions } from "../../domain/Disease"
import dayjs, { Dayjs } from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { SnackbarUtilities } from "../../util/snackbar/SnackbarManager"
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Typography } from "@mui/material"
import { formContainer } from "../medical-shift-modal/MedicalShiftModalStyle"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import Textarea from '@mui/joy/Textarea'
import { ConfirmDeleteModalDisease } from "../confirm-delete-modal-disease/ConfirmDeleteModalDisease"

interface propsDiseaseModal{
    open:boolean
    onClose:() => void
    onConfirm:(disease:Disease) => void
    idDisease:number
    disease?:Disease
    viewMode:boolean
}

export function DiseaseModal({disease:initialDisease,open, onClose, onConfirm, idDisease, viewMode}:propsDiseaseModal){
    const [disease,setDisease] = useState<Disease>(new Disease)
    const [fromTouched,setFromTouched] = useState<boolean>(false)
    const [diagnosisDate,setDiagnosisDate] = useState<Dayjs|null>(initialDisease?.diagnosisDate ? dayjs(initialDisease.diagnosisDate) : null )
    const [errorDate,setErrorDate] = useState<string|null>(null)
    const [stateModalConfirm,setStateModalConfirm] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')

    dayjs.extend(customParseFormat)

    useEffect(() => {
        cleanStates()
        if(initialDisease){
            setDisease(Object.assign(new Disease(), initialDisease))
            setDiagnosisDate(initialDisease.diagnosisDate ? dayjs(initialDisease.diagnosisDate, "YYYY-MM-DD") : null)
            setTitle('¿Estas seguro de que quieres editar esta enfermedad?')
        } else if(idDisease === -1){
            setDisease(new Disease())
            setDiagnosisDate(null)
            setTitle('¿Estas seguro de que quieres crear esta enfermedad?')
        }
    }, [initialDisease, idDisease])

    const handleDiseaseCreationOrEdition = (name: keyof Disease, value:string | boolean | undefined): void => {
        if (viewMode) return
        (disease as unknown as Record<keyof Disease, string | boolean | undefined>)[name] = value
        generateNewDisease(disease)
    }

    const handleDiagnosisDateChange = (newDiagnosisDate:Dayjs | null) => {
        if (viewMode) return
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
    }

    const handleOnClickConfirm = () => {
        if (viewMode) {
            onClose();
            return;
        }

        setFromTouched(true)
        if(hasMissingRequiredFields()){
            SnackbarUtilities.error('Campos incompletos')
            return
        }
        setStateModalConfirm(true)
    }

    const handleOnConfirm = () => {
        onConfirm(disease)
        cleanStates()
        onClose()
    }

    const hasMissingRequiredFields = ():boolean => {
        const requiredFields: (keyof Disease)[] = ['diagnosisDate','observation','type','severity']

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
        } else if (initialDisease) {
            setDisease(Object.assign(new Disease(), initialDisease)) 
            setDiagnosisDate(initialDisease.diagnosisDate ? dayjs(initialDisease.diagnosisDate) : null)
        }
        setErrorDate(null)
        setFromTouched(false)
    }

    const getTitle = () => {
        if (viewMode) return 'Detalle de Enfermedad';
        return idDisease !== -1 ? 'Editar Enfermedad' : 'Nueva Enfermedad';
    }

    return(
        <>
            <Dialog onClose={handleCancel} open={open} fullWidth sx={{maxHeight:'90vh', overflow:'auto'}}>
                <DialogTitle component="div">
                    <Typography variant="h6" sx={{color:'var(--footer-color)', fontWeight:'bold'}}>
                        {getTitle()}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Box component={'form'} sx={formContainer}>
                        <FormControl fullWidth margin="normal" error={fromTouched && !disease.type} required sx={{overflow:'visible'}} disabled={viewMode}>
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
                        <FormControl fullWidth margin="normal" error={fromTouched && !disease.severity} required sx={{overflow:'visible'}} disabled={viewMode}>
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
                                minDate={dayjs()}
                                onChange={handleDiagnosisDateChange}
                                disabled={viewMode}
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
                        {idDisease  !== -1 && 
                            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                                <Typography>Esta activa</Typography>
                                <Checkbox
                                    checked={disease.isActive}
                                    onChange={event => handleDiseaseCreationOrEdition('isActive', event.target.checked)}
                                    disabled={viewMode}
                                />
                            </Box>
                        }
                        <Textarea 
                            placeholder="Escribe tu observacion aca..."
                            minRows={4}
                            value={disease.observation}
                            onChange={event => handleDiseaseCreationOrEdition('observation',event.target.value)}
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
                            onClick={handleOnClickConfirm}
                            sx={{ backgroundColor: 'var(--footer-color)' }}
                        >
                            Confirmar
                        </Button>
                    }
                </DialogActions>
            </Dialog>
            <ConfirmDeleteModalDisease
                open={stateModalConfirm}
                onClose={() => setStateModalConfirm(false)}
                onConfirm={handleOnConfirm}
                disease={disease}
                title={title}
            />
        </>
    )
}