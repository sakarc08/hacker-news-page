import mongoose from 'mongoose';
import config from 'config';
const mongoDbURI = config.get('mongoDbURI')
import populatePosts from '../utils/populateDb'

const connectDB = async () => {
    try {
        await mongoose.connect(mongoDbURI, { useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true});
        console.log('DB connected')
        populatePosts(200);
    } catch (error) {
        console.log(error.message)
    }
}

export default connectDB