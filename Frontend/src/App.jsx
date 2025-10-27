import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import Favorites from './pages/Favorites.jsx'
import SharedList from './pages/SharedList.jsx'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/movie/:movieId' element={<MovieDetails />} />
      <Route path='/favorites' element={<Favorites />} />
      <Route path='/shared/:shareId' element={<SharedList />} />
    </Routes>
  )
}
