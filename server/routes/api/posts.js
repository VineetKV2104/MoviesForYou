const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add Post
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  console.log(req.body)
  await posts.insertOne({
    "movie_detail": {
      name: req.body.text.Title,
      img : req.body.text.Poster,
      createdAt: new Date
  }
  });
  res.status(201).send();
});

// Delete Post
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send({});
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://VineetKV:tellmehow@cluster0.5pa1q.mongodb.net/movies',
    {
      useNewUrlParser: true
    }
  );

  return client.db('movies').collection('movie_details');
}

module.exports = router;