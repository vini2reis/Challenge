import axios from 'axios'

const { TMDB_API_KEY, TMDB_ENDPOINT } = process.env

export async function searchMovie (req, res) {
  const { query } = req

  try {
    const q = query.q || ''
    const page = query.page || 1

    const params = {
      api_key: TMDB_API_KEY,
      query: q,
      page,
      language: 'pt-BR'
    }

    const { data } = await axios.get(`${TMDB_ENDPOINT}/search/movie`, { params })

    return res.status(200).json(data.results)
  } catch (error) {
    console.log('Search movies error: ', error.message)

    return res.status(500).json({ message: 'Erro ao buscar filmes' })
  }
}

export async function getMovieDetails (req, res) {
  const { movieId } = req.params

  try {
    const params = {
      api_key: TMDB_API_KEY,
      language: 'pt-BR'
    }

    const { data } = await axios.get(`${TMDB_ENDPOINT}/movie/${movieId}`, { params })

    return res.status(200).json(data)
  } catch (error) {
    console.log('Get movie details error: ', error.message)

    if (error.status === 404) {
      return res.status(404).json({ message: 'Filme não encontrado' })
    }

    return res.status(500).json({ message: 'Erro ao buscar detalhes do filme' })
  }
}