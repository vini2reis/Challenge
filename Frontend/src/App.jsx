import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import Favorites from './pages/Favorites.jsx'
import SharedList from './pages/SharedList.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

export default function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path='/movie/:movieId' element={<PrivateRoute><MovieDetails /></PrivateRoute>} />
      <Route path='/favorites' element={<PrivateRoute><Favorites /></PrivateRoute>} />
      <Route path='/shared/:shareId' element={<SharedList />} />
    </Routes>
  )
}
