import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectUser, userAllPosts} from "../../stateManagement/usersSlice";
import {Link} from "react-router-dom";
import {fetchAllNotifications} from "../../stateManagement/notificationsSlice";

const UserPage = ({match}) => {
    const {userId} = match.params
    const posts = []//useSelector(state => userAllPosts(state, userId))
    const user = useSelector(state => selectUser(state, userId))
    const dispatch = useDispatch()
    const fetchNotifications = () => {
        dispatch(fetchAllNotifications())
    }

    const renderPost = posts.map((post) => (
        <li key={post.id}>{post.title} <Link to={`/view-post/${post.id}`}>View Post</Link></li>))
    return (
        <>
            <h2>{user.username}</h2>
            <ul>
                {renderPost}
            </ul>
            <button className="button" onClick={fetchNotifications}>Refresh Notifications</button>

        </>

    )
        ;
};

export default UserPage;