import { useState } from 'react'
import { api } from '../api'
import { Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    try {
      const res = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('userId', res.data.userId)
      window.location.href = '/'
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao autenticar')
    }
  }

  return (
    <div className='login-container'>
      <div className='login-card'>
        <form onSubmit={handleSubmit}>
          <label>E-mail</label>
          <input
            type='email'
            placeholder='Seu email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label>Senha</label>
          <input
            type='password'
            placeholder='Senha'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button type='submit' className='button login-button btn-primary'>Entrar</button>

          {error && <p className='error'>{error}</p>}
          <p className='redirect-link'>Nâo é cadastrado? <Link to='/register'>Cadastrar</Link></p>
        </form>
      </div>
    </div>
  )
}
