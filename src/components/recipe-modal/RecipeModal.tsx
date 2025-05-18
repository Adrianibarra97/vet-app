import { useEffect, useState } from "react";
import { Recipe } from "../../domain/Recipe";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { SnackbarUtilities } from "../../util/snackbar/SnackbarManager";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { formContainer } from "../medical-shift-modal/MedicalShiftModalStyle";
import { RecipeServiceManager } from "../../services/recipe-service/RecipeServiceManager";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Textarea from "@mui/joy/Textarea";

interface RecipeModalProps{
    recipe?:Recipe
    open:boolean
    onClose:() => void
    onConfirm:(recipe:Recipe) => void
    idRecipe:number
    viewMode:boolean
}

export function RecipeModal({recipe:initialRecipe, open, onClose, onConfirm, idRecipe, viewMode}:RecipeModalProps){
    const [recipe,setRecipe] = useState<Recipe>(new Recipe())
    const [fromTouched,setFromTouched] = useState<boolean>(false)
    const [recipeDate, setRecipeDate] = useState<Dayjs|null>(initialRecipe?.dateRecipe ? dayjs(initialRecipe.dateRecipe) : null)
    const [errorDate, setErrorDate ] = useState<string|null>(null)

    dayjs.extend(customParseFormat)

    useEffect(() => {
        cleanStates()
        if(initialRecipe){
            setRecipe(Object.assign(new Recipe(), initialRecipe))
            setRecipeDate(initialRecipe.dateRecipe ? dayjs(initialRecipe.dateRecipe, "YYYY-MM-DD") : null)
        }else if(idRecipe === -1){
            setRecipe(new Recipe())
            setRecipeDate(null)
        }
    },[initialRecipe,idRecipe])
    
    const handleRecipeCreationOrEdition = (name: keyof Recipe, value:string | undefined): void => {
        if (viewMode) return
        (recipe as unknown as Record<keyof Recipe, string | undefined>)[name] = value
        generateNewRecipe(recipe)
    }

    const handleRecipeDateChange = (newRecipeDate:Dayjs | null) => {
        if (viewMode) return
        if(newRecipeDate && newRecipeDate.isValid()){
            setErrorDate(null)
            setRecipeDate(newRecipeDate)
            const RecipeDateFormat = newRecipeDate.format('YYYY-MM-DD')
            handleRecipeCreationOrEdition('dateRecipe', RecipeDateFormat)
        }else{
            if(!newRecipeDate?.isValid()){
                setErrorDate('Por favor, seleccione un dia valido')
            }else{
                setErrorDate('Por favor, ingrese una fecha de receta')
            }
            setRecipeDate(dayjs(recipe.dateRecipe))
        }
    }

    const generateNewRecipe = (recipe:Recipe) => {
        const newRecipe = Object.assign(new Recipe(), recipe)
        setRecipe(newRecipe)
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
        onConfirm(recipe)
        cleanStates()
        onClose()
    }

    const hasMissingRequiredFields = ():boolean => {
        const requiredFields: (keyof Recipe)[] = ['dateRecipe','description']

        return requiredFields.some((field)=> !recipe[field])
    }

    const handleCancel = () => {
        cleanStates()
        onClose()
    }

    const cleanStates = () => {
        if(idRecipe === -1){
            setRecipe(new Recipe())
            setRecipeDate(null)
        } else if (initialRecipe) {
            setRecipe(Object.assign(new Recipe(), initialRecipe)) 
            setRecipeDate(initialRecipe.dateRecipe ? dayjs(initialRecipe.dateRecipe) : null)
        }
        setErrorDate(null)
        setFromTouched(false)
    }

    const getTitle = () => {
        if (viewMode) return 'Detalle de Receta';
        return idRecipe !== -1 ? 'Editar Receta' : 'Nueva Receta';
    }

    return(
        <Dialog onClose={handleCancel} open={open} fullWidth sx={{maxHeight:'90vh', overflow:'auto'}}>
            <DialogTitle component="div">
                <Typography variant="h6" sx={{color:'var(--footer-color)', fontWeight:'bold'}}>
                    {getTitle()}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box component='form' sx={formContainer}>
                    {RecipeServiceManager.useStub && idRecipe === -1 && (
                        <TextField
                        label="Nombre de Veterinario"
                        fullWidth
                        margin="normal"
                        color="primary"
                        required
                        value={recipe.nameVet}
                        onChange={(event) =>
                            handleRecipeCreationOrEdition('nameVet', event.target.value)
                        }
                        error={fromTouched && !recipe.nameVet}
                        helperText={
                            fromTouched && !recipe.nameVet ? (
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography color="red">
                                El veterinario es obligatorio
                                </Typography>
                            </Box>
                            ) : (
                            ''
                            )
                        }
                        sx={{overflow:'visible'}}
                        />
                    )}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={recipeDate}
                            label="Fecha"
                            format="DD/MM/YYYY"
                            onChange={handleRecipeDateChange}
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
                        value={recipe.description}
                        onChange={event => handleRecipeCreationOrEdition('description',event.target.value)}
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