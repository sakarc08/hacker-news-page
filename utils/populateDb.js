import Post from '../models/Post'
import axios from 'axios';

const populatePosts = async (totalRecords) => {
    const totalDocs = await Post.countDocuments()
    let page = 1, hitsPerPage = 20, docs= [];
    if(!totalDocs) {
        while ((page*hitsPerPage) <= totalRecords) {
            const result = await axios.get('http://hn.algolia.com/api/v1/search?tags=story')
            page++;
            docs = docs.concat(result.data.hits);
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