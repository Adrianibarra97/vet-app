import { Dialog, DialogTitle, Typography, DialogContent, DialogActions, Button } from "@mui/material"
import dayjs from "dayjs"
import { convertTypeOfVaccineToASpanishString, Vaccine } from "../../domain/Vaccine"

interface ConfirmDeleteModalVaccineProps{
    open:boolean
    onClose: () => void
    onConfirm:() => void
    vaccine:Vaccine
    title:string 
}

export function ConfirmDeleteModalVaccine({open,onClose,onConfirm,vaccine,title}:ConfirmDeleteModalVaccineProps){
    const aplicationDate = dayjs(vaccine.applicationDate).format('DD/MM/YYYY')
    const expirationDate = dayjs(vaccine.expirationDate).format('DD/MM/YYYY')

    return(
        <Dialog open={open} onClose={onClose} maxWidth="sm">
            <DialogTitle>
                <Typography sx={{ color: "black", fontWeight: "bold", display:'flex', justifyContent:'center' }}>
                    {title}
                </Typography>
            </DialogTitle>
            <DialogContent sx={{display:'flex', flexDirection:'column', overflow:'auto'}}>
                <Typography sx={{ color: "black", fontWeight: "bold", display:'flex', justifyContent:'center' }}>
                    Vacuna contra
                </Typography>
                <Typography sx={{ color: "black", display:'flex', justifyContent:'center' }}>
                    {convertTypeOfVaccineToASpanishString(vaccine.type)}
                </Typography>
                <Typography sx={{ color: "black", fontWeight: "bold", display:'flex', justifyContent:'center' }}>
                    Numero de lote
                </Typography>
                <Typography sx={{ color: "black", display:'flex', justifyContent:'center' }}>
                    {vaccine.batchNumber}
                </Typography>
                <Typography sx={{ color: "black", fontWeight: "bold", display:'flex', justifyContent:'center' }}>
                    Fecha de aplicacion
                </Typography>
                <Typography sx={{ color: "black", display:'flex', justifyContent:'center' }}>
                    {aplicationDate}
                </Typography>
                <Typography sx={{ color: "black", fontWeight: "bold", display:'flex', justifyContent:'center' }}>
                    Fecha de expiracion
                </Typography>
                <Typography sx={{ color: "black", display:'flex', justifyContent:'center' }}>
                    {expirationDate}
                </Typography>
                {vaccine.id !== -1 && 
                    <>
                        <Typography sx={{ color: "black", fontWeight: "bold", display:'flex', justifyContent:'center' }}>
                            ¿Se encuentra completada?
                        </Typography>
                        <Typography sx={{ color: "black", display:'flex', justifyContent:'center' }}>
                            {vaccine.completed?'Si':'No'}
                        </Typography>
                    </>
                }
                <Typography sx={{ color: "black", fontWeight: "bold", display:'flex', justifyContent:'center' }}>
                    Descripcion
                </Typography>
                <Typography sx={{ color: "black", display:'flex', justifyContent:'center' }}>
                    {vaccine.description}
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