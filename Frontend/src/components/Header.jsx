import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const email = localStorage.getItem('email')

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    navigate('/login')
  }

  return (
    <header className='header'>
      <nav className='nav'>
        <Link to='/' className='logo'>🎬 MovieApp</Link>
      </nav>

      <div className='user-info'>
        {token ? (
          <>
            <span>{email}</span>
            <Link to='/favorites'>Favoritos</Link>
            <button onClick={handleLogout}>Sair</button>
          </>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Registrar</Link>
          </>
        )}
      </div>
    </header>
  )
}
