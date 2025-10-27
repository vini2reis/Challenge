import { Link } from 'react-router-dom'

export default function SharedHeader() {
  return (
    <header className='header'>
      <Link to='/' className='logo'>
        🎬 MovieApp
      </Link>

      <nav className='nav-shared'>
        <strong className='shared-header-title'>Lista Compartilhada</strong>
      </nav>
    </header>
  )
}
