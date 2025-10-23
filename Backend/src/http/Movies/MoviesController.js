import axios from 'axios'

const { TMDB_API_KEY, TMDB_ENDPOINT } = process.env

export async function searchMovie (request, h) {
  try {
    const q = request.query.q || ''
    const page = request.query.page || 1

    const params = {
      api_key: TMDB_API_KEY,
      query: q,
      page,
      language: 'pt-BR'
    }

    const result = await axios.get(`${TMDB_ENDPOINT}/search/movie`, { params })

    return h.json(result.data)
  } catch (error) {
    console.log('Search movies error: ', error)

    return h.status(500).json({ message: 'Erro ao buscar filmes' })
  }
}