import {
  getAllPosts as fetchAllPosts,
  getPostById as fetchPostById,
  getPostsByUserId,
  createPost as addPost,
  updatePost as modifyPost,
  deletePostWithComments
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
  res.status(200).json({ message: "Post updated" });
}

// export async function deletePostAndComments(req, res) {
//   await removePost(req.params.id);
//   res.sendStatus(204);
// }

export const deletePost = async (req, res) => {
  const { id } = req.params;
  console.log("this post id", id);
  try {
    console.log("post id in try", id);
    await deletePostWithComments(id);
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.error('Error deleting post and comments:', err);
    res.status(500).send('Failed to delete post and its comments');
  }
};