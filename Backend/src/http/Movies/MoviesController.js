import axios from 'axios'

const { TMDB_API_KEY, TMDB_ENDPOINT } = process.env

export async function searchMovie (request, h) {
  const { query } = request.query

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

    return h.json(data.results)
  } catch (error) {
    console.log('Search movies error: ', error)

    return h.status(500).json({ message: 'Erro ao buscar filmes' })
  }
}

export async function movieDetails (request, h) {
  const { movie_id } = request.params

  try {
    const params = {
      api_key: TMDB_API_KEY,
      language: 'pt-BR'
    }

    const { data } = await axios.get(`${TMDB_ENDPOINT}/movie/${movie_id}`, { params })

    return h.json(data)
  } catch (error) {
    console.log('Get movie details error: ', error)

    return h.status(500).json({ message: 'Erro ao buscar detalhes do filme' })
  }
}