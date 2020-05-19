import Post from '../models/Post'
import axios from 'axios';

const populatePosts = async (totalRecords) => {
    const totalDocs = await Post.countDocuments()
    let page = 1, hitsPerPage = 20, docs= [], temp = [];
    if(!totalDocs) {
        while (docs.length < totalRecords) {       
            const result = await axios.get('http://hn.algolia.com/api/v1/search?tags=story')

            docs = docs.concat(result.data.hits);
            temp = docs.length > 0 && [...new Map(docs.map(doc => [doc.objectID, doc])).values()]
        }
    }

    docs = docs.map(({ objectID, author, title, url, created_at, points, num_comments }) => ({
        objectID,
        author,
        title,
        url,
        createdAt: created_at,
        points,
        noOfComments: num_comments
    }));

    await Post.insertMany(docs)
};

export default populatePosts