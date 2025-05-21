
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { MedicalShift } from "../../domain/MedicalShift";
import dayjs from "dayjs";

interface ConfirmModalMedicalShiftProps{
    open:boolean
    onClose: () => void
    onConfirm:() => void
    medicalShift:MedicalShift
    title:string
}

export function ConfirmModalMedicalShift({open, onClose, onConfirm, medicalShift,title}:ConfirmModalMedicalShiftProps){
    const date = dayjs(medicalShift.date).format('DD/MM/YYYY')

    return(
        <Dialog open={open} onClose={onClose} maxWidth="sm">
            <DialogTitle>
                <Typography sx={{ color: "black", fontWeight: "bold", display:'flex', justifyContent:'center' }}>
                    {title}
                </Typography>
            </DialogTitle>
            <DialogContent sx={{display:'flex', flexDirection:'column'}}>
                <Typography sx={{ color: "black", fontWeight: "bold", display:'flex', justifyContent:'center' }}>
                    Paciente del turno
                </Typography>
                <Typography sx={{ color: "black", display:'flex', justifyContent:'center' }}>
                    {medicalShift.petMedicalShift.name}
                </Typography>
                <Typography sx={{ color: "black", fontWeight: "bold", display:'flex', justifyContent:'center' }}>
                    Fecha del turno
                </Typography>
                <Typography sx={{ color: "black", display:'flex', justifyContent:'center' }}>
                    {date}
                </Typography>
                <Typography sx={{ color: "black", fontWeight: "bold", display:'flex', justifyContent:'center' }}>
                    Hora del turno
                </Typography>
                <Typography sx={{ color: "black", display:'flex', justifyContent:'center' }}>
                    {medicalShift.hour}
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