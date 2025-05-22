import { Button, Dialog, DialogActions, DialogTitle, Typography } from "@mui/material"

interface DeleteModalElementProps {
    open:boolean
    onClose:() => void
    onConfirm:() => void
    element:string
}

export function DeleteModalElement({open, onClose, onConfirm, element}:DeleteModalElementProps){
    return(
        <Dialog open={open} onClose={onClose} maxWidth="sm">
            <DialogTitle sx={{display:'flex', flexDirection:'column'}}>
                <Typography sx={{ color: "black", fontWeight: "bold", display:'flex', justifyContent:'center' }}>
                    ¿Estás seguro que quieres eliminar este elemento?
                </Typography>
                <Typography sx={{color:"black", display:'flex', justifyContent:'center'}}>
                    {element}
                </Typography>
            </DialogTitle>
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
                    onConfirm() 
                    onClose()
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