import mongoose from 'mongoose'

const MovieSchema = new mongoose.Schema({
  tmdbId: String,
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
  favoriteMovies: FavoriteSchema,
})

UserSchema.index({ userId: 1 })
UserSchema.index({ 'favoriteMovies.shareId': 1 })

export default mongoose.model('User', UserSchema)
