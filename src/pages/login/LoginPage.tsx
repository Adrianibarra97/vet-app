import './LoginPage.css'

export const LoginPage = () => {

  const handleLogin = () => {
    alert('ingreso a la app')
  }

  return (
    <main className="main">
      <div className='login'>
        <h1 className="main__title">Login</h1>
        <form className='login__form'>
          <div className='login__item'>
            <label>Username</label>
            <input type="text" />
          </div>
          <div className='login__item'>
            <label>Password</label>
            <input type="text" />
          </div>
          <button onClick={ () => handleLogin() }>Ingresar</button>
        </form>
      </div>
    </main>
  )
}