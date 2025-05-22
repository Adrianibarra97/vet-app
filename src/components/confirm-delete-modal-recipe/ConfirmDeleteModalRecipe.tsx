import { Dialog, DialogTitle, Typography, DialogContent, DialogActions, Button } from "@mui/material"
import dayjs from "dayjs"
import { Recipe } from "../../domain/Recipe"

interface ConfirmDeleteModalRecipeProps{
    open:boolean
    onClose: () => void
    onConfirm:() => void
    recipe:Recipe
    title:string 
}

export function ConfirmDeleteModalRecipe({open,onClose,onConfirm,recipe,title}:ConfirmDeleteModalRecipeProps){
    const date = dayjs(recipe.dateRecipe).format('DD/MM/YYYY')

    return(
        <Dialog open={open} onClose={onClose} maxWidth="sm">
            <DialogTitle>
                <Typography sx={{ color: "black", fontWeight: "bold", display:'flex', justifyContent:'center' }}>
                    {title}
                </Typography>
            </DialogTitle>
            <DialogContent sx={{display:'flex', flexDirection:'column', overflow:'auto'}}>
                <Typography sx={{ color: "black", fontWeight: "bold", display:'flex', justifyContent:'center' }}>
                    Fecha de receta
                </Typography>
                <Typography sx={{ color: "black", display:'flex', justifyContent:'center' }}>
                    {date}
                </Typography>
                <Typography sx={{ color: "black", fontWeight: "bold", display:'flex', justifyContent:'center' }}>
                    Descripcion de receta
                </Typography>
                <Typography sx={{ color: "black", display:'flex', justifyContent:'center' }}>
                    {recipe.description}
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