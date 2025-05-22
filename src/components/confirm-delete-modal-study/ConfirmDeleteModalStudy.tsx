import { Dialog, DialogTitle, Typography, DialogContent, DialogActions, Button } from "@mui/material"
import dayjs from "dayjs"
import { convertTypeOfStudyResultToASpanishString, Study } from "../../domain/Study"

interface ConfirmDeleteModalStudyProps{
    open:boolean
    onClose: () => void
    onConfirm:() => void
    study:Study
    title:string 
}

export function ConfirmDeleteModalStudy({open,onClose,onConfirm,study,title}:ConfirmDeleteModalStudyProps){
    const date = dayjs(study.date).format('DD/MM/YYYY')

    return(
        <Dialog open={open} onClose={onClose} maxWidth="sm">
            <DialogTitle>
                <Typography sx={{ color: "black", fontWeight: "bold", display:'flex', justifyContent:'center' }}>
                    {title}
                </Typography>
            </DialogTitle>
            <DialogContent sx={{display:'flex', flexDirection:'column', overflow:'auto'}}>
                <Typography sx={{ color: "black", fontWeight: "bold", display:'flex', justifyContent:'center' }}>
                    Fecha de estudio
                </Typography>
                <Typography sx={{ color: "black", display:'flex', justifyContent:'center' }}>
                    {date}
                </Typography>
                <Typography sx={{ color: "black", fontWeight: "bold", display:'flex', justifyContent:'center' }}>
                    Tipo de estudio
                </Typography>
                <Typography sx={{ color: "black", display:'flex', justifyContent:'center' }}>
                    {convertTypeOfStudyResultToASpanishString(study.type)}
                </Typography>
                <Typography sx={{ color: "black", fontWeight: "bold", display:'flex', justifyContent:'center' }}>
                    Descripcion
                </Typography>
                <Typography sx={{ color: "black", display:'flex', justifyContent:'center' }}>
                    {study.description}
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