import { fileURLToPath } from "url"
import path from "path"
import dotenv from 'dotenv'
import app from './app/app.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


import { registerModels, connect } from './config/mongooseConnection.js'

await connect()

await registerModels(path.join(__dirname, "database", "models"))

dotenv.config()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))