import Joi from 'joi'

export const searchMovieSchema = Joi.object({
  q: Joi.string().default(''),
  page: Joi.number().integer().min(1).default(1).optional()
})

export const movieDetailsSchema = Joi.object({
  movieId: Joi.number().integer().required()
})
