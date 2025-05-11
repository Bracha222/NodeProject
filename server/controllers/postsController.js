import {
  getAllPosts as fetchAllPosts,
  getPostById as fetchPostById,
  getPostsByUserId,
  createPost as addPost,
  updatePost as modifyPost,
  deletePost as removePost
} from '../dataServices/postService.js';


export async function getAllPosts(req, res) {
    const { searchCriteria, searchValue } = req.query;

    try {
        const posts = await fetchAllPosts(searchCriteria, searchValue);
        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Failed to fetch posts" });
    }
}

// export async function getAllPosts(req, res) {
//     try {
//         const { viewAll, userId, searchCriteria, searchValue } = req.query;

//         const posts = await fetchAllPosts({ 
//             viewAll: viewAll === 'true', 
//             userId, 
//             searchCriteria, 
//             searchValue 
//         });

//         res.json(posts);
//     } catch (err) {
//         console.error("Error in getAllPosts:", err);
//         res.status(500).json({ error: "Server error" });
//     }
// }

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
