# Challenge

## Baixar o MongoDB

- Acesse o site oficial: [Site Mongo](https://www.mongodb.com/try/download/community)
- Escolha a versão, a mais recente, e o Sistema operacional
- Execute o instalador
- Faça a instalação completa
- Instale como Service
- E se quiser, marque Install MongoDB Compass (GUI para gerenciar seus bancos)
- Finalize a instalação.

### Criar um banco de dados

- No terminal rode
```
mongosh
```

- Criar banco de dados
```
use movie_app
```

- Criar collection de usuarios
```
db.createCollection("users")
```


## Backend

- Instalar dependencias
```
npm install
```

- Ajustar variaveis de ambiente
  - copie .env.example para o env do nodemon.json (crie esse arquivo caso nao exista) e preencha TMDB_API_KEY e JWT_SECRET. Se for preciso troque tambem o FRONTEND_URL
  - exemplo:
    ```json
    {
      "ext": "js, json",
      "watch": ["src/"],
      "env": {
        "MONGO_URI": "mongodb://localhost:27017/movie_app",
        "TMDB_API_KEY": "API-KEY",
        "PORT": 5000,
        "TMDB_ENDPOINT": "https://api.themoviedb.org/3",
        "ENVIRONMENT": "develop",
        "FRONTEND_URL": "http://localhost:5173",
        "JWT_SECRET":"SECRET-KEY",
        "JWT_EXPIRES": "7d"
      }
    }
    ```

- Rodar projeto
```
npm run dev
```
ou
```
npm start
```



## Frontend

- Instalar dependencias
```
npm install
```

- Ajustar variaveis de ambiente
  - copie .env.example para o .env. Se for preciso altere o VITE_API_URL

- Rodar projeto
```
npm run dev
```

Abra http://localhost:5173 ou outro host disponibilizado




## Rotas do backend


### Rotas de filmes

#### 📌 GET /api/movies/search

Busca filmes pelo título usando a API do TMDB.

**Parâmetros da Query:**
| Parâmetro | Tipo   | Obrigatório | Descrição |
|----------|--------|:-----------:|-----------|
| `q`      | string | ✅ | Termo de busca (título do filme) |
| `page`   | number | ❌ | Página da busca (padrão: 1) |

**Resposta — 200 OK**
```json
[
  {
    "adult": false,
    "backdrop_path": "/5TiwfWEaPSwD20uwXjCTUqpQX70.jpg",
    "genre_ids": [
        18,
        53
    ],
    "id": 550,
    "original_language": "en",
    "original_title": "Fight Club",
    "overview": "Um homem deprimido que sofre de insônia conhece um estranho vendedor de sabonetes chamado Tyler Durden. Eles formam um clube clandestino com regras rígidas onde lutam com outros homens cansados de suas vidas mundanas. Mas sua parceria perfeita é comprometida quando Marla chama a atenção de Tyler.",
    "popularity": 22.4027,
    "poster_path": "/mCICnh7QBH0gzYaTQChBDDVIKdm.jpg",
    "release_date": "1999-10-15",
    "title": "Clube da Luta",
    "video": false,
    "vote_average": 8.438,
    "vote_count": 30915
  }
]
```


#### 📌 GET /api/movies/details/:movieId

Mostra detalhes de um filme.

**Parâmetros:**
| Parâmetro | Tipo   | Obrigatório | Descrição |
|----------|--------|:-----------:|-----------|
| `movieId`      | string | ✅ | Id do filme |

**Resposta — 200 OK**
```json
{
  "adult": false,
  "backdrop_path": "/5TiwfWEaPSwD20uwXjCTUqpQX70.jpg",
  "belongs_to_collection": null,
  "budget": 63000000,
  "genres": [
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 53,
        "name": "Thriller"
      }
  ],
  "homepage": "",
  "id": 550,
  "imdb_id": "tt0137523",
  "origin_country": [
    "US"
  ],
  "original_language": "en",
  "original_title": "Fight Club",
  "overview": "Um homem deprimido que sofre de insônia conhece um estranho vendedor de sabonetes chamado Tyler Durden. Eles formam um clube clandestino com regras rígidas onde lutam com outros homens cansados de suas vidas mundanas. Mas sua parceria perfeita é comprometida quando Marla chama a atenção de Tyler.",
  "popularity": 22.4027,
  "poster_path": "/mCICnh7QBH0gzYaTQChBDDVIKdm.jpg",
  "production_companies": [
      {
        "id": 711,
        "logo_path": "/tEiIH5QesdheJmDAqQwvtN60727.png",
        "name": "Fox 2000 Pictures",
        "origin_country": "US"
      },
      {
        "id": 508,
        "logo_path": "/4sGWXoboEkWPphI6es6rTmqkCBh.png",
        "name": "Regency Enterprises",
        "origin_country": "US"
      },
      {
        "id": 4700,
        "logo_path": "/A32wmjrs9Psf4zw0uaixF0GXfxq.png",
        "name": "Linson Entertainment",
        "origin_country": "US"
      },
      {
        "id": 25,
        "logo_path": "/qZCc1lty5FzX30aOCVRBLzaVmcp.png",
        "name": "20th Century Fox",
        "origin_country": "US"
      },
      {
        "id": 20555,
        "logo_path": "/hD8yEGUBlHOcfHYbujp71vD8gZp.png",
        "name": "Taurus Film",
        "origin_country": "DE"
      }
  ],
  "production_countries": [
      {
        "iso_3166_1": "DE",
        "name": "Germany"
      },
      {
        "iso_3166_1": "US",
        "name": "United States of America"
      }
  ],
  "release_date": "1999-10-15",
  "revenue": 100853753,
  "runtime": 139,
  "spoken_languages": [
      {
        "english_name": "English",
        "iso_639_1": "en",
        "name": "English"
      }
  ],
  "status": "Released",
  "tagline": "Má conduta. Caos. Sabão.",
  "title": "Clube da Luta",
  "video": false,
  "vote_average": 8.438,
  "vote_count": 30915
}
```


### Rotas dew Favoritos

#### 📌 GET /api/favorites/:userId

Buscar filmes favoritos do usuario.

**Parâmetros:**
| Parâmetro | Tipo   | Obrigatório | Descrição |
|----------|--------|:-----------:|-----------|
| `userId`      | string | ✅ | Id de usuario |

**Resposta — 200 OK**
```json
[
  {
    "tmdbId": 550,
    "title": "Clube da Luta",
    "posterPath": "/mCICnh7QBH0gzYaTQChBDDVIKdm.jpg",
    "rating": 8.438
  },
  {
    "tmdbId": 1234945,
    "title": "Clube da luta",
    "posterPath": "/bqPEicce3qZiGe86TSrXNZQ5XmM.jpg",
    "rating": 10
  }
]
```


#### 📌 GET /api/favorites/add-favorite

Buscar filmes favoritos do usuario.

**Parâmetros:**
| Parâmetro | Tipo   | Obrigatório | Descrição |
|----------|--------|:-----------:|-----------|
| `userId`      | string | ✅ | Id de usuario |

**Resposta — 200 OK**
```json
[
  {
    "tmdbId": 550,
    "title": "Clube da Luta",
    "posterPath": "/mCICnh7QBH0gzYaTQChBDDVIKdm.jpg",
    "rating": 8.438
  },
  {
    "tmdbId": 1234945,
    "title": "Clube da luta",
    "posterPath": "/bqPEicce3qZiGe86TSrXNZQ5XmM.jpg",
    "rating": 10
  }
]
```


#### 📌 PUT /api/favorites/add-favorite

Adiciona filme aos favoritos.

**Parâmetros da Body:**
| Parâmetro | Tipo   | Obrigatório | Descrição |
|----------|--------|:-----------:|-----------|
| `userId`      | string | ✅ | Id de usuario |
| `movie`      | objeto | ✅ | Id de usuario |

**Resposta — 200 OK**
```json
{
  "movies": [
    {
      "tmdbId": 550,
      "title": "Clube da Luta",
      "posterPath": "/mCICnh7QBH0gzYaTQChBDDVIKdm.jpg",
      "rating": 8.438
    }
  ]
}
```

#### 📌 PUT /api/favorites/remove-favorite

Remove filme dos favoritos.

**Parâmetros da Body:**
| Parâmetro | Tipo   | Obrigatório | Descrição |
|----------|--------|:-----------:|-----------|
| `userId`      | string | ✅ | Id de usuario |
| `movieId`      | string | ✅ | Id do filme |

**Resposta — 200 OK**
```json
{
  "movies": []
}
```

#### 📌 POST /api/favorites/share

Cria link para compartilhar lista de favoritos.

**Parâmetros da Body:**
| Parâmetro | Tipo   | Obrigatório | Descrição |
|----------|--------|:-----------:|-----------|
| `userId`      | string | ✅ | Id de usuario |

**Resposta — 200 OK**
```json
{
  "shareLink": "http://localhost:5173/shared/366cd574-f3a7-45d8-81b1-c5be63d07c50"
}
```

#### 📌 GET /api/favorites/shared/:shareId

Busca favoritos compartilhados.

**Parâmetros:**
| Parâmetro | Tipo   | Obrigatório | Descrição |
|----------|--------|:-----------:|-----------|
| `shareId`      | string | ✅ | codigo de compartilhamento |

**Resposta — 200 OK**
```json
[
  {
    "tmdbId": 550,
    "title": "Clube da Luta",
    "posterPath": "/mCICnh7QBH0gzYaTQChBDDVIKdm.jpg",
    "rating": 8.438
  },
  {
    "tmdbId": 151912,
    "title": "Jurassic Fight Club",
    "posterPath": "",
    "rating": 7.5
  }
]
```


### Rotas de login e registro

#### 📌 GET /api/auth/login

Realiza o login e retorna o token de acesso

**Parâmetros de Body:**
| Parâmetro | Tipo   | Obrigatório | Descrição |
|----------|--------|:-----------:|-----------|
| `email`      | string(email) | ✅ | email de acesso |
| `password`      | string | ✅ | senha com pelo menos 6 digitos |

**Resposta — 200 OK**
```json
{
  "token": "JWT token",
  "userId": "468466f5-81fb-4089-a0b6-918949a50bec"
}
```

#### 📌 GET /api/auth/register

Cadastra um novo usuario

**Parâmetros de Body:**
| Parâmetro | Tipo   | Obrigatório | Descrição |
|----------|--------|:-----------:|-----------|
| `email`      | string(email) | ✅ | email de acesso |
| `password`      | string | ✅ | senha com pelo menos 6 digitos |

**Resposta — 200 OK**
```json
{
  "message": "Usuário criado com sucesso"
}
```
      
