import mongoose from 'mongoose';
import config from './config';
import { populatePosts, fillDB} from '../utils/populateDb'

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoDbURI, { useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true});
        console.log('DB connected')
        populatePosts(200);
        setInterval(() => {
           fillDB()
           console.log('fetched front page posts after ', config.fetchPostsInterval)
        }, config.fetchPostsInterval);
    } catch (error) {
        console.log(error.message)
    }
}

export default connectDB