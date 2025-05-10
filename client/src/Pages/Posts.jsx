import { useState, useEffect } from "react";
import { useParams, useOutletContext } from 'react-router-dom';
import { getData, addData, updateData, deleteData } from "../api/api";
import PostItem from "../Components/PostItem";
import "../Css/Post.css";
import "../Css/Home.css";

export default function Posts() {
    const currentUser = useOutletContext();
    const currentUserId = currentUser.id;
    const [Posts, setPosts] = useState([]);
    const [isAddVisible, setIsAddVisible] = useState(false);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostBody, setNewPostBody] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('title');
    const [searchValue, setSearchValue] = useState('');
    const [isViewingAllPosts, setIsViewingAllPosts] = useState(false);

    const fetchPosts = async () => {
        if (!currentUserId) return;
        const data = await getData(`posts/user/${currentUserId}`);
        setPosts(data);
    };

    const fetchAllPosts = async () => {
        const data = await getData(`posts/all`);
        setPosts(data);
    };

    useEffect(() => {
        if (isViewingAllPosts) {
            fetchAllPosts();
        } else {
            fetchPosts();
        }
    }, [isViewingAllPosts, searchValue, searchCriteria]);

    const toggleViewMode = () => {
        setIsViewingAllPosts(!isViewingAllPosts);
    };

    const addPost = async () => {
        const post = {
            userId: currentUserId,
            title: newPostTitle,
            body: newPostBody
        };
        await addData("posts/create", post);
        setNewPostTitle("");
        setNewPostBody("");
        if (isViewingAllPosts) {
            fetchAllPosts();
        } else {
            fetchPosts();
        }
    };

    const handleDeletePost = async (id) => {
        await deleteData(`posts/delete/${id}`);
        if (isViewingAllPosts) {
            fetchAllPosts();
        } else {
            fetchPosts();
        }
    };

    const handleUpdate = async (post) => {
        const updated = { ...post, title: prompt("New title:", post.title) };
        if (updated.title) {
            await updateData(`posts/update/${post.id}`, updated);
            if (isViewingAllPosts) {
                fetchAllPosts();
            } else {
                fetchPosts();
            }
        }
    };

    return (
        <>
            <h1>{isViewingAllPosts ? "All Posts" : "My Posts"}</h1>

            {!isViewingAllPosts && (
                <div>
                    <label>Search By:</label>
                    <select onChange={(e) => setSearchCriteria(e.target.value)}>
                        <option value="title">Title</option>
                        <option value="id">ID</option>
                    </select>
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder={`Search by ${searchCriteria}...`}
                    />
                    <button onClick={() => setIsAddVisible(!isAddVisible)}>Add Post</button>
                </div>
            )}
            <button onClick={toggleViewMode}>
                {isViewingAllPosts ? "See My Posts" : "See All Posts"}
            </button>

            <div className="post-container">
                {Posts.map((post) => (
                    <PostItem
                        key={post.id}
                        post={post}
                        onDelete={isViewingAllPosts ? null : handleDeletePost}
                        onUpdate={isViewingAllPosts ? null : handleUpdate}
                    />
                ))}
            </div>

            {isAddVisible && !isViewingAllPosts && (
                <div className="popup">
                    <div className="popup-content">
                        <input
                            type="text"
                            placeholder="Post title"
                            value={newPostTitle}
                            onChange={(e) => setNewPostTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Post body"
                            value={newPostBody}
                            onChange={(e) => setNewPostBody(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                addPost();
                                setIsAddVisible(false);
                            }}
                        >
                            OK
                        </button>
                        <button type="button" onClick={() => setIsAddVisible(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
