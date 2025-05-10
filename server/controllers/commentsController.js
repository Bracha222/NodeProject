import {getCommentsByPostId, 
  createComment as createCommentServer,
  updateComment as updateCommentServer,
  deleteComment as deleteCommentServer
 } from '../dataServices/commentsService.js';

export async function getCommentsByPost(req, res) {
  const comments = await getCommentsByPostId(req.params.postId);
  res.json(comments);
}

export async function createComment(req, res) {
  const id = await createCommentServer(req.body);
  res.status(201).json({ id });
}

export async function updateComment(req, res) {
  await updateCommentServer(req.params.id, req.body);
  res.status(200).json({ success: true });
}

export async function deleteComment(req, res) {
  await deleteCommentServer(req.params.id);
  res.status(200).json({ success: true });
}

