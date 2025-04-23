
export const isRequired = (label: string, value: string): string => {
    return value.trim() === '' ? `${label} es obligatorio` : ''
  }
  
  export const isOnlyLetters = (label: string, value: string): string => {
    return /\d/.test(value) ? `${label} no debe contener números` : ''
  }
  
  export const isOnlyNumbers = (label: string, value: string): string => {
    return /^\d+$/.test(value) ? '' : `${label} debe contener solo números`
  }
  
  export const isValidEmail = (label: string, value: string): string => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(value) ? '' : `${label} debe ser un email válido`
  }
  
  export const validateFieldByKey = (
    key: string,
    value: string,
    label: string
  ): string => {
    const required = isRequired(label, value)
    if (required) return required
  
    if (['name', 'surname'].includes(key)) {
      return isOnlyLetters(label, value)
    }
  
    if (['dni', 'telephone', 'workPhone', 'license'].includes(key)) {
      return isOnlyNumbers(label, value)
    }
  
    if (['email', 'professionalEmail'].includes(key)) {
      return isValidEmail(label, value)
    }
  
    return '' 
  }
  
  export const validateFormByFields = (
    form: Record<string, any>,
    fields: { label: string; key: string }[]
  ): { valid: boolean; errors: { [key: string]: string } } => {
    const errors: { [key: string]: string } = {}
  
    fields.forEach(({ key, label }) => {
      const value = form[key]?.toString() ?? ''
      const error = validateFieldByKey(key, value, label)
      if (error) errors[key] = error
    })
  
    return { valid: Object.keys(errors).length === 0, errors }
  }
  
  