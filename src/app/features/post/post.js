import React from 'react';
import Author from "../user/author";
import TimeAgo from "./TimeAgo";
import {Link} from "react-router-dom";
import Reaction from "./Reaction";
import {useSelector} from "react-redux";
import {selectPostById} from "../../stateManagement/postsSlice";

const Post = ({post}) => {
   // const post = useSelector(state => selectPostById(state, postId))
    return ( <article className="post-excerpt" >
        <h3>{post.title}  </h3>
        <Author authorId={post.user}/>
        <TimeAgo timestamp={post.date} />
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <Link to={`view-post/${post.id}`} >View Post</Link>
        <Reaction post={post}/>
    </article>)
};

export default Post;