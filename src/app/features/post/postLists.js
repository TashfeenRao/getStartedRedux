import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Post from "./post";
import {fetchPosts} from "../../stateManagement/postsSlice";

const PostLists = () => {
    const postStatus = useSelector(state => state.posts.status)
    const postLists = useSelector((state) => state.posts.posts)
    const dispatch = useDispatch()
    let renderItem

    if(postStatus === 'pending') {
        renderItem = <h2>loading</h2>
    } else if(postStatus === 'succeed') {
    const orderedLists = postLists.slice().sort((a,b) => b.date.localeCompare(a.date))
        renderItem = orderedLists.map(post => <Post key={post.id} post={post} />)
    } else if(postStatus === 'error') {
        renderItem = <h4>Error while fetching the posts</h4>
    }


    useEffect(() => {
        if(postStatus === 'idle') dispatch(fetchPosts())
    },[postStatus, dispatch])


    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {renderItem}
        </section>
    );
};

export default PostLists;