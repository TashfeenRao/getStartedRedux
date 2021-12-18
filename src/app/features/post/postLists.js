import React from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Author from "../user/author";
import TimeAgo from "./TimeAgo";
import Reaction from "./Reaction";

const PostLists = () => {
    const postLists = useSelector((state) => state.posts)

    const orderedLists = postLists.slice().sort((a,b) => b.date.localeCompare(a.date))
    const renderedPosts = orderedLists.map((post)=> ( <article className="post-excerpt" key={post.id}>
        <h3>{post.title}  </h3>
        <Author authorId={post.authorId}/>
        <TimeAgo timestamp={post.date} />
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <Link to={`view-post/${post.id}`} >View Post</Link>
        <Reaction postId={post.id}/>
    </article>))
    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    );
};

export default PostLists;