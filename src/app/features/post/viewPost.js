import React from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import TimeAgo from "./TimeAgo";
import {selectPostById} from "../../stateManagement/postsSlice";

const ViewPost = ({match}) => {
    const {postId} = match.params
    const post = useSelector(state => selectPostById(state, postId))
    return (
        <section>
            <article className="post">
                <h2>{post.title}</h2>
                <TimeAgo timestamp={post.date} />
                <p className="post-content">{post.content}</p>
                <Link to={`/edit-post/${postId}`}>Edit Post</Link>
            </article>
        </section>
    );
};

export default ViewPost;