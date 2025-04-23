import { TypeWithKey } from '../../domain/TypeWithKey'

export const handleError = (errorCode: string) => {
  const codeMatcher: TypeWithKey<string> = {
    ERR_BAD_REQUEST: 'No se encontró el recurso que está buscando!',
    ERR_NETWORK: 'Falla en la red!',
    ERROR: 'Ocurrió un error inesperado!'
  }

  return codeMatcher[errorCode]
}