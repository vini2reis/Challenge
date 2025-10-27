import { useState } from 'react'
import { api } from '../api'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    try {
      await api.post('/auth/register', form)
      navigate('/login')
    } catch (err) {
      const msg = err?.response?.data?.message || 'Erro ao registrar'
      setError(msg)
    }
  }

  return (
    <div className='login-container'>
      <div className='login-card'>
        <form onSubmit={handleSubmit}>
          
          <label>E-mail</label>
          <input
            name='email'
            type='email'
            placeholder='Seu email'
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Senha</label>
          <input
            name='password'
            type='password'
            placeholder='Senha (mín 6 caracteres)'
            value={form.password}
            onChange={handleChange}
            minLength={6}
            required
          />

          <button type='submit' className='button login-button btn-primary'>
            Criar Conta
          </button>

          {error && <p className='error'>{error}</p>}

          <p className='redirect-link'>
            Já tem conta? <Link to='/login'>Entrar</Link>
          </p>

        </form>
      </div>
    </div>
  )
}
