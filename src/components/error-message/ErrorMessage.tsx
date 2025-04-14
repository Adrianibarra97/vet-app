interface PropErrorMessage {
  errorMessage: string
}

export const ErrorMessage = (propErrorMessage: PropErrorMessage) => {

  return (
    <p className="error">{ propErrorMessage.errorMessage }</p>
  )
}