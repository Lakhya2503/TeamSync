import { configDotenv } from "dotenv"

configDotenv({
    path : '.env',
    quiet : true
})


export const ENV = Object.freeze({
    // PORT, KEY AND TOKEN
    PORT : Number(process.env.PORT),
    APP_NAME : String(process.env.APP_NAME),
    CORS_ORIGIN : String(process.env.CORS_ORIGIN),
    BACKEND_ORIGIN : String(process.env.BACKEND_ORIGIN),
    SOCKET_ORIGIN : String(process.env.SOCKET_ORIGIN),
    ADMIN_SECRET_KEY : String(process.env.ADMIN_SECRET_KEY),

    // TOKEN AND SECRET 
    ACCESS_TOKEN_SECRET : String(process.env.ACCESS_TOKEN_SECRET),
    REFRESH_TOKEN_SECRET : String(process.env.REFRESH_TOKEN_SECRET),
    
    ACCESS_TOKEN_EXPIRY : String(process.env.ACCESS_TOKEN_EXPIRY),
    REFRESH_TOKEN_EXPIRY : String(process.env.REFRESH_TOKEN_EXPIRY),

    // DATABASE 
    DATABASE_USERNAME : String(process.env.DATABASE_USERNAME),
    DATABASE_PASSWORD : String(process.env.DATABASE_PASSWORD),
    DATABASE_NAME : String(process.env.DATABASE_NAME),
    DATABASE_HOST : String(process.env.DATABASE_HOST),
    DATABASE_PORT : Number(process.env.DATABASE_PORT),
    REDIS_URL : String(process.env.REDIS_URL),

    // CLOUDINARY NAME, SECRET AND KEY 
    CLOUDINARY_CLOUD_NAME : String(process.env.CLOUDINARY_CLOUD_NAME),
    CLOUDINARY_API_KEY : String(process.env.CLOUDINARY_API_KEY),
    CLOUDINARY_API_SECRET : String(process.env.CLOUDINARY_API_SECRET),
})
