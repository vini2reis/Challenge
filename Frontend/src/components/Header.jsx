import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className='header'>
      <Link to='/' className='logo'>
        🎬 MovieApp
      </Link>

      <nav className='nav'>
        <Link to='/' className='nav-item'>Favoritos</Link>
      </nav>
    </header>
  )
}
