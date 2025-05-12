import { useState, useEffect } from "react";
import { useOutletContext } from 'react-router-dom';
import "../Css/Post.css";
import { getCurrentUser, getData, addData, updateData, deleteData } from "../api/api";
import CommentItem from "./CommentItem";

export default function PostItem({ post, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(post.title);
    const [body, setBody] = useState('');
    const [viewStatus, setViewStatus] = useState('View');
    const [viewCommentsStatus, setViewCommentsStatus] = useState('View');
    const [comments, setComments] = useState([]);
    const [isAddCommentVisible, setIsAddCommentVisible] = useState(false);
    const [newCommentName, setNewCommentName] = useState('');
    const [newCommentEmail, setNewCommentEmail] = useState('');
    const [newCommentContent, setNewCommentContent] = useState('');
    const user = useOutletContext();
    const userEmail = user.email;
    const userId = parseInt(user.id, 10);


    const addComment = async (commentName, commentEmail, commentBody) => {
        await addData("comments/create", {
            post_id: parseInt(post.id, 10),
            name: commentName,
            email: commentEmail,
            body: commentBody,
        });
        fetchComments();
    };

    const handleAddComment = () => {
        setIsAddCommentVisible(!isAddCommentVisible);
    }

    const handleDeleteComment = async (commentId) => {
        await deleteData(`comments/delete/${commentId}`);
        fetchComments();
    }

    const handleUpdateComment = async (commentId, newComment) => {
        await updateData(`comments/update/${commentId}`, newComment);
        fetchComments();
    };



    const handleViewClick = () => {
        if (viewStatus === 'View') {
            setViewStatus('Hide');
            setBody(post.body);
        } else {
            setViewStatus('View');
            setBody('');
            setViewCommentsStatus('View');
        }
    };

    const handleViewComments = () => {
        if (viewCommentsStatus === 'View') {
            setViewCommentsStatus('Hide');
        } else {
            setViewCommentsStatus('View');
        }
    };

    const handleEditClick = () => {
        setNewTitle(post.title);
        setBody(post.body);
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        const updatedPost = {
            ...post,
            title: newTitle,
            body: body
        };

        if (newTitle === '' || body === '') {
            alert('Title & body cannot be empty!');
            return;
        }

        if (newTitle === post.title && body === post.body) {
            alert('No changes were made!');
            setIsEditing(false);
            return;
        }

        onUpdate(updatedPost); // שולחת את הפוסט המעודכן להורה
        setIsEditing(false);
    };


    const handleCancelClick = () => {
        setNewTitle(post.title);
        setIsEditing(false);
    };


    const fetchComments = async () => {
        const myComments = await getData(`comments/post/${post.id}`);
        setComments(myComments); // מגדירים את הפוסטים
    };


    useEffect(() => {
        fetchComments();
    }, [viewCommentsStatus]);

    const handleCancelCommentClick = () => {
        setIsAddCommentVisible(false);
        setNewCommentName('');
        setNewCommentEmail('');
        setNewCommentContent('');
    }
    console.log("post:", post);

    return (
        <>
            <div className={viewStatus === 'View' ? "post-item" : "full-post-item"}>
                <h3>{post.id}</h3>
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                        {(viewStatus === 'Hide' || isEditing) && (
                            <input
                                type="text"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            />
                        )}
                        <button onClick={handleSaveClick}>Save</button>
                        <button onClick={handleCancelClick}>Cancel</button>
                    </>
                ) : (
                    <>
                        <h3>{post.title}</h3>
                        <p>{viewStatus === 'Hide' ? body : ''}</p>
                        {post.user_id === userId ? (
                            <button onClick={handleEditClick}>Update</button>
                        ) : null}
                    </>
                )}
                {post.user_id === userId ? (
                    <button onClick={() => onDelete(post.id, post.userId)}>Delete</button>)
                    : null}
                <button onClick={handleViewClick}>{viewStatus} full post</button>
                {viewStatus === 'Hide' && (<button onClick={handleViewComments}>{viewCommentsStatus} comments</button>)}
                {viewCommentsStatus === 'Hide' && (
                    <>
                        <button onClick={handleAddComment} >Add comment</button>

                        {comments.map((comment) => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                onDelete={handleDeleteComment}
                                onUpdate={handleUpdateComment}
                            />
                        ))}
                    </>
                )}
            </div>

            {isAddCommentVisible && (
                <div className="popup">
                    <div className="popup-content">
                        <input
                            type="text"
                            placeholder="Comment name"
                            value={newCommentName}
                            onChange={(e) => setNewCommentName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Comment email"
                            value={newCommentEmail}
                            onChange={(e) => setNewCommentEmail(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Comment"
                            value={newCommentContent}
                            onChange={(e) => setNewCommentContent(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                if (newCommentEmail === userEmail) {
                                    addComment(newCommentName, newCommentEmail, newCommentContent);
                                    setNewCommentName("");
                                    setNewCommentEmail("");
                                    setNewCommentContent("");
                                    setIsAddCommentVisible(false);
                                }
                                else {
                                    alert('Cannot add a comment on someone elses email address.')
                                }
                            }}
                        >
                            OK
                        </button>
                        <button type="button" onClick={handleCancelCommentClick}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );

}