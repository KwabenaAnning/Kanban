import dotenv from 'dotenv'
dotenv.config()

const production = {
  DATABASE_URL: process.env.MONGO_URI!,
  APP_PORT: process.env.PORT!,
}

export default production
