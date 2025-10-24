import Joi from 'joi'

export const addFavoriteSchema = Joi.object({
  userId: Joi.string().required(),
  movie: Joi.object().keys({
    tmdbId: Joi.number().integer().required().strict(),
    title: Joi.string().required(),
    posterPath: Joi.string().required(),
    rating: Joi.number().required().strict()
  }).required()
})

export const removeFavoriteSchema = Joi.object({
  userId: Joi.string().required(),
  movieId: Joi.number().integer().required().strict()
})

export const createShareLinkSchema = Joi.object({
  userId: Joi.string().required()
})

export const getSharedSchema = Joi.object({
  shareId: Joi.string().required()
})
