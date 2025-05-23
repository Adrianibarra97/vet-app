import dayjs from "dayjs";
import { convertTypeOfPreExistinceDiseaseToASpanishString, convertTypeOfSeverityToASpanishString, Disease } from "../../domain/Disease";
import { Dialog, DialogTitle, Typography, DialogContent, DialogActions, Button } from "@mui/material";

interface ConfirmDeleteModalDiseaseProps{
    open:boolean
    onClose: () => void
    onConfirm:() => void
    disease:Disease
    title:string 
}

export function ConfirmDeleteModalDisease({open,onClose,onConfirm,disease,title}:ConfirmDeleteModalDiseaseProps){
    const date = dayjs(disease.diagnosisDate).format('DD/MM/YYYY')

    return(
        <Dialog open={open} onClose={onClose} maxWidth="sm">
            <DialogTitle>
                <Typography sx={{ color: "black", fontWeight: "bold", display:'flex', justifyContent:'center' }}>
                    {title}
                </Typography>
            </DialogTitle>
            <DialogContent sx={{display:'flex', flexDirection:'column', overflow:'auto'}}>
                <Typography sx={{ color: "black", fontWeight: "bold", display:'flex', justifyContent:'center' }}>
                    Tipo de enfermedad
                </Typography>
                <Typography sx={{ color: "black", display:'flex', justifyContent:'center' }}>
                    {convertTypeOfPreExistinceDiseaseToASpanishString(disease.type)}
                </Typography>
                <Typography sx={{ color: "black", fontWeight: "bold", display:'flex', justifyContent:'center' }}>
                    Fecha de diagnostico
                </Typography>
                <Typography sx={{ color: "black", display:'flex', justifyContent:'center' }}>
                    {date}
                </Typography>
                <Typography sx={{ color: "black", fontWeight: "bold", display:'flex', justifyContent:'center' }}>
                    Tipo de severidad
                </Typography>
                <Typography sx={{ color: "black", display:'flex', justifyContent:'center' }}>
                    {convertTypeOfSeverityToASpanishString(disease.severity)}
                </Typography>
                {disease.id !== -1 && 
                    <>
                        <Typography sx={{ color: "black", fontWeight: "bold", display:'flex', justifyContent:'center' }}>
                            ¿Se encuentra activa?
                        </Typography>
                        <Typography sx={{ color: "black", display:'flex', justifyContent:'center' }}>
                            {disease.isActive?'Si':'No'}
                        </Typography>
                    </>
                }
                <Typography sx={{ color: "black", fontWeight: "bold", display:'flex', justifyContent:'center' }}>
                    Observacion
                </Typography>
                <Typography sx={{ color: "black", display:'flex', justifyContent:'center' }}>
                    {disease.observation}
                </Typography>
            </DialogContent>
            <DialogActions sx={{display:'flex', justifyContent:'space-around'}}>
                <Button
                    onClick={onClose}
                    sx={{
                        color: "var(--header-color)",
                        backgroundColor:'var(--primary-color)',
                        width: '7em',
                        height: '2.5em',
                        fontSize: '1.1em',
                        fontweight: 'bolder',
                        "&:hover": { backgroundColor: 'var(--footer-color)' }
                    }}
                >
                    Retroceder
                </Button>
                <Button
                    onClick={() => {
                    onConfirm(); 
                    onClose(); 
                    }}
                    sx={{
                        color: "var(--header-color)",
                        backgroundColor:'var(--footer-color)',
                        width: '7em',
                        height: '2.5em',
                        fontSize: '1.1em',
                        fontweight: 'bolder',
                        "&:hover": { backgroundColor:'var(--primary-color)' },
                    }}
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}