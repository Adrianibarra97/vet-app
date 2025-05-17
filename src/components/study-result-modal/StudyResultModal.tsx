import { useEffect, useState } from "react";
import { convertTypeOfStudyResultToASpanishString, Study, studyResultOptions } from "../../domain/Study";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { SnackbarUtilities } from "../../util/snackbar/SnackbarManager";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import { formContainer } from "../medical-shift-modal/MedicalShiftModalStyle";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Textarea from "@mui/joy/Textarea";

interface StudyResultModalProps{
    study?:Study
    open:boolean
    onClose:() => void
    onConfirm:(study:Study) => void
    idStudy:number
    viewMode:boolean
}

export function StudyResultModal({study:initialStudy,open,onClose,onConfirm,idStudy,viewMode}:StudyResultModalProps){
    const [study, setStudy] = useState<Study>(new Study())
    const [formTouched, setFromTouched] = useState<boolean>(false)
    const [studyDate, setStudyDate] = useState<Dayjs|null>(initialStudy?.date ? dayjs(initialStudy.date):null)
    const [errorDate, setErrorDate] = useState<string|null>(null)

    dayjs.extend(customParseFormat)

    useEffect(()=>{
        cleanStates()
        if(initialStudy){
            setStudy(Object.assign(new Study(), initialStudy))
            setStudyDate(initialStudy.date ? dayjs(initialStudy.date, "YYYY-MM-DD") : null)
        }else if(idStudy === -1){
            setStudy(new Study())
            setStudyDate(null)
        }
    },[initialStudy,idStudy])

    const handleStudyCreationOrEdition = (name: keyof Study, value:string | undefined): void => {
        if (viewMode) return
        (study as unknown as Record<keyof Study, string | undefined>)[name] = value
        generateNewStudy(study)
    }

    const handleStudyDateChange = (newStudyDate:Dayjs | null) => {
        if (viewMode) return
        if(newStudyDate && newStudyDate.isValid()){
            setErrorDate(null)
            setStudyDate(newStudyDate)
            const StudyDateFormat = newStudyDate.format('YYYY-MM-DD')
            handleStudyCreationOrEdition('date', StudyDateFormat)
        }else{
            if(!newStudyDate?.isValid()){
                setErrorDate('Por favor, seleccione un dia valido')
            }else{
                setErrorDate('Por favor, ingrese una fecha de receta')
            }
            setStudyDate(dayjs(study.date))
        }
    }

    const generateNewStudy = (study:Study) => {
        const newStudy = Object.assign(new Study(), study)
        setStudy(newStudy)
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
        onConfirm(study)
        cleanStates()
        onClose()
    }

    const hasMissingRequiredFields = ():boolean => {
        const requiredFields: (keyof Study)[] = ['date','description', 'type']

        return requiredFields.some((field)=> !study[field])
    }

    const handleCancel = () => {
        cleanStates()
        onClose()
    }

    const cleanStates = () => {
        if(idStudy === -1){
            setStudy(new Study())
            setStudyDate(null)
        } else if (initialStudy) {
            setStudy(Object.assign(new Study(), initialStudy)) 
            setStudyDate(initialStudy.date ? dayjs(initialStudy.date) : null)
        }
        setErrorDate(null)
        setFromTouched(false)
    }

    const getTitle = () => {
        if (viewMode) return 'Detalle de Estudio';
        return idStudy !== -1 ? 'Editar Estudio' : 'Nuevo Estudio';
    }

    return(
        <Dialog onClose={handleCancel} open={open} fullWidth sx={{overflow:'auto'}}>
            <DialogTitle component="div">
                <Typography variant="h6" sx={{color:'var(--footer-color)', fontWeight:'bold'}}>
                    {getTitle()}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box component='form' sx={formContainer}>
                    <FormControl fullWidth margin="normal" error={formTouched && !study.type} required sx={{overflow:'visible'}} disabled={viewMode} >
                        <InputLabel color={formTouched && !study.type ? "error" : "primary"}>
                            Tipo Estudio
                        </InputLabel>
                        <Select
                            value={study.type ? study.type : ''}
                            onChange={(event) => handleStudyCreationOrEdition('type', event.target.value)}
                            input={<OutlinedInput label="Tipo Estudio"/>}
                        >
                            {studyResultOptions.map(studyResultOption =>
                                <MenuItem value={studyResultOption} key={studyResultOption}>
                                    {convertTypeOfStudyResultToASpanishString(studyResultOption)}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={studyDate}
                            label="Fecha"
                            format="DD/MM/YYYY"
                            onChange={handleStudyDateChange}
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
                    <Textarea 
                        placeholder="Escribe tu descripcion aca..."
                        minRows={4}
                        value={study.description}
                        onChange={event => handleStudyCreationOrEdition('description',event.target.value)}
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