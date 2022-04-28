import React from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import TimeAgo from "./TimeAgo";
import {selectPostById} from "../../stateManagement/postsSlice";
import {useGetPostQuery} from "../../stateManagement/apiSlice";
import {Spinner} from "../../../components/Spinner";

const ViewPost = ({match}) => {
    const {postId} = match.params
    const {data: post, isFetching, isSuccess} = useGetPostQuery(postId)
    //const post = useSelector(state => selectPostById(state, postId))
    let content;
    if (isFetching) {
        content = <Spinner text="loading..."/>
    } else if (isSuccess) {
        content = (<article className="post">
            <h2>{post.title}</h2>
            <TimeAgo timestamp={post.date}/>
            <p className="post-content">{post.content}</p>
            <Link to={`/edit-post/${postId}`}>Edit Post</Link>
        </article>)
    }

    return (
        <section>
            {content}
        </section>
    );
};

export default ViewPost;