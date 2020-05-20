import Post from '../models/Post'
import axios from 'axios';

const populatePosts = async (totalRecords) => {
    const totalDocs = await Post.countDocuments()
    let page = 0, docs= [];
    if(!totalDocs) {
        while (docs.length < totalRecords) {       
            const result = await axios.get(`http://hn.algolia.com/api/v1/search?tags=story&page=${page}`)
            page++;
            docs = docs.concat(result.data.hits);
            docs = docs.filter((doc, index, self) =>
                index === self.findIndex((t) => (
                    t.objectID === doc.objectID
                ))
            )
        }

        docs = docs.map(({ objectID, author, title, url, created_at, points, num_comments }) => ({
            objectID,
            author,
            title,
            url,
            createdAt: created_at,
            points,
            noOfComments: num_comments,
            hide: []
        }));

        await Post.insertMany(docs)
    }
};

const fillDB = async () => {
    let docs = [];
    const result = await axios.get('http://hn.algolia.com/api/v1/search_by_date?tags=front_page')
    docs = result.data.hits.map(({ objectID, author, title, url, created_at, points, num_comments }) => ({
        objectID,
        author,
        title,
        url,
        createdAt: created_at,
        points,
        noOfComments: num_comments,
        hide: []
    }));

    await Post.insertMany(docs)
}

export  { populatePosts, fillDB }