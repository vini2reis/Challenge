import mongoose from 'mongoose'

const MovieSchema = new mongoose.Schema({
  tmdbId: Number,
  title: String,
  posterPath: String,
  rating: Number
}, {
  _id: false,
  id: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  versionKey: false
})

const FavoriteSchema = new mongoose.Schema({
  shareId: String,
  movies: [ MovieSchema ]
}, {
  id: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  versionKey: false
})

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: false,
    unique: true,
    sparse: true
  },
  passwordHash: {
    type: String,
    required: false
  },
  favoriteMovies: FavoriteSchema,
}, {
  id: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  versionKey: false
})

UserSchema.index({ userId: 1 })
UserSchema.index({ userId: 1, 'favoriteMovies.shareId': 1 })
UserSchema.index({ userId: 1, 'favoriteMovies.movies.tmdbId': 1 })

export default mongoose.model('User', UserSchema)
