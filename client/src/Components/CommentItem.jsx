import { useState } from "react";
import { useOutletContext } from 'react-router-dom';

export default function CommentItem({ comment, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedComment, setUpdatedComment] = useState(comment.body); // מאחסן את התגובה המעדכנת
    const user = useOutletContext();
    const userEmail = user.email;

    const handleUpdateClick = () => {
        setIsEditing(true); // מפעיל את מצב העריכה
    };

    const handleSaveClick = () => {
        // מעדכן את התגובה עם הערכים החדשים
        if (updatedComment === "") {
            alert("Comment cannot be empty!");
            return;
        }
        // קורא לפונקציה עדכון (onUpdate) ומעביר את התגובה המעודכנת
        onUpdate(comment.id, { body: updatedComment});
        setIsEditing(false); // מכבה את מצב העריכה
    };

    return (
        <div className="comment-item">
            <h4>{comment.email}</h4>
            <h5>{comment.name}</h5>
            {isEditing ? (
                <>
                    <textarea
                        value={updatedComment}
                        onChange={(e) => setUpdatedComment(e.target.value)}
                    />
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <p>{updatedComment}</p>
            )}
            {comment.email === userEmail ? (
                <>
                    <button onClick={() => onDelete(comment.id)}>Delete</button>
                    {!isEditing && <button onClick={handleUpdateClick}>Update</button>}
                </>
            ) : null}
        </div>
    );
}
