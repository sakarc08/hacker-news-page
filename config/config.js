import dotenv from 'dotenv';
dotenv.config();

export default { 
    mongoDbURI: process.env.MONGO_DB_URL,
    secretKey: process.env.SECRET_KEY,
    fetchPostsInterval: process.env.FETCH_POST_INTERVAL,
    port: process.env.PORT
}