import {
  getAllPosts as fetchAllPosts,
  getPostById as fetchPostById,
  getPostsByUserId,
  createPost as addPost,
  updatePost as modifyPost,
  deletePost as removePost
} from '../dataServices/postService.js';

export async function getAllPosts(req, res) {
  const posts = await fetchAllPosts();
  console.log('all posts:', posts);
  res.json(posts);
}

export async function getPostById(req, res) {
  const post = await fetchPostById(req.params.id);
  post ? res.json(post) : res.status(404).send('Post not found');
}

export async function getPostsByUser(req, res) {
  const posts = await getPostsByUserId(req.params.userId);
  res.json(posts);
}

export async function createPost(req, res) {
  const id = await addPost(req.body);
  res.status(201).json({ id });
}

export async function updatePost(req, res) {
  await modifyPost(req.params.id, req.body);
  res.sendStatus(204);
}

export async function deletePost(req, res) {
  await removePost(req.params.id);
  res.sendStatus(204);
}
