export const formContainer = {
  margin: 'auto',
}

export const textFieldStyle = {
'& .MuiOutlinedInput-root': {
      backgroundColor: 'white', 
      '& fieldset': {
        borderColor: '#55AD9B',  
      },
      '&:hover fieldset': {
        borderColor: '#55AD9B', 
      },
      '&.Mui-focused fieldset': {
        borderColor: '#55AD9B', 
      },
    },
    '& .MuiInputLabel-root': {
      color: '#55AD9B',  
      '&.Mui-focused': {
        color: '#55AD9B',  
      },
    },
    overflow: 'visible'
}

export const formControlStyle = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',  
    '& fieldset': {
      borderColor: '#55AD9B', 
    },
    '&:hover fieldset': {
      borderColor: '#55AD9B',  
    },
    '&.Mui-focused fieldset': {
      borderColor: '#55AD9B',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#55AD9B',  
    '&.Mui-focused': {
      color: '#55AD9B', 
    },
    '&.Mui-error': {
      color: 'red',  
    },
  },
  overflow: 'visible'
}

export const outlinedPickerStyle = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#55AD9B',
    },
    '&:hover fieldset': {
      borderColor: '#55AD9B',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#55AD9B',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#55AD9B',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#55AD9B',
  },
  overflow: 'visible'
}
