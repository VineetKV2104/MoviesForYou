import axios from 'axios';


const url = "http://localhost:5000/api/posts/";

class PostService {
    //Get Posts
    static async getPosts() {
        const res = await axios.get(url)
        try {
          const data = res.data
          return data.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt)
          }))
        } catch (err) {
          return err
        }
    }

    //Insert Post
    static insertPosts(text){
        return axios.post(url,{
            text
        });
    }

    //Delete Post
    static deletePosts(id){
        return axios.delete(`${url}${id}`);
    }
}


export default PostService;